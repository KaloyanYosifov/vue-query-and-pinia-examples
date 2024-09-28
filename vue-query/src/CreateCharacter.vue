<template>
  <div class="max-w-md mx-auto bg-gray-800 p-8 rounded-lg shadow-lg">
    <h2 class="text-2xl font-bold text-yellow-400 mb-6">Create Star Wars Character</h2>

    <CharacterForm v-model:character="character" @submit="onSubmit">
      <template #button-label>
        Create Character
      </template>
    </CharacterForm>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import CharacterForm from './CharacterForm.vue';

const character = ref({
  name: '',
  role: '',
  planet: '',
});
const onSubmit = () => {
  console.log('heeh');
};
</script>

