import axios from 'axios';
import { useQueryClient } from '@tanstack/vue-query';
import { useMutation } from '@tanstack/vue-query';
import { startTimeout } from '../utils.js';

export default function useCreateCharacter() {
    const queryClient = useQueryClient();
    const opts = useMutation({
        async mutationFn(character) {
            await startTimeout(1000);
            
            return axios.post('http://localhost:3000/characters', character);
        }
    });
    // having a method wrapped in the composable, makes it easily testable and separates concerns
    // this create invalidates
    const create = async (character) => {
        await opts.mutateAsync(character); // alternative to mutate (usually async is better one if you want to do more stuff)
        await queryClient.resetQueries({ queryKey: ['characters'] }); // alternatively invalidateQueries can be used
    };
    // the second method is for showcasing purpose (in production you would ideally choose one)
    const createWithSettingData = async (character) => {
        const { data: newCharacter } = await opts.mutateAsync(character); // alternative to mutate (usually async is better one if you want to do more stuff)
        
        // problems with this is you have to know which query type you are using
        // which causes problems if we change from infinite query to just a plain query
        queryClient.setQueryData(['characters'], (data) => ({
            ...data,
            pages: data.pages.map((page, index) => {
                return {
                    ...page,
                    data: [
                        newCharacter,
                        ...page.data.slice(0, 2),
                    ]
                };
            }),
        }));
    };
    // the second method is for showcasing purpose (in production you would ideally choose one)
    const createWithInvalidatingData = async (character) => {
        await opts.mutateAsync(character); // alternative to mutate (usually async is better one if you want to do more stuff)
        await queryClient.invalidateQueries({ queryKey: ['characters'] }); // alternatively invalidateQueries can be used
    };
    
    return {
        ...opts,
        create,
        createWithSettingData,
        createWithInvalidatingData,
    }
}
