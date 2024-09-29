<template>
  <div class="max-w-md mx-auto bg-gray-800 p-8 rounded-lg shadow-lg">
    <h2 class="text-2xl font-bold text-yellow-400 mb-6">Create Star Wars Character</h2>

    <div
        v-if="isError"
        class="flex justify-center items-center text-red-200 mb-4"
    >
      An error has occurred... ;(
    </div>

    <CharacterForm v-model:character="character" :loading="isPending" @submit="onSubmit">
      <template #button-label>
        Create Character
      </template>
    </CharacterForm>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import CharacterForm from './CharacterForm.vue';
import { useQueryClient } from '@tanstack/vue-query';
import useCreateCharacter from './composables/useCreateCharacter.js';

const character = ref({
  name: '',
  role: '',
  planet: '',
});

const router = useRouter();
const queryClient = useQueryClient();
const { isPending, isError, mutateAsync } = useCreateCharacter();
const onSubmit = async () => {
  try {
    await mutateAsync(character.value); // alternative to mutate (usually async is better one if you want to do more stuff)
    await queryClient.resetQueries({ queryKey: ['characters'] }); // alternatively invalidateQueries can be used
    router.push({
      name: 'home'
    });
  } catch {
    // do nothing, we have isError
  }
};
</script>

