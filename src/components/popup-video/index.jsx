import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import ModalVideo from "react-modal-video";
import config from "../../config.json";
//import data from "../../data/ytvideo.json";

const PopupVideo = ({ data }) => {
  const [isOpen, setOpen] = useState(false);
  const [dataVideo, setdataVideo] = useState(data);
  const [_videoID, setVideoID] = useState("0");
  const [loading, setLoading] = useState(false);
  const getYtVideoDetails = async () => {
    setLoading(true);
    await fetch(config.youtubeservice)
      .then((response) => response.json())
      .then((data) => {
        let length = data.length;
        //let active1 = data1.filter((filter1) => filter1.isactive === 1 && filter1.viewingallery === 1);
        setdataVideo(data);
        setLoading(false);

        if (dataViedo.items.length > 0) return;
      })
      .catch((err) => {
        console.log("youtubeservice", err);
        setLoading(false);
      });
  };
  useEffect(() => {
    //getYtVideoDetails();
    // eslint-disable-next-line
    console.log("youtubeservice", data);
  }, []);
  return (
    <div className="single-portfolio">
      <div className="thumbnail">
        <div className="overlay">
          <img src={data.snippet.thumbnails.high.url} alt="portfolio" />
        </div>
        <div className="play-btn">
          <button onClick={() => (setOpen(true), setVideoID(data.id.videoId))}>
            <i className="icofont-play-alt-2"></i>
          </button>
        </div>
      </div>

      <ModalVideo channel="youtube" autoplay isOpen={isOpen} videoId={_videoID} onClose={() => setOpen(false)} />
    </div>
  );
};

PopupVideo.propTypes = {
  data: PropTypes.object,
};

export default PopupVideo;
