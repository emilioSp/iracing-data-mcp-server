import { readFileSync } from 'node:fs';
const authCookie = readFileSync(process.env.COOKIE_JAR, 'utf8');

const headers = new Headers();
headers.append('Cookie', authCookie);

const response = await fetch(
	'https://members-ng.iracing.com/data/team/get?team_id=364887',
	{
		method: 'GET',
		headers,
		redirect: 'follow',
	},
).then((response) => response.json());

const data = await fetch(response.link).then((response) => response.json());
console.log(data);
