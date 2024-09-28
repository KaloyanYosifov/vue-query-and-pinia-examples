<template>
  <div class="max-w-md mx-auto bg-gray-800 p-8 rounded-lg shadow-lg">
    <h2 class="text-2xl font-bold text-yellow-400 mb-6">Edit Star Wars Character</h2>

    <AtomSpinner v-if="isPending" :animation-duration="1000" :size="60" color="#ff1d5e" />

    <div v-else-if="isError">Failed to fetch character with id {{ route.params.id }}</div>

    <CharacterForm v-else v-model:character="character" @submit="onSubmit">
      <template #button-label>
        Edit Character
      </template>
    </CharacterForm>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import CharacterForm from './CharacterForm.vue';
import useFetchCharacter from './composables/useFetchCharacter.js';

const route = useRoute();
const {
  data: character,
  isPending,
    isError,
} = useFetchCharacter({
  id: route.params.id,
});
const onSubmit = () => {
  console.log('heeh');
};
</script>

