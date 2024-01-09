import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getFirestore, collection, getDocs, where, query } from 'firebase/firestore';
import ItemList from '../ItemList/ItemList';

// eslint-disable-next-line react/prop-types
const ItemListContainer = () => {

  const [item, setItem] = useState([]);
  const {id} = useParams();

  useEffect(()=> {
    const queryDb = getFirestore();
    const queryCollection = collection(queryDb, 'products');

    if(id){
      const queryFilter = query(queryCollection, where('category', '==', id));
      getDocs(queryFilter).then((data)=>
      setItem(data.docs.map((p)=> ({id: p.id, ...p.data()})))
      );
    } else {
      getDocs(queryCollection).then((data)=>
      setItem(data.docs.map((p)=> ({id: p.id, ...p.data()})))
      );
    }

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
