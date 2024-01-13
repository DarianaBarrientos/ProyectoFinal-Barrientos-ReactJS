/* eslint-disable react/prop-types */

import { Link } from "react-router-dom"
import ItemQuantitySelector from "../ItemQuantitySelector/ItemQuantitySelector"
import { useState } from "react"
import { useCartContext } from "../CartContext/CartContext";

const ItemDetail = ({item}) => {

  const [goToCart, setGoToCart] = useState(false);
  const {addProduct} = useCartContext();
  const onAdd = (quantity) => {
    setGoToCart(true);
    addProduct(item, quantity);
  }

  return (
    <div>
      <div className="item-detail-style">
        <img src={item.image} alt={item.name} />
        <h3>{item.name}</h3>
        <p>{item.description}</p>
        <h6>${item.price}</h6>
        <small>stock: {item.stock}</small>
      </div>

      <div className="detail-redirecciones">
        {goToCart ? <Link to='/cart' className="detail-terminar-compra">Terminar compra →</Link> : <ItemQuantitySelector stock={item.stock} initial={1} onAdd={onAdd}/>} <br />
        {goToCart && <Link to='/' className="detail-seguir-compra">← Ver más productos</Link>}
      </div>
    </div>
  )
}

export default ItemDetail
