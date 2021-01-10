<template>
    <div id="startpage" class="container-fluid">
        <div class="row">
            <div class="col">
                <h1 >Welcome to Competion Predictor!</h1>
                <router-link to="/competionSelect" class="btn btn-dark btn-color-pink btn-hover-aqua">Start your prediction</router-link>
            </div>
        </div>
    </div>
</template>
 
<script>
    export default {
        name:'startpage',
        data(){
            return {};
        }
    }
</script>

