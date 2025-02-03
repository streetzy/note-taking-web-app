<script lang="ts">
  import type { ActionData } from "./$types";
  import type { PageData } from "./$types";

  export let data: PageData;
  export let form: ActionData;
</script>

<div class="content">
  <form method="POST" enctype="multipart/form-data">
    <h1>Edit account details</h1>
    {#if form?.error}
      <div class="error">{form?.error ?? ""}</div>
    {:else if form?.message}
      <div class="success">{form?.message ?? ""}</div>
    {/if}
    <label>
      Username
      <input name="username" type="text" placeholder={data.user.username} />
    </label>
    <label>
      Password
      <input name="password" type="password" placeholder="New password" />
    </label>
    <label>
      Confirm password
      <input
        name="confirm-password"
        type="password"
        placeholder="Confirm new password"
      />
    </label>
    <label>
      Profile picture
      <div class="profile-picture">
        {#if data.user.avatar_image.data !== undefined}
          <img
            class="icon"
            src={`data:image/${data.user.avatar_image.is_png ? "png" : "jpg"};base64,${data.user.avatar_image.data}`}
            alt="Your profile avatar"
            width="64"
            height="64"
          />
        {:else}
          <img
            class="icon"
            src="carbon--unknown-user.png"
            alt="Your profile avatar"
            width="64"
            height="64"
          />
        {/if}
        <input name="avatar" type="file" accept=".png, .jpg, .jpeg" />
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
    align-items: center;
  }

  .content {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 90dvh;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
  }

  h1 {
    height: 12%;
    text-align: center;
    margin: 0;
    font-weight: 400;
    justify-content: center;
    font-size: 32px;
  }

  form {
    gap: 1rem;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 40%;
    padding-bottom: 4rem;
  }

  form label {
    min-height: 16.66%;
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
    min-height: 100%;
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

  .success {
    height: 12%;
    background-color: var(--success-field-color);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    border-radius: 10px;
  }

  @media only screen and (max-width: 1300px) {
    form {
      width: 50%;
    }

    .content {
      height: auto;
    }

    .error {
      font-size: 18px;
      padding: 8px 0px;
    }

    .success {
      font-size: 18px;
      padding: 8px 0px;
    }

    button {
      font-size: 20px;
      padding: 0.5rem;
    }

    input[type="file"] {
      padding: 0.5rem;
      width: 100%;
      font-size: 16px;
    }

    input[type="file"]::-webkit-file-upload-button {
      font-size: 18px;
    }

    form {
      height: 100%;
    }

    form label {
      font-size: 18px;
    }

    h1 {
      font-size: 28px;
    }

    .profile-picture {
      flex-direction: column;
      gap: 1rem;
      align-items: center;
    }

    input {
      font-size: 18px;
      padding: 0.5rem;
    }
  }

  @media only screen and (max-width: 768px) {
    form {
      width: 60%;
    }

    .content {
      height: auto;
    }

    .error {
      font-size: 14px;
      padding: 8px 0px;
    }

    .success {
      font-size: 14px;
      padding: 8px 0px;
    }

    button {
      font-size: 16px;
      padding: 0.5rem;
    }

    input[type="file"] {
      padding: 0.5rem;
      width: 100%;
      font-size: 12px;
    }

    input[type="file"]::-webkit-file-upload-button {
      font-size: 14px;
    }

    form {
      height: 100%;
    }

    form label {
      font-size: 14px;
    }

    h1 {
      font-size: 24px;
    }

    .profile-picture {
      flex-direction: column;
      gap: 1rem;
      align-items: center;
    }

    input {
      font-size: 14px;
      padding: 0.5rem;
    }
  }
</style>
