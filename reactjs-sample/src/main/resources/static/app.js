const React = require('react');
const client = require('./client');

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {tenders: []};
    }

    componentDidMount() {
        client({method: 'GET', path: '/api/tenders'}).done(response => {
            this.setState({tenders: response.entity._embedded.tenders});
            console.log(this.state);
        });
    }

    render() {
        return (
            <EmployeeList tenders={this.state.tenders}/>
        )
    }
}

class EmployeeList extends React.Component {
    render() {
        var tenders = this.props.tenders.map(tenders=>
                <Employee key={tenders._links.self.href} tenders={tenders}/>
        );
        return (
            <table>
                <tr>
                    <th>Name</th>
                    <th>Sum</th>
                </tr>
                {tenders}
            </table>
        )
    }
}

class Employee extends React.Component{
    render() {
        return (
            <tr>
                <td>{this.props.tenders.name}</td>
                <td>{this.props.tenders.sum}</td>
            </tr>
        )
    }
}

React.render(
    <App />,
    document.getElementById('react')
)