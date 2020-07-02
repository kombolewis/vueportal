<template lang="pug">
    .container
        .row.mt-4
            .offset-md-2.col-md-6(style="margin-top:3%")
                h2 Login
                hr
                form(action="#" @submit.prevent="login")
                    .form-group
                        label(for="id_no") ID Number
                        input.form-control(type="text" placeholder="Enter your ID Number" :value="id_no" ) 
                    .form-group
                        label(for="password") 
                        input.form-control(type="password" placeholder="Enter your Password" v-model="password")

                        button.btn.btn-primary.mt-3(type="submit") Submit
                        .d-flex.justify-content-end
                            a(href="#" @click="forgotPassword") Forgot Password
</template>

<script>
import {mapActions} from 'vuex'
export default {
    name:'CustomerLogin',
    
    data: () => ({
        password:''
    }),
    methods: {
        ...mapActions(['loginUser']),
        login(){
            this.loginUser({
                id_no:this.id_no,
                password:this.password
            })
            .then(data => { 
                if(data.status == '02'){ //user is using otp redirect to setpassword
                    let id_no = this.id_no
                    this.$router.push({name:'SetPassword', params:{id_no}})
                }else if(data){ //returning user
                    console.log(data)
                    this.$router.push({name:'Dashboard'})
                }
            })
            .catch(err => {
                console.log(err)
            })
        },
        forgotPassword(){
            let id_no = this.id_no
            this.$router.push({name:'ResetPassword',params:{id_no}})
        }
    },
    props:['id_no'],

}
</script>

<style>

</style>