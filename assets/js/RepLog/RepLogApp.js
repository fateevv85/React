import React, {Component} from "react";
import RepLogList from "./RepLogList";

export default class RepLogApp extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleRowClick = this.handleRowClick.bind(this);
        this.state = {
            highlightedRowId: null,
        };
    }

    handleRowClick(repLogId, event) {
        this.setState({highlightedRowId: repLogId});
        console.log(event);
    }

    render() {
        const heart = this.props.withHeart ? <span>❤️</span> : '';
        let {highlightedRowId} = this.state;

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
                    <RepLogList highlightedRowId={highlightedRowId} onRowClick={this.handleRowClick}/>
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
