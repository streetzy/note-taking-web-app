<script lang="ts">
  import { Charts } from "$lib/editorjs-custom-modules/charts";
  import {
    EditorJS,
    Header,
    EditorjsList,
    Paragraph,
    CodeTool,
    Table,
    MathTex,
    SimpleImage,
  } from "$lib/index";
  import Icon from "@iconify/svelte";
  import { getContext, onMount, type Snippet } from "svelte";
  import type { Writable } from "svelte/store";
  import type { PageData, ActionData } from "./$types";
  import { enhance } from "$app/forms";
  import type { OutputData } from "@editorjs/editorjs";

  let { data, form }: { data: PageData; form: ActionData } = $props();
  let creating = $state(false);

  function toggle_editor() {
    in_editor = !in_editor;
    const editor_window = document.getElementById("printable");
    const side_bar_window = document.getElementById("side-bar");

    editor_window!.style.display = in_editor ? "block" : "none";
    side_bar_window!.style.display = in_editor ? "none" : "block";
  }

  window.addEventListener("resize", () => {
    const editor_window = document.getElementById("printable");
    const side_bar_window = document.getElementById("side-bar");

    if (window.matchMedia("(max-width: 1300px)").matches) {
      editor_window!.style.display = in_editor ? "block" : "none";
      side_bar_window!.style.display = in_editor ? "none" : "block";
    } else {
      editor_window!.style.display = "block";
      side_bar_window!.style.display = "flex";
    }
  });

  let add_page_empty = false;
  let in_editor = $state(true);
  let nav_content = getContext<Writable<Snippet | null>>("layout");
  let pages: typeof data.pages = $state([]);
  if (!data.pages) {
    pages = [];
  } else {
    pages = data.pages;
  }
  let wanted_page_index: number | null = $state(null);
  let wanted_page = $derived(
    wanted_page_index !== null ? pages[wanted_page_index] : null
  );
  $nav_content = navbar_button;

  $effect(() => {
    if (wanted_page === null) return;
    if (wanted_page.editorjs_content.blocks === undefined) {
      editor.clear();
      return;
    }

    editor.render(wanted_page.editorjs_content as OutputData);
  });

  let timeout: NodeJS.Timeout | null = null;

  const editor = new EditorJS({
    autofocus: true,
    onChange(api, event) {
      console.log("onChange running");
      if (timeout !== null) clearTimeout(timeout);
      timeout = setTimeout(async () => {
        const _data = await api.saver.save();

        if (wanted_page_index === null) return;
        if (wanted_page === null) return;

        await fetch(`${window.origin}/api/v1/editor`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            page_id: wanted_page.page_id,
            saved_data: _data,
          }),
        });

        pages[wanted_page_index].editorjs_content = _data as any;
      }, 5000);
    },
    holder: "content-editor",
    tools: {
      header: Header,
      list: EditorjsList,
      paragraph: Paragraph,
      code: CodeTool,
      image: SimpleImage,
      math: {
        class: MathTex,
      },
      table: Table,
      chart: Charts,
    },
  });
</script>

{#snippet navbar_button()}
  {#if !in_editor}
    <button class="pages-toggle" onclick={toggle_editor}> pages </button>
  {:else}
    <button class="pages-toggle" onclick={toggle_editor}> editor </button>
  {/if}
{/snippet}

<div class="container">
  <div class="side-bar" id="side-bar">
    <div class="section-info">
      <a href={`/notebooks/${data.notebook_id}/sections`} class="notebook-name"
        >{data.notebook_name}</a
      >
      <div class="section-name">{data.section_name}</div>
      <div class="page-list">
        {#each pages as page, i}
          <button
            onclick={() =>
              (wanted_page_index = wanted_page_index === i ? null : i)}
            class="page">{page.page_name}</button
          >
        {/each}
      </div>
      <form
        method="POST"
        class="add-page"
        action="?/submit"
        use:enhance={() => {
          creating = true;

          return async ({ update, result }) => {
            await update();
            if (result.type === "redirect") {
              window.location.href = result.location;
            } else {
              creating = false;
            }
          };
        }}
      >
        {#if form}
          <div class="error">{form?.message}</div>
        {/if}
        <div class="input-container">
          <input
            type="text"
            name="page-name"
            placeholder="My page"
            disabled={creating}
          />
          <button disabled={creating}>
            <Icon
              icon="carbon:add"
              width="32"
              height="32"
              style="color: #fff"
            />
          </button>
        </div>
      </form>
    </div>
  </div>
  <div id="printable" class="user-content">
    <div id="content-editor"></div>
  </div>
</div>

<style lang="scss">
  .page {
    background-color: transparent;
    border: none;
    color: white;
    font-size: 14px;
    height: 100%;
    padding: 8px;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  .pages-toggle {
    display: none;
    background-color: transparent;
    color: white;
    border: none;
    font-size: 32px;
    font-weight: 400;
    font-family:
      "Poppins",
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      "Segoe UI",
      Roboto,
      Oxygen,
      Ubuntu,
      Cantarell,
      "Open Sans",
      "Helvetica Neue",
      sans-serif;
  }

  .add-page {
    height: 30%;
    width: 90%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .input-container {
    display: flex;
    gap: 1rem;
    height: 50%;
    width: 100%;
    input {
      font-size: 20px;
      background-color: var(--input-field-color);
      border: none;
      border-radius: 10px;
      height: 80%;
      width: 85%;
      text-align: center;
      color: white;
    }
    button {
      background-color: transparent;
      border: none;
      height: 80%;
      width: 10%;
    }
  }
  .error {
    background-color: var(--error-field-color);
    font-size: 20px;
    border-radius: 10px;
    height: 20%;
    width: 90%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media print {
    @page {
      size: auto;
      margin: 0;
    }

    :global(body) {
      visibility: hidden;
    }

    #printable {
      color: black !important;
      padding: 100px 0px 100px 0px;
      visibility: visible;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  body {
    overflow: hidden;
  }

  :global(.ce-toolbar__plus, .ce-toolbar__settings-btn) {
    background-color: white;
  }

  :global(.cdx-notifies) {
    color: black;
  }

  :global(.katex-html) {
    color: white;
  }

  #content-editor {
    width: 100%;
    height: 100%;
  }

  .notebook-name {
    font-size: 24px;
  }

  .section-name {
    font-size: 20px;
  }

  ::-webkit-scrollbar {
    width: 12px;
  }

  ::-webkit-scrollbar-thumb {
    background: linear-gradient(#2a093b, #1e0630);
    border-radius: 6px;
    border: 2px solid #12041e;
  }

  ::-webkit-scrollbar-track {
    background: #12041e;
    border-radius: 6px;
  }

  .section-info {
    padding-bottom: 4rem;
    height: 50%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .page-list {
    max-height: 80%;
    width: 100%;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  p {
    margin: 0;
    font-size: 16px;
  }
  .side-bar {
    width: 25%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
  }

  .user-content {
    overflow-y: auto;
    width: 100%;
    height: 100%;
    background-color: var(--input-field-color);
  }

  .container {
    display: flex;
    flex-direction: row;
    height: 90%;
    width: 100%;
  }

  @media only screen and (max-width: 1300px) {
    #content-editor {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .pages-toggle {
      display: block;
    }

    .side-bar {
      display: none;
      width: 100%;
    }

    .input-container {
      width: 40%;
    }
  }
  @media only screen and (max-width: 768px) {
    #content-editor {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .pages-toggle {
      display: block;
    }
    .side-bar {
      display: none;
      width: 100%;
    }

    .input-container {
      width: 60%;
    }
  }
</style>
