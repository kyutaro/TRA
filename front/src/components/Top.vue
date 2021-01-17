<template>
  <div>
    <h2>Project List</h2>
    <div class="add-project" @click="addProject()">
      <font-awesome-icon :icon="['fas', 'plus']" /><span class="ml10">プロジェクトを追加する</span>
    </div>
    <ul class="project">
      <li>
        <router-link to="/project">
          <span>aaaaa</span>
        </router-link>
      </li>
      <li>
        <router-link to="/project">
          <span>bbbbb</span>
        </router-link>
      </li>
      <li>
        <router-link to="/project">
          <span>ccccc</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Top',
  props: {
    msg: String
  },
  created: function () {
    axios.get('/api')
      .then(response => {
        console.log("成功！");
        console.log(response.data) // mockData
        console.log(response.status) // 200
        //console.log(response) // 200
      })
  },
  methods: {
    addProject: function() {
      console.log("プロジェクトを追加する処理");
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
