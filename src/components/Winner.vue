<template>
     <div class="container">
          <div class="row padding-top-20">
            <div class="col">
                <h1>The winnner is <b>{{name}}</b> </h1>
                <router-link to="/competionSelect" class="btn btn-dark btn-color-pink btn-hover-aqua">Return to competion select</router-link>
            </div>
          </div>
     </div>
</template>

<script>
export default {
    props: ['name']
}
</script>