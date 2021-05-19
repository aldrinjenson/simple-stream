import { SET_CURRENT_SONG, SET_IS_PLAYING } from "../constants"
import TrackPlayer from 'react-native-track-player'
import ytdl from "react-native-ytdl";
import { Song } from "../../components/DisplaySongs";

export const setCurrentSong = (songObj: Song) => {
  return {
    type: SET_CURRENT_SONG,
    payload: songObj
  }
}
export const setIsPlaying = (isPlaying: boolean) => {
  return {
    type: SET_IS_PLAYING,
    payload: isPlaying
  }
}

const getSongUrlAndThumb = async (videoID: String) => {
  console.log({ videoID });
  try {
    let info = await ytdl.getInfo(videoID);
    let audioFormats = ytdl.filterFormats(info.formats, "audioonly");
    const {
      videoDetails: { thumbnails },
    } = info;
    console.log("getting song url");
    return {
      url: audioFormats[0]?.url,
      artwork: thumbnails[thumbnails.length - 2].url,
    };
  } catch (error) {
    console.log('error in getting url')
  }
};


interface Props {
  item: Song,
  isFromQueue: boolean
}

export const playSong = (item: Song, isFromQueue: boolean) => {
  getSongUrlAndThumb(item.id).then(async ({ url }) => {
    if (!isFromQueue) {
      await TrackPlayer.reset()
      await TrackPlayer.add([{ ...item, url }])
      await TrackPlayer.play()
    }
  })
}