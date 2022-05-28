import React, {Component} from "react";

export default class RepLogApp extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            highlightedRowId: null,
        };
    }

    render() {
        let heart = this.props.withHeart ? <span>❤️</span> : '';
        const {highlightedRowId} = this.state;

        const repLogs = [
            {id: 1, reps: 25, itemLabel: 'My Laptop', weight: 4},
            {id: 2, reps: 10, itemLabel: 'Big Fat Cat', weight: 15},
            {id: 8, reps: 4, itemLabel: 'Fat Cat', weight: 10}
        ];

        return (
            <div className="col-md-7 js-rep-log-table">
                <h2>Lift Stuff! {heart}</h2>

                <table className="table table-striped">
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
                    {repLogs.map((repLog) => (
                        <tr
                            key={repLog.id}
                            className={highlightedRowId === repLog.id ? 'info' : ''}
                        >
                            <td>{repLog.itemLabel}</td>
                            <td>{repLog.reps}</td>
                            <td>{repLog.weight}</td>
                            <td>{repLog.reps * repLog.weight}</td>
                            <td>...</td>
                        </tr>
                    ))}
                    </tbody>
                    <tfoot>
                    <tr>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <th>Total</th>
                        <th>TODO</th>
                        <td>&nbsp;</td>
                    </tr>
                    </tfoot>
                </table>

                <form className="form-inline">
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
                            <option value="cat">Cat</option>
                            <option value="fat_cat">Big Fat Cat</option>
                            <option value="laptop">My Laptop</option>
                            <option value="coffee_cup">Coffee Cup</option>
                        </select>
                    </div>
                    {' '}
                    <div className="form-group">
                        <label className="sr-only control-label required"
                               htmlFor="rep_log_reps">
                            How many times?
                        </label>
                        <input type="number" id="rep_log_reps"
                               name="reps" required="required"
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
}
