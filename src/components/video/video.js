import { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { useSearchParams } from "react-router-dom";
import { CHANNEL, YOUTUBE_FEED } from "../../api";

export default function Video() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    async function fetchYoutubeFeed() {
      const fetchData = await fetch(YOUTUBE_FEED + new URLSearchParams({
        key: process.env.REACT_APP_API_KEY,
        part: ['snippet', 'statistics'],
        id: searchParams.get('v')
      }));
      const { items: [videoData] } = await fetchData.json();
      const fetchingChannelLogo = await fetchChannelLogo(videoData.snippet.channelId);
      videoData.channelLogo = fetchingChannelLogo;
      console.log(videoData);
      setData(videoData);
      setLoading(false);
    };
    async function fetchChannelLogo(channelId) {
      const fetchChannelLogoData = await fetch(CHANNEL + new URLSearchParams({
        key: process.env.REACT_APP_API_KEY,
        part: 'snippet',
        id: channelId
      }));
      const result = await fetchChannelLogoData.json();
      return result.items[0].snippet.thumbnails.default.url;
    };
    fetchYoutubeFeed();
  }, []);
  const formatDate = (date) => {
    const tempDate = new Date(date);
    return tempDate.toLocaleDateString('en-GB', {
      day: 'numeric', month: 'short', year: 'numeric'
    });
  };
  return(
    <div>
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${searchParams.get('v')}`}
        playing={true}
        controls={true}
      />
      {data && (
      <>
        <p>{data.snippet.title}</p>
        <p>{data.statistics.viewCount} views . {formatDate(data.snippet.publishedAt)}</p>
      </>)}
      <hr />
    </div>
  )
}