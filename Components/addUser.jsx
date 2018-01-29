"use strict";

var React = require('react');

var AddUser = React.createClass({
	getInitialState: function(){
		return {
			name: '',
			role1: '',
			role2: '',
			role3: ''
		}
	},
  changeName: function(event){
    this.setState({name: event.target.value});
  },
  changeRole1: function(event){
    this.setState({role1: event.target.value});
  },
  changeRole2: function(event){
    this.setState({role2: event.target.value});
  },
  changeRole3: function(event){
    this.setState({role3: event.target.value});
  },
  submitUser: function(event){
    event.preventDefault();
  	var currentUser = {
  		name: this.state.name,
  		roles: [this.state.role1, this.state.role2, this.state.role3],
      index: this.props.index
  	};
    this.props.addNew(currentUser);
    this.setState({
    		name: '',
    		role1: '',
    		role2: '',
    		role3: ''
    });

  },
  render: function(){
  	return (
      <div className="addUserForm">
        <span className="addFormTitle">Add User</span>
        <form onSubmit={this.submitUser}>
          <div className="form-group">
            <label className="addUserTitle"> User Name:  </label>
            <input className="form-control addUserField" type="text" maxLength="20" value={this.state.name} onChange={this.changeName} placeholder="Name" pattern=".{3,}" required title="3 characters minimum"/>
          </div>
          <div className="form-group">
            <label className="addUserTitle"> User Roles:  </label> 
            <input className="form-control addUserField" type="text" maxLength="15" value={this.state.role1} onChange={this.changeRole1} placeholder="Role 1"/>
            <input className="form-control addUserField" type="text" maxLength="15" value={this.state.role2} onChange={this.changeRole2} placeholder="Role 2"/>
            <input className="form-control addUserField" type="text" maxLength="15" value={this.state.role3} onChange={this.changeRole3} placeholder="Role 3"/>
          </div>
          <button className="btn btn-primary">Submit</button>
        </form>
      </div>
  	)
  }
});

module.exports = AddUser;
