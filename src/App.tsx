import { useEffect, useState } from "react";
import { fetchTodos, addTodo, deleteTodo, updateTodo } from "./api/api.ts";
import Header from "./components/Header/Header.tsx";
import List from "./components/List/List.tsx";

export interface Todo {
    id: number;
    title: string;
    created: string;
    isDone: boolean;
}

export interface TodoInfo {
    all: number;
    completed: number;
    inWork: number;
}

export interface MetaResponse<T, N> {
    data: T[];
    info?: N;
    meta: {
        totalAmount: number;
    };
}

function App() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [todoInfo, setTodoInfo] = useState<TodoInfo | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const loadTodos = async (filter: string = "all") => {
        try {
            setLoading(true);
            const result = await fetchTodos(filter);
            setTodos(result.data);

            if (result.info) {
                setTodoInfo(result.info);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleAddTodo = async (title: string) => {
        try {
            await addTodo(title);
            loadTodos();
        } catch (error) {
            console.error("Ошибка при добавлении задачи:", error);
        }
    };

    const handleTodoDelete = async (id: number) => {
        try {
            await deleteTodo(id);
            loadTodos();
        } catch (error) {
            console.error("Ошибка при удалении задачи:", error);
        }
    };

    const handleTodoEdit = async (id: number, newTitle: string, isDone: boolean) => {
        try {
            await updateTodo(id, newTitle, isDone);
            loadTodos();
        } catch (error) {
            console.error("Ошибка при редактировании задачи:", error);
        }
    };

    useEffect(() => {
        loadTodos();
    }, []);

    return (
        <div>
            <Header onAddTodo={handleAddTodo} />
            {loading && <p>Загрузка...</p>}
            {!loading && todoInfo && todos && (
                <List
                    todoInfo={todoInfo}
                    todos={todos}
                    onFilterChange={loadTodos}
                    onTodoDelete={handleTodoDelete}
                    onTodoEdit={handleTodoEdit}
                />
            )}
        </div>
    );
}

export default App;
