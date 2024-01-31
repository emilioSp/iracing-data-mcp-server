import { readFileSync } from 'fs';
// https://ir-core-sites.iracing.com/members/member_images/clubs/west_club.jpg

const authCookie = readFileSync(process.env.AUTHCOOKIE_FILE_NAME, 'utf8');

const headers = new Headers();
headers.append('Cookie', authCookie);

const response = await fetch('https://members-ng.iracing.com/data/doc', {
  method: 'GET',
  headers,
  redirect: 'follow'
});

const data = await response.text();
console.log(data);
