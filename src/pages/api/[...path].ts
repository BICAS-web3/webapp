import Cookies from 'cookies';
import { IncomingMessage, ServerResponse } from 'http';
import httpProxy from 'http-proxy';
import type { NextApiRequest, NextApiResponse } from 'next';
import url from 'url';

const API_URL = process.env.BACKEND_API_URL;
const proxy = httpProxy.createProxyServer();

export const config = {
	api: {
		bodyParser: false,
	},
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	return new Promise<void>((resolve, reject) => {
		const pathname = url.parse(req.url as string).pathname;
		const cookies = new Cookies(req, res);
		const authToken = cookies.get('token');

		const isLogout = ['logout'].map(v => pathname?.endsWith(v)).some(v => !!v);
		const isLogin = ['auth'].map(v => pathname?.endsWith(v)).some(v => !!v);

		req.url = (req.url as string).replace(/^\/api/, '');
		req.headers.cookie = '';

		if (isLogout) {
			delete req.headers['Authorization'];
			cookies.set('token', null);

			res.status(200).json({ loggedIn: false });
			resolve();
		}

		if (!isLogin && authToken) {
			req.headers['Authorization'] = `Bearer ${authToken}`;
		}

		if (isLogin) {
			proxy.once('proxyRes', interceptLoginResponse);
		}

		proxy.once('error', () => {
			res.status(503);
		});

		proxy.web(req, res, {
			target: API_URL,
			autoRewrite: false,
			selfHandleResponse: isLogin,
		});

		function interceptLoginResponse(
			proxyRes: IncomingMessage,
			req: IncomingMessage,
			res: ServerResponse<IncomingMessage>
		) {
			let apiResponseBody = '';

			proxyRes.on('data', chunk => {
				apiResponseBody += chunk;
			});

			proxyRes.on('end', () => {
				try {
					if (!proxyRes.statusCode || proxyRes.statusCode >= 400) {
						throw new Error();
					}

					const { jwt } = JSON.parse(apiResponseBody);

					const cookies = new Cookies(req, res);
					cookies.set('token', jwt, {
						httpOnly: true,
						sameSite: 'lax',
					});

					// @ts-ignore
					res.status(200).json({ loggedIn: true });
					res.end();
					resolve();
				} catch (err) {
					// @ts-ignore
					res.status(403).end();
					reject();
				}
			});
		}
	});
}
