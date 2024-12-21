<script lang="ts">

</script>

<div class="content">
    <form method="POST">
        <h1>Sign into your account</h1>
        <div class="error">Incorrect credentials</div>
        <label>
            Email
            <input name="email" type="email">
        </label>
        <label>
            Password
            <input name="password" type="password">
        </label>
        <div class="buttons">
            <button>Sign in</button>
            <div class="options">
                <a href="/login">Don't have an account?</a>
                <a href="/login">Forgot your password?</a>
            </div>
        </div>
        
    </form>
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

    h1 {
        height: 12%;
        text-align: center;
        margin: 0;
        font-weight: 400;
        justify-content: center;
    }

    form {
        gap: 1rem;
        display: flex;
        flex-direction: column;
        width: 40%;
        height: 75%;
        padding-bottom: 8rem;
    }

    form label {
        height: 16.66%;
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 4px;
        font-size: 20px;
    }

    input {
        width: 100%;
        padding: 0;
        background-color: var(--input-field-color);
        border: 0;
        border-radius: 10px;
        height: 100%;
        color: white;
        font-size: 24px;
        box-sizing: border-box;
        padding: 0.5rem;
    }

    .buttons {
        height: 16.66%;
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    button {
        height: 75%;
        padding: 0;
        margin: 0;
        border: 0;
        border-radius: 10px;
        font-size: 20px;
        background-color: var(--button-color);
        color: white;
    }
    
    .error {
        height: 12%;
        background-color: var(--error-field-color);
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;
        border-radius: 10px;
    }

    .options {
        padding-inline: 4px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    a {
        height: 25%;
        color: inherit;
        text-decoration: inherit;
        font-size: 14px;
    }
</style>