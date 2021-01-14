<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <ul>
      <li>
        <span>aaa</span>
      </li>
      <li>
        <span>bbbbb</span>
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
    console.log("あほー");
    axios.get('/api')
      .then(response => {
        console.log("成功！");
        console.log(response.data) // mockData
        console.log(response.status) // 200
        //console.log(response) // 200
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
  margin: 10px auto;
  text-align: left;
  width: 50vw;
}
li {
  margin: 10px 10px;
  padding: 0 0 0 0;
  height: 50px;
  vertical-align: middle;
}

li::before {
  background-image: url('../assets/project_icon.png');
  background-size: contain;
  background-repeat: no-repeat;
  content: "";
  display: inline-block;
  height: 30px;
  position: absolute;
  width: 30px;
}

span {
  display: inline-block;
  padding: 9px 0 0 45px;
}

a {
  color: #42b983;
}
</style>
