import React, { useState,useEffect } from 'react'

const CustomInput = ({ type, placeholder, className, callback }) => {

  const [input, setInput] = useState("")
  const handleChange = async e => {
     setInput(e.target.value)
  }

    useEffect(() => {
      callback(input)
      console.log(input)
    }, [input])


    return (
      <input type={type} placeholder={placeholder} className={className} value={input} autoComplete="off" onChange={(e) => handleChange(e)} />
    )
  } 

export default CustomInput