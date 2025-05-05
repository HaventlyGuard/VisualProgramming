import React, { useState, useEffect } from 'react';

function EditModal({ isOpen, onClose, onSubmit, initialData, headers }) {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (initialData) {
      // Копируем данные и преобразуем числа, если нужно
      const preparedData = { ...initialData };
      if ('postId' in preparedData) {
        preparedData.postId = preparedData.postId.toString();
      }
      setFormData(preparedData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Преобразуем данные перед отправкой
      const dataToSend = { ...formData };
      if ('postId' in dataToSend) {
        dataToSend.postId = parseInt(dataToSend.postId) || 1;
      }
      
      await onSubmit(dataToSend);
      onClose();
    } catch (error) {
      console.error('Ошибка при обновлении данных:', error);
      alert('Не удалось обновить данные. Проверьте консоль для подробностей.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Редактирование записи</h2>
        <form onSubmit={handleSubmit}>
          {headers.map(header => (
            <div key={header.key} className="form-group">
              <label>{header.title}</label>
              {header.key === 'body' ? (
                <textarea
                  name={header.key}
                  value={formData[header.key] || ''}
                  onChange={handleChange}
                  required
                />
              ) : (
                <input
                  type={header.key === 'postId' ? 'number' : header.key === 'email' ? 'email' : 'text'}
                  name={header.key}
                  value={formData[header.key] || ''}
                  onChange={handleChange}
                  required
                  min={header.key === 'postId' ? '1' : undefined}
                />
              )}
            </div>
          ))}
          <div className="modal-actions">
            <button type="button" onClick={onClose}>Отмена</button>
            <button type="submit">Сохранить</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditModal;