<script lang="ts">
    import Icon from '@iconify/svelte';
    import './styles.scss';
    import { setContext, type Snippet } from 'svelte';
    import { writable, type Writable } from 'svelte/store';
    import { page } from '$app/state';

    const UNWANTED_URLS = ["/register", "/login", "/forgot_password", "/forgot_password_success"]
    let loggedIn = $state(false);
    let {children} = $props();
    let nav_content = setContext<Writable<Snippet | null>>("layout", writable(null));
    function sign_out() {

    }
</script>

<nav class="top-nav">
    <div class="page-name">
        <a href="/">inscribe</a>
    </div>
    <div class="user-nav-menu">
        {#if $nav_content != null}
            {@render $nav_content()}
        {/if}
        {#if !(UNWANTED_URLS.includes(page.url.pathname))}
            <a href="/forum">
                forum
            </a>
            {#if loggedIn}
            <a href="/notebooks">
                notebooks
            </a>
            {/if}
            <div class="user-nav-buttons">
                {#if !loggedIn}
                <a href="/login">
                    <Icon icon="carbon:user-avatar-filled" width="48" height="48"/>
                </a>
                {:else}
                <a href="/settings">
                    <Icon icon="carbon:gears" width="48" height="48"/>
                </a>
                <a href="/login">
                    <Icon icon="carbon:user-avatar-filled" width="48" height="48"/>
                </a>
                <button onclick={()=>sign_out()}>
                    <Icon icon="solar:exit-linear" width="48" height="48"/>
                </button>
                {/if}
            </div>
        {/if}
    </div>
</nav>
<style lang="scss">
    .page-name {
        display: flex;
        align-items: center;
        justify-content: center;
        padding-left: 2rem;
    }

    .page-name a {
        font-weight: 400;
        font-size: 40px;
        margin: 0;
    }

    .user-nav-menu {
        padding-right: 2rem;
        gap: 7.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .user-nav-menu a {
        margin: 0;
        font-weight: 400;
        font-size: 32px;
    }

    .user-nav-buttons {
        display: flex;
        align-items: center;
        gap: 2rem;
        line-height: 1;
    }

    .top-nav {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100dvw;
        height: 10dvh;
    }

    a {
        color: inherit;
        text-decoration: inherit;
    }
</style>

{@render children()}