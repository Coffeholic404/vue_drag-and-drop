<!-- eslint-disable func-call-spacing -->
<!-- eslint-disable no-undef -->
<script setup lang="ts">
import type { Task, ID } from '~/types'
const props = defineProps<{
  task: Task
}>()

const emit = defineEmits<{
  (e: 'delete', payload: ID): void
}>()

const focused = ref(false)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
onKeyStroke('Backspace', (e) => {
  if (focused.value) emit('delete', props.task.id)
})
</script>

<template>
  <div
    class="task bg-white p-2 mb-2 rounded shadow-sm max-w-[250px] flex"
    :title="task.createdAt.toLocaleDateString()"
    tabindex="0"
    @focus="focused = true"
    @blur="focused = false"
  >
    <DragHandle class="pr-2" />
    <span>
      {{ task.title }}
    </span>
  </div>
</template>

<style>
.sortable-drag .task {
  transform: rotate(5deg);
}

.sortable-ghost .task {
  position: relative;
}

.sortable-ghost .task::after {
  content: '';
  @apply absolute top-0 bottom-0 left-0 right-0 bg-slate-300 rounded;
}

.task:focus,
.task:focus-visible {
  @apply outline-gray-400 !important;
  outline: gray auto 1px;
}
</style>
