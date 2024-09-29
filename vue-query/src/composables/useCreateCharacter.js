import axios from 'axios';
import { useMutation } from '@tanstack/vue-query';
import { startTimeout } from '../utils.js';

export default function useCreateCharacter() {
    return useMutation({
        async mutationFn(character) {
            await startTimeout(1000);
            
            return axios.post('http://localhost:3000/characters', character);
        }
    });
}
