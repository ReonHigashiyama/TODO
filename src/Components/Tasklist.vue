<script setup>
const props = defineProps(['tasks']);
</script>
<template>
    <ul>
        <li v-for="task in props.tasks" :key="task">
            {{ task.titleName }}{{ task.startTime }}～{{ task.endTime }}
        </li>
    </ul>
</template>
<style scoped>
</style>