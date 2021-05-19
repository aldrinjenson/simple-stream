import { SET_CURRENT_SONG, SET_IS_PLAYING } from "../constants"
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

