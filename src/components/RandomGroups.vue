<template>
    <div class="groups container">
        <div class="controls d-flex justify-content-between margin-bottom-15">
            <h3>Insert the seeds</h3>
            <router-link class="btn btn-dark btn-color-pink btn-hover-aqua" to="/prediction/groupstage" event="" @click.native.prevent="processGroups()">Draw</router-link>
        </div> 
        <div class="row">
            <div class="card col no-padding-rl" v-for="i in seedsNum" :key="i">
                <div class="card-header">Seed #{{i}}</div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item" v-for="n in teamsPerSeed" :key="n">
                        <input  type="text" class="form-control" @change="resetCSS(i.toString()+n.toString())" 
                            placeholder="Insert team name"  autocomplete="off">
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import $ from 'jquery';
export default {
    data: function(){
        return{
            seedsNum: this.$parent.competions[this.compID].teamsPerGroup,
            teamsPerSeed: this.$parent.competions[this.compID].groups,
            seeds: [[]]
        }
    },
    props: ['compID'],
    methods:{
      processGroups(){
          let redirect=true;
          for (let i=1; i<=this.seedsNum; i++){ 
            this.seeds.push([]);
            for(let n=1; n<=this.teamsPerSeed; n++){
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
              this.seeds[i].push({name: $("#"+id).val(), points: 0, place: 0, GD: 0});
            }
          }
          if(!redirect) return 0;
          this.randomDrawGroups(this.seeds);
          this.$router.push("/prediction/groupStage/"+this.compID);
      },

      randomDrawGroups(seeds){
        let groupId=1;
        while(groupId<=this.teamsPerSeed){
            this.$parent.groups.push([{}]);
            for(let n=1;n<=this.seedsNum;n++){
                let random=Math.floor(Math.random()*seeds[n].length);
                let team=seeds[n][random];
                this.$parent.groups[groupId].push(team);
                seeds[n].splice(random,1);
            }
            groupId++
        }
        localStorage.groups=JSON.stringify(this.$parent.groups);    // Save to local storage
      },  

      resetCSS(id){
          $("#"+id).css("border","1px solid black");
          $("#"+id).attr("placeholder","Insert team name");
      }
    }    
}
</script>