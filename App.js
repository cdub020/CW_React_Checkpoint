import React from 'react';
import './App.css';
import Getallmail from './getallmail'
import Singlemail from './SingleMail';
import GetMailBySub from './GetMailBySub'
import SendEmail from './SendEmail'


class App extends React.Component{
constructor(props){
  super(props);
  this.state = {
      emails : [],
      singleid : 0,
      hidesingle : true,
      hidemain : false,
      sendmail : false,
      currentItem : "",
      subsearch : false,
      subject : ""
  }
}
/*retrieve emails from server*/
componentDidMount = () => {
  fetch('http://localhost:3001/emails')
  .then ((response) => response.json())
  .then((data) => {
      this.setState({emails: data})
     })
}
/*If an email in the list is clicked on, set ID to the state
  This was before I knew about a get request for searching single email*/
Clicked = (id) => {
  this.setState({singleid : id})
  this.setState({hidesingle : false})
  this.setState({hidemain : true})
}
/*Check to see if subject matches user input, TO UPPER CASE to disregard case*/
handleSubmit(event) {
   for (var x=0; x<this.state.emails.length;x++){
     if (this.state.emails[x].subject.toUpperCase() === this.state.currentItem.toUpperCase()){
       this.setState({singleid : this.state.emails[x].id})
       this.setState({hidemain : true})
       this.setState({subsearch : true})
       break;
     }
   }
  // const fdata = new FormData(event.target);
  // fetch('http://localhost:3001/search?subject=' + fdata.get('subject'))
  //   .then(response => response.json())
  //   .then(data => this.setState({ subject: data.subject }));
  // alert(this.state.subject)
  // event.preventDefault();
}
/*Send mail post request for event from SendEmail.js*/
SendMailSubmit (event) {
  event.preventDefault();
        const fdata = new FormData(event.target);
        fetch('http://localhost:3001/send', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({sender:fdata.get('sender'),
                                  recipient:fdata.get('recipient'),
                                  subject:fdata.get('subject'),
                                  message:fdata.get('message'),
            })
      })
    }
/* Handle change for input box*/
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
          <li className="Compose" onClick={() => { /*If user clicks Compose, show windows*/
                this.setState({hidemain:true})
                this.setState({hidesingle:true})
                this.setState({subsearch : false})
                this.setState({sendmail:true})
          }}>Compose</li> 
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
                {this.state.emails.map(item => 
                <Getallmail item={item} newthing={this.Clicked.bind(this)}/>) /*Get new mail, bind click events to items*/}
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
            this.setState({subsearch : false})
          }} className="SingleEmailBtn">Return to Inbox</button>
        </div>
      )
    }
    else if (this.state.sendmail){
      return(
        <div className="SendEmail">
        <h1 className="SendEmailHeading">Send Email</h1>
        <SendEmail
            onSubmit={this.SendMailSubmit.bind(this)}
          />
        <button onClick={() => {
          this.setState({sendmail : false})
          this.setState({hidemain : false})
          this.setState({subsearch : false})
        }} className="sendmailbtn">Cancel</button>
      </div>
      )
    }
}
}

export default App;
