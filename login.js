import { writeFileSync } from 'node:fs';
import tough from 'tough-cookie';

// // https://forums.iracing.com/discussion/15068/general-availability-of-data-api/p1
// console.log(createHash('sha256').update(`${password}${email}`).digest('base64'));
// process.exit(1);
// remember to enable legacy authentication in your account settings

const response = await fetch('https://members-ng.iracing.com/auth', {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json',
	},
	body: JSON.stringify({
		email: process.env.EMAIL,
		password: process.env.PASSWORD,
	}),
});

const { authcode } = await response.json();

const cookieJar = tough.parse(response.headers.get('set-cookie')).clone();
cookieJar.key = 'authtoken_members';
cookieJar.value = JSON.stringify({
	authtoken: {
		authcode,
		email: process.env.EMAIL,
	},
});

writeFileSync(process.env.COOKIE_JAR, cookieJar.toString());
console.log('ok');
