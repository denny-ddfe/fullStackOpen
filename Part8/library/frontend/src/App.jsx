import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { Routes, Route, Link } from 'react-router-dom'

const App = () => {

  return (
    <div>
      <div>
				<Link to='/authors' style={{paddingLeft:'10px'}}>authors</Link>
				<Link to='/' style={{paddingLeft:'10px'}}>books</Link>
				<Link to='/newbook' style={{paddingLeft:'10px'}}>add book</Link>
      </div>
			<Routes>
				<Route path="/authors" element={<Authors/>}/>
				<Route path="/" element={<Books/>}/>
				<Route path="/newbook" element={<NewBook/>}/>
			</Routes>
    </div>
  );
};

export default App;
