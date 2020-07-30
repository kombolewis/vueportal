<template lang="pug">
    div
        nav(style="background-color:#404040;").navbar.navbar-expand-lg.navbar-dark
            .navbar-brand
                .router-link
                    <router-link :to="{name:'Dashboard'}" >Portal</router-link>
            button.navbar-toggler(type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation")
                span.navbar-toggler-icon
            .collapse.navbar-collapse#navbarSupportedContent
                ul.navbar-nav.ml-auto
                    div(v-if="!loggedIn")
                        li.nav-item
                            <router-link :to="{name:'Login'}"> Login</router-link>
                    .div(v-else)
                        li.nav-item
                            <router-link :to="{name:'Dashboard'}">Home</router-link>                
                            <router-link :to="{name:'Logout'}"> Logout</router-link>
        
        

        
    


</template>
<script>
import {mapGetters} from 'vuex'
export default {
    name:'Navbar',
    computed:{
        ...mapGetters(['loggedIn'])
    }
}
</script>
<style scoped>



</style>