<script lang="ts">
  import Icon from "@iconify/svelte";
  import Post from "../../components/Post.svelte";
  import { page } from "$app/state";
  import { getContext, type Snippet } from "svelte";
  import type { Writable } from "svelte/store";
  import type { PageData } from "./$types";
  import { enhance } from "$app/forms";
  let page_size = 10;
  let current_page =
    (Number(page.url.searchParams.get("skip")) || 0) / page_size;
  let search_bar_value = $state("");

  let nav_content = getContext<Writable<Snippet | null>>("layout");
  $nav_content = navbar_button;

  let post_count: number = $state(0);

  let posts: {
    post_id: string;
    title: string;
    author_name: string;
    tags: string[];
  }[] = $state([]);

  let { data }: { data: PageData } = $props();

  if (!data.document_count) {
    post_count = 0;
  } else {
    post_count = data.document_count;
  }

  if (!data.posts) {
    posts = [];
  } else {
    posts = data.posts;
  }

  if (!data.search_bar_value) {
    search_bar_value = "";
  } else {
    search_bar_value = data.search_bar_value;
  }
</script>

{#snippet navbar_button()}
  <a class="navigation" href={`/forum/create-post`}>create post</a>
  <a class="navigation" href={`/forum/my-posts`}>my posts</a>
{/snippet}

<div class="page-content">
  <form method="GET" class="search-field" data-sveltekit-reload>
    <input
      type="text"
      placeholder="Post name, content, tags, author..."
      name="query"
      bind:value={search_bar_value}
      class="post-filter"
    />
    <button class="search-button">Search</button>
  </form>
  <div class="post-container">
    {#each posts as post}
      <Post
        post_id={post.post_id}
        title={post.title}
        author_name={post.author_name}
        tags={post.tags}
      ></Post>
    {/each}
  </div>
  <div class="pages">
    <div class="previous pagination-container">
      {#if current_page > 0}
        <a
          class="button"
          target="_self"
          href={`/forum?limit=${page_size}&skip=${Math.max(0, page_size * (current_page - 1))}`}
          >Previous</a
        >
      {/if}
    </div>
    <div class="pagination-container">
      <h4>{current_page + 1}</h4>
    </div>

    <div class="next pagination-container">
      {#if page_size * (current_page + 1) < post_count}
        <a
          class="button"
          target="_self"
          href={`/forum?limit=${page_size}&skip=${page_size * (current_page + 1)}`}
          >Next</a
        >
      {/if}
    </div>
  </div>
</div>

<style lang="scss">
  .search-button {
    font-size: 24px;
    height: 50%;
    border-radius: 10px;
    border-style: none;
    color: white;
    padding: 0 1rem;
    background-color: var(--button-color);
  }

  .pages {
    width: 66%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .pagination-container {
    width: 33%;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  .navigation {
    font-size: 32px;
  }

  .button {
    font-size: 20px;
  }

  .previous {
    text-align: left;
  }

  h4 {
    text-align: center;
    font-size: 20px;
  }

  .next {
    text-align: right;
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

  .post-container {
    width: 66%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
  }

  .page-content {
    height: 90dvh;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  h3 {
    font-size: 24px;
    font-weight: 400;
    margin: 0;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    max-width: 90%;
  }

  .search-field input {
    background-color: var(--input-field-color);
    border-radius: 10px;
    border-style: none;
    width: 25%;
    height: 50%;
    padding-left: 1rem;
  }

  .search-field {
    display: flex;
    width: 100%;
    min-height: 15%;
    justify-content: center;
    gap: 1rem;
    align-items: center;
  }

  .post-filter::placeholder {
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
    font-size: 18px;
    padding-left: 4px;
  }

  .post-filter {
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
    font-size: 24px;
    color: white;
  }

  @media only screen and (max-width: 1300px) {
    .post-filter {
      font-size: 20px;
      width: 40% !important;
    }

    .post-filter::placeholder {
      font-size: 16px;
    }

    .search-button {
      font-size: 20px;
    }
  }
  @media only screen and (max-width: 768px) {
    .post-filter {
      font-size: 18px;
      width: 55% !important;
    }

    .post-filter::placeholder {
      font-size: 14px;
    }

    .search-button {
      font-size: 18px;
    }
  }
</style>
