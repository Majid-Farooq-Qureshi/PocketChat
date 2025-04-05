<script>
// @ts-nocheck

    import { login, logout, currentUser } from './pocketbase';
    import { get } from 'svelte/store';
  
    let email = '';
    let password = '';
    let errorMessage = '';
  
    async function handleLogin() {
    errorMessage = '';
    console.log("Login function called with:", email, password); // Debugging
    try {
        await login(email, password);
        console.log("Login successful!"); // Debugging
    } catch (error) {
        errorMessage = 'Invalid credentials. Please try again.';
        console.error("Login failed:", error);
    }
}

  
    
  </script>
  
  {#if $currentUser}
  <p>Welcome, {$currentUser?.name}!</p>
  <p>Debug: {JSON.stringify($currentUser)}</p> <!-- Debugging -->
  <button on:click={handleLogout}>Logout</button>
{:else}
  <h2>Login</h2>
  <input type="email" bind:value={email} placeholder="Email" />
  <input type="password" bind:value={password} placeholder="Password" />
  <button on:click={handleLogin}>Login</button>
{/if}
