<template lang="pug">
	.container
		.row.mb-2.mt-4
			.col-md-6
				| Deposit
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
							span.pr-2 Select deposit method:
							.form-check.form-check-inline
								input.form-check-input(type='radio' name='deposits' value='bank' v-model="depositMethods"  )
								label.form-check-label(for='UT')
									| Bank
							.form-check.form-check-inline
								input.form-check-input(type='radio' name='deposits' value='mpesa'  v-model="depositMethods"  )
								label.form-check-label(for='PE')
									| Mpesa
							.form-check.form-check-inline
								input.form-check-input(type='radio' name='deposits' value='standingOrder'  v-model="depositMethods"  )
								label.form-check-label(for='PE')
									| Standing Order

					
					//- individual form
					div(v-if="depositMethods")
						div(v-if="depositMethods == 'bank'")
							.form-group(style="margin-left:20px")
								
								.form-check.form-check-inline
									input.form-check-input(type='radio' name='banks' value='KCB' v-model="banks")
									label.form-check-label(for='UT')
										| KCB
								.form-check.form-check-inline
									input.form-check-input(type='radio' name='banks' value='Absa'  v-model="banks" )
									label.form-check-label(for='PE')
										| Absa
								.form-check.form-check-inline
									input.form-check-input(type='radio' name='banks' value='standardChartered'  v-model="banks" )
									label.form-check-label(for='PE')
										| Standard Chartered
								
								div(v-if="banks == 'KCB'")
									.form-group
										table.table.table-bordered
											thead
												th KENYA COMMERCIAL BANK 
											tbody
												tr
													td Branch: <b> Custody Services </b>
												tr
													td Those investing in the <b><u> Balanced Fund </u></b>
												tr
													td The Account Name: <b> Zimele Unit Trust Balanced Fund </b>
												tr
													td Account Number: <b> 110-238-8653 </b>
												tr
													td Those investing in the <b><u> Money Market Fund </u></b>
												tr
													td The Account Name: <b> Zimele Unit Trust Money Market Fund </b>
												tr
													td Account Number: <b> 110-238-8815 </b>

								div(v-if="banks == 'Absa'")
									.form-group
										table.table.table-bordered
											thead
												th ABSA BANK KENYA LIMITED 
											tbody
												tr
													td Branch: <b> Absa Towers </b>
												tr
													td Those investing in the <b><u> Balanced Fund </u></b>
												tr
													td The Account Name: <b> Zimele Unit Trust Balanced Fund </b>
												tr
													td Account Number: <b> 03077-500-6331 </b>
												tr
													td Those investing in the <b><u> Money Market Fund </u></b>
												tr
													td The Account Name: <b> Zimele Unit Trust Money Market Fund </b>
												tr
													td Account Number: <b> 03077-500-6757 </b>
								div(v-if="banks == 'standardChartered'")
									.form-group
										table.table.table-bordered
											thead
												th STANDARD CHARTERED BANK 
											tbody
												tr
													td Branch: <b> Head Office </b>
												tr
													td Those investing in the <b><u> Money Market Fund </u></b>
												tr
													td The Account Name: <b> Zimele Unit Trust Money Market Fund </b>
												tr
													td Account Number: <b>  0105-016-758900 </b>
						div(v-if="depositMethods == 'standingOrder'")
							.form-check.form-check-inline
								input.form-check-input(type='radio' name='stoTypes' value='so'  v-model="stoTypesModel" )
								label.form-check-label(for='PE')
									| Standing Order
							.form-check.form-check-inline
								input.form-check-input(type='radio' name='stoTypes' value='sap'  v-model="stoTypesModel" )
								label.form-check-label(for='PE')
									| Schedule Automated Payment
							div(v-if="stoTypesModel == 'so'")
								.form-group
									label(for="accno") Account No:
									input.form-control(type="text" placeholder="Account Number" :value="selectedAccount[0]" required)
								.form-group
									label(for="origBank") Originating Bank:
									span.text-danger *
									input.form-control(type="text" placeholder="Enter Bank Name"  v-model="originationBank" required)
								.form-group
									label(for="bbranch") Bank Branch:
									span.text-danger *
									input.form-control(type="text" placeholder="Enter Bank Branch" v-model="bankBranch" required)
								.form-group
									label(for="accno") Bank Account No:
									span.text-danger *
									input.form-control(type="text" placeholder="Bank Account Number" v-model="bankAccNo" required)
								.form-group
									label(for="amount") Standing Order Amount:(Ksh)
									span.text-danger *
									input.form-control(type="text" placeholder="Enter amount to deposit " v-model="amount" required)
								.form-group
									label(for="sodate") Date of standing order:
									span.text-danger *
									input.form-control(type="date" v-model="dateOfStandingOrder" required)
								.form-group
									label(for="standingorder") Copy of the standing order form  
									span.text-danger *
									.input-group.mb-3
										.custom-file
											input#standingorderid.custom-file-input(type='file' @change="validateFileInput($event)"  multiple)
											label#standingorderlbl.custom-file-label(for='custominput') Choose file
									span#standingorder
								.form-group
									label(for="email") Email
									span.text-danger *
									input.form-control(type="email" placeholder="Enter email " v-model="email" required)
								.form-group.form-check
									input.form-check-input(type='checkbox' required @change="submitIndividual = !submitIndividual")
									label.form-check-label(for='invalidCheck')
										span Agree to &nbsp;
											span 
												a(href="#" @click="show") Terms &#38; Conditions
								.d-flex.justify-content-end
									button.btn.btn-success.mt-3(id="submit" type="submit" :disabled="submitIndividual") Submit		  	
							div(v-if="stoTypesModel == 'sap'")
								.form-group
									label(for="name") Customer Name:
									input.form-control(type="text" placeholder="Enter your name" v-model="customerName" required)
								.form-group
									label(for="atm") Debit/ATM Number:
									input.form-control(type="text" placeholder="Enter your Debit/ATM  Number" v-model="debitAtmNo" required)
								.form-group
									label(for="accno") Account No:
									input.form-control(type="text" placeholder="Account Number" :value="selectedAccount[0]" required)
								.form-group
									label(for="amount") Amount:
									input.form-control(type="text" placeholder="Enter amount to deposit " v-model="amount" required)

								.form-group.form-check
									input.form-check-input(type='checkbox' required @change="submitIndividual = !submitIndividual")
									label.form-check-label(for='invalidCheck')
										span Agree to &nbsp;
											span 
												a(href="#" @click="show") Terms &#38; Conditions
								.d-flex.justify-content-end
									button.btn.btn-success.mt-3(id="submit" type="submit" :disabled="submitIndividual") Submit		
						div(v-if="depositMethods == 'mpesa'")
							.form-group
								label(for="phoneno") Phone Number:
								input.form-control(type="text" placeholder="Enter your Recipient Phone Number" v-model="receptTelno" required)
							.form-group
								label(for="accno") Account No:
								input.form-control(type="text" placeholder="Account Number" :value="selectedAccount[0]" required)
							.form-group
								label(for="amount") Amount:
								input.form-control(type="text" placeholder="Enter amount to deposit " v-model="amount" required)
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

export default {
		name:'Join',
		data : () => ({
			depositMethods:'',
			showModal:false,
			submitIndividual:true,
			banks:'',
			stoTypesModel:'',

			// individual
			receiversName:'',
			accountName:'',
			bankBranch:'',
			accountNumber:'',
			amount:'',
			email:'',
			receptTelno:'',
			selectedAccount:[],
      userTelno:'',
			originationBank:'',
			bankAccNo:'',
			dateOfStandingOrder:'',
			standingOrder:[],
			customerName:'',
			debitAtmNo:'',
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
			},
			validateFileInput(evt){
					let files = evt.target.files;
					let fileNames = [];
					let errors = [];
					let inputId = evt.target.attributes.id.value

					Object.keys(files).forEach(key => {
					
							fileNames.push(files[key].name)

							if(files[key].size > 2097152){
									errors.push(files[key].name + ' exceeds allowable file size of 2MB')
							}

					});
					

					let modFileNames = [...new Set(fileNames)]
					let str = ''
					let i = 0;
					modFileNames.forEach(name =>{
							if(i == 0){
									str = name;
							}else{
									str = str + ',' +name
							}
							i++
					})

					// get generic id from the name attribure 
					let id = inputId.slice(0, -2)
					

					
					//generate labelId
					let labelId = id + 'lbl'
					document.getElementById(labelId).textContent = str;
					
					let label = (document.getElementById(labelId).parentElement.parentElement.previousSibling.previousSibling.innerHTML).split(' ')
					let inputLabel = label[0] + label[1].split('/')[0]
					// console.log(inputLabel)

					//generate Spanid - its the generic id generated
					if(errors.length > 0) {     
							errors.forEach(err => {

									let div = document.createElement('div');
									div.innerHTML = err
									div.className = 'text-danger';
									document.getElementById(id).appendChild(div)

							})
							document.getElementById("submit").disabled = true;
					}else{
							document.getElementById(id).innerHTML = '';
							document.getElementById("submit").disabled = false;

							Object.keys(files).forEach(key => {
								this.fileToBase4(files[key], inputId, inputLabel)

							});

					}

			},
			fileToBase4(file,input,label){

				const reader = new FileReader();

				reader.onloadend = () => {
					if(input.includes('standingorder')){
						this.standingOrder.push({label,value:reader.result})	
					}
				}
				reader.readAsDataURL(file)

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