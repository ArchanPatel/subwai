"use client";

import {useSession} from "next-auth/react";

const profile = () => {
  const {data: session} = useSession(); 

  return (
    <div class="profile-card">
        <div class="profile-picture">
            <img 
                src={session?.user.image}
                alt="/assets/images/profile.svg"
            />
        </div>

        <div class="user-details">
            <h1>User Details</h1>
            <p>Name: {session?.user.name}</p>
            <p>Email: {session?.user.email}</p>
            <p>Account Type: Premium</p>
        </div>

        <div class="settings-menu">
          <h1>Settings</h1>
            <ul>
                <li><a href="#">FAQ</a></li>
                <li><a href="#">Store Information</a></li>
                <li><a href="#">All Store Statistics</a></li>
            </ul>
        </div>
    </div>
  )
}

export default profile