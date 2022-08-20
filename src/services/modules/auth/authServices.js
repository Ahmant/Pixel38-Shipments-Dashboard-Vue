import api from '@/services/axios';

export default {
    createSession() {
        return api.get('sanctum/csrf-cookie');
    },
    getUser() {
        return api.get('api/user');
    },
    register(data) {
        return api.post('api/auth/register', data)
    },
    login(data) {
        return api.post('api/auth/login', data)
    },
    logout() {
        return api.delete('api/auth/logout')
    },
    verifyEmail(userId, verificationCode) {
        return api.post('api/email-verification/verify/' + userId, { verification_code: verificationCode })
    }
}