import RNFetchBlob from 'rn-fetch-blob';
import { Song } from '../types';

export const getCurrentSongIndex = (song: Song, songList: Song[]) => {
  for (let i: number = 0; i < songList.length; i++) {
    if (songList[i].videoId === song.videoId) {
      return i;
    }
  }
  return -1;
};

export const downloadHelper = (
  filePath: string,
  fileUrl: string,
  fileName?: string,
) => {
  return new Promise((resolve, reject) => {
    const dirs = RNFetchBlob.fs.dirs;
    const appName = 'SimpleStream';
    const path = `${dirs.MusicDir || dirs.DownloadDir}/${appName}/${filePath}`;
    RNFetchBlob.config({
      path,
      addAndroidDownloads: {
        title: fileName,
        useDownloadManager: true,
        notification: true,
        description: `File downloaded by ${appName}`,
        path,
      },
    })
      .fetch('GET', fileUrl)
      .progress((received, total) => {
        console.log('progress', received / total);
      })
      .then(resp => {
        console.log('The file saved to ', resp.path());
        resolve(resp.path());
      })
      .catch(err => {
        console.log('Error in downloaing files: ' + err);
        reject(err);
      });
  });
};
