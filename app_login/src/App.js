import React, { useState } from "react";
//import Teste from './components/Teste';
import './App.css';

const App = () => {

  const [username, setUsername] = useState("");
  const [senha, setPassword] = useState("");
  const [user, setUser] = useState();
  const [erro, setErro] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    const userForm = { username, senha };
    console.log(userForm);
    
    await fetch("http://localhost:5000/api/home/login/", 
    {
      method: "POST",
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
      //body: JSON.stringify({"username": "teste", "senha": "teste123"})
      body: JSON.stringify(userForm)
    })

    .then(
      resp => {
      if (resp.ok) {
      //console.log(resp.json());
      resp.json().then((data) => {
      console.log(data);
      // set the state of the user
      setUser(data);
      // store the user in localStorage
      localStorage.setItem('user', data);
      //console.log(data)
      })
      }
      else {
      console.log('Usuário inexistente ou servidor off-line.');
      setErro("Usuário inexistente ou servidor off-line.");
      }
    })

    .catch(function (error) {
      console.log('There has been a problem with your fetch operation: ' + error.message);
    });
  };

  // if there's a user show the message below
  if (user) {
    return <div>{user.user.username} is logged in</div>;
  }

  // if there's no user, show the login form
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">Username: </label>

      <input
        type="text"
        value={username}
        placeholder="enter a username"
        onChange={({ target }) => setUsername(target.value)}
      />

      <div>
        <label htmlFor="senha">password: </label>
        <input
          type="password"
          value={senha}
          placeholder="enter a password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>

      <button type="submit">Login</button>
      
      <h4 className="msgErro">{erro}</h4>
    </form>
  );
};

export default App;