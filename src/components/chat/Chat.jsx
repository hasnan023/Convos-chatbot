import React, { useState, useEffect } from "react";
import {
  Box,
  VStack,
  Heading,
  Flex,
  Text,
  Input,
  HStack,
  Button,
  useColorMode,
  useBreakpointValue,
} from "@chakra-ui/react";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import Typical from "react-typical";
const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [chat, setChat] = useState(null);
  const { colorMode } = useColorMode();
  const [error, setError] = useState(null);

  const API_KEY = "AIzaSyAFQOLdLh473U3KdSoPGYvDCo0bqWwN6Co"; // Replace with your actual Gemini API key
  const MODEL_NAME = "gemini-1.0-pro";
  const genAI = new GoogleGenerativeAI(API_KEY);
  const generationConfig = {
    temperature: 0.9,
    topP: 1,
    topK: 1,
    maxOutputTokens: 2048,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  useEffect(() => {
    const initChat = async () => {
      try {
        const newChat = await genAI
          .getGenerativeModel({ model: MODEL_NAME })
          .startChat({
            generationConfig,
            safetySettings,
            history: [],
          });
        setChat(newChat);

        // Add initial bot message
        const initialBotMessage = {
          text: "Hello! How may I help you?",
          role: "bot",
        };
        setMessages([initialBotMessage]);
      } catch (error) {
        setError("Failed to initialize chat.");
        console.error(error);
      }
    };

    initChat();
  }, []); // Ensure the dependency is correct

  const handleSendMessage = async () => {
    try {
      const userMessage = {
        text: userInput,
        role: "user",
      };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setUserInput("");

      if (chat) {
        const result = await chat.sendMessage(userInput);
        const botMessage = {
          text: await result.response.text(), // Await response text
          role: "bot",
        };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      }
    } catch (error) {
      setError("Failed to send message.");
      console.error(error);
    }
  };

  // Responsive design using Chakra UI breakpoints
  const isSmallerScreen = useBreakpointValue({ base: true, md: false });

  return (
    <Box flex="1" bg="#E4E4D0" minH="100vh">
      <Flex
        direction="column"
        align="center"
        justify="center"
        minH="100vh"
        bg={colorMode === "light" ? "#E4E4D0" : "#E4E4D0"}
      >
        <Box
          bg="#94A684"
          p={6}
          borderRadius="md"
          boxShadow="lg"
          width="100%"
          maxW={isSmallerScreen ? "100%" : "lg"}
        >
          <Heading mb={4} textAlign="center" fontSize="2xl" color="black">
            <Typical
              steps={["Chat with Convos🤖", 1000]}
              loop={1}
              wrapper="span"
            />
          </Heading>
          <VStack
            spacing={4}
            align="stretch"
            mb={4}
            overflow="auto"
            h="50vh"
            sx={{
              /* Custom scrollbar styles for WebKit browsers */
              "&::-webkit-scrollbar": {
                width: "8px",
              },
              "&::-webkit-scrollbar-track": {
                background: "#f1f1f1",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "#888",
                borderRadius: "4px",
              },
              "&::-webkit-scrollbar-thumb:hover": {
                background: "#555",
              },
            }}
          >
            {messages.map((msg, index) => (
              <HStack
                key={index}
                justify={msg.role === "user" ? "flex-end" : "flex-start"}
                mb={2}
              >
                <Text
                  bg={msg.role === "user" ? "#AEC3AE" : "gray.100"}
                  color={msg.role === "user" ? "black" : "gray.800"}
                  p={3}
                  borderRadius="md"
                  maxW="80%"
                >
                  {msg.text}
                </Text>
              </HStack>
            ))}
          </VStack>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
          >
            <HStack mt={4}>
              <Input
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Type your message..."
                variant="outline"
                bg="white"
                color="black"
              />
              <Button type="submit" color="#AEC3AE" textColor="black">
                Send
              </Button>
            </HStack>
          </form>
        </Box>
      </Flex>
    </Box>
  );
};

export default Chat;
