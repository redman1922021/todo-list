import {createRoot} from "react-dom/client";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";

import "./index.scss";
import MainPage from "./components/pages/MainPage.tsx";
import ProfilePage from "./components/pages/ProfilePage.tsx";
import styles from "./components/Main/Main.module.scss";

const Root: React.FC = () => {
    return (
        <div className={styles.app}>
            <Router>
                <div className={styles.menu}>
                    <ul>
                        <li><Link to="/">Список Задач</Link></li>
                        <li><Link to="/profile">Профиль</Link></li>
                    </ul>
                </div>
                <Routes>
                    <Route path="/" element={<MainPage/>}/>
                    <Route path="/profile" element={<ProfilePage/>}/>
                </Routes>
            </Router>
        </div>

    );
};

createRoot(document.getElementById("root")!).render(<Root/>);
