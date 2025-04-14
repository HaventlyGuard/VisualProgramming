import React, { useEffect, useState } from 'react';
import { useOptimistic, startTransition } from 'react';
import axios from 'axios';
import DataSet from './DataSet';
import { Formik } from 'formik';
import * as Yup from 'yup';

function DataTableWrapper({ endpoint, headers, validationSchema }) {
    const [selectRows, setSelectRows] = useState([]);
    const [fetchDataState, setFetchDataState] = useState([]);

    const [optimisticData, addOptimisticData] = useOptimistic(
        fetchDataState,
        (state, action) => {
            switch (action.type) {
                case 'add':
                    return [...state, { ...action.data, id: Math.max(...state.map(item => item.id), 0) + 1 }];
                case 'delete':
                    return state.filter(item => !action.ids.includes(item.id));
                case 'update':
                    return state.map(item =>
                        item.id === action.id ? { ...item, ...action.data } : item
                    );
                default:
                    return state;
            }
        }
    );

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(endpoint);
                setFetchDataState(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [endpoint]);

    const handleAddRow = async (newRow) => {
        try {
            startTransition(() => {
                addOptimisticData({ type: 'add', data: newRow });
            });

            await new Promise(resolve => setTimeout(resolve, 500));
            const response = await axios.post(endpoint, newRow);
            setFetchDataState(prev => [...prev, response.data]);
        } catch (err) {
            console.error('Failed to add row:', err);
        }
    };

    const handleDeleteRows = async (ids) => {
        try {
            startTransition(() => {
                addOptimisticData({ type: 'delete', ids });
            });

            await Promise.all(
                ids.map(id =>
                    axios.delete(`${endpoint}/${id}`)
                )
            );

            setFetchDataState(prev => prev.filter(item => !ids.includes(item.id)));
            setSelectRows([]);
        } catch (err) {
            console.error('Failed to delete rows:', err);
        }
    };

    const handleUpdateRow = async (id, updatedData) => {
        try {
            startTransition(() => {
                addOptimisticData({ type: 'update', id, data: updatedData });
            });

            await new Promise(resolve => setTimeout(resolve, 500));
            const response = await axios.patch(
                `${endpoint}/${id}`,
                updatedData
            );

            setFetchDataState(prev =>
                prev.map(item => item.id === id ? response.data : item)
            );
        } catch (err) {
            console.error('Failed to update row:', err);
        }
    };

    return (
        <div className='DataTable'>
            <DataSet
                headers={headers}
                data={optimisticData}
                renderRow={(value) => value}
                renderHeader={(header) => header.title}
                selectRows={selectRows}
                setSelectRows={setSelectRows}
                onAddRow={handleAddRow}
                onDeleteRows={handleDeleteRows}
                onUpdateRow={handleUpdateRow}
                validationSchema={validationSchema}
            />
        </div>
    );
}

export default DataTableWrapper;