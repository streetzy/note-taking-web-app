<script lang="ts">
  import { enhance } from "$app/forms";
  import type { ActionData } from "./$types";
  let { form }: { form: ActionData } = $props();
  let creating = $state(false);
</script>

<div class="content">
  <form
    method="POST"
    action="?/submit"
    use:enhance={() => {
      creating = true;

      return async ({ update, result }) => {
        await update();
        if (result.type === "redirect") {
          window.location.href = result.location;
        } else {
          creating = false;
        }
      };
    }}
  >
    <h1>Change password</h1>
    <p>{form?.message ?? ""}</p>
    <label>
      Verification Code
      <input type="text" name="code" required />
    </label>
    <label>
      Password
      <input name="password" type="password" required />
    </label>
    <label>
      Confirm password
      <input name="confirm-password" type="password" required />
    </label>
    <div class="buttons">
      <button disabled={creating}>Change password</button>
    </div>
  </form>
</div>

<style>
  button {
    cursor: pointer;
  }

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
    min-height: 16.66%;
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

  @media only screen and (max-width: 1300px) {
    form {
      height: 60%;
      width: 50%;
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
    form {
      height: 50%;
      width: 60%;
    }
    button {
      font-size: 12px;
    }
    form label {
      font-size: 14px;
    }
    input {
      font-size: 12px;
    }
    h1 {
      font-size: 20px;
    }
  }
</style>
