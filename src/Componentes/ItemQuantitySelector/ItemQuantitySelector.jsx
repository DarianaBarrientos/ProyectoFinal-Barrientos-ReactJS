/* eslint-disable react/prop-types */
import { useEffect, useState} from 'react';

const ItemQuantitySelector = ({stock, initial, onAdd}) => {

    const [count, setCount] = useState(parseInt(initial));
    const decrease = () => {
        setCount(count - 1);
    };
    const increase = () => {
        setCount(count + 1);
    };

    useEffect(() => {
        setCount(parseInt(initial));
    }, [initial]);

  return (
    <div>
        <button className='botonContador' disabled={count <= 1} onClick={decrease}>-</button>
        <span>{count}</span>
        <button className='botonContador' disabled={count >= stock} onClick={increase}>+</button>

        <div>
            <button className='boton-agregar-compra' disabled={stock <= 0} onClick={() => onAdd(count)}>Agregar compra</button>
        </div>

    </div>
  );
}

export default ItemQuantitySelector
