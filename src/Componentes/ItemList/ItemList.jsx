/* eslint-disable react/prop-types */
import Item from '../Item/Item'

const ItemList = ({item}) => {
  return (
    <div className="item-container-home" >
      {item.map(item =>
        <div key={item.id} >
            <Item item={item}/>
        </div>
        )}
    </div>
  )
}

export default ItemList
