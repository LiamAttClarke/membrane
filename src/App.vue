<template>
  <div id="app">
    <Grid
      :tiles="tiles"
      :tile-size="512"
      :tile-cells="16"
      :time="time" />
    <div class="app__overlay">
      <div class="top-left">
        <h1 class="app__heading">Membrane</h1>
        <span class="app__subheading">
          inspired by <a href="https://tixy.land/" target="_blank">tixy.land</a>
        </span>
      </div>
    </div>
  </div>
</template>

<style>
:root {
  --c-primary: #FFE600;
}

* {
  box-sizing: border-box;
}

body {
  font-family: 'Open Sans', sans-serif;
  color: white;
  background-color: black;
  margin: 0;
}

a {
  color: var(--c-primary);
  text-decoration: underline;
  text-decoration-skip: space;
  text-decoration-color: var(--c-primary);
}

a:hover, a:focus {
  text-decoration-color: var(--c-primary);
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Quicksand', sans-serif;
}
</style>

<style scoped>
#app {
  height: 100vh;
}

.app__overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.app__overlay > * {
  position: absolute;
  margin: 8px;
  padding: 8px;
  pointer-events: auto;
  background-color: rgba(0, 0, 0, 0.75);
  border-radius: 8px;
}

.app__overlay > .top-left {
  top: 0;
  left: 0;
}

.app__heading {
  text-transform: lowercase;
  line-height: 100%;
  margin: 0;
  margin-bottom: 8px;
}

.app__subheading {
  color: #ccc;
  font-size: 1rem;
}
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import GridComponent from './components/Grid.vue';
import Tile from './models/Tile';

const FPS = 60;

@Component({
  components: {
    Grid: GridComponent,
  },
})
export default class App extends Vue {
  tiles: Tile[] = [
    new Tile(0, 0),
    new Tile(1, 0),

    new Tile(0, 1),
    new Tile(1, 1),
  ];

  time = Date.now();

  mounted() {
    setInterval(() => {
      // Time in seconds
      this.time = Date.now() / 1000;
    }, 1000 / FPS);
  }
}
</script>
