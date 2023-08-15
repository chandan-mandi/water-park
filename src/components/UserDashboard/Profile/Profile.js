import React from 'react';

import useAuth from '../../hooks/useAuth';

const Profile = () => {
    const {user} = useAuth();
    
    return (
        <div>
            <h2>Your Email : {user.email}</h2>
        </div>
    );
};

export default Profile;