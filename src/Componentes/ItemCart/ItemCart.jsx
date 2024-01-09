/* eslint-disable react/prop-types */
import { useCartContext } from "../CartContext/CartContext"

const ItemCart = ({ product }) => {

    const { removeProduct } = useCartContext();

  return (
    <div>
        <img src={product.image} alt={product.name}/>

        <div>
            <p>{product.name}</p>
            <p>Cantidad: {product.quantity}</p>
            <p>Precio: {product.price}</p>
            <p>Subtotal: {product.quantity * product.price}</p>
            <button onClick={() => removeProduct(product.id)}>Eliminar pedido</button>
        </div>
    </div>
  )
}

export default ItemCart
