import React from 'react'
import {useState,useRef} from 'react'

export default function SelectImage({getImage,setFile,setFileMode}) {

    const [url,setUrl]=useState("");
    const fileRef = useRef();

    const getImageFromWeb =()=>{
        getImage(url);
        setFileMode('url');
    }
    const fileSelect = ()=>{
        setFile(fileRef.current.files[0]);
        setFileMode('device');
    }
    
    return (
        <div className="getImage">
            <div className="form-container">
                <span className="form">
                    <h3>Get image using link <span role="img" aria-label="link">🔗</span></h3>
                    <input type="text" placeholder="Image URL" className="form__field" value={url} onChange={(e)=>setUrl(e.target.value)}/>
                    <button type="submit" className="btn btn--primary btn--inside uppercase" onClick={()=>getImageFromWeb()}>Get Image</button>
                </span>
                <br/>
                <span className="form">
                    <h3>Get image from device <span role="img" aria-label="phone">📱/💻</span></h3>
                    <input type="file" placeholder="select Image" ref={fileRef} className="form__field__file" id="upload-file" onChange={()=>fileSelect()}/>
                </span>
            </div>
        </div>
    )
}
