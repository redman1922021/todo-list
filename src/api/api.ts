import { Todo, TodoInfo, MetaResponse } from "../App";

const API_URL = "https://easydev.club/api/v1/todos";

export const fetchTodos = async (filter: string = "all"): Promise<MetaResponse<Todo, TodoInfo>> => {
    const response = await fetch(`${API_URL}?filter=${filter}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
        },
    });

    return await response.json();
};

export const addTodo = async (title: string): Promise<Todo> => {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, isDone: false }),
    });

    const data = await response.json();
    return data;
};

export const deleteTodo = async (id: number): Promise<void> => {
    await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
};

export const updateTodo = async (id: number, newTitle: string, isDone: boolean): Promise<void> => {
    await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: newTitle, isDone: isDone }),
    });
};

