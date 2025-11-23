import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../layout/Layout";

export default function ResultPage() {
    const location = useLocation();
    const navigate = useNavigate();

    const resultData = location.state || null;

    // Состояние загрузки карты
    const [loading, setLoading] = useState(true);
    const [metric, setMetric] = useState("mst_length");
    const [mode, setMode] = useState(resultData?.mode || "auto");
    const [metricResult, setMetricResult] = useState(null);
    const [mapKey, setMapKey] = useState(Date.now());

    const buildMapSrc = () => {
        if (!resultData) return "";
        let src = `http://localhost:8000/map?west=${resultData.bbox[0]}&south=${resultData.bbox[1]}&east=${resultData.bbox[2]}&north=${resultData.bbox[3]}&mode=${mode}`;
        if (metricResult !== null) {
            src += `&metric=${metric}&metricValue=${metricResult}`;
        }
        return src;
    };

    const mapSrc = buildMapSrc();

    // Функция анализа выбранной метрики
    const analyzeMetric = async () => {
        if (!resultData) return;
        try {
            setLoading(true);
            const response = await fetch(
                `http://localhost:8000/mst?metric=${metric}&mode=${mode}&west=${resultData.bbox[0]}&south=${resultData.bbox[1]}&east=${resultData.bbox[2]}&north=${resultData.bbox[3]}`
            );
            if (!response.ok) throw new Error(`Ошибка сервера: ${response.status}`);
            const data = await response.json();
            setMetricResult(data.value);
            setMapKey(Date.now());
        } catch (err) {
            console.error(err);
            alert("Ошибка при анализе метрики!");
        } finally {
            setLoading(false);
        }
    };

    const sidebarContent = (
        <>
            <h3 style={{ marginTop: 0, marginBottom: "1px" }}>📊 Результаты анализа</h3>
            {resultData ? (
                <>
                    <p style={{ fontSize: "13px", color: "#444" }}>
                        Анализ успешно выполнен.
                        <br />
                        Получено точек: <b>{resultData.points?.length ?? 0}</b>
                        <br />
                        Тип маршрута: <b>{mode}</b>
                    </p>

                    <div style={{ marginTop: "1px" }}>
                        <h4>Режим маршрута для пересборки графа:</h4>
                        <select value={mode} onChange={(e) => setMode(e.target.value)} style={{ width: "100%", padding: "6px", borderRadius: "6px", marginBottom: "1px" }}>
                            <option value="auto">Автомобильный</option>
                            <option value="aero">Авиамаршрут</option>
                            <option value="sea">Морской маршрут</option>
                            <option value="rail">Железнодорожный маршрут</option>
                        </select>
                    </div>

                    <div style={{ marginTop: "1px" }}>
                        <h4>Выберите метрику для анализа:</h4>
                        <label>
                            <input type="radio" value="degree_centrality" checked={metric === "degree_centrality"} onChange={(e) => setMetric(e.target.value)} />
                            degree_centrality
                        </label>
                        <br />
                        <label>
                            <input type="radio" value="closeness_centrality" checked={metric === "closeness_centrality"} onChange={(e) => setMetric(e.target.value)} />
                            closeness_centrality
                        </label>
                        <br />
                        <label>
                            <input type="radio" value="betweenness_centrality" checked={metric === "betweenness_centrality"} onChange={(e) => setMetric(e.target.value)} />
                            betweenness_centrality
                        </label>
                        <br />
                        <label>
                            <input type="radio" value="pagerank" checked={metric === "pagerank"} onChange={(e) => setMetric(e.target.value)} />
                            pagerank
                        </label>
                        <button
                            onClick={analyzeMetric}
                            style={{ marginTop: "10px", width: "100%", padding: "8px", borderRadius: "6px", backgroundColor: "#0f62fe", color: "white", border: "none", cursor: "pointer" }}
                        >
                            Анализ метрики
                        </button>
                        {metricResult !== null && (
                            <p style={{ marginTop: "10px", fontWeight: "bold" }}>Результат: {metricResult}</p>
                        )}
                    </div>
                </>
            ) : (
                <p style={{ fontSize: "14px", color: "red" }}>Нет данных анализа. Вернитесь на страницу анализа.</p>
            )}

            <button
                onClick={() => navigate("/analysis")}
                style={{ marginTop: "450px", width: "100%", padding: "10px", backgroundColor: "#e6e6e6ff", color: "black", border: "none", borderRadius: "6px", cursor: "pointer" }}
            >
                Новый анализ
            </button>
        </>
    );

    return (
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
            <Layout sidebarContent={sidebarContent}>
                <div style={{ width: "100%", height: "100%", position: "relative" }}>
                    {resultData && (
                        <>
                            {loading && (
                                <div style={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    width: "100%",
                                    height: "100%",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    backgroundColor: "rgba(255,255,255,0.8)",
                                    zIndex: 1000,
                                    fontSize: "18px",
                                    fontWeight: "bold",
                                    color: "#0f62fe"
                                }}>
                                    Загрузка карты...
                                </div>
                            )}
                            <iframe
                                key={mapKey}
                                src={mapSrc}
                                title="Map Result"
                                style={{ width: "100%", height: "100%", border: "none" }}
                                onLoad={() => setLoading(false)}
                            />
                        </>
                    )}
                </div>
            </Layout>
        </div>
    );
}