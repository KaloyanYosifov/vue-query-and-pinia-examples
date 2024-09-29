<template>
  <button
      class="bg-yellow-400 text-gray-900 font-bold py-2 px-4 rounded hover:bg-yellow-300 transition duration-300"
      :type="type"
  >
    <slot />
  </button>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  type: {
    type: String,
    default: 'button',
  }
});
</script>

