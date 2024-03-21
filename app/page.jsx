'use client';

import Options from "@components/Options";
import { useEffect, useState } from "react";
import { signIn, useSession, getProviders } from "next-auth/react";

const Home = () => {
  const {data: session} = useSession();  
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false)

  useEffect(() => {
    const setUpProviders = async() => {
        const response = await getProviders();
        setProviders(response);
    }
    setUpProviders();
  },[])
  return (
    
    <section className='w-full flex-center flex-col'>
      {session?.user ? 
      <div>
      <section className="hero">
            <h1>Hello {session?.user.name},</h1>
            <h4>Spectate your Subway Smart Shelf:</h4>
        </section>
    <Options /> 
    </div>:
    <div>
        <section className="hero">
            <h1>Welcome to SubwAI</h1>
            <p>Unlock a world of insights and convenience with our services.</p>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className='black_btn centered'
                >
                  Sign in
                </button>
              ))}
        </section>

      {/* <section className="features">
        <div className="feature-item">
          <h2>Your Live Inventory Counts</h2>
          <p>Track your inventory in real-time.</p>
        </div>
        <div className="feature-item">
          <h2>Suggested Ordering</h2>
          <p>Receive smart suggestions for your inventory orders.</p>
        </div>
        <div className="feature-item">
          <h2>Required Inventory</h2>
          <p>Modify your required inventory amounts.</p>
        </div>
        <div className="feature-item">
          <h2>Statistics</h2>
          <p>Get detailed insights and analytics.</p>
        </div>
      </section> */}
    </div>
      }
    </section>
  )
}

export default Home;