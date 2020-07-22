import { getState } from '../store';

export default () => {
  const { play, gameMode, statistics } = getState();
  localStorage.setItem('play', JSON.stringify(play));
  localStorage.setItem('gameMode', JSON.stringify(gameMode));
  localStorage.setItem('statistics', JSON.stringify(statistics));
};
