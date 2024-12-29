<script lang="ts">
    import { getContext, type Snippet } from "svelte";
    import type { Writable } from "svelte/store";
    import Icon from '@iconify/svelte';

    let nav_content = getContext<Writable<Snippet | null>>("layout")

    $nav_content = navbar_button;
</script>

{#snippet navbar_button()}
    <a href="/notebooks/create-notebook">
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
                <a href="/notebooks/rename-notebook">Rename</a>
                <button>Delete</button>
            </div>
        </div>
        <div class="notebook-container">
            <Icon icon="carbon:notebook" width="80" height="80"/>
            <h3>Maths</h3>
            <div class="notebook-buttons">
                <a href="/notebooks/rename-notebook">Rename</a>
                <button>Delete</button>
            </div>
        </div>
        <div class="notebook-container">
            <Icon icon="carbon:notebook" width="80" height="80"/>
            <h3>Maths</h3>
            <div class="notebook-buttons">
                <a href="/notebooks/rename-notebook">Rename</a>
                <button>Delete</button>
            </div>
        </div>
        <div class="notebook-container">
            <Icon icon="carbon:notebook" width="80" height="80"/>
            <h3>Maths</h3>
            <div class="notebook-buttons">
                <a href="/notebooks/rename-notebook">Rename</a>
                <button>Delete</button>
            </div>
        </div>
        <div class="notebook-container">
            <Icon icon="carbon:notebook" width="80" height="80"/>
            <h3>Maths</h3>
            <div class="notebook-buttons">
                <a href="/notebooks/rename-notebook">Rename</a>
                <button>Delete</button>
            </div>
        </div>
        <div class="notebook-container">
            <Icon icon="carbon:notebook" width="80" height="80"/>
            <h3>Maths</h3>
            <div class="notebook-buttons">
                <a href="/notebooks/rename-notebook">Rename</a>
                <button>Delete</button>
            </div>
        </div>
        <div class="notebook-container">
            <Icon icon="carbon:notebook" width="80" height="80"/>
            <h3>Maths</h3>
            <div class="notebook-buttons">
                <a href="/notebooks/rename-notebook">Rename</a>
                <button>Delete</button>
            </div>
        </div>
        <div class="notebook-container">
            <Icon icon="carbon:notebook" width="80" height="80"/>
            <h3>Maths</h3>
            <div class="notebook-buttons">
                <a href="/notebooks/rename-notebook">Rename</a>
                <button>Delete</button>
            </div>
        </div>
        <div class="notebook-container">
            <Icon icon="carbon:notebook" width="80" height="80"/>
            <h3>Maths</h3>
            <div class="notebook-buttons">
                <a href="/notebooks/rename-notebook">Rename</a>
                <button>Delete</button>
            </div>
        </div>
        <div class="notebook-container">
            <Icon icon="carbon:notebook" width="80" height="80"/>
            <h3>Maths</h3>
            <div class="notebook-buttons">
                <a href="/notebooks/rename-notebook">Rename</a>
                <button>Delete</button>
            </div>
        </div>
        <div class="notebook-container">
            <Icon icon="carbon:notebook" width="80" height="80"/>
            <h3>Maths</h3>
            <div class="notebook-buttons">
                <a href="/notebooks/rename-notebook">Rename</a>
                <button>Delete</button>
            </div>
        </div>
        <div class="notebook-container">
            <Icon icon="carbon:notebook" width="80" height="80"/>
            <h3>Maths</h3>
            <div class="notebook-buttons">
                <a href="/notebooks/rename-notebook">Rename</a>
                <button>Delete</button>
            </div>
        </div>
        <div class="notebook-container">
            <Icon icon="carbon:notebook" width="80" height="80"/>
            <h3>Maths</h3>
            <div class="notebook-buttons">
                <a href="/notebooks/rename-notebook">Rename</a>
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

    .notebooks {
        min-height: 85%;
        width: 50%;
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        grid-template-rows: auto;
        row-gap: 4rem;
        overflow-x: hidden;
        padding-inline: 0;
        padding-bottom: 2rem;
    }

    .notebook-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        max-width: 100%;
    }

    .notebook-buttons button {
        background: none;
        color: inherit;
        border: none;
        padding: 0;
        font-family: Poppins, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        font-size: 16px;
    }

    .notebook-buttons a {
        font-family: Poppins, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        font-size: 16px;
    }

    .notebook-buttons {
        display: flex;
        flex-direction: row;
        gap: 1rem;
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
        width: 100%;
        height: 90dvh;
    }

    .search-field {
        display: flex;
        width: 100%;
        justify-content: center;
        gap: 1rem;
        height: 15%;
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
    }
    
    a {
        text-decoration: inherit;
        color: inherit;
        font-size: 32px;
    }

    @media only screen and (max-width: 1300px) {
        .notebooks {
            width: 70%;
        }

        .search-field {
            input {
                font-size: 20px;

            }

            ::placeholder {
                font-size: 20px;
            }
        }

        .notebook-buttons {
            button {
                font-size: 14px;
            }
            a {
                font-size: 14px;
            }
        }

        h3 {
            font-size: 20px;
        }
    }

    @media only screen and (max-width: 768px) {
        .notebooks {
            width: 100%;
        }

        .search-field {
            input {
                font-size: 18px;
                width: 40%;

            }

            ::placeholder {
                font-size: 18px;
            }
        }

        .notebook-buttons {
            button {
                font-size: 14px;
            }
            a {
                font-size: 14px;
            }
        }

        h3 {
            font-size: 16px;
        }
    }
</style>