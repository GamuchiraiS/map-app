<script setup lang="ts">
    import { campsArr } from '../assets/camps'
    import type { Camp } from '../assets/camps'
    import { ref } from 'vue'
    import { useRoute } from 'vue-router'

    const route = useRoute()
    
    const routeId = parseInt(route.params.id as string)
    const campObj: Camp | undefined = campsArr.find(camp => camp.id == routeId)
    const camp = ref<Camp | undefined>(campObj)
</script>
<template>
    <h1 v-if="camp">{{ camp.name }}</h1>
</template>