import moment from 'moment';

const domain = '.myads.com';

const buildCookie = (key, value) => {
    // build cookie header
    const expires = moment.utc().add('28', 'days');
    const secure = process.env.IS_SECURE ? '; Secure' : '';
    return `${key}=${value}; Max-Age=${expires.unix()}; Expires=${expires.toDate().toGMTString()}; Path=/; Domain=${domain}; SameSite=None${secure}`;
};

const routes = [
    {
        method: 'GET',
        path: '/health',
        options: {
            description: 'health check to ensure service is running',
        },
        handler: () => 'ok.',
    },
    {
        method: 'GET',
        path: '/article-from-social',
        handler: (request, h) => {
            const cookieName = 'from_social_serverside';

            const response = h.file('article-from-social.html');

            // read header
            console.log(request.state[cookieName]);
            if (!request.state[cookieName]) {
                const cookie = buildCookie(cookieName, moment.utc());
                response.header('set-cookie', cookie);
            }

            // return
            return response;
        },
    },
    {
        method: 'GET',
        path: '/article-with-params',
        handler: (request, h) => {
            const cookieName = 'with_params_serverside';

            const response = h.file('article-with-params.html');

            // read header
            console.log(request.state[cookieName]);
            if (!request.state[cookieName]) {
                const cookie = buildCookie(cookieName, moment.utc());
                response.header('set-cookie', cookie);
            }

            // return
            return response;
        },
    },
    {
        method: 'GET',
        path: '/article-no-params',
        handler: (request, h) => {
            const cookieName = 'no_params_serverside';

            const response = h.file('article-no-params.html');

            // read header
            console.log(request.state[cookieName]);
            if (!request.state[cookieName]) {
                const cookie = buildCookie(cookieName, moment.utc());
                response.header('set-cookie', cookie);
            }

            // return
            return response;
        },
    },
];
export default routes;
