import React, { useState } from "react";
import {
  ChakraProvider,
  Box,
  Flex,
  IconButton,
  Image,
  VStack,
  useDisclosure,
  Collapse,
  Center,
  Tooltip,
  Text,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";
import Chat from "@/components/chat/Chat";
import Sidebar from "@/components/sidebar/Sidebar";

const MotionBox = motion(Box);

const HomeWithSidebar = () => {
  const [showChat, setShowChat] = useState(false);

  const handleIconClick = () => {
    setShowChat((prevShowChat) => !prevShowChat);
  };

  return (
    <ChakraProvider>
      <Flex minH="100vh" bg="#E4E4D0">
        <Sidebar />
        <Flex flex="1" direction="column" align="center" justify="center" p={4}>
          <VStack spacing={4} width="100%">
            {!showChat && (
              <Box
                opacity={showChat ? 0 : 1}
                transition="opacity 0.3s"
                position="relative"
              >
                <Image src="sapiens.png" alt="Home Image" boxSize="500px" />

                <Center>
                  <Text color="black" fontWeight="bold" fontSize="lg">
                    Welcome to the Convos 🤖
                  </Text>
                </Center>
                <Center>
                  <Tooltip label="Click to load Chatbot" bg="#94A684">
                    <IconButton
                      aria-label="Toggle Chat"
                      icon={<ChevronDownIcon boxSize={8} color="black" />}
                      onClick={handleIconClick}
                      mt={4}
                    />
                  </Tooltip>
                </Center>
              </Box>
            )}

            {showChat && (
              <MotionBox
                width="100%"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Chat />
              </MotionBox>
            )}
          </VStack>
        </Flex>
      </Flex>
    </ChakraProvider>
  );
};

export default HomeWithSidebar;
