import React, { Component } from 'react';
import './bootstrap.min.css';
import './DistributionTable.css';
import { ORGANIZATIONS } from './StaticData';

class DistributionTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locked: props.locked,
            title: props.title,
            selected: ORGANIZATIONS[0],
            count: 0,
            options: ORGANIZATIONS,
            rows: []
        };

        this.orgSelector = (
            <select onChange={this.onSelectChange.bind(this)}>
                {ORGANIZATIONS.map(org => <option key={org} value={org}>{org}</option>)}
            </select>
        );

        this.countInput =
            <input onChange={this.onCountChange.bind(this)} type="text" className="form-control" placeholder="1"/>;
        this.buttonClasses = "form-control btn btn-outline-secondary";
        this.addRowButton = (
            <button onClick={this.addRow.bind(this)} className={this.buttonClasses} type="button">
                增加單位
            </button>
        );

        this.tbodyRef = React.createRef();
    }

    onSelectChange(event) {
        this.setState({ selected: event.target.value });
    }
    onCountChange(event) {
        let count = parseInt(event.target.value);
        if (isNaN(count)) {
            count = 1;
        }
        this.setState({ count: count });
    }

    addRow() {
        const newRow = {
            organization: this.state.selected,
            count: Math.max(this.state.count, 1)
        };
        this.setState({
            rows: [ ...this.state.rows, newRow ]
        });
    }

    removeRow(idx) {
        return () => {
            const rows = [...this.state.rows];
            rows.splice(idx, 1);
            this.setState({ rows })
        };
    }

    handleRowClick(idx) {
        return (event) => {
            if (event.target.type === 'button') return;
            if (event.type === 'contextmenu') {
                event.stopPropagation();
                event.preventDefault();
                const rows = [...this.state.rows];
                rows[idx].count += 1;
                this.setState({rows});
            } else if (event.type === 'click') {
                const rows = [...this.state.rows];
                const row = rows[idx];
                if (row.count > 0) {
                    row.count = row.count - 1;
                    if (row.count === 0) {
                        rows.splice(idx, 1);
                        rows.push(row);
                    }
                    this.setState({rows});
                }
            }
        };
    }

    renderRows() {
        return this.state.rows.map((props, idx) => {
            if (!this.state.locked) {
                return (
                    <tr key={idx}
                        onClick={this.handleRowClick(idx).bind(this)}
                        bgcolor={props.count > 0 ? "#ffffff": "#ffaaaa"}
                        onContextMenu={this.handleRowClick(idx).bind(this)}>
                        <td>
                            <button className={this.buttonClasses} onClick={this.removeRow(idx).bind(this)} type="button">
                                移除單位
                            </button>
                        </td>
                        <td>
                            {props.organization}
                        </td>
                        <td>{props.count}</td>
                    </tr>
                );
            }
            return (
                <tr key={idx}
                    onClick={this.handleRowClick(idx).bind(this)}
                    bgcolor={props.count > 0 ? "#ffffff": "#ffaaaa"}
                    onContextMenu={this.handleRowClick(idx).bind(this)}>
                    <td colSpan="2">
                        {props.organization}
                    </td>
                    <td>{props.count}</td>
                </tr>
            );
        });
    }

    outputRows() {
        return this.state.rows;
    }

    getInputRow() {
        if (this.state.locked) return;
        return (
            <tr id="inputRow">
                <td>
                    {this.addRowButton}
                </td>
                <td>
                    {this.orgSelector}
                </td>
                <td>
                    {this.countInput}
                </td>
            </tr>
        );
    }

    render() {
        return (
            <div className="table-responsive col-md-12">
                <table className="table table-bordered table-hover table-sm">
                    <thead>
                        <tr>
                            <th colSpan="2" className="unit">分發單位</th>
                            <th colSpan="2" className="count">剩餘名額</th>
                        </tr>
                    </thead>
                    <tbody ref={this.tbodyRef}>
                        {this.getInputRow()}
                        {this.renderRows()}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default DistributionTable;