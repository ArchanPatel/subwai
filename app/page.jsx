'use client';

import Options from "@components/Options";
import {useSession} from "next-auth/react";

const Home = () => {
  const {data: session} = useSession();  

  return (
    
    <section className='w-full flex-center flex-col'>
      {session?.user ? 
      <div>
      <section class="hero">
            <h1>Hello {session?.user.name},</h1>
            <h4>Spectate your Subway Smart Shelf:</h4>
        </section>
    <Options /> 
    </div>:
    <div>
        <section class="hero">
            <h1>Welcome to Our Platform</h1>
            <p>Unlock a world of insights and convenience with our services.</p>
            <p>Please Sign in</p>
        </section>

        <section class="features">
            <div class="feature-item">
                <h2>Your Live Inventory Counts</h2>
                <p>Track your inventory in real-time.</p>
            </div>
            <div class="feature-item">
                <h2>Suggested Ordering</h2>
                <p>Receive smart suggestions for your inventory orders.</p>
            </div>
            <div class="feature-item">
                <h2>Statistics</h2>
                <p>Get detailed insights and analytics.</p>
            </div>
        </section>
    </div>
}
  </section>
  )
}

export default Home;