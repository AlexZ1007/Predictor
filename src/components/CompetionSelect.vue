<template>
    <div id="compSelect" class="container no-padding">
        <div class="row competionsDisplay" >
            <div :id="i.id" class="col comp" v-for="i in $parent.competions" :key="i.id">
                <h2>{{i.name}}</h2>
                <div class="row options"> 
                    <router-link  :to="'/customGroups/'+i.id" class="col btn btn-dark btn-color-pink btn-hover-aqua" 
                                  @mouseover.native="showInfo('Info: Insert the teams into a specific group.', i.id)" 
                                  @mouseleave.native="hideInfo(i.id)">
                                  Custom Groups</router-link>
                    <router-link  :to="'/randomGroups/'+i.id"  class="col  offset-1 btn btn-dark btn-color-pink btn-hover-aqua"  
                                  @mouseover.native="showInfo('Info: Insert the teams into seeds. Then the grups are made randomly.', i.id)" 
                                  @mouseleave.native="hideInfo(i.id)">
                                  Random Groups</router-link>
                </div>
                <span class="info"></span>
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
    mounted(){this.makeDesignResponsive()},
    methods:{
        showInfo(message, compID){
            $('#'+compID+' span').text(message);
        },
        hideInfo(compID){
            $('#'+compID+' span').text('');
        },
        makeDesignResponsive(){
            if(innerWidth<850) {
                $("#compSelect .row").addClass("row-cols-1");
                for(let i=0;i<this.$parent.competions.length;i++) $(".row .options:eq("+i+") .col:eq(1)").removeClass("offset-1")
            }
            else{ 
                $("#compSelect .row").removeClass("row-cols-1");
                for(let i=0;i<this.$parent.competions.length;i++) $(".row .options:eq("+i+") .col:eq(1)").addClass("offset-1")
            }
        }
    }
}
</script>