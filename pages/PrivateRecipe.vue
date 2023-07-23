<template>
  <div class="container">
  <div>
    <h1 class="title" style="color: #556B2F;">Private Recipes </h1>
    <RecipePreviewList title="Private Recipes"/>
  </div>
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
export default {
    components: {
        RecipePreviewList,
    },
};
</script>
<style lang="scss" scoped>


</style>
