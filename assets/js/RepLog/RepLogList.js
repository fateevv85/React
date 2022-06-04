import React from "react";
import PropTypes from 'prop-types';

export default function RepLogList(props) {
    const {highlightedRowId, onRowClick, repLogs} = props;

    return (
        repLogs.map((repLog) => (
            <tr
                key={repLog.id}
                className={highlightedRowId === repLog.id ? 'bg-amber-500' : ''}
                onClick={() => onRowClick(repLog.id)}
            >
                <td>{repLog.itemLabel}</td>
                <td>{repLog.reps}</td>
                <td>{repLog.weight}</td>
                <td>{repLog.reps * repLog.weight}</td>
                <td>...</td>
            </tr>
        ))
    );
}

RepLogList.propTypes = {
    highlightedRowId: PropTypes.number,
    onRowClick: PropTypes.func.isRequired,
    repLogs: PropTypes.array.isRequired,
};
