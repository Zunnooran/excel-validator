import React, { useState, useEffect } from 'react';
import { ChatFeed, Message } from 'react-chat-ui';
import { TextField, Button, Paper } from '@mui/material';

const AiChatBot = () => {
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState([]);

  const scenarios = [
    {
      keywords: ['onhand'],
      answer: "Are you looking for 'Manage Item Quantities?",
    },
    {
      keywords: ['yes', 'ok'],
      answer: "1. SQL Query\n2. Configuration Workbook\n3. Analysis",
    },
    {
      keywords: ['sql query', 'configuration', 'workbook', 'analysis'],
      answer: "Here we go\nfile1",
    },
    {
      keywords: ['no'],
      answer: "Let us Know,If you have any further questions!",
    },
    {
      keywords: ['inventory'],
      answer: "1. Actuals FIFO-Sum of the Purchased Cost \n 2. Standard Cost \n 3.Average Cost'",
    },
    {
      keywords: ['item',"cost"],
      answer: "regularly,quarterly,monthly,yearly",
    },
    {
      keywords: ['situation','explain'],
      answer:"you purchased %item at 10$ and 5 item at 20$ and you have a standard cost defined for item X is $8 now you have to order for 10 quantities at what price you will sell it.1. at standard cost defined $8 2.at $10 dollars which was received first 3. at $20 which was received later 4. at avg cost of $15",
    },
    {
      keywords: ['lot','ship','price'],
      answer: "1. FIFO 2. Average Cost 3. LIFO-Oracle  Don't Support as of today",
    },
    {
      keywords: ['resource','rate'],
      answer: "regularly",
    },
  ];

  useEffect(() => {
    if (messages.length === 0) {
      const initialBotMessage = new Message({
        id: 1,
        message: "Hello! How can I help you?",
      });
      setMessages([initialBotMessage]);
    }
  }, []);

  const handleUserInput = () => {
    if (userInput.trim() !== '') {
      const userMessage = new Message({ id: 0, message: userInput });
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      handleBotResponse(userInput);
      setUserInput('');
    }
  };

  const handleBotResponse = (userInput) => {
    const userInputLowerCase = userInput.toLowerCase();
    let response = '';

    for (const scenario of scenarios) {
      if (scenario.keywords.some(keyword => userInputLowerCase.includes(keyword))) {
        response = scenario.answer;
        break;
      }
    }

    if (!response) {
      response = "I'm sorry, I didn't understand that.";
    }

    const botMessage = new Message({ id: 1, message: response });
    setMessages((prevMessages) => [...prevMessages, botMessage]);
  };

  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        handleUserInput();
      }
    };
    document.addEventListener('keydown', keyDownHandler);
    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, []);

  return (
    <div style={{ margin: '9px' }}>
      <Paper
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <ChatFeed
          messages={messages.map((message) => ({
            id: message.id,
            message: message.message,
          }))}
          isTyping={false}
          bubbleStyles={{ text: { fontSize: 14 } }}
        />
      </Paper>
      <div style={{ display: 'flex', gap: '8px', padding: '16px' }}>
        <TextField
          variant="outlined"
          size="small"
          fullWidth
          label="Type a message"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleUserInput();
            }
          }}
        />
        <Button variant="contained" color="primary" onClick={handleUserInput}>
          Send
        </Button>
      </div>
    </div>
  );
};

export default AiChatBot;
