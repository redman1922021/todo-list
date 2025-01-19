// ListItem.tsx
import styles from "./ListItem.module.scss";
import { Todo } from "../../types/types.ts";

interface ListItemProps {
    todo: Todo;
    isEditing: boolean;
    editedTitle: string;
    onEditChange: (title: string) => void;
    onSave: (id: number, isDone: boolean) => void;
    onCancel: () => void;
    onDelete: (id: number) => void;
    onToggleDone: (id: number, isDone: boolean) => void;
    onStartEdit: (id: number, title: string) => void;
}

const ListItem: React.FC<ListItemProps> = ({
                                               todo,
                                               isEditing,
                                               editedTitle,
                                               onEditChange,
                                               onSave,
                                               onCancel,
                                               onDelete,
                                               onToggleDone,
                                               onStartEdit,
                                           }) => {

    return (
        <li className={styles.listItem}>
            {isEditing ? (
                <input
                    type="text"
                    value={editedTitle}
                    onChange={(e) => onEditChange(e.target.value)}
                />
            ) : (
                <span>{todo.title}</span>
            )}
            <div className={styles.buttons}>
                {isEditing ? (
                    <>
                        <button className={styles.save} onClick={() => onSave(todo.id, todo.isDone)}>
                            Сохранить
                        </button>
                        <button className={styles.cancel} onClick={onCancel}>
                            Отмена
                        </button>
                    </>
                ) : (
                    <>
                        <input
                            type="checkbox"
                            checked={todo.isDone}
                            onChange={() => onToggleDone(todo.id, todo.isDone)}
                        />
                        <button
                            className={styles.edit}
                            onClick={() => onStartEdit(todo.id, todo.title)}
                        >
                            Редактировать
                        </button>
                    </>
                )}
                {!isEditing && (
                    <button
                        className={styles.delete}
                        onClick={() => onDelete(todo.id)}
                    >
                        Удалить
                    </button>
                )}
            </div>
        </li>
    );
};

export default ListItem;
