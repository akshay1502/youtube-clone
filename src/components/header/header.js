import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './header.css';

export default function Header() {
  const [searchquery, setSearchquery] = useState('');
  const navigate = useNavigate();
  const searchResults = (e) => {
    if (e.key === 'Enter') {
      console.log('run');
      navigate(`/results?search_query=${searchquery}`);
    }
  }
  return(
    <div className="header">
      <div className='menu_cont'>
        <img src='icons/hamburger.svg' alt='hamburger'  className='hamburger' />
        <img src='icons/YT-header-icon.svg' alt='youtube' className='youtube' />
      </div>
      <div className='search_cont'>
        <input
          type="text"
          placeholder='Search'
          className='input'
          value={searchquery}
          onChange={(e) => setSearchquery(e.target.value)}
          onKeyDown={(e) => searchResults(e)}
        />
        <div className='searchbox'>
          <img src='icons/search.svg' alt='search' className='search'/>
        </div>
        <img src='icons/microphone.svg' alt='microphone' className='microphone' />
      </div>
      <div className='icons'>
        <img src='icons/upload.svg' alt='upload' className='upload' />
        <img src='icons/bell.svg' alt='bell' className='bell' />
        <div className='user'>A</div>
      </div>
    </div>
  )
}