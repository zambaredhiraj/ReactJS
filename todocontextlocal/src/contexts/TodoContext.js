import React, { createContext, useContext } from "react";

export const TodoContext = createContext({
    todos: [
        {
            id:1,
            todo:"Todo msg",
            completed:false
        }
    ],
    addTodo: (id,todo) => {},
    updateTodo: (id,todo) => {},
    deleteTodo: (id) => {},
    toggleComplete: (id) => {},
});

export const TodoContextProvider = TodoContext.Provider;

export function useTodo() {
    return useContext(TodoContext);
}