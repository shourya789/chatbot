import React, { useState } from 'react';

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');

  const handleSendMessage = () => {
    if (userInput.trim() !== '') {
      setMessages([...messages, { sender: 'user', text: userInput }]);
      const userMessage = userInput.toLowerCase();
      setUserInput('');

      let botResponse = "I'm not sure I understand that. Can you please clarify?";

      if (userMessage.includes('weather')) {
        botResponse = 'The weather is sunny and 25°C.';
      } else if (userMessage.includes('joke')) {
        botResponse = 'Why don’t skeletons fight each other? They don’t have the guts!';
      } else if (userMessage.includes('quote')) {
        botResponse = '“The only limit to our realization of tomorrow is our doubts of today.” – Franklin D. Roosevelt';
      } else if (userMessage.includes('hello') || userMessage.includes('hi')) {
        botResponse = 'Hello! How can I assist you today?';
      } else if (userMessage.includes('bye')) {
        botResponse = 'Goodbye! Have a great day!';
      }

      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: 'bot', text: botResponse },
        ]);
      }, 1000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const styles = {
    container: {
      maxWidth: '500px',
      margin: '20px auto',
      padding: '20px',
      background: 'rgba(255, 255, 255, 0.9)',
      borderRadius: '15px',
      boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
      fontFamily: 'Arial, sans-serif',
      position: 'relative',
      zIndex: 2,
    },
    background: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 1,
      backgroundImage: 'url("/wallpaper.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      filter: 'blur(5px)',
    },
    header: {
      textAlign: 'center',
      fontSize: '1.8em',
      color: '#007bff',
      marginBottom: '20px',
      fontWeight: 'bold',
    },
    chatWindow: {
      border: '1px solid #d9d9d9',
      borderRadius: '10px',
      padding: '15px',
      height: '350px',
      overflowY: 'auto',
      backgroundColor: '#f9f9f9',
      marginBottom: '15px',
      zIndex: 2,
    },
    messageContainer: {
      marginBottom: '10px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
    userMessage: {
      backgroundColor: '#007bff',
      color: '#fff',
      padding: '10px 15px',
      borderRadius: '15px',
      maxWidth: '75%',
      alignSelf: 'flex-end',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      fontSize: '0.9em',
    },
    botMessage: {
      backgroundColor: '#e6f7ff',
      color: '#0056b3',
      padding: '10px 15px',
      borderRadius: '15px',
      maxWidth: '75%',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      fontSize: '0.9em',
    },
    inputContainer: {
      display: 'flex',
      alignItems: 'center',
      zIndex: 2,
    },
    input: {
      flex: 1,
      padding: '12px',
      borderRadius: '20px',
      border: '1px solid #d9d9d9',
      fontSize: '1em',
      outline: 'none',
      marginRight: '10px',
      boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    button: {
      padding: '10px 20px',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '20px',
      cursor: 'pointer',
      fontWeight: 'bold',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      transition: 'background-color 0.3s ease',
    },
  };

  return (
    <>
      <div style={styles.background}></div>
      <div style={styles.container}>
        <h2 style={styles.header}>Welcome to Chatbot!</h2>
        <div style={styles.chatWindow}>
          {messages.map((msg, index) => (
            <div
              key={index}
              style={{
                ...styles.messageContainer,
                alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              }}
            >
              <div
                style={
                  msg.sender === 'user'
                    ? styles.userMessage
                    : styles.botMessage
                }
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>
        <div style={styles.inputContainer}>
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type your message..."
            onKeyDown={handleKeyPress}
            style={styles.input}
          />
          <button onClick={handleSendMessage} style={styles.button}>
            Send
          </button>
        </div>
      </div>
    </>
  );
}

export default Chatbot;
