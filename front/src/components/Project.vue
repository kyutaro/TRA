<template>
  <div class="project">
    <h2>Project List</h2>
    <div class="return">
      <router-link to="/" class="btn-return">
        <font-awesome-icon :icon="['fas', 'angle-left']" />
      </router-link>
    </div>
    <div class="allHour">総作業時間 00:00:00</div>
    <add-task></add-task>
    <ul class="task">
      <li class="task-list">
        <div>
          <span class="task-list-text">bbbbb：aaaaa</span>
        </div>
        <div class="task-detail">
          <div class="hour">
            作業時間：00:00:00
          </div>
          <div>
            <span class="btn-start" @click="start()">start</span>
          </div>
        </div>
      </li>
      <li >
      <li v-for="item in openCloseList" :key="item.id" class="category-list">
        <div v-bind:class="{category_list_close: item.isClose, category_list_open: item.isOpen}" @click="openClose(item.id)">
          <span class="task-list-text">bbb</span>
        </div>
        <div v-bind:class="{category_task_hidden: item.isHidden, category_task_display: item.isDisplay}">
          <add-task></add-task>
          <ul class="category-task">
            <li class="category-task-list">
              <div>
                <span class="task-list-text">bbbbb：aaaaa</span>
              </div>
              <div class="task-detail">
                <div class="hour">
                  作業時間：00:00:00
                </div>
                <div>
                  <span class="btn-start" @click="start()">start</span>
                </div>
              </div>
            </li>
            <li class="category-task-list">
              <div>
                <span class="task-list-text">bbbbb：aaaaa</span>
              </div>
              <div class="task-detail">
                <div class="hour">
                  作業時間：00:00:00
                </div>
                <div>
                  <span class="btn-start">start</span>
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
import axios from "axios";
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
      openCloseList: [
        { 
          id: 0,
          isHidden: true,
          isDisplay: false,
          isClose: true,
          isOpen: false,
        },
        { 
          id: 1,
          isHidden: true,
          isDisplay: false,
          isClose: true,
          isOpen: false,
        }
      ]
    }
  },
  methods: {
    openClose: function(id) {
      if(this.openCloseList[id].isHidden) {
        this.openCloseList[id].isHidden = false;
        this.openCloseList[id].isDisplay = true;
        this.openCloseList[id].isClose = false;
        this.openCloseList[id].isOpen = true;
      } else {
        this.openCloseList[id].isHidden = true;
        this.openCloseList[id].isDisplay = false;
        this.openCloseList[id].isClose = true;
        this.openCloseList[id].isOpen = false;
      }
    },
    start: function() {
      console.log("startの処理を行う");
    }
  },
  created: function() {
    axios.get("/api").then((response) => {
      console.log(response.data); // mockData
      console.log(response.status); // 200
      //console.log(response) // 200
    });
  },
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

.task {
  list-style-type: none;
  margin: 0 0 0 10px;
  padding: 0;
  text-align: left;
}

.task-list {
  background-color: #fafafa;
  border-radius: 10px;
  box-shadow: 5px 7px 25px rgba(0, 0, 0, 0.5);
  color: #696969;
  margin: 25px auto;
  opacity: 1;
  padding: 10px 0px 15px 15px;
  width: 87%;
}

.task-list::before {
  background-image: url("../assets/task_icon.png");
  background-repeat: no-repeat;
  background-size: contain;
  content: "";
  display: inline-block;
  height: 30px;
  position: absolute;
  width: 30px;
}

.task-list-text {
  display: inline-block;
  padding: 9px 0 0 45px;
}

.task-detail {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
  margin: 10px 0px 0px 45px;
}

.category-list {
  cursor: pointer;
  margin: 20px 10px;
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

.hour {
  padding: 10px 0 0 0;
}

.btn-start {
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

.btn-start:hover {
  background: #f56500;
}
</style>