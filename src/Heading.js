import React from 'react'

export default function Heading({click,imageAvailable,setDownload}) {
    return (
        <>
            <span className="header-container">
                <h2 className="heading" onClick={()=>click(false)}>Simple Image <span role="img" aria-label="city_sunset">🌆</span> Editor</h2> 
                {imageAvailable ? <span className="download-button" role="img" onClick={()=>setDownload(true)} aria-label="download">🔽</span> :<span className="download-button">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>}
           </span>
        </>
    )
}
