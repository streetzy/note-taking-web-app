<script lang="ts">
  import { getContext, type Snippet } from "svelte";
  import type { Writable } from "svelte/store";
  import type { ActionData, PageData } from "./$types";
  import Comment from "../../../components/Comment.svelte";
  import { DatasetController } from "chart.js";

  let nav_content = getContext<Writable<Snippet | null>>("layout");
  let { data, form }: { data: PageData; form: ActionData } = $props();

  let comments: {
    message: string;
    author_name: string;
  }[] = $state([]);

  if (!data.comments) {
    comments = [];
  } else {
    comments = data.comments;
  }

  $nav_content = navbar_button;
</script>

{#snippet navbar_button()}
  <a href={`/forum`}>all posts</a>
  <a href={`/forum/my-posts`}>my posts</a>
{/snippet}

<div class="content-container">
  <div class="content">
    <div class="post-container">
      <div class="title-date">
        <h3 class="title">{data.post_info.title}</h3>
        <h3 class="date">{data.post_info.created_at}</h3>
      </div>
      <h4 class="author">{data.post_info.author_name}</h4>
      <h4 class="description">{data.post_info.content}</h4>
    </div>
    <div class="comment-container">
      {#if data.user}
        <form method="POST">
          <div class="header-button-container">
            <h4>Add a comment!</h4>
            <div class="button-error-container">
              {#if form}
                <div class="error">{form?.message}</div>
              {/if}
              <button>Submit comment</button>
            </div>
          </div>
          <textarea name="comment"></textarea>
        </form>
      {/if}
      <div class="comments">
        {#each comments as comment}
          <Comment message={comment.message} author_name={comment.author_name}
          ></Comment>
        {/each}
      </div>
    </div>
  </div>
</div>

<style lang="scss">
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

  .header-button-container {
    padding-left: 1rem;
    padding-right: 1rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    button {
      background-color: var(--button-color);
      color: white;
      border-radius: 10px;
      border-style: none;
      font-size: 18px;
      padding: 0.4rem 1rem;
    }
  }

  .button-error-container {
    display: flex;
    flex-direction: row;
    gap: 1rem;
  }

  .error {
    background-color: var(--error-field-color);
    border-radius: 10px;
    padding: 0 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .content-container {
    width: 100%;
    min-height: 100dvh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 1rem;
  }

  h3,
  h4 {
    margin: 0;
  }

  form {
    display: flex;
    flex-direction: column;
    height: 50%;
    width: 100%;
    gap: 0.5rem;
  }

  form textarea {
    width: 100% !important; // element.style kept overriding this
    min-height: 100px;
    padding: 0.5rem;
    overflow: auto;
    resize: none;
    border-style: none;
    border-radius: 10px;
    background-color: #1f172756;
    color: white;
    font-size: 16px;
  }

  form h4 {
    font-size: 20px;
  }

  .title,
  .date {
    font-size: 24px;
    font-weight: 500;
  }

  .author {
    font-size: 20px;
    font-weight: 500;
  }

  .description {
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
    font-size: 18px;
    overflow-wrap: break-word;
  }

  .content {
    padding: 1rem;
    border-radius: 20px;
    width: 50%;
    min-height: 97.5%;
    overflow: visible;
    background: #0f0919;
    display: flex;
    flex-direction: column;
    gap: 3rem;
  }

  .post-container {
    gap: 1rem;
    border-radius: 20px;
    padding: 1rem;
    background-color: #1f172756;
    display: flex;
    flex-direction: column;
  }

  .comment-container {
    gap: 2rem;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
  }

  .title-date {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  a {
    text-decoration: none;
    color: inherit;
    font-size: 32px;
  }

  .comments {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  @media only screen and (max-width: 1300px) {
    .header-button-container {
      button {
        font-size: 16px;
      }

      h4 {
        font-size: 16px;
      }
    }

    .content {
      width: 66%;
    }

    .title,
    .date {
      font-size: 20px;
    }

    .author {
      font-size: 16px;
    }

    .description {
      font-size: 14px;
    }

    form textarea {
      font-size: 16px;
    }
  }
  @media only screen and (max-width: 768px) {
    .header-button-container {
      button {
        font-size: 14px;
      }

      h4 {
        font-size: 14px;
      }
    }

    .content {
      width: 75%;
    }

    .title,
    .date {
      font-size: 18px;
    }

    .author {
      font-size: 14px;
    }

    .description {
      font-size: 12px;
    }

    form textarea {
      font-size: 14px;
    }
  }
</style>
