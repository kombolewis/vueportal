<template lang="pug">
	.container
		.row.mb-2.mt-4
			.col-md-6
				| Fund Transfer
		hr
		br 
		.row.mt-1
			.offset-md-2.col-md-6
				form(action="#" @submit.prevent="registerAcc")
					.form-group
						h5 
					div
						.form-group
							span.pr-2 Select Fund Transfer Form:
							.form-check.form-check-inline
								input.form-check-input(type='radio' name='funds' value='unitTrust' v-model="fundTypes"  )
								label.form-check-label(for='UT')
									| Unit Trust
							.form-check.form-check-inline
								input.form-check-input(type='radio' name='funds' value='pension'  v-model="fundTypes"  )
								label.form-check-label(for='PE')
									| Pension

					
					//- individual form
					div(v-if="fundTypes")
						div(v-if="fundTypes == 'unitTrust'")
							.form-group
								label(for="name") Name:
								input.form-control(type="text" placeholder="Enter your Name " v-model="fullname" required)
							.form-group
								label(for="email") Email Address
								input.form-control(type="email" placeholder="example@domain.com" v-model="email" )
							.form-group.pr-4 Transfer from
								span.text-danger *
								.form-check.form-check-inline.pl-3
									input.form-check-input(type='radio' name='accsFrom' value='mm' v-model="transferFromAccs"  required checked)
									label.form-check-label(for='UT')
										| Money Market Fund
								.form-check.form-check-inline
									input.form-check-input(type='radio' name='accsFrom' value='pe'  v-model="transferFromAccs"  required)
									label.form-check-label(for='PE')
										| Balanced Fund

							.form-group
								label(for="name") Account Number:
								span.text-danger *
								input.form-control(type="text" placeholder="Enter Account Number " v-model="accountNumber" required)
							.form-group.pr-2 Transfer To
								span.text-danger *
								.form-check.form-check-inline.pl-3
									input.form-check-input(type='radio' name='accsTo' value='mm' v-model="transferToAccs"  required  checked)
									label.form-check-label(for='UT')
										| Money Market Fund
								.form-check.form-check-inline
									input.form-check-input(type='radio' name='accsTo' value='pe'  v-model="transferToAccs"  required)
									label.form-check-label(for="PE")
										| Balanced Fund

							.form-group
								label(for="name") Recipient Account Number:
								span.text-danger *
								input.form-control(type="text" placeholder="Enter Account Number " v-model="recipientAccountNumber" required)
							.form-group
								label(for="amt") Amount to Transfer:
								input.form-control(type="text" placeholder="Enter Amount" v-model="amount" )

							.d-flex.justify-content-end
								button.btn.btn-success.mt-3(id="submit" type="submit" ) Submit	

						div(v-if="fundTypes == 'pension'")
							.form-group
								label(for="name") Name:
								input.form-control(type="text" placeholder="Enter your Name " v-model="fullname" required)
							.form-group
								label(for="email") Email Address
								input.form-control(type="email" placeholder="example@domain.com" v-model="email" )
							.form-group.pr-4 Transfer from
								span.text-danger *
								div
									.form-check.form-check-inline.pl-3
										input.form-check-input(type='radio' name='accsFrom' value='ZGPP' v-model="transferFromAccs"  required checked)
										label.form-check-label(for='UT')
											| Guaranteed Personal Pension Plan
									.form-check.form-check-inline
										input.form-check-input(type='radio' name='accsFrom' value='ZPP'  v-model="transferFromAccs"  required)
										label.form-check-label(for='PE')
											| Personal Pension Plan

							.form-group
								label(for="name") Account Number:
								span.text-danger *
								input.form-control(type="text" placeholder="Enter Account Number " v-model="accountNumber" required)
							.form-group.pr-2 Transfer To
								span.text-danger *
								div
									.form-check.form-check-inline.pl-3
										input.form-check-input(type='radio' name='accsTo' value='ZGPP' v-model="transferToAccs"  required  checked)
										label.form-check-label(for='UT')
											| Guaranteed Personal Pension Plan
									.form-check.form-check-inline
										input.form-check-input(type='radio' name='accsTo' value='ZPP'  v-model="transferToAccs"  required)
										label.form-check-label(for="PE")
											| Personal Pension Plan


							.form-group
								label(for="name") Recipient Account Number:
								span.text-danger *
								input.form-control(type="text" placeholder="Enter Account Number " v-model="recipientAccountNumber" required)
							.form-group
								label(for="amt") Amount to Transfer:
								input.form-control(type="text" placeholder="Enter Amount" v-model="amount" )

							.d-flex.justify-content-end
								button.btn.btn-success.mt-3(id="submit" type="submit" ) Submit			
		
</template>

<script>


export default {
		name:'Join',
		data : () => ({
			fundTypes:'',
			fullname:'',
			transferFromAccs:'',
			accountNumber:'',
			transferToAccs:'',
			recipientAccountNumber:'',
			amount:'',
			email:'',

		}),


 }
</script>

<style scoped>

</style>