import { writeFileSync } from 'fs';
import { createHash } from 'node:crypto';
import tough from 'tough-cookie';

// Define the email and password
const email = process.env.EMAIL;
const password = process.env.PASSWORD;

const response = await fetch('https://members-ng.iracing.com/auth', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: email,
    password: createHash('sha256').update(`${password}${email}`).digest('base64')
  })
});

const { authcode } = await response.json();

const authCookie = tough.parse(response.headers.get('set-cookie')).clone();
authCookie.key = 'authtoken_members';
authCookie.value = JSON.stringify({
  authtoken:
    {
      authcode,
      email
    }
});

writeFileSync(process.env.AUTHCOOKIE_FILE_NAME, authCookie.toString());
console.log('ok');
