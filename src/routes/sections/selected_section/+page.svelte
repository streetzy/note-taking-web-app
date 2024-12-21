<script lang="ts">
    import Icon from '@iconify/svelte';
    import { getContext, type Snippet } from 'svelte';
    import { writable, type Writable } from 'svelte/store';

    let font_menu_selected = true;
</script>

<div class="container">
    <div class="styling">
        <div class="styling-buttons">
            <Icon icon="carbon:text-font" width="44" height="44" />
            <Icon icon="carbon:chart-histogram" width="44" height="44" />
            <Icon icon="carbon:code" width="44" height="44" />
            <Icon icon="carbon:image" width="44" height="44" />
            <Icon icon="carbon:table-split" width="44" height="44" />
            <Icon icon="carbon:function-math" width="44" height="44" />
            <Icon icon="carbon:list" width="44" height="44" />
            <Icon icon="carbon:printer" width="44" height="44" />
        </div>
        {#if font_menu_selected}
        <div class="font-menu">
            <div class="font-menu-container">
                <p>Font size:</p>
                <select name="font-size" id="font-size">
                    <option value="h1">h1</option>
                    <option value="h2">h2</option>
                    <option value="h3">h3</option>
                    <option value="h4">h4</option>
                    <option value="h5">h5</option>
                    <option value="h6">h6</option>
                </select>
            </div>
            <div class="font-menu-container">
                <p>Text color:</p>
                <input type="color">
            </div>
            <div class="font-menu-container">
                <p>Highlight color:</p>
                <input type="color">
            </div>
            <div class="font-menu-buttons">
                <Icon icon="carbon:text-align-left" width="44" height="44" />
                <Icon icon="carbon:text-align-center" width="44" height="44" />
                <Icon icon="carbon:text-align-right" width="44" height="44" />
                <Icon icon="carbon:text-align-justify" width="44" height="44" />
                <Icon icon="carbon:text-italic" width="44" height="44" />
                <Icon icon="carbon:text-underline" width="44" height="44" />
                <Icon icon="carbon:text-strikethrough" width="44" height="44" />
            </div>
        </div>
        {/if}
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
    <div class="user-content">
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

    .font-menu  {
        height: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        width: 100%;
    }

    .font-menu-container {
        display: flex;
        width: 100%;
        height: 10%;
        justify-content: center;
        align-items: center;
        gap: 0.5rem;
    }

    p {
        margin: 0;
        font-size: 16px;
    }

    select, input[type="color"] {
        display: inline-block;
        vertical-align: middle;
        height: 75%
    }

    .styling-buttons {
        display: grid;
        grid-template-rows: 1fr fr;
        grid-template-columns: repeat(4, 1fr);
        gap: 1rem;
        width: 60%;
        height: 15%;
    }

    .font-menu-buttons {
        display: grid;
        grid-template-rows: 1fr 1fr;
        grid-template-columns: repeat(4, 1fr);
        gap: 1rem;
        width: 60%;
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
        width: 75%;
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