import { actions } from "./constants";
import { categories, cards } from "./resources";
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

const initialCurrentGame = {
  answers: [],
  correct: 0,
  incorrect: 0,
  questions: [],
  currentCard: null,
  next: null
};

const initialStore = {
  play: localStorage.getItem("play") === "true" ? true : false,
  gameMode: false,
  categories: categories,
  cards: [],
  currentGame: initialCurrentGame,
  currentCategory: null,
  gameFinish: false,
  statistics: localStorage.getItem("statistic") || null
};
const reducer = (state = initialStore, action) => {
  switch (action.type) {
    case actions.FINISH_GAME: {
      console.log("FINISHED_GAME");
      return {
        ...state,
        gameFinish: true,
        currentGame: initialCurrentGame
      };
    }
    case actions.NEXT_QUESTION: {
      break;
    }
    case actions.START_GAME: {
      const shuffledArray = shuffle(state.cards);
      const shuffledQuestions = shuffle([...shuffledArray]);
      return {
        ...state,
        cards: shuffledArray,
        gameMode: true,
        currentGame: {
          ...state.currentGame,
          correct: 0,
          incorrect: 0,
          questions: shuffledQuestions,
          currentCard: shuffledQuestions[shuffledQuestions.length - 1],
          next: action.payload
        }
      };
    }
    case actions.CORRECT_ANSWER: {
      const correctPlus = state.currentGame.correct + 1;
      const shuffledArray = state.currentGame.questions;
      shuffledArray.length = shuffledArray.length - 1;
      state.currentGame.next(shuffledArray[shuffledArray.length - 1]);
      const answers = [...state.currentGame.answers, action.payload];
      return {
        ...state,
        currentGame: {
          ...state.currentGame,
          correct: correctPlus,
          questions: shuffledArray,
          currentCard: shuffledArray[shuffledArray.length - 1],
          answers: answers
        }
      };
    }

    case actions.INCORRECT_ANSWER: {
      const incorrectPlus = state.currentGame.incorrect + 1;
      return {
        ...state,
        currentGame: {
          ...state.currentGame,
          incorrect: incorrectPlus
        }
      };
    }
    case actions.ABBONDED_GAME: {
      return {
        ...state,
        currentGame: initialCurrentGame,
        gameMode: false
      };
    }
    case actions.START_TRAIN: {
      break;
    }
    case actions.UPDATE_STATISTIC: {
      break;
    }
    case actions.REFRESH_DECK: {
      return {
        ...state,
        deck: action.payload
      };
    }
    case actions.SET_CARDS: {
      return {
        ...state,
        cards: action.payload.cards,
        currentCategory: action.payload.currentCategory
      };
    }
    case actions.CHANGE_MODE: {
      return {
        ...state,
        play: action.payload
      };
    }
    default:
      return state;
  }
};
export { reducer };
