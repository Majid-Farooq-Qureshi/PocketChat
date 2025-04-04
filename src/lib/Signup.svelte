<script lang="ts">
    import { signup, currentUser } from './pocketbase';
    import { get } from 'svelte/store';
  
    let name = '';
    let email = '';
    let password = '';
    let errorMessage = '';
  
    async function handleSignup() {
        errorMessage = '';
        try {
            await signup(name, email, password);
        } catch (error) {
            errorMessage = 'Signup failed. Please try again.';
        }
    }
  </script>
  
  {#if get(currentUser)}
  <p>Welcome, {$currentUser?.name}!</p>
  {:else}
    <h2>Sign Up</h2>
    {#if errorMessage}
      <p style="color: red;">{errorMessage}</p>
    {/if}
    <input type="text" bind:value={name} placeholder="Username" />
    <input type="email" bind:value={email} placeholder="Email" />
    <input type="password" bind:value={password} placeholder="Password" />
    <button on:click={handleSignup}>Sign Up</button>
  {/if}
  