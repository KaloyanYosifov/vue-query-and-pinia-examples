<template>
  <div class="container mx-auto py-12 px-4">
    <h1 class="text-5xl font-bold mb-4 text-center text-yellow-400">Star Wars Characters</h1>

    <div
        v-if="isPending"
        class="flex justify-center items-center"
    >
      <Loader />
    </div>

    <div v-else>
      <div class="flex justify-center mb-12">
        <RouterLink
            to="/create"
            class="bg-yellow-400 text-gray-900 font-bold py-2 px-4 rounded hover:bg-yellow-300 transition duration-300"
        >
          Create Character
        </RouterLink>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-4">
        <CharacterListItem v-for="character in characters" :character="character" />
      </div>

      <div v-if="hasNextPage" class="flex justify-center items-center">
        <Button type="button" class="relative" :disabled="isFetchingNextPage" @click="fetchNextPage">
          <span v-if="isFetchingNextPage" class="absolute flex justify-center items-center w-full left-0">
            <Loader color="#000" :size="24" />
          </span>

          <span :class="{ 'opacity-0': isFetchingNextPage }">Load More</span>
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import useFetchCharacters from './composables/useFetchCharacters.js';
import CharacterListItem from './CharacterListItem.vue';
import Button from './Button.vue';
import Loader from './composables/Loader.vue';

const {
  isPending,
  hasNextPage,
  characters,
  fetchNextPage,
  isFetchingNextPage,
} = useFetchCharacters();
</script>

