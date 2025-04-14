import React from 'react';
import DataTableWrapper from '../components/DataTableWrapper';
import * as Yup from 'yup';

const Comments = () => {
    const headers = [
        { title: 'Post ID', key: 'postId' },
        { title: 'ID', key: 'id' },
        { title: 'Name', key: 'name' },
        { title: 'Email', key: 'email' },
        { title: 'Body', key: 'body' },
    ];

    const validationSchema = {
        postId: Yup.number().required('Post ID is required'),
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        body: Yup.string().required('Body is required'),
    };

    return (
        <DataTableWrapper
            endpoint="https://jsonplaceholder.typicode.com/comments"
            headers={headers}
            validationSchema={validationSchema}
        />
    );
};

export default Comments;