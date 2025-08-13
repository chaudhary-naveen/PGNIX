import React from 'react'
import TopImageContainer from './TopImageContainer'
import TopviewDesc from './TopviewDesc'

const TopView = () => {
  return (
    <div className='container'>
        <div className="row" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
            {/* image section */}
            <div className="col-8">
              <TopImageContainer/>
            </div>
            {/* product description */}
            <div className="col-4">
                <TopviewDesc/>
            </div>
        </div>

    </div>
  )
}

export default TopView