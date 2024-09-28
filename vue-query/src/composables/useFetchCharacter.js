import axios from 'axios';
import { toRef } from '@vueuse/core';
import { useQuery } from '@tanstack/vue-query';

export default function useFetchCharacter({
    id,
} = {}) {
    const idToUse = toRef(id);
    
    return useQuery({
        queryKey: ['character', idToUse],
        async queryFn() {
            const response = await axios.get(`http://localhost:3000/characters/${idToUse.value}`);
            
            return response.data;
        }
    });
}
