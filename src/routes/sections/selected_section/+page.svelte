<script lang="ts">
    import { Charts } from '$lib/editorjs-custom-modules/charts'
    import { EditorJS, Header, EditorjsList, Paragraph, CodeTool, ImageTool, Table } from "$lib/index";
    import Icon from '@iconify/svelte';

    let add_page_empty = false;

    const editor = new EditorJS({
        holder: 'content-editor',
        tools: {
            header: Header,
            list: EditorjsList,
            paragraph: Paragraph,
            code: CodeTool,
            image: 
            {
                class: ImageTool,
                config: {
                    endpoints: {
                        byFile: '',
                    }
                }
            },
            table: Table,
            chart: Charts,
        },
    });
</script>
<div class="container">
    <div class="side-bar">
        <div class="section-info">
            <div class="notebook-name">Maths</div>
            <div class="section-name">Functions</div>
            <div class="page-list">
                <p>Page 1</p>
                <p>Page 2</p>
                <p>Page 3</p>
                <p>Page 4</p>
                <p>Page 5</p>
                <p>Page 6</p>
                <p>Page 7</p>
                <p>Page 8</p>
                <p>Page 9</p>
                <p>Page 10</p>
            </div>
            <div class="add-page">
                {#if add_page_empty}
                <div class="error">Page name cannot be empty!</div>
                {/if}
                <div class="input-container">
                    <input type="text" name="page-name" placeholder="My page">
                    <button>
                        <Icon icon="carbon:add" width="32" height="32"  style="color: #fff" />
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div id="printable" class="user-content">
        <div id="content-editor">
        </div>
    </div>
</div>

<style lang="scss">
    .add-page {
        height: 30%;
        width: 90%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .input-container {
        display: flex;
        gap: 1rem;
        height: 50%;
        width: 100%;
        input {
            font-size: 20px;
            background-color: var(--input-field-color);
            border: none;
            border-radius: 10px;
            height: 80%;
            width: 85%;
            text-align: center;
            color: white;
        }
        button {
            background-color: var(--button-color);
            border: none;
            height: 80%;
            width: 15%;
            border-radius: 100%; 
        }
    }
    .error {
        background-color: var(--error-field-color);
        font-size: 20px;
        border-radius: 10px;
        height: 20%;
        width: 90%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    @media print {
        @page {
            size: auto;
            margin: 0;
        }

        :global(body) {
            visibility: hidden;
        }

        #printable {
            color: black !important;
            padding: 100px 0px 100px 0px;
            visibility: visible;
            position: absolute;
            left: 0;
            top: 0;
        }
    }

    body {
        overflow: hidden;
    }

    :global(.ce-toolbar__plus, .ce-toolbar__settings-btn) {
        background-color: white;
    }

    :global(.cdx-notifies) {
        color: black;
    }

    #content-editor {
        width: 100%;
        height: 100%;
    }

    .notebook-name {
        font-size: 24px;
    }

    .section-name {
        font-size: 20px;
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

    .section-info {
        padding-bottom: 4rem;
        height: 50%;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .page-list {
        max-height: 80%;
        width: 100%;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    p {
        margin: 0;
        font-size: 16px;
    }
    .side-bar {
        width: 25%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 2rem;
    }

    .user-content {
        overflow-y: auto;
        width: 100%;
        height: 100%;
        background-color: var(--input-field-color);
    }

    .container {
        display: flex;
        flex-direction: row;
        height: 90dvh;
        width: 100dvw;
    }
</style>