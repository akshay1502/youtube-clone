/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from 'react';
import './sidebar.css';

const firstMenu = {
  visible: [
    {
      name: 'Home',
      thumbnail: 'icons/home.svg'
    },
    {
      name: 'Explore',
      thumbnail: 'icons/explore.svg'
    },
    {
      name: 'Shorts',
      thumbnail: 'icons/shorts.svg'
    },
    {
      name: 'Subscriptions',
      thumbnail: 'icons/subscriptions.svg'
    }
  ] 
}
const secondMenu = {
  visible: [
    {
      name: 'Library',
      thumbnail: 'icons/library.svg'
    },
    {
      name: 'History',
      thumbnail: 'icons/history.svg'
    },
    {
      name: 'Your videos',
      thumbnail: 'icons/yourvideos.svg'
    },
    {
      name: 'Watch later',
      thumbnail: 'icons/watchlater.svg'
    },
    {
      name: 'Your clips',
      thumbnail: 'icons/yourclips.svg'
    }
  ],
  hidden: [
    {
      name: 'Liked videos',
      thumbnail: 'icons/liked.svg'
    },
    {
      name: 'Friends | TBS',
      thumbnail: 'icons/playlist.svg'
    },
    {
      name: 'Your videos',
      thumbnail: 'icons/playlist.svg'
    },
    {
      name: 'Namaste &#128591; javascript course',
      
      thumbnail: 'icons/playlist.svg'
    },
    {
      name: 'Photoshop for beginners',
      thumbnail: 'icons/playlist.svg'
    }
  ]
}
const subscriptions = {
  visible: [
    {
      name:'Akshay Saini',
      thumbnail: 'subscriptions/akshay.jpg'
    },
    {
      name:'Dipraj Jadhav Edits',
      thumbnail: 'subscriptions/dipraj.jpg'
    },
    {
      name:'Fireship',
      thumbnail: 'subscriptions/fireship.jpg'
    },
    {
      name:'Ishan Sharma',
      thumbnail: 'subscriptions/ishan.jpg'
    },
    {
      name:'Joma Tech',
      thumbnail: 'subscriptions/joma.jpg'
    }
  ],
  hidden: [
    {
      name:'Keerti Purswani',
      thumbnail: 'subscriptions/keerti.jpg'
    },
    {
      name:'Kunal Kushwaha',
      thumbnail: 'subscriptions/kunal.jpg'
    },
    {
      name:'The Net Ninja',
      thumbnail: 'subscriptions/netninja.jpg'
    },
    {
      name:'Shantanu Kumar',
      thumbnail: 'subscriptions/shantanu.jpg'
    },
    {
      name:'Finance With Sharan',
      thumbnail: 'subscriptions/sharan.jpg'
    },
    {
      name:'Tanay Pratap',
      thumbnail: 'subscriptions/tanay.jpg'
    }
  ]
}
const explore = {
  visible: [
    {
      name: 'Films',
      thumbnail: 'icons/films.svg'
    },
    {
      name: 'Gaming',
      thumbnail: 'icons/gaming.svg'
    },
    {
      name: 'Live',
      thumbnail: 'icons/live.svg'
    },
    {
      name: 'Fashion & beauty',
      thumbnail: 'icons/fashion.svg'
    },
    {
      name: 'Learning',
      thumbnail: 'icons/learning.svg'
    },
    {
      name: 'Sport',
      thumbnail: 'icons/sport.svg'
    }
  ] 
}
const moreFromYouTube = {
  visible: [
    {
      name: 'YouTube Premium',
      thumbnail: 'icons/youtubepremium.svg'
    },
    {
      name: 'Creator Studio',
      thumbnail: 'icons/creatorstudio.svg'
    },
    {
      name: 'YouTube Music',
      thumbnail: 'icons/music.svg'
    },
    {
      name: 'YouTube Kids',
      thumbnail: 'icons/kids.svg'
    },
    {
      name: 'YouTube TV',
      thumbnail: 'icons/tv.svg'
    }
  ] 
}

export default function Sidebar() {
  return(
    <div className='sidebar'>
      <RenderList list={firstMenu} />
      <hr />
      <RenderList list={secondMenu} />
      <hr />
      <RenderList list={subscriptions} title='SUBSCRIPTIONS' />
      <hr />
      <RenderList list={explore} title='EXPLORE' />
      <hr />
      <RenderList list={moreFromYouTube} title='MORE FROM YOUTUBE' />
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

function RenderList({list, title}) {
  const [more, setMore] = useState(false);
  return(
    <div className='list subscriptions'>
      {title && <p>{title}</p>}
      { list.visible.map((data, index) => {
        return(
          <div key={index}>
            <img src={data.thumbnail} alt={data.name} />
            <span>{data.name}</span>
          </div>
        )
      })}
      { list?.hidden && list.hidden.length > 0 && (
        <>
          { more && 
          <>
            { list.hidden.map((data, index) => {
              return(
                <div key={index}>
                  <img src={data.thumbnail} alt={data.name} />
                  <span>{data.name}</span>
                </div>
              )
            })}
          </>
          }
          <div onClick={() => setMore(!more)}>
            <img src={more ? `icons/showless.svg` : 'icons/showmore.svg'} alt='showmore' />
            <span>Show {more ? 'fewer' : 'more'}</span>
          </div>
        </>
      )}
    </div>
  )
}