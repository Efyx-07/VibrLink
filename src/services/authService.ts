import type { ImportMetaEnv } from '../vite-env';

// backend server address
const hostName: ImportMetaEnv = import.meta.env.VITE_BACKEND_URL;

// backend query for user login
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
            return data;

        } else {
            throw new Error('Error while connecting: ' + response.statusText);
        }

    } catch (error) {
        throw new Error('Error while connecting: ' + error);
    }
};

// backend query to send a reset password link
export async function sendResetLink(email: string) {

    try {

        const response: Response =  await fetch(`${hostName}/passwordRoute/forgot-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',    
            },
            body: JSON.stringify({
                email
            }),
        });

        if (response.ok) {
            const data = await response.json();
            return data;

        } else {
            throw new Error('Error while asking reset email: ' + response.statusText);
        }

    } catch (error) {
        throw new Error('Error while asking reset email :' + error);
    }
}