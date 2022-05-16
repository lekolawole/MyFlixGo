import React from "react";
import { Button, Card, Col, Container, Form, Control, Row, Collapse } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './profile-view.scss';

export class UpdatedUser extends React.Component {

    //const [open, setOpen] = useState(false);
  constructor(props){
    super(props);
    this.state = {
      collaspeMenu: true
    };
    this.showHide = this.showHide.bind(this);
  }

  showHide(e) {
    e.preventDefault();

    this.setState({
      collapseMenu: !this.state.collapseMenu
    });
  }

   getUser(token) {
    let user = localStorage.getItem("user");
    let email = localStorage.getItem("email");
    let password = localStorage.getItem("password");
    
    axios.get(`https://my-flix-22.herokuapp.com/users/${user}`, {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then((response) => {
      this.setState({
        user: response.data.Username,
        email: response.data.Email,
        birthday: response.data.Birthday
      });
    })
    .catch((e) => 
      console.log(e))
  }
  
  
  render() {
    const user = localStorage.getItem("user");
    let email = localStorage.getItem("email");
    let birthday = localStorage.getItem("birthday");
    let password = localStorage.getItem("password");
    
    

  
  return (
   <Container>
     <Row>
       <Col>
       <Button
          onClick={this.showHide}
          aria-controls="example-collapse-text"
          role="button"
          aria-expanded="false"
          >
            Click to Manage Profile
        </Button>
        <Collapse in={!this.state.collapseMenu}>
        <Form id="example-collapse-text">
          <Form.Group>
            <Form.Label>Username </Form.Label>
            <Form.Control 
              style={{ "width":"24rem", "display":"flex"}}
                type="text" 
                value={user} 
                placeholder= 'Enter a username' 
                onChange={e => setUsername(e.target.value)}
                />
          </Form.Group>

          <Form.Group>
            <Form.Label>Email </Form.Label>
            <Form.Control 
              style={{ "width":"24rem", "display":"flex"}}
                type="text" 
                value={email} 
                placeholder= 'Enter a username' 
                onChange={e => setUsername(e.target.value)}
                />
          </Form.Group>

          <Form.Group>
            <Form.Label>Password </Form.Label>
            <Form.Control 
              style={{ "width":"24rem", "display":"flex"}}
                type="text" 
                value={password} 
                placeholder= {password} 
                onChange={e => setUsername(e.target.value)}
                />
          </Form.Group>

          <Form.Group>
            <Form.Label>Birthday </Form.Label>
            <Form.Control 
              style={{ "width":"24rem", "display":"flex"}}
                type="text" 
                value={birthday} 
                placeholder= 'Enter a username' 
                onChange={e => setUsername(e.target.value)}
                />
          </Form.Group>
        </Form>
        </Collapse>
       </Col>
     </Row>
     <Row>
       <Col>
        <Button>Save Changes</Button>
        <Button variant="secondary" style={{"marginLeft":"5rem"}}>Cancel</Button>
       </Col>
     </Row>
   </Container>
  )
  }
  
}

export default UpdatedUser;

// UserInfo.propTypes = {
//   user: PropTypes.shape({
//     username: PropTypes.string.isRequired,
//     password: PropTypes.string.isRequired,
//     birthday: PropTypes.string.isRequired,
//     email: PropTypes.string.isRequired
//   }).isRequired
// }





// <Form>
//           <Form.Group>
//             <Form.Label>Username </Form.Label>
//             <Form.Control 
//               style={{ "width":"24rem", "display":"flex"}}
//                     type="text" 
//                     value={user} 
//                     placeholder= {user} 
//                     onChange={e => setUsername(e.target.value)}
//                     />
//           </Form.Group>

//           <Form.Group>
//             <Form.Label>Email </Form.Label>
//             <Form.Control 
//               style={{ "width":"24rem", "display":"flex"}}
//                     type="text" 
//                     value={email} 
//                     placeholder= {email} 
//                     onChange={e => setUsername(e.target.value)}
//                     />
//           </Form.Group>

//           <Form.Group>
//             <Form.Label>Password </Form.Label>
//             <Form.Control
//               style={{ "width":"24rem", "display":"flex"}}
//                     type="text" 
//                     value={password} 
//                     placeholder= {password}
//                     onChange={e => setUsername(e.target.value)}
//                     />
//           </Form.Group>

//           <Form.Group>
//             <Form.Label>Birthday </Form.Label>
//             <Form.Control 
//               style={{ "width":"24rem", "display":"flex"}}
//                     type="text" 
//                     value={birthday} 
//                     placeholder= {birthday}
//                     onChange={e => setUsername(e.target.value)}
//                     />
//           </Form.Group>
//         </Form>
