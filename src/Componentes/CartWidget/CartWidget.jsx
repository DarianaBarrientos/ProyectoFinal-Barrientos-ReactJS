import carrito from '../../assets/carrito.png'

const CartWidget = () => {
  return (
    <div className='carrito'>
      <a href=""><img src={carrito} alt="carrito" /></a>
      <p>(0)</p>
    </div>
  )
}

export default CartWidget
