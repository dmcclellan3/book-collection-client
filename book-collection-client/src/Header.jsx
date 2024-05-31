import { Link } from "react-router-dom"

function Header() {
  return (
    <div style={{ margin: 10 }}>
      <Link style={{ marginRight: 20 }} to='/'>Home</Link>
      <Link style={{ marginRight: 20 }}to='/login'>Login</Link> 
      <Link to='/books'>Books</Link>
    </div>
  )
}

export default Header

//Create Books Component 
//Look at AuthContext file and replicate for books 
//Look at AuthContextProvider in main and repeat for bookcontext