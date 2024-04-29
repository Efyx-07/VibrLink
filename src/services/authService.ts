import type { ImportMetaEnv } from '../vite-env';

const hostName: ImportMetaEnv = import.meta.env.VITE_BACKEND_URL;

export async function login(email: string, password: string) {

    try {
        const response: Response = await fetch(`${hostName}/user/login`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password
            }) 
        });

        if (response.ok) {
            const data = await response.json();
            return data

        } else {
            throw new Error('Error while connecting: ' + response.statusText);
        }

    } catch (error) {
        throw new Error('Error while connecting: ' + error);
    }
};