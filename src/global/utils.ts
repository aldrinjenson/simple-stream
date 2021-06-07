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
  let mins: number = Math.floor(seconds / 60000);
  let sec: number | string = Math.round(seconds % 60000);
  if (sec < 10) {
    sec = `0${sec}`;
  }
  return `${mins}:${sec}`;
};

export const handleError = (msg: string, err: Error) => {
  console.log(msg);
  console.log(err)
};


export const getSongAudioUrl = async (videoID: String) => {
  ytdl.getInfo(videoID).then(info => {
    let audioFormats = ytdl.filterFormats(info.formats, 'audioonly');
    return audioFormats[0].url || ''
  }).catch((err: Error) => {
    handleError(`error in getting url!!`, err)
    return ''
  })
};

export const getLyrics = async (item: Song) => {
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