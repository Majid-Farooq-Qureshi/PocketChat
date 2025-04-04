import PocketBase from 'pocketbase';
import { writable } from 'svelte/store';

const pb = new PocketBase('http://127.0.0.1:8090');

// Writable store for the authenticated user
export const currentUser = writable(pb.authStore.model);

// Ensure the store updates on authentication changes
pb.authStore.onChange(() => {
    console.log("AuthStore changed:", pb.authStore.model); // Debugging
    currentUser.set(pb.authStore.model);
});


// Login function
export async function login(email: string, password: string) {
    try {
        const authData = await pb.collection('users').authWithPassword(email, password);
        console.log("Auth data received:", authData); // Debugging
        currentUser.set(authData.record); // Set user data
        return authData;
    } catch (error) {
        console.error("Login failed:", error);
        throw error;
    }
}


// Signup function
export async function signup(name: string, email: string, password: string) {
    try {
        const newUser = await pb.collection('users').create({
            name,
            email,
            password,
            passwordConfirm: password // PocketBase requires password confirmation
        });

        // Automatically log in after signup
        return await login(email, password);
    } catch (error) {
        console.error("Signup failed:", error);
        throw error;
    }
}

// Logout function
export function logout() {
    pb.authStore.clear();
    currentUser.set(null);
}
