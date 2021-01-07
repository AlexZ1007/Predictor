<template>
    <div id="compSelect" class="container">
        <div class="row competionsDisplay" >
            <div :id="i.id" class="col-sm comp" v-for="i in $parent.competions" :key="i.id">
                <h2>{{i.name}}</h2>
                <div class="row options"> 
                    <router-link  :to="'/customGroups/'+i.id" class="col-sm btn btn-dark btn-color-pink btn-hover-aqua" 
                                  @mouseover.native="showInfo('Info: Insert the teams into a specific group.', i.id)" 
                                  @mouseleave.native="hideInfo(i.id)">
                                  Custom Groups</router-link>
                    <router-link  :to="'/randomGroups/'+i.id"  class="col-sm  offset-1 btn btn-dark btn-color-pink btn-hover-aqua"  
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
    methods:{
        showInfo(message, compID){
            $('#'+compID+' span').text(message);
        },
        hideInfo(compID){
            $('#'+compID+' span').text('');
            
        }
    }
}
</script>