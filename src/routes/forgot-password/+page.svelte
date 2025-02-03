<script lang="ts">
  import { enhance } from "$app/forms";
  import type { ActionData } from "./$types";

  function email_sent_toggle() {
    email_sent = true;
  }

  let email_sent = $state(false);

  let { form }: { form: ActionData } = $props();
  let creating = $state(false);
</script>

<div class="content">
  <form
    method="POST"
    action="?/submit"
    class="container"
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
    <h1>Enter account's email address</h1>
    {#if email_sent}
      <div class="success">Email sent to address.</div>
    {/if}
    {#if form}
      <p>{form?.message ?? ""}</p>
    {/if}
    <input type="email" id="form-forgot-email" name="email" required />
    <button disabled={creating} onclick={email_sent_toggle}>Send email</button>
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

    input,
    button {
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

    input,
    button {
      font-size: 14px;
    }
  }
</style>
