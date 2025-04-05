<script lang="ts">
    import { pb, currentUser } from "./pocketbase";
    import { writable } from 'svelte/store';
    import { onMount, onDestroy } from 'svelte';

    let newMessage: string = '';
    let messages: Array<{ id: string; text: string; expand?: { user?: { username: string } } }> = [];

    async function sendMessages() {
        const data = {
            text: newMessage,
            user: $currentUser?.id ?? 'unknown',
            created: new Date().toISOString()
        };
        const createdMessage = await pb.collection('messages').create(data);
        newMessage = ''; // Clear the input field after sending
    }

    onMount(async () => {
        // Get initial messages
        const resultList = await pb.collection('messages').getList(1, 50, {
            sort: 'created',
            expand: 'user',
        });
        messages = resultList.items.map(item => ({
            id: item.id,
            text: item.text,
            expand: item.expand
        }));

        // Subscribe to real-time updates
        pb.collection('messages').subscribe('*', (e) => {
            if (e.action === 'create') {
                messages = [...messages, {
                    id: e.record.id,
                    text: e.record.text,
                    expand: e.record.expand
                }]; // Add new message to the list
            }
        });
    });

    onDestroy(() => {
        // Unsubscribe from real-time updates
        pb.collection('messages').unsubscribe('*');
    });
</script>

<div class="messages">
    {#each messages as message (message.id)}
      <div class="msg">
        <img
          class="avatar"
          src={`https://avatars.dicebear.com/api/identicon/${message.expand?.user?.username}.svg`}
          alt="avatar"
          width="40px"
        />
        <div>
          <small>
            Sent by @{message.expand?.user?.username}
          </small>
          <p class="msg-text">{message.text}</p>
        </div>
      </div>
    {/each}
</div>
  
<form on:submit|preventDefault={sendMessages}>
    <input type="text" bind:value={newMessage} placeholder="Type your message here..." />
    <button type="submit">Send</button>
</form>