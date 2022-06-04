import React, {Component} from "react";
import RepLogTable from "./RepLogTable";
import PropTypes from 'prop-types';

export default class RepLogApp extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleRowClick = this.handleRowClick.bind(this);
        this.state = {
            highlightedRowId: null,
            repLogs: [
                {id: 1, reps: 25, itemLabel: 'My Laptop', weight: 4},
                {id: 2, reps: 10, itemLabel: 'Big Fat Cat', weight: 15},
                {id: 8, reps: 4, itemLabel: 'Fat Cat', weight: 10}
            ]
        };
    }

    handleRowClick(repLogId, event) {
        this.setState({highlightedRowId: repLogId});
        console.log(event);
    }

    render() {
        return (<RepLogTable
            {...this.props}
            {...this.state}
            handleRowClick={this.handleRowClick}
        />);
    }
}

RepLogApp.propTypes = {
    withHeart: PropTypes.bool,
}
