import axios from "axios";
import {MetaResponse, Todo, TodoFilter, TodoInfo} from "../types/types.ts";

const API_URL = "https://easydev.club/api/v1/todos";

const apiInstance = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export const fetchTodos = async (filter: TodoFilter = TodoFilter.ALL): Promise<MetaResponse<Todo, TodoInfo>> => {
    const response = await apiInstance.get("", { params: { filter } });
    return response.data;
};

export const addTodo = async (title: string): Promise<void> => {
    await apiInstance.post("", { title, isDone: false });
};

export const deleteTodo = async (id: number): Promise<void> => {
    await apiInstance.delete(`/${id}`);
};

export const updateTodo = async (id: number, newTitle: string, isDone: boolean): Promise<void> => {
    await apiInstance.put(`/${id}`, { title: newTitle, isDone });
};
