import React from 'react'
import './AddCrop.css'

const AddCrop = ({ close }) => {
  return (
    <div className="content floating">
        <form className="form">
          <div className="flex-column">
            <h2 className='card-title'>Add Crop</h2>
          </div>
              <div className="flex-column">
                <label>Crop Name</label>
              </div>
              <div className="inputForm">
                <input type="text" className="input" placeholder="Enter your Name" />
              </div>
              <div className="flex-column">
                <label>Acres</label>
              </div>
              <div className="inputForm">
                <input type="number" className="input" placeholder="Enter your Name" />
              </div>
          <button className="button-submit">Add Crop</button>
          <button onClick={close} className="light-submit">Cancel</button>
        </form>
      </div>
  )
}

export default AddCrop