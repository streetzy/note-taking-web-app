<script lang="ts">
  import Icon from "@iconify/svelte";
  import "./styles.scss";
  import { setContext, type Snippet } from "svelte";
  import { writable, type Writable } from "svelte/store";
  import { page } from "$app/state";
  import type { PageData } from "./$types";

  const UNWANTED_URLS = [
    "/register",
    "/login",
    "/forgot-password",
    "/forgot-password-success",
    "/sign-out",
  ];
  let loggedIn = $state(false);
  let { children, data }: { children: Snippet; data: PageData } = $props();
  let nav_content = setContext<Writable<Snippet | null>>(
    "layout",
    writable(null)
  );

  if (!data.user) {
    loggedIn = false;
  } else {
    loggedIn = true;
  }
</script>

<svelte:head>
  <title>Inscribed</title>
</svelte:head>

<nav class="top-nav">
  <div class="user-nav-menu">
    <div class="page-name">
      <a href="/">inscribed</a>
    </div>
    {#if !UNWANTED_URLS.includes(page.url.pathname)}
      <div class="user-nav-buttons">
        {#if !loggedIn}
          <a href="/login">
            <Icon
              class="icon"
              icon="carbon:user-avatar-filled"
              width="64"
              height="64"
            />
          </a>
        {:else}
          <a href="/settings">
            <Icon class="icon" icon="carbon:gears" width="64" height="64" />
          </a>
          <a href="/sign-out">
            <Icon
              class="icon"
              icon="solar:exit-linear"
              width="64"
              height="64"
              style="color: #fff"
            />
          </a>
        {/if}
      </div>
    {/if}
  </div>
  {#if !UNWANTED_URLS.includes(page.url.pathname)}
    <div class="nav-forum-links">
      {#if $nav_content != null}
        {@render $nav_content()}
      {/if}

      <a href="/forum"> forum </a>
      {#if loggedIn}
        <a href="/notebooks"> notebooks </a>
      {/if}
    </div>
  {/if}
</nav>

{@render children()}

<style lang="scss">
  button {
    cursor: pointer;
  }

  .top-nav {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 10dvh;
    height: fit-content;
    padding: 1rem 1rem;
  }

  .user-nav-menu {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    gap: 2rem;
  }

  .page-name {
    height: 100%;
    a {
      font-weight: 400;
      font-size: 40px;
      margin: 0;
    }
  }

  .nav-forum-links {
    display: flex;
    gap: 2rem;
    align-items: center;
    a {
      font-weight: 400;
      font-size: 32px;
    }
  }

  .user-nav-buttons {
    display: flex;
    align-items: center;
    gap: 2rem;
    line-height: 1;

    button {
      border: none;
      background-color: transparent;
      padding: 0;
    }
  }

  a {
    color: inherit;
    text-decoration: inherit;
  }

  @media only screen and (max-width: 1300px) {
    :global(.icon) {
      width: 48px;
      height: 48px;
    }

    .top-nav {
      gap: 1rem;
      flex-direction: column;
    }

    .user-nav-menu {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
    }

    .page-name {
      a {
        font-size: 36px;
      }
    }

    .nav-forum-links {
      flex-direction: column;
      gap: 1rem;
      align-items: center;
      width: 100%;
    }
  }
</style>
