import React from "react";
import data from "../../data/gif-data";

// console.log(data);

const Gif = (props) => {
    return (
        <div>
            <img src={props.gifUrl} alt="" />
            <h3>{props.gifTitle}</h3>
            <p>Rating : {props.gifRating}</p>
        </div>
    );
}

export default Gif;