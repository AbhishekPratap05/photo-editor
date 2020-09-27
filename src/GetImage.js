import React, { useState,useRef } from 'react'

export default function GetImage({getImage,setFile}) {
    const [url,setUrl]=useState("");
    const fileRef = useRef();
    const fileSelect = ()=>{
        setFile(fileRef.current.files[0]);
    }
    return (
        <div className="form-container">
        <span className="form">
            <h3>Get image using link <span role="img" aria-label="link">🔗</span></h3>
            <input type="text" placeholder="Image URL" className="form__field" value={url} onChange={(e)=>setUrl(e.target.value)}/>
            <button type="submit" className="btn btn--primary btn--inside uppercase" onClick={()=>getImage(url)}>Get Image</button>
        </span>
        <br/>
        <span className="form">
            <h3>Get image from device <span role="img" aria-label="phone">📱/💻</span></h3>
            <input type="file" placeholder="select Image" ref={fileRef} className="form__field__file" id="upload-file" onChange={(e)=>fileSelect()}/>
        </span>
        </div>
    )
}
