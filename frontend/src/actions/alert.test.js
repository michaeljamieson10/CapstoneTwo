import { alertActions } from './alert';
import { alertConstants } from '../constants/alert';

describe('alertActions', () =>{
    test('returns an action type with type `ALERT_SUCCESS`',() => {
        const action = alertActions.success('success');
        expect(action.type).toBe('ALERT_SUCCESS');        
        expect(action.message).toBe('success');        
    })
})