<script>
  import { currentUser, logout } from './lib/pocketbase';
  import Login from './lib/Login.svelte';
  import Signup from './lib/Signup.svelte';

  let showSignup = false; // Toggle between Login and Signup
</script>


<h1>Pocket Chat</h1>
{#if $currentUser}
<p>Welcome, {$currentUser?.name}!</p>
  <button on:click={logout}>Logout</button>
{:else}
  {#if showSignup}
    <Signup />
    <p>Already have an account? <a href="#" on:click={() => showSignup = false}>Login</a></p>
  {:else}
    <Login />
    <p>Don't have an account? <a href="#" on:click={() => showSignup = true}>Sign up</a></p>
  {/if}
{/if}
