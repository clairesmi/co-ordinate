import React from 'react'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import ImageUpload from './ImageUpload'

const animatedComponents = makeAnimated() // needs to be invoked as per documentation

const PlacesForm = ({ data, options, handleChange, handleSubmit, handleCheck, handleMultiSelect }) => (
  <>
    <div className="form-wrapper">
      <div className="form-content">
        <h2 className="create-title">Add to your map</h2>
        <div className="create-form">
          <form onSubmit={handleSubmit}>
            <div className="create-field">
              <input 
                placeholder="Name"
                name="name"
                onChange={handleChange}
                value={data.name}
                required="required"
              />
            </div>
            <div className="create-field">
              <input 
                placeholder="Postcode"
                name="postcode"
                onChange={handleChange}
                value={data.postcode}
                required="required"
              />
            </div>
            <div className="create-field">
              <input 
                placeholder="Description"
                name="description"
                onChange={handleChange}
                value={data.description}
              />
            </div>   
            <div className="image-input">
            Upload an image
              <ImageUpload
                name="image"
                onChange={handleChange}
                id="files"
                placeholder="Upload an image"
                value={data.image}
              />    
            </div>       
            <div className="select-control">
            Select up to three categories
              <Select
                getOptionValue={option => option.id}
                getOptionLabel={option => option.name}
                options={options}
                isMulti
                onChange={handleMultiSelect}
                components={animatedComponents}
              />
            </div>
            <div className="create-field-check">
            I've been here
              <input className="visited-check"
                type="checkbox"
                placeholder="Visited"
                name="visited"
                checked={data.visited}
                onChange={handleCheck}
                value={data.visited}
              />
            </div>
            <button type ="submit" className="create-button">Submit</button>
          </form>
        </div>
      </div>
    </div>
  </>

)

export default PlacesForm