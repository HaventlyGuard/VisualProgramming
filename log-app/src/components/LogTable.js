import React from 'react';
import './LogTable.css';

const LogTable = ({ logs }) => {
    if (!logs || logs.length === 0) {
        return <div className="no-logs">Нет доступных логов</div>;
    }

    return (
        <div className="table-container">
            <table className="logs-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Время</th>
                        <th>Уровень</th>
                        <th>Сообщение</th>
                        <th>Источник</th>
                    </tr>
                </thead>
                <tbody>
                    {logs.map(log => (
                        <tr key={log.id}>
                            <td>{log.id}</td>
                            <td>{new Date(log.timestamp).toLocaleString()}</td>
                            <td className={`log-level-${log.level.toLowerCase()}`}>{log.level}</td>
                            <td>{log.message}</td>
                            <td>{log.source}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LogTable; 