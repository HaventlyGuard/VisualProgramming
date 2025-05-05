import React from 'react';
import './LogFilters.css';

const LogFilters = ({ 
    searchQuery, 
    setSearchQuery, 
    levelFilter, 
    setLevelFilter,
    sortConfig,
    onSortChange
}) => {
    const sortFields = [
        { value: 'id', label: 'ID' },
        { value: 'timestamp', label: 'Время' },
        { value: 'level', label: 'Уровень' },
        { value: 'source', label: 'Источник' }
    ];

    return (
        <div className="filters-container">
            <div className="search-box">
                <input
                    type="text"
                    placeholder="Поиск по сообщению"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                />
            </div>
            <div className="level-filter">
                <select
                    value={levelFilter}
                    onChange={(e) => setLevelFilter(e.target.value)}
                    className="level-select"
                >
                    <option value="">Все уровни</option>
                    <option value="Information">Info</option>
                    <option value="Warning">Warning</option>
                    <option value="Error">Error</option>
                </select>
            </div>
            <div className="sort-filters">
                <select
                    value={sortConfig.field}
                    onChange={(e) => onSortChange(e.target.value, sortConfig.direction)}
                    className="sort-field-select"
                >
                    {sortFields.map(field => (
                        <option key={field.value} value={field.value}>
                            {field.label}
                        </option>
                    ))}
                </select>
                <select
                    value={sortConfig.direction}
                    onChange={(e) => onSortChange(sortConfig.field, e.target.value)}
                    className="sort-direction-select"
                >
                    <option value="asc">По возрастанию</option>
                    <option value="desc">По убыванию</option>
                </select>
            </div>
        </div>
    );
};

export default LogFilters; 