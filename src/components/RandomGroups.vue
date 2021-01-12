<template>
    <div class="groups container">
        <div class="controls d-flex justify-content-between margin-bottom-8">
            <h3>Insert the seeds</h3>
            <router-link class="btn btn-dark btn-color-pink btn-hover-aqua" to="/prediction/groupstage" event="" @click.native.prevent="processGroups()">Draw</router-link>
        </div> 
        <div class="row card-cols-4">
            <div class="card col no-padding-rl" v-for="i in seedsNum" :key="i">
                <div class="card-header">Seed #{{i}}</div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item" v-for="n in teamsPerSeed" :key="n">
                        <input  type="text" class="form-control" @change="resetCSS(i.toString()+n.toString())" 
                            placeholder="Insert a team name"  autocomplete="off">
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
    created() {
      window.addEventListener("resize", this.makeDesignResponsive);
    },
    destroyed() {
      window.removeEventListener("resize", this.makeDesignResponsive);
    },
    mounted(){this.makeDesignResponsive()},
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
      },
      makeDesignResponsive(){
        if(window.innerWidth<780){$(".groups .row").removeClass("row-cols-2"); $(".groups .row").addClass("row-cols-1");}
        else if(window.innerWidth<1000){$(".groups .row").removeClass("row-cols-4"); $(".groups .row").addClass("row-cols-2");}
        else { $(".groups .row").removeClass("row-cols-1"); $(".groups .row").removeClass("row-cols-2"); $(".groups .row").addClass("row-cols-4"); }
      }
    }    
}
</script>