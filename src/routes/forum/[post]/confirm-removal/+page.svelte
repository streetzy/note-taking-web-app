<script lang="ts">
  import { enhance } from "$app/forms";
  import { getContext, type Snippet } from "svelte";
  import type { Writable } from "svelte/store";
  let nav_content = getContext<Writable<Snippet | null>>("layout");
  let creating = $state(false);
  $nav_content = navbar_button;
</script>

{#snippet navbar_button()}
  <a href={`/forum`}>all posts</a>
  <a href={`/forum/my-posts`}>my posts</a>
{/snippet}

<form
  method="POST"
  class="content-container"
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
  <h3>Are you sure you wish to remove your post?</h3>
  <button disabled={creating}>Confirm removal</button>
</form>

<style lang="scss">
  .content-container {
    padding-bottom: 8rem;
    width: 100dvw;
    height: 80dvh;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: center;
    align-items: center;
  }

  h3 {
    font-size: 28px;
    margin: 0;
  }

  button {
    width: 20%;
    height: 10%;
    font-size: 28px;
    border-radius: 10px;
    border-style: none;
    color: white;
    background-color: var(--button-color);
    cursor: pointer;
  }

  a {
    text-decoration: none;
    color: inherit;
    font-size: 32px;
  }

  @media only screen and (max-width: 1300px) {
    button {
      width: 40%;
    }

    h3 {
      font-size: 24px;
    }
  }
  @media only screen and (max-width: 768px) {
    button {
      width: 50%;
    }

    h3 {
      font-size: 20px;
    }
  }
</style>
