import React, { useEffect, useState } from 'react'
import CustomButton from '../Custom/customButton/customButton'
import './upload.css'
import Select from "react-select";
import {State, City} from "country-state-city";


function Upload() {

const [sizeError, setSizeError] = useState("")
const [images, setImages] = useState([])
const [imageUrls, setImageUrls] = useState([])
const [displayImage, setDisplayImage] = useState(true)
const [tryAgain, setTryAgain] = useState(false)
const [state, setState] = useState("")
const [operator, setOperator] = useState("")
const [city, setCity] = useState("")

const operatorsData = [
  {
    value: "A",
    label: "A"
  }, 
  {
    value: "B",
    label: "B"
  }, 
  {
    value: "B",
    label: "B"
  }

]

  const updatedStates = (countryId) =>
    State
      .getStatesOfCountry(countryId)
      .map((state) => ({ label: state.name, value: state.id, ...state }));

      const updatedCities = (countryId, stateId) =>
      City
        .getCitiesOfState(countryId, stateId)
        .map((city) => ({ label: city.name, value: city.id, ...city }));
  useEffect(() => {}, [state]);

  

useEffect(() => {
    if (images.length < 1) return;
    setDisplayImage(true)
    const newImageUrls = []
    images.forEach(image => newImageUrls.push(URL.createObjectURL(image)))
    setImageUrls(newImageUrls)
    console.log(city, operator, state)
}, [images])


const onImageChange = (e) => {
    setImages([...e.target.files])
    
}

const onImageLoad = ({ target: img}) => {
    const height = img.naturalHeight;
    const width = img.naturalWidth;
    if ((height > 224) || (height < 100) || (width > 224) || (width < 100)) {
        setDisplayImage(false)
        setTryAgain(true)
        setSizeError("Image size is too large. Please upload another picture !!")
        images.pop()
    }
}

        return (
          <html>
          <head>
              <meta charset="utf-8" />
              <meta http-equiv="X-UA-Compatible"
                    content="IE=edge" />
              <meta name="description"
                    content="" />
              <meta name="viewport"
                    content="width=device-width,
                             initial-scale=1" />
          </head>
          <body>
              <div class="gfg-div">
                  <div class="contain">
                <div class="box">
                    <div class="file_upload">
                        <h4 class="upload_banner">Upload Banner:</h4> 
                        <input class="upload_input" type="file" multiple accept="image/*" onChange={onImageChange} />
                    </div>
                    
                    { imageUrls.map(imageSrc => <img src={displayImage ? imageSrc : 'undefined'} onLoad={onImageLoad} />) }
                    
                    <div onClick={() => window.location.reload(false)} class="try_again">
                        
                        <p class="errorMessage">{sizeError}</p>
                        <div class="errorButton" onClick={() => window.location.reload(false)}>
                          { tryAgain ? 
                                  <CustomButton className="form_btn_2">TRY AGAIN</CustomButton> : 
                                                  <></>   }
                        </div>
                        
                    
                </div>

        <hr style={{"height":"6px", "backgroundColor":"black", "marginTop": "5%"}}></hr>

              
    <div class="Select">
      <div class="state">
      <Select
          id="state"
          name="state"
          placeholder="State....."
          options={updatedStates("IN")}
          onChange={(value) => {
            setState(value)
          }}
        />
      </div>
      <div className="city">
        <Select
          id="city"
          name="city"
          placeholder="City....."
          options={updatedCities("IN", state.isoCode)}
          onChange={(value) => { 
            setCity(value)
          }}
        />
      </div>  
      <div className="operators">
        <Select
          id="operator"
          name="operator"
          placeholder="Operator....."
          options={operatorsData}
          onChange={(v) => { 
             setOperator(v)
          }}
        />
      </div>
        
      <div onClick={() => window.location.reload(false)}>
        {tryAgain ? <></> :
        <CustomButton className="form_btn_2">SUBMIT</CustomButton>
        }
      </div>

      
                                            
      </div>
        
    </div>
    
            </div>
              </div>
          </body>
      </html>
        )
       

    }


export default Upload

