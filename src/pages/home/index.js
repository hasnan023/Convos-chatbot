import {
  ChakraProvider,
  Box,
  Flex,
  IconButton,
  VStack,
  Center,
  Tooltip,
  Text,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";
import Chat from "@/components/chat/Chat";
import Sidebar from "@/components/sidebar/Sidebar";
import React, { useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, useAnimations } from "@react-three/drei";

const MotionBox = motion(Box);

const Model = ({ url, scale }) => {
  const { scene, animations } = useGLTF(url);
  const { actions } = useAnimations(animations, scene);

  React.useEffect(() => {
    if (actions) {
      const action = actions[Object.keys(actions)[0]]; // Play the first animation
      action.play();
    }
  }, [actions]);

  return <primitive object={scene} scale={scale} />;
};

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
                width="340px" // Set a fixed width
                height="340px" // Set a fixed height
              >
                <Canvas>
                  <ambientLight />
                  <pointLight position={[10, 10, 10]} />
                  <OrbitControls />
                  <Model url="/HeadBot.glb" scale={[1, 1, 1]} />
                </Canvas>
                <Center mt={0}>
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
