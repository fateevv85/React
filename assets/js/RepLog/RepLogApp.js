import React, {Component} from "react";
import RepLogTable from "./RepLogTable";
import PropTypes from 'prop-types';

export default class RepLogApp extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleRowClick = this.handleRowClick.bind(this);
        this.handleNewItemSubmit = this.handleNewItemSubmit.bind(this);
        this.state = {
            highlightedRowId: null,
            repLogs: [
                {id: 1, reps: 25, itemLabel: 'My Laptop', weight: 4},
                {id: 2, reps: 10, itemLabel: 'Big Fat Cat', weight: 15},
                {id: 8, reps: 4, itemLabel: 'Fat Cat', weight: 10}
            ]
        };
    }

    handleRowClick(repLogId) {
        this.setState({highlightedRowId: repLogId});
    }

    handleNewItemSubmit(itemId, reps) {
        const {repLogs} = this.state;

        for (const [idx, repLog] of repLogs.entries()) {
            if (repLog.id === itemId) {
                repLogs[idx].reps = reps;
                this.setState({repLogs: repLogs});
                return;

            }
        }

        console.error(`Item with id ${itemId} not found`);
    }

    render() {
        return (<RepLogTable
            {...this.props}
            {...this.state}
            onRowClick={this.handleRowClick}
            onNewItemSubmit={this.handleNewItemSubmit}
        />);
    }
}

RepLogApp.propTypes = {
    withHeart: PropTypes.bool,
}
