"use strict";

var React = require('react');
var AddUser = require('./addUser.js');
var UserList = require('./userList.js');

var Main = React.createClass({
  getInitialState: function(){
  	return {
  		allUsers: []
  	}
  },
  addUser: function(user){
  	var newUsersArray = this.state.allUsers.slice();
    newUsersArray.push(user);
    this.setState({
      allUsers: newUsersArray
    });
  },
  editUser: function(user, index){
    var newUsersArray = this.state.allUsers.slice();
    newUsersArray[index] = user;
    this.setState({
      allUsers: newUsersArray
    });
  },
  removeUser: function(user){
    var index = null;
    for (var i = 0; i < this.state.allUsers.length; i++){
      if (this.state.allUsers[i].name === user){
        index = i;
      }
    }
    var newUsersArray = this.state.allUsers.slice();
    newUsersArray.splice(index, 1);
    this.setState({
      allUsers: newUsersArray
    });
  },
  render: function(){
  	return (
      <div>
        <AddUser addNew={this.addUser} />
        <UserList users={this.state.allUsers} edit={this.editUser}  remove={this.removeUser}/>
      </div>
  	)
  }
});

React.render(<Main />, document.getElementById('container'));

module.exports = Main;