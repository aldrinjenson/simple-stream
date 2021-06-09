import axios from 'axios';
import Snackbar from 'react-native-snackbar';
import ytdl from 'react-native-ytdl';
import { API_URL, LYRICS_API } from '../../config';
import {
  GET_RELATED_SONGS_START,
  GET_RELATED_SONGS_SUCCESS,
} from '../redux/constants';
import { Song, FullSongProps } from '../types';

export const apiDispatch = (actionType: string = '', data: any = null) => {
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

export const getUrlAndThumbs = (videoID: String) => {
  return new Promise(resolve => {
    ytdl
      .getInfo(videoID)
      .then(async (info: { formats: any; videoDetails: any }) => {
        const audioFormats = await ytdl.filterFormats(
          info.formats,
          'audioonly',
        );
        const {
          videoDetails: { thumbnails },
        } = info;
        resolve({
          url: audioFormats[0]?.url,
          thumbnails: thumbnails,
        });
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
    // lyrics already saved in db
    return item.lyrics;
  }
  const artist = item.artist.name;
  const title = item.name;
  return new Promise((resolve, reject) => {
    const lyricUrl = `${LYRICS_API}${title} ${artist}`;
    axios
      .get(lyricUrl)
      .then(({ data }) => {
        resolve({ lyrics: data, timeStamped: true });
      })
      .catch(async () => {
        const url = `${API_URL}/lyrics/?artist=${artist}&title=${title}`;
        axios
          .get(url)
          .then(({ data }) => {
            resolve({ lyrics: data, timeStamped: false });
          })
          .catch(err => {
            console.log('all hopes lost in getting lyrics lol');
            reject(err);
          });
      });
  });
};

export const getRestOfSongProps = (item: Song) => {
  return new Promise(async resolve => {
    try {
      const { lyrics, timeStamped } = await getLyrics(item);
      getUrlAndThumbs(item.videoId).then(({ url, thumbnails }) => {
        const obj = { ...item, lyrics, timeStamped, url, thumbnails };
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
  // const completeSong = await getRestOfSongProps(songItem);
  // const existingQ = await TrackPlayer.getQueue();
  // const isSongAlreadyPresent = existingQ.some(
  //   el => el.videoId === songItem.videoId,
  // );
  // if (isSongAlreadyPresent) {
  //   Snackbar.show({ text: 'Song already exists in queue' });
  // } else {
  //   Snackbar.show({ text: 'Added to queue' });
  // }
};

export const sentenceCase = (str: string): string => {
  const firstLetter = str[0].toUpperCase();
  return firstLetter + str.slice(1);
};

export const convertSongFormat = (songs: FullSongProps[]): Song[] => {
  const newSongList = songs.map(song => ({
    name: song.title,
    thumbnails: song.thumbnails,
    artist: { name: song.author?.name.slice(0, -7) || '' },
    duration: +song.lengthSeconds * 1000,
    videoId: song.videoId,
  }));

  return newSongList;
};

export const getSongFromIds = async (songIds: string[]) => {
  let promises: any[] = [];
  songIds.forEach(id => promises.push(ytdl.getBasicInfo(id)));
  let suggestedSongInfos = await Promise.all(promises);
  const videoDetails = suggestedSongInfos.map(info => info.videoDetails);
  return videoDetails;
};

export const getSuggestedSongsList = (id: string) => {
  return (dispatch: (arg0: { type: string; payload: null }) => void) => {
    dispatch(apiDispatch(GET_RELATED_SONGS_START));
    axios
      .get(`${API_URL}/suggested/${id}`)
      .then(res => {
        const songIds = res.data;
        getSongFromIds(songIds).then((songs: FullSongProps[]) =>
          dispatch(
            apiDispatch(GET_RELATED_SONGS_SUCCESS, convertSongFormat(songs)),
          ),
        );
      })
      .catch(err => {
        console.log('error in getting related songs: ' + err);
      });
  };
};
