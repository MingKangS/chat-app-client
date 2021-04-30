import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      user: false,
    }
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }
  componentDidMount() {
    axios.get('/auth/user')
      .then(res => {this.setState({user: res.data})
      console.log(res.data,res.data.username)
      if (res.data.username) {
        window.location = "/chat"
      }
    });
    console.log(this.state.user)
    
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    })
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    axios.post('/auth/log-in', {email: this.state.email, password: this.state.password})
      .then(res => {
        console.log(res.data)
        if (res.status == 200) {
          window.location = "/chat"
        }
      });

    this.setState({
      username: ''
    })
  }

  render() {
    return (
      <div>
        <h3>Log in</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>E-mail: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.email}
                onChange={this.onChangeEmail}
                />
            <label>Password: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.password}
                onChange={this.onChangePassword}
                />
          </div>
          <div className="form-group">
            <input type="submit" value="Log in" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}