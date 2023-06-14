export const serverPort = 4300;

export const sessionConfig = {
	secret: 'keyboard cat',
	resave: true,
	saveUninitialized: true,
	cookie: { httpOnly: true, secure: true },
};

export const morganLogFormat = 'combined';

export const dbJsonPath = './storage/db.json';

export const gifUrls =
	'https://hook.eu1.integromat.com/10r7cd1lcwve9j241i98k1f3nn4o3j8g';

export const validApiKeys = [
	'VALID_API_KEY_1',
	'VALID_API_KEY_2',
	'VALID_API_KEY_3',
];
