import React, {Component} from "react";

export default class RepLogList extends Component {
    render() {
        const repLogs = [
            {id: 1, reps: 25, itemLabel: 'My Laptop', weight: 4},
            {id: 2, reps: 10, itemLabel: 'Big Fat Cat', weight: 15},
            {id: 8, reps: 4, itemLabel: 'Fat Cat', weight: 10}
        ];

        const {highlightedRowId, onRowClick} = this.props;

        return (
            repLogs.map((repLog) => (
                <tr
                    key={repLog.id}
                    className={highlightedRowId === repLog.id ? 'bg-gray-500' : ''}
                    onClick={(event) => onRowClick(repLog.id, event)}
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
}
