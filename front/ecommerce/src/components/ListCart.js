import { get } from 'js-cookie';
import React, {useEffect, useState} from 'react';
import ArticolCart from './ArticolCart';

const ListCart = () => {
    const [articols, setArticole] = useState('');
    const [refresh, setRefresh] = useState(0);

    const getContent = () => {
      const items = JSON.parse(localStorage.getItem('items'));
      if(items == null)
        items = '';
      setArticole(items);
    }

    const deleteItem = (id) => {
      for(const i of articols){
          if(i.id === id){
              let index = articols.indexOf(i);
              articols.splice(index, 1);
          }
      }
      localStorage.setItem("items", JSON.stringify(articols));
    }

    const decrease = (id) => {
      for(const i of articols){
        if(i.id === id){
          let index = articols.indexOf(i);
          if(articols[index].count === 1){
            deleteItem(id);
          }
          else
            articols[index].count--;
        }
      }
      localStorage.setItem("items", JSON.stringify(articols));
    }

    const increase = (id) => {
      for(const i of articols){
        if(i.id === id){
          let index = articols.indexOf(i);
          articols[index].count++;
        }
      }
      localStorage.setItem("items", JSON.stringify(articols));
    }

    useEffect(() => {
        getContent();
    }, [refresh]);
    
    return(
    <div className="row justify-content-center">
        {articols != '' && articols != null? articols.map(articol => (
          <div key={articol.id} className="col-xl-6 articolCart">
            <ArticolCart
              id={articol.id}
              tip={articol.tip}
              pret={articol.pret}
              marime={articol.marime}
              productImage={articol.productImage}
              count={articol.count}
            />
          <div className="row justify-content-center">
            <button onClick={() => {deleteItem(articol.id); setRefresh(refresh+1)}} className="btn btn-danger mx-1">Delete</button>
            <button onClick={() => {decrease(articol.id); setRefresh(refresh+1)}} className="btn btn-info mx-1">-</button>
            <button onClick={() => {increase(articol.id); setRefresh(refresh+1)}}className="btn btn-success mx-1">+</button>
          </div>
          </div>
        )):<h3 className="col-12 text-danger text-center">There are no items in your cart</h3>}
    </div>
    );
}

export default ListCart;