import state from '@/store/state';
import mutations from '@/store/mutations';

describe('mutations', () => {
    it('toggleGeolocationAvailability', () => {
        let value = false;
        let func = mutations.toggleGeolocationAvailability(state, value);
        expect(func).toBeUndefined();
    });
});
