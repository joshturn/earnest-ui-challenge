var React = require('react');

var Main = React.createClass({
  getInitialState: function(){
  	return {
  		allUsers: [
        {
        	name: 'Josh',
        	roles: ['Test1', 'Test2', 'Test3']
        } 
  		],
      userCount: 0
  	}
  },
  addUser: function(user){
  	var newUsersArray = this.state.allUsers.slice();
    newUsersArray.push(user);
    this.setState({
      allUsers: newUsersArray,
      userCount: this.state.userCount++
    });
  },
  editUser: function(user, index){
    var newUsersArray = this.state.allUsers.slice();
    newUsersArray[index] = user;
    this.setState({
      allUsers: newUsersArray
    });
  },
  removeUser: function(user, index){
    var newUsersArray = this.state.allUsers.slice(index, 1);
    this.setState({
      allUsers: newUsersArray,
      userCount: this.state.userCount--
    });
  },
  render: function(){
  	return (
      <div>
        <AddUser addNew={this.addUser} />
        <UserList users={this.state.allUsers} edit={this.editUser} remove={this.removeUser} count={this.state.userCount}/>
      </div>
  	)
  }
});

var UserList = React.createClass({
  render: function(){
    var users = this.props.users;
    var edit = this.props.edit;
    var remove = this.props.remove
    var count = this.props.count
    return (
      <div>
      {users.map(function(user){
        return <UserView userName={user.name} userRoles={user.roles} editUser={edit} remove={remove} count={count}/>
        userCount++;
      })}
      </div>
    );
  }
});

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
    var index = this.props.count;
    this.props.editUser(currentUser, index);
    this.setState({editMode: false});
    this.forceUpdate();
  },
  handleDelete: function(){
    return {}
  },
  render: function(){
    if (this.state.editMode){
      return (
        <div className="user">
         <input className="username" value={this.state.name} maxLength="25" onChange={this.updateName}/>
         <span className="roles">Roles:</span> 
         <input value={this.state.role1} maxLength="25" onChange={this.updateRole1} />
         <input value={this.state.role2} maxLength="25" onChange={this.updateRole2} />
         <input value={this.state.role3} maxLength="25" onChange={this.updateRole3} />
         <button className="editButton" onClick={this.handleUpdate}>Update</button>
         <button className="deleteButton">Delete</button>
       </div>
      )
    } else {
    return (
       <div className="user">
         <span className="username">{this.state.name}</span>
         <span className="roles">Roles:</span> 
         {this.state.role1} {this.state.role2} {this.state.role3} 
         <button className="editButton" onClick={this.handleEdit}>Edit</button>
         <button className="deleteButton">Delete</button>
       </div>
    )
  }
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
          <input type="text" maxLength="25" value={this.state.role1} onChange={this.changeRole1} />
          <input type="text" maxLength="25" value={this.state.role2} onChange={this.changeRole2} />
          <input type="text" maxLength="25" value={this.state.role3} onChange={this.changeRole3} />
          <button>Submit</button>
        </form>
      </div>
  	)
  }
});

React.render(<Main />, document.getElementById('container'));