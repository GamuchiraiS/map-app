<script setup lang="ts">
  // imports
  import { ref, watch} from 'vue'
  import { campsArr } from '../assets/camps'
  import type { Camp } from '../assets/camps'
  import Map from './Map.vue'

  const camps = ref<Camp[]>(campsArr)
  const activeCamp = ref<number | null>(null)

  

  /* watch(activeCamp, (newActiveCamp) => {
    console.log('new active camp: ' + newActiveCamp)
  }) */

</script>

<template>

  <div id="sidebar">
    <h2>Camps</h2>
      <ul>
        <li class = "camp__name" v-for = "camp in camps" 
          :data-is-active="camp.id == activeCamp" 
          @click="activeCamp = camp.id"> 
            {{ camp.name }}
        </li>
      </ul>
  </div>
  <!------------------------------------------------------- Map child component ---------------------------------------------->
  <!-- pass camps to Map -->
  <Map :camps="camps" :activeCamp="activeCamp"
    @clickMarker="(id) => {activeCamp = id}"
  />
  <!--- --- ------------------------------------------------------------------------------------------------------------------>

</template>

<style scoped>
  /* when the camp site is selected in the 
  sidebar, make the text bold */
  li.camp__name[data-is-active="true"]{
    font-weight: bold;
  }

  li.camp__name{
    background-color: #d7d3d3;
    padding-top: 0.625rem;
    padding-bottom: 0.625rem;
    padding-left: 1.25rem;
    font-size: 1rem;
    letter-spacing: 0.125rem;
    border-radius: 0.3125rem;
    cursor: pointer;
    margin-bottom: 1.25rem;
  }


</style>




