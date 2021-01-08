<template>
  <div class="groups container">
    <div class="controls d-flex justify-content-between">
      <h3>Insert your predicton</h3>
      <button class="btn btn-dark btn-color-pink btn-hover-aqua" id='confirm' v-on:click="highlightQualifiedTeams()">Confirm</button>
      <router-link class="btn btn-dark btn-color-pink btn-hover-aqua" id='advance' :to="'/prediction/bracket/'+compID" hidden>Advance to bracket</router-link>
    </div>
    
    <div class="row row-cols-3">
      <div class="group col" v-for="i in groupsNum" :key="i">
        <div class="card-header padding-5">
          GROUP #{{i}}<br>
          <p>Team name | Place(1-{{teamsPerGroup}}) | Points(0-{{maxPoints}}) | GD</p>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item d-flex" v-for="n in teamsPerGroup" :key="n" :id="i.toString()+n.toString()">
            <div class="input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text">{{$parent.groups[i][n].name}}</span>
                </div>
                <input type="number" class="form-control place" min="1" :max="teamsPerGroup" placeholder="Plc" :value="n">
                <input type="number" class="form-control points" min="0" :max="maxPoints" placeholder="Pts" value="0">
                <input type="number" class="form-control GD" placeholder="GD" value="0">
            </div>
          </li>
        </ul>
        <div class="card-footer"></div>
      </div>
    </div>     
  </div>
</template>

<script>
import $ from 'jquery'
export default {
    data: function(){
        return {
            maxPoints: this.$parent.competions[this.compID].gamesInGroupStage*3,
            teamsPerGroup: this.$parent.competions[this.compID].teamsPerGroup,
            groupsNum: this.$parent.competions[this.compID].groups
        }
    },
    props: ['compID'],
    created(){
      if(!this.$parent.groups[1]) this.$parent.groups=JSON.parse(localStorage.groups);
    },
    methods:{
       highlightQualifiedTeams(){
        const groupsNum = this.groupsNum;
        const teamsPerGroup=this.teamsPerGroup;
        let error=false;
         for (let i=1; i<=groupsNum; i++){ 
          let cardHeader=$(".group:eq("+(i-1)+")").children(".card-header");
          let cardFooter=$(".group:eq("+(i-1)+")").children(".card-footer");
          cardHeader.removeClass('text-danger');
          cardFooter.html('');
          let availablePlaces=Array(teamsPerGroup+1).fill(1);
          for(let n=1; n<=teamsPerGroup; n++){
            let id=i+''+n;
            $('#'+id).removeClass('bg-win');
            let team=this.$parent.groups[i][n];
            let place=$("#"+id+" .place").val();
            let points=$("#"+id+" .points").val();
            let GD=$("#"+id+" .GD").val();

            //Input Validation
            if(!place || !points || !GD)    {error= this.displayInputError("Error! All inputs MUST be filled", cardFooter, cardHeader); break;}                 
            if(availablePlaces[place]==0)   {error= this.displayInputError('Error! Place MUST be unique!', cardFooter, cardHeader); break;}
            
            availablePlaces[place]=0;
            team.points=points; team.place=place; team.GD=GD;
          }
        } // For loops END

        if(error) return 0;
        $('#confirm').hide();
        $('#advance').removeAttr('hidden');
       let seeded=[], unseeded=[];
       for (let i=1; i<=groupsNum; i++){ 
          for(let n=1; n<=teamsPerGroup; n++){
            let id=i+''+n;
            let team=this.$parent.groups[i][n];
            if(team.place==1){ $('#'+id).addClass('bg-win'); seeded.push(team.name);} 
            else if(team.place==2){$('#'+id).addClass('bg-win'); unseeded.push(team.name);}
            // Disable inputs
            $("#"+id+" .place").prop( "disabled", true );
            $("#"+id+" .points").prop( "disabled", true );
            $("#"+id+" .GD").prop( "disabled", true );
          } 
        } // For loops END      
        this.$parent.createBracket(seeded, unseeded); 
      },

      displayInputError(message, cardFooter, cardHeader){
        cardFooter.html('<span class="text-danger text-15">'+message+'</span>'); 
        cardHeader.addClass('text-danger'); 
        return true;
      } 
    } // Methods END
}
</script>