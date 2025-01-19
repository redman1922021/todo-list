import React, {useState} from "react";
import styles from "./List.module.scss";
import {Todo, TodoFilter, TodoInfo} from "../../types/types.ts";
import Navigate from "../Navigate/Navigate.tsx";
import ListItem from "../ListItem/ListItem.tsx";

interface ListProps {
    todos: Todo[];
    todoInfo: TodoInfo;
    onFilterChange: (filter: TodoFilter) => void;
    onTodoDelete: (id: number) => void;
    onTodoEdit: (id: number, newTitle: string, isDone: boolean) => void;
    currentFilter: TodoFilter;
}

const List: React.FC<ListProps> = ({
                                       todos,
                                       todoInfo,
                                       onFilterChange,
                                       onTodoDelete,
                                       onTodoEdit,
                                       currentFilter
                                   }) => {
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editedTitle, setEditedTitle] = useState<string>("");

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

    const handleFilterClick = (filter: TodoFilter) => {
        onFilterChange(filter);
    };

    return (
        <>
            <Navigate todoInfo={todoInfo} onFilterChange={handleFilterClick} currentFilter={currentFilter}/>
            <ul className={styles.list}>
                {todos.map((todo) => (
                    <ListItem
                        key={todo.id}
                        todo={todo}
                        isEditing={editingId === todo.id}
                        editedTitle={editingId === todo.id ? editedTitle : ""}
                        onEditChange={setEditedTitle}
                        onSave={handleSaveClick}
                        onCancel={handleCancelClick}
                        onDelete={handleDeleteClick}
                        onToggleDone={handleCheckboxChange}
                        onStartEdit={handleEditClick}
                    />
                ))}
            </ul>
        </>
    );
};

export default List;
