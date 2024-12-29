<script lang="ts">
    import { getContext, type Snippet } from "svelte";
    import type { Writable } from "svelte/store";
    import Icon from "@iconify/svelte";
    import { type PageData } from "./$types";

    let nav_content = getContext<Writable<Snippet | null>>("layout");
    let { data }: { data: PageData } = $props();

    let sections: { section_id: string, section_name: string}[] = $state([]);
    if (!data.sections) {
        sections = [];
    } else {
        sections = data.sections
    }
    $nav_content = navbar_button;

</script>

{#snippet navbar_button()}
    <a href={`/notebooks/${data.notebook_id}/sections/create-section`}> create section </a>
{/snippet}

<div class="content">
    <div class="notebook-name">
        <h1>{data.notebook_name}</h1>
    </div>
    <div class="sections">
        {#each sections as section}
            <div class="section-container">
                <a href={`/notebooks/${data.notebook_id}/sections/${section.section_id}/selected-section`}>
                    <Icon icon="carbon:folder" width="80" height="80" />
                </a>
                <h3>{section.section_name}</h3>
                <div class="section-buttons">
                    <a href={`/notebooks/${data.notebook_id}/sections/${section.section_id}/rename-section`}>Rename</a>
                    <a href={`/notebooks/${data.notebook_id}/sections/${section.section_id}/delete-section`}>Delete</a>
                </div>
            </div>
        {/each}
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

    .sections {
        min-height: 85%;
        width: 50%;
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        grid-template-rows: auto;
        row-gap: 4rem;
        overflow-x: hidden;
        padding-inline: 2rem;
        padding-bottom: 2rem;
    }

    .section-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        max-width: 100%;
    }

    .section-buttons button {
        background: none;
        color: inherit;
        border: none;
        padding: 0;
        font-family:
            Poppins,
            system-ui,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            Roboto,
            Oxygen,
            Ubuntu,
            Cantarell,
            "Open Sans",
            "Helvetica Neue",
            sans-serif;
        font-size: 16px;
    }

    .section-buttons a {
        font-family:
            Poppins,
            system-ui,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            Roboto,
            Oxygen,
            Ubuntu,
            Cantarell,
            "Open Sans",
            "Helvetica Neue",
            sans-serif;
        font-size: 16px;
    }

    .section-buttons {
        display: flex;
        flex-direction: row;
        gap: 1rem;
    }

    .content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: auto;
    }

    .notebook-name {
        display: flex;
        width: 100%;
        justify-content: center;
        height: 15%;
        align-items: center;
    }

    h1 {
        font-size: 32px;
        font-weight: 400;
        margin: 0;
    }

    h3 {
        font-size: 24px;
        font-weight: 400;
        margin: 0;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        max-width: 60%;
    }

    a {
        text-decoration: inherit;
        color: inherit;
        font-size: 32px;
    }

    @media only screen and (max-width: 1300px) {
        .sections {
            width: 70%;
        }

        .section-buttons {
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

        h1 {
            font-size: 28px;
        }
    }

    @media only screen and (max-width: 768px) {
        .sections {
            width: 100%;
        }

        .section-buttons {
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

        h1 {
            font-size: 26px;
        }
    }
</style>
