<template>
    <div class="container">
      <h1 class="title" style="color: #556B2F;">Family Recipes </h1>
      <RecipePreviewList title="Family Recipes"/>
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
  .RandomRecipes{
      margin: 10px 0 10px;
  }
  .blur{
      -webkit-filter: blur(5px);
      filter: blur(2px);
  }
  ::v-deep.blur .recipe-preview{
      pointer-events: none;
      cursor: default;
  }
  </style>