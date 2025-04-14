import React from 'react';
import DataTableWrapper from '../components/DataTableWrapper';
import * as Yup from 'yup';

const Posts = () => {
    const headers = [
        { title: 'User ID', key: 'userId' },
        { title: 'ID', key: 'id' },
        { title: 'Title', key: 'title' },
        { title: 'Body', key: 'body' },
    ];

    const validationSchema = {
        userId: Yup.number().required('User ID is required'),
        title: Yup.string().required('Title is required'),
        body: Yup.string().required('Body is required'),
    };

    return (
        <DataTableWrapper
            endpoint="https://jsonplaceholder.typicode.com/posts"
            headers={headers}
            validationSchema={validationSchema}
        />
    );
};

export default Posts;