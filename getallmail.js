import React from 'react';
import './App.css';

function Getallmail(props){
    return(
    <li className="SenderList" onClick={event => (props.newthing(props.item.id))}> Sender: {props.item.sender}<br />
            Subject: {props.item.subject}
    </li>
    )
}

export default Getallmail;
