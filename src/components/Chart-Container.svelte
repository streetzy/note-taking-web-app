<script lang="ts">
    import { Chart } from "$lib/index";
    import type { ChartsData } from "$lib/editorjs-custom-modules/charts";
    import type { ChartData } from "chart.js";
    import ChartInputField from "./ChartInputField.svelte";
    
    Chart.defaults.color = "#FFFFFF";
    
    let {
        type,
        name,
        bar_name,
        labels,
        values,
        view_toggled,
    }: ChartsData = $props();

    let canvas: HTMLCanvasElement | undefined = $state();
    let chart_instance: Chart | undefined = undefined;
    $effect(() => {
        if ( view_toggled && canvas !== undefined) {
            chart_instance = new Chart(canvas, {
                type: type,
                data: {
                    labels: labels.split(",").map((value) => value.trim()),
                    datasets: [
                        {
                            label: bar_name,
                            data: values.split(",").map((value) => parseFloat(value.trim())),
                        },
                    ],
                }
            });
        }
    });

    export const toggle_visibility = () => (view_toggled = !view_toggled);
    export const get_data = (): ChartsData => ({
        type,
        name,
        bar_name,
        labels,
        values,
        view_toggled,
    })
</script>

{#if view_toggled}
    <div class="chart-wrapper">
        <h1>{name}</h1>
        <canvas bind:this={canvas}></canvas>
    </div>
{:else}
    <div class="chart-input-wrapper">
        <ChartInputField placeholder={"Chart type: (bar OR line OR pie)"} bind:value={type}/>
        <ChartInputField placeholder={"Chart name"} bind:value={name}/>
        <ChartInputField placeholder={"Label bar name"} bind:value={bar_name}/>
        <ChartInputField placeholder={"labels (separated by a comma and a space)"} bind:value={labels}/>
        <ChartInputField placeholder={"values (separated by a comma and a space)"} bind:value={values}/>
    </div>
{/if}

<style lang="scss">
    h1 {
        text-align: center;
    }
    .chart-input-wrapper {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }
</style>