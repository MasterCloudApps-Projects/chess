import { messageManager }  from '../../main/message.js';

describe('Create message', () => {
    test('Create message test', () => {
        let data = { value: 'message', key: 'test' };
        let result = messageManager.createMessage(data);
        expect(result.error).toBeFalsy();
        expect(result.data).toBe(data);
    });
});

describe('Create message error', () => {
    test('Create message error test', () => {
        let message = "error message test";
        let result = messageManager.createErrorMessage(message);
        expect(result.error).toBeTruthy();
        expect(result.errorMessage).toBe(message);
    });
});
