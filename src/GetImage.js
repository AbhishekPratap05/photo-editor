import React, { useState } from 'react'

export default function GetImage({getImage}) {
    const [url,setUrl]=useState("");
    return (
        <span className="form">
            <input type="text" placeholder="Image URL" className="form__field" value={url} onChange={(e)=>setUrl(e.target.value)}/>
            <button type="submit" className="btn btn--primary btn--inside uppercase" onClick={()=>getImage(url)}>Get Image</button>
        </span>
    )
}
