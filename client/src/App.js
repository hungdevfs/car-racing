import logo from './logo.svg';
import './App.css';

import axios from "axios"

function App() {
  const login = async () => {
    const res = await axios.post(
      "http://localhost:8888/api/v1/account/login", 
      {
        email: "jack.brightsoft@gmail.com",
        password: "Asdfgh1@3"
      },
      {
        withCredentials: true
      }
    )

    console.log(res.data)
  }

  return (
    <div className="App">
      <button onClick={login}>Login</button>
    </div>
  );
}

export default App;
