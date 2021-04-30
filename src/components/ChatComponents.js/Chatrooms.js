import React, { Component } from 'react';
import axios from 'axios';

export default class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatrooms: [],

    }
    
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
  render() {
    const chatroomDivs = this.state.chatrooms.map((roomId,index) => (
			<div key={index}>
				<h3>
					{roomId}
				</h3>
			</div>
    ))
    return (
    <div>
      {chatroomDivs}
    </div>
    )
  }
}