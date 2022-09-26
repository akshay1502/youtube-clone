import { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { useSearchParams } from "react-router-dom";
import { COMMENTS_ON_VIDEO, YOUTUBE_FEED } from "../../api";
import Linkify from "linkify-react";
import moment from 'moment';
import './video.css';
import fetchChannelLogo from "../../helperfunctions/channelLogo";

export default function Video() {
  const [data, setData] = useState(null);
  const [comments, setComments] = useState(null);
  const [searchParams] = useSearchParams();
  const [showFullDescription, setShowFullDescription] = useState(false);
  useEffect(() => {
    async function fetchVideo() {
      const fetchData = await fetch(YOUTUBE_FEED + new URLSearchParams({
        key: process.env.REACT_APP_API_KEY,
        part: ['snippet', 'statistics'],
        id: searchParams.get('v')
      }));
      const { items: [videoData] } = await fetchData.json();
      const fetchingChannelLogo = await fetchChannelLogo(videoData.snippet.channelId);
      videoData.channelLogo = fetchingChannelLogo;
      setData(videoData);
    };
    fetchVideo();
  }, []);
  useEffect(() => {
    async function fetchCommentsOnVideo() {
      const fetchComments = await fetch(COMMENTS_ON_VIDEO + new URLSearchParams({
        key: process.env.REACT_APP_API_KEY,
        part: 'snippet',
        videoId: searchParams.get('v')
      }));
      const { items } = await fetchComments.json();
      setComments(items);
    }
    fetchCommentsOnVideo();
  }, []);
  const formatDate = (date) => {
    const tempDate = new Date(date);
    return tempDate.toLocaleDateString('en-GB', {
      day: 'numeric', month: 'short', year: 'numeric'
    });
  };
  const changeLineClampForDescription = () => {
    const linkify_desc = document.querySelector('#linkify_desc');
    linkify_desc.style.webkitLineClamp = showFullDescription ? 5 : 'unset';
    setShowFullDescription(!showFullDescription);
  }
  return(
    <div className="section1">
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${searchParams.get('v')}`}
        playing={false}
        controls={true}
      />
      {data && (
      <>
        <div className='video_snippet'>
          <p className="title">{data.snippet.title}</p>
          <p className="meta">{Number(data.statistics.viewCount).toLocaleString('en-US')} views . {formatDate(data.snippet.publishedAt)}</p>
        </div>
        <hr />
        <div className="video_desc_container">
          <img src={data.channelLogo} alt={data.snippet.channelTitle} />
          <div className="video_desc_meta">
            <p className="channelTitle">{data.snippet.channelTitle}</p>
            <Linkify
              id="linkify_desc"
              className="description" 
              tagName="p"
            >
              {data.snippet.description}
            </Linkify>
            <button onClick={changeLineClampForDescription} className='desc_btn'>
              SHOW { showFullDescription ? 'LESS' : 'MORE' }
            </button>
          </div>
        </div>
      </>)}
      <hr />
      {comments && (
        <>
          <div className="comment_sort">
            <span>{comments.length} Comments</span>
            <button className="sort">
              <img src='icons/sort.svg' alt='sort' />
              <span>SORT BY</span>
            </button>
          </div>
          {comments.map(comment => {
            const { snippet: { topLevelComment } } = comment;
            const { id, snippet } = topLevelComment;
            return (
              <div key={id} className="comment">
                <img src={snippet.authorProfileImageUrl} alt={snippet.authorDisplayName} />
                <div className="comment_meta">
                  <p className="author">{snippet.authorDisplayName}</p>
                  <span>{' '}</span>
                  <span className="publishedAt">{moment(snippet.publishedAt).fromNow()}</span>
                  <p className="userComment" dangerouslySetInnerHTML={{ __html: snippet.textDisplay }}></p>
                </div>
              </div>
            )
          })}
        </>
      )}
    </div>
  )
}