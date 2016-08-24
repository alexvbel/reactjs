const React = require('react');
const client = require('./client');
const follow = require('./follow');

var $ = require('jquery');
global.jQuery = require("jquery");
window.$ = $;
var bootstrap = require('bootstrap');
var bootbox = require('bootbox');

const root = '/api';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {tenders: [], attributes: [], pageSize: 2, links: {}};
        this.onCreate = this.onCreate.bind(this);
		this.onDelete = this.onDelete.bind(this);
    }

    componentDidMount() {
    	this.loadFromServer(this.state.pageSize);
    }
    
    onCreate(newTender) {
		follow(client, root, ['tenders']).then(tendersCollection => {
			return client({
				method: 'POST',
				path: tendersCollection.entity._links.self.href,
				entity: newTender,
				headers: {'Content-Type': 'application/json'}
			})
		}).then(response => {
			return follow(client, root, [
				{rel: 'tenders', params: {'size': this.state.pageSize}}]);
		}).done(response => {
			this.onNavigate(response.entity._links.last.href);

		});
	}

	onDelete(tender) {
		client({ method: 'DELETE', path: tender._links.self.href
		}).done(reponse => {
			this.loadFromServer(this.state.pageSize);
		})
	}

	onNavigate(uri) {
		client({
			method: 'GET',
			path: uri
		}).done(tendersCollection => {
			this.setState({
				tenders: tendersCollection.entity._embedded.tenders,
				attributes: Object.keys(this.schema.properties),
				pageSize: this.state.pageSize,
				links: tendersCollection.entity._links
			});
		});
	}

    loadFromServer(pageSize) {
    	follow(client, root, [
    	              		{rel: 'tenders', params: {size: pageSize}}]
    	              	).then(tendersCollection => {
							this.path = tendersCollection.entity._links.self.href;
    	              		return client({
    	              			method: 'GET',
    	              			path: tendersCollection.entity._links.profile.href,
    	              			headers: {'Accept': 'application/schema+json'}
    	              		}).then(schema => {
								this.schema = schema.entity;
    	              			return tendersCollection;
    	              		});
    	              	}).done(tendersCollection => {
    	              		this.setState({
    	              			tenders: tendersCollection.entity._embedded.tenders,
    	              			attributes: Object.keys(this.schema.properties),
    	              			pageSize: pageSize,
    	              			links: tendersCollection.entity._links});
    	              	});
    }

    render() {
        return (
        		<div>
        			<CreateDialog attributes={this.state.attributes} onCreate={this.onCreate}/>
        			<TenderList tenders={this.state.tenders} onDelete={this.onDelete}/>
        		</div>
        )
    }
}

class TenderList extends React.Component {
    render() {
        var tenders = this.props.tenders.map(tenders=>
                <Tender key={tenders._links.self.href} tenders={tenders} onDelete={this.props.onDelete}/>
        );
        return (
            <table>
                <tr>
                    <th>Name</th>
                    <th>Sum</th>
					<th>JSON</th>
					<th>Action</th>
                </tr>
                {tenders}
            </table>
        )
    }
}

class Tender extends React.Component{

	constructor(props) {
		super(props);
		this.handleDelete = this.handleDelete.bind(this);
	}

	handleDelete() {
		this.props.onDelete(this.props.tenders);
	}

	render() {
        return (
            <tr>>
                <td>{this.props.tenders.name}</td>
                <td>{this.props.tenders.sum}</td>
				<td><a href={this.props.tenders._links.self.href}>view</a></td>
				<td><button onClick={this.handleDelete}>delete</button></td>
            </tr>
        )
    }
}

class CreateDialog extends React.Component{
	constructor(props){
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	
	handleSubmit(e) {
		e.preventDefault();
		var newTender = {};
		this.props.attributes.forEach(attribute => {
			newTender[attribute] = React.findDOMNode(this.refs[attribute]).value.trim();
		});
		this.props.onCreate(newTender);
		
		this.props.attributes.forEach(attribute => {
			React.findDOMNode(this.refs[attribute]).value = '';
		});
		
		window.location = "#";
	}

	render() {
		var inputs = this.props.attributes.map(attribute =>
			<p key={attribute}>
				<input type="text" placeholder={attribute} ref={attribute} className="field" />
			</p>
		);

		return (
			<div>
				<a href="#createTender">Create</a>

				<div id="createTender" className="modalDialog">
					<div>
						<a href="#" title="Close" className="close">X</a>

						<h2>Create new tender!</h2>

						<form>
							{inputs}
							<button onClick={this.handleSubmit}>Create</button>
						</form>
					</div>
				</div>
			</div>
		)
	}
}

React.render(
    <App />,
    document.getElementById('react')
)