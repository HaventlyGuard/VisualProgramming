import '../styles/DataSet.css';

function DataSet({ headers, data, renderRow, renderHeader, setSelectRows, selectRows }) {
    const handleRowClick = (item, event) => {
        const isCtrlPressed = event.ctrlKey;
        const isRowSelected = selectRows.includes(item.id);

        if (isRowSelected) {
            setSelectRows(selectRows.filter(selectedId => selectedId !== item.id));
        } else {
            if (isCtrlPressed) {
                setSelectRows([...selectRows, item.id]);
            } else {
                setSelectRows([item.id]);
            }
        }
    };

    return (
        <table>
            <thead>
                <tr>
                    <th>⅓</th> 
                    {headers.map((header, index) => (
                        <th key={index}>{renderHeader ? renderHeader(header) : header.title}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => (
                    <tr key={item.id} className={selectRows.includes(item.id) ? 'selected' : ''} onClick={(event) => handleRowClick(item, event)}>
                        <td className='selected-cell'>{index + 1}</td> 
                        {headers.map((header) => (
                            <td key={header.key}>
                                {renderRow ? renderRow(item[header.key]) : item[header.key]}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default DataSet;
