/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"

const Item = ({item}) => {
  return (
    <Link to = {'/item/' + item.id} className="link-decoration">
    
      <div className="item-decoration-home">
        <img src={item.image} alt={item.name} />
        <p>{item.name}</p>
        <small>Stock disponible: {item.stock}</small>
      </div>
    
    </Link>
  )
}

export default Item
