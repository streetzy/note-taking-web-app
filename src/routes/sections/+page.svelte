<script lang="ts">
    import { getContext, type Snippet } from "svelte";
    import type { Writable } from "svelte/store";
    import Icon from '@iconify/svelte';

    let nav_content = getContext<Writable<Snippet | null>>("layout")

    $nav_content = navbar_button;
</script>

{#snippet navbar_button()}
    <a href="/sections/create_section">
        create section
    </a>
{/snippet}

<div class="content">
    <div class="notebook-name">
        <h1>Maths</h1>
    </div>
    
    <div class="sections">
        <div class="section-container">
            <Icon icon="carbon:folder" width="80" height="80"/>
            <h3>Functions</h3>
            <div class="section-buttons">
                <a href="/sections/rename_section">Rename</a>
                <button>Delete</button>
            </div>
        </div>
        <div class="section-container">
            <Icon icon="carbon:folder" width="80" height="80"/>
            <h3>Linear Equations</h3>
            <div class="section-buttons">
                <a href="/sections/rename_section">Rename</a>
                <button>Delete</button>
            </div>
        </div>
        <div class="section-container">
            <Icon icon="carbon:folder" width="80" height="80"/>
            <h3>Quadratic Equations</h3>
            <div class="section-buttons">
                <a href="/sections/rename_section">Rename</a>
                <button>Delete</button>
            </div>
        </div>
        <div class="section-container">
            <Icon icon="carbon:folder" width="80" height="80"/>
            <h3>Exponential and Logarithmic Equations</h3>
            <div class="section-buttons">
                <a href="/sections/rename_section">Rename</a>
                <button>Delete</button>
            </div>
        </div>
        <div class="section-container">
            <Icon icon="carbon:folder" width="80" height="80"/>
            <h3>Maths</h3>
            <div class="section-buttons">
                <a href="/sections/rename_section">Rename</a>
                <button>Delete</button>
            </div>
        </div>
        <div class="section-container">
            <Icon icon="carbon:folder" width="80" height="80"/>
            <h3>Maths</h3>
            <div class="section-buttons">
                <a href="/sections/rename_section">Rename</a>
                <button>Delete</button>
            </div>
        </div>
        <div class="section-container">
            <Icon icon="carbon:folder" width="80" height="80"/>
            <h3>Maths</h3>
            <div class="section-buttons">
                <a href="/sections/rename_section">Rename</a>
                <button>Delete</button>
            </div>
        </div>
        <div class="section-container">
            <Icon icon="carbon:folder" width="80" height="80"/>
            <h3>Maths</h3>
            <div class="section-buttons">
                <a href="/sections/rename_section">Rename</a>
                <button>Delete</button>
            </div>
        </div>
        <div class="section-container">
            <Icon icon="carbon:folder" width="80" height="80"/>
            <h3>Maths</h3>
            <div class="section-buttons">
                <a href="/sections/rename_section">Rename</a>
                <button>Delete</button>
            </div>
        </div>
        <div class="section-container">
            <Icon icon="carbon:folder" width="80" height="80"/>
            <h3>Maths</h3>
            <div class="section-buttons">
                <a href="/sections/rename_section">Rename</a>
                <button>Delete</button>
            </div>
        </div>
        <div class="section-container">
            <Icon icon="carbon:folder" width="80" height="80"/>
            <h3>Maths</h3>
            <div class="section-buttons">
                <a href="/sections/rename_section">Rename</a>
                <button>Delete</button>
            </div>
        </div>
        <div class="section-container">
            <Icon icon="carbon:folder" width="80" height="80"/>
            <h3>Maths</h3>
            <div class="section-buttons">
                <a href="/sections/rename_section">Rename</a>
                <button>Delete</button>
            </div>
        </div>
        <div class="section-container">
            <Icon icon="carbon:folder" width="80" height="80"/>
            <h3>Maths</h3>
            <div class="section-buttons">
                <a href="/sections/rename_section">Rename</a>
                <button>Delete</button>
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

    .sections {
        min-height: 85%;
        width: 50dvw;
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        grid-template-rows: auto;
        row-gap: 4rem;
        overflow-x: hidden;
        padding-inline: 25dvw;
        padding-bottom: 2rem;
    }

    .section-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        max-width: 100%;
    }

    .section-buttons button {
        background: none;
        color: inherit;
        border: none;
        padding: 0;
        font-family: Poppins, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        font-size: 16px;
    }

    .section-buttons a {
        font-family: Poppins, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        font-size: 16px;
    }

    .section-buttons {
        display: flex;
        flex-direction: row;
        gap: 1rem;
    }

    .content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100dvw;
        height: 90dvh;
    }

    .notebook-name {
        display: flex;
        width: 100dvw;
        justify-content: center;
        height: 15%;
        align-items: center;
    }

    h1 {
        font-size: 32px;
        font-weight: 400;
        margin: 0;
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
    
    a {
        text-decoration: inherit;
        color: inherit;
        font-size: 32px;
    }
</style>