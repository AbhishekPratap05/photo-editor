import React,{useState} from 'react';
import './App.css';
import Heading from './Heading';
import SelectImage from './SelectImage';
import Editor from './Editor';


const SUPPORTED_FILE = ["image/png","image/jpeg","image/jpg"];
function App() {
  const [imageAvailable,setImageAvailable] = useState(false);
  const [url,setUrl]=useState("");
  const [file,setFile]=useState();
  const [fileMode,setFileMode]=useState('url');

  
  const getImage =(urlReceived)=>{
    const regex= /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/gm
    if(regex.test(urlReceived)){
      setUrl(urlReceived);
      setImageAvailable(true);
    } else alert("Invalid Url");
  }

  const setImageFromDevice=(fileReceive)=>{
    console.log(fileReceive)
    if(fileReceive && SUPPORTED_FILE.includes(fileReceive.type)){
      setFile(fileReceive);
    }else if(!fileReceive){
      setFile();
      return;
    }else if(!SUPPORTED_FILE.includes(fileReceive.type)){
      alert("Invalid image type only supports png and jpg");
      setFile();
      return;
    }
    setImageAvailable(true);
  }
  const setFileSelectedMode =(mode)=>{
    setFileMode(mode)
  }

  const clickHome=() => {
    setImageAvailable(false);
    url && setUrl('');
    file && setFile();
  }
  
  return (
    <div className="container">
        <Heading
          click={clickHome}
          imageAvailable={imageAvailable}
        />
        {!imageAvailable ?
        <SelectImage
          getImage={getImage}
          setFile={setImageFromDevice}
          setFileMode={setFileSelectedMode}
        />
        :
        <Editor
          url={url}
          file={file}
          fileMode={fileMode}
        />
        }
    </div>
    
  );
}

export default App;
