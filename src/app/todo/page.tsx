'use client'
import { useEffect, useState } from "react";
import { saveToLocalStorage, getFromLocalStorage } from "@/utils/localStorage";

import { TodoProps } from "./types";
import { styTodoCompleted } from "./styles"; 

const TodoPage: React.FC = () => {
    const [todos, setTodos] = useState<TodoProps[]>([])
    const [inputVal, setInputVal] = useState<string>('');

    useEffect(() => {
        const savedTodos = getFromLocalStorage()
        if (savedTodos) setTodos(savedTodos)
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputVal(e.target.value);
    }

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newTodo: TodoProps = {
            id: Date.now(),
            text: inputVal,
            completed: false
        }

        const updatedTodos =[...todos, newTodo]
        setTodos(updatedTodos);
        saveToLocalStorage(updatedTodos);
        setInputVal('');
    }

    const toggleTodo = (id: number) => {
        const updatedTodos = todos.map(todo => 
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
        setTodos(updatedTodos);
        saveToLocalStorage(updatedTodos);
    }

    return (
        <div className="container m-auto pt-5">
            <form onSubmit={handleFormSubmit} className="flex flex-row">
                <input 
                    type="text"
                    value={inputVal}
                    placeholder="Add new todo"
                    onChange={handleInputChange}
                    className="basis-3/4 border-grey border-2 rounded px-2 py1 mr-3"
                />
                <button 
                    type="submit" 
                    className="basis-1/4 bg-green-300 rounded px-2 py-1"
                >
                    Add
                </button>
            </form>
            <ul>
                {
                    todos.map((todo, index) => (
                        <li key={index}>
                            <input
                                type="checkbox"
                                checked={todo.completed}
                                onChange={() => toggleTodo(todo.id)}
                            />
                            <span className={todo.completed ? styTodoCompleted : ''}>
                                {todo.text}
                            </span>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default TodoPage;