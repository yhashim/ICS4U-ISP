<template>
  <div>
    <br/><br/><br/>
      <h3>All Functions</h3>
      <br/>
        <table class="table table-hover table-borderless">
            <thead>
            <tr>
              <th>Type</th>
              <th>a, b, c, m</th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
            </thead>
            <tbody>
                <tr v-for="Post in Posts" :key="Post._id">
                  <td><router-link :to="{name: 'viewPost', params: { id: Post._id }}" class="btn btn-outline-dark">{{ Post.type }}</router-link></td>
                  <!-- <td>{{ Post.text }}</td> -->
                  <td>{{ Post.a }}, {{ Post.b }}, {{ Post.c }}, {{ Post.m }}</td>
                  <td><router-link :to="{name: 'editPost', params: { id: Post._id }}" class="btn btn-dark">Edit</router-link></td>
                  <td><button class="btn btn-danger" @click.prevent="deletePost(Post._id)">Delete</button></td>
                </tr>
            </tbody>
        </table>
  </div>
</template>

<script>
  export default {
      data() {
        return {
          Posts: [],
        }
      },
      created() {
        let uri = 'http://localhost:4000/Posts';
        this.axios.get(uri).then(response => {
          this.Posts = response.data;
        });
      },
      methods: {
        deletePost(id)
        {
          // let uri = `http://localhost:4000/Posts/delete/${id}`;
          // this.axios.delete(uri).then(response => {
          //   this.Posts.splice(this.Posts.indexOf(id), 1);
          // });

          // I'm going to borrow this for now! Please understand :)
          let uri = `http://localhost:4000/Posts/delete/${id}`;
          this.axios.delete(uri).then(response => {
            for (var i = 0; i < this.Posts.length; ++i) { 
              if (this.Posts[i]._id === id) { 
                this.Posts.splice(i, 1); 
                return;
              }
            }
          });
        }
      }
    }
</script>