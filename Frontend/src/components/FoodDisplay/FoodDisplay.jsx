import React, { useContext } from 'react'
import "./FoodDisplay.css"
import { StoreContext } from '../../Context/StoreContext'
import Fooditem from '../Fooditem/Fooditem'

const FoodDisplay = ({category}) => {

  const {food_list} = useContext(StoreContext)

    // if food_list is not loaded yet, show loader
  if (!food_list || food_list.length === 0) {
    return (
      <div className="food-display" id="food-display">
        <h2>Top dishes near you</h2>
        <div className="food-display-list">
          {/* show skeletons or spinner */}
          <div className="skeleton-card"></div>
          <div className="skeleton-card"></div>
          <div className="skeleton-card"></div>
          <div className="skeleton-card"></div>
          <div className="skeleton-card"></div>
        </div>
      </div>
    )
  }


  return (
    <div className='food-display' id='food-display'>
        <h2>Top dishes near you</h2>
        <div className="food-display-list">
            {food_list.map((item,index)=>{
               if(category==="All" || category===item.category){
                return <Fooditem 
                key={index} 
                id={item._id}
                name={item.name}
                description = {item.description}
                price={item.price}
                image={item.image}
                />

               }
                
            })}
        </div>
      
    </div>
  )
}

export default FoodDisplay
