<template>
  <div class="groups container">
    <div class="controls d-flex justify-content-between">
      <h3>Insert the groups</h3>
      <router-link class="btn btn-dark btn-color-pink btn-hover-aqua" to="/prediction/groupstage" event="" @click.native.prevent="processGroups()">Confirm</router-link>
    </div>
    
    <div class="row row-cols-3">
      <div class="group col" v-for="i in groups" :key="i">
        <div class="card-header">
          GROUP #{{i}} 
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item" v-for="n in teamsPerGroup" :key="n">
            <input  type="text" class="form-control" @change="resetCSS(i.toString()+n.toString())" 
                    placeholder="Insert a team name" :id="i.toString()+n.toString()" autocomplete="off" maxlength="14">
          </li>
        </ul>
      </div>
    </div>     
  </div>
</template>

<script>
import $ from 'jquery'
export default {
    created() {
      window.addEventListener("resize", this.makeDesignResponsive);
    },
    destroyed() {
      window.removeEventListener("resize", this.makeDesignResponsive);
    },
    data: function(){
      return{
        groups: this.$parent.competions[this.compID].groups,
        teamsPerGroup: this.$parent.competions[this.compID].teamsPerGroup,
      }
    },
    mounted(){
      this.makeDesignResponsive()
    
    },
    props: ['compID'],
    methods:{
      processGroups(){
          this.$parent.groups=[[]] // Reset the groups 
          let redirect=true;
          for (let i=1; i<=this.groups; i++){ 
            this.$parent.groups.push([{}]);
            for(let n=1; n<=this.teamsPerGroup; n++){
              let id=i+''+n
              if(!$("#"+id).val()){  // Check if the input is empty
                $("#"+id).attr("placeholder", "Input can't be empty!");
                $("#"+id).css("border","1px solid red");
                redirect=false;
                continue;
              }
              if(!$("#"+id).val().match(/([a-zA-Z])+([ -~])*/)){   //Check if the input hasn t only empty spaces
                $("#"+id).val("");
                $("#"+id).attr("placeholder", "Insert at least one letter!");
                $("#"+id).css("border","1px solid orange");
                redirect=false;
                continue;
              }
              // Insert the teams into the groups variable  
              this.$parent.groups[i].push({name: $("#"+id).val(), points: 0, place: 0, GD: 0})
            }
            // Save the groups into local storage
            localStorage.groups=JSON.stringify(this.$parent.groups);
          }
          if(!redirect) return 0;
          this.$router.push("/prediction/groupStage/"+this.compID);
      },

      resetCSS(id){
          $("#"+id).css("border","1px solid black");
          $("#"+id).attr("placeholder","Insert a team name");
      },

      makeDesignResponsive(){
        if(window.innerWidth<790){  $(".groups .row").removeClass("row-cols-3"); $(".groups .row").removeClass("row-cols-2"); $(".groups .row").addClass("row-cols-1");  }
        else if(window.innerWidth<1000){ $(".groups .row").removeClass("row-cols-3"); $(".groups .row").addClass("row-cols-2");} 
        else{  $(".groups .row").addClass("row-cols-3"); $(".groups .row").removeClass("row-cols-2"); $(".groups .row").removeClass("row-cols-1");}
      }
    }
    
}
</script>