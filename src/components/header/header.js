// import fevicon from 'icons/fevicon.svg';
import './header.css';

export default function Header() {
  return(
    <div className="header">
      <div className='menu_cont'>
        <img src='icons/hamburger.svg' alt='hamburger'  className='hamburger' />
        <img src='icons/YT-header-icon.svg' alt='youtube' className='youtube' />
      </div>
      <div className='search_cont'>
        <input type="text" placeholder='Search' className='input' />
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