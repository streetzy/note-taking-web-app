<script lang="ts">
  import Icon from "@iconify/svelte";
  import { getContext, type Snippet } from "svelte";
  import type { Writable } from "svelte/store";
  let nav_content = getContext<Writable<Snippet | null>>("layout");


  let date = new Date();
  let current_year = date.getFullYear();
  $nav_content = navbar_button;
</script>

<!-- svelte-ignore block_empty -->
{#snippet navbar_button()}{/snippet}
<div class="content-container">
  <div class="content">
    <div class="content-text">
      <h3>
        Create notes, graphs, equations without the need of studying how to.
      </h3>
      <p>Tired of feeling lost in a complex note-taking environment?</p>
      <p>Want to efficiently write organized notes?</p>
      <p>inscribe offers you the solution to your problems.</p>
    </div>

    <div class="content-icons">
      <a href="https://discord.gg/XYXTGbt8">
        <Icon class="icon" icon="carbon:logo-discord" width="64" height="64" />
      </a>
      <a href="https://github.com/streetzy/note-taking-web-app">
        <Icon class="icon" icon="carbon:logo-github" width="64" height="64" />
      </a>
      <a href="https://mastodon.social/@notetakingproject">
        <Icon class="icon" icon="carbon:logo-mastodon" width="64" height="64" />
      </a>
    </div>
  </div>
  <footer>
    <p class="contact">Contact me at adamsindler@gmail.com</p>
    <p class="copyright">© {current_year} Adam Šindler</p>
  </footer>
</div>

<style lang="scss">
  a {
    text-decoration: none;
    color: inherit;
  }

  p,
  h3 {
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
    font-weight: 200;
  }

  .content-container {
    display: flex;
    flex-direction: column;
    height: fit-content;
    min-height: 90dvh;
    width: 100%;
  }

  .content-container > * {
    width: 100%;
  }

  .content {
    flex: 9;
    height: 90%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 4rem;
  }

  .content-text > p {
    font-size: 28px;
  }

  .content-text > h3 {
    font-size: 36px;
  }

  .content-text {
    gap: 4rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    width: 40%;
  }

  .content-icons {
    display: flex;
    flex-direction: row;
    gap: 5rem;
  }

  footer {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: end;
  }

  footer > p {
    padding-bottom: 10px;
  }
  .contact {
    padding-left: 50px;
  }

  .copyright {
    padding-right: 50px;
  }

  @media only screen and (max-width: 1300px) {
    .content-container {
      grid-template-rows: auto auto;
    }

    .content-icons {
      gap: 3rem;
    }

    .content-text {
      p {
        font-size: 20px;
      }

      h3 {
        font-size: 28px;
      }
    }

    footer {
      p {
        font-size: 18px;
      }
    }
  }

  @media only screen and (max-width: 768px) {
    .content-text {
      p {
        font-size: 16px;
      }

      h3 {
        font-size: 24px;
      }
    }

    footer {
      p {
        font-size: 14px;
      }
    }
  }
</style>
