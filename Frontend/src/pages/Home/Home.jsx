import React from 'react'
import "./home.css"
import { Suspense } from 'react'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import { useState } from 'react'
import AppDownload from '../../components/AppDownload/appDownload'



 
// Skeleton loader component


const Home = () => {

    // Lazy load FoodDisplay
const FoodDisplay = React.lazy(()=>
    import('../../components/FoodDisplay/FoodDisplay')
  )


  
    
  const [category,setCategory] = useState("All");

  return (
    <div>
      <Header />
      <ExploreMenu category={category} setCategory={setCategory}/>

       {/* Wrap FoodDisplay inside Suspense */}
     {/* Wrap FoodDisplay inside Suspense */}
      <Suspense fallback={<p>Loading foods....</p>}>
        <FoodDisplay category={category} />
      </Suspense>
     
      <AppDownload />
    </div>
  )
}

export default Home
