import React, {Component} from "react";
import RepLogTable from "./RepLogTable";
import PropTypes from 'prop-types';
import {getRepLogs, deleteRepLog} from '../api/rep_log_api';

export default class RepLogApp extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleRowClick = this.handleRowClick.bind(this);
        this.handleAddNewItem = this.handleAddNewItem.bind(this);
        this.handleHeartChange = this.handleHeartChange.bind(this);
        this.handleDeleteItem = this.handleDeleteItem.bind(this);

        this.state = {
            highlightedRowId: null,
            repLogs: [],
            numberOfHearts: 1,
            isLoaded: false,
        };
    }

    async componentDidMount() {
        const json = await getRepLogs();
        this.setState({
            repLogs: json,
            isLoaded: true,
        });

        console.log(json);
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

    async handleDeleteItem(itemId) {
        console.log('delete item', itemId);

        await deleteRepLog(itemId);

        this.setState((prevState) => {
                return {
                    repLogs: prevState.repLogs.filter(repLog => repLog.id !== itemId)
                }
            }
        );
    }

    render() {
        return (<RepLogTable
            {...this.props}
            {...this.state}
            onRowClick={this.handleRowClick}
            onAddNewItem={this.handleAddNewItem}
            onHeartChange={this.handleHeartChange}
            onDeleteItem={this.handleDeleteItem}
        />);
    }
}

RepLogApp.propTypes = {
    withHeart: PropTypes.bool,
}
