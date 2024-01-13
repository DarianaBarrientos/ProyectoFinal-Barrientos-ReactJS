import { Link } from "react-router-dom";
import { useCartContext } from "../CartContext/CartContext";
import ItemCart from "../ItemCart/ItemCart";

const Cart = () => {

    const { cart, totalPrice } = useCartContext();

    if (cart.length === 0) {
        return (
            <div className="cartVacio">
                <p>Todavía no hay productos en tu carrito!</p>
                <Link to= '/' className="cartVacio-link">→ Realizar una compra ←</Link>
            </div>
        );
    }

  return (
    <div>
        <p className="cart">Tu carrito:</p>

        {cart.map((product) => ( <ItemCart key={product.id} product={product}/>))}

        <div className="total">
            <p>Total: ${totalPrice()}</p>

            <Link to='/checkout'>{''} <button className="finalizar-compra">Finalizar compra</button></Link>
        </div>    
    </div>
  );
}

export default Cart