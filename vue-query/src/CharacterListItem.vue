<template>
  <div class="bg-gray-800 rounded-lg shadow-xl overflow-hidden cursor-pointer" @click="goToCharacter">
    <img src="https://via.placeholder.com/400x250" alt="Character Image" class="w-full h-48 object-cover">

    <div class="p-6">
      <h2 class="text-2xl font-bold mb-2 text-yellow-300">{{ character.name }}</h2>
      <p class="text-gray-400 mb-1">Role: <span class="text-white">{{ character.role }}</span></p>
      <p class="text-gray-400">Planet: <span class="text-white">{{ character.planet }}</span></p>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  character: {
    type: Object,
    required: true,
  }
});

const router = useRouter();

const goToCharacter = () => {
  router.push({
    name: 'character-edit',
    params: {
      id: props.character.id
    }
  });
}
</script>

