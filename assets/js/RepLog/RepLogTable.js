import React from "react";
import RepLogList from "./RepLogList";
import PropTypes from 'prop-types';
import RepLogCreator from "./RepLogCreator";

export default function RepLogTable(props) {
    const {withHeart, highlightedRowId, onRowClick, repLogs, onNewItemSubmit} = props;
    const heart = withHeart ? <span>❤️</span> : '';
    const calculateTotalWeight = repLogs => repLogs.reduce((accumulator, repLog) => {
        return accumulator + (repLog.reps * repLog.weight)
    }, 0);

    function handleFormSubmit(event) {
        event.preventDefault();

        onNewItemSubmit(
            parseInt(event.target.elements.namedItem('item').value),
            parseInt(event.target.elements.namedItem('reps').value)
        );
    }

    return (
        <div className="col-md-7 js-rep-log-table">
            <h2>Lift Stuff! {heart}</h2>

            <table className="table table-striped text-center">
                <thead>
                <tr>
                    <th>What</th>
                    <th>How many times?</th>
                    <th>Weight</th>
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

            <RepLogCreator/>

            <form
                className="form-inline"
                onSubmit={(event) => handleFormSubmit(event)}
            >
                <div className="form-group">
                    <label className="sr-only control-label required"
                           htmlFor="rep_log_item">
                        What did you lift?
                    </label>
                    <select id="rep_log_item"
                            name="item"
                            required="required"
                            className="form-control">
                        <option value="">What did you
                            lift?
                        </option>
                        {repLogs.map((repLog) => (
                            <option
                                value={repLog.id}
                                key={repLog.id}
                            >
                                {repLog.itemLabel}
                            </option>
                        ))}
                    </select>
                </div>
                {' '}
                <div className="form-group">
                    <label className="sr-only control-label required"
                           htmlFor="rep_log_reps">
                        How many times?
                    </label>
                    <input type="number"
                           id="rep_log_reps"
                           name="reps"
                           required="required"
                           placeholder="How many times?"
                           className="form-control"/>
                </div>
                {' '}
                <div>
                    <button type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        I Lifted it!
                    </button>
                </div>
            </form>
        </div>
    );
}

RepLogTable.propTypes = {
    withHeart: PropTypes.bool,
    highlightedRowId: PropTypes.number,
    onRowClick: PropTypes.func.isRequired,
    repLogs: PropTypes.array.isRequired,
    onNewItemSubmit: PropTypes.func.isRequired,
};
