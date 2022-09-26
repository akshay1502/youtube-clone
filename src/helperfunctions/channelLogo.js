import { CHANNEL } from "../api";

const channelLogoObj = {};

async function fetchChannelLogo(channelId) {
  if (channelId in channelLogoObj) {
    return channelLogoObj[channelId];
  } else {
    const fetchChannelLogoData = await fetch(CHANNEL + new URLSearchParams({
      key: process.env.REACT_APP_API_KEY,
      part: 'snippet',
      id: channelId
    }));
    const result = await fetchChannelLogoData.json();
    const logoUrl = result.items[0].snippet.thumbnails.default.url;
    channelLogoObj[channelId] = logoUrl;
    return logoUrl;
  }
};

export default fetchChannelLogo;