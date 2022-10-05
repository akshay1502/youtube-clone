import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { SEARCH } from '../../api';
import moment from 'moment';
import './search.css';
import fetchChannelLogo from '../../helperfunctions/channelLogo';

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [result, setResult] = useState(null);
  const search_query = searchParams.get('search_query');
  useEffect(() => {
    async function searchForQuery() {
      const fetchSearchResults = await fetch( SEARCH + new URLSearchParams({
        key: process.env.REACT_APP_API_KEY,
        part: 'snippet',
        maxResults: 25,
        q: search_query
      }));
      const { items } = await fetchSearchResults.json();
      setResult(items);
    }
    searchForQuery();
  }, [search_query]);
  return (
    <div className="searchContainer">
      {
        result && result.map((item) => {
          const { id, snippet } = item;
          if (id.videoId) {
            return <SearchResultVideo id={id} snippet={snippet} />
          }
          return (
            <Link to="/" key={id.channelId} className="search_result_channel">
              <div className='img_container'>
                <img src={snippet.thumbnails.high.url} alt={snippet.channelTitle} />
              </div>
              <div className="search_result_video_desc">
                <p>{snippet.channelTitle}</p>
              </div>
            </Link>
          );
        })
      }
    </div>
  );
}

const SearchResultVideo = ({id, snippet}) => {
  const [channelLogoUrl, setChannelLogoUrl] = useState(null);
  useEffect(() => {
    (async () => {
      const channelLogo = await fetchChannelLogo(snippet.channelId);
      setChannelLogoUrl(channelLogo);
    })();
  }, []);
  return (
    <Link to={`/watch?v=${id.videoId}`} key={id.videoId} className="search_result_video">
      <div className='img_container'>
        <img src={snippet.thumbnails.high.url} alt={snippet.channelTitle} loading="lazy" />
      </div>
      <div className='search_result_video_desc'>
        <p>{snippet.title}</p>
        <p>{moment(snippet.publishedAt).fromNow()}</p>
        {channelLogoUrl && (
          <div className='logo_title'>
            <img src={channelLogoUrl} alt="url" />
            <span>{snippet.channelTitle}</span>
          </div>)}
        <p className='desc'>{snippet.description}</p>
      </div>
    </Link>
  );
}