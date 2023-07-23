<template>
  <div class="MainPage">
      <div id="Search">
      <br>
    <table>   <tr >
        <td style="width:80%" >
        <input type="text" placeholder="what would you like to eat" id="SearchBar" v-model="query">
         </td>
         <td style="width:20%">
        <button id="searchButton" style="width:100%" @click="Search">Search</button>
        </td>  
        </tr>   
        </table>
        <table>
            <tr>
        <CustomFilter ref="CustomFilter"/>  
        </tr>
        </table>
      </div> 
      <RecipePreviewList ref="previewList"  title="Search Result" />
  </div>
  </template>
  <script>
  
  import RecipePreviewList from "../components/RecipePreviewList.vue";
  import CustomFilter from "../components/CustomFilter.vue";
  
  export default{
    name:"SearchPage",
    components:{
      RecipePreviewList,
      CustomFilter,  
  },
    data()
    {
      return{
        query:"",
      }
    }
    ,
    props:{
  
      myQuery:{
        type:String,
        default:"none",
        require:false
      }
    }
    ,
    mounted:function()
    {
      console.log(this.$route.params.query)
      let q=this.$route.params.query
  
      if(q!=undefined && q!="")
      {
          this.$refs.previewList.searchQuery(q,undefined,undefined,undefined,5,1)
  
      }
    }
    ,
    methods:{
      async Search()
      {
        
  
        let filters= this.$refs.CustomFilter.getFilters()
        console.log(filters)
  
        let cusineType=undefined
        let dietType=undefined
        let intoleranceType =undefined
        if(filters[0].length!=0)
        {
          cusineType=String(filters[0])
  
        }
        if(filters[1].length!=0)
        {
          dietType=filters[1]
        }
        if(filters[2].length!=0)
        {
           intoleranceType= String(filters[2])
        }
        console.log(cusineType)
        console.log(dietType)
        console.log(intoleranceType)
  
       
        this.$refs.previewList.searchQuery(this.query,cusineType,dietType,intoleranceType,parseInt(filters[3]),filters[4])
      }
    }
  };
  
  </script>
  
  <style scoped>
  .MainPage{
    text-align: left;
    width:relative;
    height: relative;
    background: #F5F5DC;
    background-color:#F5F5DC;
  }
  
  table{
    width:50%;
    margin-left: 20%;
    margin-right:20% ;
  }
  
  #searchButton
  {
    margin: 0;
    font-weight: bold;
    color:white;
    font-size:18px;
    letter-spacing: 0.2em;
    background-color: #556B2F;
    height: relative;
    border-color: white;
  }
  
  #SearchBar{
    font-family:  "Renner",sans-serif;
    text-align: center;
    font-size:18px;
    font-weight:500;
    height: relative;
    width:98%;
    background-color: rgb(255, 255, 255);
    border-color: white;
    margin:0;
  }
  
  </style>