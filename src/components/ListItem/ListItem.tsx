import styles from "./ListItem.module.scss";
import {Todo} from "../../types/types.ts";
import {Button, Input} from "antd";

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
                <Input
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
                        <Button className={styles.save} onClick={() => onSave(todo.id, todo.isDone)}>
                            Сохранить
                        </Button>
                        <Button className={styles.cancel} onClick={onCancel}>
                            Отмена
                        </Button>
                    </>
                ) : (
                    <>
                        <Input
                            type="checkbox"
                            checked={todo.isDone}
                            onChange={() => onToggleDone(todo.id, todo.isDone)}
                        />
                        <Button
                            className={styles.edit}
                            onClick={() => onStartEdit(todo.id, todo.title)}
                        >
                            Редактировать
                        </Button>
                    </>
                )}
                {!isEditing && (
                    <Button
                        className={styles.delete}
                        onClick={() => onDelete(todo.id)}
                    >
                        Удалить
                    </Button>
                )}
            </div>
        </li>
    );
};

export default ListItem;
