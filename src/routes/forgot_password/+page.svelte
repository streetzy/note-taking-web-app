<script lang="ts">
    function send_password_renewal() {
        email_sent = true;
    }

    let email_sent = false;
</script>

<div class="content">
    <div class="container">
        <h1>Enter account's email address</h1>
        {#if email_sent}
        <div class="success">Email sent!</div>
        {/if}
        <input type="text">
        <button>Send email</button>
    </div>
</div>


<style lang="scss">
    .content {
        display: flex;
        flex-direction: column;
        width: 100dvw;
        height: 90dvh;
        justify-content: center;
        align-items: center;
    }

    .container {
        gap: 1rem;
        width: 30%;
        height: 30%;
        display: flex;
        flex-direction: column;
        padding-bottom: 8rem;
    }

    h1 {
        height: 20%;
        text-align: center;
        margin: 0;
        font-weight: 400;
        font-size: 28px;
        justify-content: center;
    }

    input {
        width: 100%;
        height: 25%;
        background-color: var(--input-field-color);
        border: 0;
        border-radius: 10px;
        color: white;
        font-size: 20px;
        box-sizing: border-box;
        padding: 0.5rem;
    }
    button {
        height: 25%;
        padding: 0;
        margin: 0;
        border: 0;
        border-radius: 10px;
        font-size: 20px;
        background-color: var(--button-color);
        color: white;
    }
    
    .success {
        height: 25%;
        background-color: var(--success-field-color);
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;
        border-radius: 10px;
    }
</style>