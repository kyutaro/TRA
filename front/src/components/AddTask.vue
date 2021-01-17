<template>
  <div class="add-task" @click="addTask()">
    <font-awesome-icon :icon="['fas', 'plus']" /><span class="ml10">タスクを追加する</span>
  </div>
</template>

<script>
export default {
  name: "AddTask",
  data: function() {
    return {}
  },
  methods: {
    addTask: function() {
      console.log("addTaskの中です。");
    }
  }
};
</script>

<style scoped>
.add-task {
  cursor: pointer;
  margin: 10px auto;
  width: 40%;
}
</style>
