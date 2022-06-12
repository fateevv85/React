import React, {Component} from "react";
import RepLogTable from "./RepLogTable";
import PropTypes from 'prop-types';
import {v4 as uuid} from 'uuid';

export default class RepLogApp extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleRowClick = this.handleRowClick.bind(this);
        this.handleAddNewItem = this.handleAddNewItem.bind(this);
        this.handleHeartChange = this.handleHeartChange.bind(this);

        this.state = {
            highlightedRowId: null,
            repLogs: [
                {id: uuid(), reps: 25, itemLabel: 'My Laptop', weight: 4},
                {id: uuid(), reps: 10, itemLabel: 'Big Fat Cat', weight: 15},
                {id: uuid(), reps: 4, itemLabel: 'Fat Cat', weight: 10}
            ],
            numberOfHearts: 1
        };
    }

    handleHeartChange(heartCount) {
        this.setState({
            numberOfHearts: heartCount
        });
    }

    handleRowClick(repLogId) {
        this.setState({highlightedRowId: repLogId});
    }

    handleAddNewItem(itemId, reps) {
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
            onAddNewItem={this.handleAddNewItem}
            onHeartChange={this.handleHeartChange}
        />);
    }
}

RepLogApp.propTypes = {
    withHeart: PropTypes.bool,
}
