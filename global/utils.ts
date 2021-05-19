import axios from 'axios';
import TrackPlayer from 'react-native-track-player';
import ytdl from 'react-native-ytdl';
import { API_URL, LYRICS_API } from '../config';
import { Song } from '../src/components/DisplaySongs';

export const apiDispatch = (actionType = '', data = null) => {
  return {
    type: actionType,
    payload: data,
  };
};

export const formatSeconds = seconds => {
  let mins = Math.floor(seconds / 60);
  let sec = Math.floor(seconds % 60);
  if (sec < 10) {
    sec = `0${sec}`;
  }
  return `${mins}:${sec}`;
};

// export const convertSongFormat = (songs = []) => {
//   const newSongList = songs.map(song => ({
//     name: song.title,
//     thumbnails: song.thumbnails,
//     artist: { name: song.author?.name.slice(0, -7) },
//     duration: +song.lengthSeconds * 1000,
//     videoId: song.videoId,
//   }));
//   return newSongList;
// };

export const hanleError = err => {
  console.log('error in response');
  console.error(err);
};

const getSongUrlAndThumb = async (videoID: String) => {
  console.log({ videoID });
  try {
    let info = await ytdl.getInfo(videoID);
    let audioFormats = ytdl.filterFormats(info.formats, 'audioonly');
    const {
      videoDetails: { thumbnails },
    } = info;
    console.log('getting song url');
    return {
      url: audioFormats[0]?.url,
      artwork: thumbnails[thumbnails.length - 2].url,
    };
  } catch (error) {
    console.log('error in getting url');
    return { url: '' }
  }
};

const getLyrics = async (item: Song) => {
  if (item.lyrics) return item.lyrics
  const { artist, title } = item

  return new Promise((resolve, reject) => {
    const lyricUrl = `${LYRICS_API}${title} ${artist}`;
    axios.get(lyricUrl).then(res => {
      resolve({ lyrics: res.data, timeStamped: true })
    }).catch(async () => {
      const url = `${API_URL}/lyrics/?artist=${artist}&title=${title}`
      const lyrics = (await axios.get(url)).data || []
      resolve({ lyrics, timeStamped: false })
    })
  })
};

export const playSong = async (item: Song, isFromQueue: boolean) => {
  const { lyrics, timeStamped } = await getLyrics(item)
  console.log(JSON.stringify(lyrics, null, 4))
  const { url } = await getSongUrlAndThumb(item.id)
  const obj = { ...item, lyrics, timeStamped, url }
  if (!isFromQueue && url) {
    await TrackPlayer.reset();
    await TrackPlayer.add([obj]);
    await TrackPlayer.play();
  }
};
