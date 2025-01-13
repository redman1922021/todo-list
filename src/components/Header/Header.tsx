import styles from "./Header.module.scss";
import React, {useState} from "react";

interface AddInputProps {
    onAddTodo: (title: string) => void;
}


function Header({ onAddTodo }: AddInputProps) {

    const [inputValue, setInputValue] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (inputValue.length < 2) {
            setErrorMessage("Текст задачи должен содержать хотя бы 2 символа.");
            return;
        }
        if (inputValue.length > 64) {
            setErrorMessage("Текст задачи не должен превышать 64 символа.");
            return;
        }
        if (inputValue.trim() === "") {
            setErrorMessage("Поле не может быть пустым.");
            return;
        }

        setErrorMessage(null);

        try {
            await onAddTodo(inputValue);
            setInputValue("");
        } catch (error) {
            console.error("Ошибка при добавлении задачи:", error);
            setErrorMessage("Произошла ошибка при добавлении задачи.");
        }
    };

    return (
        <>
            <header className={styles.header}>
                <div>Logo</div>
                <div className={styles.wrapperSearch}>
                    <input
                        className={styles.search}
                        type="text"
                        placeholder="Введите задачу"
                        value={inputValue}
                        onChange={handleChange}
                    />
                    {errorMessage && <p className={styles.error}>{errorMessage}</p>}
                    <button className={styles.buttonHeader} onClick={handleSubmit}>
                        Добавить
                    </button>
                </div>
            </header>
        </>
    )
}

export default Header
