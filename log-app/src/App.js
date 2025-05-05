import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import LogTable from "./components/LogTable";
import LogFilters from "./components/LogFilters";

const App = () => {
    const [allLogs, setAllLogs] = useState([]);
    const [displayedLogs, setDisplayedLogs] = useState([]);
    const [levelFilter, setLevelFilter] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [sortConfig, setSortConfig] = useState({ field: 'timestamp', direction: 'desc' });

    useEffect(() => {
        axios.get("http://localhost:5050/logs")
            .then(res => {
                setAllLogs(res.data);
                setDisplayedLogs(res.data);
            })
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        let result = [...allLogs];

        if (levelFilter) {
            result = result.filter(log => log.level === levelFilter);
        }

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(log => 
                log.message.toLowerCase().includes(query) ||
                (log.exception && log.exception.toLowerCase().includes(query))
            );
        }

        result.sort((a, b) => {
            if (a[sortConfig.field] < b[sortConfig.field]) {
                return sortConfig.direction === 'asc' ? -1 : 1;
            }
            if (a[sortConfig.field] > b[sortConfig.field]) {
                return sortConfig.direction === 'asc' ? 1 : -1;
            }
            return 0;
        });

        setDisplayedLogs(result);
    }, [allLogs, levelFilter, searchQuery, sortConfig]);

    const handleSortChange = (field, direction) => {
        setSortConfig({ field, direction });
    };

    return (
        <div className="app-container">
            <div className="app-header">
                <h1>Логи приложения</h1>
            </div>
            <div className="app-content">
                <LogFilters 
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    levelFilter={levelFilter}
                    setLevelFilter={setLevelFilter}
                    sortConfig={sortConfig}
                    onSortChange={handleSortChange}
                />
                <LogTable logs={displayedLogs} />
            </div>
        </div>
    );
};

export default App;