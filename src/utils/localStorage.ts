import { TodoProps } from "@/app/todo/types"

export const saveToLocalStorage = (todos: TodoProps[]) => {
    localStorage.setItem('todos', JSON.stringify(todos));
}

export const getFromLocalStorage = (): TodoProps[] | null => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : null;
}