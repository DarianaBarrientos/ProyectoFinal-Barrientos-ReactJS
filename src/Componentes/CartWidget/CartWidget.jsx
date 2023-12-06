import carrito from '../../assets/carrito.png'
import { Link } from 'react-router-dom'

const CartWidget = () => {
  return (
    <div className='carrito'>
      <Link to='/cart'><img src={carrito} alt="carrito" /></Link>
      <p>(0)</p>
    </div>
  )
}

export default CartWidget
