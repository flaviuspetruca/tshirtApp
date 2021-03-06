import React from 'react';
import { Redirect } from 'react-router-dom';
import ListCart from './ListCart';

const Cart = (isLogged) => {
    
    return(isLogged.isLogged ? 
        <div className="container-fluid">
            <div className="row justify-content-center">
                <h1>Items in your cart</h1>
            </div>
            <div>
                <div className="justify-content-center">
                    <ListCart/>
                </div>
            </div>
        </div>
        : 
        <div className="container-fluid">
            <h1 className="text-danger text-center">You are not logged in!</h1>
        </div>
    );
}

export default Cart;