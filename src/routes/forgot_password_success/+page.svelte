<script lang="ts">

</script>

<div class="content">
    <form>
        <h1>Change password</h1>
        <div class="error">Invalid password</div>
        <label>
            Password
            <input name="password" type="password">
        </label>
        <label>
            Confirm password
            <input name="password" type="password">
        </label>
        <div class="buttons">
            <button>Change password</button>
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
</style>