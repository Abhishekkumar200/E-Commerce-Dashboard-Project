import './App.css';
import Nav from './components/nav'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './components/footer';
import SignUp from './components/signUp';
import PrivateComponent from './components/privateComp';
import LogIn from './components/Login';
import Addproduct from './components/AddProduct';
import ProductList from './components/productList';
import Updateproduct from './components/updateProduct';
import UserProfile from './components/userProfile';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Nav />
      <Routes>

        <Route element ={<PrivateComponent />} >
        <Route path='/' element={<ProductList />} />
        <Route path='/add' element={<Addproduct />} />
        <Route path='/update/:id' element={<Updateproduct />} />
        <Route path='/logout' element={<h1>Logout Component</h1>} />
        <Route path='/profile' element={<UserProfile />} />
        </Route>
        
        <Route path = '/signup' element={<SignUp />} />
        <Route path='/login' element={<LogIn />} />
      </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
