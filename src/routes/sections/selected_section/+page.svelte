<script lang="ts">
    import { Charts } from '$lib/editorjs-custom-modules/charts'
    import { EditorJS, Header, EditorjsList, Paragraph, CodeTool, ImageTool, Table } from "$lib/index";

    const editor = new EditorJS({
        holder: 'content-editor',
        tools: {
            header: Header,
            list: EditorjsList,
            paragraph: Paragraph,
            code: CodeTool,
            image: ImageTool,
            table: Table,
            chart: Charts,
        },
    });
</script>

<div class="container">
    <div class="styling">
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
        </div>
    </div>
    <div id="printable" class="user-content">
        <div id="content-editor">
        </div>
    </div>
</div>

<style lang="scss">

    body {
        overflow: hidden;
    }

    :global(.ce-toolbar__plus, .ce-toolbar__settings-btn) {
        background-color: white;
    }

    #content-editor {
        width: 100%;
        height: 100%;
    }

    .notebook-name, .section-name {
        padding-right: 1rem;
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
        height: 35%;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .page-list {
        max-height: 100%;
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
    .styling {
        width: 25%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
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