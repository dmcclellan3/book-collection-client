import { Link } from "react-router-dom"

function Header() {
  return (
    <div style={{ margin: 10 }}>
      <Link style={{ marginRight: 20 }} to='/'>Home</Link>
      <Link to='/login'>Login</Link>
    </div>
  )
}

export default Header

//Create Books Component 
//Look at AuthContext file and replicate for books 
//Look at AuthoContextProvider in main and repeat for bookcontext