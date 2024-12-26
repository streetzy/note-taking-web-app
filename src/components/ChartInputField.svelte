<script lang="ts">
    let {
        placeholder,
        value = $bindable(),
    }: {
        placeholder: string,
        value: string,
    } = $props();
</script>

<input type="text" class="cdx-input" {placeholder} bind:value>