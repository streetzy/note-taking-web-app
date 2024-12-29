<script lang="ts">
    import type { ActionData } from "./$types";


    export let form: ActionData;
</script>

<div class="content">
    <form method="POST">
        <h1>Register</h1>
        <div class="error">{form?.message ?? ""}</div>
        <label>
            Username
            <input name="username" type="text" minlength="4" maxlength="31" required>
        </label>
        <label>
            Email
            <input name="email" type="email" required id="form-signup-email">
        </label>
        <label>
            Password
            <input name="password" type="password" required id="form-signup-password">
        </label>
        <div class="buttons">
            <button>Register account</button>
            <a href="/login">Already registered?</a>
        </div>
    </form>
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

    a {
        padding-left: 4px;
        height: 25%;
        color: inherit;
        text-decoration: inherit;
        font-size: 14px;
    }
    @media only screen and (max-width: 1300px) {
        .error {
            font-size: 18px;
        }
        a {
            font-size: 14px;
        }
        button {
            font-size: 16px;
        }
        input {
            font-size: 16px;
        }
        form label {
            font-size: 18px;
        }
        h1 {
            font-size: 24px;
        }
    }
    @media only screen and (max-width: 768px) {
        .error {
            font-size: 12px;
        }
        a {
            font-size: 10px;
        }
        button {
            font-size: 12px;
        }
        input {
            font-size: 12px;
        }
        form label {
            font-size: 14px;
        }
        h1 {
            font-size: 20px;
        }
    }
</style>