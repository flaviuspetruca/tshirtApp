import React from 'react';
import ListCart from './ListCart';

const Cart = () => {
    return(
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
    );
}

export default Cart;