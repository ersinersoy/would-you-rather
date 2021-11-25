import{getInitialData,saveQuestionAnswer,saveQuestion} from '../utils/api'
import{receiveUsers,addUserQuestion,addUserQuestionAnswer} from './users'
import {receiveQuestions,addQuestion,addQuestionAnswer} from './questions'
import {setAuthedUser} from './authedUser'
import { showLoading, hideLoading } from 'react-redux-loading'

let AUTHED_ID = ''

export function handleInitialData(){
    return(dispatch)=>{
        return getInitialData()
        .then(({users, questions})=>{
            dispatch(receiveUsers(users))
            dispatch(receiveQuestions(questions))
            dispatch(setAuthedUser(AUTHED_ID))
            
        })
    }
}

export function handleAddQuestion(optionOneText, optionTwoText) {
    return (dispatch, getState) => {
      const { authedUser } = getState();
      const author = authedUser;
      dispatch(showLoading());
      saveQuestion({
        optionOneText,
        optionTwoText,
        author
      }).then(question => {
        dispatch(addQuestion(question));
        dispatch(addUserQuestion(authedUser, question.id));
        dispatch(hideLoading());
      });
    };
  }
  
  export function handleAddQuestionAnswer(qid, answer) {
    return (dispatch, getState) => {
      const { authedUser } = getState();
      dispatch(showLoading());
  
      return saveQuestionAnswer({
        qid,
        answer,
        authedUser
      })
        .then(() => {
          dispatch(
            addQuestionAnswer({
              qid,
              answer,
              authedUser
            })
          );
          dispatch(addUserQuestionAnswer(qid, answer, authedUser));
        })
        .then(() => dispatch(hideLoading()));
    };
  }