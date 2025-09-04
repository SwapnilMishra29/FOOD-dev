import React from 'react'
import "./home.css"
import { Suspense } from 'react'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import { useState } from 'react'
import AppDownload from '../../components/AppDownload/appDownload'


// Lazy load FoodDisplay
const FoodDisplay = React.lazy(()=>
    import('../../components/FoodDisplay/FoodDisplay')
  )

 
// Skeleton loader component
const FoodSkeleton = () => {
  return (
    <div className="food-skeletons">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="skeleton-card"></div>
      ))}
    </div>
  )
}


const Home = () => {

  
    
  const [category,setCategory] = useState("All");

  return (
    <div>
      <Header />
      <ExploreMenu category={category} setCategory={setCategory}/>

       {/* Wrap FoodDisplay inside Suspense */}
      <Suspense fallback={<FoodSkeleton/>}>
           <FoodDisplay category={category}/>
      </Suspense>
     
      <AppDownload />
    </div>
  )
}

export default Home
