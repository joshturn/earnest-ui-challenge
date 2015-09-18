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
      console.log('User: ', user);
      console.log('userCount on add: ', this.state.allUsers.length);
  },
  editUser: function(user, index){
    var newUsersArray = this.state.allUsers.slice();
    newUsersArray[index] = user;
    this.setState({
      allUsers: newUsersArray
    });
  },
  removeUser: function(index){
    console.log('index to remove at: ', index);
    var newUsersArray = this.state.allUsers.slice();
    newUsersArray.splice(index, 1);
    this.setState({
      allUsers: newUsersArray
    });
    console.log('userCount on remove: ', this.state.allUsers.length);
  },
  render: function(){
  	return (
      <div>
        <AddUser addNew={this.addUser} index={this.state.allUsers.length}/>
        <UserList users={this.state.allUsers} edit={this.editUser} remove={this.removeUser} />
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
        return <UserView userName={user.name} userRoles={user.roles} editUser={edit} remove={remove} index={user.index}/>
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
    console.log(this);
    this.props.remove(this.state.index);
  },
  render: function(){
    if (this.state.editMode){
      return (
          <div className="form-inline user">
           <input className="username" value={this.state.name} maxLength="25" onChange={this.updateName}/>
           <span className="roles" className="form-inline">Roles:</span> 
           <input value={this.state.role1} maxLength="25" onChange={this.updateRole1} />
           <input value={this.state.role2} maxLength="25" onChange={this.updateRole2} />
           <input value={this.state.role3} maxLength="25" onChange={this.updateRole3} />
           <button className="btn btn-success" onClick={this.handleUpdate}>Update</button>
           <button className="btn btn-danger" onClick={this.handleDelete}>Delete</button>
         </div>
      )
    } else {
    return (
       <div className="user">
         <div className="form-inline">
           <span className="username">{this.state.name}</span>
           <span className="roles">Roles:</span> 
           {this.state.role1} {this.state.role2} {this.state.role3} 
           <button className="btn btn-primary userButton" onClick={this.handleEdit}>Edit</button>
           <button className="btn btn-danger userButton" onClick={this.handleDelete}>Delete</button>
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
      <div>
        Add User
        <form onSubmit={this.submitUser}>
          <div className="form-group">
            <label> User Name:  </label>
            <input type="text" value={this.state.name} onChange={this.changeName} placeholder="Name"/>
          </div>
          <div className="form-group">
            <label> User Roles:  </label> 
            <input type="text" maxLength="25" value={this.state.role1} onChange={this.changeRole1} placeholder="Role 1"/>
            <input type="text" maxLength="25" value={this.state.role2} onChange={this.changeRole2} placeholder="Role 2"/>
            <input type="text" maxLength="25" value={this.state.role3} onChange={this.changeRole3} placeholder="Role 3"/>
          </div>
          <button className="btn btn-primary">Submit</button>
        </form>
      </div>
  	)
  }
});

React.render(<Main />, document.getElementById('container'));