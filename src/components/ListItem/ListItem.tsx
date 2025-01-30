import {useState} from "react";
import styles from "./ListItem.module.scss";
import {Todo} from "../../types/types.ts";
import {Button, Input, Form, Checkbox, message} from "antd";
import {deleteTodo, updateTodo} from "../../api/api.ts";

interface ListItemProps {
    todo: Todo;
    refreshTodos: () => void;
}

const ListItem: React.FC<ListItemProps> = ({todo, refreshTodos}) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const handleSave = async (values: { title: string }) => {
        setLoading(true);
        try {
            await updateTodo(todo.id, values.title, todo.isDone);
            setIsEditing(false);
            refreshTodos();
        } catch (error) {
            console.error("Ошибка при сохранении:", error);
            message.error("Не удалось сохранить задачу");
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    const handleDelete = async () => {
        setLoading(true);
        try {
            await deleteTodo(todo.id);
            refreshTodos();
        } catch (error) {
            console.error("Ошибка при удалении:", error);
            message.error("Не удалось удалить задачу");
        } finally {
            setLoading(false);
        }
    };

    const handleToggleDone = async () => {
        setLoading(true);
        try {
            await updateTodo(todo.id, todo.title, !todo.isDone);
            refreshTodos();
        } catch (error) {
            console.error("Ошибка при обновлении статуса:", error);
            message.error("Не удалось изменить статус задачи");
        } finally {
            setLoading(false);
        }
    };

    return (
        <li className={styles.listItem}>
            {isEditing ? (
                <Form
                    layout="inline"
                    onFinish={handleSave}
                    initialValues={{title: todo.title}}
                    className={styles.form}
                >
                    <Form.Item
                        name="title"
                        rules={[
                            {required: true, message: "Поле не может быть пустым."},
                            {min: 2, message: "Текст задачи должен содержать хотя бы 2 символа."},
                            {max: 64, message: "Текст задачи не должен превышать 64 символа."},
                        ]}
                        style={{flex: 1}}
                    >
                        <Input autoFocus/>
                    </Form.Item>
                    <div className={styles.buttonsForm}>
                        <Checkbox checked={todo.isDone} onChange={handleToggleDone} disabled={loading}/>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            Сохранить
                        </Button>
                        <Button onClick={handleCancel} disabled={loading}>
                            Отмена
                        </Button>
                    </div>
                </Form>
            ) : (
                <>
                    <span>{todo.title}</span>
                    <div className={styles.buttons}>
                        <Checkbox checked={todo.isDone} onChange={handleToggleDone} disabled={loading}/>
                        <Button onClick={() => setIsEditing(true)} disabled={loading}>
                            Редактировать
                        </Button>
                        <Button danger onClick={handleDelete} disabled={loading}>
                            Удалить
                        </Button>
                    </div>
                </>
            )}
        </li>
    );
};

export default ListItem;
