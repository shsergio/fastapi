import React from "react";
import { Heading, Flex } from "@chakra-ui/react";

const Header = () => {
  const arcadeStyle = {
    background: "#1f1f1f",
    color: "#a304d9",
    padding: "1rem",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
    borderBottom: "4px solid #a304d9",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Press Start 2P, cursive", // Utilizando una fuente de estilo de videojuegos
    textTransform: "uppercase", // Convertir texto a mayúsculas
  };

  const headingStyle = {
    fontSize: "2rem",
    letterSpacing: "2px",
    margin: "0",
    padding: "0",
  };

  return (
    <header style={arcadeStyle}>
      <div>
        <Heading as="h1" style={headingStyle} fontFamily="'Press Start 2P', cursive" // Fuente de estilo de videojuegos
>
          Arcade Center
        </Heading>
      </div>
    </header>
  );
};

export default Header;