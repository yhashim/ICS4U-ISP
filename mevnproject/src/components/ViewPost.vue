<template>
  <div>
    <br/><br/><br/><br/>
    <div class="card text-center">
      <div class="card-header">
        Function
      </div>
      <div class="card-body">
        <h5 class="card-title">{{ Post.type }}</h5>
        <p class="card-text">A: {{ Post.a }}, B: {{ Post.b }}, C: {{ Post.c }}, M: {{ Post.m }}</p>
        <p class="card-text">X-ints: {{ Post.xint }}, Y-int: {{ Post.yint }}</p>
        <router-link to="/posts" class="btn btn-dark">View Other Functions</router-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        Post: {},
        Posts: []
      }
    },
    created() {
      let uri = `http://localhost:4000/Posts/edit/${this.$route.params.id}`;
        this.axios.get(uri).then((response) => {
            this.Post = response.data;
      });
      let uri1 = 'http://localhost:4000/Posts';
      this.axios.get(uri1).then(response => {
        this.Posts = response.data;
      });
    },
    methods: {
      
    }
  }
</script>
