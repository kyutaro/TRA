<template>
  <div class="addTask" @click="addTask()">
    <font-awesome-icon :icon="['fas', 'plus']" /><span class="ml10">タスクを追加する</span>
  </div>
</template>

<script>
import axios from "axios"
import Const from './../const'

export default {
  name: "AddTask",
  data: function() {
    return {}
  },
  methods: {
    addTask: function() {
      console.log("addTaskの中です。");
      axios.post( Const.API_PATH + '/task/add')
        .then(response => {
          console.log("post成功！")
          console.log(response.data)
          console.log(response.status)
        })
    }
  }
};
</script>

<style scoped>
.addTask {
  cursor: pointer;
  margin: 10px auto;
  width: 40%;
}
</style>
