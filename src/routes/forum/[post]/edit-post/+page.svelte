<script lang="ts">
  import { getContext, type Snippet } from "svelte";
  import type { Writable } from "svelte/store";
  import type { ActionData, PageData } from "./$types";
  import { enhance } from "$app/forms";

  let nav_content = getContext<Writable<Snippet | null>>("layout");

  let { form, data }: { form: ActionData; data: PageData } = $props();
  let creating = $state(false);

  let title: string = $state("");
  let description: string = $state("");
  let tags: string[] = $state([]);

  if (!data.post_info) {
    title = "";
    description = "";
    tags = [];
  } else {
    //svelte is formatting the following block this way, not me, don't ask
    (title = data.post_info.title),
      (description = data.post_info.content),
      (tags = data.post_info.tags);
  }

  $nav_content = navbar_button;
</script>

{#snippet navbar_button()}
  <a href={`/forum`}>all posts</a>
  <a href={`/forum/my-posts`}>my posts</a>
{/snippet}
<div class="content-container">
  <form
    method="POST"
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
    <h3>Post editing</h3>
    {#if form}
      <div class="error">{form?.message}</div>
    {/if}
    <div class="container name-container">
      <h4>Post name:</h4>
      <input
        type="text"
        class="post-name"
        name="post-name"
        required
        bind:value={title}
      />
    </div>
    <div class="container description-container">
      <h4>Description:</h4>
      <textarea
        class="post-description"
        name="post-description"
        required
        bind:value={description}
      ></textarea>
    </div>
    <div class="container tags-container">
      <h4>Tags:</h4>
      <div class="tags">
        <div class="tag-container">
          <input
            type="checkbox"
            class="post-tag"
            name="help-tag"
            value="help"
            id="help-tag"
            checked={tags.includes("#help")}
            hidden
          />
          <label for="help-tag">#help</label>
        </div>
        <div class="tag-container">
          <input
            type="checkbox"
            class="post-tag"
            name="bug-tag"
            value="bug"
            id="bug-tag"
            checked={tags.includes("#bug")}
            hidden
          />
          <label for="bug-tag">#bug</label>
        </div>
        <div class="tag-container">
          <input
            type="checkbox"
            class="post-tag"
            name="qol-tag"
            value="QoL"
            id="qol-tag"
            checked={tags.includes("#qol")}
            hidden
          />
          <label for="qol-tag">#QoL</label>
        </div>
      </div>
    </div>
    <div class="button-container">
      <button disabled={creating}>Edit post</button>
    </div>
  </form>
</div>

<style lang="scss">
  .error {
    background-color: var(--error-field-color);
    width: 20%;
    border-radius: 10px;
    font-size: 20px;
    display: flex;
    justify-content: center;
    margin-left: 1rem;
  }

  .content-container {
    width: 100dvw;
    height: 80dvh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .tags-container {
    height: 12%;
  }

  .tags {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    font-size: 24px;
    height: 100%;
  }

  h3 {
    width: 100%;
    text-align: center;
    font-size: 28px;
    margin: 0;
    height: 10%;
    padding-top: 2rem;
  }

  h4 {
    font-size: 24px;
    margin: 0;
  }

  input,
  textarea {
    background-color: var(--input-field-color);
    border-style: none;
    border-radius: 10px;
    color: white;
    font-size: 24px;
    resize: none;
  }

  .container {
    width: 100%;
    padding-left: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .name-container {
    height: 15%;
  }

  .description-container {
    height: 40%;
  }

  .post-name {
    width: 25%;
    height: 100%;
    padding-left: 0.75rem;
  }

  .post-description {
    width: 95%;
    height: 100%;
    display: flex;
    padding-bottom: 10%;
    font-size: 20px;
    padding: 0.75rem;
  }

  form {
    background: linear-gradient(#0f0919 0%, #0a0512 50%, #0f0919 100%);
    width: 75%;
    height: 100%;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  a {
    color: inherit;
    text-decoration: none;
    font-size: 32px;
  }

  .button-container {
    width: 100%;
    height: 15%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  button {
    width: 25%;
    height: 66%;
    border-radius: 15px;
    border-style: none;
    background-color: var(--button-color);
    color: white;
    font-size: 24px;
    cursor: pointer;
  }

  .tag-container {
    width: 5%;
    height: 100%;
    cursor: pointer;
    user-select: none;
    border-radius: 5px;
    background-color: rgba(40, 32, 44, 0.6);
  }

  .tag-container label {
    cursor: pointer;
    box-sizing: border-box;
  }

  label {
    font-size: 20px;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .post-tag:checked + label {
    border: 2px solid white;
    border-radius: 5px;
    outline-offset: 0.25rem;
  }

  @media only screen and (max-width: 1300px) {
    .tag-container {
      width: 12.5%;
    }

    .post-name {
      width: 40%;
    }

    input,
    textarea {
      font-size: 20px;
    }

    label {
      font-size: 20px;
    }

    h3 {
      font-size: 24px;
    }

    h4 {
      font-size: 20px;
    }

    button {
      font-size: 20px;
      width: 30%;
    }
  }
  @media only screen and (max-width: 768px) {
    .tag-container {
      width: 15%;
    }

    .post-name {
      width: 60%;
    }

    input,
    textarea {
      font-size: 18px;
    }

    label {
      font-size: 18px;
    }

    h3 {
      font-size: 22px;
    }

    h4 {
      font-size: 18px;
    }

    button {
      font-size: 18px;
      width: 40%;
    }
  }
</style>
