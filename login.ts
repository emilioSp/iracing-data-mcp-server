import { writeFileSync } from 'node:fs';
import tough from 'tough-cookie';

interface AuthResponse {
  authcode: string;
}

interface AuthToken {
  authcode: string;
  email: string;
}

if (!process.env.EMAIL || !process.env.PASSWORD || !process.env.COOKIE_JAR) {
  throw new Error('Required environment variables are not set');
}

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

const { authcode } = await response.json() as AuthResponse;

const cookieHeader = response.headers.get('set-cookie');
if (!cookieHeader) {
  throw new Error('No cookie header received');
}

const cookieJar = tough.parse(cookieHeader)?.clone();
if (!cookieJar) {
  throw new Error('Failed to parse cookie. Please first login to iRacing and try again.');
}

cookieJar.key = 'authtoken_members';
cookieJar.value = JSON.stringify({
  authtoken: {
    authcode,
    email: process.env.EMAIL,
  } satisfies AuthToken,
});

writeFileSync(process.env.COOKIE_JAR, cookieJar.toString());
console.log('ok'); 