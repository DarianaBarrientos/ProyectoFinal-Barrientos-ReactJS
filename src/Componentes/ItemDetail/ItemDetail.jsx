/* eslint-disable react/prop-types */

const ItemDetail = ({item}) => {
  return (
    <div>
      <div className="item-detail-style">
        <img src={item.image} alt={item.name} />
        <h3>{item.name}</h3>
        <p>{item.description}</p>
        <h6>${item.price}</h6>
        <small>stock: {item.stock}</small>
      </div>
    </div>
  )
}

export default ItemDetail
