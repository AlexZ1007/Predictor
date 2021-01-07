<template>
  <div class="groups container">
    <div class="controls d-flex justify-content-between">
      <h3>Insert the groups</h3>
      <router-link class="btn btn-dark btn-color-pink btn-hover-aqua" to="/prediction/groupstage" event="" @click.native.prevent="processGroups()">Confirm</router-link>
    </div>
    
    <div class="row ">
      <div class="group col col-3" v-for="i in groups" :key="i">
        <div class="card-header">
          GROUP #{{i}} 
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item" v-for="n in teamsPerGroup" :key="n">
            <input  type="text" class="form-control" @change="resetCSS(i.toString()+n.toString())" 
                    placeholder="Insert team name" :id="i.toString()+n.toString()" autocomplete="off">
          </li>
        </ul>
      </div>
    </div>     
  </div>
</template>

<script>
import $ from 'jquery'
export default {
    data: function(){
      return{
        groups: this.$parent.competions[this.compID].groups,
        teamsPerGroup: this.$parent.competions[this.compID].teamsPerGroup,
      }
    },
    props: ['compID'],
    methods:{
      processGroups(){
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
          }
          if(!redirect) return 0;
          console.log(this.$parent.groups)
          this.$router.push("/prediction/groupStage/"+this.compID);
      },

      resetCSS(id){
          $("#"+id).css("border","1px solid black");
          $("#"+id).attr("placeholder","Insert team name");
      }
    }
    
}
</script>