<template>
  <HalfCircleSpinner
      :animation-duration="1000"
      :size="size"
      :color="color"
  />
</template>

<script setup>
import { defineProps } from 'vue';
import { HalfCircleSpinner } from 'epic-spinners';

defineProps({
  color: {
    type: String,
    default: '#fde047',
  },

  size: {
    type: Number,
    default: 60,
  }
});
</script>
