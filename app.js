var React = require('react');

var Main = React.createClass({
  getInitialState: function(){
  	return {
  		allUsers: [
        {
        	name: 'Josh',
        	roles: ['Test1', 'Test2', 'Test3']
        } 
  		]
  	}
  },
  addUser: function(user){
  	var newUsersArray = this.state.allUsers.slice();
    newUsersArray.push(user);
    this.setState({allUsers: newUsersArray});
  },
  editUser: function(user){

  },
  deleteUser: function(user){
    
  },
  render: function(){
  	return (
      <div>
        <AddUser addNew={this.addUser} />
        <UserList users={this.state.allUsers} />
      </div>
  	)
  }
});

var UserList = React.createClass({
  getInitialState: function(){
    return {
      editMode: false
    }
  },

  handleEdit: function(event){
    this.setState({
      editMode: !this.state.editMode
    });
  },
  handleDelete: function(event){

  },
  render: function(){
    var list = this;
  	var users = this.props.users.map(function(user){
  		var roles = user.roles.map(function(role){
        return <div className="role"> {role} </div>;
  		});
      debugger;
      if (list.state.editMode === false){
    		return (
          <div className="user">
           <span className="username">{user.name}</span>
           <span className="roles">Roles:</span> {roles} 
           <button className="editButton" onClick={list.handleEdit}>Edit</button>
           <button className="deleteButton">Delete</button>
          </div>
         )
     } else {
        return (
          <div>
          Test
          </div>
        )
     }
  	});

  	return (
      <div>
        <div>
          {users}
        </div>
      </div>
  	)
  }

});

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
  		roles: [this.state.role1, this.state.role2, this.state.role3]
  	};
    this.props.addNew(currentUser);
    this.setState({
    	newUser: {
    		name: '',
    		role1: '',
    		role2: '',
    		role3: ''
    	}
    });
  },
  render: function(){
  	return (
      <div className="userForm">
        Add User
        <form onSubmit={this.submitUser}>
          User Name: 
          <input type="text" value={this.state.name} onChange={this.changeName} />
          User Roles: 
          <input type="text" maxlength="25" value={this.state.role1} onChange={this.changeRole1} />
          <input type="text" maxlength="25" value={this.state.role2} onChange={this.changeRole2} />
          <input type="text" maxlength="25" value={this.state.role3} onChange={this.changeRole3} />
          <button>Submit</button>
        </form>
      </div>
  	)
  }
});

React.render(<Main />, document.getElementById('container'));