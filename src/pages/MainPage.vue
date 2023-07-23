<template>
  <div class="container">

    <table style="width:100%;">
    <tr>
        <th scope="col" style="color: #556B2F;"> <h2>Explore this recipes</h2></th>
        <th  v-if="$root.store.username" scope="col" style="color: #556B2F;"><h2>Last watched recipes</h2></th>
    </tr>
      
      <tr style="width:100%;">
        <td style="width:50%">
            <RecipePreviewList title="Random Recipes" class="RandomRecipes" />
        </td>
        <td  v-if="!$root.store.username"  class="box" style="width:50%; height: 100%;"   >
            <div class="box overlay" style="opacity:1 ; width:50%;margin-top: relative; border-radius: 10px; text-align: center;"> <LoginPage></LoginPage></div>
        </td>
        <td v-else style="width:50%">
          <div ><RecipePreviewList title="Last Watched Recipes"  /> </div>  

        </td>
        
      </tr>

    </table>
  
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
import LoginPage from "./LoginPage.vue";
export default {
  components: {
    RecipePreviewList,
    LoginPage
},
data(){

  return{
    data:"",
  }
}
,
methods:{

  Search()
  {
  this.$router.push({name:"search",params:{query:this.data}});
  }
}
};
</script>
<style lang="scss" scoped>

.mybox{
        width: 100%;
        height: 100%;
        position: relative;
        top: 0;
        left: 0;
        opacity: 1;
}

.container
{
  min-width: 100%;
  margin:0;
  padding:relative;
  background-color: #F5F5DC;
  text-align: center;
  position: center;
}

h2{
  margin-top: 5%;
  text-align: center;
}
.RandomRecipes {
  margin: 10px 0 10px;
}
.blur {
  -webkit-filter: blur(5px); 
  filter: blur(4px);
}
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}
a
{
  margin-right:18px;
  color:rgb(245, 245, 245);
  font-weight: 1000;
  font:bold 1rem/1rem ;
}
a:hover{color:whitesmoke;}
      .box {
        width: 100%;
        height: 50%;
        position: relative;
        opacity: 1;
      }
      .overlay {
        z-index:12;
        background: rgba(8, 8, 8, 8);
      }
      #SearhcBar
      {
        margin-right:20%;
        height: 5rem;
        margin-bottom: 5%;
        margin-top: 5%;
      }
  #mybutton
  {
    height: 4rem;
    width:5rem;
  color:white;
  font-size:18px;
  font-weight: bold;
  background-color: #556B2F;
  }
    #mysearch
    
    {     text-align: center;
          height: 4rem;
          width:15rem;
          font-size:18px;
          font-weight: bold;
    }
</style>
