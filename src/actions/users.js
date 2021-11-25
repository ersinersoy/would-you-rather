export const RECEIVE_USERS ='RECEIVE_USERS'
export const ADD_USER_QUESTION = "ADD_USER_QUESTION";
export const ADD_USER_QUESTION_ANSWER = "ADD_USER_QUESTION_ANSWER";

export function receiveUsers(users){
    return{
        type: RECEIVE_USERS,
        users,
    }
}

export function addUserQuestion(authedUser, id) {
    return {
      type: ADD_USER_QUESTION,
      authedUser,
      id
    };
  }
  
  export function addUserQuestionAnswer(qid, answer, authedUser) {
    return {
      type: ADD_USER_QUESTION_ANSWER,
      qid,
      answer,
      authedUser
    };
  }