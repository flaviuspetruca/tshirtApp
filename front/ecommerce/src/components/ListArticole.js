import React, {useEffect, useState} from 'react';
import Articol from './Articol';


const ListArticole = (isLogged) => {
    const [articols, setArticole] = useState([]);
  /* useEffect(() => {
    
  }) */
    const getContent = async () => {
      const resp = await fetch('http://localhost:3000/api/collection');
      const data = await resp.json();
      setArticole(data.articole);
    }

    useEffect(() => {
      getContent();
    }, []);

    return(
    <div className="container-fluid">
      <form>
      <div className="input-group">
        <input type="text" className="form-control" placeholder="Search"/>
        <div className="input-group-append">
          <button className="btn btn-secondary" type="button">
            <i className="fa fa-search">🔍</i>
          </button>
        </div>
      </div>
      </form>
        {articols.map(articol => (
          <Articol
            id={articol._id}
            key={articol._id}
            tip={articol.tip}
            pret={articol.pret}
            marime={articol.marime}
            productImage={articol.productImage}
            isLogged={isLogged}
          />
        ))}
    </div>
    );
}

export default ListArticole;