import 'bootstrap/dist/css/bootstrap.min.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from "next/link";
import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const DOMAIN = process.env.DOMAIN
  const PORT = process.env.PORT

  async function login(e) {
    e.preventDefault();

    if (!email || !password) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      await axios.post(DOMAIN, {
        email, password
      })
        .then(res => {
          if (res.data == "exist") {
            router.push("/Home")
          }
          else if (res.data == "notexist") {
            alert("User have not sign up")
          }
          else if (res.data == "incorrectpassword") {
            alert("Password is not correct")
          }
          else if (res.data == "fail") {
            alert("Something is fishy")
          }

        })
        .catch(e => {
          alert(DOMAIN)
          alert(PORT)
          console.log(e);
        })

    }
    catch (e) {
      console.log(e);
    }

  }

  return (
    <div className="main-div" style={{ display: 'flex', flexDirection: 'column' }}>
      
      <form method='post' className="login-main-div">
        <h1>Login </h1>
        <TextField value={email} id="standard-basic" label="Email" variant="standard" margin="normal" onChange={(event) => { setEmail(event.target.value) }} />
        <TextField value={password} id="standard-password-input" label="Password" type="password" autoComplete="current-password" variant="standard" margin="normal" onChange={(event) => { setPassword(event.target.value) }} />

        <Button onClick={login} variant="contained" style={{ marginTop: '30px' }}>LogIn</Button>
        <div className="link-div">
          Does not Have An Account? <Link href='/SignUp'>SignUp</Link>
        </div>
      </form>
    </div>
  )
}