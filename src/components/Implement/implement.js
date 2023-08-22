import React from "react";
import "./implement.css"

const Implement = (props)=>{
    const {title,message} = props

    return(
        <div className="implement-container">
            <div className="title-container">
                <h2>{title}</h2>
                <h3>Coming Soon</h3>
            </div>
            <div className="message-container">
                <p>{message}</p>
            </div>

        </div>
    )


} 

export default Implement