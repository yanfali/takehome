<script setup lang="ts">
interface RadioOptions {
  label: string;
  value: string | number;
}
interface Props {
  title?: string;
  options?: RadioOptions[];
  modelValue?: string | number;
}
const props = withDefaults(defineProps<Props>(), {
  title: "Options Name",
  options: () => [
    { label: "One", value: "one" },
    { label: "Two", value: "two" },
  ],
  checked: false
});
const emit = defineEmits<{
  (e: "update:modelValue", value: string | number | undefined): void;
}>();
</script>
<template>
  <div class="flex flex-row gap-2">
    <label class="font-bold inline-block align-middle mr-9">{{ title }}</label>
    <div class="mr-2" v-for="option in options">
      <input
        class="inline-block align-middle"
        type="radio"
        :id="option.label"
        :value="option.value"
        v-model="modelValue"
        @change="$emit('update:modelValue', props.modelValue)"
      />
      <label class="ml-1 inline-block align-middle" :for="option.label">{{ option.label }}</label>
    </div>
  </div>
</template>
