<script lang="ts">
    function send_password_renewal() {
        email_sent = true;
    }

    let email_sent = true;
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
        width: 100%;
        height: 90dvh;
        justify-content: center;
        align-items: center;
    }

    .container {
        gap: 1rem;
        width: 40%;
        height: 40%;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-bottom: 8rem;
    }

    h1 {
        text-align: center;
        margin: 0;
        font-weight: 400;
        font-size: 28px;
    }

    input {
        width: 100%;
        background-color: var(--input-field-color);
        border: 0;
        border-radius: 10px;
        color: white;
        font-size: 20px;
        box-sizing: border-box;
        padding: 0.5rem;
    }
    button {
        width: 100%;
        padding: 0.5rem;
        margin: 0;
        border: 0;
        border-radius: 10px;
        font-size: 20px;
        background-color: var(--button-color);
        color: white;
    }
    
    .success {
        width: 100%;
        background-color: var(--success-field-color);
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;
        border-radius: 10px;
    }

    @media only screen and (max-width: 1300px) {
        .container {
            width: 60%;
        }
        h1 {
            font-size: 24px;
        }

        input, button {
            font-size: 18px;
        }
    }

    @media only screen and (max-width: 768px) {
        .container {
            width: 80%;
        }
        h1 {
            font-size: 20px;
        }

        input, button {
            font-size: 14px;
        }
    }
</style>