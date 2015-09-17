var Main = React.createClass({
  getInitialState: function(){
  	return {
  		allUsers: [
        {
        	name: 'Josh',
        	roles: ['Front-end engineer', 'Full-stack engineer', 'Bass player']
        } 
  		]
  	}
  },
  addUser: function(user){
  	this.setState({
  		allUsers: this.state.allUsers.push(user);
  	});
  },
  render: function(){
  	return (
      <div>
        <AddUser addNew={this.state.addUser}/>
        <UserList users={this.state.allUsers}/>
      </div>
  	)
  }
});

var UserList = React.createClass({
  render: function(){
  	
  	var users = this.props.users.map(function(user){
  		var roles = this.user.roles.map(function(role){
        return <div> {role} </div>;
  		});
  		return <div> {user.name} {roles} </div>;
  	});

  	return (
      <div>
        <div>
          {users}
        </div>
  	)
  }

});

var AddUser = React.createClass({
	getInitialState: function(){
		return {
			newUser: {
				name: '',
				roles: ['', '', '']
			}
		}
	},
  changeName: function(e){
    this.setState({
    	newUser: this.state.newUser.name = e.target.value;
    })
  },
  changeRole1: function(e){
    this.setState({
    	newUser: this.state.newUser.roles[0] = e.target.value;
    })
  },
  changeRole2: function(e){
    this.setState({
    	newUser: this.state.newUser.roles[0] = e.target.value;
    })
  },
  changeRole3: function(e){
    this.setState({
    	newUser: this.state.newUser.roles[0] = e.target.value;
    })
  },
  submitUser: function(e){
    this.props.addNew(newUser);
    this.setState({
    	newUser: {
    		name: '',
    		roles: ['', '', '']
    	}
    });
  },
  render: function(){
  	return (
      <div>
        <form>Add User//Add button and drop down for fields
          User Name: 
          <input type="text" value="Name" onChange={this.changeName}>
          User Roles: 
          <input type="text" value={this.state.newUser.roles[0]} onChange={this.changeRole1}>
          <input type="text" value={this.state.newUser.roles[1]} onChange={this.changeRole2}>
          <input type="text" value={this.state.newUser.roles[2]} onChange={this.changeRole3}>
          <input type="submit" value="Submit" onClick={this.submitUser}>
        </form>
      </div>
  	)
  }
});

























React.render(<Main>, document.getElementById('.container'));