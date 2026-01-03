

export const SAVE_TOKENS_CONSTANT = {
    ACCESS_TOKEN: '@ACCESS_TOKEN',
    REFRESH_TOKEN: '@REFRESH_TOKEN',
    RESET_PASSWORD_TOKEN: '@RESET_PASSWORD_TOKEN',
};
export const USER_AUTH = '@userauth';

export const typeConstants = {
    SIGNUP: 'SIGNUP',
    LOGIN: 'LOGIN',
    OTP: 'OTP',
    FORGOT_OTP: 'FORGOT_OTP',
    RESEND_OTP: 'RESEND_OTP',
    UPDATE_EMAIL: 'UPDATE_EMAIL',
    PROFILEUPDATE: 'PROFILEUPDATE',
    PROFILEUPLOAD: 'PROFILEUPLOAD',
    CHECK_AUTH: 'CHECK_AUTH',
    LOGOUT_AUTH: 'LOGOUT_AUTH',
    DELETE_AUTH: 'DELETE_DELETE',
    GET_USER_BY_ID: 'GET_USER_BY_ID',
    FORGOT_PASSWORD: 'FORGOT_PASSWORD',
    RESET_PASSWORD: ' RESET_PASSWORD',
    UPDATE_USER_INFO: 'UPDATE_USER_INFO',
    FORGOT_PASSWORD_OTP: 'FORGOT_PASSWORD_OTP',
    ADD_VEHICLE: 'ADD_VEHICLE',
    UPLOAD_DOCUMENTS: 'UPLOAD_DOCUMENTS',
};



// Screen Types for better organization
export const SCREEN_TYPES = {
    PUBLIC: 'public', // No authentication required
    EMAIL_VERIFICATION: 'email_verification', // Requires signup but email not verified
    PROFILE_SETUP: 'PROFILE_SETUP', // Email verified but business profile incomplete
    PRIVATE: 'private', // All setup complete
};
