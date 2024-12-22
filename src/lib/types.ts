import type { ChartType } from "chart.js/auto";

export type ChartBlock = {
    id: string;
    type: ChartType;
    labels: string[];
    datasets: any[];
}