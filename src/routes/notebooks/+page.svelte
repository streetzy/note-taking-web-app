<script lang="ts">
    import { getContext, type Snippet } from "svelte";
    import type { Writable } from "svelte/store";
    import Icon from '@iconify/svelte';

    let nav_content = getContext<Writable<Snippet | null>>("layout")

    $nav_content = navbar_button;
</script>

{#snippet navbar_button()}
    <a href="/notebooks/create_notebook">
        create notebook
    </a>
{/snippet}

<div class="content">
    <div class="search-field">
        <h3>Search:</h3>
        <input type="text" placeholder="Notebook name..." class="notebook-filter">
    </div>
    
    <div class="notebooks">
        <div class="notebook-container">
            <Icon icon="carbon:notebook" width="80" height="80"/>
            <h3>Maths</h3>
            <div class="notebook-buttons">
                <button>Rename</button>
                <button>Delete</button>
            </div>
        </div>
        <div class="notebook-container">
            <Icon icon="carbon:notebook" width="80" height="80"/>
            <h3>Maths</h3>
            <div class="notebook-buttons">
                <button>Rename</button>
                <button>Delete</button>
            </div>
        </div>
        <div class="notebook-container">
            <Icon icon="carbon:notebook" width="80" height="80"/>
            <h3>Maths</h3>
            <div class="notebook-buttons">
                <button>Rename</button>
                <button>Delete</button>
            </div>
        </div>
        <div class="notebook-container">
            <Icon icon="carbon:notebook" width="80" height="80"/>
            <h3>Maths</h3>
            <div class="notebook-buttons">
                <button>Rename</button>
                <button>Delete</button>
            </div>
        </div>
        <div class="notebook-container">
            <Icon icon="carbon:notebook" width="80" height="80"/>
            <h3>Maths</h3>
            <div class="notebook-buttons">
                <button>Rename</button>
                <button>Delete</button>
            </div>
        </div>
        <div class="notebook-container">
            <Icon icon="carbon:notebook" width="80" height="80"/>
            <h3>Maths</h3>
            <div class="notebook-buttons">
                <button>Rename</button>
                <button>Delete</button>
            </div>
        </div>
        <div class="notebook-container">
            <Icon icon="carbon:notebook" width="80" height="80"/>
            <h3>Maths</h3>
            <div class="notebook-buttons">
                <button>Rename</button>
                <button>Delete</button>
            </div>
        </div>
        <div class="notebook-container">
            <Icon icon="carbon:notebook" width="80" height="80"/>
            <h3>Maths</h3>
            <div class="notebook-buttons">
                <button>Rename</button>
                <button>Delete</button>
            </div>
        </div>
        <div class="notebook-container">
            <Icon icon="carbon:notebook" width="80" height="80"/>
            <h3>Maths</h3>
            <div class="notebook-buttons">
                <button>Rename</button>
                <button>Delete</button>
            </div>
        </div>
        <div class="notebook-container">
            <Icon icon="carbon:notebook" width="80" height="80"/>
            <h3>Maths</h3>
            <div class="notebook-buttons">
                <button>Rename</button>
                <button>Delete</button>
            </div>
        </div>
        <div class="notebook-container">
            <Icon icon="carbon:notebook" width="80" height="80"/>
            <h3>Maths</h3>
            <div class="notebook-buttons">
                <button>Rename</button>
                <button>Delete</button>
            </div>
        </div>
        <div class="notebook-container">
            <Icon icon="carbon:notebook" width="80" height="80"/>
            <h3>Maths</h3>
            <div class="notebook-buttons">
                <button>Rename</button>
                <button>Delete</button>
            </div>
        </div>
        <div class="notebook-container">
            <Icon icon="carbon:notebook" width="80" height="80"/>
            <h3>Maths</h3>
            <div class="notebook-buttons">
                <button>Rename</button>
                <button>Delete</button>
            </div>
        </div>

    </div>
    
</div>
<!-- <Icon icon="carbon:notebook" width="48" height="48"/> -->

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

    .notebooks {
        min-height: 90%;
        width: 100dvw;
        display: grid;
        grid-template-columns: 1fr 1fr  1fr;
        grid-template-rows: auto;
        row-gap: 4rem;
        overflow-x: hidden;
    }

    .notebook-container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .notebook-buttons {

    }



    .notebook-filter::placeholder {
        font-family: Poppins, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        font-size: 24px;
        padding-left: 4px;
    }

    .notebook-filter {
        font-family: Poppins, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        font-size: 24px;
        color: white;
    }

    .content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100dvw;
        height: 90dvh;
    }

    .search-field {
        display: flex;
        width: 100dvw;
        justify-content: center;
        gap: 1rem;
        height: 10%;
        align-items: center;
    }

    h3 {
        font-size: 24px;
        font-weight: 400;
        margin: 0;
    }

    .search-field input {
        background-color: #28202C;
        border-radius: 10px;
        border-style: solid;
        border-color: #28202C;
        width: 25%;
        height: 80%;
    }
    
    a {
        text-decoration: inherit;
        color: inherit;
        font-size: 32px;
    }
</style>