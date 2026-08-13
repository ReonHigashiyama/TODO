<script setup>
defineProps(['tasks']);
</script>
<template>
    <table>
        <tr>
            <th>タスク</th>
            <th>開始時間</th>
            <th>終了時間</th>
        </tr>
        <tr v-for="task in tasks">
            <td>{{ task.titleName }}</td>
            <td>{{ task.startTime }}</td>
            <td>{{ task.endTime }}</td>
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
</style>