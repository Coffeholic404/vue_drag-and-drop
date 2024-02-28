<!-- eslint-disable no-undef -->
<script setup lang="ts">
import { nanoid } from 'nanoid'
import type { Task } from '~/types'

// eslint-disable-next-line func-call-spacing
const emit = defineEmits<{
  (e: 'add', payload: Task): void
}>()

const focused = ref(false)
const title = ref('')

function createTask (e: Event) {
  if (title.value.trim()) {
    e.preventDefault()
    emit('add', {
      title: title.value.trim(),
      createdAt: new Date(),
      id: nanoid()
    } as Task)
  }

  title.value = ''
}
</script>

<template>
  <div>
    <textarea
      v-model="title"
      class="focus:bg-white focus:shadow resize-none rounded w-full border-none bg-transparent p-2 cursor-pointer"
      :class="{
        'h-7': !focused,
        'h-20': focused
      }"
      style="outline: none !important; overflow: hidden"
      :placeholder="!focused ? '+ Add A Card' : 'Enter a title for this card'"
      @keydown.tab="createTask"
      @keyup.enter="createTask"
      @focus="focused = true"
      @blur="focused = false"
    />
  </div>
</template>
