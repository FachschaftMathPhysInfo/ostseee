import { applyMiddleware, createStore, combineReducers } from 'redux';
import { entitiesReducer, queriesReducer, queryMiddleware, NetworkOptions } from 'redux-query';
import superagentInterface from 'redux-query-interface-superagent';
import { BASE_PATH } from 'ostseee-web-common/';
import Cookies from 'js-cookie'
import { getSession } from './session';
export const getQueries = state => state.queries;
export const getEntities = state => state.entities;

const reducer = combineReducers({
  entities: entitiesReducer,
  queries: queriesReducer,
});
var authorizeRequest = function(token) {

    // This will be called on the request
    return function authorizeRequest(url,method,networkOptions:NetworkOptions) {
      networkOptions.headers["Authorization2"] = "Bearer " + Cookies.get('__session');
      //req.url = BASE_PATH+req.url
      //networkOptions.headers["Access-Control-Allow-Origin"]="*";
      let BASE_P = "/v1";
      return superagentInterface(BASE_P+url,method,networkOptions);
    }
  };

const store = createStore(
  reducer,
  applyMiddleware(queryMiddleware(authorizeRequest("test"), getQueries, getEntities)),
);

export default store;