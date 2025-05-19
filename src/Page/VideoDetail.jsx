import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const VideoDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: video } = useQuery(["video", id], () =>
    axios.get(`http://localhost:5000/api/videos/${id}`).then((res) => res.data)
  );

  return (
    <div>
      <button onClick={() => navigate(-1)}>Back</button>
      {video && (
        <>
          <h2>{video.title}</h2>
          <iframe
            width="100%"
            height="400"
            src={video.videoUrl}
            frameBorder="0"
            allowFullScreen
          ></iframe>
          <p>{video.description}</p>
        </>
      )}
    </div>
  );
};

export default VideoDetail;
