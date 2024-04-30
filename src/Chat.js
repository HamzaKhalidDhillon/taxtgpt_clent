import React from 'react';
import axios from 'axios';
import './chat.scss';

function Chat() {
  const [input, setInput] = React.useState('');
  const [file, setFile] = React.useState(null);
  const [messages, setMessages] = React.useState([]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post('http://localhost:8000/api/chats/', { input }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { message } = response.data;
      setMessages([{ text: message, user: 'bot' }, ...messages, { text: input, user: 'user' }]);
      setInput('');
    } catch (error) {
      console.error(error);
    }
  };

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      await axios.post('http://localhost:8000/api/attachments/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('File uploaded successfully');
    } catch (error) {
      console.error('Failed to upload file', error);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = () => {
    if (file) {
      uploadFile(file);
    }
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.user}`}>
            {message.text}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          placeholder="Ask a question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
        <label htmlFor="file-upload">
          <img src="https://www.flaticon.com/free-icons/upload" alt="Upload File" className="logo" />
        </label>
        <input
          id="file-upload"
          type="file"
          onChange={handleFileUpload}
          style={{ display: 'none' }}
        />
      </div>
    </div>
  );
}

export default Chat;
