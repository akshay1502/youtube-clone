import moment from 'moment';
import { useState, useEffect } from 'react';
import ContentLoader from 'react-content-loader';
import { CHANNEL, YOUTUBE_FEED } from '../../api';
import './content.css';

export default function Content() {
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
        item.channelLogo = await fetchChannelLogo(item);
        return item;
      }))
      console.log(addChannelLogoToResult);
      setData(addChannelLogoToResult);
      setLoading(false);
    };
    async function fetchChannelLogo(item) {
      const fetchChannelLogoData = await fetch(CHANNEL + new URLSearchParams({
        key: process.env.REACT_APP_API_KEY,
        part: 'snippet',
        id: item.snippet.channelId
      }));
      const result = await fetchChannelLogoData.json();
      return result.items[0].snippet.thumbnails.default.url;
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
                <div className='card' key={id}>
                  <img src={snippet.thumbnails.high.url} alt={snippet.channelTitle} />
                  <div className='card_desc'>
                    <img src={channelLogo} alt={snippet.channelTitle} />
                    <div className='video_desc'>
                      <p className='title'>{snippet.title}</p>
                      <p className='channel_name'>{snippet.channelTitle}</p>
                      <p className='views'>{viewCount} . {moment(snippet.publishedAt).fromNow()}</p>
                    </div>
                  </div>
                </div>
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
