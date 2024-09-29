import axios from 'axios';
import { computed } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import { startTimeout } from '../utils.js';

export default function useFetchPlanets() {
    const opts = useQuery({
        queryKey: ['planets'],
        async queryFn({ pageParam = 1 }) {
            const response = await axios.get(`http://localhost:3000/planets`);
            
            await startTimeout(1000);
            
            return response.data;
        },
    });
    
    return {
        ...opts,
        planets: computed(() => opts.data.value),
    }
}
