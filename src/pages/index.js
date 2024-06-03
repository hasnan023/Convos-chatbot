import { ChakraProvider } from "@chakra-ui/react";
import Home from "../pages/home";

import React, { useReducer } from "react";

const index = () => {
  return (
    <ChakraProvider>
      <Home />
    </ChakraProvider>
  );
};

export default index;
