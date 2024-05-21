import React from "react";
import {
  Box,
  Flex,
  IconButton,
  Link,
  useDisclosure,
  useBreakpointValue,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { CgMenuHotdog } from "react-icons/cg";
import { FaHome } from "react-icons/fa";
import { TbMessageChatbot } from "react-icons/tb";
import { GiSplitCross } from "react-icons/gi";

const Sidebar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isSidebarCollapsed = useBreakpointValue({ base: true, md: false });

  return (
    <Box
      borderRadius="25px"
      w={{ base: isOpen ? "140px" : "0", md: "140px" }}
      h="100vh"
      bg="#94A684"
      boxShadow="lg"
      position={{ base: "absolute", md: "relative" }}
      zIndex={1}
      transition="width 0.3s"
    >
      {/* <Text
        color="black"
        fontWeight="bold"
        mt={4}
        ml={6}
        fontSize={isSidebarCollapsed ? "sm" : "lg"}
        display={isOpen ? "block" : "none"}
      >
        Convos
      </Text> */}
      <IconButton
        aria-label="Toggle sidebar"
        icon={
          isOpen ? (
            <GiSplitCross color="black" />
          ) : (
            <CgMenuHotdog color="black" />
          )
        }
        onClick={isOpen ? onClose : onOpen}
        position="absolute"
        top="1rem"
        left="1rem"
      />
      <Flex
        direction="column"
        h="100%"
        p={4}
        display={{ base: isOpen ? "flex" : "none", md: "flex" }}
      >
        <Box
          h="100px"
          w="60px"
          p={4}
          bg="#AEC3AE"
          borderRadius={8}
          mt="250px"
          ml="19px"
        >
          <Tooltip label="Home" placement="auto-start" bg="#94A684">
            <Link href="/home" p={1} display="block" color="black">
              <FaHome size="22px" /> {/* Adjust the size as needed */}
            </Link>
          </Tooltip>
          <Tooltip label="Chat" placement="auto-start" bg="#94A684">
            <Link href="/chat" p={1} display="block" color="black">
              <TbMessageChatbot size="22px" /> {/* Adjust the size as needed */}
            </Link>
          </Tooltip>
        </Box>
      </Flex>
    </Box>
  );
};

export default Sidebar;
