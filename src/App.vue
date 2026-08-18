<script setup>
import { ref, watch } from 'vue';
import PushListProcess from './Components/PushListProcess.vue';
import Tasklist from './Components/Tasklist.vue';

const STORAGE_KEY = 'tasks';
const DAY_LABELS = ['日', '月', '火', '水', '木', '金', '土'];

const currentDate = new Date();
const month = currentDate.getMonth() + 1;
const date = currentDate.getDate();
const day = DAY_LABELS[currentDate.getDay()];

const saved = localStorage.getItem(STORAGE_KEY);
const tasks = ref(saved ? JSON.parse(saved) : []);

watch(tasks, (newTasks) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newTasks));
}, { deep: true });

function addTask(newTask) {
  tasks.value.push({ id: crypto.randomUUID(), ...newTask });
}

function removeTask(index) {
  tasks.value.splice(index, 1);
}

function updateTask({ index, data }) {
  tasks.value[index] = { ...tasks.value[index], ...data };
}
</script>

<template>
  <div class="header">
    <h1>TODO</h1>
  </div>
  <PushListProcess :month="month" :date="date" :day="day" @add-task="addTask"/>
  <Tasklist :tasks="tasks" @delete-task="removeTask" @update-task="updateTask"/>
</template>

<style scoped>
* {
  margin: 0;
}
.header {
  border-bottom: rgb(0, 0, 0) solid ;
}
</style>
