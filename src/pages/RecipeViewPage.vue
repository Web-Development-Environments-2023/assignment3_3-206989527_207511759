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
              <div style="color: #556B2F;">Ready in {{ recipe.readyInMinutes }} minutes</div>
              <div style="color: #556B2F;">Likes: {{ recipe.popularity }} likes</div>
              <div style="color: #556B2F;">Vegan: {{ recipe.vegan }}</div>
              <div style="color: #556B2F;">Vegetarian: {{ recipe.vegetarian }}</div>
              <div style="color: #556B2F;">Gluten Free: {{ recipe.glutenFree }}</div>

              <div style="color: #556B2F;">Servings: {{ recipe.servings }}</div>


              

            </div>
            Ingredients:
            <ul>
              <li
                v-for="(r, index) in recipe.extendedIngredients"
                :key="index + '_' + r.id"
              >
                {{ r.original }}
              </li>
            </ul>
          </div>
          <div class="wrapped">
            Instructions:
            <ol>
              <li v-for="s in recipe._instructions" :key="s.number">
                {{ s.step }}
              </li>
            </ol>
          </div>
        </div>
      </div>
      <!-- <pre>
      {{ $route.params }}
      {{ recipe }}
    </pre
      > -->
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
    try {
      let response;
      // response = this.$route.params.response;

      try {
        this.title = this.$route.params.title;
        console.log(this.title);
        const recipe_id = this.$route.params.recipeId.id;
        response = await this.axios.get(
          // "https://test-for-3-2.herokuapp.com/recipes/info",
          this.$root.store.server_domain + `/recipes/fullinformation/${recipe_id}`,
          {withCredentials: true}

          // {
          //   params: { recipeId: this.$route.params.recipeId }
          // }
        );

        // console.log("response.status", response.status);
        if (response.status !== 200) this.$router.replace("/NotFound");
      } catch (error) {
        console.log("error.response.status", error.response.status);
        this.$router.replace("/NotFound");
        return;
      }
      console.log(response.data)
      let {
        analyzedInstructions,
        instructions,
        extendedIngredients,
        popularity,
        readyInMinutes,
        image,
        title,
        vegan,
        vegetarian,
        glutenFree,
        servings
      } = response.data;
      let _instructions = analyzedInstructions
        .map((fstep) => {
          fstep.steps[0].step = fstep.name + fstep.steps[0].step;
          return fstep.steps;
        })
        .reduce((a, b) => [...a, ...b], []);

      let _recipe = {
        instructions,
        _instructions,
        analyzedInstructions,
        extendedIngredients,
        popularity,
        readyInMinutes,
        image,
        title,
        vegan,
        vegetarian,
        glutenFree,
        servings
      };

      this.recipe = _recipe;
    } catch (error) {
      console.log(error);
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
/* .recipe-header{

} */
</style>
