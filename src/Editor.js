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
  
export default function Editor({url,file,fileMode,downloadFlag,setDownload}) {
    
    const [selectedOptionIndex,setSelectedOptionIndex] =useState(0);
    const [options,setOptions] = useState(DEFAULT_OPTIONS);
    const [filename,setFileName] = useState('');
    const [imgProperties,setImaProperties] = useState({width:0,height:0})
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
      const setImageToCanvas=()=>{
          fileMode === 'url' ? urlImageToCanvas() : loadedImageToCanvas();
      }
      useEffect(setImageToCanvas, [url,file,fileMode])



    const loadedImageToCanvas =()=>{
        const canvas = canvasEl.current;
        const ctx =  canvas.getContext('2d');
        let img = new Image();
        setFileName(file.name);
        const reader = new FileReader();
        reader.readAsDataURL(file)
        reader.addEventListener('load',()=>{
            img.src= reader.result;
            img.onload=()=>{
                canvas.width = img.width;
                canvas.height = img.height;
                setImaProperties({width:img.width,height:img.height});
                ctx.drawImage(img,0,0, img.width,img.height);
                canvas.removeAttribute('data-caman-id');
            }
        },false)
    }

    const urlImageToCanvas =()=>{
        const canvas = canvasEl.current;
        const ctx =  canvas.getContext('2d');
        let img = new Image();
        setFileName(Math.floor(Math.random()*10000000).toString());
        img.onload=()=>{
            canvas.width = img.width;
            canvas.height = img.height;
            setImaProperties({width:img.width,height:img.height});
            ctx.drawImage(img,0,0, img.width,img.height);
            canvas.removeAttribute('data-caman-id');
        };
        img.crossOrigin = 'Anonymous';
        img.src=url;
    }
    
    const download=()=>{
        const downloadCanvas = document.createElement('canvas');
        const ctx = downloadCanvas.getContext('2d');
        downloadCanvas.width = imgProperties.width;
        downloadCanvas.height = imgProperties.height;
        const filterToBeApplied = getComputedStyle(canvasEl.current).filter;
        ctx.filter = filterToBeApplied;
        ctx.drawImage(canvasEl.current,0,0);
        let e;
        const link = document.createElement('a')
        let fNameWithoutExt ='';
        const fNameArry = filename.split('.');
        let fileExt="jpeg"
        if(fileMode ==='url'){
            fNameWithoutExt=filename;
        }else{
            fNameWithoutExt = filename.slice(0,-fileExt.length-1);
            fileExt=fNameArry[fNameArry.length -1]
        }
        const fNameWithExt = fNameWithoutExt+'-edited.'+fileExt;
        link.download=fNameWithExt;
        fileExt === 'png' ?
        link.href=downloadCanvas.toDataURL('image/png',0.97)
        :
        link.href=downloadCanvas.toDataURL('image/jpeg',0.97);

        e = new MouseEvent('click')
        link.dispatchEvent(e);
        setDownload(false)
      }
    return (
        <>
            <div className="main-image-div">
                <canvas id="canvas" className="main-image" ref={canvasEl} style={getImageStyle()}/>
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
            {downloadFlag && download()}
        </>
    )
}
