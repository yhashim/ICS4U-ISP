<template>
  <div class="container">
    <head> 
      <!-- Bootstrap CSS --> <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous"> 
      <!-- Extra thing for phone zooming etc --> <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    </head>
    <div class="navigate" id="navigate">
        <nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item navbar-brand">
              <router-link to="/" class="nav-link">Graph</router-link>
            </li>
            <li class="nav-item navbar-brand">
              <router-link to="/createPost" class="nav-link">Create Function</router-link>
            </li>
            <li class="nav-item navbar-brand">
              <router-link to="/posts" class="nav-link">Functions</router-link>
            </li>
          </ul>
        </nav>
        <br/><br/><br/><br/>
        <transition name="fade">
          <router-view></router-view>
        </transition>
    </div>
    <div class="text-center">
      <nav class="navbar fixed-bottom navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-text" href="#">isp for ics4u</a>
      </nav>
    </div>
  </div>
</template>

<!-- Optional JavaScript -->
<!-- jQuery first, then Popper.js, then Bootstrap JS -->
<!-- <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script> -->

<script>
  export default {

  }
</script>
