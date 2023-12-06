import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import productos from '../Json/productos.json'
import ItemDetail from '../ItemDetail/ItemDetail';

const ItemDetailContainer = () => {
    const [item, setItem] = useState([]);
    const {id} = useParams();
  
    useEffect(()=> {
     const promesa = new Promise ((resolve)=>{
            setTimeout(()=>{
              resolve(productos.find(item => item.id === parseInt(id)))
            }, 1500);
          });
          promesa.then((data)=>{
            setItem(data)
          })
        }, [id]);
  
    return (
      <div>
        <div className='item-detail-container'>
          <ItemDetail item={item}/>
        </div>
      </div>
    )
}

export default ItemDetailContainer
