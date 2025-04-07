import React, { useState } from 'react';
import '../styles/Modal.css';

function Modal({ isOpen, onClose, onSubmit, maxId }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        postId: null,
        body: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ id: maxId + 1, ...formData });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Добавить новую строку</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        PostID:
                        <input type="text" name="postId" value={formData.postId} onChange={handleChange} required />
                    </label>
                    <label>
                        Имя:
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                    </label>
                    <label>
                        Email:
                        <input type="text" name="email" value={formData.email} onChange={handleChange} required />
                    </label>
                    <label>
                        Коммент:
                        <input type="text" name="body" value={formData.body} onChange={handleChange} required />
                    </label>

                    <button type="submit">Сохранить</button>
                    <button type="button" onClick={onClose}>Закрыть</button>
                </form>
            </div>
        </div>
    );
}

export default Modal;
