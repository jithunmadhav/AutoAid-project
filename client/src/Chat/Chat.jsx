import React, { useState } from 'react';
import { ChatEngine, getOrCreateChat, ChatList, ChatCard } from 'react-chat-engine';

const DirectChatPage = () => {
  const [chatId, setChatId] = useState(null);
  const [username, setUsername] = useState('');

  function createDirectChat(creds) {
    getOrCreateChat(
      creds,
      { is_direct_chat: true, usernames: [username] },
      () => setUsername('')
    );
  }

  return (
    <ChatEngine
      height='100vh'
      renderChatList={(chatAppState) => {
        if (!chatAppState) {
          return null; // Return null if chatAppState is not available yet
        }

        const directChats = chatAppState.chats ? chatAppState.chats.filter((chat) => chat.is_direct_chat) : [];
        return (
          <ChatList>
            {directChats.map((chat) => (
              <ChatCard
                key={chat.id}
                chat={chat}
                active={chat.id === chatId}
                onClick={() => setChatId(chat.id)}
              />
            ))}
          </ChatList>
        );
      }}
      userName='jithun'
      userSecret='jithun'
      projectID='a3972b31-b58d-4676-9e80-ad59d18ec5da'
    />
  );
};

export default DirectChatPage;
