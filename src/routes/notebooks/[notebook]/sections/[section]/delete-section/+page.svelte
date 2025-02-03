<script lang="ts">
  import { getContext, type Snippet } from "svelte";
  import type { Writable } from "svelte/store";
  import type { ActionData, PageData } from "./$types";
  import { enhance } from "$app/forms";

  let nav_content = getContext<Writable<Snippet | null>>("layout");
  let { form, data }: { form: ActionData; data: PageData } = $props();
  let creating = $state(false);
  $nav_content = navbar_button;
</script>

{#snippet navbar_button()}
  <a href={`/notebooks/${data.notebook_id}/sections`}>
    <h2>return to section view</h2>
  </a>
{/snippet}

<div class="content">
  <form
    method="POST"
    action="?/submit"
    class="notebook-container"
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
    <div class="header">Are you sure?</div>
    <button disabled={creating}>Delete</button>
  </form>
</div>

<style lang="scss">
  .header {
    font-size: 28px;
    width: 100%;
    height: 25%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .error {
    width: 100%;
    height: 25%;
    font-size: 20px;
    background-color: var(--error-field-color);
    border-radius: 10px;
    padding: 8px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 400;
  }

  .notebook-container {
    gap: 8px;
    display: flex;
    flex-direction: column;
    width: 25%;
    height: 30%;
    justify-content: center;
    align-items: center;
    padding-bottom: 4rem;
  }

  .notebook-container input {
    padding: 4px 8px;
    width: 100%;
    height: 25%;
    border: 0;
    padding: 0;
    background-color: var(--input-field-color);
    font-family:
      Poppins,
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
    border-radius: 10px;
    font-weight: 400;
    color: white;
    font-size: 24px;
    box-sizing: border-box;
    padding-inline: 10px;
  }

  .notebook-container button {
    padding: 4px 0;
    height: 25%;
    width: 100%;
    font-size: 20px;
    font-family:
      Poppins,
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
    background-color: var(--button-color);
    border-style: solid;
    color: white;
    font-weight: 400;
    border-radius: 10px;
    border: 0px;
  }

  .content {
    padding-top: 10rem;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: auto;
    justify-content: center;
    align-items: center;
  }

  h2 {
    margin: 0;
    font-weight: 400;
    font-size: 32px;
  }

  a {
    text-decoration: inherit;
    color: inherit;
  }

  @media only screen and (max-width: 1300px) {
    .notebook-container {
      width: 60%;

      input {
        font-size: 18px;
      }

      button {
        font-size: 18px;
      }
    }
    .error {
      font-size: 18px;
    }

    .header {
      font-size: 24px;
    }
  }
  @media only screen and (max-width: 768px) {
    notebook-container {
      width: 80%;

      input {
        font-size: 16px;
      }

      button {
        font-size: 16px;
      }
    }
    .error {
      font-size: 16px;
    }

    .header {
      font-size: 22px;
    }
  }
</style>
