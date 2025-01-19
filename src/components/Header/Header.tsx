import styles from "./Header.module.scss";
import {addTodo} from "../../api/api.ts";
import {useState} from "react";
import {Button, Input, Form} from "antd";

interface loadTodosProps {
    loadTodos: () => void;
}

function Header({loadTodos}: loadTodosProps) {

    const [inputValue, setInputValue] = useState<string>("");
    const [form] = Form.useForm();

    const handleSubmit = async (values: { title: string }) => {
        setInputValue("");
        try {
            await addTodo(values.title);
            await loadTodos();
            form.resetFields();
        } catch (error) {
            console.error("Ошибка при добавлении задачи:", error);
        }
    };

    return (
        <>
            <header className={styles.header}>
                <div>Logo</div>
                <div className={styles.wrapperSearch}>
                    <Form
                        form={form}
                        onFinish={handleSubmit}
                        layout="inline"
                    >
                        <Form.Item
                            name="title"
                            rules={[
                                {
                                    required: true,
                                    message: "Поле не может быть пустым.",
                                },
                                {
                                    min: 2,
                                    message: "Текст задачи должен содержать хотя бы 2 символа.",
                                },
                                {
                                    max: 64,
                                    message: "Текст задачи не должен превышать 64 символа.",
                                },
                            ]}
                        >
                            <Input
                                className={styles.search}
                                type="text"
                                placeholder="Введите задачу"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                className={styles.buttonHeader}
                                htmlType="submit"
                            >
                                Добавить
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </header>
        </>
    );
}

export default Header;
