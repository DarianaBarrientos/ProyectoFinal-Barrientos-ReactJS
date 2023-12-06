import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import productos from '../Json/productos.json'
import ItemList from '../ItemList/ItemList';

// eslint-disable-next-line react/prop-types
const ItemListContainer = () => {

  const [item, setItem] = useState([]);
  const {id} = useParams();

  useEffect(()=> {
    const fetchData = async()=>{
      try{
        const data = await new Promise ((resolve)=>{
          setTimeout(()=>{
            resolve(id ? productos.filter(item => item.category === id) : productos)
          }, 1500);
        });
        setItem(data);
      }catch(error){
        console.log('error:', error);
      }
    };
    fetchData();
  }, [id]) 

  return (
    <div>
      <h1 className='bienvenida'>Bienvenidos!</h1>
      <div>
        
          <ItemList item={item}/>
        
      </div>
    </div>
  )
}

export default ItemListContainer
