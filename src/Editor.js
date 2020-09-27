import {useState,useRef, useEffect} from 'react';
import React from 'react'
import SidebarItem from './SidebarItem';
import Slider from './Slider';

const DEFAULT_OPTIONS = [
    {
      name:"Brightness",
      property:"brightness",
      value:100,
      range:{
        min:10,
        max:200
      },
      unit:"%"
    },{
      name:"Contrast",
      property:"contrast",
      value:100,
      range:{
        min:10,
        max:200
      },
      unit:"%"
    },{
      name:"Saturation",
      property:"saturate",
      value:100,
      range:{
        min:0,
        max:200
      },
      unit:"%"
    },{
      name:"Grayscale",
      property:"grayscale",
      value:0,
      range:{
        min:0,
        max:100
      },
      unit:"%"
    },{
      name:"Sepia",
      property:"sepia",
      value:0,
      range:{
        min:0,
        max:100
      },
      unit:"%"
    },{
      name:"Hue Rotate",
      property:"hue-rotate",
      value:0,
      range:{
        min:0,
        max:360
      },
      unit:"deg"
    },{
      name:"Invert",
      property:"invert",
      value:0,
      range:{
        min:0,
        max:100
      },
      unit:"%"
    },{
      name:"Opacity",
      property:"opacity",
      value:100,
      range:{
        min:10,
        max:100
      },
      unit:"%"
    },{
      name:"Blur",
      property:"blur",
      value:0,
      range:{
        min:0,
        max:20
      },
      unit:"px"
    },
  ]
  
export default function Editor({url,file,fileMode}) {
    
    const [selectedOptionIndex,setSelectedOptionIndex] =useState(0);
    const [options,setOptions] = useState(DEFAULT_OPTIONS);
    const canvasEl = useRef();

    const selectedOption  = options[selectedOptionIndex];

    const handleSliderChange =({target})=>{
        setOptions(prevOptions=>{
          return prevOptions.map((option, index)=>{
            if(index!==selectedOptionIndex) return option
            return {...option,value:target.value}
          })
        })
    }

    const resetImage=()=>{
        setOptions(DEFAULT_OPTIONS);
    }
    const getImageStyle=()=>{
        const filters = options.map(option=>{
            return `${option.property}(${option.value}${option.unit})`
        })
        return {filter:filters.join(' ')}
      }
      useEffect(() => {
        setImageToCanvas(url,file,fileMode);
      }, [url,file,fileMode])

    const setImageToCanvas=(url,file,fileMode)=>{
        let img = new Image();
        let filename='';
        const canvas = canvasEl.current;
        const ctx =  canvas.getContext('2d');
        if(fileMode==='url'){
            filename = Math.floor(Math.random()*10000000)+'';
            img.src=url;
            img.onload=()=>{
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img,0,0, img.width,img.height);
                canvas.removeAttribute('data-caman-id');
            }
        }else{
            filename= file.name;
            const reader = new FileReader();
            reader.readAsDataURL(file)
            reader.addEventListener('load',()=>{
            img.src= reader.result;
            img.onload=()=>{
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img,0,0, img.width,img.height);
                canvas.removeAttribute('data-caman-id');
            }
        })
        }
    }
    return (
        <>
            <div className="main-image-div">
                <canvas id="canvas" className="main-image" ref={canvasEl} style={getImageStyle()}/>
                {/* <img className="main-image" src={`${url}`} alt="edited pic" style={getImageStyle()}/> */}
            </div>
            <div className="sidebar">
                {options.map((option,index)=>{
                    return (
                        <SidebarItem
                            key={index}
                            name={option.name}
                            value={[option.value,option.unit]}
                            handleClick={()=>setSelectedOptionIndex(index)}
                            active={index===selectedOptionIndex}
                            selectedOption={selectedOption}
                            handleSliderChange={handleSliderChange} 
                        />
                    )
                })}
                <button className="sidebar-item" onClick={()=>resetImage()}>Reset</button>
            </div>
            <Slider
                min={selectedOption.range.min}
                max={selectedOption.range.max}
                value={selectedOption.value}
                handleChange={handleSliderChange}
            />
        </>
    )
}
