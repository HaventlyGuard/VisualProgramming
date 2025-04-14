import React from 'react';
import DataTableWrapper from '../components/DataTableWrapper';
import * as Yup from 'yup';

const Albums = () => {
    const headers = [
        { title: 'User ID', key: 'userId' },
        { title: 'ID', key: 'id' },
        { title: 'Title', key: 'title' },
    ];

    const validationSchema = {
        userId: Yup.number().required('User ID is required'),
        title: Yup.string().required('Title is required'),
    };

    return (
        <DataTableWrapper
            endpoint="https://jsonplaceholder.typicode.com/albums"
            headers={headers}
            validationSchema={validationSchema}
        />
    );
};

export default Albums;