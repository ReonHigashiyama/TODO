<script setup>
import { ref, watch, nextTick } from 'vue';
const props = defineProps(['month', 'date', 'day']);
const today = `${props.month}月 ${props.date}日 (${props.day}曜日)`;

const isOpen = ref(false);
const title = ref('');
const startTime = ref(formatTime(9, 0));
const endTime = ref(formatTime(18, 0));
const titleInput = ref(null);
const emit = defineEmits(['add-task']);

const timeOptions = [];

// isOpenがtrueになった直後、DOMが更新されてからinputにフォーカスする
watch(isOpen, async (open) => {
  if (open) {
    await nextTick();
    titleInput.value?.focus();
  }
});

function close() {
  isOpen.value = false;
}

function save() {
  alert('保存しました: ' + (title.value || '(タイトルなし)'));
  close();
}

function save_task() {
  window.alert('クリックしました');
  //保存処理
  if (!title.value) {
    console.log('(タイトルなし)');
    title.value = '(タイトルなし)';
  }
  else console.log(title.value);
  console.log(startTime.value);
  console.log(endTime.value);
  const TaskData = {
    titleName: title.value,
    startTime: startTime,
    endTime: endTime
  };
  emit('add-task', TaskData);
  close();
}

function formatTime(hour, minute) {
  const period = hour < 12 ? '午前' : '午後';
  let h = hour % 12;
  if (h == 0) h = 12;
  const mm = String(minute).padStart(2, '0');
  return `${period}${h}:${mm}`;
}

for (let h = 9; h < 19; h++){
  for (let m = 0; m < 60; m += 30){
    timeOptions.push(formatTime(h, m));
  }
}
</script>
<template>
    <div class="container">
        <p>{{ today }}</p>
        <button class="push-btn" @click="isOpen = true">＋ 追加</button>
    </div>
    <div class="overlay" v-if="isOpen" @click.self="close" @keydown.esc="close">
        <div class="modal" role="dialog" aria-modal="true" aria-label="予定を追加">
            <div class="modal-header">
                <span class="menu-icon">☰</span>
                <button class="close-icon" id="closeBtn" aria-label="閉じる" @click="close">✕</button>
            </div>
            <div class="title-wrap">
                <input type="text" class="title-input" placeholder="タイトルを追加" ref="titleInput" v-model="title">
            </div>
            <div class="row">
                <span class="icon">🕐</span>
                <div class="content">
                    <div class="datetime">
                        <input type="text" :value="today" style="width:140px">
                        <select v-model="startTime" class="time-select">
                            <option v-for="t in timeOptions" :key="t" :value="t">{{ t }}</option>
                        </select>
                        -
                        <select v-model="endTime" class="time-select">
                            <option v-for="t in timeOptions" :key="t" :value="t">{{ t }}</option>
                        </select>
                    </div>
                    <div class="sub-text">タイムゾーン・繰り返さない</div>
                </div>
            </div>
            <div class="footer">
                <button class="save-btn" id="saveBtn" @click="save_task">保存</button>
            </div>
        </div>
    </div>
</template>
<style scoped>
.container {
    text-align: center;
}
.push-btn {
    padding: 12px 28px;
    background: #1a73e8;
    color: white;
    border: none;
    border-radius: 24px;
    font-weight: 500;
    cursor: pointer;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
}
.push-btn:hover {
    background: #1765cc;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(60, 64, 67, 0.5);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 8vh;
  z-index: 1000;
}

.modal {
  background: #fff;
  width: 460px;
  max-width: 92vw;
  border-radius: 8px;
  box-shadow: 0 8px 10px -5px rgba(0,0,0,0.2), 0 16px 24px 2px rgba(0,0,0,0.14), 0 6px 30px 5px rgba(0,0,0,0.12);
  overflow: hidden;
  animation: pop-in 0.14s cubic-bezier(0.2, 0, 0.2, 1);
}
@keyframes pop-in {
  from { opacity: 0; transform: translateY(-8px) scale(0.98); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}

.modal-header {
  display: flex;
  align-items: center;
  padding: 10px 12px 10px 20px;
}
.modal-header .menu-icon {
  color: #5f6368;
  font-size: 20px;
  margin-right: auto;
}
.close-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #5f6368;
  cursor: pointer;
  border: none;
  background: none;
  font-size: 18px;
}
.close-icon:hover {
  background: rgba(60,64,67,0.08);
}

.title-wrap {
  padding: 4px 24px 20px;
}
.title-input {
  width: 100%;
  border: none;
  border-bottom: 2px solid #1a73e8;
  font-size: 22px;
  padding: 4px 2px 8px;
  outline: none;
  color: #3c4043;
}
.title-input::placeholder {
  color: #70757a;
  font-weight: 400;
}

.tabs {
  display: flex;
  gap: 8px;
  padding: 0 24px 20px;
}
.tab {
  border: none;
  background: #f1f3f4;
  color: #3c4043;
  padding: 7px 18px;
  border-radius: 18px;
  font-size: 14px;
  cursor: pointer;
  font-weight: 500;
}
.tab.active {
  background: #d3e3fd;
  color: #0b57d0;
}
.tab:not(.active):hover {
  background: #e8eaed;
}

.row {
  display: flex;
  align-items: flex-start;
  padding: 10px 24px;
  gap: 20px;
}
.row .icon {
  color: #5f6368;
  font-size: 20px;
  width: 20px;
  text-align: center;
  margin-top: 2px;
  flex-shrink: 0;
}
.row .content {
  flex: 1;
}
.row .main-text {
  font-size: 14px;
  color: #3c4043;
}
.row .sub-text {
  font-size: 12px;
  color: #70757a;
  margin-top: 2px;
  cursor: pointer;
}
.row .sub-text:hover {
  text-decoration: underline;
}
.row.link .main-text {
  color: #1a73e8;
  cursor: pointer;
}
.row.link:hover {
  background: #f8f9fa;
}

.datetime {
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
}
.datetime input {
  border: 1px solid #dadce0;
  border-radius: 4px;
  padding: 6px 10px;
  font-size: 14px;
  color: #3c4043;
  font-family: inherit;
}
.datetime input:focus {
  outline: 2px solid #1a73e8;
  border-color: transparent;
}
.dash {
  color: #5f6368;
}

.footer {
  display: flex;
  justify-content: flex-end;
  padding: 16px 24px 20px;
}
.save-btn {
  background: #1a73e8;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 9px 24px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
}
.save-btn:hover {
  background: #1765cc;
  box-shadow: 0 1px 2px rgba(0,0,0,0.3);
}

</style>