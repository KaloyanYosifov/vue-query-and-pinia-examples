import axios from 'axios';
import { computed } from 'vue';
import { useInfiniteQuery } from '@tanstack/vue-query';
import { startTimeout } from '../utils.js';

export default function useFetchCharacters() {
    const opts = useInfiniteQuery({
        queryKey: ['characters'],
        async queryFn({ pageParam = 1 }) {
            const response = await axios.get(`http://localhost:3000/characters?page=${pageParam}`);
            
            await startTimeout(1000);
            
            return response.data;
        },
        getNextPageParam: (lastPage) => lastPage.nextPage,
    });
    
    return {
        ...opts,
        characters: computed(() => opts.data.value.pages.map(page => page.data).flat()),
    }
}
