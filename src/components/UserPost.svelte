<script lang="ts">
  import Icon from "@iconify/svelte";
  import type { ForumPostData } from "./types";
  let { title, author_name, tags, post_id }: ForumPostData = $props();
</script>

<div class="post">
  <a class="info-container" href={`/forum/${post_id}`}>
    <h3>{title}</h3>
    <div class="container">
      <h4 class="colored">Author:</h4>
      <h4>{author_name}</h4>
    </div>
    <div class="container">
      <h4 class="colored">Tags:</h4>
      {#if tags.length === 0}
        <h4>None</h4>
      {:else}
        {#each tags as tag}
          <h4>{tag}</h4>
        {/each}
      {/if}
    </div>
  </a>
  <div class="buttons-container">
    <a href={`/forum/${post_id}/edit-post`} class="button">
      <Icon class="post-icon" icon="carbon:edit" width="48" height="48" />
    </a>
    <a href={`/forum/${post_id}/confirm-removal`} class="button">
      <Icon
        class="post-icon"
        icon="carbon:close-large"
        width="48"
        height="48"
      />
    </a>
  </div>
</div>

<style lang="scss">
  a {
    text-decoration: none;
    color: inherit;
    font-size: 32px;
  }

  .info-container {
    width: 80%;
    padding: 1rem 0 1rem 2rem;
  }

  .buttons-container {
    width: 20%;
    display: flex;
    flex-direction: row;
    height: 100%;
    justify-content: end;
    padding: 1rem;
  }

  .post {
    border-radius: 20px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    background: linear-gradient(#1c161f 0%, #250e2e 100%);
    justify-content: space-between;
  }

  h4 {
    font-size: 24px;
    margin: 0;
    font-family:
      "Exo",
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
    font-weight: 300;
  }

  h3,
  h4 {
    margin: 0;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  h3 {
    font-size: 30px;
    font-weight: 600;
  }

  .colored {
    color: #db78f1;
  }

  .container {
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
  }

  @media only screen and (max-width: 1300px) {
    :global(.post-icon) {
      width: 32px;
      height: 32px;
    }

    h3 {
      width: 80%;
      font-size: 26px;
    }

    h4 {
      font-size: 20px;
    }
  }
  @media only screen and (max-width: 768px) {
    h3 {
      font-size: 24px;
    }

    h4 {
      font-size: 18px;
    }
  }
</style>
