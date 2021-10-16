import axios from 'axios';
import Toast from 'react-native-simple-toast';
import ytdl from 'react-native-ytdl';
import YoutubeMusicApi from 'youtube-music-api';

import { setSongQueue } from '../redux/actions/queueActions';
import { SONG_QUEUE_LOADING_START } from '../redux/constants/queueConstants';
import { Song, FullSongProps, thumbnail } from '../types';

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

export const getUrlAndThumbs = (
  videoID: String,
): Promise<{ url: string; thumbnails: thumbnail[] }> => {
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
        Toast.show(
          'There seems to be some issues with the network. Please try after some time',
        );
      });
  });
};

export const getLyrics = async (item: Song) => {
  const artist = item.artist.name || '';
  const title = item.name;
  try {
    const { lyrics }: { lyrics: string } = (
      await axios.get(`https://api.lyrics.ovh/v1/${artist}/${title}`)
    ).data;
    return {
      lyrics: lyrics.replace('Paroles de la chanson ', ''),
      timeStamped: false,
    };
  } catch (err) {
    console.log('Error in getting lyrics: ' + err);
    return { lyrics: '', timeStamped: false };
  }
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
      Toast.show(
        'There seems to be some issues with the network. Please try after some time',
      );
      console.log('error in getting song extra data ' + error);
    }
  });
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

const getNext = async (id: string): Promise<string[]> => {
  return new Promise(async resolve => {
    const api = new YoutubeMusicApi();
    try {
      api
        .initalize()
        .then(async () => {
          const suggestions = await api.getNext(id);
          const videoIds = suggestions.content.map(
            (suggestion: { videoId: string }) => suggestion.videoId,
          );
          resolve(videoIds);
        })
        .catch((err: Error) => {
          console.log('Error in initializing api: ' + err);
        });
    } catch (error) {
      Toast.show(
        'There seems to be some issues with the network. Please try after some time',
      );
      console.log('error in getting suggestions ' + error);
    }
  });
};

export const getSuggestedSongsList = (id: string) => {
  return (dispatch: (x: any) => void) => {
    dispatch(apiDispatch(SONG_QUEUE_LOADING_START));
    getNext(id)
      .then(songIds =>
        getSongFromIds(songIds).then((songs: FullSongProps[]) => {
          dispatch(setSongQueue(convertSongFormat(songs)));
        }),
      )
      .catch(err => {
        console.log('error in getting related songs: ' + err);
      });
  };
};
