import React from 'react';
import DataTableWrapper from '../components/DataTableWrapper';
import * as Yup from 'yup';

const Todos = () => {
    const headers = [
        { title: 'User ID', key: 'userId' },
        { title: 'ID', key: 'id' },
        { title: 'Title', key: 'title' },
        { title: 'Completed', key: 'completed' },
    ];

    const validationSchema = {
        userId: Yup.number().required('User ID is required'),
        title: Yup.string().required('Title is required'),
        completed: Yup.boolean().required('Completed status is required'),
    };

    return (
        <DataTableWrapper
            endpoint="https://jsonplaceholder.typicode.com/todos"
            headers={headers}
            validationSchema={validationSchema}
        />
    );
};

export default Todos;