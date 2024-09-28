<template>
  <div class="container mx-auto py-12 px-4">
    <h1 class="text-5xl font-bold mb-4 text-center text-yellow-400">Star Wars Characters</h1>

    <div class="flex justify-center mb-12">
      <RouterLink
          to="/create"
          class="bg-yellow-400 text-gray-900 font-bold py-2 px-4 rounded hover:bg-yellow-300 transition duration-300"
      >
        Create Character
      </RouterLink>
    </div>

    <AtomSpinner v-if="isPending" :animation-duration="1000" :size="60" color="#ff1d5e" />

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <CharacterListItem v-for="character in characters" :character="character" />
    </div>
  </div>
</template>

<script setup>
import { AtomSpinner } from 'epic-spinners';
import useFetchCharacters from './composables/useFetchCharacters.js';
import CharacterListItem from './CharacterListItem.vue';

const { data: characters, isPending } = useFetchCharacters();
</script>

