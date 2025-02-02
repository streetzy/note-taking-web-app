<script lang="ts">
  import type { CommentData } from "./types";
  let { message, author_name }: CommentData = $props();
</script>

<div class="comment">
  <h3>{author_name}</h3>
  <h4>{message}</h4>
</div>

<style lang="scss">
  h3,
  h4 {
    margin: 0;
  }

  .comment {
    width: 100%;
    background-color: #1f172756;
    border-radius: 10px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  h3 {
    font-size: 20px;
    font-weight: 500;
  }

  h4 {
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

  @media only screen and (max-width: 1300px) {
    h3 {
      font-size: 16px;
    }

    h4 {
      font-size: 14px;
    }
  }
  @media only screen and (max-width: 768px) {
    h3 {
      font-size: 14px;
    }

    h4 {
      font-size: 12px;
    }
  }
</style>
