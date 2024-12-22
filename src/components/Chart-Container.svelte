<script lang="ts">
    import { Chart } from "$lib/index";
    import { onMount } from "svelte";
    import { type Writable } from "svelte/store";
    import type { ChartBlock } from "$lib/types";

    let {
        chart, charts
    }: {
        charts: Writable<ChartBlock[]>,
        chart: ChartBlock
    } = $props();

    let chart_container: HTMLCanvasElement | null = null;
    let chart_instance: Chart | null = null;

    function focus_element(event: MouseEvent) {
        event.preventDefault();
        (event.target as HTMLElement).parentElement?.focus();
    }

    const render_chart = () => {
        if (chart_container === null) return;

        if (chart_instance) chart_instance.destroy();

        chart_instance = new Chart(chart_container, {
            type: chart.type,
            data: {
                labels: chart.labels,
                datasets: chart.datasets,
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
            },
        });
    };

    function remove_chart(event: KeyboardEvent) {
        if (event.code !== "Delete") {
            return;
        }

        charts.update((current) => {
            const index = current.findIndex((chart) => chart.id === document.activeElement?.id);
            if (index === -1) return current;

            current.splice(index, 1);
            return current;
        })
    }

    onMount(() => {
        render_chart();
    });
</script>


<svelte:document onkeydown={remove_chart}></svelte:document>
<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- blind people aren't real -->
<div tabindex="0" id={chart.id} onmouseup={focus_element} class="chart-wrapper">
    <canvas bind:this={chart_container}></canvas>
</div>

<style lang="scss">
    .chart-wrapper {
        outline-offset: -8px;
        width: 100%;
        height: 600px;
    }

    .chart-wrapper:focus {
        outline: 2px solid white;
    }
</style>
