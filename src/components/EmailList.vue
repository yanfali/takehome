<script setup lang="ts">
import { watch, ref, nextTick } from "vue";
interface Props {
  emails: string[];
}
const emit = defineEmits<{
  (e: "deleteEmail", email: string): void;
}>();
const props = withDefaults(defineProps<Props>(), {
  emails: () => ["vague@company.com"],
});

const emailListContainerRef = ref(null);

watch(() =>[...props.emails], (oldVal, newVal) => {
  console.log("something changed", emailListContainerRef.value);
  if (emailListContainerRef.value) {
    const el = emailListContainerRef.value as HTMLDivElement;
    nextTick(() => {
      // use next tick because DOM hasn't updated yet
      el.scrollTop = el.scrollHeight;
    });
  }
});
function deleteEmailHandler($event: Event, email: string) {
  // console.log($event);
  emit("deleteEmail", email);
}
</script>
<template>
  <div
    class="max-h-20 min-h-20 overflow-hidden overflow-y-auto bg-gray-50 opacity-70"
    ref="emailListContainerRef"
  > <div class="grid grid-cols-8" v-for="email in emails" :key="email"> <div class="hover:bg-gray-100 text-left text-lg col-span-7"> {{ email }}
      </div>
      <div class="text-right mr-2 col-span-1">
        <a
          class="cursor-pointer font-extra-bold hover:text-red-600 active:text-red-800"
          title="delete"
          @click.stop.click="deleteEmailHandler($event, email)"
          >X</a
        >
      </div>
    </div>
  </div>
</template>
