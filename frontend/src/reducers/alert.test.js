import { alertConstants } from '../constants/alert';
import { alertActions } from  '../actions/alert';
import { alert } from './alert';

describe('alertActions', () =>{
    // test('returns an action type with type `ALERT_SUCCESS`',() => {
        // const newState = alert(undefined, {type: alertConstants.SUCCESS});
        // expect(newState).toBe({"message": undefined, "type": "alert-success"});        
        // expect(action.message).toBe('success');        
    // })
    test('returns an action type with type `ALERT_SUCCESS`',() => {
        const newState = alert(undefined,{});
        // expect(newState).toBe({"message": undefined, "type": "alert-success"});        
        // expect(newState).toBe({});        
        // expect(action.message).toBe('success');        
    })
    // test('returns an action type with type `ALERT_ERROR`',() => {
        // const action = alertActions.error('error');
        // expect(action.type).toBe('ALERT_ERROR');        
        // expect(action.message).toBe('error');        
    // })
    // test('returns an action type with type `ALERT_CLEAR`',() => {
        // const action = alertActions.clear();
        // expect(action.type).toBe('ALERT_CLEAR');        
    // })
})