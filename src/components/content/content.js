import moment from 'moment';
import { useState, useEffect } from 'react';
import ContentLoader from 'react-content-loader';
import { YOUTUBE_FEED } from '../../api';
import { Link } from 'react-router-dom';
import './content.css';
import fetchChannelLogo from '../../helperfunctions/channelLogo';

export default function YoutubeFeed() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  useEffect(() => {
    async function fetchYoutubeFeed() {
      const fetchData = await fetch(YOUTUBE_FEED + new URLSearchParams({
        key: process.env.REACT_APP_API_KEY,
        part: ['snippet', 'statistics'],
        chart: 'mostPopular',
        maxResults: 12,
        regionCode: 'IN',
      }));
      const result = await fetchData.json();
      const addChannelLogoToResult = await Promise.all(result.items.map(async (item) => {
        item.channelLogo = await fetchChannelLogo(item.snippet.channelId);
        return item;
      }))
      setData(addChannelLogoToResult);
      setLoading(false);
    };
    fetchYoutubeFeed();
  }, []);
  
  return(
    <div className='content'>
      { loading 
        ? (
          <>
            <YOUTUBE_FEED_SKELETON />
            <YOUTUBE_FEED_SKELETON />
            <YOUTUBE_FEED_SKELETON />
            <YOUTUBE_FEED_SKELETON />
            <YOUTUBE_FEED_SKELETON />
            <YOUTUBE_FEED_SKELETON />
            <YOUTUBE_FEED_SKELETON />
            <YOUTUBE_FEED_SKELETON />
          </>
        )
        : (
          <>
            { data.map(item => {
              const { 
                id, channelLogo, snippet, statistics
              } = item;
              const viewCount = Intl.NumberFormat('en', { notation: 'compact' }).format(statistics.viewCount);
              return(
                <Link to={`/watch?v=${id}`} className='card' key={id}>
                  <img src={snippet.thumbnails.high.url} alt={snippet.channelTitle} />
                  <div className='card_desc'>
                    <img src={channelLogo} alt={snippet.channelTitle} />
                    <div className='video_desc'>
                      <p className='title'>{snippet.title}</p>
                      <p className='channel_name'>{snippet.channelTitle}</p>
                      <p className='views'>{viewCount} . {moment(snippet.publishedAt).fromNow()}</p>
                    </div>
                  </div>
                </Link>
              )
            })}
          </>
        )}
    </div>
  )
}

const YOUTUBE_FEED_SKELETON = () => {
  return(
    <ContentLoader viewBox="0 0 250 280" height={280} width={250} backgroundColor="#cecece" foregroundColor="#e4e4e4">
      <rect x="16" y="17" rx="0" ry="0" width="250" height="200" />
      <circle cx="35" cy="248" r="20" />
      <rect x="69" y="229" rx="2" ry="2" width="275" height="15" />
      <rect x="69" y="253" rx="2" ry="2" width="140" height="15" />
    </ContentLoader>
  );
}
