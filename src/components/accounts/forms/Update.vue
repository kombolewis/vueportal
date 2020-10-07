<template lang="pug">
	.container
		.row.mb-2.mt-4
			.col-md-6
				| Update Details
		hr
		br 
		.row.mt-1
			.offset-md-2.col-md-6
				form(action="#" @submit.prevent="registerAcc")
					.form-group
						h5 Update Member Details 
					div
						.form-group.d-flex.justify-content-end
							.dropdown
								button.btn.btn-outline-secondary.dropdown-toggle(type='button' data-toggle='dropdown')
									| Select Account
									span.caret
								ul.dropdown-menu
									a.link(href="#" v-for="account in accounts" v-model="selectedAccount" @click="select([account.accountNumber,account.accountType])" ) {{ `${account.accountNumber} - ${account.accountType} `}} <br>
						.form-group
							label(for="accno") Account No:
							input.form-control(type="text" placeholder="Account Number" :value="selectedAccount[0]" required)
						.form-group
							label(for="phoneno") Update Phone Number:
							input.form-control(type="text" placeholder="Enter Phone Number" v-model="updatePhoneNo" )
						.form-group
							label(for="email") Update Email Address
							input.form-control(type="email" placeholder="example@domain.com" v-model="email" )
						.form-group
							label(for="postalAddr") Update Postal Address
							input.form-control(type="text" placeholder="Enter Postal Address" v-model="postalAddress" )
						.form-group.form-check
							input.form-check-input(type='checkbox' required @change="submitIndividual = !submitIndividual")
							label.form-check-label(for='invalidCheck')
							span Agree to &nbsp;
								span 
								a(href="#" @click="show") Terms &#38; Conditions
						.d-flex.justify-content-end
							button.btn.btn-success.mt-3(id="submit" type="submit" :disabled="submitIndividual") Submit	
					//- modal
					div(v-if="showModal")
						modal(name="TNC")
							div.customModal
								h4.text-center TERMS AND CONDITIONS
								div 1. The minimum investment amount is Kshs.100/=
								div 2. A member may liquidate part or all of their investment.
								div 3. When you are withdrawing money to Mpesa, the funds are received within 24hrs or a maximum of 2 working days while withdrawals to the bank will be received 3 working days.
								div 4. Inter-fund transfers are allowed subject to administration fees, where applicable.
								div 5. Any inter-fund transfer must be in writing, dated and signed by the holder of the account.
								div 6. Members placing standing orders must fill in the standing order form and attach a copy of the instructions given to their bank.
								div 7. There are no withdrawals fees, penalties or hidden charges
								div 8. Funds sent via mobile money transfer services will attract standard charges levied by the respective service providers. 
								h4 RETURNS ON YOUR INVESTMENTS
								div 1. Investment returns in the Balanced Fund are not guaranteed. Always remember that the value of your investment can rise or fall and that you may not get back the full amount you had invested, depending on prevailing market conditions. Past performance is not an indicator of future performance. The Balanced Fund should therefore be considered as a medium to long term investment.
								div 2. The principal amount in the Money Market Fund is not subject to fluctuations during the period of investment. Interest in the Money Market Fund is earned on a monthly basis and will vary from time to time based on conditions prevailing in the money market.
								h4 DECLARATION
								p I confirm that the record provided to establish our identity is accurate. I hereby declare that all of the monies I invest in the Zimele Unit Trust Funds, whether periodically or as a one-off contribution are from a legitimate source, and not from the proceeds of crime, money laundering or other illicit activities. Furthermore, we accept that should there be any justifiable suspicion as to the possibility that we, or another party acting on our behalf, may have engaged or been a participant in money laundering and related offences as outlined in the Proceeds of Crime and Anti-Money Laundering Act 2009, we shall absolve Zimele of any liability and assist the relevant authority with investigations on the same.
								p I have read and fully understood the contents of this document. I have accepted and complied with the terms and conditions as amended in so far as this application may affect our investments. I indemnify the Trustees, Fund Manager and Custodian of the funds against any contravention of these terms and conditions caused by my failure to comply with any provision thereof. 
								.d-flex.justify-content-end.align-items-end.mb-1.mr-1
									button.btn.btn-secondary(@click="hide") Close	 
					
		
</template>

<script>

import {mapGetters} from 'vuex'

export default {
		name:'Join',
		data : () => ({
      postalAddress:'',
			showModal:false,
			submitIndividual:true,
			email:'',
			updatePhoneNo:'',
			selectedAccount:[],

		}),

		methods:{
			show(){
				this.showModal = true
				this.$modal.show('TNC')
			},
			hide(){
				this.$modal.hide('TNC')
			},
			select(selection){
				this.selectedAccount = selection
			},

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
.noBorder{
	border: 0;
}
</style>