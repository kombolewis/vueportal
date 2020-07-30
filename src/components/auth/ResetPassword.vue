<template lang="pug">
    .container
        .row-mt-4
            .offset-md-2.col-md-6(style="margin-top:3%")
                div(role="alert").alert.alert-info.alert-dismissable.fade.show Kindly note. This module is still under construction
                    button.close(type="button" data-dismiss="alert" aria-label="Close")
                        span(aria-hidden="true") &#215;
        .row-mt-4
            .offset-md-2.col-md-6(style="margin-top:3%")
                div(v-if="message")
                    div(role="alert").alert.alert-warning.alert-dismissable.fade.show {{message}}
                        button.close(type="button" data-dismiss="alert" aria-label="Close")
                            span(aria-hidden="true") &#215;
        .row.mt-4
            .offset-md-2.col-md-6(style="margin-top:3%")
                .d-flex.justify-content-center
                    h3 Reset Password
                br
                p Reset your password here
                hr
                form(action="#" @submit.prevent="resetPassword")
                    .form-group
                        label(for="password") Password
                        input.form-control(type="password" placeholder="Enter your Password" v-model="password" required)
                    .form-group
                        label(for="confirm Password") Confirm Password
                        input.form-control(type="password" placeholder="Enter Password again" v-model="password2" required)

                        button.btn.btn-primary.mt-3(type="submit") Submit

</template>

<script>
import {mapActions} from 'vuex'
export default {
    name:'SetPassword',
    props:['id_no'],
    data: () => ({
        password:'',
        password2:'',
        message: '',
        info: ''
    }),
    methods:{
        ...mapActions(['resetUserPassword']),
        resetPassword(){
            
            if(!this.errorChecking()){
                /**
                 * No errors
                 */
                this.resetUserPassword({
                    password:this.password,
                    id_no:this.id_no
                })
                .then(data => {
                    if(data.status == '22'){ //send to Dashboard
                        console.log(data)
                        this.$router.push({name:'Dashboard'})
                    }
                })
                .catch(err => {
                    console.log(err)
                })
            } 

        },
        errorChecking(){
            if(this.password  != this.password2){
                if(this.message){
                    this.message = ''
                    return this.message = 'Your passwords do not match'

                }
                return this.message = 'Your passwords do not match'
            }
            else if(this.password.length < 6){
                if(this.message){
                    this.message = ''
                    return this.message = 'Password too short. Password should be atleast 6 characters'
                }
                return this.message = 'Password too short. Password should be atleast 6 characters'
                
            }
            else if(this.id_no == ''){
                return 'This module requires ID.NO'
            }
            return false
        },
        info(){
            return this.info = 'Kindly note. This module is still under construction.'
        }
    }
}
</script>