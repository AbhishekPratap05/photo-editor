import React,{useState} from 'react';
import Slider from './Slider';
import './App.css';
import SidebarItem from './SidebarItem';
import GetImage from './GetImage';

const DEFAULT_OPTIONS = [
  {
    name:"Brightness",
    property:"brightness",
    value:100,
    range:{
      min:0,
      max:200
    },
    unit:"%"
  },{
    name:"Contrast",
    property:"contrast",
    value:100,
    range:{
      min:0,
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
function App() {
  const [imageAvailable,setImageAvailable] = useState(false);
  const [url,setUrl]=useState("");
  const [selectedOptionIndex,setSelectedOptionIndex] =useState(0);
  const [options,setOptions] = useState(DEFAULT_OPTIONS);
  const selectedOption  = options[selectedOptionIndex];
  const getImage =(url)=>{
    setUrl(url);
    url!==""&&setImageAvailable(true);
  }
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
  return (
    !imageAvailable ?
      
      <div className="getImage">
      <GetImage
        getImage={getImage}
      />
      </div> 
      :
      <div className="container">
          <div className="main-image-div">
          <img className="main-image" src={`${url}`} alt="edited pic" style={getImageStyle()}/>
          </div>
          <div className="sidebar">
          {options.map((option,index)=>{
            return (<SidebarItem
            key={index}
            name={option.name}
            value={[option.value,option.unit]}
            handleClick={()=>setSelectedOptionIndex(index)}
            active={index===selectedOptionIndex}
            selectedOption={selectedOption}
            handleSliderChange={handleSliderChange}
            >
            </SidebarItem>)
          })}
          <button className="sidebar-item" onClick={()=>resetImage()}>Reset</button>
          </div>
          <Slider
            min={selectedOption.range.min}
            max={selectedOption.range.max}
            value={selectedOption.value}
            handleChange={handleSliderChange}
          />
        </div>
    
  );
}

export default App;
