import Chat from "@/components/chat/Chat";
import Sidebar from "@/components/sidebar/Sidebar";
import { ChakraProvider, Flex } from "@chakra-ui/react";
import React from "react";

const index = () => {
  return (
    <ChakraProvider>
      <Flex bg="#E4E4D0">
        <Sidebar />

        <Chat />
      </Flex>
    </ChakraProvider>
  );
};

export default index;
