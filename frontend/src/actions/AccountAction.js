export const SAVE_PROFILE = 'SAVE_PROFILE';

export function saveProfile(params) {
    return {
        type: SAVE_PROFILE,
        params
    }
}
