<script>
  import { currentUser, logout } from './lib/pocketbase';
  import Login from './lib/Login.svelte';
  import Signup from './lib/Signup.svelte';
  import Messages from './lib/messages.svelte'; // Updated to match the actual file name

  let showSignup = false; // Toggle between Login and Signup
</script>


<h1>Pocket Chat</h1>
{#if $currentUser}
<p>Welcome, {$currentUser?.name}!</p>
  <Messages />
{:else}
  {#if showSignup}
    <Signup />
    <p>Already have an account? <a href="#" on:click={() => showSignup = false}>Login</a></p>
  {:else}
    <Login />
    <p>Don't have an account? <a href="#" on:click={() => showSignup = true}>Sign up</a></p>
  {/if}
{/if}