import { storage } from '../storage.js';
export const member = async () => {
    const store = storage.getStore();
    if (!store) {
        throw new Error('Storage context not found');
    }
    const { authCookie } = store;
    const headers = new Headers();
    headers.append('Cookie', authCookie);
    const response = await fetch('https://members-ng.iracing.com/data/member/get?include_licenses=true&cust_ids=900937', {
        method: 'GET',
        headers,
        redirect: 'follow',
    }).then((response) => response.json());
    const data = await fetch(response.link).then((response) => response.json());
    console.log(data.members[0].licenses);
};
//# sourceMappingURL=member.js.map