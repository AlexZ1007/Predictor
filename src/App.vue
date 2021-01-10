<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  data: function (){
    return{
      competions:[
        {id:0, name: "World Cup", groups: 8, totalTeams:32, teamsPerGroup:4, gamesInGroupStage:3},
        {id:1, name: "Euro", groups: 6, totalTeams:24, teamsPerGroup:4, gamesInGroupStage:3},
        {id:2, name: "Champions League", groups: 8, totalTeams:32, teamsPerGroup:4, gamesInGroupStage:6}
      ],
      groups:[[]],
      bracket:{}
    }
  },
  methods:{
    createBracket(seeded, unseeded){
      // Create empty bracket
      let teams=seeded.length*2;
      let nearestPowerOfTwo= 1<<31-Math.clz32(teams);
      if(nearestPowerOfTwo<teams) nearestPowerOfTwo*=2;
      this.totalPhasesNumber = Math.log(nearestPowerOfTwo)/Math.log(2);
      localStorage.totalPhasesNumber=JSON.stringify(this.totalPhasesNumber);
      // Create the phases and their length
      this.bracket['phase1']=[];
      let phase1=this.bracket['phase1'];
      phase1.length=nearestPowerOfTwo; phase1.fill({teamName: 'N/A', goals:''});
      
      for(let i=2;i<=this.totalPhasesNumber;i++){ 
        this.bracket['phase'+i]=[];
        this.bracket['phase'+i].length=this.bracket['phase'+(i-1)].length/2; 
        this.bracket['phase'+i].fill({teamName: 'N/A', goals:''});
      }
    
      for(let i=0;i<teams/2;i++){  // Insert matches in bracket
        let teamsRemaining=seeded.length;
        let randomNumForSeeded=Math.floor(Math.random()*teamsRemaining);
        let randomNumForUnseeded=Math.floor(Math.random()*teamsRemaining);
        this.bracket.phase1[i*2]={teamName:seeded[randomNumForSeeded], goals:0};
        this.bracket.phase1[i*2+1]={teamName:unseeded[randomNumForUnseeded], goals:0};
        seeded.splice(randomNumForSeeded,1);
        unseeded.splice(randomNumForUnseeded,1);
      }
      localStorage.bracket=JSON.stringify(this.bracket); // Store bracket
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
