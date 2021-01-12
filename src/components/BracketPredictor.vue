<template>
    <div class="container margin-top-10" v-if="validCompId">
        <div class="d-flex flex-md-nowrap">
            <div id="bracket" class="col align-self-center" v-for="i in totalPhasesNumber" :key="i">
                <div id="advance-div" :class="'adv-'+i+' margin-bottom-15'">
                    <router-link :id="'next-btn'+i" class="btn btn-dark btn-color-pink btn-hover-aqua" to="" event="" @click.native.prevent="nextRound(i)" hidden>Next round</router-link><br> 
                    <span class="text-danger text-15"></span>
                </div>
                
                <div class="card border-2 margin-bottom-15 " style="width:330px" v-for="n in bracket['phase'+i].length/2" :key="n" :id="i.toString()+n.toString()"> 
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item" v-for="j in 2" :key="j">
                          <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text">N/A</span>
                            </div>
                                <input type="number" class="form-control place" min="0" placeholder="Goals" disabled>
                          </div>
                        </li>
                    </ul>
                    <div class="card-footer"></div>
                </div>
               
            </div>
        </div>  
    </div>
      
</template>
<script>
import $ from 'jquery'
export default {
    data: function(){ 
        return {
            currentPhaseNum: 1,
            totalPhasesNumber: this.$parent.totalPhasesNumber,
            bracket: this.$parent.bracket,
            validCompId: false
            } 
        },
    props: ['compID'],
    created(){
        if(!this.$parent.competions[this.compID]){
            this.$router.push(this.compID+"/404-invalid-id");
            return 0;
        }
        if(!this.bracket['phase'+1]) {
            this.bracket=JSON.parse(localStorage.bracket);
            this.totalPhasesNumber=JSON.parse(localStorage.totalPhasesNumber);
            this.currentPhaseNum=JSON.parse(localStorage.currentPhaseNum) 
        }
        this.validCompId=true;
    },
    mounted: function(){
        if(!this.validCompId) return 0; 
        for(let i=1; i<this.currentPhaseNum; i++){
                this.unlockInput(i);
                this.recoverProgress(i);
        }
        this.unlockInput(this.currentPhaseNum);
    },
    methods:{
        nextRound(phaseNum){
            if(this.currentPhaseNum!=phaseNum) return 0;
            if(phaseNum==this.totalPhasesNumber){ this.final(); return 0;}   // Check if it is the final(last game)
            
            $(".card-footer").html("");
            $(".adv-"+phaseNum+" span").html("");

            let nextPhaseTeamId=0;
            let nextPhase=this.bracket['phase'+(phaseNum+1)];
            let currentPhase=this.bracket['phase'+phaseNum];

            let error=false;

            for(let i=0;i<currentPhase.length;i+=2){
                let team1=currentPhase[i];
                let team2=currentPhase[i+1];                // Teams
                let id='#'+phaseNum+''+(Math.ceil((i+1)/2));
               
                let input_team1=$(id+' input:eq(0)')
                let input_team2=$(id+' input:eq(1)')
                team1.goals=input_team1.val();    
                team2.goals=input_team2.val();     // Get the goals from input
        
                let winner;
                //Check which team progress to next round
                if(team1.goals < 0 || team1.goals < 0) {
                    $(id+" .card-footer").html("<span class='text-danger text-15'>Error! Goals MUST be a positive number!</span>");// Display error to the box
                    $('.adv-'+phaseNum+' span').html("Error! Goals MUST be a positive number for all matches!"); //Display error under the top button
                    error=true;
               } else if(team2.teamName=='N/A' || parseInt(team1.goals)>parseInt(team2.goals)){ 
                    winner={teamName: team1.teamName, goals: 0};
                    $(id+' li:eq(0)').addClass('bg-win');    
                    $(id+' li:eq(1)').addClass('bg-lose');     // Set the bg                         
                }
                else if(team1.teamName=='N/A' || parseInt(team1.goals)<parseInt(team2.goals)){  
                    winner={teamName: team2.teamName, goals: 0};
                    $(id+' li:eq(0)').addClass('bg-lose');       
                    $(id+' li:eq(1)').addClass('bg-win');     // Set the bg     
                } else if(team1.teamName!='N/A' && team2.teamName!='N/A'){
                    $(id+" .card-footer").html("<span class='text-danger text-15'>Error! Score CAN'T be equal!</span>");// Display error to the box
                    $('.adv-'+phaseNum+' span').html("Error! All matches need a winner! Score CAN'T be equal!"); //Display error under the top button
                    error=true;
                } 

                nextPhase[nextPhaseTeamId]=winner;   
                nextPhaseTeamId++;
                
                // Disable the inputs
                if(error) continue;
                
                input_team1.prop( "disabled", true );
                input_team2.prop( "disabled", true );
            }
            if(error) return 0;
            this.currentPhaseNum+=1;
            localStorage.bracket=JSON.stringify(this.bracket); // Store bracket
            localStorage.currentPhaseNum=JSON.stringify(this.currentPhaseNum); // Store bracket
            this.unlockInput(this.currentPhaseNum);
        },
        unlockInput(phaseNum){

            const phase=this.bracket['phase'+phaseNum];
            for(let i=1;i<=phase.length;i++){
                let eq=(i-1)%2;
                let id='#'+phaseNum+''+Math.ceil(i/2);
                let team=phase[i-1];
                $(id+' .input-group-text:eq('+eq+')').html(team.teamName);
                if(team.teamName=="N/A") continue;
                $(id+' input:eq('+eq+')').removeAttr('disabled');
            }
            $("#next-btn"+phaseNum).removeAttr('hidden');
        },
        final(){
            let phaseNum=this.totalPhasesNumber;
            let currentPhase=this.bracket['phase'+phaseNum];
            let id='#'+phaseNum+'1';

            $(".card-footer").html("");
            $(".adv-"+phaseNum+" span").html("");
            
            let team1=currentPhase[0];
            let team2=currentPhase[1];                // Teams

            let input_team1=$(id+' input:eq(0)')
            let input_team2=$(id+' input:eq(1)')
            team1.goals=input_team1.val();    
            team2.goals=input_team2.val(); 

            let error=false;

            if(team2.teamName=='N/A' || parseInt(team1.goals)>parseInt(team2.goals)){ 
                $(id+' li:eq(0)').addClass('bg-win');    
                $(id+' li:eq(1)').addClass('bg-lose');     // Set the bg                         
            }
            else if(team1.teamName=='N/A' || parseInt(team1.goals)<parseInt(team2.goals)){  
                $(id+' li:eq(0)').addClass('bg-lose');       
                $(id+' li:eq(1)').addClass('bg-win');     // Set the bg     
            } else if(team1.teamName!='N/A' && team2.teamName!='N/A'){
                $(id+" .card-footer").html("<span class='text-danger text-15'>Error! Score CAN'T be equal!</span>");// Display error to the box
                $('.adv-'+phaseNum+' span').html("Error! All matches need a winner! Score CAN'T be equal!"); //Display error under the top button
                error=true;
            }

            if(error) return 0;
            input_team1.prop( "disabled", true );
            input_team2.prop( "disabled", true );
        },
        recoverProgress(phaseNum){
            let currentPhase=this.bracket['phase'+phaseNum];
            for(let j=0;j<currentPhase.length;j+=2){
                let id='#'+phaseNum+''+Math.ceil((j+1)/2);
                $(id+" input:eq(0)").val(currentPhase[j].goals); 
                $(id+" input:eq(0)").prop('disabled',true);
                $(id+" input:eq(1)").val(currentPhase[j+1].goals);
                $(id+" input:eq(1)").prop('disabled',true);
            }
        }
    }

}
</script>