import React from 'react'
import './YeildTable.css'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'

const YeildTable = () => {
  return (
    <>
      <Navbar />
      <div className="yeild">
        <h1>Wheat</h1>
        <div className="data">Created Date: 10/01/2021</div>
        <table className="table">
          <tr>
            <div  className='newentry'>
              + Add New Entry
            </div>
          </tr>
          <tr className='data'>
            <div className="sr">1 <div className="typename">Sowing</div></div>
            <div className="price">30000 <button>view</button></div>
          </tr>
          <tr className='data'>
            <div className="sr">1 <div className="typename">Sowing</div></div>
            <div className="price">30000 <button>view</button></div>
          </tr>
          <tr className='data'>
            <div className="sr">1 <div className="typename">Sowing</div></div>
            <div className="price">30000 <button>view</button></div>
          </tr>
          <tr className='data'>
            <div className="sr">1 <div className="typename">Sowing</div></div>
            <div className="price">30000 <button>view</button></div>
          </tr>
          <tr className='data'>
            <div className="sr">1 <div className="typename">Sowing</div></div>
            <div className="price">30000 <button>view</button></div>
          </tr>

        </table>
      </div>
      <Footer />
    </>
  )
}

export default YeildTable