import {useMemo} from "react";
import styles from "./List.module.scss";
import {Todo} from "../../types/types.ts";
import ListItem from "../ListItem/ListItem.tsx";

interface ListProps {
    todos: Todo[];
    refreshTodos: () => void;
}

const List: React.FC<ListProps> = ({todos, refreshTodos}) => {

    const memoizedTodos = useMemo(() => todos, [todos]);

    return (
        <ul className={styles.list}>
            {memoizedTodos.map((todo) => (
                <ListItem key={todo.id} todo={todo} refreshTodos={refreshTodos}/>
            ))}
        </ul>
    );
};

export default List;
