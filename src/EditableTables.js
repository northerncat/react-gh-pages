import React, { Component } from 'react';
import EchelonInput from './EchelonInput';
import DistributionTable from './DistributionTable';

import './EditableTables.css';

class EditableTables extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locked: false,
            rowsData: {
                home: [],
                priority: [],
                island: [],
                center: [],
                general: []
            }
        };
        this.TABLE_NAMES = [
            "家庭因素（返家住宿）",
            "優先分發戶籍地或附近服役（集中住宿）",
            "設籍或自願前往離島服役",
            "衛生福利人員訓練中心",
            "一般資格者"
        ];
        this.NUM_TABLES = 5;

        this.echelonRef = React.createRef();
        this.tableRefs = [];
        for (let i = 0; i < this.NUM_TABLES; ++i) {
            this.tableRefs.push(React.createRef());
        }
    }

    flipLockedState() {
        console.log(this.state.locked);
        this.setState({ locked : !this.state.locked }, () => {
            for (let i = 0; i < this.NUM_TABLES; ++i) {
                this.tableRefs[i].current.setState({locked: this.state.locked});
            }
        });
    }

    /****************** Output data functionalities ******************/
    /* Collect the data from the references to store in a csv string. */
    collectDataInCsv() {
        let csv = "梯次," + this.echelonRef.current.state.echelon + "\n";
        for (let i = 0; i < this.NUM_TABLES; ++i) {
            csv += this.TABLE_NAMES[i] + "," + this.tableRefs[i].current.state.rows.length + "\n";
            for (let org = 0; org < this.tableRefs[i].current.state.rows.length; ++org) {
                const row = this.tableRefs[i].current.state.rows[org];
                csv += row.organization + "," + row.count + "\n";
            }
        }
        return csv;
    }

    /* Output the csv string data as a csv file and download the file. */
    outputData() {
        return () => {
            const csv = this.collectDataInCsv();
            var hiddenElement = document.createElement('a');
            hiddenElement.href = 'data:text/csv;charset=big5,' + encodeURI(csv);
            hiddenElement.target = '_blank';
            hiddenElement.download = this.echelonRef.current.state.echelon + 'T 員額表網路版.csv';
            hiddenElement.click();
        };
    }

    /****************** Input data functionalities ******************/
    /* Parse the input csv string data as different tables. */
    parseInputData(csv) {
        const lines = csv.split("\n");
        let i;
        for (i = 0; i < lines.length; ++i) {
            lines[i] =  lines[i].split(",");
        }
        const echelon = lines[0][1];
        this.echelonRef.current.setState({echelon: parseInt(echelon)});

        i = 1;
        for (let catIdx = 0; catIdx < this.NUM_TABLES; ++catIdx) {
            let rows = [];
            for (let entryIdx = 1; entryIdx <= parseInt(lines[i][1]); ++entryIdx) {
                rows.push({
                    organization: lines[i + entryIdx][0],
                    count: parseInt(lines[i + entryIdx][1])
                });
            }
            this.tableRefs[catIdx].current.setState({rows});
            i += parseInt(lines[i][1]) + 1;
        }
    }

    /* Handles the uploaded csv file. */
    inputData() {
        return (e) => {
            e.persist();
            var reader = new FileReader();
            const self = this;
            reader.onload = function(e) {
                self.parseInputData(reader.result);
            }
            reader.readAsText(e.target.files[0]);
            e.target.value = "";
        };
    }

    /* Creates a number of DistributionTable entries with correct headers and refs. */
    createTables() {
        let tables = [];
        for (let i = 0; i < this.NUM_TABLES; ++i) {
            tables.push((
                <div key={this.TABLE_NAMES[i] + i} className="col-md-12 ml-sm-auto col-lg-12 px-4">
                    <main role="main" className="col-md-12 ml-sm-auto col-lg-12 px-4">
                        <h3>{this.TABLE_NAMES[i]}</h3>
                    </main>
                    <div>
                        <DistributionTable ref={this.tableRefs[i]}/>
                    </div>
                </div>
            ))
        }
        return tables;
    }    

    render() {
        return (
            <div>
                <EchelonInput ref={this.echelonRef}/>
                {this.createTables()}
                <div className="col-md-12 ml-sm-auto col-lg-12 px-4">
                    <button type="button" onClick={this.flipLockedState.bind(this)} className="form-control btn btn-outline-secondary col-md-4">
                        鎖定數目
                    </button>
                    <button type="button" onClick={this.outputData().bind(this)} className="form-control btn btn-outline-secondary col-md-4">
                        下載資料
                    </button>
                    <div className="form-control btn btn-outline-secondary col-md-4 custom-file">
                        <input type="file"
                               onChange={this.inputData().bind(this)}
                               onClick={() => {this.value = null;}}
                               className="custom-file-input minimized"
                               accept=".csv"
                               id="csvFile"/>
                        <label className="" htmlFor="csvFile">上傳CSV檔案</label>
                    </div>
                </div>
            </div>
        );
    }
}

export default EditableTables;