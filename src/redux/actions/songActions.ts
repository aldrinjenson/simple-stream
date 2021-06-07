import { SET_CURRENT_SONG, SET_IS_PLAYING } from "../constants"
import { Song } from "../../types";
import { getLyrics, getSongAudioUrl } from "../../global/utils";

const getRestOfSongProps = async (item: Song) => {
  const { lyrics, timeStamped } = await getLyrics(item)
  const url = await getSongAudioUrl(item.id)
  const obj = { ...item, lyrics, timeStamped, url }
  return obj
}

export const playSong = (songItem: Song) => {
  return (dispatch: (arg0: { type: string; payload: Song; }) => void) => {
    getRestOfSongProps(songItem).then(completeSong => {
      dispatch({
        type: SET_CURRENT_SONG,
        payload: completeSong
      })
    }).catch(err => console.log('error in dispatching complete song' + err))
  }
}

export const setIsPlaying = (isPlaying: boolean) => {
  return {
    type: SET_IS_PLAYING,
    payload: isPlaying
  }
}

