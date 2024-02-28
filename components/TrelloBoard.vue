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

const createColumn = () => {
  const column: Column = {
    id: nanoid(),
    title: '',
    tasks: []
  }
  columns.value.push(column)
  // eslint-disable-next-line no-undef
  nextTick(() => {
    ;(
      document.querySelector(
        '.column:last-of-type .title-input'
      ) as HTMLAnchorElement
    ).focus()
  })
}
</script>
<template>
  <div class="flex items-start overflow-x-auto gap-4">
    <draggableComponent
      v-model="columns"
      group="columns"
      :animation="150"
      handle=".drag-handle"
      item-key="id"
      class="flex gap-4 items-start"
    >
      <template #item="{ element: column }: { element: Column }">
        <div class="column bg-gray-200 p-5 rounded min-w-[250px]">
          <header class="font-bold mb-4">
            <DragHandle />
            <input
              v-model="column.title"
              class="title-input bg-transparent focus:bg-white rounded px-1 w-4/5"
              type="text"
              @keyup.enter="($event.target as HTMLAnchorElement).blur()"
              @keydown.backspace="column.title === '' ? (columns = columns.filter(c => c.id !== column.id)) : null"
            >
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
                <TrelloBoardTask
                  :task="task"
                  @delete="
                    column.tasks = column.tasks.filter((t) => t.id !== $event)
                  "
                />
              </div>
            </template>
          </draggableComponent>
          <footer>
            <NewTask @add="column.tasks.push($event)" />
          </footer>
        </div>
      </template>
    </draggableComponent>
    <button
      class="bg-gray-200 whitespace-nowrap p-2 rounded opacity-50"
      @click="createColumn"
    >
      + Add Another Column
    </button>
  </div>
</template>
