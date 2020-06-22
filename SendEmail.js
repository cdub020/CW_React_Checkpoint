import React from 'react';
import './App.css';

function SendEmail(props) {
    return (
      //get form to send email
        <form onSubmit={props.onSubmit} className="FormSend">
                    <label htmlFor="sender">Sender's Email: </label>
                    <input id="sender" name="sender" type="email" required/>
                    <br /> <br />
                    <label htmlFor="recipient">Recipient's Email: </label>
                    <input id="recipient" name="recipient" type="email" required/>
                    <br /> <br />
                    <label htmlFor="subject">Subject: </label>
                    <input id="subject" name="subject" type="text" />
                    <br /> <br />
                    <label htmlFor="message">Message: </label>
                    <textarea id="message" name="message" rows="10" cols="50" />
                    <br /><br />
                    <button className="SendMail">Send Email</button>
        </form>
    );
  }
  export default SendEmail;
