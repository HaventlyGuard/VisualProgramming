import React from 'react';
import DataTableWrapper from '../components/DataTableWrapper';
import * as Yup from 'yup';

const Users = () => {
    const headers = [
        { title: 'ID', key: 'id' },
        { title: 'Name', key: 'name' },
        { title: 'Username', key: 'username' },
        { title: 'Email', key: 'email' },
        { title: 'Phone', key: 'phone' },
        { title: 'Website', key: 'website' },
    ];

    const validationSchema = {
        name: Yup.string().required('Name is required'),
        username: Yup.string().required('Username is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        phone: Yup.string().required('Phone is required'),
        website: Yup.string().required('Website is required'),
    };

    return (
        <DataTableWrapper
            endpoint="https://jsonplaceholder.typicode.com/users"
            headers={headers}
            validationSchema={validationSchema}
        />
    );
};

export default Users;