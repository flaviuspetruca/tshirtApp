import React, {useEffect} from 'react';

const ArticolCart = ({id, tip, pret, marime, productImage, count}) => {

    return(
        <div className="container">
            <div className="col-sm-4 justify-content-center text-center">
                <h1>{tip}</h1>
                <p>{pret} LEI</p>
                <p>{marime}</p>
                <img src={productImage} id="imagine"/>
                <span className="badge badge-pill badge-secondary">Numar articole: {count}</span>
            </div>
        </div>
    )
}

export default ArticolCart;