<template lang="pug">
	.container
		.row.mb-2.mt-4
			.col-md-6
				| Withdraw
		hr
		br 
		.row.mt-1
			.offset-md-2.col-md-6
				form(action="#" @submit.prevent="registerAcc")
					.form-group
						h5 Fill your details here 
					div
						.form-group.d-flex.justify-content-end
							.dropdown
								button.btn.btn-outline-secondary.dropdown-toggle(type='button' data-toggle='dropdown')
									| Select Account
									span.caret
								ul.dropdown-menu
									a.link(href="#" v-for="account in accounts" v-model="selectedAccount" @click="select([account.accountNumber,account.accountType])" ) {{ `${account.accountNumber} - ${account.accountType} `}} <br>
						.form-group
							span.pr-2 Select Payment method:
							.form-check.form-check-inline
								input.form-check-input(type='radio' name='payment' value='bank' v-model="paymentMethods" @change="togglePayments")
								label.form-check-label(for='UT')
									| Bank
							.form-check.form-check-inline
								input.form-check-input(type='radio' name='payment' value='mpesa'  v-model="paymentMethods" @change="togglePayments")
								label.form-check-label(for='PE')
									| Mpesa


					
					//- individual form
					div(v-if="paymentMethods")
						.form-group
								label(for="phoneno")  Mobile Phone Number:
								input.form-control(type="text" placeholder="Enter your your Phone Number" v-model="userTelno" required)
						div(v-if="paymentMethods == 'bank'")
							.form-group
								label(for="name") Bank Name:
								input.form-control(type="text" placeholder="Enter Receiver's Bank Name" v-model="receiversName" required)  
							.form-group
								label(for="Accname") Account Name:
								input.form-control(type="text" placeholder="Enter Receiver's Account Name" v-model="accountName" required)
							.form-group
								label(for="accbra") Branch:
								input.form-control(type="text" placeholder="Enter Receiver's Bank Branch" v-model="bankBranch" required)
							.form-group
								label(for="accno") Account Number:
								input.form-control(type="text" placeholder="Enter Receivers Bank Account Number" v-model="accountNumber" required)
						div(v-if="paymentMethods == 'mpesa'")
							.form-group
								label(for="phoneno")  Mobile Phone Number:
								input.form-control(type="text" placeholder="Enter your Recipient Phone Number" v-model="receptTelno" required)
						.form-group
							label(for="amt")  Amount to Withdraw:
							input.form-control(type="text" placeholder="Enter Amount to Withdraw" v-model="amount" required)
						.form-group
							label(for="accno") Your Email Address:
							input.form-control(type="email" placeholder="example@domain.com" v-model="email" required)
						

						.form-group.form-check
							input.form-check-input(type='checkbox' required='' @change="toggleIndivSubmit")
							label.form-check-label(for='invalidCheck')
								span Agree to &nbsp;
									span 
										a(href="#" @click="show") Terms &#38; Conditions
						.d-flex.justify-content-end
							button.btn.btn-success.mt-3(type="submit" id="submit" :disabled="submitIndividual") Submit			  
					
					//- showModal
					div(v-if="showModal")
						modal(name="TNC")
							div.customModal
								h3 Modes of withdrawal
								p 1. Bank payments are done either through electronic funds transfer (EFT) or real time gross settlement (RTGS)
								ul 
									li RTGS payments are for sums of one million shillings and above.
									li EFT payments are for sums that are one million shillings and below.
								p 2. Funds are also sent via mobile money transfer (M-Pesa) up to a maximum of Ksh.70,000.
								p 3. Processing of withdrawals takes three working days
								b N.B.
								div Standard rates charged by the banks and the M-Pesa service subscriber will apply. 
								.d-flex.justify-content-end.align-items-end.mb-1.mr-1
									button.btn.btn-secondary(@click="hide") Close
										



</template>

<script>

import {mapGetters} from 'vuex'

export default {
		name:'Join',
		data : () => ({
			paymentMethods:'',
			submitIndividual:true,
			showModal:false,

			// individual
			receiversName:'',
			accountName:'',
			bankBranch:'',
			accountNumber:'',
			amount:'',
			email:'',
			receptTelno:'',
			selectedAccount:'',
			userTelno:''

		}),

		methods:{
			show(){
				this.showModal = true
				this.$modal.show('TNC')
			},
			hide(){
				this.$modal.hide('TNC')
			},
			toggleIndivSubmit(){
				this.submitIndividual = !this.submitIndividual	
			},
			togglePayments(){
				console.log('changed')
			},
			select(selection){
				this.selectedAccount = selection
			}

		},
		computed:{
				...mapGetters(['getAllAccounts']),

				accounts(){
					const data = [];

					if(this.getAllAccounts.money_market.length > 0 && this.getAllAccounts.pension.length > 0){
				
						this.getAllAccounts.money_market.forEach(row => {
							data.push({
											accountType:row.PORTFOLIO,
											accountNumber: row.MEMBER_NO,
									})
							})
						
						this.getAllAccounts.pension.forEach(row => {
							data.push({
										accountType:row.PORTFOLIO,
										accountNumber: row.MEMBER_NO,
		
									})
							})
						
					}
					else if(this.getAllAccounts.money_market.length > 0){
				
						this.getAllAccounts.money_market.forEach(row => {
							data.push({
											accountType:row.PORTFOLIO,
											accountNumber: row.MEMBER_NO,
									})
							})
					}else if(this.getAllAccounts.pension.length > 0){
						this.getAllAccounts.pension.forEach(row => {
							data.push({
										accountType:row.PORTFOLIO,
										accountNumber: row.MEMBER_NO,
		
									})
							})
					}

					return data

				}
		},
    beforeCreate(){
        this.$store.dispatch('retrieveAccounts')
    }
 }
</script>

<style scoped>
.customModal{
	max-height:100%;
	overflow-y: scroll;
}
.link{
	color:inherit;
	/* text-decoration: none; */

}
.link:hover{
	color:none;
}
</style>