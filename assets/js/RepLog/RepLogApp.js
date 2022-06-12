import React, {Component} from "react";
import RepLogTable from "./RepLogTable";
import PropTypes from 'prop-types';
import {v4 as uuid} from 'uuid';

export default class RepLogApp extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleRowClick = this.handleRowClick.bind(this);
        this.handleNewItemSubmit = this.handleNewItemSubmit.bind(this);
        this.state = {
            highlightedRowId: null,
            repLogs: [
                {id: uuid(), reps: 25, itemLabel: 'My Laptop', weight: 4},
                {id: uuid(), reps: 10, itemLabel: 'Big Fat Cat', weight: 15},
                {id: uuid(), reps: 4, itemLabel: 'Fat Cat', weight: 10}
            ]
        };
    }

    handleRowClick(repLogId) {
        this.setState({highlightedRowId: repLogId});
    }

    handleNewItemSubmit(itemId, reps) {
        this.setState((prevState) => {
            const repLogsNew = [...prevState.repLogs];

            for (const [idx, repLog] of repLogsNew.entries()) {
                if (repLog.id === itemId) {
                    repLogsNew[idx].reps = reps;

                    return {repLogs: repLogsNew};
                }
            }

            repLogsNew.push({
                id: itemId,
                reps: reps,
                itemLabel: 'TODO',
                weight: Math.floor(Math.random() * 10),
            });

            return {repLogs: repLogsNew}
        });
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
