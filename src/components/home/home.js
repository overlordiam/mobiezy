import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
      <div>
        <div>
            <Link to="/sign-up">
                <button>Sign-up</button>
            </Link>
        </div>
        <Link to="/login">
                <button>Login</button>
        </Link>
    </div>
  )
}

export default Home