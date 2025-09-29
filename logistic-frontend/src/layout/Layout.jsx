import React from "react";
import { Link } from "react-router-dom";

export default function Layout({ children }) {
    return (
        <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
            <header style={{
                background: "0f62fe",
                color: "#fff",
                padding: "12px 16px",
                fontWeight: 700
            }}>
            </header>

            <div style={{ display: "flex", flex: 1 }}>
                <aside style={{
                    width: 260,
                    borderRight: "1px solid #e5e7eb",
                    padding: 16,
                    background: "#f8fafc"
                }}>
                    <nav>
                        <ul style={{
                            listStyle: "none",
                            padding: 0,
                            margin: 0,
                            display: "flex",
                            flexDirection: "column",
                            gap: 8
                        }}>
                            <li><Link to="/">Главная</Link></li>
                            <li><Link to="/analysis">Анализ карты</Link></li>
                        </ul>
                    </nav>
                    </aside>

                    <main style={{flex:1, padding: 16, overflow: "auto"}}>
                        {children}
                    </main>
                    </div>
                    </div>
            );
}