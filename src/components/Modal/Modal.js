import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import axios from 'axios';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {
  img_500,
  unavailable,
  unavailableLandscape,
} from '../SingleItem/config';
import Button from '../Button/Button';
import './Modal.css';
import YouTubeIcon from '@material-ui/icons/YouTube';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    border: "2px solid #000",
    width: "90%",
    height: "80%",
    backgroundColor: "#39445a",
    borderRadius: 10,
    color: "white",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function CustomModal({ children, id, media_type }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [content, setContent] = useState();
  const [video, setVideo] = useState();
  const API_KEY = "e60e2f0cc6c14c63cb04b450da94ebfd";

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${API_KEY}&language=en-US`
    );

    setContent(data);
    console.log(data);
  };

  const fetchVideo = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${API_KEY}&language=en-US`
    );

    setVideo(data.results[0]?.key);
    console.log(data);
  };
  useEffect(() => {
    fetchData();
    fetchVideo();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div
        className="media"
        style={{ cursor: "pointer" }}
        onClick={handleOpen}
      >
        {children}
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
        {content && (
          <div className={classes.paper}>
            <div className="CustomModal">
             <img
                src={
                  content.poster_path
                    ? `${img_500}/${content.poster_path}`
                    : unavailable
                }
                alt={content.name || content.title}
                className="CustomModal_portrait"
              />
              <img
                src={
                  content.backdrop_path
                    ? `${img_500}/${content.backdrop_path}`
                    : unavailableLandscape
                }
                alt={content.name || content.title}
                className="CustomModal_landscape"
              />
              <div className="CustomModal_about">
                <span className="CustomModal_title">
                  {content.name || content.title} (
                  {(
                    content.first_air_date ||
                    content.release_date ||
                    "-----"
                  ).substring(0, 4)}
                  )
                </span>

                {content.tagline && (
                  <i className="tagline">{content.tagline}</i>
                )}

                <span className="CustomModal_description">
                  {content.overview}
                </span>

                <Button
                  variant="contained"
                  startIcon={<YouTubeIcon />}
                  color="secondary"
                  target="__blank"
                  href={`https://www.youtube.com/watch?v=${video}`}
                >
                  Watch the Trailer
                </Button>
              </div>
            </div>
            </div>
             )}
        </Fade>
      </Modal>
    </div>
  );
}
