import React, { useState } from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom'
import './App.css';
import Cookie from 'js-cookie';
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import { useSelector } from 'react-redux';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import CreateProductScreen from './screens/CreateProductScreen';

function App() {
  
    const selector = (state) => {
    if(state.userSignin.userInfo){
      return state.userSignin;
    } else {
      return state.userRegister;
    }
  };
  const userSignin = useSelector(state => selector(state));
  const {userInfo} = userSignin;

  const openMenu = () => { document.querySelector(".sidebar").classList.add("open");}
  const closeMenu = () => { document.querySelector(".sidebar").classList.remove("open");}

  const [userMenuState, setUserMenuState] = useState(false);
  const handleNameClick = () => {
    setUserMenuState(!userMenuState);
  };

  const logOutClick = () => {
    Cookie.remove("userInfo");
    window.location.reload(false);
  }

  return (
  <BrowserRouter>
    <div className="grid-container">
      <header className="header">
        <div className="brand">
          <button onClick={openMenu}>
            &#9776;
          </button>
          <Link to="/" >amazona computer</Link>
        </div>
        <div className="header-links">
          {
            userInfo ? <a onClick={handleNameClick}>{userInfo.data.name}</a> :
            <Link to="/signin">Sign In</Link>
          }
        </div>
      </header>
      {userMenuState && (
            <div className="dropdown">
              <ul>
                <li><Link to="/profile">Profile</Link></li>
                <li><a onClick={logOutClick}>Log Out</a></li>
              </ul>
            </div>
          )
      }
      <aside className="sidebar">
        <h3>Shopping Categories</h3>
        <button className="sidebar-close-button" onClick={closeMenu}>x</button>
        <ul>
          <li>
            <a href="index.html">Pants</a>
          </li>
          <li>
            <a href="index.html">Shirts</a>
          </li>
        </ul>
      </aside>
      <main className="main">
        <div className="content">
          <Route path="/profile" component={ProfileScreen} />
          <Route path="/CreateProduct" component={CreateProductScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/signin" component={SigninScreen} />
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/" exact={true} component={HomeScreen} />
          
        </div>
      </main>
      <footer className="footer">
        All right reserved.
      </footer>
    </div>
  </BrowserRouter>
  );
}

export default App;
