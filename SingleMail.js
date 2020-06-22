import React from 'react';
import './App.css';



/* Function takes in user selected email, returns entire message*/
function Singlemail (props){
    return(
        <div className="SingleMessage">
            <li className="Sender" > Sender: {props.item[props.id].sender}<br /></li>
            <li className="Recipient" > Recipient: {props.item[props.id].recipient}<br /></li>
            <li className="Date" > Date: {props.item[props.id].date}<br /><br /></li>
            <li className="Message" > Message: <br />{props.item[props.id].message}</li>
        </div>
    )
}

export default Singlemail;