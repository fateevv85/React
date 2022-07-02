import React from "react";
import PropTypes from 'prop-types';

export default function RepLogList(props) {
    const {highlightedRowId, onRowClick, repLogs, onDeleteItem, isLoaded} = props;

    const deleteRow = (e, itemId) => {
        e.preventDefault();

        onDeleteItem(itemId);
    }

    if (!isLoaded) {
        return (
            <tr>
                <td colSpan="5" className="text-center">Loading...</td>
            </tr>
        );
    }

    return (
        repLogs.map((repLog) => (
            <tr
                key={repLog.id}
                className={highlightedRowId === repLog.id ? 'bg-amber-500' : ''}
                onClick={() => onRowClick(repLog.id)}
            >
                <td>{repLog.itemLabel}</td>
                <td>{repLog.weight}</td>
                <td>{repLog.reps}</td>
                <td>{repLog.reps * repLog.weight}</td>
                <td>
                    <a href="#" onClick={(event) => {
                        deleteRow(event, repLog.id)
                    }}>
                        <i className="fa-solid fa-trash-can"></i>
                    </a>
                </td>
            </tr>
        ))
    );
}

RepLogList.propTypes = {
    highlightedRowId: PropTypes.string,
    onRowClick: PropTypes.func.isRequired,
    repLogs: PropTypes.array.isRequired,
    onDeleteItem: PropTypes.func.isRequired,
    isLoaded: PropTypes.bool.isRequired,
};
