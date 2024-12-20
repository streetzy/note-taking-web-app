<script lang="ts">
    import { getContext, type Snippet } from "svelte";
    import type { Writable } from "svelte/store";

    let nav_content = getContext<Writable<Snippet | null>>("layout")

    $nav_content = navbar_button;
</script>

{#snippet navbar_button()}
    <a href="/notebooks">
        <h2>return to notebook view</h2>
    </a>
{/snippet}

<style lang="scss">
    h2 {
        margin: 0;
        font-weight: 400;
        font-size: 32px;
    }
    
    a {
        text-decoration: inherit;
        color: inherit;
    }
</style>