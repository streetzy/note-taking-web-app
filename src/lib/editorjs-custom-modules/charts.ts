import { mount } from "svelte";
import ChartContainer from "../../components/Chart-Container.svelte";
import type { ChartType } from "chart.js/auto";
import type { BlockTool, MenuConfig, ToolboxConfig } from "@editorjs/editorjs/types/tools";

export type ChartsData = {
    type: ChartType,
    name: string,
    bar_name: string;
    labels: string,
    values: string,
    view_toggled: boolean,
}

export class Charts implements BlockTool {
    data: ChartsData;
    chart_component!: ChartContainer;

    public constructor({ data }: { data: ChartsData }) {
        this.data = {
            type: data.type || "",
            name: data.name || "",
            bar_name: data.bar_name || "",
            labels: data.labels || "",
            values: data.values || "",
            view_toggled: data.view_toggled || false,
        };
    }

    static get toolbox(): ToolboxConfig {
        return {
            title: "Chart",
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="17" height="15" viewBox="0 0 32 32"><path fill="currentColor" d="M27 28V6h-8v22h-4V14H7v14H4V2H2v26a2 2 0 0 0 2 2h26v-2Zm-14 0H9V16h4Zm12 0h-4V8h4Z"/></svg>`
        }
    }

    public renderSettings(): MenuConfig {
        return [{
            label: "Toggle viewing",
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="17" height="15" viewBox="0 0 32 32"><circle cx="23" cy="24" r="2" fill="currentColor"/><path fill="currentColor" d="M30.777 23.479A8.64 8.64 0 0 0 23 18a8.64 8.64 0 0 0-7.777 5.479L15 24l.223.522A8.64 8.64 0 0 0 23 30a8.64 8.64 0 0 0 7.777-5.478L31 24zM23 28a4 4 0 1 1 4-4a4.005 4.005 0 0 1-4 4m-10.601-7.2A6 6 0 1 1 22 16h-2a4 4 0 1 0-6.4 3.2z"/><path fill="currentColor" d="m29.305 11.044l-2.36-4.088a2 2 0 0 0-2.374-.895l-2.434.824a11 11 0 0 0-1.312-.758l-.504-2.52A2 2 0 0 0 18.36 2h-4.72a2 2 0 0 0-1.961 1.608l-.504 2.519a11 11 0 0 0-1.327.753l-2.42-.819a2 2 0 0 0-2.372.895l-2.36 4.088a2 2 0 0 0 .411 2.502l1.931 1.697C5.021 15.495 5 15.745 5 16q0 .387.028.766l-1.92 1.688a2 2 0 0 0-.413 2.502l2.36 4.088a2 2 0 0 0 2.374.895l2.434-.824a11 11 0 0 0 1.312.759l.503 2.518A2 2 0 0 0 13.64 30H15v-2h-1.36l-.71-3.55a9.1 9.1 0 0 1-2.695-1.572l-3.447 1.166l-2.36-4.088l2.725-2.395a8.9 8.9 0 0 1-.007-3.128l-2.718-2.39l2.36-4.087l3.427 1.16A9 9 0 0 1 12.93 7.55L13.64 4h4.72l.71 3.55a9.1 9.1 0 0 1 2.695 1.572l3.447-1.166l2.36 4.088l-2.798 2.452L26.092 16l2.8-2.454a2 2 0 0 0 .413-2.502"/></svg>`,
            toggle: true,
            onActivate: () => {
                this.chart_component.toggle_visibility();
            },
            isActive: () => {
                return this.data.view_toggled;
            }
        }];
    }

    public render() {
        const wrapper = document.createElement('div');

        this.chart_component = mount(ChartContainer, {
            target: wrapper,
            props: this.data
        });

        return wrapper;
    }

    public save(): ChartsData {
        return this.chart_component.get_data();
    }
}

