<template>
  <form @submit.prevent="onSubmit">
    <div class="mb-4">
      <label class="block text-gray-400 mb-2" for="name">Character Name</label>
      <input
          id="name"
          v-model="localCharacter.name"
          class="w-full px-4 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
          placeholder="Enter character name"
          required
          type="text"
      />
    </div>

    <div class="mb-4">
      <label class="block text-gray-400 mb-2" for="role">Role</label>
      <input
          id="role"
          v-model="localCharacter.role"
          class="w-full px-4 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
          placeholder="Enter role (e.g., Jedi, Sith, Princess)"
          required
          type="text"
      />
    </div>

    <div class="mb-4">
      <label class="block text-gray-400 mb-2" for="planet">Planet</label>
      <input
          id="planet"
          v-model="localCharacter.planet"
          class="w-full px-4 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
          placeholder="Enter planet name"
          required
          type="text"
      />
    </div>

    <Button class="w-full relative" type="submit">
      <span v-if="loading" class="absolute flex justify-center items-center w-full left-0">
        <Loader :size="24" color="#000"/>
      </span>

      <span :class="{ 'opacity-0': loading }">
        <slot name="button-label"/>
      </span>
    </Button>
  </form>
</template>

<script setup>
import Button from './Button.vue';
import { useVModel } from '@vueuse/core';
import { defineProps, defineEmits } from 'vue';
import Loader from './Loader.vue';

const props = defineProps({
  character: {
    type:     Object,
    required: true,
  },
  loading:   {
    type:    Boolean,
    default: false,
  }
});
const emits = defineEmits([
  'submit',
  'update:character'
]);
const localCharacter = useVModel(props, 'character', emits);

const onSubmit = () => {
  emits('submit');
};
</script>

