<script setup>
    import { campsArr } from '../assets/camps'
    import { ref } from 'vue'
    import { useRoute } from 'vue-router'

    const route = useRoute()

    const campObj = campsArr.find(camp => camp.id == route.params.id)
    const camp = ref(campObj)
</script>
<template>
    <h1>Camps</h1>
    {{camp.id}}
</template>