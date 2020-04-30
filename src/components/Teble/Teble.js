import React, { Component } from 'react'

import MaterialTable from 'material-table';

class Teble extends Component {
    constructor(props) {
        super(props);
        this.state = {
             columns: [
                 { title: 'Id', field: 'clockId'},
                 { title: 'Name', field: 'clockName' },
                 { title: 'Status', field: 'clockStatus'},
                 { title: 'Time Zone', field: 'timeZone'},
                 { title: 'Battery', field: 'clockBattery'},
                 { title: 'Temperature', field: 'roomTemperature'}
             ],
            data: [
                { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
                { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017, birthCity: 34 },
            ]
        }
    }

    componentDidMount() {
        const { clockData } = this.props;
        // console.log(clockData)

        this.setState({
            data: clockData
        })
    }

    render() {
        return (
            <MaterialTable
                title="Data Table"
                columns={this.state.columns}
                data={this.state.data}
                icons={{
                    Add: props => (
                        <div>
                            Add new Region
                        </div>
                    ),
                }}
            />
        );
    }
}

export default (Teble)