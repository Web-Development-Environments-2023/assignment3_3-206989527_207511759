import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";
import Register from "./pages/RegisterPage";
import Login from "./pages/LoginPage";
import Search from "./pages/SearchPage";
import Favorites from "./pages/FavoriteRecipesPage";
import Privates from "./pages/PrivateRecipe";
import Familyrecipes from "./pages/FamilyRecipesPage";
import About from "./pages/AboutPage";

const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
  },
  {
    path: "/Register",
    name: "register",
    component: Register,
  },
  {
    path: "/Login",
    name: "login",
    component: Login,
  },
  {
    path: "/Search",
    name: "search",
    component: Search,
  },
  {
    path: "/About",
    name: "about",
    component: About,
  },
  {
    path: "/favorites",
    name: "favorites",
    component: Favorites,
  },
  {
    path: "/privates",
    name: "privates",
     component: Privates,
   },
   {
     path: "/familyrecipes",
     name: "familyrecipes",
     component: Familyrecipes,
   },
  {
    path: "/recipe/:recipeId",
    name: "recipe",
    component: () => import("./pages/RecipeViewPage"),
  },
  {
    path: "/privatepreview",
    name: "PrivatePreview",
    component: () => import("./pages/PrivatePreviewPage"),
  },
  {
    path: "/familypreview",
    name: "FamilyPreview",
    component: () => import("./pages/FamilyPreviewPage"),
  },
  {
    path: "/newRecipe",
    name: "newrecipe",
    component: () => import("./pages/CreateNewRecipe")
  },
  {
    path: "*",
    name: "notFound",
    component: NotFound,
  },
];

export default routes;
