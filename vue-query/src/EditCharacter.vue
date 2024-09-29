<template>
  <div class="max-w-md mx-auto bg-gray-800 p-8 rounded-lg shadow-lg">
    <h2 class="text-2xl font-bold text-yellow-400 mb-6">Edit Star Wars Character</h2>

    <div v-if="isPending"  class="flex justify-center items-center">
      <Loader />
    </div>

    <div v-else-if="isError">Failed to fetch character with id {{ route.params.id }}</div>

    <div v-else-if="isUpdateError">Failed to update character! </div>

    <CharacterForm v-else v-model:character="characterToUpdate" :loading="isUpdating" @submit="onSubmit">
      <template #button-label>
        Edit Character
      </template>
    </CharacterForm>
  </div>
</template>

<script setup>
import { watchOnce } from '@vueuse/core';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import CharacterForm from './CharacterForm.vue';
import useFetchCharacter from './composables/useFetchCharacter.js';
import Loader from './Loader.vue';
import useUpdateCharacter from './composables/useUpdateCharacter.js';

const route = useRoute();
const router = useRouter();
const characterToUpdate = ref({});
const {
  data: character,
  isPending,
    isSuccess,
    isError,
} = useFetchCharacter({
  id: route.params.id,
});
const {
    isPending: isUpdating,
    isError: isUpdateError,
    update,
} = useUpdateCharacter();
const onSubmit = async () => {
  try {
    await update(characterToUpdate.value);
    router.push({
      name: 'home',
    });
  } catch {
    // nothing else matters
  }
};

watchOnce(() => isSuccess.value && character.value, () => characterToUpdate.value = {...character.value})
</script>

