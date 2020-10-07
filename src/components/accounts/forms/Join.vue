<template lang="pug">
	.container
		.row.mb-2.mt-4
			.col-md-6
				| Account Opening
		hr
		br 
		.row.mt-1
			.offset-md-2.col-md-6
				form(action="#" @submit.prevent="registerAcc")
					.form-group
						h5 Create Account
					div(v-if="showAccountType")
						.form-group
							span.pr-2 Select Account Type:
							.form-check.form-check-inline
								input.form-check-input(type='radio' name='accountTypes' value='UT' v-model="accountTypes" @change="toggleAccountTypes")
								label.form-check-label(for='UT')
									| Unit Trust
							.form-check.form-check-inline
								input.form-check-input(type='radio' name='accountTypes' value='PE'  v-model="accountTypes" @change="toggleAccountTypes")
								label.form-check-label(for='PE')
									| Pension

					div(v-if="showProfile")
						.form-group
							div Choose Account Profile:
							.form-check.form-check-inline
								input.form-check-input(type='radio' name='profile' value='individual'  @change="toggleProfile($event)")
								label.form-check-label(for='individual')
									| Individual
							.form-check.form-check-inline
								input.form-check-input(type='radio' name='profile' value='joint'  @change="toggleProfile($event)")
								label.form-check-label(for='joint')
									| Joint
							.form-check.form-check-inline
								input.form-check-input(type='radio' name='profile' value='group'   @change="toggleProfile($event)")
								label.form-check-label(for='group')
									| Group


					div(v-if="showUTFund")
						.form-group
							span.pr-2 Select Fund Type:
							.form-check.form-check-inline
								input.form-check-input(type='radio' name='fundTypes' value='MM' v-model="fundTypes" @change="toggleFund")
								label.form-check-label(for='MM')
									| Money Market
							.form-check.form-check-inline
								input.form-check-input(type='radio' name='fundTypes' value='BF'  v-model="fundTypes" @change="toggleFund")
								label.form-check-label(for='BF')
									| Balanced Fund
					div(v-if="showPEFund")
						.form-group
							div Select Fund Type:
							.form-check.form-check-inline
								input.form-check-input(type='radio' name='fundTypes' value='ZGPP'  @change="togglePEFund($event)")
								label.form-check-label(for='ZGPP')
									| Zimele Guaranteed Personal Pension Plan
							.form-check.form-check-inline
								input.form-check-input(type='radio' name='fundTypes' value='ZPP'   @change="togglePEFund($event)")
								label.form-check-label(for='ZPP')
									| Zimele Personal Pension Plan
					
					
					//- Detailed Funds
					
					div(v-if="showDetailedFunds")
						.form-group
							div Please Select an Account Of Your Choice:
							.form-check.form-check-inline
								input.form-check-input(type='radio' name='spAccs' value="Emergency Fund"  @change="showRealForm($event)" )
								label.form-check-label(for='emergencyFund')
									| Emergency Fund 
							.form-check.form-check-inline
								input.form-check-input(type='radio' name='spAccs' value="School Fees Plan"  @change="showRealForm($event)" )
								label.form-check-label(for='schoolFeesPlan')
									| School Fees Plan
							.form-check.form-check-inline
								input.form-check-input(type='radio' name='spAccs' value="Savings Plan"  @change="showRealForm($event)" )
								label.form-check-label(for='savingsPlan')
									| Savings Plan
					//-Individual Form

					div(v-if="showIndividualForm")
						.form-group
							label(for="name") Full Names
							input.form-control(type="text" placeholder="Enter your name" v-model="name" required)  
						.form-group
							label(for="Identification: PP/ID Number:") Identification: PP/ID Number:
							input.form-control(type="text" placeholder="Enter your PP/ID Number" v-model="idno" required)
						.form-group
							label(for="Mobile/Tel. No:") Mobile/Tel. No:
							input.form-control(type="text" placeholder="Enter your phone number" v-model="telno" required)
						.form-group
							label(for="Emal") Your Email Address:
							input.form-control(type="email" placeholder="example@domain.com" v-model="email" required)
						.form-group(v-if="accountTypes == 'PE'")
							label(for="pin") Enter KRA PIN
							input.form-control(type="text" placeholder="Enter your KRA PIN number" v-model="krapin" required)  
						.form-group
							label(for="National") National ID/Passport copy:
							span.text-danger *
							.input-group.mb-3
								.custom-file
									input#nationalid.custom-file-input(type='file' @change="validateFileInput($event)" multiple required)
									label#nationallbl.custom-file-label(for='custominput') Choose file
							span(style="font-size:smaller; font-style:italic;padding-top:-100px")#national 
						.form-group
							label(for="Passport size photo:") Passport size photo:
							span.text-danger *
							.input-group.mb-3
								.custom-file
									input#passportid.custom-file-input(type='file' @change="validateFileInput($event)"  multiple)
									label#passportlbl.custom-file-label(for='custominput') Choose file
							span#passport
						.form-group.form-check
							input.form-check-input(type='checkbox' required='' @change="toggleIndivSubmit")
							label.form-check-label(for='invalidCheck')
								span Agree to &nbsp;
									span 
										a(href="#" @click="show") Terms &#38; Conditions
						.d-flex.justify-content-end
							button.btn.btn-success.mt-3(type="submit" id="submit" :disabled="submitIndividual") Submit			  
					
					//- joint form
					div(v-if="showJointForm")
						vue-tabs
							v-tab(title='1st Applicant')
								.mt-2.ml-2
									div Are both applicant's signatories?
										span.text-danger *
										div
										.form-check.form-check-inline
											input.form-check-input(type='radio' name='signatories' @change="signatoriesBoth = true")
											label.form-check-label(for='signatories')
												| Yes
										.form-check.form-check-inline
											input.form-check-input(type='radio' name='signatories')
											label.form-check-label(for='signatories')
												| No
									.form-group
										label(for="name") First Applicants Name
										span.text-danger *
										input.form-control(type="text" placeholder="Enter your name"  v-model="firstApplicantName" required)  
					
									.form-group
										label(for="name") First Email Address
										span.text-danger *
										input.form-control(type="text" placeholder="Enter 1st Applicant's Email" v-model="firstApplicantEmail" required)  
								
									.form-group
										label(for="name") First Phone Number
										span.text-danger *
										input.form-control(type="text" placeholder="Enter 1st Applicant's Phone No." v-model="firstApplicantPhone" required) 

									.form-group
										label(for="National") 1st National ID/Passport copy:
										span.text-danger *
										.input-group.mb-3
											.custom-file
												input#nationalid.custom-file-input(type='file' @change="validateFileInput($event)" multiple required)
												label#nationallbl.custom-file-label(for='custominput') Choose file
										span(style="font-size:smaller; font-style:italic;padding-top:-100px")#national 

									.form-group
										label(for="Passport") 1st Passport Size Photo
										span.text-danger *
										.input-group.mb-3
											.custom-file
												input#passportid.custom-file-input(type='file' @change="validateFileInput($event)" multiple required)
												label#passportlbl.custom-file-label(for='custominput') Choose file
										span(style="font-size:smaller; font-style:italic;padding-top:-100px")#passport 
							v-tab(title='2nd Applicant')
								.mt-2.ml-2
									.form-group
										label(for="name") Second Applicants Name
										span.text-danger *
										input.form-control(type="text" placeholder="Enter 2nd Applicant name" v-model="secondApplicantName" required)  
					
									.form-group
										label(for="name") Second Email Address
										span.text-danger *
										input.form-control(type="text" placeholder="Enter 2nd Applicant's Email" v-model="secondApplicantEmail" required)  
								
									.form-group
										label(for="name") Second Phone Number
										span.text-danger *
										input.form-control(type="text" placeholder="Enter 1st Applicant's Phone No." v-model="secondApplicantPhone" required) 

									.form-group
										label(for="National") 2nd National ID/Passport copy:
										span.text-danger *
										.input-group.mb-3
											.custom-file
												input#national2id.custom-file-input(type='file' @change="validateFileInput($event)" multiple)
												label#national2lbl.custom-file-label(for='custominput') Choose file
										span(style="font-size:smaller; font-style:italic;padding-top:-100px")#national2
									
									.form-group
										label(for="Passport") 2nd Passport Size Photo
										span.text-danger *
										.input-group.mb-3
											.custom-file
												input#passport2id.custom-file-input(type='file' @change="validateFileInput($event)" multiple)
												label#passport2lbl.custom-file-label(for='custominput') Choose file
										span(style="font-size:smaller; font-style:italic;padding-top:-100px")#passport2


							v-tab(title='Complete')
								.mt-2.ml-2
									.form-group.form-check
										input.form-check-input(type='checkbox' required @change="toggleIndivSubmit")
										label.form-check-label(for='invalidCheck')
											span Agree to &nbsp;
												span 
													a(href="#" @click="show") Terms &#38; Conditions
									.d-flex.justify-content-end
										button.btn.btn-success.mt-3(id="submit" type="submit" :disabled="submitIndividual") Submit	
							


					//- group form     
					div(v-if="showGroupForm")
						d(v-if="!noOfSignatories")
							.form-group
								label(for="name") Group Name
								span.text-danger *
								input.form-control(type="text" placeholder="Enter your name" v-model="groupName" required)  
							.form-group
								label(for="Emal") Primary Email Address:
								span.text-danger *
								input.form-control(type="email" placeholder="example@domain.com" v-model="primaryEmail" required)
							.form-group
								label(for="Mobile/Tel. No:") Primary Phone Number:
								span.text-danger *
								input.form-control(type="text" placeholder="Enter your phone number" v-model="primaryPhone" required)
							
							.form-group.mb-2 Number of signatories
								span.text-danger *
							.form-check.form-check-inline
								input.form-check-input(type='radio' name='noOfSignatories' value="2" required @change="toggleGroupSignatories($event)")
								label.form-check-label(for='noOfSignatories')
									| 2
							.form-check.form-check-inline
								input.form-check-input(type='radio' name='noOfSignatories' value="3" required @change="toggleGroupSignatories($event)")
								label.form-check-label(for='noOfSignatories')
									| 3
						div(v-if="noOfSignatories == 2")
							vue-tabs
								v-tab(title='Signatory 1')
									.mt-2.ml-2
										.form-group
											label(for="name") 1st Signatory's Name
											span.text-danger *
											input.form-control(type="text" placeholder="1st Signatory's Name" v-model="firstSignatoryName" required)  

										.form-group
											label(for="title") Title
											span.text-danger *
											input.form-control(type="text" placeholder="1st Signatory's Title" v-model="firstSignatoryTitle" required)  
												
										.form-group
											label(for="email") 1st Email Address
											span.text-danger *
											input.form-control(type="email" placeholder="1st Signatory's Email Address" v-model="firstSignatoryEmail" required)  
									
										.form-group
											label(for="phonenumber") 1st Signatory's Phone Number
											span.text-danger *
											input.form-control(type="text" placeholder="1st Signatory's Phone Number." v-model="firstSignatoryPhone" required) 


										.form-group
											label(for="National") 1st Signatory National ID/Passport copy:
											span.text-danger *
											.input-group.mb-3
												.custom-file
													input#nationalid.custom-file-input(type='file' @change="validateFileInput($event)" multiple required)
													label#nationallbl.custom-file-label(for='custominput') Choose file
											span(style="font-size:smaller; font-style:italic;padding-top:-100px")#national 

										.form-group
											label(for="Passport") 1st Signatory Passport Size Photo
											span.text-danger *
											.input-group.mb-3
												.custom-file
													input#passportid.custom-file-input(type='file' @change="validateFileInput($event)" multiple required)
													label#passportlbl.custom-file-label(for='custominput') Choose file
											span(style="font-size:smaller; font-style:italic;padding-top:-100px")#passport 
								v-tab(title='Signatory 2')
									.mt-2.ml-2
										.form-group
											label(for="name") 2nd Signatory's Name
											span.text-danger *
											input.form-control(type="text" placeholder="2nd Signatory's Name" v-model="secondSignatoryName" required)  

										.form-group
											label(for="title") Title
											span.text-danger *
											input.form-control(type="text" placeholder="2nd Signatory's Title" v-model="secondSignatoryTitle" required)  
												
										.form-group
											label(for="email") 2nd Email Address
											span.text-danger *
											input.form-control(type="email" placeholder="2nd Signatory's Email Address" v-model="secondSignatoryEmail" required)  
									
										.form-group
											label(for="phonenumber") 2nd Signatory's Phone Number
											span.text-danger *
											input.form-control(type="text" placeholder="2nd Signatory's Phone Number." v-model="secondSignatoryPhone" required) 

										.form-group
											label(for="National") 2nd Signatory's National ID/Passport copy:
											span.text-danger *
											.input-group.mb-3
												.custom-file
													input#national2id.custom-file-input(type='file' @change="validateFileInput($event)" multiple)
													label#national2lbl.custom-file-label(for='custominput') Choose file
											span(style="font-size:smaller; font-style:italic;padding-top:-100px")#national2

										.form-group
											label(for="Passport") 2nd Signatory's Passport Size Photo
											span.text-danger *
											.input-group.mb-3
												.custom-file
													input#passport2id.custom-file-input(type='file' @change="validateFileInput($event)" multiple)
													label#passport2lbl.custom-file-label(for='custominput') Choose file
											span(style="font-size:smaller; font-style:italic;padding-top:-100px")#passport2
								v-tab(title='Complete')
									.mt-2.ml-2
										.form-group.form-check
											input.form-check-input(type='checkbox' required @change="toggleIndivSubmit")
											label.form-check-label(for='invalidCheck')
												span Agree to &nbsp;
													span 
														a(href="#" @click="show") Terms &#38; Conditions
										.d-flex.justify-content-end
											button.btn.btn-success.mt-3(id="submit" type="submit" :disabled="submitIndividual") Submit	
											
						div(v-if="noOfSignatories == 3")
							vue-tabs
								v-tab(title='Signatory 1')
									.mt-2.ml-2
										.form-group
											label(for="name") 1st Signatory's Name
											span.text-danger *
											input.form-control(type="text" placeholder="1st Signatory's Name" v-model="firstSignatoryName" required)  

										.form-group
											label(for="title") Title
											span.text-danger *
											input.form-control(type="text" placeholder="1st Signatory's Title" v-model="firstSignatoryTitle" required)  
												
										.form-group
											label(for="email") 1st Email Address
											span.text-danger *
											input.form-control(type="email" placeholder="1st Signatory's Email Address" v-model="firstSignatoryEmail" required)  
									
										.form-group
											label(for="phonenumber") 1st Signatory's Phone Number
											span.text-danger *
											input.form-control(type="text" placeholder="1st Signatory's Phone Number." v-model="firstSignatoryPhone" required) 


										.form-group
											label(for="National") 1st Signatory National ID/Passport copy:
											span.text-danger *
											.input-group.mb-3
												.custom-file
													input#nationalid.custom-file-input(type='file' @change="validateFileInput($event)" multiple required)
													label#nationallbl.custom-file-label(for='custominput') Choose file
											span(style="font-size:smaller; font-style:italic;padding-top:-100px")#national 

										.form-group
											label(for="Passport") 1st Signatory Passport Size Photo
											span.text-danger *
											.input-group.mb-3
												.custom-file
													input#passportid.custom-file-input(type='file' @change="validateFileInput($event)" multiple required)
													label#passportlbl.custom-file-label(for='custominput') Choose file
											span(style="font-size:smaller; font-style:italic;padding-top:-100px")#passport 
								v-tab(title='Signatory 2')
									.mt-2.ml-2
										.form-group
											label(for="name") 2nd Signatory's Name
											span.text-danger *
											input.form-control(type="text" placeholder="2nd Signatory's Name" v-model="secondSignatoryName" required)  

										.form-group
											label(for="title") Title
											span.text-danger *
											input.form-control(type="text" placeholder="2nd Signatory's Title" v-model="secondSignatoryTitle" required)  
												
										.form-group
											label(for="email") 2nd Email Address
											span.text-danger *
											input.form-control(type="email" placeholder="2nd Signatory's Email Address" v-model="secondSignatoryEmail" required)  
									
										.form-group
											label(for="phonenumber") 2nd Signatory's Phone Number
											span.text-danger *
											input.form-control(type="text" placeholder="2nd Signatory's Phone Number." v-model="secondSignatoryPhone" required) 

										.form-group
											label(for="National") 2nd Signatory's National ID/Passport copy:
											span.text-danger *
											.input-group.mb-3
												.custom-file
													input#national2id.custom-file-input(type='file' @change="validateFileInput($event)" multiple)
													label#national2lbl.custom-file-label(for='custominput') Choose file
											span(style="font-size:smaller; font-style:italic;padding-top:-100px")#national2

										.form-group
											label(for="Passport") 2nd Signatory's Passport Size Photo
											span.text-danger *
											.input-group.mb-3
												.custom-file
													input#passport2id.custom-file-input(type='file' @change="validateFileInput($event)" multiple)
													label#passport2lbl.custom-file-label(for='custominput') Choose file
											span(style="font-size:smaller; font-style:italic;padding-top:-100px")#passport2
								v-tab(title='Signatory 3')
									.mt-2.ml-2
										.form-group
											label(for="name") 3rd Signatory's Name
											span.text-danger *
											input.form-control(type="text" placeholder="3rd Signatory's Name" v-model="thirdSignatoryName" required)  

										.form-group
											label(for="title") Title
											span.text-danger *
											input.form-control(type="text" placeholder="3rd Signatory's Title" v-model="thirdSignatoryTitle" required)  
												
										.form-group
											label(for="email") 3rd Email Address
											span.text-danger *
											input.form-control(type="email" placeholder="3rd Signatory's Email Address" v-model="thirdSignatoryEmail" required)  
									
										.form-group
											label(for="phonenumber") 3rd Signatory's Phone Number
											span.text-danger *
											input.form-control(type="text" placeholder="3rd Signatory's Phone Number." v-model="thirdSignatoryPhone" required) 

										.form-group
											label(for="National") 3rd Signatory's National ID/Passport copy:
											span.text-danger *
											.input-group.mb-3
												.custom-file
													input#national2id.custom-file-input(type='file' @change="validateFileInput($event)" multiple)
													label#national2lbl.custom-file-label(for='custominput') Choose file
											span(style="font-size:smaller; font-style:italic;padding-top:-100px")#national2

										.form-group
											label(for="Passport") 3rd Signatory's Passport Size Photo
											span.text-danger *
											.input-group.mb-3
												.custom-file
													input#passport2id.custom-file-input(type='file' @change="validateFileInput($event)" multiple)
													label#passport2lbl.custom-file-label(for='custominput') Choose file
											span(style="font-size:smaller; font-style:italic;padding-top:-100px")#passport2

								v-tab(title='Complete')
									.mt-2.ml-2
										.form-group.form-check
											input.form-check-input(type='checkbox' required @change="toggleIndivSubmit")
											label.form-check-label(for='invalidCheck')
												span Agree to &nbsp;
													span 
														a(href="#" @click="show") Terms &#38; Conditions
										.d-flex.justify-content-end
											button.btn.btn-success.mt-3(id="submit" type="submit" :disabled="submitIndividual") Submit


		
					//- show Modal
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
import {VueTabs, VTab} from 'vue-nav-tabs'
import 'vue-nav-tabs/themes/vue-tabs.css'

export default {
		name:'Join',
		data : () => ({
			accountTypes:'',
			fundTypes:'',
			profile:'',
			detailFunds:'',
			showUTFund:false,
			showPEFund:false,
			showProfile:false,
			showAccountType:true,
			showDetailedFunds:false,
			showIndividualForm:false,
			showJointForm:false,
			showGroupForm:false,
			submitIndividual:true,
			showModal:false,
			noOfSignatories:0,
			// collect data(common)
			passportPhoto:[],
			nationalId:[],
			// individual
			name:'',
			idno:'',
			telno:'',
			email:'',
			krapin:'',

			//joint
			signatoriesBoth:false,
			firstApplicantName:'',
			firstApplicantEmail:'',
			firstApplicantPhone:'',
			secondApplicantName:'',
			secondApplicantEmail:'',
			secondApplicantPhone:'',

			//group
			groupName:'',
			primaryEmail:'',
			primaryPhone:'',
			firstSignatoryName:'',
			firstSignatoryTitle:'',
			firstSignatoryEmail:'',
			firstSignatoryPhone:'',

			secondSignatoryName:'',
			secondSignatoryTitle:'',
			secondSignatoryEmail:'',
			secondSignatoryPhone:'',

			thirdSignatoryName:'',
			thirdSignatoryTitle:'',
			thirdSignatoryEmail:'',
			thirdSignatoryPhone:'',




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

			validateFileInput(evt){
					let type = 'jpg';
					let files = evt.target.files;
					let fileNames = [];
					let errors = [];
					let inputId = evt.target.attributes.id.value

					Object.keys(files).forEach(key => {
					
							fileNames.push(files[key].name)

							if(files[key].size > 2097152){
									errors.push(files[key].name + ' exceeds allowable file size of 2MB')
							}
							if((files[key].name.split('.')[1].toLowerCase() != type.toLowerCase()) && (files[key].name.split('.')[1].toLowerCase() != 'jpeg')){
									errors.push(files[key].name + ` only ${type} files allowed`)
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
					if(input.includes('national')){
						this.nationalId.push({label,value:reader.result.split(',')[1]})	
					}else if(input.includes('passport')){
						this.passportPhoto.push({label, value:reader.result.split(',')[1]})
					
					}
				}
				reader.readAsDataURL(file)

			},
			toggleProfile(evt){
				this.setProfile(evt.target.value)

				if(this.showProfile){
					this.showProfile = false
				}
				if(this.accountTypes == 'UT'){
					this.showUTFund =  true

				}

			},
			setProfile(val){
				this.profile = val
			},
			toggleAccountTypes(){
				if(this.showAccountType){
					this.showAccountType = false
				}
				if(this.accountTypes != 'PE'){
					this.showProfile = true
				}
				if(this.accountTypes == 'PE'){
					this.setProfile('individual')
					this.showPEFund =  true
				}
			},
			toggleFund(){
				if(this.showPEFund){
					this.showPEFund = false
				}
				if(this.showUTFund){
					this.showUTFund = false
				}
				if(this.fundTypes == 'MM'){
					this.showDetailedFunds = true
				}
				if(this.fundTypes == 'BF'){
					this.showRealForm()
				}
				if(this.fundTypes == 'ZPP'){
					this.showRealForm()

				}
				if(this.fundTypes == 'ZGPP'){
					this.showRealForm()
				}
			},
			showRealForm(evt=false){
				if(evt)
					this.detailFunds = evt.target.value
				if(this.fundTypes == 'MM'){
					this.showDetailedFunds = false
				}
				if(this.profile == 'joint'){
					this.showJointForm = true
				}else if(this.profile == 'individual'){
					this.showIndividualForm =  true
				}else if(this.profile == 'group'){
					this.showGroupForm = true
				}
			},
			toggleIndivSubmit(){
				this.submitIndividual = !this.submitIndividual	
			},
			togglePEFund(evt){
				this.fundTypes = evt.target.value
				this.toggleFund()
			},
			toggleGroupSignatories(evt){
				this.noOfSignatories = evt.target.value 
			},
			registerAcc(){
				if(this.profile == 'individual'){
					if(this.accountTypes == 'PE')
						this.registerPEIndividual()
					else if(this.accountTypes == 'UT')
						this.registerUTIndividual()
				}
				if(this.profile == 'joint'){
					this.registerJoint()
				}
				if(this.profile == 'group'){
					this.registerGroup()
				}
			},
			registerPEIndividual(){
				const data = {
					name:this.name,
					idno:this.idno,
					telno:this.telno,
					email:this.email,
					krapin:this.krapin,
					passportPhoto:this.passportPhoto,
					nationalId:this.nationalId
				}
				
				console.log(data)
			},
			registerUTIndividual(){
				const data = {
					name:this.name,
					idno:this.idno,
					telno:this.telno,
					email:this.email,
					accTypes:this.fundTypes,
					profile:this.profile,
					detailFunds:this.detailFunds,
					passportPhoto:this.passportPhoto,
					nationalId:this.nationalId,
					basicFund:this.accountTypes,

				}
				this.$store.dispatch('createAccount', data)
				.then(res => {
					console.log(res)
				})
				.catch(err => {
					console.log(err)
				})				
			},

			registerJoint(){
				const data = {
					firstApplicantName:this.firstApplicantName,
					firstApplicantPhone:this.firstApplicantPhone,
					firstApplicantEmail:this.firstApplicantEmail,
					secondApplicantName:this.secondApplicantName,
					secondApplicantPhone:this.secondApplicantPhone,
					secondApplicantEmail:this.secondApplicantEmail,
					accTypes:this.fundTypes,
					profile:this.profile,
					detailFunds:this.detailFunds,
					passportPhoto:this.passportPhoto,
					nationalId:this.nationalId,
					basicFund:this.accountTypes,
				}
				this.$store.dispatch('createAccount', data)
				.then(res => {
					console.log(res)
				})
				.catch(err => {
					console.log(err)
				})	
			},
			registerGroup(){

			},

		}
 }
</script>

<style scoped>
.customModal{
	max-height:100%;
	overflow-y: scroll;
}
</style>