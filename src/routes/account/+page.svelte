<script lang="ts">

</script>

<div class="content">
    <form>
        <h1>Edit account details</h1>
        <div class="error">Invalid password (at least 8 characters)</div>
        <label>
            Username
            <input name="username" type="text">
        </label>
        <label>
            Password
            <input name="password" type="password">
        </label>
        <label>
            Confirm password
            <input name="password" type="password">
        </label>
        <label>
            Profile picture
            <div class="profile-picture">
                <img src="carbon--unknown-user.png" alt="Your profile avatar" width="64" height="64"/>
                <input name="avatar" type="file" accept="image/png, image/jpeg" />
            </div>
        </label>
        <div class="buttons">
            <button>Submit</button>
        </div>
    </form>
</div>


<style lang="scss">
    input[type="file"] {
        line-height: 2.5rem;
        width: 40%;
        background-color: #060309;
        border: 1px solid #333;
        border-radius: 10px;
        color: white;
        font-size: 18px;
        padding: 0.5rem;
    }

    input[type="file"]::-webkit-file-upload-button {
        background-color: #222;
        color: white;
        border: none;
        padding: 0.3rem 0.6rem;
        border-radius: 5px;
        font-size: 16px;
    }


    .profile-picture {
        display: flex;
        flex-direction: row;
        justify-content: center;
        gap: 2rem;
    }
    
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