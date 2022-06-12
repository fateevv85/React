import React, {Component} from "react";
import PropTypes from 'prop-types';

export default class RepLogCreator extends Component {
    constructor(props) {
        super(props);

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleSelectedItemChange = this.handleSelectedItemChange.bind(this);
        this.handleQuantityValueChange = this.handleQuantityValueChange.bind(this);

        this.state = {
            quantityInputError: '',
            quantityValue: 0,
            selectedItemId: '',
        };
    }

    handleSelectedItemChange(event) {
        console.log('selectedItemId', event.target.value);

        this.setState({
            selectedItemId: event.target.value
        });
    }

    handleQuantityValueChange(event) {
        this.setState({
            quantityValue: event.target.value
        });
    }

    handleFormSubmit(event) {
        event.preventDefault();

        const {onNewItemSubmit} = this.props;
        const {quantityValue, selectedItemId} = this.state;

        if (quantityValue < 0) {
            this.setState({quantityInputError: 'Quantity must be positive integer or null'});

            return;
        }

        onNewItemSubmit(selectedItemId, +quantityValue);

        this.setState({
            quantityInputError: '',
            quantityValue: 0,
            selectedItemId: '',
        });
    }

    render() {
        const {repLogs} = this.props;
        const {quantityInputError, quantityValue, selectedItemId} = this.state;

        return (<form
            className="form-inline"
            onSubmit={this.handleFormSubmit}
        >
            <div className="form-group">
                <label className="sr-only control-label required"
                       htmlFor="rep_log_item">
                    What did you lift?
                </label>
                <select id="rep_log_item"
                        required="required"
                        className="form-control"
                        value={selectedItemId}
                        onChange={this.handleSelectedItemChange}
                >
                    <option value="">What did you
                        lift?
                    </option>
                    {repLogs.map((repLog) => (<option
                        value={repLog.id}
                        key={repLog.id}
                    >
                        {repLog.itemLabel}
                    </option>))}
                </select>
            </div>
            {' '}
            <div className={`form-group ${quantityInputError && 'has-error'}`}>
                <label className="sr-only control-label required"
                       htmlFor="rep_log_reps">
                    How many times?
                </label>
                <input type="number"
                       id="rep_log_reps"
                       required="required"
                       placeholder="How many times?"
                       className="form-control"
                       value={quantityValue}
                       onChange={this.handleQuantityValueChange}
                />

                {quantityInputError && <p className="text-red-700">{quantityInputError}</p>}
            </div>
            {' '}
            <div>
                <button type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    I Lifted it!
                </button>
            </div>
        </form>);
    }
}

RepLogCreator.propTypes = {
    onNewItemSubmit: PropTypes.func.isRequired,
    repLogs: PropTypes.array.isRequired,
}
