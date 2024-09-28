<template>
  <form @submit.prevent="onSubmit">
    <div class="mb-4">
      <label for="name" class="block text-gray-400 mb-2">Character Name</label>
      <input
          type="text"
          id="name"
          v-model="localCharacter.name"
          class="w-full px-4 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
          placeholder="Enter character name"
          required
      />
    </div>

    <div class="mb-4">
      <label for="role" class="block text-gray-400 mb-2">Role</label>
      <input
          type="text"
          id="role"
          v-model="localCharacter.role"
          class="w-full px-4 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
          placeholder="Enter role (e.g., Jedi, Sith, Princess)"
          required
      />
    </div>

    <div class="mb-4">
      <label for="planet" class="block text-gray-400 mb-2">Planet</label>
      <input
          type="text"
          id="planet"
          v-model="localCharacter.planet"
          class="w-full px-4 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
          placeholder="Enter planet name"
          required
      />
    </div>

    <button
        type="submit"
        class="w-full bg-yellow-400 text-gray-900 font-bold py-2 px-4 rounded hover:bg-yellow-300 transition duration-300"
    >
      <slot name="button-label"/>
    </button>
  </form>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';
import { useVModel } from '@vueuse/core';

const props = defineProps({
  character: {
    type: Object,
    required: true,
  }
});
const emits = defineEmits(['submit', 'update:character']);
const localCharacter = useVModel(props, 'character', emits);

const onSubmit = () => {
  emits('submit');
};
</script>

