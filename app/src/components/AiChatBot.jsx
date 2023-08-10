import React, { useState, useEffect } from 'react';
import { ChatFeed, Message } from 'react-chat-ui';
import { TextField, Button, Paper } from '@mui/material';

const AiChatBot = () => {
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [initialMessage, setinitialMessage] = useState(false);
  // const [inputKey, setInputKey] = useState('')
  // const [onhand, setonhand] = useState(false)

  useEffect(() => {
    if (!initialMessage) {
      setMessages(!initialMessage)
      const initialBotMessage = new Message({
        id: 1,
        message: "Hello! How can I help you?"
      });
      console.log(initialBotMessage)
      setMessages([...messages, initialBotMessage]);
    }
    // messages.push(initialBotMessage)
  }, []);
  const ScriptedChat = [
    {
      "Title": "onhand",
      "Questions": [
        "Are you looking for 'Manage Item Quantities?",
        "Do you want SQL Query?",
        "Here You go",
        "Hope this was Helpful"
      ]
    },
    {
      "Title": "value your inventory",
      "answer": '1. Actuals FIFO-Sum of the Purchased Cost \n 2. Standard Cost \n 3.Average Cost'
    },
    {
      "Title": "item cost",
      "answer": 'regularly,quarterly,monthly,yearly'
    },
    {
      "Title": "handle cost situation",
      "answer": 'you purchased %item at 10$ and 5 item at 20$ and you have a standard cost defined for item X is $8 now you have to order for 10 quantities at what price you will sell it.1. at standard cost defined $8 2.at $10 dollars which was received first 3. at $20 which was received later 4. at avg cost of $15'
    },
    {
      "Title": "resource rate",
      "answer": 'regularly'
    },
    {
      "Title": "onhand quantity",
      // "answer": ''
    },
  ]
  const handleUserInput = (text) => {
    const userMessage = new Message({ id: 0, message: userInput });
    console.log(userMessage)
    messages.push(userMessage)
    setUserInput('');
    // setInputKey(text)
    handleBotResponse(text);
  };
  const handleBotResponse = (userInput) => {
    const userInputLowerCase = userInput.toLowerCase();
    let response;
    for (const chat of ScriptedChat) {
      if (userInputLowerCase.includes(chat.Title)) {
        switch (chat.Title) {
          case 'onhand':
            response = chat.Questions[0];
            // if (inputKey.includes(chat.Title)) {
            //   if (userInput === "yes") {
            //     response = chat.Questions[1]
            //   } else if (userInput === "No") {
            //     response = "Is there anything else, you need help"
            //   }

            // }
          break;
          case 'value your inventory':
            response = chat.answer;
            break;
          case 'item cost':
            response = chat.answer;
            break;
          case 'handle cost situation':
            response = chat.answer;
            break;
          case 'resource rate':
            response = chat.answer;
            break;
          case 'onhand quantity':
            response = "Here's your onhand quantity file:";
            // downloadLink = onhandFile;
            //   response = <Link
            //   to={onhand}
            //   download="On-Hand"
            //   target="_blank"
            //   rel="noreferrer"
            // >
            //   Download file
            // </Link>;
            break;
          default:
            response = "I'm not sure how to respond to that.";
        }
      }
    }

    if (!response) {
      response = "I'm sorry, I didn't understand that.";
    }

    const botMessage = new Message({ id: 1, message: response });
    messages.push(botMessage)
  };

  useEffect(() => {
    const keyDownHandler = event => {
      if (event.key === 'Enter') {
        event.preventDefault();
        handleUserInput(userInput);
      }
    };
    document.addEventListener('keydown', keyDownHandler);
    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, []);
  // {initialInput}
  // <Paper elevation={3}>
  return (
    <div style={{ margin: '9px' }}>
      <Paper
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <ChatFeed
          messages={messages.map(message => ({
            id: message.id,
            message: message.message
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
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleUserInput(userInput)}
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default AiChatBot;
