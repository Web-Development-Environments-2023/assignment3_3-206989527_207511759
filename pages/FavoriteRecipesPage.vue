<template>
    <div class="container">
        <h1 class="title" style="color: #556B2F;"> Favorites </h1>
        <RecipePreviewList title="Favorite Recipes"/>
    </div>    
</template>
<script>
import RecipePreviewList from '../components/RecipePreviewList.vue';
import { h } from 'vue'

export default{
    components:{
        RecipePreviewList
    }
}
</script>
<style lang="scss" scoped>
</style>