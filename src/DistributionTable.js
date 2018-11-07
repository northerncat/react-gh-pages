import React, { Component } from 'react';
import './bootstrap.min.css';
import './DistributionTable.css';
import { ORGANIZATIONS } from './StaticData';

class DistributionTable extends Component {
    constructor(props) {
        super(props);
        this.title = props.title;

        const addRowButtonClasses = "btn btn-outline-secondary col-md-2";
        this.addRowButton = (
            <button className={addRowButtonClasses} type="button">
                增加單位
            </button>
        );
        this.countInput = 
            <input type="text" className="form-control col-md-4" placeholder="名額"/>;

        this.tableBody = (<tbody>
            <tr id="inputRow">
                <td colspan="2">
                    <div className="input-group mb-3">
                        {this.addRowButton}
                        <select className="col-md-6">
                            {this.getOragnizationOptions()}
                        </select>
                        {this.countInput}
                    </div>
                </td>
            </tr>
        </tbody>);
    }

    getOragnizationOptions() {
        return ORGANIZATIONS.map(
            org => {
                return <option value={org}>{org}</option>;
            }
        );
    }

    addRow() {
        // list
    }

    render() {
        return (
            <div className="table-responsive col-md-12">
                <table className="table table-bordered table-hover table-sm">
                    <thead>
                        <tr>
                            <th className="unit">分發單位</th>
                            <th className="count">剩餘名額</th>
                        </tr>
                    </thead>
                    {this.tableBody}
                </table>
            </div>
        );
    }
}

export default DistributionTable;