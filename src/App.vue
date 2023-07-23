<template>
  <div id="app">
    <div id="nav">
      <router-link :to="{ name: 'main' }">Feast & Fancy RES</router-link>|
      <router-link :to="{ name: 'search' }">Search</router-link>|
      <router-link :to="{ name: 'about' }">About</router-link>|
      <div id="user">
      <span v-if="!$root.store.username">
        Hello Guest:
        <router-link :to="{ name: 'register' }">SignUp</router-link>|
        <router-link :to="{ name: 'login' }">Login</router-link>|
      </span>
      <span v-else>
        <div class="button-row">
          <p class="name">{{ $root.store.username }}</p>
          <b-dropdown id="dropdown-1" text="Profile"  >
            <b-dropdown-item :to="{name: 'favorites'}" >Favorites</b-dropdown-item>
            <b-dropdown-item :to="{name: 'privates'}">Privates</b-dropdown-item>
            <b-dropdown-item :to="{name: 'familyrecipes'}">Family</b-dropdown-item>
          </b-dropdown>
          
            <addRecipeModal></addRecipeModal>
           <button @click="Logout" id="logout">Logout</button>
         </div>

      </span>
    </div>
    </div>
    <router-view />
  </div>
</template>

<script>
import AddRecipeModal from './components/AddRecipeModal.vue';
export default {
  components: { AddRecipeModal },
  name: "App",
  methods: {
    Logout() {
      this.$root.store.logout();
      this.$root.toast("Logout", "User logged out successfully", "success");

      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    }
  }
};
</script>

<style lang="scss">
@import "@/scss/form-style.scss";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #F5F5DC;
  background-color:#F5F5DC;
  min-height: 100vh;
}

#nav {
  background-color:#556B2F;
  padding:20px;
  height: 5rem;
  color: #F5F5DC;
}

#nav a {
  padding:20px;
  font-weight: bold;
  color: #F5F5DC;
}

#nav a.router-link-exact-active {
  color:#F5F5DC
}

#user
{
float:right
}

#dropdown-1{
  margin-left:10px;
  width:100px;
  height: 40px;
  color: #556B2F;
  border: #F5F5DC;
  background-color: #556B2F;
  border-color: #F5F5DC;
}

#dropdown-1 .dropdown-menu a.dropdown-item{
  color: #556B2F;
}

#dropdown-1 .dropdown-toggle{
  background-color: #556B2F;
  border-color: #F5F5DC;}

#logout{
background-color: #FFC107;
font-weight: 700;border:none ;
 margin:5px;
 border-color: #556B2F;
 border-radius: 1px;
 color: #556B2F;
}

#createRecipe{
  background-color: #556B2F;
  font-weight: 700;
  border:none ;
  margin:5px;
  border-color: #556B2F;
  border-radius: 1px;
  color: #F5F5DC;
}

.button-row{
  
    display: flex;
}

.name{
  margin-right: 15px;
  margin-top : 5px;
  font-size: 20px;
}

</style>
