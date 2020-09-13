import { alertActions } from './alert';

describe('alertActions', () =>{
    test('returns an action type with type `ALERT_SUCCESS`',() => {
        const action = alertActions.success('success');
        expect(action.type).toBe('ALERT_SUCCESS');        
        expect(action.message).toBe('success');        
    })
    test('returns an action type with type `ALERT_ERROR`',() => {
        const action = alertActions.error('error');
        expect(action.type).toBe('ALERT_ERROR');        
        expect(action.message).toBe('error');        
    })
    test('returns an action type with type `ALERT_CLEAR`',() => {
        const action = alertActions.clear();
        expect(action.type).toBe('ALERT_CLEAR');        
    })
})