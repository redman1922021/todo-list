import {useEffect, useState} from "react";
import styles from "./Main.module.scss";
import {Todo, TodoFilter, TodoInfo} from "../../types/types.ts";
import Header from "../Header/Header.tsx";
import List from "../List/List.tsx";
import Navigate from "../Navigate/Navigate.tsx";
import {fetchTodos} from "../../api/api.ts";

const todoInfoDefault: TodoInfo = {
    all: 0,
    completed: 0,
    inWork: 0,
};

const Main: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [todoInfo, setTodoInfo] = useState<TodoInfo>(todoInfoDefault);
    const [currentFilter, setCurrentFilter] = useState<TodoFilter>(TodoFilter.ALL);

    const loadTodos = async () => {
        try {
            const result = await fetchTodos(currentFilter);
            setTodos(result.data);

            if (result.info) {
                setTodoInfo(result.info);
            }
        } catch (err) {
            console.error(err);
        }
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
            <Navigate todoInfo={todoInfo} onFilterChange={setCurrentFilter} currentFilter={currentFilter}/>
            <List todos={todos} refreshTodos={loadTodos}/>
        </div>
    );
};

export default Main;
