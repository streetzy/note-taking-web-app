<script lang="ts">
    import Icon from '@iconify/svelte';
    import { getContext, type Snippet } from 'svelte';
    import type { Writable } from 'svelte/store';
    let nav_content = getContext<Writable<Snippet | null>>("layout")

    $nav_content = navbar_button;
</script>

<!-- svelte-ignore block_empty -->
{#snippet navbar_button()}
{/snippet}
<div class="content-container">
    <div class="content">
        <div class="content-text">
            <h3>Create notes, graphs, equations without the need of studying how to.</h3>
            <p>Tired of feeling lost in a complex note-taking environment?</p>
            <p>Want to efficiently write organized notes?</p>
            <p>inscribe offers you the solution to your problems.</p>
        </div>
        
        <div class="content-icons">
            <Icon icon="carbon:logo-discord" width="64" height="64"/>
            <Icon icon="carbon:logo-github" width="64" height="64"/>
            <Icon icon="carbon:logo-mastodon" width="64" height="64"/>
        </div>
    </div>
    <footer>
        <p class="contact">Contact me at adamsindler@gmail.com</p>
        <p class="copyright">© 2024 Adam Šindler</p>
    </footer>
</div>

<style lang="scss">

    p, h3 {
        margin: 0;
        font-family: "Exo", system-ui, -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
    sans-serif;
        font-weight: 200;
    }

    .content-container {
        display: grid;
        grid-template-rows: auto 64px;
        height: 90dvh;
    }

    .content-container > * { 
        width: 100%;
        height: 100%;
    }

    .content {
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
        display: flex;
        justify-content: space-between;
        align-items:end;
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
</style>