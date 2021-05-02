import React from 'react';
import './SingleItem.css';
import { img_300, unavailable } from './config.js';
import CustomModal from '../Modal/Modal';

const SingleItem = ({ id, poster, title, date, media_type, vote_average }) => {
    return (
      
    <CustomModal className="single-item" media_type={media_type} id={id}>
      <h2 className="vote-average">{vote_average}</h2>

      <img
        className="poster"
        src={poster ? `${img_300}${poster}` : unavailable}
        alt={title}
      />
      <b className="title">{title}</b>
      <span className="subTitle">
        {media_type === "tv" ? "TV Series" : "Movie"}
        <span className="subTitle">{date}</span>
      </span>
            </CustomModal>
            
  );
};

export default SingleItem;
