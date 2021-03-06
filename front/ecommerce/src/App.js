import React, {useEffect, useState} from 'react';
import './App.css';
import ListArticole from './components/ListArticole';
import Cart from './components/Cart';
import SignIn from './components/SignIn';
import Register from './components/Register';
import Modal from 'react-modal';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';

const App = () => {

  const [isLogged, setIsLogged] = useState(false);
  const [refresh, setRefresh]  = useState(0);

  const validation = async() =>{
    const token = localStorage.getItem('token');
    if(token){
      const data = {token: token}
      const req = await fetch('http://localhost:3000/api/validation', {
        method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
        body: JSON.stringify(data)
      })
      if(req.status == 200){
        setIsLogged(true);
        return;
      }
      else{
        setIsLogged(false);
        return;
      }
    }
    else{
      setIsLogged(false);
      return;
    }
    }

    const logOut = () => {
      setIsLogged(false);
      localStorage.removeItem('token');
      setRefresh(refresh+1);
      closeModal();
    }

    useEffect(() => {
      validation()
    },[refresh]);

    const customStyles = {
      content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
        overflow              : 'hidden',
      }
    };
      const [modalIsOpen,setIsOpen] = React.useState(false);
      function openModal() {
          setIsOpen(true);
      }
      
      function closeModal(){
          setIsOpen(false);
      }

    return(
      <Router>
        <Modal 
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
            <div>
                <h2 className="text-center">Are you sure you want to log out?</h2>
                <button onClick={closeModal} className="btn btn-warning">Cancel</button>
                <button onClick={logOut} className="btn btn-primary">Log Out</button>
            </div>
          </Modal>
        <div className="App">
        <div className="container-fluid">
        <div className="row navbar">
          <div className="col-md-4">
              <Link to={"/"}><img src="logo.png" id="logo"/></Link>
          </div>
          <div className="col-md-8">
            { !isLogged ? <Link to={"/signin"}><button className="btn btn-light" id="signin">Sign in</button></Link>:
            <button onClick={openModal} className="btn btn-light" id="signin">Sign out</button>}
            <Link to={"/cart"}><button type="button" className="btn btn-light mr-10" id="signin">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
                  <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"></path>
                  </svg>
              </button>
            </Link>
          </div>
        </div>
      </div>
          <Switch>
          <Route path="/" exact component={() => <ListArticole isLogged={isLogged}/>}/>
          <Route path="/cart" exact component={() => <Cart isLogged={isLogged}/>}/>
          <Route path="/signin" exact component={() => <SignIn isLogged={isLogged}/>}/>
          <Route path="/register" exact component={() => <Register isLogged={isLogged}/>}/>
          </Switch>
        </div>
      </Router>
    );
}


export default App;