import axios from 'axios';
import Snackbar from 'react-native-snackbar';
import TrackPlayer from 'react-native-track-player';
import ytdl from 'react-native-ytdl';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { API_URL, LYRICS_API } from '../../config';
import { AppDispatch, RootState } from '../App';
import { Song } from '../types';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const apiDispatch = (actionType = '', data = null) => {
  return {
    type: actionType,
    payload: data,
  };
};

export const formatSeconds = (seconds: number, isMilli = false) => {
  if (isMilli) {
    seconds = seconds / 1000;
  }
  let mins: number = Math.floor(seconds / 60);
  let sec: number | string = Math.round(seconds % 60);
  if (sec < 10) {
    sec = `0${sec}`;
  }
  return `${mins}:${sec}`;
};

export const getSongAudioUrl = (videoID: String) => {
  return new Promise((resolve, reject) => {
    ytdl
      .getInfo(videoID)
      .then(async (info: { formats: any }) => {
        let audioFormats = await ytdl.filterFormats(info.formats, 'audioonly');
        const url = audioFormats[0].url || '';
        resolve(url);
      })
      .catch((err: Error) => {
        console.log('error in getting url!!', err);
        Snackbar.show({
          text:
            'There seems to be some issues with the network. Please try after some time',
        });
      });
  });
};

export const getLyrics = async (item: Song) => {
  if (item.lyrics) {
    console.log('lyrics exists!');
    return item.lyrics;
  }
  const artist = item.artist.name;
  const title = item.name;
  return new Promise((resolve, reject) => {
    const lyricUrl = `${LYRICS_API}${title} ${artist}`;
    axios
      .get(lyricUrl)
      .then(res => {
        resolve({ lyrics: res.data, timeStamped: true });
      })
      .catch(async () => {
        const url = `${API_URL}/lyrics/?artist=${artist}&title=${title}`;
        axios
          .get(url)
          .then(lyrics => {
            resolve({ lyrics, timeStamped: false });
          })
          .catch(err => {
            console.log('all hopes lost in getting lyrics lol');
            reject(err);
          });
      });
  });
};

export const getRestOfSongProps = (item: Song) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { lyrics, timeStamped } = await getLyrics(item);
      getSongAudioUrl(item.id).then(url => {
        const obj = { ...item, lyrics, timeStamped, url };
        resolve(obj);
      });
    } catch (error) {
      Snackbar.show({
        text:
          'There seems to be some issues with the network. Please try after some time',
      });
      console.log('error in getting song extra data ' + error);
    }
  });
};

export const addToQueue = async (songItem: Song) => {
  const completeSong = await getRestOfSongProps(songItem);
  const existingQ = await TrackPlayer.getQueue();
  const isSongAlreadyPresent = existingQ.some(el => el.id === songItem.id);
  if (isSongAlreadyPresent) {
    Snackbar.show({ text: 'Song already exists in queue' });
  } else {
    Snackbar.show({ text: 'Added to queue' });
    TrackPlayer.add([completeSong]);
  }
};
