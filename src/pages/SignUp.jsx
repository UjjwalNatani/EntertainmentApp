
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { useRouter } from 'next/router';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const DOMAIN = process.env.DOMAIN || "http://localhost:8000/";

  async function signUp(e) {
    e.preventDefault();

    if (!name || !email || !password) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      await axios.post(`${DOMAIN}SignUp`, {
        name, email, password
      })
        .then(res => {
          if (res.data == "exist") {
            alert("User already exists! Please Login")
            setName('');
            setEmail('');
            setPassword('');
          }
          else if (res.data == "notexist") {
            alert("User Created Successfully");
            router.push("/")
            setName('');
            setEmail('');
            setPassword('');
          }
        })
        .catch(e => {
          alert("wrong details")
          console.log(e);
        })

    }
    catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="main-div" style={{ display: 'flex', flexDirection: 'column' }}>

      <form method="post" className="signup-main-div">
        <h1>SignUp </h1>
        <TextField required value={name} id="standard-basic" label="Name" autoComplete="name" variant="standard" margin="normal" onChange={(event) => { setName(event.target.value) }} />
        <TextField required value={email} id="standard-basic" label="Email" variant="standard" margin="normal" onChange={(event) => { setEmail(event.target.value) }} />
        <TextField required value={password} id="standard-password-input" label="Password" type="password" autoComplete="current-password" variant="standard" margin="normal" onChange={(event) => { setPassword(event.target.value) }} />

        <Button variant="contained" style={{ marginTop: '30px' }} onClick={signUp}>SignUp</Button>
        <div className="link-div">
          Already Have An Account? <Link href='/'>Login</Link>
        </div>
      </form>
    </div>
  )
}