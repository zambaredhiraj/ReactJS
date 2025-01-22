import React, {useState, useContext} from 'react'
import UserContext from '../context/UserContext'

function Login() {
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const {setUser} = useContext(UserContext)

    const handleSubmit = (e) => {
        e.preventDefault();
        setUser({username, password});
    }

    return (
        <div>
            <h2>Login</h2>
            <div><input type='text' placeholder='Username' value={username} onChange={(e) => {setUserName(e.target.value)}}/></div>
            <br/>
            <div><input type='text' placeholder='Password' value={password} onChange={(e) => {setPassword(e.target.value)}}/></div>
            <br/>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export default Login
