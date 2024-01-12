import carrito from '../../assets/img/carrito.png';
import { Link } from 'react-router-dom'
import { useCartContext } from '../CartContext/CartContext';

const CartWidget = () => {
  const {totalProducts, cart} = useCartContext();
  return (
    <div className='carrito'>
      <Link to='/cart'><img src={carrito} alt="carrito" /></Link>
      <p>{totalProducts() || cart}</p>
    </div>
  )
}

export default CartWidget
