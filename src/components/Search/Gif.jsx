import React from "react";

const Gif = (props) => {
    return (
        <div>
            <h3>{props.gifTitle}</h3>
            <img src={props.gifUrl} />
        </div>
    );
}

export default Gif;