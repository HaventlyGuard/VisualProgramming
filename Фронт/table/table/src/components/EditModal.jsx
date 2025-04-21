import React, { useState, useEffect } from 'react';

function EditModal({ isOpen, onClose, onSubmit, initialData, headers }) {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({ ...initialData });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
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
              <input
                type="text"
                name={header.key}
                value={formData[header.key] || ''}
                onChange={handleChange}
              />
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