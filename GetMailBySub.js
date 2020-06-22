import React, { Fragment } from 'react';

function QueryButton(props) {
  return (
    //get form to query what user is looking for??
    <Fragment>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      />

      <form onSubmit={props.onSubmit} className="SubQuery">
        <input
          type="text"
          name='subject'
          id="subject"
          onChange={props.onChange}
          className="SubSearch"
          placeholder="Search by subject..."
        />
        <button type="submit" className="querysubmitbutton">
          <i className="fa fa-search" aria-hidden="true"></i>
        </button>
      </form>
    </Fragment>
  );
}
export default QueryButton;