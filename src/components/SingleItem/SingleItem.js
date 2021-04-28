import React from 'react';
import './SingleItem.css';
import {img_300, unavailable} from  './config.js';


const SingleItem = ({
    id,
    poster,
    description,
    date,
    name,
    popularity,
    vote_average
}) => {
    return (
        <div className="single-item">
            <img src={poster ? `${img_300}/${poster}` : unavailable} alt="{name}" />
            <h2 className="series-name">{name}</h2>
            <span maxLength={11} className="description">{description}</span>
            <h2 className="popularity">{popularity}</h2>

        </div>
    )
}


export default SingleItem;