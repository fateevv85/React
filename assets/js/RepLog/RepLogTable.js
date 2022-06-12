import React from "react";
import RepLogList from "./RepLogList";
import PropTypes from 'prop-types';
import RepLogCreator from "./RepLogCreator";
// import RepLogCreator from "./RepLogCreatorControlledComponents";

export default function RepLogTable(props) {
    const {withHeart, highlightedRowId, onRowClick, repLogs, onAddNewItem, numberOfHearts, onHeartChange, onDeleteItem} = props;

    const renderHearts = (withHeart, numberOfHearts) => {
        if (withHeart && numberOfHearts > 0) {
            return <span>{'❤'.repeat(numberOfHearts)}</span>;
        }

        return '';
    };

    const calculateTotalWeight = repLogs => repLogs.reduce((accumulator, repLog) => {
        return accumulator + (repLog.reps * repLog.weight)
    }, 0);

    return (
        <div className="col-md-7 js-rep-log-table">
            <h2>Lift Stuff! {renderHearts(withHeart, numberOfHearts)}</h2>
            <input
                type="range"
                value={numberOfHearts}
                onChange={(e) => {
                    onHeartChange(+e.target.value);
                }}/>

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
                    onDeleteItem={onDeleteItem}
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
    highlightedRowId: PropTypes.string,
    onRowClick: PropTypes.func.isRequired,
    repLogs: PropTypes.array.isRequired,
    onAddNewItem: PropTypes.func.isRequired,
    numberOfHearts: PropTypes.number.isRequired,
    onHeartChange: PropTypes.func.isRequired,
    onDeleteItem: PropTypes.func.isRequired,
};
