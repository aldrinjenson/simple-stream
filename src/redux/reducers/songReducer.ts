import { SET_CURRENT_SONG, SET_IS_PLAYING } from "../constants"

const initialState = {
  isPlaying: false,
  currentSong: {}
}

const songReducer = (state = initialState, { type, payload }) => {
  switch (type) {

    case SET_CURRENT_SONG:
      return { ...state, currentSong: payload }

    case SET_IS_PLAYING:
      return {
        ...state,
        isPlaying: payload
      }
    default:
      return state
  }
}

export default songReducer