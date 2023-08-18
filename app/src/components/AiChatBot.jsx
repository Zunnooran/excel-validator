import React, { useState, useEffect } from 'react';
import { ChatFeed, Message } from 'react-chat-ui';
import { TextField, Button, Paper } from '@mui/material';
import TestFile from '../../src/assets/files/test.txt';

const AiChatBot = () => {
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [selectedCase, setSelectedCase] = useState([])
  const inventory = [
    {
      keywords: ['inventory'],
      answer: "1. Actuals FIFO-Sum of the Purchased Cost \n 2. Standard Cost \n 3.Average Cost'",
    },
    {
      keywords: ['item', "cost"],
      answer: "1. regularly \n 2. quarterly \n 3. monthly \n 4. yearly",
    },
    {
      keywords: ['situation', 'explain'],
      answer: `you purchased %item at 10$ and 5 item at 20$ and you have a standard cost defined for item X is $8 now you have to order for 10 quantities at what price you will sell it.
              1. at standard cost defined $8 
              2.at $10 dollars which was received first 
              3. at $20 which was received later 4. at avg cost of $15`,
    },
    {
      keywords: ['lot', 'ship', 'price'],
      answer: "1. FIFO \n2. Average Cost \n3. LIFO-Oracle  Don't Support as of today",
    },
    {
      keywords: ['resource', 'rate'],
      answer: "regularly",
    },
    {
      keywords: [ 'ok'],
      answer: "Let us Know,If you have any further questions!",
    }
  ]
  const onhand = [
    {
      keywords: ['onhand'],
      answer: "Are you looking for 'Manage Item Quantities?",
    },
    {
      keywords: ['yes'],
      answer: "1. SQL Query\n2. Configuration Workbook\n3. Analysis",
    },
    {
      keywords: ['sql query', 'configuration', 'workbook', 'analysis'],
      answer: "Here we go\nfile:test.txt\nHope this was Helpful!",
    },
    {
      keywords: ['no','yeah'],
      answer: "Let us Know,If you have any further questions!",
    },
  ]

  const configuration = [{
    keywords: ['configuration', 'template'],
    answer: "Here You go\n\nfile:test.txt\nHope this was Helpful!",
  },
  // {
  //   answer: "Hope this was helpful",
  // },
  {
    keywords: ['yes'],
    answer: "Let us Know,If you have any further questions!",
  },]

  const orders = [{
    keywords: ['purchase', 'report', 'orders'],
    answer: "Purchase Order Detail Report,PO Open Purchase Orders Report(by Cost Center),Spend Analysis,Supplier Report \n Hope this was helpful",
  },
  {
    keywords: ['yes'],
    answer: "Are you looking for OTBI Reports",
  },
  {
    keywords: ['ok', 'yes'],
    answer: "Find below sample Purchasing OTBI Reports",
  },]

  const carriers = [{
    keywords: ['carriers', 'dff'],
    answer: "Carriers DFF are available under Manage carriers Descriptive Flexfields. There are 6 FlexFields \n Carrier \n Carrier organization \n Define Unit of measure \n SCM Common UOM Global Flexfield \n Transit Time\n Unit of measure classes ",
  },
  {
    keywords: ['ok'],
    answer: "Hope this was helpful",
  },
  {
    keywords: ['yes', 'yeah'],
    answer: "Let us Know,If you have any further questions!",
  },]

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
    if (userInput.trim() !== '') 
    {
      const userMessage = new Message({ id: 0, message: userInput });
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      handleBotResponse(userInput);
      setUserInput('');
    }
  };

  let answer = [];

  const handleBotResponse = (userInput) => {
    const userInputLowerCase = userInput.toLowerCase();
    let response = '';
    if (selectedCase.length === 0) {
      if( userInputLowerCase.includes('inventory')){
        setSelectedCase(inventory);
        answer = inventory
      }else if(userInputLowerCase.includes('onhand')){
        setSelectedCase(onhand);
        answer = onhand
      }else if(userInputLowerCase.includes('configuration') || userInputLowerCase.includes('template')){
        setSelectedCase(configuration);
        answer = configuration
      }else if(userInputLowerCase.includes('orders') || userInputLowerCase.includes('report') || userInputLowerCase.includes('purchase')){
        setSelectedCase(orders);
        answer = orders
      }else if(userInputLowerCase.includes('carriers') || userInputLowerCase.includes('dff')){
        setSelectedCase(carriers);
        answer = carriers
      }
    }
    if (selectedCase.length > 0 ) {
      for (const scenario of selectedCase) {
        if (scenario.keywords.some(keyword => userInputLowerCase.includes(keyword))) {
          response = scenario.answer;
          if (response ==='Let us Know,If you have any further questions!') {
            setSelectedCase([])
          }
          break
        }
      }
      }

      if(answer.length > 0 ){
        for (const scenario of answer) {
          if (scenario.keywords.some(keyword => userInputLowerCase.includes(keyword))) {
            response = scenario.answer;
            if (response === 'Let us Know,If you have any further questions!' || response === "Find below sample Purchasing OTBI Reports") {
              answer = []
            }
            break
          }
        }
      }

    if (!response) {
      response = "I'm sorry, I didn't understand that.";

    }

    const formattedResponse = response.split('\n').map((line, index) => {
      if (line.startsWith('file:')) {
        const fileName = line.replace('file:', '').trim();
        return (
          <a key={index} href={TestFile} download>
            Download File
          </a>
        );
      }
      return <p key={index}>{line}</p>;
    });

    const botMessage = new Message({ id: 1, message: formattedResponse });
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
          bubbleStyles={{ text: { fontSize: 14, color: '#333' } }}
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

