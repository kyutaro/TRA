<template>
  <div class="project">
    <h2>{{ projectName }}</h2>
    <div class="return">
      <router-link to="/" class="btn-return">
        <font-awesome-icon :icon="['fas', 'angle-left']" />
      </router-link>
    </div>
    <div class="allHour">総作業時間 00:00:00</div>
    <div class="addCategory" @click="displayAddCategory()">
      <font-awesome-icon :icon="['fas', 'plus']" /><span class="ml10">カテゴリーを追加する</span>
    </div>
    <div class="add-category-action" v-bind:class="{display_add_category: displayAddCategoryFlg, nondisplay_add_category: hiddenAddCategoryFlg}">
      <div>
        <input id="add-category-name" type="text" class="add-category-name">
      </div>
      <div>
        <button class="add-category-button" @click="addCategory()">追加</button>
      </div>
    </div>
    <ul class="category" v-if="openCloseList != ''">
      <li v-for="item in openCloseList" :key="item.id" class="category-list">
        <div v-bind:class="{category_list_close: item.isClose, category_list_open: item.isOpen}" @click="openClose(item.id)">
          <span class="category-list-text">{{ item.category_name }}</span>
        </div>
        <div v-bind:class="{category_task_hidden: item.isHidden, category_task_display: item.isDisplay}">
          <div class="add-task" @click="displayAddTask()">
            <font-awesome-icon :icon="['fas', 'plus']" /><span class="ml10">タスクを追加する</span>
          </div>
          <div class="add-task-action" v-bind:class="{display_add_task: displayAddTaskFlg, nondisplay_add_task: hiddenAddTaskFlg}">
            <div>
              <input :id="'add-task-name-' + item.categoryId" type="text" class="add-task-name">
            </div>
            <div>
              <button class="add-task-button" @click="addTask(item.categoryId, item.id)">追加</button>
            </div>
          </div>
          <!-- <add-task></add-task> -->
          <ul class="category-task">
            <li v-for="task in item.taskList" :key="task._id" class="category-task-list">
              <div>
                <span class="task-list-text">{{ task.task_name }}</span>
              </div>
              <div class="task-detail">
                <div class="task-hour">
                  作業時間：{{ task.work_time }}
                </div>
                <div class="task-btn">
                  <span class="task-btn-start" @click="start()">start</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios"
import Const from './../const'
import AddTask from "./AddTask.vue"

export default {
  name: "Project",
  components: {
    AddTask
  },
  props: {
    msg: String,
  },
  data: function() {
    return {
      projectName: '',
      displayAddCategoryFlg: false,
      hiddenAddCategoryFlg: true,
      displayAddTaskFlg: false,
      hiddenAddTaskFlg: true,
      openCloseList: []
    }
  },
  created: function () {
    let result = this.$route.path.slice(9)
    axios.post( Const.API_PATH + '/project/init', {
        projectId: result
      })
      .then(response => {
        this.projectName = response.data[0].projects.project_name
        for (let i = 0 ; i < response.data.length ; i++){
          this.openCloseList.push({
            id: i,
            categoryId: response.data[i]._id,
            category_name: response.data[i].category_name,
            isHidden: true,
            isDisplay: false,
            isClose: true,
            isOpen: false,
            taskList: []
          })
        }
      })
  },
  methods: {
    displayAddCategory: function() {
      if(this.displayAddCategoryFlg) {
        this.displayAddCategoryFlg = false,
        this.hiddenAddCategoryFlg = true
      } else {
        this.displayAddCategoryFlg = true,
        this.hiddenAddCategoryFlg = false
      }
    },
    addCategory: function() {
      let addCategoryName = document.getElementById('add-category-name').value;
      axios.post( Const.API_PATH + '/category/add', {
          projectId: this.$route.path.slice(9),
          categoryName: addCategoryName
        })
        .then(response => {
          console.log(response.status)
          this.openCloseList.push({
            id: this.openCloseList.length,
            categoryId: response.data._id,
            category_name: response.data.category_name,
            isHidden: true,
            isDisplay: false,
            isClose: true,
            isOpen: false,
            taskList: []
          })
        })
    },
    openClose: function(id) {
      if(this.openCloseList[id].isHidden) {
        this.openCloseList[id].isHidden = false;
        this.openCloseList[id].isDisplay = true;
        this.openCloseList[id].isClose = false;
        this.openCloseList[id].isOpen = true;
        /* 最初に一度だけ取得用のAPIを呼ぶ */
        if(!this.openCloseList[id].taskList.length) {
          axios.post( Const.API_PATH + '/task/fetch', {
              categoryId: this.openCloseList[id].categoryId
            })
            .then(response => {
              console.log(response.status)
              this.openCloseList[id].taskList = response.data;
            })        
        }
      } else {
        this.openCloseList[id].isHidden = true;
        this.openCloseList[id].isDisplay = false;
        this.openCloseList[id].isClose = true;
        this.openCloseList[id].isOpen = false;
      }
    },
    displayAddTask: function() {
      if(this.displayAddTaskFlg) {
        this.displayAddTaskFlg = false,
        this.hiddenAddTaskFlg = true
      } else {
        this.displayAddTaskFlg = true,
        this.hiddenAddTaskFlg = false
      }
    },
    addTask: function(categoryId, id) {
      let addTaskName = document.getElementById('add-task-name-' + categoryId).value;
      axios.post( Const.API_PATH + '/task/add', {
          categoryId: categoryId,
          taskName: addTaskName
        })
        .then(response => {
          console.log(response.status)
          console.log(response.data)
          this.openCloseList[id].taskList.push({
            id: response.data._id,
            task_name: response.data.task_name,
            work_time: response.data.work_time
          })
        })
    },
    start: function() {
      console.log("startの処理を行う")
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.project {
  padding: 0;
  margin: 0 auto;
  width: 50vw;
}

.return {
  margin: 0 0 30px 15px;
  text-align: left;
}

.return a {
  color: #fff;
}

.btn-return {
  background: #fff;
  border-radius: 50%;
  -webkit-box-shadow: 4px 4px 4px rgba(0, 0, 0, .5);
  box-shadow: 0 3px 5px rgba(0, 0, 0, .3);
  cursor: pointer;
  display: inline-block;
  font-size: 2.4rem;
  font-weight: 700;
  height: 60px;
  padding: 0 0 0 0;
  position: relative;
  width: 60px;
}

.btn-return:hover {
  opacity: 0.9;
}

.btn-return svg {
  color: #696969;
  padding: 10px 0 0 17px;
}

.allHour {
  font-size: 1.4rem;
}

.addCategory {
  cursor: pointer;
  margin: 10px auto;
}

.add-task {
  cursor: pointer;
  margin: 20px 0px 0 45px;
}

.add-category-action {
  display: flex;
  justify-content: center;
  margin: 0 auto;
  width: 100%;
}

.add-task-action {
  display: flex;
  justify-content: flex-start;
  margin: 0 0 0 45px;
  width: 100%;
}

.nondisplay_add_category,
.nondisplay_add_task {
  height: 0;
  padding: 0;
  opacity: 0;
  transition: height 0.4s;
  visibility: hidden;
}

.display_add_category,
.display_add_task {
  height: 40px;
  opacity: 1;
  visibility: visible;
  transition: .2s;
}

.add-category-name,
.add-task-name {
  border: 2px solid #ddd;
  border-radius: 3px;
  box-sizing: border-box;
  font-size: 16px;
  height: 30px;
  padding: 5px 15px;
  margin: 5px 0 0 0;
}

.add-category-button,
.add-task-button {
  background-color: #eb6100;
  border-radius: 0.5rem;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-size: 1.4rem;
  font-weight: 700;
  height: 40px;
  letter-spacing: 0.15em;
  margin: 0 0 0 10px;
  padding: 0 1rem;
  width: 100px;
}

@media screen and (max-width: 768px){
  .add-task-button {
    padding: 0 10px 0 10px;
  }
}

.category {
  list-style-type: none;
  margin: 0 0 0 10px;
  padding: 0;
  text-align: left;
}

.category-list {
  cursor: pointer;
  margin: 20px auto;
  width: 100%;
}

.category_list_close::before {
  background-image: url("../assets/project_close_icon.png");
  background-repeat: no-repeat;
  background-size: contain;
  content: "";
  display: inline-block;
  height: 30px;
  position: absolute;
  width: 30px;
}

.category_list_open::before {
  background-image: url("../assets/project_open_icon.png");
  background-repeat: no-repeat;
  background-size: contain;
  content: "";
  display: inline-block;
  height: 30px;
  position: absolute;
  width: 30px;
}

.category_task_hidden {
    height: 0;
    padding: 0;
    opacity: 0;
    transition: 0.4s;
    visibility: hidden;
}

.category_task_display {
    opacity: 1;
    visibility: visible;
    transition: 1s;
}

.category-list-text {
  display: inline-block;
  padding: 9px 0 0 45px;
}

.category-task {
  list-style-type: none;
  padding: 0;
  margin: 0 0 0 10px;
}

.category-task-list {
  background-color: #fafafa;
  border-radius: 10px;
  box-shadow: 5px 7px 25px rgba(0, 0, 0, 0.5);
  color: #696969;
  margin: 25px auto;
  opacity: 1;
  padding: 10px 0px 15px 15px;
  width: 90%;
}

.category-task-list::before {
  background-image: url("../assets/task_icon.png");
  background-repeat: no-repeat;
  background-size: contain;
  content: "";
  display: inline-block;
  height: 30px;
  position: absolute;
  width: 30px;
}

.task-detail {
	display: flex;
	justify-content: space-between;
  margin: 10px 0px 0px 45px;
}

@media screen and (max-width: 768px){
  .task-detail{
    display: block;
  }
}

.task-list-text {
  display: inline-block;
  padding: 9px 0 0 30px;
}

.task-hour {
  margin: 0 10px 0 0;
  padding: 10px 0 0 0;
}

.task-btn {
  margin: 0 15px 0 0;
}

@media screen and (max-width: 768px){
  .task-btn {
    margin: 10px 0 0 0;
  }
}

.task-btn-start {
  background-color: #eb6100;
  border-radius: 0.5rem;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-size: 1.4rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  padding: 0.5rem 1rem;
}

.task-btn-start:hover {
  background: #f56500;
}
</style>
