import axios from 'axios';
import Snackbar from 'react-native-snackbar';
import TrackPlayer from 'react-native-track-player';
import ytdl from 'react-native-ytdl';
import { API_URL, LYRICS_API } from '../../config';
import { Song } from '../components/DisplaySongs';

export const apiDispatch = (actionType = '', data = null) => {
  return {
    type: actionType,
    payload: data,
  };
};

export const formatSeconds = (seconds: number) => {
  let mins: number = Math.floor(seconds / 60);
  let sec: number | string = Math.floor(seconds % 60);
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

export const hanleError = (err: Error) => {
  console.log('error in response');
  console.error(err);
};

const getSongUrlAndThumb = async (videoID: String) => {
  try {
    let info = await ytdl.getInfo(videoID);
    let audioFormats = ytdl.filterFormats(info.formats, 'audioonly');
    const {
      videoDetails: { thumbnails },
    } = info;
    console.log('getting song url for videoId' + videoID);
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

const getRestOfSongProps = async (item: Song) => {
  const { lyrics, timeStamped } = await getLyrics(item)
  const { url } = await getSongUrlAndThumb(item.id)
  const obj = { ...item, lyrics, timeStamped, url }
  return obj
}

export const playSong = async (songItem: Song, isFromQueue: boolean) => {
  const completeSong = await getRestOfSongProps(songItem)
  if (!isFromQueue) {
    await TrackPlayer.reset();
    await TrackPlayer.add([completeSong]);
    await TrackPlayer.play();
  }
};

export const addToQueue = async (songItem: Song) => {
  const completeSong = await getRestOfSongProps(songItem)
  const existingQ = await TrackPlayer.getQueue()
  const isSongAlreadyPresent = existingQ.some(el => el.id === songItem.id)
  if (isSongAlreadyPresent) {
    Snackbar.show({ text: 'Song already exists in queue' })
  } else {
    Snackbar.show({ text: 'Added to queue' })
    TrackPlayer.add([completeSong])
  }
}