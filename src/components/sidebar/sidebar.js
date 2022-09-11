/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from 'react';
import './sidebar.css';

export default function Sidebar() {
  return(
    <div className='sidebar'>
      <div className='list first'>
        <div>
          <img src='icons/home.svg' alt='home' />
          <span>Home</span>
        </div>
        <div>
          <img src='icons/explore.svg' alt='explore' />
          <span>Explore</span>
        </div>
        <div>
          <img src='icons/shorts.svg' alt='shorts' />
          <span>Shorts</span>
        </div>
        <div>
          <img src='icons/subscriptions.svg' alt='subscriptions' />
          <span>Subscriptions</span>
        </div>
      </div>
      <hr />
      <Second />
      <hr />
      <Subscriptions />
      <hr />
      <div className='list explore'>
        <p>EXPLORE</p>
        <div>
          <img src='icons/films.svg' alt='films' />
          <span>Films</span>
        </div>
        <div>
          <img src='icons/gaming.svg' alt='gaming' />
          <span>Gaming</span>
        </div>
        <div>
          <img src='icons/live.svg' alt='live' />
          <span>Live</span>
        </div>
        <div>
          <img src='icons/fashion.svg' alt='fashion' />
          <span>Fashion & beauty</span>
        </div>
        <div>
          <img src='icons/learning.svg' alt='learning' />
          <span>Learning</span>
        </div>
        <div>
          <img src='icons/sport.svg' alt='sport' />
          <span>Sport</span>
        </div>
      </div>
      <hr />
      <div className='list more-from-youtube'>
        <p>MORE FROM YOUTUBE</p>
        <div>
          <img src='icons/youtubepremium.svg' alt='youtubepremium' />
          <span>YouTube Premium</span>
        </div>
        <div>
          <img src='icons/creatorstudio.svg' alt='creatorstudio' />
          <span>Creator Studio</span>
        </div>
        <div>
          <img src='icons/music.svg' alt='music' />
          <span>YouTube Music</span>
        </div>
        <div>
          <img src='icons/kids.svg' alt='kids' />
          <span>YouTube Kids</span>
        </div>
        <div>
          <img src='icons/tv.svg' alt='tv' />
          <span>YouTube TV</span>
        </div>
      </div>
      <hr />
      <div className='links'>
        <a href="#">About</a>
        <a href="#">Press</a>
        <a href="#">Copyright</a>
        <a href="#">Contact us</a>
        <a href="#">Creator</a>
        <a href="#">Advertise</a>
        <a href="#">Developers</a>
      </div>
    </div>
  );
}

function Second() {
  const [more, setMore] = useState(false);
  return(
    <div className='list second'>
      <div>
        <img src='icons/library.svg' alt='library' />
        <span>Library</span>
      </div>
      <div>
        <img src='icons/history.svg' alt='history' />
        <span>History</span>
      </div>
      <div>
        <img src='icons/yourvideos.svg' alt='yourvideos' />
        <span>Your videos</span>
      </div>
      <div>
        <img src='icons/watchlater.svg' alt='watchlater' />
        <span>Watch later</span>
      </div>
      <div>
        <img src='icons/yourclips.svg' alt='yourclips' />
        <span>Your clips</span>
      </div>
      { more && 
      <>
        <div>
          <img src='icons/liked.svg' alt='liked' />
          <span>Liked videos</span>
        </div>
        <div>
          <img src='icons/playlist.svg' alt='playlist' />
          <span>Friends | TBS</span>
        </div>
        <div>
          <img src='icons/playlist.svg' alt='playlist' />
          <span>Namaste &#128591; javascript course</span>
        </div>
        <div>
          <img src='icons/playlist.svg' alt='playlist' />
          <span>Photoshop for beginners</span>
        </div>
      </>
      }
      <div onClick={() => setMore(!more)}>
        <img src={more ? `icons/showless.svg` : 'icons/showmore.svg'} alt='showmore' />
        <span>Show {more ? 'fewer' : 'more'}</span>
      </div>
    </div>
  )
}
function Subscriptions() {
  const [more, setMore] = useState(false);
  return(
    <div className='list subscriptions'>
      <p>SUBSCRIPTIONS</p>
      <div>
        <img src='subscriptions/akshay.jpg' alt='akshay' />
        <span>Akshay Saini</span>
      </div>
      <div>
        <img src='subscriptions/dipraj.jpg' alt='dipraj' />
        <span>Dipraj Jadhav Edits</span>
      </div>
      <div>
        <img src='subscriptions/fireship.jpg' alt='firship' />
        <span>Fireship</span>
      </div>
      <div>
        <img src='subscriptions/ishan.jpg' alt='ishan' />
        <span>Ishan Sharma</span>
      </div>
      <div>
        <img src='subscriptions/joma.jpg' alt='joma' />
        <span>Joma Tech</span>
      </div>
      { more && 
      <>
        <div>
          <img src='subscriptions/keerti.jpg' alt='keerti' />
          <span>Keerti Purswani</span>
        </div>
        <div>
          <img src='subscriptions/kunal.jpg' alt='kunal' />
          <span>Kunal Kushwaha</span>
        </div>
        <div>
          <img src='subscriptions/netninja.jpg' alt='netninjs' />
          <span>The Net Ninja</span>
        </div>
        <div>
          <img src='subscriptions/shantanu.jpg' alt='shantanu' />
          <span>Shantanu Kumar</span>
        </div>
        <div>
          <img src='subscriptions/sharan.jpg' alt='sharan' />
          <span>Finance With Sharan</span>
        </div>
        <div>
          <img src='subscriptions/tanay.jpg' alt='tanay' />
          <span>Tanay Pratap</span>
        </div>
      </>
      }
      <div onClick={() => setMore(!more)}>
        <img src={more ? `icons/showless.svg` : 'icons/showmore.svg'} alt='showmore' />
        <span>Show {more ? 'fewer' : 'more'}</span>
      </div>
    </div>
  )
}