import React from "react";
import RepLogList from "./RepLogList";
import PropTypes from 'prop-types';
import RepLogCreator from "./RepLogCreator";

export default function RepLogTable(props) {
    const {withHeart, highlightedRowId, onRowClick, repLogs, onAddNewItem} = props;
    const heart = withHeart ? <span>❤️</span> : '';
    const calculateTotalWeight = repLogs => repLogs.reduce((accumulator, repLog) => {
        return accumulator + (repLog.reps * repLog.weight)
    }, 0);

    return (
        <div className="col-md-7 js-rep-log-table">
            <h2>Lift Stuff! {heart}</h2>

            <table className="table table-striped text-center">
                <thead>
                <tr>
                    <th>What</th>
                    <th>Weight</th>
                    <th>How many times?</th>
                    <th>Total</th>
                    <th>&nbsp;</th>
                </tr>
                </thead>
                <tbody>
                <RepLogList
                    highlightedRowId={highlightedRowId}
                    onRowClick={onRowClick}
                    repLogs={repLogs}
                />
                </tbody>
                <tfoot>
                <tr>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <th>Total</th>
                    <th>{calculateTotalWeight(repLogs)}</th>
                    <td>&nbsp;</td>
                </tr>
                </tfoot>
            </table>

            <RepLogCreator
                repLogs={repLogs}
                onNewItemSubmit={onAddNewItem}
            />
        </div>
    );
}

RepLogTable.propTypes = {
    withHeart: PropTypes.bool,
    highlightedRowId: PropTypes.number,
    onRowClick: PropTypes.func.isRequired,
    repLogs: PropTypes.array.isRequired,
    onAddNewItem: PropTypes.func.isRequired,
};
