export const apiDispatch = (actionType = '', data = null) => {
  return {
    type: actionType,
    payload: data,
  };
};

export const formatSeconds = seconds => {
  let mins = Math.floor(seconds / 60);
  let sec = Math.floor(seconds % 60);
  if (sec < 10) {
    sec = `0${sec}`;
  }
  return `${mins}:${sec}`;
};

export const convertSongFormat = (songs = []) => {
  const newSongList = songs.map(song => ({
    name: song.title,
    thumbnails: song.thumbnails,
    artist: { name: song.author?.name.slice(0, -7) },
    duration: +song.lengthSeconds * 1000,
    videoId: song.videoId,
  }));
  return newSongList;
};

export const hanleError = err => {
  console.log('error in response');
  console.error(err);
};
