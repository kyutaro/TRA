<template>
  <div class="top">
    <Modal v-if="modal"></Modal>
    <h2>Project List</h2>
    <div class="display-add-project" @click="displayAddProject()">
      <font-awesome-icon :icon="['fas', 'plus']" v-bind:class="{displayNone: displayAddProjectFlg}" />
      <font-awesome-icon :icon="['fas', 'minus']" v-bind:class="{displayNone: hiddenAddProjectFlg}" />
      <span class="ml10">プロジェクトを追加する</span>
    </div>
    <div class="add-project-action" v-bind:class="{display_add_project: displayAddProjectFlg, nondisplay_add_project: hiddenAddProjectFlg}">
      <div>
        <input id="add-project-name" type="text" class="add-project-name">
      </div>
      <div>
        <button class="add-project-button" @click="addProject()">追加</button>
      </div>
    </div>
    <ul id="project" class="project" v-if="projectList != ''">
      <li v-for="project in projectList" :key="project.projectId">
        <router-link :to="`/project/${project.projectId}`">
          <span>{{ project.projectName }}</span>
        </router-link>
      </li>
    </ul>
    <div class="project-none" v-else>
      まだプロジェクトが作成されていません。
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Const from './../const'
import Modal from "./Modal.vue"

export default {
  name: 'Top',
  data: function() {
    return {
      projectList: [], /* DBから取得 */
      displayAddProjectFlg: false,
      hiddenAddProjectFlg: true,
      modal: false
    }
  },
  components: {
    Modal
  },
  created: function () {
    axios.get(Const.API_PATH)
      .then(response => {
        console.log(response.status)
        response.data.forEach(element => {
          this.projectList.push({
            projectId: element._id,
            projectName: element.project_name
          })
        })
      })
      .catch(err => {
        this.openModal()
        throw err
      })
  },
  methods: {
    displayAddProject: function() {
      if(this.displayAddProjectFlg) {
        this.displayAddProjectFlg = false,
        this.hiddenAddProjectFlg = true
      } else {
        this.displayAddProjectFlg = true,
        this.hiddenAddProjectFlg = false
      }
    },
    addProject: function() {
      let addProjectName = document.getElementById('add-project-name').value;
      axios.post( Const.API_PATH + '/project/add', {
        addProjectName: addProjectName
      })
      .then(response => {
        console.log(response.status)
        this.projectList.push({
          projectId: response.data._id,
          projectName: response.data.project_name
        })
      })
      .catch(err => {
        this.openModal()
        throw err
      })
    },
    openModal() {
      this.modal = true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.top {
  padding: 0;
  margin: 0 auto;
  width: 50vw;
}

.display-add-project {
  cursor: pointer;
  margin: 10px auto;
}

.add-project-action {
  display: flex;
  justify-content: center;
  margin: 0 auto;
  width: 100%;
}

.nondisplay_add_project {
  height: 0;
  padding: 0;
  opacity: 0;
  transition: height 0.4s;
  visibility: hidden;
}

.display_add_project {
  height: 40px;
  opacity: 1;
  visibility: visible;
  transition: .2s;
}

.add-project-name {
  border: 2px solid #ddd;
  border-radius: 3px;
  box-sizing: border-box;
  font-size: 16px;
  height: 30px;
  padding: 5px 15px;
  margin: 5px 0 0 0;
}

.add-project-button {
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
  .add-project-button {
    padding: 0 10px 0 10px;
  }
}

.project {
  list-style-type: none;
  padding: 0;
  margin: 10px auto;
  text-align: left;
  width: 50vw;
}

.project li {
  margin: 10px 10px;
  padding: 0 0 0 0;
  height: 50px;
  vertical-align: middle;
}

.project li::before {
  background-image: url('../assets/project_icon.png');
  background-size: contain;
  background-repeat: no-repeat;
  cursor: pointer;
  content: "";
  display: inline-block;
  height: 30px;
  position: absolute;
  width: 30px;
}

.project li span {
  display: inline-block;
  padding: 9px 0 0 45px;
}

.project li a {
  color: #d8d8d8;
}

.project-none {
  margin-top: 10px;
  text-align: center;
}

.error {
  line-height: 1.8rem;
  margin: 10px auto;
  padding: 0;
  text-align: left;
  width: 45vw;
}
</style>
