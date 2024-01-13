/* eslint-disable react/prop-types */
import { useCartContext } from "../CartContext/CartContext"

const ItemCart = ({ product }) => {

    const { removeProduct } = useCartContext();

  return (
    <div className="item-cart-container">
        <img src={product.image} alt={product.name}/>

        <p>{product.name}</p>
        <p>Cantidad: {product.quantity}</p>
        <p>Precio: {product.price}</p>
        <p>Subtotal: {product.quantity * product.price}</p>
        <button className="boton-eliminar-producto" onClick={() => removeProduct(product.id)}>X</button>
        
    </div>
  )
}

export default ItemCart
