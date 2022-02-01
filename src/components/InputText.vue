<script setup lang="ts">
interface Props {
  title?: string;
  placeholder?: string;
  modelValue?: string;
}
const props = withDefaults(defineProps<Props>(), {
  title: "Needs a Title",
  placeholder: "Example goes here",
  modelValue: "",
});
const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();
function handleInput($event: Event) {
  emit('update:modelValue', ($event.target as HTMLInputElement).value);
}
</script>
<template>
  <div class="flex flex-col">
    <h4 class="font-bold text-left mb-1 text-xs">{{ title }}</h4>
    <input
      v-bind:value="modelValue"
      v-on:input="handleInput"
      class="ml-1 placeholder-gray-400"
      type="text"
      :placeholder="placeholder"
    />
  </div>
</template>
