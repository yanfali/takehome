<script setup lang="ts">
interface Props {
  msg: string | undefined;
  visible: boolean;
  color?: string
}
const props = withDefaults(defineProps<Props>(), {
  msg: "Error Wil Robinson",
  visible: false,
  color: "text-red-500"
});
</script>
<template>
  <div
    :style="{ visibility: visible ? 'visible' : 'hidden' }"
    class="font-bold visible mt-2 p-1 mb-2" :class="color"
  >
    {{ msg }}
  </div>
</template>
