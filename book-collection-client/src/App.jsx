import { useContext, useState } from "react"
import { fetchUser } from "./api"
import { AuthContext } from "./authContext"


// import Books from './Books';
// import Genres from './Genres';
// import Login from './Login';



function App() {

  const { auth } = useContext(AuthContext)
  const [books, setBooks] = useState([]);

  const submit = () => {
    fetchUser({ auth })
  }

  return (
    <div className="p-5">
      <h1>Your Books</h1>
      <ul>
        {books.map(book => (
          <li key={book.id}>{book.title} by {book.author}</li>
        ))}
      </ul>
    </div>
  );
};




export default App
