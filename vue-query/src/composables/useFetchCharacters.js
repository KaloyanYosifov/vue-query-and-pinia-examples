import axios from 'axios';
import { computed } from 'vue';
import { useInfiniteQuery } from '@tanstack/vue-query';
import { startTimeout } from '../utils.js';
import { toRef } from '@vueuse/core';

export default function useFetchCharacters({ planet = null }) {
    const planetToUse = toRef(planet);
    const opts = useInfiniteQuery({
        queryKey: ['characters', planetToUse],
        refetchOnWindowFocus: true,
        async queryFn({ pageParam = 1 }) {
            const url = new URL('http://localhost:3000/characters');
            url.searchParams.set('page', pageParam);
            
            if (planetToUse.value) {
                url.searchParams.set('planet', planetToUse.value);
            }
            
            const response = await axios.get(url.toString());
            
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
