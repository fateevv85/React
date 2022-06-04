import React, {Component} from "react";
import PropTypes from 'prop-types';

export default class RepLogCreator extends Component {
    constructor(props) {
        super(props);

        this.handleFormSubmit = this.handleFormSubmit.bind(this);

        this.quantityInput = React.createRef();
        this.itemSelect = React.createRef();
    }

    handleFormSubmit(event) {
        event.preventDefault();
        const {onNewItemSubmit} = this.props;

        const quantityInput = this.quantityInput.current;
        const itemSelect = this.itemSelect.current;

        onNewItemSubmit(
            itemSelect.options[itemSelect.selectedIndex].value,
            parseInt(quantityInput.value)
        );

        quantityInput.value = null;
        itemSelect.selectedIndex = '';
    }

    render() {
        const {repLogs} = this.props;

        return (
            <form
                className="form-inline"
                onSubmit={this.handleFormSubmit}
            >
                <div className="form-group">
                    <label className="sr-only control-label required"
                           htmlFor="rep_log_item">
                        What did you lift?
                    </label>
                    <select id="rep_log_item"
                            ref={this.itemSelect}
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
                           ref={this.quantityInput}
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
        );
    }
}

RepLogCreator.propTypes = {
    onNewItemSubmit: PropTypes.func.isRequired,
    repLogs: PropTypes.array.isRequired,
}
