<template>
    <div class="container">
      <div v-if="recipe">
  
        <div class="recipe-header mt-3 mb-4">
          <h1 style="color: #556B2F;">{{ recipe.title }}</h1>
          <img :src="recipe.image" class="center" />
        </div>
        <div class="recipe-body">
          <div class="wrapper">
            <div class="wrapped">
              <div class="mb-3">
                <div style="color: #556B2F;">Owner {{ recipe.recipe_owner_id }}</div>
                <div style="color: #556B2F;">Family Time {{ recipe.FamilyTime }}</div>
                <div style="color: #556B2F;">Ready in {{ recipe.readyInMinutes }} minutes</div>
              </div>
              Ingredients:
              <ul>
                <li
                  v-for="r in recipe.ingrediants"
                  :key="r"
                >
                  {{ r }}
                </li>
              </ul>
            </div>
            <div class="wrapped">
              Instructions:
              <ol>
                <li v-for="s in recipe.instructions" :key="s">
                  {{ s }}
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        recipe: null,
        title : null
      };
    },
    
    async created() {
    try{
        this.title = this.$route.params.title;
        this.recipe = this.$route.params.recipeId;
        const parseingre = JSON.parse(this.recipe.ingrediants)
        this.recipe.ingrediants = parseingre.map((item) => item.ingrediant);

        this.recipe.instructions = JSON.parse(this.recipe.instructions).map((item) => item.instruction);
    }catch(error){
        console.log(error)
    }


    }
  };
  </script>
  
  <style scoped>
  .container {
    color: #556B2F;
  }
  .wrapper {
    display: flex;
  }
  .wrapped {
    width: 50%;
  }
  .center {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 50%;
  }
  </style>