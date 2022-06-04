import React, {Component} from "react";
import RepLogTable from "./RepLogTable";

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
        const {highlightedRowId} = this.state;
        const {withHeart} = this.props;

        return (<RepLogTable
            withHeart={withHeart}
            highlightedRowId={highlightedRowId}
            handleRowClick={this.handleRowClick}
        />);
    }
}
