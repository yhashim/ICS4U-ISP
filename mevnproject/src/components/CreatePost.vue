<template>
  <div class="container">
  <div id="secure">
  <!-- Create New Post -->
  <br/><br/><br/><br/>
  <h3>Create a New Function</h3>
  <br/>
    <form @submit.prevent="addPost">
      <div class="form-row">
          <label for="type">Function Type</label>
          <select id="type" placeholder="Function Type" class="form-control" v-model="Post.type" name="type" required>
            <!-- https://www.sgu.edu/blog/medical/ultimate-list-of-medical-specialties/ -->
              <option value="Linear">y=mx+b</option>
              <option value="Quadratic">y=ax^2+bx+c</option>
              <option value="Power">y=ax^b</option>
              <option value="Exponential">y=ab^x</option>
              <option value="Log">y=aln(x)+b</option>
              <option value="Sinusoidal">y=asin(bx+c)</option>
          </select>
        <br/><br/><br/>
        <div class="form-row" aria-describedby="smallText">
          <div class="col">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">a</span>
              </div>
              <input type="a" class="form-control" id="a" placeholder="Enter real number..." name="a" v-model="Post.a" required>
            </div>
          </div>
          <div class="col">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">b</span>
              </div>
              <input type="b" class="form-control" id="b" placeholder="Enter real number..." name="b" v-model="Post.b" required>
            </div>
          </div>
          <div class="col">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">c</span>
              </div>
              <input type="c" class="form-control" id="c" placeholder="Enter real number..." name="c" v-model="Post.c" required>
            </div>
          </div>
          <div class="col">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">m</span>
              </div>
              <input type="m" class="form-control" id="m" placeholder="Enter real number..." name="m" v-model="Post.m" required>
            </div>
          </div>
        </div>
        <small id="smallText" class="form-text text-muted">Any filled in variables not applicable to your chosen function type will be disregarded</small>
      </div>
      <br/>
      <div class="text-center">
        <button type="submit" class="btn btn-dark">Submit</button>
      </div>
    </form>
  </div>
  </div>
</template>

<style>
  #text {
    width: 100%;
    height: 150px;
    box-sizing: border-box;
    resize: none;
  }
</style>

<script> 
  export default {
    name: 'Secure',
    data(){
      return {
        Post: {},
        Posts: []
      }
    },
    created() {
      let uri = 'http://localhost:4000/Posts';
      this.axios.get(uri).then(response => {
        this.Posts = response.data;
      });
    },
    methods: {
      addPost(){
        let uri = 'http://localhost:4000/posts/add';
          this.axios.post(uri, this.Post).then(() => {
            console.log("pushing");
          });
        if (this.Post.type === "Linear"){
          this.Post.yint = this.Post.b;
          this.Post.xint = (-1*this.Post.b)/this.Post.m;
          this.Post.a = 0; this.Post.c = 0;
        } else if (this.Post.type === "Quadratic"){
          this.Post.yint = this.Post.c;
          var result = b * b - 4.0 * a * c;
          if (result > 0.0) {
            var r1 = (-b + Math.pow(result, 0.5)) / (2.0 * a);
            var r2 = (-b - Math.pow(result, 0.5)) / (2.0 * a);
            this.Post.xint = r1 + " and " + r2;
          } else if (result == 0.0) {
            var r1 = -b / (2.0 * a);
            this.Post.xint = r1;
          } else {
            this.Post.xint = "Does not exist";
          }
          this.Post.m = 0;
        } else if (this.Post.type === "Power"){
          this.Post.yint = 0;
          this.Post.xint = 0;
        } else if (this.Post.type === "Exponential"){
          this.Post.yint = 1;
          this.Post.xint = "Does not exist due to asymptote";
        } else if (this.Post.type === "Log"){
          this.Post.yint = "Does not exist";
          this.Post.xint = Math.pow(10, (-1*this.Post.b)/this.Post.a);
        } else if (this.Post.type === "Sinusoidal"){
          this.Post.yint = this.Post.a*Math.sin(this.Post.c);
          var period = 2*Math.PI/Math.abs(this.Post.b);
          this.Post.xint = Math.sin(-this.Post.c/this.Post.b) + " +- k*" + period;
        }
        // console.log("done");
        console.log(this.Post);
        console.log(this.Posts);
        alert('Function added');
        return;  
      }
    }
  }
</script>