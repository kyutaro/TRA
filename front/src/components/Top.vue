<template>
  <div>
    <h2>Project List</h2>
    <div class="add-project" @click="addProject()">
      <font-awesome-icon :icon="['fas', 'plus']" /><span class="ml10">プロジェクトを追加する</span>
    </div>
    <ul class="project">
      <li v-for="project in projectList" :key="project.projectId">
        <router-link :to="`/project/${project.projectId}`">
          <span>{{ project.projectName }}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
import Const from './../const'

export default {
  name: 'Top',
  data: function() {
    return {
      projectList: [
        {
          projectId: 0,
          projectName:'A_project'
        },
        {
          projectId: 1,
          projectName:'B_project'
        },
        {
          projectId: 2,
          projectName:'C_project'
        }
      ]
    }
  },
  created: function () {
    axios.get('/api/v1')
      .then(response => {
        console.log("成功！");
        console.log(response.data) // mockData
        console.log(response.status) // 200
        //console.log(response) // 200
      })
  },
  methods: {
    addProject: function() {
      axios.post( Const.API_PATH + '/project/add')
        .then(response => {
          console.log("post成功！")
          console.log(response.data)
          console.log(response.status)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.add-project {
  cursor: pointer;
  margin: 30px auto;
  width: 30%;
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
</style>
