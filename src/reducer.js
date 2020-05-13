import { actions } from './constants';
import { categories, cards } from './resources';

function shuffle(array) {
  const newArray = array;
  let counter = newArray.length;

  while (counter > 0) {
    const index = Math.floor(Math.random() * counter);

    counter -= 1;

    const temp = newArray[counter];
    newArray[counter] = newArray[index];
    newArray[index] = temp;
  }

  return newArray;
}

const initialCurrentGame = {
  answers: [],
  correct: 0,
  incorrect: 0,
  questions: [],
  currentCard: null,
  next: null,
};

const initialStatistic = () => {
  const statistic = {};
  categories.forEach((category, i) => {
    statistic[category] = cards[i].map((card) => ({
      word: card.word,
      translation: card.translation,
      trainMode: {
        amountClicks: 0,
      },
      gameMode: {
        guessed: 0,
        mistakes: 0,
        attempts: 0,
      },
    }));
  });
  return statistic;
};

const mapCategories = (category, index) => ({
  image: cards[index][2].image,
  title: category,
  link: category.replace(/\s/g, '').toLowerCase(),
});

const initialStore = {
  play: JSON.parse(localStorage.getItem('play')),
  gameMode: JSON.parse(localStorage.getItem('gameMode')),
  categories: categories.map(mapCategories),
  cards,
  currentGame: initialCurrentGame,
  currentCategory: window.location.hash.split('/').pop(),
  gameFinish: false,
  statistics:
    JSON.parse(localStorage.getItem('statistics')) || initialStatistic(),
};

const reducer = (state = initialStore, action) => {
  switch (action.type) {
    case actions.STATISTIC_PLUS_CLICKED: {
      const currCategory = action.payload.category || state.currentCategory;
      const index = state.categories.find(
        (category) => category.link === currCategory,
      );
      const newStatistic = state.statistics[index.title].map((word) => {
        const updatedWord = word;

        if (updatedWord.word === action.payload.word) {
          updatedWord.trainMode.amountClicks += 1;
        }

        return updatedWord;
      });
      return {
        ...state,
        statistics: {
          ...state.statistics,
          [index.title]: newStatistic,
        },
      };
    }
    case actions.FINISH_GAME: {
      return {
        ...state,
        gameFinish: true,
        currentGame: initialCurrentGame,
      };
    }
    case actions.START_GAME: {
      const index = state.categories.findIndex(
        (cate) => cate.link === state.currentCategory,
      );
      const shuffledQuestions = [...shuffle(state.cards[index])];
      return {
        ...state,
        gameMode: true,
        gameFinish: false,
        currentGame: {
          ...state.currentGame,
          correct: 0,
          incorrect: 0,
          questions: shuffledQuestions,
          currentCard: shuffledQuestions[shuffledQuestions.length - 1],
          next: action.payload,
        },
      };
    }
    case actions.CORRECT_ANSWER: {
      const correctPlus = state.currentGame.correct + 1;
      const shuffledArray = state.currentGame.questions;
      shuffledArray.length -= 1;
      state.currentGame.next(shuffledArray[shuffledArray.length - 1]);
      const answers = [...state.currentGame.answers, action.payload];
      const index = state.categories.find(
        (cate) => cate.link === state.currentCategory,
      );
      const newStatistic = state.statistics[index.title].map(
        (wordStatistic) => {
          const updatedWordStatistic = wordStatistic;
          if (updatedWordStatistic.word === action.payload) {
            updatedWordStatistic.gameMode.guessed += 1;
            updatedWordStatistic.gameMode.attempts += 1;
          }
          return updatedWordStatistic;
        },
      );

      return {
        ...state,
        currentGame: {
          ...state.currentGame,
          correct: correctPlus,
          questions: shuffledArray,
          currentCard: shuffledArray[shuffledArray.length - 1],
          answers,
        },
        statistics: {
          ...state.statistics,
          [index.title]: newStatistic,
        },
      };
    }

    case actions.INCORRECT_ANSWER: {
      const index = state.categories.find(
        (cate) => cate.link === state.currentCategory,
      );
      const incorrectPlus = state.currentGame.incorrect + 1;
      const currentWord = state.currentGame.currentCard.word;
      const newStatistic = state.statistics[index.title].map(
        (wordStatistic) => {
          if (wordStatistic.word === currentWord) {
            const updatedWordStatistic = wordStatistic;
            updatedWordStatistic.gameMode.mistakes += 1;
            updatedWordStatistic.gameMode.attempts += 1;

            return updatedWordStatistic;
          }
          return wordStatistic;
        },
      );

      return {
        ...state,
        currentGame: {
          ...state.currentGame,
          incorrect: incorrectPlus,
        },
        statistics: {
          ...state.statistics,
          [index.title]: newStatistic,
        },
      };
    }
    case actions.SET_CURRENT_CATEGORY: {
      return {
        ...state,
        currentCategory: action.payload,
      };
    }
    case actions.ABBONDED_GAME: {
      return { ...state, gameMode: false, currentGame: initialCurrentGame };
    }
    case actions.CHANGE_MODE: {
      return {
        ...state,
        play: action.payload,
        currentGame: initialCurrentGame,
        gameMode: false,
      };
    }
    default:
      return state;
  }
};
export { reducer };
