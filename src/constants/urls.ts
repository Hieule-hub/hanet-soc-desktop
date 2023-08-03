const urls = {
    // API_URL: process.env.NEXT_PUBLIC_API_URL,
    // API_URL: 'http://localhost:1420/api',
    // VENDOR_API_URL: 'https://api-ida.f88.co/auth/main/auth/v1.1/login',
    //API_URL: 'https://91a2-171-246-102-231.ap.ngrok.io',
    // API_URL: 'https://reqres.in/api/login',
    API_URL: process.env.NEXT_PUBLIC_API_SERVER_URL,
    WEB_URL: process.env.NEXT_PUBLIC_WEB_URL
};

export const urlsIgnore = [
    '/forgot-password',
    '/login-first',
    '/login',
    '/sign-up',
    '/verify-email',
    '/reset-password'
];

export default urls;
