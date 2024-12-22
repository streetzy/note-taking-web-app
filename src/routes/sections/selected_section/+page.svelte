<script lang="ts">
    import Icon from '@iconify/svelte';
    import { writable } from 'svelte/store';
    import ChartContainer from '../../../components/Chart-Container.svelte'
    import type { ChartType } from 'chart.js';
    import type { ChartBlock } from '$lib/types';

    let font_menu_selected = false;
    let charts_menu_selected = true;
    let invalid_chart_data_flag = false;

    let chart_type: ChartType = 'bar';
    let chart_labels: string = '';
    let chart_values: string = '';
    let chart_name: string = '';

    const charts = writable<ChartBlock[]>([]);

    function set_chart_type(type: string) {
        const valid_types: ChartType[] = ['bar', 'line', 'pie'];
        if (valid_types.includes(type as ChartType)) {
            chart_type = type as ChartType;
        } else {
            invalid_chart_data_flag = true;
            return;
        }
    }

    function generate_chart_id() {
        return `chart-${Math.random().toString(36).substring(2, 9)}`;
    }

    function add_chart() {
        invalid_chart_data_flag = false;
        const labels = chart_labels.split(", ").map((label) => label.trim());
        const values = chart_values.split(", ").map((value) => parseFloat(value.trim()));
        const name = chart_name;

        if (values.includes(NaN)) {
            invalid_chart_data_flag = true;
            return;
        }

        if (labels.length !== values.length) {
            invalid_chart_data_flag = true;
            return;
        }

        charts.update((current) => [
            ...current, 
            {
                id: generate_chart_id(),
                type: chart_type,
                labels,
                datasets: [
                    {
                        label: name,
                        data: values,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    },
                ],
            },
        ]);

        chart_name = '';
        chart_labels = '';
        chart_values = '';
    }
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
        <div class="menu">
            <div class="menu-container">
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
            <div class="menu-container">
                <p>Text color:</p>
                <input type="color">
            </div>
            <div class="menu-container">
                <p>Highlight color:</p>
                <input type="color">
            </div>
            <div class="menu-buttons">
                <Icon icon="carbon:text-align-left" width="44" height="44" />
                <Icon icon="carbon:text-align-center" width="44" height="44" />
                <Icon icon="carbon:text-align-right" width="44" height="44" />
                <Icon icon="carbon:text-align-justify" width="44" height="44" />
                <Icon icon="carbon:text-italic" width="44" height="44" />
                <Icon icon="carbon:text-underline" width="44" height="44" />
                <Icon icon="carbon:text-strikethrough" width="44" height="44" />
            </div>
        </div>
        {:else if charts_menu_selected}
            {#if invalid_chart_data_flag}
            <div class="error">Invalid chart data</div>
            {/if}
            <form class="menu">
                <label>
                    Chart Type:
                    <select onchange={(e) => set_chart_type((e.target as HTMLSelectElement).value)}>
                        <option value="bar">Bar</option>
                        <option value="line">Line</option>
                        <option value="pie">Pie</option>
                    </select>
                </label>
                <label>
                    Name
                    <input 
                        type="text"
                        placeholder="Chart Name"
                        bind:value={chart_name}
                    />
                </label>
                <label>
                    Labels (separate with ", "):
                    <input
                        type="text"
                        placeholder="items, cars, bananas"
                        bind:value={chart_labels}
                    />
                </label>
            
                <label>
                    Dataset Values (separate with ", "):
                    <input
                        type="text"
                        placeholder="2, 3, 4"
                        bind:value={chart_values}
                    />
                </label>
                <button onclick={() => add_chart()}>Add Chart!</button>
            </form>
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
        {#each $charts as chart (chart.id)}
            <ChartContainer {chart} {charts}/>
        {/each}
    </div>
</div>

<style lang="scss">

    form label {
        display: flex;
        flex-direction: column;
    }

    button {
        background-color: var(--button-color);
        color: white;
        border: 0;
        border-radius: 10px;
        width: 40%;
        height: 8%;
        font-size: 20px;
    }

    input {
        background-color: var(--input-field-color);
        color: white;
        border: 0;
        height: 100%;
    }

    .error {
        background-color: var(--error-field-color);
        border-radius: 4px;
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

    .menu  {
        height: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        width: 100%;
    }

    .menu-container {
        display: flex;
        width: 100%;
        height: 10%;
        justify-content: center;
        align-items: center;
        gap: 0.5rem;
    }

    select {
        background-color: var(--input-field-color);
        color: white;
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

    .menu-buttons {
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