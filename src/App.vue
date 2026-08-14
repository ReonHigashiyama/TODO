<script setup>
import { ref, watch } from 'vue';
import PushListProcess from './Components/PushListProcess.vue';
import Tasklist from './Components/Tasklist.vue';

let currentDate = new Date(); //日付取得
let month = currentDate.getMonth() + 1;
let date = currentDate.getDate();
let day = currentDate.getDay();


const saved = localStorage.getItem('tasks');
const tasks = ref(saved ? JSON.parse(saved) : []);

switch (day) {
  case 0:
    day = '日';
    break;
  case 1:
    day = '月';
    break;
  case 2:
    day = '火';
    break;
  case 3:
    day = '水';
    break;
  case 4:
    day = '木';
    break;
  case 5:
    day = '金';
    break;
  case 6:
    day = '土';
    break;
  default:
    break;
}

function addTask(newTask) {
  tasks.value.push(newTask);
}

watch(tasks, (newTasks) => {
  localStorage.setItem('tasks', JSON.stringify(newTasks));
}, { deep: true });

function RemoveTask(index) {
  tasks.value.splice(index, 1);
}

</script>

<template>
  <div class="header">
    <h1>TODO</h1>
  </div>
  <PushListProcess :month="month" :date="date" :day="day" @add-task="addTask"/>
  <Tasklist @delete-task="RemoveTask" :tasks="tasks"/>
</template>

<style scoped>
* {
  margin: 0;
}
.header {
  border-bottom: rgb(0, 0, 0) solid ;
}
</style>
