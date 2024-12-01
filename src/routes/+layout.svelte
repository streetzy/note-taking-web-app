<script lang="ts">
    import Icon from '@iconify/svelte';
    import './styles.scss';

    let loggedIn = $state(false);
    let {children} = $props();
</script>

<nav class="top-nav">
    <div class="page-name">
        <h1>inscribe</h1>
    </div>
    <div class="user-nav-menu">
        <h2>forum</h2>
        {#if loggedIn}
        <h2>notebooks</h2>
        {/if}
        <div class="user-nav-buttons">
            {#if !loggedIn}
            <Icon icon="carbon:user-avatar-filled" width="48" height="48"/>
            {:else}
            <Icon icon="carbon:gears" width="48" height="48"/>
            <Icon icon="solar:exit-linear" width="48" height="48"/>
            {/if}
        </div>
        
    </div>
    
</nav>

<style lang="scss">
    .page-name {
        display: flex;
        align-items: center;
        justify-content: center;
        padding-left: 2rem;
    }

    .page-name h1 {
        font-weight: 400;
        font-size: 40px;
        margin: 0;
    }

    .user-nav-menu {
        padding-right: 2rem;
        gap: 7.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .user-nav-menu h2 {
        margin: 0;
        font-weight: 400;
        font-size: 32px;
    }

    .user-nav-buttons {
        display: flex;
        align-items: center;
        gap: 2rem;
        line-height: 1;
    }

    .top-nav {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100dvw;
        height: 10dvh;
    }

</style>

{@render children()}