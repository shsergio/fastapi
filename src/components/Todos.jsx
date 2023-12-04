import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
} from "@chakra-ui/react";

import { useDisclosure } from "@chakra-ui/react";
import "../App.css";

const TodosContext = React.createContext({
  todos: [],
  fetchTodos: () => {},
});

// POST ROUTE
// Adding a new AddTodo function
function AddTodo() {
  const [item, setItem] = React.useState("");
  const { todos, fetchTodos } = React.useContext(TodosContext);

  const handleInput = (event) => {
    setItem(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Evitar la recarga de la página

    if (!item.trim()) {
      // Verificar que el campo no esté vacío
      alert("EL CAMPO NO PUEDE ESTAR VACÍO");
      return;
    }

    const newTodo = {
      id: todos.length + 1,
      item: item,
    };

    fetch("http://localhost:8000/todo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTodo),
    }).then(() => {
      fetchTodos();
      setItem(""); // Limpiar el campo después de agregar el todo
    });
  };

  // Returning the form to be rendered

  return (
    <>
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "white",
          padding: "1rem",
          borderRadius: "10px",
        }}
      >
        <InputGroup size="sm">
          <Input
            pr="4.5rem"
            type="text"
            placeholder="AGREGA UN SNEAKER"
            aria-label="Add a todo item"
            value={item} // Vincula el valor del campo al estado item
            onChange={handleInput}
            borderRadius="2px"
            fontSize="1rem"
            py="0.5rem"
            px="1rem"
            border="2px solid #1ca0f2"
            bg="white"
            color="black"
            
          />
        </InputGroup>
      </form>
    </>
  );
}

// PUT ROUTE
function UpdateTodo({ item, id }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [todo, setTodo] = useState(item);
  const { fetchTodos } = React.useContext(TodosContext);

  const updateTodo = async () => {
    if (!todo.trim()) {
      alert("NO SE PUEDE ACTUALIZAR CON CAMPOS VACÍOS");
      return;
    }

    await fetch(`http://localhost:8000/todo/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ item: todo }),
    });
    onClose();
    await fetchTodos();
    window.location.reload(); // Recargar la página después de eliminar el todo
  };

  return (
    <>
      <Button
        h="2rem" // Aumentar la altura
        fontSize="1rem" // Aumentar el tamaño de la fuente
        // Texto en negrita
        color="white" // Color del texto
        bg="#5eb30d" // Color de fondo dorado, típico de los arcades
        borderRadius="10px" // Esquinas redondeadas
        boxShadow="md" // Sombra
        _hover={{
          bg: "#98cea6", // Cambia el color de fondo al pasar el cursor a un tono naranja más oscuro
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)", // Sombra al pasar el cursor
        }}
        size="sm"
        onClick={onOpen}
        // Tipo de letra de estilo de videojuegos
        textTransform="uppercase" // Convertir texto a mayúsculas
      >
        Actualizar Tenis
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader> Actualizar modelo</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                type="text"
                placeholder="Add a todo item"
                aria-label="Add a todo item"
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
              />
            </InputGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              h="2rem" // Increase the height
              fontSize="1rem" // Increase the font size
               // Make the text bold
              color="white" // Color del texto
              bg="#5eb30d" // Color de fondo
              borderRadius="10px" // Esquinas redondeadas
              boxShadow="md" // Sombra
              _hover={{
                bg: "#1277b6", // Cambia el color de fondo al pasar el cursor
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)", // Añade una sombra al pasar el cursor
              }}
              size="sm"
              onClick={updateTodo}
               // Fuente de estilo de videojuegos
              textTransform="uppercase" // Convertir texto a mayúsculas
            >
              Actualizar zapato
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

// DELETE ROUTE
function DeleteTodo({ id }) {
  const { fetchTodos } = React.useContext(TodosContext);

  const deleteTodo = async () => {
    await fetch(`http://localhost:8000/todo/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: { id: id },
    });
    await fetchTodos();
    window.location.reload(); // Recargar la página después de eliminar el todo
  };

  return (
    <Button
      h="2rem" // Aumentar la altura
      fontSize="1rem" // Aumentar el tamaño de la fuente
      // Texto en negrita
      color="white" // Color del texto
      bg="#d50001" // Color de fondo, típico de los arcades
      borderRadius="10px" // Esquinas redondeadas
      boxShadow="md" // Sombra
      _hover={{
        bg: "#FFA500", // Cambia el color de fondo al pasar el cursor a un tono naranja más oscuro
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)", // Sombra al pasar el cursor
      }}
      size="sm"
       // Tipo de letra de estilo de videojuegos
      textTransform="uppercase" // Convertir texto a mayúsculas
      onClick={deleteTodo}
    >
      Eliminar Tenis
    </Button>
  );
}

// Before adding the component to the Todos component, let's add a helper component for rendering todos to clean things up a bit:
function TodoHelper({ item, id, fetchTodos }) {
  return (
    <Box p={1} shadow="sm">
      <Flex justify="space-between">
        <Text mt={4} as="div">
          {item}
          <Flex align="end">
            <UpdateTodo item={item} id={id} fetchTodos={fetchTodos} />
            <DeleteTodo id={id} fetchTodos={fetchTodos} /> {/* new */}
          </Flex>
        </Text>
      </Flex>
    </Box>
  );
}

// EXPORT TOODS
export default function Todos() {
  const [todos, setTodos] = useState([]);
  const fetchTodos = async () => {
    const response = await fetch("http://localhost:8000/todo");
    const todos = await response.json();
    setTodos(todos.data);
  };
  useEffect(() => {
    fetchTodos();
  }, []);

  // REPLACE THE RETURN WITH A NEW AFTER ADDING THE PUT ROUTE
  return (
    <Box
      backgroundImage="url('https://pappos.mx/cdn/shop/products/tenis-vans-old-skool-blanco-para-mujer-van1340-divisioncalzado-vans-blanco-245-778012.jpg?v=1682788689')"
      p={4}
      minHeight="130vh" // Asegura que el contenedor tenga al menos el alto del viewport
      textAlign="center" // Centra el contenido horizontalmente
      position="relative" // Asegura que el posicionamiento sea relativo
    >
      <Box
        display="inline-block" // Elemento interno como inline-block
        verticalAlign="middle" // Alinea verticalmente
        position="absolute" // Posicionamiento absoluto
        top="50%" // Alinea desde el 50% superior del contenedor padre
        left="50%" // Alinea desde el 50% izquierdo del contenedor padre
        transform="translate(-50%, -50%)" // Centra exactamente
      >
        <TodosContext.Provider value={{ todos, fetchTodos }}>
          <AddTodo />
          <Stack spacing={5}>
            {todos.map((todo) => (
              <TodoHelper
              text="white"
                key={todo.id} // Agrega un key para cada elemento en el map
                item={todo.item}
                id={todo.id}
                fetchTodos={fetchTodos}
              />
            ))}
          </Stack>
        </TodosContext.Provider>
      </Box>
    </Box>
  );
}
