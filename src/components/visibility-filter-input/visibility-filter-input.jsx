import React from 'react';
import { connect } from 'react-redux';

import Form from 'react-bootstrap/Form';

import { setFilter } from '../../actions/actions';

function VisibilityFilterInput(props) {
  return <Form.Control style={{"border":"2px solid #969CAB", "borderRadius":"1rem"}}
    onChange={e => props.setFilter(e.target.value)}
    value={props.visibilityFilter}
    placeholder="Search"
    />
}

export default connect(
  null, 
  { setFilter }
)(VisibilityFilterInput);