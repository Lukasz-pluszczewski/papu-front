import createBreeze, { connect as breezeConnect } from 'redux-breeze';
import reduxBetterPromisePlugin from 'redux-breeze-plugin-better-promise';
import breezeDefinitions from '../actions';

const breeze = createBreeze(breezeDefinitions, undefined, reduxBetterPromisePlugin); // eslint-disable-line no-undefined

export default breeze;

export const combineReducers = breeze.combineReducers;
export const getAction = breeze.getAction;
export const connect = breezeConnect;
