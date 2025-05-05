import React, { useState } from 'react';
import Modal from './Modal';
import EditModal from './EditModal';
import '../styles/DataSet.css';

function DataSet({ 
  headers, 
  data, 
  renderRow, 
  renderHeader, 
  setSelectRows, 
  selectRows,
  onAddRow,
  onDeleteRows,
  onUpdateRow
}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);

    const handleRowClick = (item, event) => {
        if (event.target.tagName === 'INPUT') return;
        
        const isCtrlPressed = event.ctrlKey;
        const isRowSelected = selectRows.includes(item.id);

        if (isRowSelected) {
            setSelectRows(selectRows.filter(selectedId => selectedId !== item.id));
        } else {
            if (isCtrlPressed) {
                setSelectRows([...selectRows, item.id]);
            } else {
                setSelectRows([item.id]);
            }
        }
    };

    const handleDeleteSelected = () => {
      if (selectRows.length > 0) {
        onDeleteRows(selectRows);
      }
    };

    const handleEditItem = (item) => {
      setEditingItem(item);
      setIsEditModalOpen(true);
    };

    const handleSubmitEdit = (updatedData) => {
      onUpdateRow(editingItem.id, updatedData);
      setIsEditModalOpen(false);
    };

    return (
        <>
            <table>
                <thead>
                <tr>
                    
                    {headers.map((header, index) => (
                        <th key={index}>{renderHeader ? renderHeader(header) : header.title}</th>
                    ))}
                    <th>Действия</th>
                </tr>
                </thead>
                <tbody>
                {data.map((item) => (
                    <tr 
                      key={item.id} 
                      className={selectRows.includes(item.id) ? 'selected' : ''}
                    >
                    
                        {headers.map((header) => (
                            <td 
                              key={header.key}
                              onClick={(event) => handleRowClick(item, event)}
                            >
                                {renderRow ? renderRow(item[header.key]) : item[header.key]}
                            </td>
                        ))}
                        <td>
                          <button onClick={() => handleEditItem(item)}>Редактировать</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <div className="actions">
              <button onClick={() => setIsModalOpen(true)}>Добавить</button>
              <button 
                onClick={handleDeleteSelected}
                disabled={selectRows.length === 0}
              >
                Удалить выбранные ({selectRows.length})
              </button>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={onAddRow}
            />

            <EditModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onSubmit={handleSubmitEdit}
                initialData={editingItem}
                headers={headers}
            />
        </>
    );
}

export default DataSet;