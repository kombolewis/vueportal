<template lang="pug">
    .container
        .row.mt-4
            .offset-md-2.col-md-6(style="margin-top:3%")
                h2 Login
                hr
                form(action="#" @submit.prevent="login")
                    .form-group
                        label(for="id_no") ID Number
                        input.form-control(type="text" placeholder="Enter your ID Number" v-model="id_no" ) 
                    .form-group
                        label(for="password") 
                        input.form-control(type="password" placeholder="Enter your Password" v-model="password")

                        button.btn.btn-primary.mt-3(type="submit") Submit
</template>

<script>
export default {
    name:'CustomerLogin',
    
    data: () => ({
        password:''
    }),
    methods: {
        login(){

        }
    },
    props:['id_no'],

}
</script>

<style>

</style>