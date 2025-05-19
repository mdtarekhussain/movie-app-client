import { useParams } from "react-router-dom";
import React from "react";

const VideoDetailPage = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>ভিডিও বিস্তারিত পেজ</h1>
      <p>ভিডিও আইডি: {id}</p>
    </div>
  );
};

export default VideoDetailPage;
