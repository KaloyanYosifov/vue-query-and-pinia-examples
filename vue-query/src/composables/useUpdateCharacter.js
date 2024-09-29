import axios from 'axios';
import { useQueryClient } from '@tanstack/vue-query';
import { useMutation } from '@tanstack/vue-query';
import { startTimeout } from '../utils.js';

export default function useUpdateCharacter() {
    const queryClient = useQueryClient();
    const opts = useMutation({
        async mutationFn(character) {
            await startTimeout(1000);
            
            return axios.put(`http://localhost:3000/characters/${character.id}`, character);
        }
    });
    // having a method wrapped in the composable, makes it easily testable and separates concerns
    // this create invalidates
    const update = async (character) => {
        await opts.mutateAsync(character); // alternative to mutate (usually async is better one if you want to do more stuff)
        await queryClient.resetQueries({ queryKey: ['characters'] }); // alternatively invalidateQueries can be used
        await queryClient.resetQueries({ queryKey: ['characters', character.id] });
    };
    
    return {
        ...opts,
        update,
    }
}
