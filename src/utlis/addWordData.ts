import type { WordData } from "../types/types";

const API_URL = 'http://localhost:5000/addWord.php';

export const addWordData = async (body: WordData) => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(body),
        })
        console.log('Response status:', response.status);
        console.log('Response ok:', response.ok);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `HTTP Error: ${response.status}`);
        }
        return response;
    } catch (error) {
        console.error('Fetch error:', error);
         throw error;
    }
}