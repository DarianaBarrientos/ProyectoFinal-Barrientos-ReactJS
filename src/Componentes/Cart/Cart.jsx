import { Link } from "react-router-dom";
import { useCartContext } from "../CartContext/CartContext";
import ItemCart from "../ItemCart/ItemCart";

const Cart = () => {

    const { cart, totalPrice } = useCartContext();

    if (cart.length === 0) {
        return (
            <div>
                <p>Todavía no hay productos en tu carrito</p>
                <Link to= '/'>Hacer una compra</Link>
            </div>
        );
    }

  return (
    <div>
        {cart.map((product) => ( <ItemCart key={product.id} product={product}/>))};

        <p>Total: ${totalPrice()}</p>

        <Link to='/checkout'>{''} <button>Finalizar compra</button></Link>
    </div>
  );
}

export default Cart
