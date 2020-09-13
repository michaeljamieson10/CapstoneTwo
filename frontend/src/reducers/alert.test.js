import { alertConstants } from '../constants/alert';
import { alertActions } from  '../actions/alert';
import { alert } from './alert';

describe('alertActions', () =>{

    test('returns an action type with type `ALERT_SUCCESS`',() => {
        const newState = alert(undefined,{});
        expect(newState).toMatchObject({})
    })
    test('returns an action type with type `ALERT_SUCCESS trololol`',() => {
        const newState = alert('success',{ type: alertActions.success('success')});
        // const newState = alert('success',{ type: alertActions.success('success')});
        expect(newState).toBe('success');        
    })
    test('returns an action type with type `ALERT_ERROR`',() => {
        const newState = alert('error',{ type: alertActions.error()});
        expect(newState).toBe('error');        
    })
    test('returns an action type with type `ALERT_CLEAR`',() => {
        const newState = alert(undefined,{ type: alertActions.clear()});
        expect(newState).toMatchObject({})
    })
})