var React = require('react');

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
        <AddUser addNew={this.addUser} index={this.state.allUsers.length} />
        <UserList users={this.state.allUsers} edit={this.editUser}  remove={this.removeUser}/>
      </div>
  	)
  }
});

var UserList = React.createClass({
  render: function(){
    var users = this.props.users;
    var edit = this.props.edit;
    var remove = this.props.remove;
    return (
      <div>
      {users.map(function(user){
        return <UserView userName={user.name} userRoles={user.roles} editUser={edit} remove={remove} key={user.name} />
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
           <input className="role" value={this.state.role1} maxLength="15" onChange={this.updateRole1} />
           <input className="role" value={this.state.role2} maxLength="15" onChange={this.updateRole2} />
           <input className="role" value={this.state.role3} maxLength="15" onChange={this.updateRole3} />
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

var AddUser = React.createClass({
	getInitialState: function(){
		return {
			name: '',
			role1: '',
			role2: '',
			role3: '',
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

React.render(<Main />, document.getElementById('container'));