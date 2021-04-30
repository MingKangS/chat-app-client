import React, { Component } from 'react';
import axios from 'axios';
import Conversation from './ChatComponents.js/Conversation'



export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: false,
      chatrooms: [],
      openedChatroom: "",
    }
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    axios.get('/auth/user')
      .then(res => {this.setState({user: res.data.username})
      console.log("user get",res.data,res.data.username)
      if (!res.data.username) {
        window.location = "/log-in"
      }
    });
    console.log(this.state.user)
    const user = this.state.user
    axios.get('/chat/chatrooms')
      .then(res => {this.setState({chatrooms: res.data})
      console.log("CR", res.data)
      
    });
  }

  

  render() {
    const chatroomDivs = this.state.chatrooms.map((room_name,index) => (
			<div key={index}>
        {room_name}
      </div>
    ))
    // const conversationPanels = this.state.chatrooms.map((roomId,index) => (
    //   <TabPanel index={index}>
    //     <Conversation roomId={roomId}/>
    //   </TabPanel>
    // ))
    return (
    <div>
      {chatroomDivs}
      <Conversation chatroom={this.state.currentChatroom} username={this.state.user}/>
    </div>
    )
  }
}