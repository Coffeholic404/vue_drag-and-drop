<script setup lang="ts">
import { ref } from 'vue'
import draggableComponent from 'vuedraggable'
import { nanoid } from 'nanoid'
import type { Column, Task } from '../types'
const columns = ref<Column[]>([
  {
    id: nanoid(),
    title: 'Backlog',
    tasks: [
      {
        id: nanoid(),
        title: 'Create marketing landing page',
        createdAt: new Date()
      },
      {
        id: nanoid(),
        title: 'Develop cool new feature',
        createdAt: new Date()
      },
      {
        id: nanoid(),
        title: 'Fix page nav bug',
        createdAt: new Date()
      }
    ]
  },
  {
    id: nanoid(),
    title: 'Selected for Dev',
    tasks: []
  },
  {
    id: nanoid(),
    title: 'In Progress',
    tasks: []
  },
  {
    id: nanoid(),
    title: 'QA',
    tasks: []
  },
  {
    id: nanoid(),
    title: 'Complete',
    tasks: []
  }
])
// eslint-disable-next-line no-undef
const alt = useKeyModifier('Alt')
</script>
<template>
  <div>
    <draggableComponent
      v-model="columns"
      group="columns"
      :animation="150"
      handle=".drag-handle"
      item-key="id"
      class="flex gap-4 overflow-x-auto items-start"
    >
      <template #item="{ element: column }: { element: Column }">
        <div class="column bg-gray-200 p-5 rounded min-w-[250px]">
          <header class="font-bold mb-4">
            <DragHandle />
            {{ column.title }}
          </header>
          <draggableComponent
            v-model="column.tasks"
            handle=".drag-handle"
            :group="{ name: 'tasks', pull: alt ? 'clone' : true }"
            :animation="150"
            item-key="id"
          >
            <template #item="{ element: task }: { element: Task }">
              <div>
                <TrelloBoardTask :task="task" />
              </div>
            </template>
          </draggableComponent>
          <footer>
            <button class="text-gray-500">+ Add a Card</button>
          </footer>
        </div>
      </template>
    </draggableComponent>
  </div>
</template>
