import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // axios.post('https://my-flix-22.herokuapp.com/users', {
    //   Username: username,
    //   Password: password,
    //   Email: email,
    //   Birthday: birthday
    // })
    // .then(response => {
    //   console.log(response.data);
    // })
    // .catch(e => {
    //   console.log('Error during registration.');
    //   alert('Registration not complete')
    // });
    console.log(username, password, email, birthday);
    props.onRegister(false)
  }

  return(
    <form>
      <label>
        Username:
        <input type="text" value={username} placeholder= 'Username' onChange={e => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} placeholder= 'Password' onChange={e => setPassword(e.target.value)} />
      </label>
      <label>Email: 
        <input type="email" value={email} placeholder='Email' onChange={e => setEmail(e.target.value)} />
      </label>
      <label>
        Birthday: 
        <input type="date" value={birthday} placeholder='mm/dd/yyyy' onChange={e => setBirthday(e.target.value)} />
      </label>
      <button type="submit" onClick={handleSubmit}>Register</button>
    </form>
  );
}

// RegistrationView.propTypes = {
//   user: PropTypes.shape({
//     username: PropTypes.string.isRequired,
//     password: PropTypes.string.isRequired,
//     birthday: PropTypes.string.isRequired,
//     email: PropTypes.string.isRequired
//   }).isRequired
// }