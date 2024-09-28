import axios from 'axios';
import { toRef } from '@vueuse/core';
import { useQuery } from '@tanstack/vue-query';

export default function useFetchCharacters({
    page = 1,
} = {}) {
    const pageToUse = toRef(page);
    
    return useQuery({
        queryKey: ['characters', pageToUse],
        async queryFn() {
            const response = await axios.get(`http://localhost:3000/characters?page=${pageToUse.value}`);
            
            return response.data;
        }
    });
}
