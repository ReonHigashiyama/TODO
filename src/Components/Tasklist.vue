<script setup>
import { ref } from 'vue';
import { timeOptions } from '../utils/time.js';

defineProps(['tasks']);
const emit = defineEmits(['delete-task', 'update-task']);

const editingIndex = ref(null);
const editTitle = ref('');
const editStartTime = ref('');
const editEndTime = ref('');

function deleteTask(index) {
    emit('delete-task', index);
}

function startEdit(index, task) {
    editingIndex.value = index;
    editTitle.value = task.titleName;
    editStartTime.value = task.startTime;
    editEndTime.value = task.endTime;
}

function cancelEdit() {
    editingIndex.value = null;
}

function saveEdit(index) {
    emit('update-task', {
        index,
        data: {
            titleName: editTitle.value || '(タイトルなし)',
            startTime: editStartTime.value,
            endTime: editEndTime.value
        }
    });
    editingIndex.value = null;
}
</script>
<template>
    <table>
        <tr>
            <th>タスク</th>
            <th>開始時間</th>
            <th>終了時間</th>
            <th>操作</th>
        </tr>
        <tr v-for="(task, index) in tasks" :key="task.id">
            <template v-if="editingIndex === index">
                <td><input type="text" v-model="editTitle"></td>
                <td>
                    <select v-model="editStartTime">
                        <option v-for="t in timeOptions" :key="t" :value="t">{{ t }}</option>
                    </select>
                </td>
                <td>
                    <select v-model="editEndTime">
                        <option v-for="t in timeOptions" :key="t" :value="t">{{ t }}</option>
                    </select>
                </td>
                <td>
                    <button @click="saveEdit(index)">保存</button>
                    <button @click="cancelEdit">キャンセル</button>
                </td>
            </template>
            <template v-else>
                <td>{{ task.titleName }}</td>
                <td>{{ task.startTime }}</td>
                <td>{{ task.endTime }}</td>
                <td>
                    <button @click="startEdit(index, task)">編集</button>
                    <button @click="deleteTask(index)">X</button>
                </td>
            </template>
        </tr>
    </table>
</template>
<style scoped>
table {
    width: 100%;
    text-align: center;
    border-collapse: collapse;
    border-spacing: 0;
    margin-top: 30px;
}
table tr:nth-child(2n+1) {
    background: #e9faf9;
}
table th {
    padding: 10px;
    background: #778ca3;
    border-right: solid 1px #778ca3;
    color: #ffffff;
}
table th:last-child {
    border-right: none;
}
table td {
    padding: 10px;
    border-right: solid 1px #778ca3; 
}
table td:last-child {
    border-right: none;
}
button {
    padding: 10px;
}
</style>