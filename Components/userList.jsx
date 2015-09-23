"use strict";

var React = require('react');
var UserView = require('./userView.jsx');

var UserList = React.createClass({
  render: function(){
    var users = this.props.users;
    var edit = this.props.edit;
    var remove = this.props.remove;
    return (
      <div>
      <div className="userList">Users</div>
      {users.map(function(user){
        return <UserView userName={user.name} userRoles={user.roles} editUser={edit} remove={remove} key={user.name} />
      })}
      </div>
    );
  }
});

module.exports = UserList;