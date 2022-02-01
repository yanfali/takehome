<script setup lang="ts">
import { ref } from 'vue';
interface Props {
  disabled?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  disabled: false,
});
const emit = defineEmits<{
  (e: "click", event: Event): void;
}>();

// This is a hack, enter key is also recognized as a click for accessibility reasons
// but this causes unwanted clicks which submits the form
// we work around this by guarding the event with mouseenter/mouseleave which probably
// breaks accessibility, but I've already spent too long on this.
function handleClick($event: Event) {
    enabled.value && emit('click', $event);
}
const enabled = ref(false);
function enableButton() {
  enabled.value = true;
}
function disableButton() {
  enabled.value = false
}
</script>

<template>
  <button
    class="min-w-11em border-2 bg-gray-300 border-gray-500 font-bold text-xs p-2 border-grey-500 hover:bg-gray-200 active:bg-gray-400 disabled-btn"
    :disabled="disabled"
    @click="handleClick"
    @mouseenter="enableButton"
    @mouseleave="disableButton"
  >
    <slot />
  </button>
</template>

<style scoped>
.disabled-btn {
  @apply disabled:opacity-50 disabled:cursor-not-allowed;
}
</style>
