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
    <div class="header">
      <h1>Sign into your account</h1>
    </div>
    {#if form}
      <div class="error">{form?.message ?? ""}</div>
    {/if}
    <label>
      Email
      <input name="email" type="email" />
    </label>
    <label>
      Password
      <input name="password" type="password" />
    </label>
    <div class="buttons">
      <button disabled={creating}>Sign in</button>
      <div class="options">
        <a href="/register">Don't have an account?</a>
        <a href="/forgot-password">Forgot your password?</a>
      </div>
    </div>
  </form>
</div>

<style lang="scss">
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
    justify-content: center;
    align-items: center;
    gap: 1rem;
    display: flex;
    flex-direction: column;
    width: 40%;
    height: 90%;
    padding-bottom: 0rem;
  }

  form label {
    min-height: 12%;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 4px;
    font-size: 24px;
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
    width: 100%;
    height: 12%;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  button {
    width: 100%;
    height: 75%;
    padding: 0;
    margin: 0;
    border: 0;
    border-radius: 10px;
    font-size: 24px;
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
    font-size: 18px;
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
