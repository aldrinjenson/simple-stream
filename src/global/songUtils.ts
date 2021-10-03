import { Song } from "../types";

export const getCurrentSongIndex = (song: Song, songList: Song[]) => {
  for (let i: number = 0; i < songList.length; i++) {
    if (songList[i].videoId === song.videoId) {
      return i;
    }
  }
  return -1;
};
