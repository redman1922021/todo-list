import axios from "axios";
import { MetaResponse, Todo, TodoInfo } from "../types/types.ts";

const API_URL = "https://easydev.club/api/v1/todos";

export const fetchTodos = async (filter: string = "all"): Promise<MetaResponse<Todo, TodoInfo>> => {
    const response = await axios.get(`${API_URL}`, {
        params: { filter },
        headers: {
            Accept: "application/json",
        },
    });

    return response.data;
};

export const addTodo = async (title: string): Promise<void> => {
    await axios.post(
        API_URL,
        { title, isDone: false },
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
};

export const deleteTodo = async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`, {
        headers: {
            "Content-Type": "application/json",
        },
    });
};

export const updateTodo = async (id: number, newTitle: string, isDone: boolean): Promise<void> => {
    await axios.put(
        `${API_URL}/${id}`,
        { title: newTitle, isDone },
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
};
