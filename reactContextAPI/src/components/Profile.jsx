import React, {useContext} from 'react'
import UserContext from '../context/UserContext'

function Profile() {
    const {user} = useContext(UserContext);

    if (!user) return (
        <>
            <br/>
            <div>please login</div>
        </>
    )
    else return (
        <>
            <br/>
            <div>Welcome {user.username}</div>
        </>
    )
}

export default Profile
