import React, {useEffect, useState} from "react";
import styles from "./Main.module.scss";
import {Spin} from "antd";
import {Todo, TodoFilter, TodoInfo} from "../../types/types.ts";
import Header from "../Header/Header.tsx";
import List from "../List/List.tsx";
import {deleteTodo, fetchTodos, updateTodo} from "../../api/api.ts";

const todoInfoDefault: TodoInfo = {
    all: 0,
    completed: 0,
    inWork: 0,
}

const Main: React.FC = () => {
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

    useEffect(() => {
        const intervalId = setInterval(() => {
            loadTodos();
        }, 5000);

        return () => clearInterval(intervalId);
    }, [currentFilter]);

    return (
        <div className={styles.main}>
            <Header loadTodos={loadTodos}/>
            {!loading && <div className={styles.load}><Spin/></div>}
            {loading && todoInfo && todos && (
                <List
                    todoInfo={todoInfo}
                    todos={todos}
                    onFilterChange={handleFilterChange}
                    onTodoDelete={handleTodoDelete}
                    onTodoEdit={handleTodoEdit}
                    currentFilter={currentFilter}
                />
            )}
        </div>
    );
}

export default Main;
