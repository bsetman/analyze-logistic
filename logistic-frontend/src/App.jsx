import React from "react";
// Компоненты для маршрутов
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";

// Общая оболочка
import Layout from "./layout/Layout";

// Страницы
import AnalysisPage from "./pages/AnalysisPage";
import ResultPage from "./pages/ResultPage";

export default function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<AnalysisPage />} />
                    <Route path="/analysis" element={<AnalysisPage />} />
                    <Route path="/result" element={<ResultPage />} />
                </Routes>
            </Layout>
        </Router>
    );
}