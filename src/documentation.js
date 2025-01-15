import { readFileSync } from 'node:fs';
import { writeFileSync } from 'node:fs';

const authCookie = readFileSync(process.env.COOKIE_JAR, 'utf8');

const headers = new Headers();
headers.append('Cookie', authCookie);

const response = await fetch('https://members-ng.iracing.com/data/doc', {
	method: 'GET',
	headers,
	redirect: 'follow',
});

const data = await response.text();
writeFileSync('./documentation.json', data);
console.log('ok');
