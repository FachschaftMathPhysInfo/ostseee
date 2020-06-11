import { applyMiddleware, createStore, combineReducers } from 'redux';
import { entitiesReducer, queriesReducer, queryMiddleware, NetworkOptions } from 'redux-query';
import superagentInterface from 'redux-query-interface-superagent';
import { BASE_PATH } from 'ostseee-web-common/';

export const getQueries = state => state.queries;
export const getEntities = state => state.entities;
const initialState = {
  language:"de"
}
export const CHANGE_LANGUAGE = "CHANGE_LANGUAGE"

const localizeReducer =(state,action)=>{
  if (typeof state === 'undefined') {
    return initialState
  }
  if (action.type==CHANGE_LANGUAGE){
    state.language = action.langCode
  }
  return state
}
export const CHANGE_ANSWER = "CHANGE_ANSWER"
const initialAnswerState = {
  answers:{}
}
const answersReducer =(state=initialAnswerState,action)=>{
  if(action.type==CHANGE_ANSWER){
    state.answers[`${action.questionId}:${action.concerns}`]= {values:action.value,notApplicable:action.notApplicable}
  }
  return state
}
export const changeAnswer = (questionId,concerns,value,notApplicable=false) =>{
  return {
    type: CHANGE_ANSWER,
    questionId,
    value,
    concerns
  }
}
export const changeLanguage = langCode =>{
  return {
    type: CHANGE_LANGUAGE,
    langCode
  }
}
const reducer = combineReducers({
  entities: entitiesReducer,
  queries: queriesReducer,
  localize: localizeReducer,
  answers : answersReducer
});
var authorizeRequest = function(token) {

    // This will be called on the request
    return function authorizeRequest(url,method,networkOptions:NetworkOptions) {
      //req.header.authorization = "Bearer " + token;
      //req.url = BASE_PATH+req.url
      networkOptions.headers["Access-Control-Allow-Origin"]="*";
      let BASE_P = "/v1/";
      return superagentInterface(BASE_P+url,method,networkOptions);
    }
  };

const store = createStore(
  reducer,
  applyMiddleware(queryMiddleware(authorizeRequest("test"), getQueries, getEntities)),
);

export default store;