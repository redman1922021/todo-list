import { useEffect, useState } from "react";
import { fetchTodos, deleteTodo, updateTodo } from "./api/api.ts";
import Header from "./components/Header/Header.tsx";
import List from "./components/List/List.tsx";
import {Todo, TodoFilter, TodoInfo} from "./types/types.ts";

const todoInfoDefault : TodoInfo = {
    all: 0,
    completed: 0,
    inWork: 0,
}

function App() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [todoInfo, setTodoInfo] = useState<TodoInfo>(todoInfoDefault);
    const [loading, setLoading] = useState<boolean>(false);
    const [currentFilter, setCurrentFilter] = useState<TodoFilter>(TodoFilter.ALL);

    const loadTodos = async () => {
        try {
            setLoading(false);
            const result = await fetchTodos(currentFilter);
            setTodos(result.data);

            if (result.info) {
                setTodoInfo(result.info);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(true);
        }
    };

    const handleTodoDelete = async (id: number) => {
        try {
            await deleteTodo(id);
            await loadTodos();
        } catch (error) {
            console.error("Ошибка при удалении задачи:", error);
        }
    };

    const handleTodoEdit = async (id: number, newTitle: string, isDone: boolean) => {
        try {
            await updateTodo(id, newTitle, isDone);
            await loadTodos();
        } catch (error) {
            console.error("Ошибка при редактировании задачи:", error);
        }
    };

    const handleFilterChange = async (newFilter: TodoFilter) => {
        setCurrentFilter(newFilter);
    };

    useEffect(() => {
        loadTodos();
    }, [currentFilter]);

    return (
        <div>
            <Header loadTodos={loadTodos} />
            {!loading && <p>Загрузка...</p>}
            {loading && todoInfo && todos && (
                <List
                    todoInfo={todoInfo}
                    todos={todos}
                    onFilterChange={handleFilterChange}
                    onTodoDelete={handleTodoDelete}
                    onTodoEdit={handleTodoEdit}
                />
            )}
        </div>
    );
}

export default App;
