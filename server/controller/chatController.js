import axios from 'axios';
import ChatEngineCore from 'chat-engine';

const ChatEngine = ChatEngineCore.create({
  publishKey: process.env.CHAT_SECRET_KEY,
  subscribeKey: process.env.CHAT_PROJECT_ID,
});

export const createChannel = (req, res) => {
  const { userId } = req.query;
  const mechanicUsername = 'sarath';
  const channelId = `chat_${userId}_${mechanicUsername}`;

  // Connect to ChatEngine
  ChatEngine.connect(userId, { authKey: process.env.CHAT_SECRET_KEY })
    .then(() => {
      // Create the chat channel using Chat Engine SDK
      const chat = new ChatEngine.Chat(channelId);
      chat.invite(mechanicUsername);

      res.json({ success: true, channelId });
    })
    .catch((error) => {
      console.error('Error connecting to ChatEngine:', error);
      res.status(500).json({ success: false, error: 'Failed to create channel.' });
    });
};
