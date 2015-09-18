"use strict";

var React = require('react');

var UserView = React.createClass({
  getInitialState: function(){
    return {
      editMode: false,
      name: this.props.userName,
      role1: this.props.userRoles[0],
      role2: this.props.userRoles[1],
      role3: this.props.userRoles[2]
    }
  },
  handleEdit: function(){
    this.setState({editMode: true});
    this.forceUpdate();
  },
  updateName: function(event){
    this.setState({name: event.target.value})
  },
  updateRole1: function(event){
    this.setState({role1: event.target.value});
  },
  updateRole2: function(event){
    this.setState({role2: event.target.value});
  },
  updateRole3: function(event){
    this.setState({role3: event.target.value});
  },
  handleUpdate: function(){
    var currentUser = {
      name: this.state.name,
      roles: [this.state.role1, this.state.role2, this.state.role3]
    };
    this.props.editUser(currentUser, this.props.index);
    this.setState({editMode: false});
    this.forceUpdate();
  },
  handleDelete: function(){
    this.props.remove(this.state.name);
  },
  render: function(){
    if (this.state.editMode){
      return (
          <div className="form-inline user">
           <input className="username" value={this.state.name} maxLength="20" minLength="3" onChange={this.updateName}/>
           <span className="form-inline rolesTitle">Roles:</span> 
           <input className="role" value={this.state.role1} maxLength="20" onChange={this.updateRole1} />
           <input className="role" value={this.state.role2} maxLength="20" onChange={this.updateRole2} />
           <input className="role" value={this.state.role3} maxLength="20" onChange={this.updateRole3} />
           <button className="btn btn-danger userButton" onClick={this.handleDelete}>Delete</button>
           <button className="btn btn-success userButton" onClick={this.handleUpdate}>Update</button>
         </div>
      )
    } else {
    return (
       <div className="user">
         <div className="form-inline">
           <span className="username">{this.state.name}</span>
           <span className="rolesTitle">Roles:</span> 
           <span className="role">{this.state.role1}</span><span className="role">{this.state.role2}</span><span className="role">{this.state.role3}</span> 
           <button className="btn btn-danger userButton" onClick={this.handleDelete}>Delete</button>
           <button className="btn btn-primary userButton" onClick={this.handleEdit}>Edit</button>
         </div>
       </div>
    )
  }
}
});

module.exports = UserView;