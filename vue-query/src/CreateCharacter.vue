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
import useCreateCharacter from './composables/useCreateCharacter.js';

const character = ref({
  name: '',
  role: '',
  planet: '',
});

const router = useRouter();
const { isPending, isError, create } = useCreateCharacter();
const onSubmit = async () => {
  try {
    await create(character.value);

    router.push({
      name: 'home'
    });
  } catch {
    // do nothing, we have isError
  }
};
</script>

