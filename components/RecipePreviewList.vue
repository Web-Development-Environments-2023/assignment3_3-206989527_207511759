<template>
  <b-container v-if="renderComponent">
    <b-alert id = "alert" :show="dismissCountDown" dismissible variant="success" @dismissed="dismissCountDown=0" @dismiss-count-down="countDownChanged">
        Recipe was added to favorite list successfully
    </b-alert>
    <b-row v-if="renderComponent" >
      <v-if v-if="emptyResult"> No Recipe Found</v-if>
      <b-col v-for="r in recipes" :key="r.id" class="card" >
        <RecipePreview class="recipePreview" :recipe="r" :title="title" />
        <div v-if="title == 'Random Recipes' || title=='Search Result'  || title=='Last Watched Recipes' " style="text-align:right;">
          <a @click=" showAlert();">
             <b-icon  class="addFav" icon="heart-fill"  @click="postFavoriteRecipes(r.id);"></b-icon>
          </a>
        </div >
      </b-col>
    </b-row>
    <b-row v-if="title=='Random Recipes'"  @click="getRandomRecipes" >
    <button class="randomizebutton" style="background-color:#556B2F; border:#556B2F; color:white;border-radius:50px;   background-color: #556B2F; padding: 10px 20px; opacity: 1; margin-top: 2rem; position: center;">Random</button>
    </b-row>
  </b-container>
</template>

<script>
import RecipePreview from "./RecipePreview.vue";

export default {
  name: "RecipePreviewList",
  components: {
    RecipePreview
  },
  props: {
    title: {
      type: String,
      required: true
    },
    vertical:{
      type:Boolean,
      default: false
    }
  },
  data() {
    return {
      recipes: [],
      dismissSecs: 2,
      dismissCountDown: 0,
      toDelete:'',
      renderComponent : true,
      emptyResult:false
     
    };
  },
  mounted() {
    if (this.title == 'Random Recipes'){
      this.getRandomRecipes();
    }
    if (this.title == 'Last Watched Recipes'){
      this.getLastWatchedRecipes();
    }
    if (this.title == 'Favorite Recipes'){
      this.getFavoriteRecipes();
    }
    if (this.title == 'Private Recipes'){
      this.getPrivateRecipes();
    }
    if (this.title == 'Family Recipes'){
      this.getFamilyRecipes();
    }
  },
  methods: {
    countDownChanged(dismissCountDown) {
        this.dismissCountDown = dismissCountDown
      },
    showAlert() {
        this.dismissCountDown = this.dismissSecs
      },
    // async handleOk(){
    //     if (this.title == 'Random Recipes'){
    //       this.deleteFavoriteRecipes(this.toDelete)
    //       this.getFavoriteRecipes()
    //     }
    //     if (this.title == 'Private Recipes'){
    //       await this.deletePrivateRecipes(this.toDelete)
    //       await this.getPrivateRecipes()
    //     }
    //     if (this.title == 'Favorite Recipes'){
    //       await this.deleteFavoriteRecipes(this.toDelete)
    //       await this.getFavoriteRecipes()
    //     }
    //     if (this.title == 'Family Recipes'){
    //       await this.deleteFamilyRecipes(this.toDelete)
    //       await this.getFamilyRecipes()
    //     }
    //     await this.forceRerender()
        
    // },
    setDelete( recipe_id){
        this.toDelete = recipe_id
    },
    async forceRerender() {
        this.renderComponent = false;
        
        this.$nextTick(() => {
          this.renderComponent = true;
          
        }); 
    },
     async postFavoriteRecipes(Id) {
      try { 
        
        const response = await this.axios.post(
          this.$root.store.server_domain + "/users/favorites",
          {
            recipe_id: Id
          },
          {withCredentials: true}

        );
      } catch (error) {
        console.log(error);
      }
    },
    async getRandomRecipes() {
      try {
        const response = await this.axios.get(
          this.$root.store.server_domain + "/recipes/threeRandom"
        );
        const recipes = response.data;
        this.recipes = [];
        this.recipes.push(...recipes);
        
      } catch (error) {
        console.log(error);
      }
    },
    async getFavoriteRecipes() {
      try {
        const response = await this.axios.get(
          this.$root.store.server_domain + "/users/favorites",
          {withCredentials: true}

        );
        const recipes = response.data;
        this.recipes = [];
        this.recipes.push(...recipes);
      } catch (error) {
        console.log(error);
      }
    },
    async getPrivateRecipes() {
      try {
        const response = await this.axios.get(
          // "http://localhost:3000/users/privates",
          this.$root.store.server_domain + "/users/privates",
          {withCredentials: true}

        );
        const recipes = response.data;
        this.recipes = [];
        this.recipes.push(...recipes);
      } catch (error) {
        console.log(error);
      }
    },
    async getFamilyRecipes() {
      try {
        const response = await this.axios.get(
          this.$root.store.server_domain + "/users/family",
          {withCredentials: true}

        );
        const recipes = response.data;
        this.recipes = [];
        this.recipes.push(...recipes);
        
      } catch (error) {
        console.log(error);
      }
    },
    async getLastWatchedRecipes() {
      try {
        const response = await this.axios.get(
          this.$root.store.server_domain + "/users/watchedrecipes",
          {withCredentials: true}

        );
        const recipes = response.data;
        this.recipes = [];
        this.recipes.push(...recipes);
        
      } catch (error) {
        console.log(error)
      }
    },
    async searchQuery(query,cusine,diet,intol,num,sortFilter)
    {
      this.emptyResult=false

      this.recipes=[]
      let res=[]
      if(cusine=="ALL")
      {
       cusine=undefined
      }
       if(diet=="None")
       {
       diet=undefined
      }
       if(intol=="None")
       {
       intol=undefined
       }
      
      try {
        const response = await this.axios.get(
          this.$root.store.server_domain + "/recipes/search/",
          {params:{query:query,cusine:cusine,intolerance:intol,diet:diet,number:num}},
        );

      if(response.data.length!=0)
      {
        for(let i=0;i<response.data.length;i++)
        {
          res.push(response.data[i])

        }
      }
      else{
        
        this.emptyResult=true

      }



      if(sortFilter=="Default"){
        
      }
      else if(sortFilter=="Prepare Time"){
      res.sort((a, b) => parseInt(a.readyInMinutes) - parseInt(b.readyInMinutes));
      }
      else // Stars
      {
      res.sort((a, b) => parseFloat(b.popularity) - parseFloat(a.popularity));
      }

      
      this.recipes=res
      return
  
       
      } catch (error) {
        console.log(error);
      }

    },
   
    
    
  }
};
</script>

<style lang="scss" scoped>
.randomizebutton{
  position: center;
  text-align: center;
}
.alert{
    position:fixed; 
    top: 0px; 
    left: 0px; 
    width: 100%;
    z-index:9999; 
    border-radius:0px
}

.card{
  
  
  min-height: 350px;
  margin: 5px;
  background-color: rgb(255, 255, 255);
  padding-left: 0;
  padding-right: 0;
  border: none;
  max-width: 28%; 
  min-width:28%;
}

col{

  background-color: red;
}

.addFav{

    position: absolute;
        float:right;
        font-size: 28px;
        padding: 5px;
        top: 0;
        right:0;
        color:rgb(209, 20, 20);
}

[class*="card"] {
  min-width: 60%;
}

@media only screen 
and (min-device-width : 720px) 
 {
  .card{
    min-width: 27%;
    max-width: 27%;
   
  }
  
}



</style>
