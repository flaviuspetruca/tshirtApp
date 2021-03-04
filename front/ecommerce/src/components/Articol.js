import React from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom'

Modal.setAppElement('#root');
const Articol = ({id, tip, pret, marime, productImage}) => {
    
    const add = () => {
        let items = JSON.parse(localStorage.getItem("items") || "[]");
        const item = {id, tip, pret, marime, productImage};
        if(items.length !== 0){
            let ok = 0;
            for(const i of items){
                if(i.id === item.id){
                    i.count++;
                    ok = 1;
                }
            }
            if(ok === 0){
                item.count = 1;
                items.push(item);
            }
        }
        else{
            item.count = 1;
            items.push(item);
        }
        localStorage.setItem("items", JSON.stringify(items));
    }
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
      var subtitle;
        const [modalIsOpen,setIsOpen] = React.useState(false);
        function openModal() {
            setIsOpen(true);
        }
        
        function closeModal(){
            setIsOpen(false);
        }
      
    return(

        <div className="container">
            <div>
        <Modal 
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
 
          <h2 className="text-center">Item added to cart</h2>
          <button onClick={closeModal} className="btn btn-warning" >close</button>
          <Link to={"/cart"}><button className="btn btn-primary">Go to cart</button></Link>
        </Modal>
      </div>
            <div className="row articol">
            <div className="col-xl-4 justify-content-center info">
                <h1>{tip}</h1>
                <p>{pret} LEI</p>
                <p>{marime}</p>
                <img src={productImage} id="imagine"/>
                <button onClick={function(event){ add(); openModal()}} type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal" id="artCart">
                Add to cart&nbsp;
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                </svg>
                </button>
                
            </div>
            </div>
        </div>
    )
}

export default Articol;