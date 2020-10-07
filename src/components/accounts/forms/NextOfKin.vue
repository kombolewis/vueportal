<template lang="pug">
	.container
		.row.mb-2.mt-4
			.col-md-6
				| Next of Kin
		hr
		br 
		.row.mt-1
			.offset-md-2.col-md-6
				form(action="#" @submit.prevent="registerAcc")
					.form-group
						h5 Fill Next of Kin Details here 
					div
						.form-group.d-flex.justify-content-end
							.dropdown
								button.btn.btn-outline-secondary.dropdown-toggle(type='button' data-toggle='dropdown')
									| Select Member Number
									span.caret
								ul.dropdown-menu
									a.link(href="#" v-for="account in accounts" v-model="selectedAccount" @click="select([account.accountNumber,account.accountType])" ) {{ `${account.accountNumber} - ${account.accountType} `}} <br>
						.form-group
							label(for="accno") Member No:
							span.text-danger *
							input.form-control(type="text" placeholder="Member Number" :value="selectedAccount[0]" required)
						.form-group
							label(for="phoneno") Applicant Phone Number:
							span.text-danger *
							input.form-control(type="text" placeholder="Enter Phone Number" v-model="updatePhoneNo" required)
						.form-group
							label(for="email") Email Address
							input.form-control(type="email" placeholder="example@domain.com" v-model="email" )
						.form-group
							.btn-group(role='group' aria-label='Basic example')
								button.btn.btn-outline-secondary(type='button'  @click="noOfKin = 1") One
								button.btn.btn-outline-secondary(type='button'  @click="noOfKin = 2") Two
								button.btn.btn-outline-secondary(type='button' @click="noOfKin = 3") Three
								button.btn.btn-outline-secondary(type='button' @click="noOfKin = 4") Four
								button.btn.btn-outline-secondary(type='button' @click="noOfKin = 5") Five

						vue-tabs(v-if="noOfKin")
							v-tab(v-for="kin in noOfKin" :title="`${toString(kin, true)} Kin`" ) 
								.mt-2.ml-2
									.form-group
										label(for="name") Person
										span &nbsp; {{toString(kin)}}
										span &nbsp; Name
										span.text-danger *
										input.form-control(type="text" placeholder="full names" @change="mapModel(kin,$event,'name')" required)
									.form-group
										label(for="email") Person 
										span &nbsp; {{toString(kin)}}
										span &nbsp; Email:
										input.form-control(type="email" placeholder="example@domain.com" @change="mapModel(kin,$event,'email')" )
									.form-group
										label(for="phone") Phone Number:
										input.form-control(type="text" placeholder="Enter phone number" @change="mapModel(kin,$event,'phone')" )
									.form-group
										label(for="relation") Relationship:
										span.text-danger *
										input.form-control(type="email" placeholder="Your relationship with next of kin" @change="mapModel(kin,$event,'relationship')" required)
									.form-group
										label(for="idno") Id Number:
										span.text-danger *
										input.form-control(type="text" placeholder="Enter id number" @change="mapModel(kin,$event,'idno')"  required)
									.form-group
										label(for="percent") Percentage:
										input.form-control(type="text" placeholder="%value allocated" @change="mapModel(kin,$event,'percentage')" )
					

						.d-flex.justify-content-end
							button.btn.btn-success.mt-3(id="submit" type="submit") Submit	
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
import {VueTabs, VTab} from 'vue-nav-tabs'
import 'vue-nav-tabs/themes/vue-tabs.css'

export default {
		name:'Join',
		data : () => ({
      postalAddress:'',
			showModal:false,
			submitIndividual:true,
			email:'',
			updatePhoneNo:'',
			selectedAccount:[],
			noOfKin:0,
			personName:[],
			personEmail:[],
			personPhoneNumber:[],
			personRelation:[],
			personPercentage:[],
			personIdNo:[],

		}),
		components:{
			VueTabs,
			VTab
		},
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
			toString(num,loc=false){
				const dataEle = {
					1:'One',
					2:'Two',
					3:'Three',
					4:'Four',
					5:'Five'
				}
				const dataTitle ={
					1:'First',
					2:'Second',
					3:'Third',
					4:'Fourth',
					5:'Fifth'
				}

				if(loc)
					return dataTitle[num]
				else
					return dataEle[num]
			},
			mapModel(num, evt, field){
				if(field == 'email')
					this.personEmail.push({position:this.toString(num), value:evt.target.value})
				else if(field == 'name')
					this.personName.push({position:this.toString(num), value:evt.target.value})
				else if(field == 'idno')
					this.personIdNo.push({position:this.toString(num), value:evt.target.value})
				else if(field == 'percentage')
					this.personPercentage.push({position:this.toString(num), value:evt.target.value})
				else if(field == 'phone')
					this.personPhoneNumber.push({position:this.toString(num), value:evt.target.value})
				else if(field == 'relationship')
					this.personRelation.push({position:this.toString(num), value:evt.target.value})
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
.noBorder{
	border: 0;
}
</style>