import React, { Component } from 'react';
import './App.css';
import { render } from '@testing-library/react';
import Getallmail from './getallmail'
import Singlemail from './SingleMail';
import GetMailBySub from './GetMailBySub'

class App extends React.Component{
constructor(props){
  super(props);
  this.state = {
      emails : [],
      singleid : 0,
      hidesingle : true,
      hidemain : false,
      currentItem : "",
      subsearch : false
  }
}

componentDidMount = () => {
  fetch('http://localhost:3001/emails')
  .then ((response) => response.json())
  .then((data) => {
      this.setState({emails: data})
     })
}

Clicked = (id) => {
  this.setState({singleid : id})
  this.setState({hidesingle : false})
  this.setState({hidemain : true})
}

DeleteEmail = () => {
  alert("hello")
}

handleSubmit(event) {
   for (var x=0; x<this.state.emails.length;x++){
     if (this.state.emails[x].subject.toUpperCase() === this.state.currentItem.toUpperCase()){
       this.setState({singleid : this.state.emails[x].id})
       this.setState({hidemain : true})
       this.setState({subsearch : true})
       break;
     }
   }
  
  event.preventDefault();
}

handleChange(event) {
  this.setState({
    currentItem: event.target.value,
  });
}

render(){
  if (this.state.hidemain === false){
    return (
      <div className="Page">
        <div className="Sidebar">
          <ul className="ComposeNav">
          <li className="Compose">Compose</li> 
          </ul>
          <ul className="Nav">
            <li className="SideItems Inbox">Inbox</li> 
            <li className="SideItems Sent">Sent</li> 
            <li className="SideItems Drafts">Drafts</li> 
            <li className="SideItems Trash">Trash</li> 
          </ul>
        </div>
          <div className="AllMailContainer">
              <ul className="AllEmails">
                {this.state.emails.map(item => <Getallmail item={item} newthing={this.Clicked.bind(this)}/>)}
              </ul>
          </div>
          <GetMailBySub
            onSubmit={this.handleSubmit.bind(this)}
            onChange={this.handleChange.bind(this)}
          />
    </div>
  );
    }
    else if (this.state.hidemain && this.state.hidesingle === false || this.state.subsearch){
      return (
        <div className="SingleEmail">
          <h1 className="SingleHeading">{this.state.emails[this.state.singleid - 1].subject}</h1>
          <ul>
            <Singlemail item={this.state.emails} id={this.state.singleid - 1} />
          </ul>
          <button onClick={() => {
            this.setState({hidesingle : true})
            this.setState({hidemain : false})
            this.setState({subsearch : true})
          }} className="SingleEmailBtn">Return to Inbox</button>
        </div>
      )
    }
}
}

export default App;
