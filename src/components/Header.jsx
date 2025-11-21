import { Link } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import { User } from './User.jsx'
import { useAuth } from '../contexts/AuthContext.jsx'

export function Header() {
  const [token, setToken] = useAuth()

  if (token) {
    const { sub } = jwtDecode(token)
    return (
      <div>
        <h1>CS618 Cookbook!</h1>
        <h3>The site with the best kept recipes</h3>
        Logged in as <User id={sub} />
        <br />
        <button onClick={() => setToken(null)}>Logout</button>
      </div>
    )
  }

  return (
    <div>
      <h1>CS618 Cookbook!</h1>
      <h3>The site with the best kept recipes</h3>
      <Link to='/login'>Log In</Link> | <Link to='/signup'>SignUp</Link>
    </div>
  )
}
