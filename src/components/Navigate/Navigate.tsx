import styles from "./Navigate.module.scss";
import {TodoFilter, TodoInfo} from "../../types/types.ts";

interface ListProps {
    todoInfo: TodoInfo;
    onFilterChange: (filter: TodoFilter) => void;
}

const Navigate: React.FC<ListProps> = ({ todoInfo, onFilterChange}) => {
    return (
            <div className={styles.wrapperNavigate}>
                <div className={styles.text} onClick={() => onFilterChange(TodoFilter.ALL)}>
                    Все ({todoInfo.all})
                </div>
                <div className={styles.text} onClick={() => onFilterChange(TodoFilter.IN_WORK)}>
                    В работе ({todoInfo.inWork})
                </div>
                <div className={styles.text} onClick={() => onFilterChange(TodoFilter.COMPLETED)}>
                    Сделано ({todoInfo.completed})
                </div>
            </div>
    );
};

export default Navigate;
