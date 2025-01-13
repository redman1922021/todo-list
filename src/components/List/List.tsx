import { Todo, TodoInfo } from "../../App.tsx";
import { useState } from "react";
import styles from "./List.module.scss";

interface ListProps {
    todos: Todo[];
    todoInfo: TodoInfo;
    onFilterChange: (filter: string) => void;
    onTodoDelete: (id: number) => void;
    onTodoEdit: (id: number, newTitle: string, isDone: boolean) => void;
}

const List: React.FC<ListProps> = ({ todos, todoInfo, onFilterChange, onTodoDelete, onTodoEdit }) => {
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editedTitle, setEditedTitle] = useState<string>("");

    const handleFilterClick = (filter: string) => {
        onFilterChange(filter);
    };

    const handleEditClick = (id: number, title: string) => {
        setEditingId(id);
        setEditedTitle(title);
    };

    const handleSaveClick = (id: number, isDone: boolean) => {
        onTodoEdit(id, editedTitle, isDone);
        setEditingId(null);
    };

    const handleCancelClick = () => {
        setEditingId(null);
    };

    const handleDeleteClick = (id: number) => {
        onTodoDelete(id);
    };

    const handleCheckboxChange = (id: number, isDone: boolean) => {
        onTodoEdit(id, editedTitle, !isDone);
    };

    return (
        <>
            <div className={styles.wrapperNavigate}>
                <div className={styles.text} onClick={() => handleFilterClick("all")}>
                    Все ({todoInfo.all})
                </div>
                <div className={styles.text} onClick={() => handleFilterClick("inWork")}>
                    В работе ({todoInfo.inWork})
                </div>
                <div className={styles.text} onClick={() => handleFilterClick("completed")}>
                    Сделано ({todoInfo.completed})
                </div>
            </div>
            <ul className={styles.list}>
                {todos.map((todo) => {
                    if (!todo || !todo.title) {
                        console.error("Найдена некорректная задача", todo);
                        return null;
                    }

                    return (
                        <li className={styles.listItem} key={todo.id}>
                            {editingId === todo.id ? (
                                <input
                                    type="text"
                                    value={editedTitle}
                                    onChange={(e) => setEditedTitle(e.target.value)}
                                />
                            ) : (
                                <span>{todo.title}</span>
                            )}
                            <div className={styles.buttons}>
                                {editingId === todo.id ? (
                                    <>
                                        <button className={styles.save} onClick={() => handleSaveClick(todo.id, todo.isDone)}>
                                            Сохранить
                                        </button>
                                        <button className={styles.cancel} onClick={handleCancelClick}>
                                            Отмена
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <input
                                            type="checkbox"
                                            checked={todo.isDone}
                                            onChange={() => handleCheckboxChange(todo.id, todo.isDone)}
                                        />
                                        <button
                                            className={styles.edit}
                                            onClick={() => handleEditClick(todo.id, todo.title)}
                                        >
                                            Редактировать
                                        </button>
                                    </>
                                )}
                                {!editingId && <button
                                    className={styles.delete}
                                    onClick={() => handleDeleteClick(todo.id)}
                                >
                                    Удалить
                                </button>}
                            </div>
                        </li>
                    );
                })}
            </ul>
        </>
    );
};

export default List;
