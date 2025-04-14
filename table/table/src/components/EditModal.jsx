import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import '../styles/Modal.css';

function EditModal({ isOpen, onClose, onSubmit, initialData, headers, validationSchema }) {
  if (!isOpen) return null;

  return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Редактировать запись</h2>
          <Formik
              initialValues={initialData || {}}
              validationSchema={Yup.object().shape(validationSchema)}
              onSubmit={(values, { setSubmitting }) => {
                onSubmit(values);
                setSubmitting(false);
                onClose();
              }}
          >
            {({ isSubmitting }) => (
                <Form>
                  {headers.map(header => (
                      <div key={header.key} className="form-group">
                        <label>{header.title}</label>
                        <Field type="text" name={header.key} />
                        <ErrorMessage name={header.key} component="div" className="error-message" />
                      </div>
                  ))}
                  <div className="modal-actions">
                    <button type="submit" disabled={isSubmitting}>
                      Сохранить
                    </button>
                    <button type="button" onClick={onClose}>
                      Закрыть
                    </button>
                  </div>
                </Form>
            )}
          </Formik>
        </div>
      </div>
  );
}

export default EditModal;