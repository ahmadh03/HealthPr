var myApp = new Framework7({
	modalTitle: 'Framework7',
	animateNavBackIcon: true,
});
var $$ = Dom7;
var mainView = myApp.addView('.view-main', {
	dynamicNavbar: true,
});
var rightView = myApp.addView('.view-right', {
	dynamicNavbar: true
});
$(document).on('ajaxStart', function (e) {
	myApp.showIndicator();
});
$(document).on('ajaxComplete', function () {
	myApp.hideIndicator();
});
$(document).on('pageInit', function (e) {
var page = e.detail.page;
	if (page.name === 'user_profile') {
	}
});

//user login script
jQuery.ajaxSetup({async:false});
function loginsubmit() {
	var userName = $('#user_email').val();
	var password = $('#user_password').val();
	var errorCount = 0;
	$('#email_error').html('');

	if( userName.trim() == '' ){
		$('#email_error').html('Enter Username');
		errorCount++;
	}else{
		$('#email_error').html('');
	}
	if( password.trim() == '' ){
		$('#password_error').html('Enter Password');
		errorCount++;
	}else{
		$('#password_error').html('');
	}
	if( errorCount > 0 ){
		return false;
	}
	myApp.showPreloader();

	var url = "http://www.healthrecordspro.com/ws.php?type=login&format=json&email="+userName+"&password="+password+"&active=1";

	$.getJSON (url, function (json) {
		myApp.hidePreloader();

		if( json['posts']['0']['user_id'] ){
			var storedData = myApp.formStoreData('logged_userId', {
								'userId': json['posts']['0']['user_id'] 
						});
			var storedData1 = myApp.formGetData('logged_userId');
			storedData1['userId']

			var storedMData = myApp.formStoreData('logged_metricsId', {
								'metricsId': json['posts']['0']['metrics'] 
								});
			var storedMData = myApp.formGetData('logged_metricsId');
			storedMData['metricsId']

			myApp.alert("Login Sucessfully",'Success');
			// mainView.router.loadPage('loginnormal.html?id=124');
			setTimeout(function(){
				selectHomepageDisplay();
			},500);

		}else{
			$('#email_error').html('Enter Valid Details');
			return false;
		}

	});
}

//Register form submit
function registerformSubmit()
{
	var firstName = $('#first_name').val();
	var last_name = $('#last_name').val();
	var email = $('#e_mail').val();
	var full_date = $('#picker-date').val();
	var user_country = $('#countryform').val();
	var u_password = $('#u_password').val();
	var gender = $("input:radio[name=gender]:checked").val();

	if( firstName.trim() == '' ){
		$('#first_name').css('color','red');
	}else{
		$('#first_name').css('color','');
	}

	var url="http://www.healthrecordspro.com/ws.php?type=insert&format=json&table=user_profile&columns=first_name,last_name,email,gender,date_of_birth,country,password&values='"+firstName+"','"+last_name+"','"+email+"','"+gender+"','"+full_date+"','"+user_country+"','"+u_password+"'&active=1 ";

		$.getJSON (url, function (json) {

		if( json['posts'][0] ){
			myApp.alert("Your profile has been Created",'Success');
			mainView.router.loadPage('index.html');
		}else{
			myApp.alert("Your profile Not Created",'Failure');
		}

	});
}

function healthformSubmit()
{

	var storedData1 = myApp.formGetData('logged_userId');
	var cp_first_name = $('#hi_first_name').val();
	var cp_last_name = $('#hi_last_name').val();
	var cp_groupnumber = $('#hi_group_no').val();
	var cp_member_id = $('#hi_member_id').val();
	var cp_primary_insured_person = $('#hi_primary_ins_per').val();
	var cp_social_security_number = $('#hi_social_secno').val();
	var policy = $('#hi_policy_no').val();
	var coverage = $('#hi_coverage').val();
	var company_name = $('#hi_company_name').val();
	var phone1 = $('#hi_phone1').val();
	var phone2 = $('#hi_phone2').val();
	var copays = $('#hi_copays').val();
	var city = $('#hi_city').val();
	var state = $('#hi_state').val();
	var country = $('#insu_country').val();
	var zip_code = $('#hi_zip').val();
	var cp_employer_name = $('#hi_emp_name').val();
	var cp_phone = $('#hi_phone').val();
	var cp_email = $('#hi_email').val();
	var cp_city = $('#hi_city1').val();
	var cp_state = $('#hi_state1').val();
	var cp_zip_code = $('#hi_zip1').val();
	var update_health_insu = $('#update_health_insu').val();

	if(update_health_insu==''){

	var columnNames = "cp_first_name,cp_last_name,cp_groupnumber,cp_member_id,cp_primary_insured_person,cp_social_security_number,policy,coverage,company_name,phone1,phone2,copays,city,state,zip_code,country,cp_employer_name,cp_phone,cp_email,cp_city,cp_state,cp_zip_code,user_id";

	var columnValues ="'"+cp_first_name+"','"+cp_last_name+"','"+cp_groupnumber+"','"+cp_member_id+"','"+cp_primary_insured_person+"','"+cp_social_security_number+"','"+policy+"','"+coverage+"','"+company_name+"','"+phone1+"','"+phone2+"','"+copays+"','"+city+"','"+state+"','"+zip_code+"','"+country+"','"+cp_employer_name+"','"+cp_phone+"','"+cp_email+"','"+cp_city+"','"+cp_state+"','"+cp_zip_code+"','"+storedData1['userId']+"'";

	myApp.showPreloader();

	var url="http://www.healthrecordspro.com/ws.php?type=insert&format=json&table=health_insurance&columns="+columnNames+"&values="+columnValues+"";

		$.getJSON (url, function (json) {
			myApp.hidePreloader();

			if( json['posts'][0] ){
				uploadInsuranceCardsPic(json['posts'][0]);
				// getInsuranceData();
				myApp.alert("Your Details has been Created",'Success');
				mainView.router.loadPage('insurance.html');
			}
			else
			{
				myApp.alert("Your Details Not Created",'Failure');
			}

		});

	}
	else
	{
		var val = "cp_first_name = '"+$('#hi_first_name').val()+"',cp_last_name = '"+$('#hi_last_name').val()+"',cp_groupnumber = '"+$('#hi_group_no').val()+"',cp_member_id = '"+$('#hi_member_id').val()+"',cp_primary_insured_person = '"+$('#hi_primary_ins_per').val()+"',cp_social_security_number = '"+$('#hi_social_secno').val()+"',policy = '"+$('#hi_policy_no').val()+"',coverage = '"+$('#hi_coverage').val()+"',company_name = '"+$('#hi_company_name').val()+"',phone1 = '"+$('#hi_phone1').val()+"',phone2 = '"+$('#hi_phone2').val()+"',copays = '"+$('#hi_copays').val()+"',city = '"+$('#hi_city').val()+"',state = '"+$('#hi_state').val()+"',zip_code = '"+$('#hi_zip').val()+"',country = '"+$('#insu_country').val()+"',cp_employer_name = '"+$('#hi_emp_name').val()+"',cp_phone = '"+$('#hi_phone').val()+"',cp_email = '"+$('#hi_email').val()+"',cp_city = '"+$('#hi_city1').val()+"',cp_state = '"+$('#hi_state1').val()+"',cp_zip_code = '"+$('#hi_zip1').val()+"'";

		myApp.showPreloader();

		var url="http://www.healthrecordspro.com/ws.php?type=update&format=json&table=health_insurance&columns="+val+"&condition=insurance_id="+update_health_insu;
			uploadInsuranceCardsPic(update_health_insu);
				$.getJSON (url, function (json) {
					myApp.hidePreloader();

					if( json['posts'][0] ){
						// getInsuranceData();
						myApp.alert("Your Details has been updated",'Success');
						mainView.router.loadPage('insurance.html');

					}
					else
					{
						// getInsuranceData();
						myApp.alert("Your Details has been updated",'Success');
						mainView.router.loadPage('insurance.html');
					}

				});
	}

}

function healthproviderformSubmit()
{
	var storedData1 = myApp.formGetData('logged_userId');
	var first_name = $('#hp_firstName').val();
	var last_name = $('#hp_lastName').val();
	var specialty = $('#hp_speciality').val();
	var email = $('#hp_email').val();
	var street = $('#hp_street').val();
	var city = $('#hp_city').val();
	var state = $('#hp_state').val();
	var zip_code = $('#hp_zipcode').val();
	var country = $('#hp_country').val();
	var home_phone_number = $('#hp_home_phone').val();
	var work_phone_number = $('#hp_work_phone').val();
	var mobile_phone = $('#hp_mob_phone').val();
	var hospital_affiliation = $('#hp_hospital_affili').val();
	var update_healthpro_id = $('#update_healthpro_id').val();

	if(update_healthpro_id==''){

	var columnName = "first_name,last_name,specialty,email,street,city,state,zip_code,country,home_phone_number,work_phone_number,mobile_phone,hospital_affiliation,user_id,active";

	var coloumnValue = "'"+first_name+"','"+last_name+"','"+specialty+"','"+email+"','"+street+"','"+city+"','"+state+"','"+zip_code+"','"+country+"','"+home_phone_number+"','"+work_phone_number+"','"+mobile_phone+"','"+hospital_affiliation+"','"+storedData1['userId']+"','1'";

	myApp.showPreloader();

	var url="http://www.healthrecordspro.com/ws.php?type=insert&format=json&table=healthcare_providers&columns="+columnName+"&values="+coloumnValue+"";

		$.getJSON (url, function (json) {
			myApp.hidePreloader();

		if( json['posts'][0] ){
			// gethealthProviderData();
			myApp.alert("Your Details has been Created",'Success');
			mainView.router.loadPage('health_provider_listing.html');
		}
		else
		{
			myApp.alert("Your Details Not Created",'Failure');
		}

	});

	}
	else
	{
		if(isNaN($('#hp_speciality').val())){
			var speid = $('#hp_speciality_id').val();
		}
		else
		{
			var speid = $('#hp_speciality').val();
		}

		var val = "first_name = '"+$('#hp_firstName').val()+"',last_name = '"+$('#hp_lastName').val()+"',specialty = '"+speid+"',email = '"+$('#hp_email').val()+"',street = '"+$('#hp_street').val()+"',city = '"+$('#hp_city').val()+"',state = '"+$('#hp_state').val()+"',zip_code = '"+$('#hp_zipcode').val()+"',country = '"+$('#hp_country').val()+"',home_phone_number = '"+$('#hp_home_phone').val()+"',work_phone_number = '"+$('#hp_work_phone').val()+"',mobile_phone = '"+$('#hp_mob_phone').val()+"',hospital_affiliation = '"+$('#hp_hospital_affili').val()+"'";

			myApp.showPreloader();

		var url="http://www.healthrecordspro.com/ws.php?type=update&format=json&table=healthcare_providers&columns="+val+"&condition=hcp_id="+update_healthpro_id;

			$.getJSON (url, function (json) {
					myApp.hidePreloader();

				if( json['posts'][0] ){
					// gethealthProviderData();
					myApp.alert("Your Details has been updated",'Success');
					mainView.router.loadPage('health_provider_listing.html');
				}
				else
				{
					myApp.alert("Your Details Not Created",'Failure');
				}

		});

	}
}

function birthformSubmit()
{
		var storedData1 = myApp.formGetData('logged_userId');
		var childid = $('#birth_his_cname').val();
		var placeofbirth = $('#birth_his_pb').val();
	if (document.getElementById('birth_his_ail').checked) {
		var induceddlabor = document.getElementById('birth_his_ail').value;
	}
	if (document.getElementById('birth_his_ail1').checked) {
		var induceddlabor = document.getElementById('birth_his_ail1').value;
	}
		var duration = $('#birth_his_dol').val();
		var gestationperiod = $('#birth_his_pop').val();
	if (document.getElementById('birth_his_mod').checked) {
		var methodOfDelivery = document.getElementById('birth_his_mod').value;
	}
	if (document.getElementById('birth_his_mod1').checked) {
		var methodOfDelivery = document.getElementById('birth_his_mod1').value;
	}
	if (document.getElementById('birth_his_mod2').checked) {
		var methodOfDelivery = document.getElementById('birth_his_mod2').value;
	}
	if (document.getElementById('birth_his_mod3').checked) {
		var methodOfDelivery = document.getElementById('birth_his_mod3').value;
	}
		var birthweight = $('#birth_his_bw').val();
		var apgarscore = $('#birth_his_aps').val();
	if (document.getElementById('birth_his_abiot').checked) {
		var Antibiotic = document.getElementById('birth_his_abiot').value;
	}
	if (document.getElementById('birth_his_abiot1').checked) {
		var Antibiotic = document.getElementById('birth_his_abiot1').value;
	}
	if (document.getElementById('birth_his_blsp').checked) {
		var bluespells = document.getElementById('birth_his_blsp').value;
	}
	if (document.getElementById('birth_his_blsp1').checked) {
		var bluespells = document.getElementById('birth_his_blsp1').value;
	}
	if (document.getElementById('birth_his_co').checked) {
		var convulsions = document.getElementById('birth_his_co').value;
	}
	if (document.getElementById('birth_his_co1').checked) {
		var convulsions = document.getElementById('birth_his_co1').value;
	}
	if (document.getElementById('birth_his_jaun').checked) {
		var jaundice = document.getElementById('birth_his_jaun').value;
	}
	if (document.getElementById('birth_his_jaun1').checked) {
		var jaundice = document.getElementById('birth_his_jaun1').value;
	}
	if (document.getElementById('birth_his_skinr').checked) {
		var skinrash = document.getElementById('birth_his_skinr').value;
	}
	if (document.getElementById('birth_his_skinr1').checked) {
		var skinrash = document.getElementById('birth_his_skinr1').value;
	}
	if (document.getElementById('birth_his_dcrihltm').checked) {
		var hospitallonger = document.getElementById('birth_his_dcrihltm').value;
	}
	if (document.getElementById('birth_his_dcrihltm1').checked) {
		var hospitallonger = document.getElementById('birth_his_dcrihltm1').value;
	}
	if (document.getElementById('birth_his_hwbf').checked) {
		var babyfed = document.getElementById('birth_his_hwbf').value;
	}
	if (document.getElementById('birth_his_hwbf1').checked) {
		var babyfed = document.getElementById('birth_his_hwbf1').value;
	}
		var birth_his_update = $('#birth_his_update').val();

		if(birth_his_update==''){

		var url="http://www.healthrecordspro.com/ws.php?type=insert&format=json&table=birthhistory&columns=childid,placeofbirth,induceddlabor,duration,gestationperiod,methodOfDelivery,birthweight,apgarscore,Antibiotic,bluespells,convulsions,jaundice,skinrash,hospitallonger,babyfed,customerId&values='"+childid+"','"+placeofbirth+"','"+induceddlabor+"','"+duration+"','"+gestationperiod+"','"+methodOfDelivery+"','"+birthweight+"','"+apgarscore+"','"+Antibiotic+"','"+bluespells+"','"+convulsions+"','"+jaundice+"','"+skinrash+"','"+hospitallonger+"','"+babyfed+"','"+storedData1['userId']+"'";

			$.getJSON (url, function (json) {
				myApp.hidePreloader();

			if( json['posts'][0] ){
				// getBirthData();
				myApp.alert("Your Details has been Created",'Success');
				mainView.router.loadPage('pediatric_section_main.html');
			}else{
				myApp.alert("Your Details Not Created",'Failure');
			}

		});

		}else{

			if(isNaN($('#birth_his_cname').val())){
				var birthid = $('#birth_his_cname_id').val();
			}else{
				var birthid = $('#birth_his_cname').val();
			}

			var val = "childid = '"+birthid+"',placeofbirth = '"+placeofbirth+"',induceddlabor = '"+induceddlabor+"',duration = '"+duration+"',gestationperiod = '"+gestationperiod+"',methodOfDelivery = '"+methodOfDelivery+"',birthweight = '"+birthweight+"',apgarscore = '"+apgarscore+"',Antibiotic = '"+Antibiotic+"',bluespells = '"+bluespells+"',convulsions = '"+convulsions+"',jaundice = '"+jaundice+"',skinrash = '"+skinrash+"',hospitallonger = '"+hospitallonger+"',babyfed = '"+babyfed+"'";
				myApp.showPreloader();

			var url="http://www.healthrecordspro.com/ws.php?type=update&format=json&table=birthhistory&columns="+val+"&condition=id="+birth_his_update;

				$.getJSON (url, function (json) {
					myApp.hidePreloader();

					if( json['posts'][0] ){
						// getBirthData();
						myApp.alert("Your Details has been updated",'Success');
						mainView.router.loadPage('birth_ped_his_listing.html');
					}else{
						myApp.alert("Your Details Not Created",'Failure');
					}

				});

		}

}

function medicationformSubmit()
{
	var storedData1 = myApp.formGetData('logged_userId');
	var name = $('#medi_medicine_name').val();
	var dosage = $('#medi_dosage').val();
	var reference = $('#medi_medi_reference').val();
	var treatmentof = $('#medi_used_treatment').val();
	var medicationsform_id = $('#medicationsform_id').val();
	if (document.getElementById('medi_tab').checked) {
		var tomd = document.getElementById('medi_tab').value;
	}
	if (document.getElementById('medi_cap').checked) {
		var tomd = document.getElementById('medi_cap').value;
	}
	if (document.getElementById('medi_syrup').checked) {
		var tomd = document.getElementById('medi_syrup').value;
	}
	if (document.getElementById('medi_suppos').checked) {
		var tomd = document.getElementById('medi_suppos').value;
	}
	if (document.getElementById('medi_inj').checked) {
		var tomd = document.getElementById('medi_inj').value;
	}
		var dateStarted = $('#medi_datestarted').val();
		var enddate = $('#medi_enddate').val();
		var enddate1 = $('#medi_end_remind').val();
		// var type = $('#medi_still_using').val();
		if (document.getElementById('medi_still_using').checked) {
			var type = document.getElementById('medi_still_using').value;
		}
		var otherProvider = $('#medi_precribed_others').val();

	if(medicationsform_id=='')
	{
		var prescribedbydr = $('#medi_precribed').val();

		var columnName ="name,dosage,reference,treatmentof,prescribedbydr,otherProvider,tomd,dateStarted,enddate,enddate1,type,customerId";

		var coloumnValue = "'"+name+"','"+dosage+"','"+reference+"','"+treatmentof+"','"+prescribedbydr+"','"+otherProvider+"','"+tomd+"','"+dateStarted+"','"+enddate+"','"+enddate1+"','"+type+"','"+storedData1['userId']+"'";
		if (dateStarted == ''||name == '') {
			if(name == ''){
				myApp.alert('Please Enter Physician Name','Medication');
			}else{
					myApp.alert('Please Enter Date','Medication');
				}
		}else{
	

		var url="http://www.healthrecordspro.com/ws.php?type=insert&format=json&table=medications&columns="+columnName+"&values="+coloumnValue+"";

		$.getJSON (url, function (json) {
		
		uploadMedicationPic(json['posts'][0]);
		//createCalendarEventWithOptions(json['posts'][0]);
		//myApp.alert(json['posts'][0]);
		if (document.getElementById('medi_all_days').checked) 
		{
			var monday = document.getElementById('medi_all_days').value;
			var tuesday = document.getElementById('medi_all_days').value;
			var wednesday = document.getElementById('medi_all_days').value;
			var thursday = document.getElementById('medi_all_days').value;
			var friday = document.getElementById('medi_all_days').value;
			var saturday = document.getElementById('medi_all_days').value;
			var sunday = document.getElementById('medi_all_days').value;
		}else{

			var monday = 0;var tuesday = 0;var wednesday = 0;var thursday = 0;var friday = 0;var saturday = 0;var sunday = 0;
		}
		if (document.getElementById('medi_monday').checked) {
			var monday = document.getElementById('medi_monday').value;
		}
		if (document.getElementById('medi_tuesday').checked) {
			var tuesday = document.getElementById('medi_tuesday').value;
		}
		if (document.getElementById('medi_wednesday').checked) {
			var wednesday = document.getElementById('medi_wednesday').value;
		}
		if (document.getElementById('medi_thursday').checked) {
			var thursday = document.getElementById('medi_thursday').value;
		}
		if (document.getElementById('medi_friday').checked) {
			var friday = document.getElementById('medi_friday').value;
		}
		if (document.getElementById('medi_saturday').checked) {
			var saturday = document.getElementById('medi_saturday').value;
		}
		if (document.getElementById('medi_sunday').checked) {
			var sunday = document.getElementById('medi_sunday').value;
		}
			var reminderDate = $('#medi_start_remind').val();
			var reminderTime = $('#medi_remind_time').val();
		if (document.getElementById('medi_sunday').checked) {
			var email = document.getElementById('medi_receive_email').value;
		}
			var columnNa = "monday,tuesday,wednesday,thursday,friday,saturday,sunday,reminderDate,reminderTime,email,customerId,itemId,table_name,sectionId";

			var columnVa = "'"+monday+"','"+tuesday+"','"+wednesday+"','"+thursday+"','"+friday+"','"+saturday+"','"+sunday+"','"+reminderDate+"','"+reminderTime+"','"+email+"','"+storedData1['userId']+"','"+json['posts']+"','medication','8'";


			var url1 = "http://www.healthrecordspro.com/ws.php?type=insert&format=json&table=calendar&columns="+columnNa+"&values="+columnVa+"";

		$.getJSON (url1, function (json) {

		if( json['posts'][0] ){
			createCalendarEventWithOptions();
			// getMedicationsData();
			
			myApp.alert("Your Details has been Created",'Success');
		
			mainView.router.loadPage('medications_listing.html');
			
		}else{
			myApp.hidePreloader();
			myApp.alert("Your Details Not Created",'Failure');
			
		}
		});
	});
}

		}else{

			if(isNaN($('#medi_precribed').val()))
			{
				var prescribedbydr = $('#medi_precribed_id').val();
			}
			else
			{
				var prescribedbydr = $('#medi_precribed').val();
			}

			var val = "name = '"+name+"',dosage = '"+dosage+"',reference = '"+reference+"',treatmentof = '"+treatmentof+"',prescribedbydr = '"+prescribedbydr+"',otherProvider = '"+otherProvider+"',tomd = '"+tomd+"',dateStarted = '"+dateStarted+"',enddate = '"+enddate+"',enddate1 = '"+enddate1+"',type='"+type+"'";

			var url="http://www.healthrecordspro.com/ws.php?type=update&format=json&table=medications&columns="+val+"&condition=id="+medicationsform_id;
			uploadMedicationPic(medicationsform_id);

			$.getJSON (url, function (json) {
			;

			if (document.getElementById('medi_all_days').checked) {

				var monday = document.getElementById('medi_all_days').value;
				var tuesday = document.getElementById('medi_all_days').value;
				var wednesday = document.getElementById('medi_all_days').value;
				var thursday = document.getElementById('medi_all_days').value;
				var friday = document.getElementById('medi_all_days').value;
				var saturday = document.getElementById('medi_all_days').value;
				var sunday = document.getElementById('medi_all_days').value;

				}else{
					var monday = 0;var tuesday = 0;var wednesday = 0;var thursday = 0;var friday = 0;var saturday = 0;var sunday = 0;
				}
				if (document.getElementById('medi_monday').checked) {
					var monday = document.getElementById('medi_monday').value;
				}
				if (document.getElementById('medi_tuesday').checked) {
					var tuesday = document.getElementById('medi_tuesday').value;
				}
				if (document.getElementById('medi_wednesday').checked) {
					var wednesday = document.getElementById('medi_wednesday').value;
				}
				if (document.getElementById('medi_thursday').checked) {
					var thursday = document.getElementById('medi_thursday').value;
				}
				if (document.getElementById('medi_friday').checked) {
					var friday = document.getElementById('medi_friday').value;
				}
				if (document.getElementById('medi_saturday').checked) {
					var saturday = document.getElementById('medi_saturday').value;
				}
				if (document.getElementById('medi_sunday').checked) {
					var sunday = document.getElementById('medi_sunday').value;
				}
					var reminderDate = $('#medi_start_remind').val();
					var reminderTime = $('#medi_remind_time').val();
				if (document.getElementById('medi_sunday').checked) {
					var email = document.getElementById('medi_receive_email').value;
				}

					var val1 = "monday = '"+monday+"',tuesday = '"+tuesday+"',wednesday = '"+wednesday+"',thursday = '"+thursday+"',friday = '"+friday+"',saturday = '"+saturday+"',sunday = '"+sunday+"',reminderDate = '"+$('#medi_start_remind').val()+"',reminderTime = '"+$('#medi_remind_time').val()+"',email = '"+email+"'";

					var url1="http://www.healthrecordspro.com/ws.php?type=update&format=json&table=calendar&columns="+val1+"&condition=itemId="+medicationsform_id;

					$.getJSON (url1, function (json) {
						;

						if( json['posts'] ){
							createCalendarEventWithOptions(medicationsform_id);
							
							// getMedicationsData();
							myApp.alert("Your Details has been Created",'Success');
							mainView.router.loadPage('medications_listing.html');
							
							
							}else{
								myApp.alert("Your Details Not Created",'Failure');
							}
					});
					myApp.hidePreloader();

			});

		}
}

function foodAndNutSubmit()
{
	var storedData1 = myApp.formGetData('logged_userId');
	var energyintake = $('#food_nut_his_cal').val();
	var estimatedenergy = $('#food_nut_his_ecin').val();
	var caloriesfromfat = $('#food_nut_his_cff').val();
	var fromcarbohydrate = $('#food_nut_his_calfcar').val();
	var update_food = $('#update_food').val();

	if (document.getElementById('food_con_yes').checked) {
		var dairyfoods = document.getElementById('food_con_yes').value;
	}
	if (document.getElementById('food_con_no').checked) {
		var dairyfoods = document.getElementById('food_con_no').value;
	}
		var servingsforday = $('#food_nut_his_servday').val();
	if (document.getElementById('food_dines_yes').checked) {
		var dinesaway = document.getElementById('food_dines_yes').value;
	}
	if (document.getElementById('food_dines_no').checked) {
		var dinesaway = document.getElementById('food_dines_no').value;
	}
		var timesPerweek = $('#food_nut_his_tpw').val();
		var locations = $('#food_nut_his_loc').val();
		var restaurants = $('#food_nut_his_res').val();
		var fastfoot = $('#food_nut_his_ff').val();
	if (document.getElementById('food_reads_yes').checked) {
		var readsfood = document.getElementById('food_reads_yes').value;
	}
	if (document.getElementById('food_reads_no').checked) {
		var readsfood = document.getElementById('food_reads_no').value;
	}
	if (document.getElementById('food_modifies_yes').checked) {
		var modifiesfood = document.getElementById('food_modifies_yes').value;
	}
	if (document.getElementById('food_modifies_no').checked) {
		var modifiesfood = document.getElementById('food_modifies_no').value;
	}
	if (document.getElementById('food_limitp_yes').checked) {
		var portionsizes = document.getElementById('food_limitp_yes').value;
	}
	if (document.getElementById('food_limitp_no').checked) {
		var portionsizes = document.getElementById('food_limitp_no').value;
	}
	if (document.getElementById('food_maintain_yes').checked) {
		var vitaminsandminerals = document.getElementById('food_maintain_yes').value;
	}
	if (document.getElementById('food_maintain_no').checked) {
		var vitaminsandminerals = document.getElementById('food_maintain_no').value;
	}
	if (document.getElementById('food_phya_sed').checked) {
		var activitylevel = document.getElementById('food_phya_sed').value;
	}
	if (document.getElementById('food_phya_low').checked) {
		var activitylevel = document.getElementById('food_phya_low').value;
	}
	if (document.getElementById('food_phya_act').checked) {
		var activitylevel = document.getElementById('food_phya_act').value;
	}
	if (document.getElementById('food_phya_vact').checked) {
		var activitylevel = document.getElementById('food_phya_vact').value;
	}
		var specify = $('#food_nut_his_spe').val();
		var moderate = $('#food_nut_his_mod').val();
		var vigorous = $('#food_nut_his_vig').val();
		var sedentarytime = $('#food_nut_his_set').val();

		if(update_food==''){

			var columnName ="energyintake,estimatedenergy,caloriesfromfat,fromcarbohydrate,dairyfoods,servingsforday,dinesaway,timesPerweek,restaurants,locations,fastfoot,readsfood,modifiesfood,portionsizes,vitaminsandminerals,activitylevel,specify,moderate,vigorous,sedentarytime,customerId";

			var coloumnValue = "'"+energyintake+"','"+estimatedenergy+"','"+caloriesfromfat+"','"+fromcarbohydrate+"','"+dairyfoods+"','"+servingsforday+"','"+dinesaway+"','"+timesPerweek+"','"+restaurants+"','"+locations+"','"+fastfoot+"','"+readsfood+"','"+modifiesfood+"','"+portionsizes+"','"+vitaminsandminerals+"','"+activitylevel+"','"+specify+"','"+moderate+"','"+vigorous+"','"+sedentarytime+"','"+storedData1['userId']+"'";

			myApp.showPreloader();

			var url="http://www.healthrecordspro.com/ws.php?type=insert&format=json&table=foodandnutrition&columns="+columnName+"&values="+coloumnValue+"";
			$.getJSON (url, function (json) {
				myApp.hidePreloader();

				if( json['posts'][0] ){
				//getDocAppData();
					myApp.alert("Your Details has been Created",'Success');
					mainView.router.loadPage('nutrition_diet_practise.html');
				}else{
					myApp.alert("Your Details Not Created",'Failure');
				}
			});

			}else{

				var val = "energyintake = '"+energyintake+"',estimatedenergy = '"+estimatedenergy+"',caloriesfromfat = '"+caloriesfromfat+"',fromcarbohydrate = '"+fromcarbohydrate+"',dairyfoods = '"+dairyfoods+"',servingsforday = '"+servingsforday+"',dinesaway = '"+dinesaway+"',timesPerweek = '"+timesPerweek+"',locations = '"+locations+"',restaurants='"+restaurants+"',fastfoot='"+fastfoot+"',readsfood='"+readsfood+"',modifiesfood='"+modifiesfood+"',portionsizes='"+portionsizes+"',vitaminsandminerals='"+vitaminsandminerals+"',activitylevel='"+activitylevel+"',specify='"+specify+"',moderate='"+moderate+"',vigorous='"+vigorous+"',sedentarytime='"+sedentarytime+"'";

					myApp.showPreloader();

				var url="http://www.healthrecordspro.com/ws.php?type=update&format=json&table=foodandnutrition&columns="+val+"&condition=id="+update_food;

				$.getJSON (url, function (json) {
					myApp.hidePreloader();

					if( json['posts'][0] ){
						//getEmergencyContactData();
						myApp.alert("Your Details has been updated",'Success');
						mainView.router.loadPage('nutrition_diet_practise.html');
					}else{
						myApp.alert("Your Details Not Created",'Failure');
					}

				});

	}

}

function doctorsAppointment()
{
	var storedData1 = myApp.formGetData('logged_userId');
	var physicianname = $('#doc_apoint_phyname').val();
	var name_other = $('#doc_apoint_phyname_others').val();
	var specialty = $('#doc_apoint_speciality').val();
	var specialty_other = $('#doc_apoint_speciality_others').val();
	var dateofappointment = $('#doc_apoint_dofapointment').val();
	var time = $('#doc_apoint_time').val();
	var reminderdate = $('#doc_apoint_reminder_date').val();
	var remindertime = $('#doc_apoint_reminder_time').val();
	var reminderdate2 = $('#doc_apoint_sec_reminder_date').val();
	var remindertime2 = $('#doc_apoint_sec_reminder_time').val();
	if(document.getElementById('doc_aopint_rem_email').checked){
		var reminder = document.getElementById('doc_aopint_rem_email').value;
	}
	var doctors_id = $('#doctors_id').val();

	if(doctors_id==''){

			var columnName = "physicianname,name_other,specialty,specialty_other,dateofappointment,time,reminderdate,remindertime,reminderdate2,remindertime2,customerid,reminder";
			var columnValue = "'"+physicianname+"','"+name_other+"','"+specialty+"','"+specialty_other+"','"+dateofappointment+"','"+time+"','"+reminderdate+"','"+remindertime+"','"+reminderdate2+"','"+remindertime2+"','"+storedData1['userId']+"','"+reminder+"'";
			if (dateofappointment == '') {
					myApp.alert('Please Enter Date','Doctors Appointment');
			}else{
			myApp.showPreloader();

			var url="http://www.healthrecordspro.com/ws.php?type=insert&format=json&table=doctors_appointment&columns="+columnName+"&values="+columnValue+"";

			$.getJSON (url, function (json) {
				myApp.hidePreloader();

				if( json['posts'][0] ){
					createCalendarDocAppointment(json['posts'][0]);
					getDocAppData();
					
					myApp.alert("Your Details has been Created",'Success');
					mainView.router.loadPage('doctors_appoin_listing.html');

				}else{
					myApp.alert("Your Details Not Created",'Failure');
				}
			});
		}

	}else{

		if(isNaN($('#doc_apoint_phyname').val()))
			{
				var docphyid = $('#doc_apoint_phyname_id').val();
			}
			else
			{
				var docphyid = $('#doc_apoint_phyname').val();
			}
		if(isNaN($('#doc_apoint_speciality').val()))
			{
				var docspeid = $('#doc_apoint_speciality_id').val();
			}
			else
			{
				var docspeid = $('#doc_apoint_speciality').val();
			}

			var val = "physicianname = '"+docphyid+"',name_other='"+$('#doc_apoint_phyname_others').val()+"',specialty = '"+docspeid+"',specialty_other='"+$('#doc_apoint_speciality_others').val()+"',dateofappointment = '"+$('#doc_apoint_dofapointment').val()+"',time = '"+$('#doc_apoint_time').val()+"',reminderdate = '"+$('#doc_apoint_reminder_date').val()+"',remindertime = '"+$('#doc_apoint_reminder_time').val()+"',reminderdate2 = '"+$('#doc_apoint_sec_reminder_date').val()+"',remindertime2 = '"+$('#doc_apoint_sec_reminder_time').val()+"'";

			myApp.showPreloader();

			var url="http://www.healthrecordspro.com/ws.php?type=update&format=json&table=doctors_appointment&columns="+val+"&condition=id="+updateId;

				$.getJSON (url, function (json) {
					myApp.hidePreloader(); 

					if( json['posts'][0] ){
						createCalendarDocAppointment(updateId);
						getDocAppData();
						myApp.alert("Your Details has been updated",'Success');
						mainView.router.loadPage('doctors_appoin_listing.html');
					}else{
						myApp.alert("Your Details Not Created",'Failure');
					}

				});

	}
}

function surgeriesSubmit()
{
	var storedData1 = myApp.formGetData('logged_userId');
	var adminissionDate = $('#sur_add_date').val();
	var dischargeDate = $('#sur_dis_date').val();
	var caseno = $('#sur_caseno').val();
	var physician = $('#sur_physician').val();
	var reason = $('#sur_reason').val();
	var hospital = $('#sur_hospital').val();
	var address = $('#sur_address').val();
	var diagnosis = $('#sur_diag').val();
	var procedure = $('#sur_procedure').val();
	var pathology = $('#sur_pathology').val();
	var importantFindings = $('#sur_important_findings').val();
	var surgeries_id = $('#surgeries_id').val();

	if(surgeries_id==''){
	if (adminissionDate == '') {
		myApp.alert('Please Enter Date','Surgeries');
	}else{
	myApp.showPreloader();

	var url="http://www.healthrecordspro.com/ws.php?type=insert&format=json&table=surgeries&columns=adminissionDate,dischargeDate,`case`,physician,reason,hospital,address,diagnosis,`procedure`,pathology,importantFindings,user_id&values='"+adminissionDate+"','"+dischargeDate+"','"+caseno+"','"+physician+"','"+reason+"','"+hospital+"','"+address+"','"+diagnosis+"','"+procedure+"','"+pathology+"','"+importantFindings+"','"+storedData1['userId']+"'";

		$.getJSON (url, function (json) {
			myApp.hidePreloader();

		if( json['posts'][0] ){
			uploadSurgeriesUploadPic(json['posts'][0]);
			// getSurgeriesData();
			myApp.alert("Your Details has been Created",'Success');
			mainView.router.loadPage('surgeries_listing.html');

		}else{
			myApp.alert("Your Details Not Created",'Failure');
		}

	});
	}

	}else{

			var val = "adminissionDate = '"+$('#sur_add_date').val()+"',dischargeDate = '"+$('#sur_dis_date').val()+"',`case`= '"+$('#sur_caseno').val()+"',physician = '"+$('#sur_physician').val()+"',reason = '"+$('#sur_reason').val()+"',hospital = '"+$('#sur_hospital').val()+"',address = '"+$('#sur_address').val()+"',diagnosis = '"+$('#sur_diag').val()+"',`procedure` = '"+$('#sur_procedure').val()+"',pathology = '"+$('#sur_pathology').val()+"',importantFindings = '"+$('#sur_important_findings').val()+"'";

			myApp.showPreloader();

			var url="http://www.healthrecordspro.com/ws.php?type=update&format=json&table=surgeries&columns="+val+"&condition=id="+surgeries_id;
				uploadSurgeriesUploadPic(surgeries_id);
				$.getJSON (url, function (json) {
					myApp.hidePreloader();

					if( json['posts'][0] ){
						// getSurgeriesData();
						myApp.alert("Your Details has been updated",'Success');
						mainView.router.loadPage('surgeries_listing.html');
					}else{
						myApp.alert("Your Details Not Created",'Failure');
					}

				});

	}
}

function immunizationSubmit()
{
	var immuni = $('#rowIdFH11').val();
	for(i=0;i<=immuni;i++){
		var storedData1 = myApp.formGetData('logged_userId');
		var immunizations_type_id = $('#immu_name_'+i).val();
		var booster1 = $('#boost1_'+i).val();
		var booster2 = $('#boost2_'+i).val();
		var booster3 = $('#boost3_'+i).val();
		var other = $('#immu_name_others_'+i).val();
		var immunization_id = $('#immunization_id').val();

			if(immunization_id==''){

				var columnNam = "immunizations_type_id,booster1,booster2,booster3,other,user_id";
				var columnVal = "'"+immunizations_type_id+"','"+booster1+"','"+booster2+"','"+booster3+"','"+other+"','"+storedData1['userId']+"'";
				myApp.showPreloader();
				var url = "http://www.healthrecordspro.com/ws.php?type=insert&format=json&table=immunizations&columns="+columnNam+"&values="+columnVal+"";

				$.getJSON (url, function (json) {
					myApp.hidePreloader();
					if( json['posts'][0] ){
						uploadImmunizationPic(json['posts'][0]);
						getimmuData();
						myApp.alert("Your Details has been Created",'Success');
						mainView.router.loadPage('immunization_listing.html');
					}else{
						myApp.alert("Your Details Not Created",'Failure');
					}

				});
			}else{

			if(isNaN($('#immu_name').val()))
			{
				var prescribedbydr = $('#immu_name_id').val();
			}
			else
			{
				var prescribedbydr = $('#immu_name').val();
			}

			var val = "immunizations_type_id = '"+immunizations_type_id+"',booster1 = '"+booster1+"',booster2 = '"+booster2+"',booster3 = '"+booster3+"',other = '"+other+"'";

			myApp.showPreloader();
			var url1="http://www.healthrecordspro.com/ws.php?type=update&format=json&table=immunizations&columns="+val+"&condition=immunizations_id="+immunization_id;
			uploadImmunizationPic(immunization_id);
			$.getJSON (url1, function (json) {
				myApp.hidePreloader();
					if( json['posts']){
						getimmuData();
						myApp.alert("Your Details has been updated",'Success');
						mainView.router.loadPage('immunization_listing.html');
					}else{
						myApp.alert("Your Details Not Created",'Failure');
					}
				});

			}
	}

}

function allergiesSubmit()
{
	var storedData1 = myApp.formGetData('logged_userId');
	var type = $('#allergies_select').val();
	var typename = $('#allergies_alrto').val();
	var reaction = $('#allergies_react').val();
	var treatment = $('#allergies_treat').val();
	var allergies_id = $('#allergies_id').val();

	if(allergies_id==''){
		myApp.showPreloader();

		var url="http://www.healthrecordspro.com/ws.php?type=insert&format=json&table=allergies&columns=type,typename,reaction,treatment,customerid,active&values='"+type+"','"+typename+"','"+reaction+"','"+treatment+"','"+storedData1['userId']+"','1'";

			$.getJSON (url, function (json) {
				myApp.hidePreloader();

				if( json['posts'][0] ){
					uploadAllergiesPic(json['posts'][0]);
					// getAllergiesData();
					myApp.alert("Your Details has been Created",'Success');
					mainView.router.loadPage('allergies_listing.html');

				}
				else
				{
					myApp.alert("Your Details Not Created",'Failure');
				}

			});

		}
		else
		{

		var val = "type = '"+$('#allergies_select').val()+"',typename = '"+$('#allergies_alrto').val()+"',reaction = '"+$('#allergies_react').val()+"',treatment = '"+$('#allergies_treat').val()+"'";
		myApp.showPreloader();

		var url="http://www.healthrecordspro.com/ws.php?type=update&format=json&table=allergies&columns="+val+"&condition=id="+allergies_id;
		uploadAllergiesPic(allergies_id);

			$.getJSON (url, function (json) {
				myApp.hidePreloader();

					if( json['posts'][0] ){
						// getAllergiesData();
						myApp.alert("Your Details has been updated",'Success');
						mainView.router.loadPage('allergies_listing.html');
					}
					else
					{
						// getAllergiesData();
						myApp.alert("Your Details has been updated",'Success');
						mainView.router.loadPage('allergies_listing.html');
					}

				});
		}

}

function organDoSubmit()
{
	var storedData1 = myApp.formGetData('logged_userId');
	var do_which_organ = $('#which_organ').val();
	var do_name_recipient = $('#organ_name_recipient').val();
	var do_city_transfer = $('#organ_city_organ_trans').val();
	var do_hospital = $('#organ_whe_trans_occ').val();
	var do_doctorid = $('#organ_name_doc').val();
	var ro_which_organ = $('#organ_which').val();
	var ro_name_recipient = $('#organ_name_of_recei').val();
	var ro_city_transfer = $('#organ_transfer_city').val();
	var ro_hospital = $('#organ_hospi_ortrans').val();
	var ro_doctorid = $('#organ_name_doc1').val();
	var which_organs = $('#organ_which1').val();
	var organ_id = $('#organ_id').val();

	if(organ_id==''){

		var url="http://www.healthrecordspro.com/ws.php?type=insert&format=json&table=organdonor&columns=do_which_organ,do_name_recipient,do_city_transfer,do_hospital,do_doctorid,`ro_which_organ`,ro_name_recipient,ro_city_transfer,ro_hospital,ro_doctorid,which_organs,customerId&values='"+do_which_organ+"','"+do_name_recipient+"','"+do_city_transfer+"','"+do_hospital+"','"+do_doctorid+"','"+ro_which_organ+"','"+ro_name_recipient+"','"+ro_city_transfer+"','"+ro_hospital+"','"+ro_doctorid+"','"+which_organs+"','"+storedData1['userId']+"'";

		$.getJSON (url, function (json) {

			if( json['posts'][0] ){
				uploadOrgandonationPic(json['posts'][0]);
				getOrganData();
				myApp.alert("Your Details has been Created",'Success');
				mainView.router.loadPage('loginnormal.html');
		}else{
				myApp.alert("Your Details Not Created",'Failure');
		}

		});

		}else{

			if(isNaN($('#organ_name_doc').val()))
			{
				var do_doctorid1 = $('#organ_name_doc_id').val();
			}
			else
			{
				var do_doctorid1 = $('#organ_name_doc').val();
			}

			if(isNaN($('#organ_name_doc1').val()))
			{
				var ro_doctorid1 = $('#organ_name_doc1_id').val();
			}
			else
			{
				var ro_doctorid1 = $('#organ_name_doc1').val();
			}

			var val = "do_which_organ = '"+$('#which_organ').val()+"',do_name_recipient = '"+$('#organ_name_recipient').val()+"',do_city_transfer = '"+$('#organ_city_organ_trans').val()+"',do_hospital = '"+$('#organ_whe_trans_occ').val()+"',do_doctorid = '"+do_doctorid1+"',ro_which_organ = '"+$('#organ_which').val()+"',ro_name_recipient = '"+$('#organ_name_of_recei').val()+"',ro_city_transfer = '"+$('#organ_transfer_city').val()+"',ro_hospital = '"+$('#organ_hospi_ortrans').val()+"',ro_doctorid = '"+ro_doctorid1+"',which_organs = '"+$('#organ_which1').val()+"'";

			var url="http://www.healthrecordspro.com/ws.php?type=update&format=json&table=organdonor&columns="+val+"&condition=id="+organ_id;
			uploadOrgandonationPic(organ_id);

			$.getJSON (url, function (json) {

				if( json['posts'][0] ){
					getOrganData();
					myApp.alert("Your Details has been updated",'Success');
					mainView.router.loadPage('loginnormal.html');
				}else{
					myApp.alert("Your Details Not Created",'Failure');
				}

			});

	}

}

function medicalhistorySubmit()
{
	var medihisadd = $('#rowIdFH10').val();
	setTimeout(function(){
	for(i=0;i<=medihisadd;i++)
	{
		var storedData1 = myApp.formGetData('logged_userId');
		var illnessId = $('#medi_his_name_'+i).val();
		// var stillActive = $('#medi_sactive_'+i).;
		if (document.getElementById('medi_sactive_'+i).checked) {
		var stillActive = document.getElementById('medi_sactive_'+i).value;
		}
		var start_date = $('#medi_sdate_'+i).val();
		var resolvedDate = $('#medi_rdate_'+i).val();
		var other = $('#medi_his_name_others_'+i).val();
		var update_medi_sdate = $('#update_medi_sdate').val();

		if(update_medi_sdate==''){
		myApp.showPreloader();

			var columnNam = "illnessId,stillActive,start_date,resolvedDate,other,customerId";
			var columnVal = "'"+illnessId+"','"+stillActive+"','"+start_date+"','"+resolvedDate+"','"+other+"','"+storedData1['userId']+"'";
			var url = "http://www.healthrecordspro.com/ws.php?type=insert&format=json&table=illnessescustomers&columns="+columnNam+"&values="+columnVal+"";
			$.getJSON (url, function (json) {
				myApp.hidePreloader();

				if( json['posts'][0] ){
					// getmedihistoryData();
					myApp.alert("Your Details has been Created",'Success');
					mainView.router.loadPage('medical_history_condi_listing.html');
				}else{
					myApp.alert("Your Details Not Created",'Failure');
				}

			});

		}else{

			var val = "illnessId = '"+illnessId+"',stillActive = '"+stillActive+"',start_date = '"+start_date+"',resolvedDate = '"+resolvedDate+"',other = '"+other+"'";
			myApp.showPreloader();
			var url1="http://www.healthrecordspro.com/ws.php?type=update&format=json&table=illnessescustomers&columns="+val+"&condition=id="+update_medi_sdate;

			$.getJSON (url1, function (json) {
				myApp.hidePreloader();

				if( json['posts'][0] ){
					// getmedihistoryData();
					myApp.alert("Your Details has been updated",'Success');
					mainView.router.loadPage('medical_history_condi_listing.html');
				}else{
					myApp.alert("Your Details Not Created",'Failure');
				}

			});
		}
	}
	},1000);
}

function emergencyContactSubmit()
{
		var storedData1 = myApp.formGetData('logged_userId');
		var first_name = $('#emergency_con_firstName').val();
		var middle_name = $('#emergency_con_MidleName').val();
		var last_name = $('#emergency_con_lastName').val();
		var relationship = $('#emergency_con_relaship').val();
		var email = $('#emergency_con_email').val();
		var street = $('#emergency_con_street').val();
		var city = $('#emergency_con_city').val();
		var state = $('#emergency_con_state').val();
		var zip_code = $('#emergency_con_zip').val();
		var country = $('#emergency_country_select').val();
		var home_phone_number = $('#emergency_con_home_phno').val();
		var work_phone_number = $('#emergency_con_work_phno').val();
		var mobile_phone = $('#emergency_con_mobile_phno').val();
		var update_emergency_id = $('#update_emergency_id').val();

		if(update_emergency_id==''){
			myApp.showPreloader();
		var url="http://www.healthrecordspro.com/ws.php?type=insert&format=json&table=emergency_contacts&columns=first_name,middle_name,last_name,relationship,email,street,city,state,zip_code,country,home_phone_number,work_phone_number,mobile_phone,user_id,active&values='"+first_name+"','"+middle_name+"','"+last_name+"','"+relationship+"','"+email+"','"+street+"','"+city+"','"+state+"','"+zip_code+"','"+country+"','"+home_phone_number+"','"+work_phone_number+"','"+mobile_phone+"','"+storedData1['userId']+"','1'";

			$.getJSON (url, function (json) {
				myApp.hidePreloader();

			if( json['posts'][0]){
				uploadEmergencyContactCardsPic(json['posts'][0]);
				uploadEmergencyContactCardsCameraPic(json['posts'][0]);
				// getEmergencyContactData();
				myApp.alert("Your Details has been Created",'Success');
				mainView.router.loadPage('emergency_contact_listing.html');
				 getEmergencyContactData();

			}
			else
			{
				myApp.alert("Your Details Not Created",'Failure');
				getEmergencyContactData();
			}

		});

		}
		else
		{
			var val = "first_name = '"+first_name+"',middle_name = '"+middle_name+"',last_name = '"+last_name+"',relationship = '"+relationship+"',email = '"+email+"',street = '"+street+"',city = '"+city+"',state = '"+state+"',zip_code = '"+zip_code+"',country='"+$('#emergency_country_select').val()+"',home_phone_number='"+home_phone_number+"',work_phone_number='"+work_phone_number+"',mobile_phone='"+mobile_phone+"'";

			myApp.showPreloader();

			var url="http://www.healthrecordspro.com/ws.php?type=update&format=json&table=emergency_contacts&columns="+val+"&condition=contact_id="+update_emergency_id;
				uploadEmergencyContactCardsPic(update_emergency_id);
				uploadEmergencyContactCardsCameraPic(update_emergency_id);
				$.getJSON (url, function (json) {
					myApp.hidePreloader();

					if( json['posts'][0] ){

						// getEmergencyContactData();
						myApp.alert("Your Details has been updated",'Success');
						mainView.router.loadPage('emergency_contact_listing.html');
						 getEmergencyContactData();
					}
					else
					{
						// getEmergencyContactData();
						myApp.alert("Your Details has been updated",'Success');
						mainView.router.loadPage('emergency_contact_listing.html');
						 getEmergencyContactData();
					}

				});
		}
}

function implantsdataSubmit()
{
	var storedData1 = myApp.formGetData('logged_userId');
	var physician = $('#implants_meddevices_physician').val();
	var hospital = $('#implants_meddevices_hospital').val();
	var date = $('#implants_meddevices_date').val();
	var reason = $('#implants_meddevices_reason').val();
	var type = $('#implants_meddevices_type').val();
	var update_implants_id = $('#update_implants_id').val();

		if(update_implants_id==''){

		var url="http://www.healthrecordspro.com/ws.php?type=insert&format=json&table=medicaldevices&columns=physician,hospital,date,reason,type,customerId,active&values='"+physician+"','"+hospital+"','"+date+"','"+reason+"','"+type+"','"+storedData1['userId']+"','1'";

			$.getJSON (url, function (json) {
				myApp.hidePreloader();

				if( json['posts'][0] ){
					getImplantsAndMediData();
					myApp.alert("Your Details has been Created",'Success');
					mainView.router.loadPage('implants_medicaldevices_listing.html');
				}else{
					myApp.alert("Your Details Not Created",'Failure');
				}

			});

		}else{

			var val = "physician = '"+physician+"',hospital = '"+hospital+"',date = '"+date+"',reason = '"+reason+"',type = '"+type+"'";

			myApp.showPreloader();

			var url="http://www.healthrecordspro.com/ws.php?type=update&format=json&table=medicaldevices&columns="+val+"&condition=id="+update_implants_id;

				$.getJSON (url, function (json) {
					myApp.hidePreloader();
					
					if( json['posts'][0] ){
						getImplantsAndMediData();
						myApp.alert("Your Details has been updated",'Success');
						mainView.router.loadPage('implants_medicaldevices_listing.html');
					}else{
						myApp.alert("Your Details Not Created",'Failure');
					}

				});
		}

}

function developmentformSubmit()
{
	var storedData1 = myApp.formGetData('logged_userId');
	var childid = $('#deve_his_chainame').val();
	var HoldUpHead = $('#deve_his_huh').val();
	var RollOver = $('#deve_his_rover').val();
	var sitUnsupported = $('#deve_his_sitsup').val();
	var standAlone = $('#deve_his_salone').val();
	var walk = $('#deve_his_walk').val();
	var talk = $('#deve_his_talk').val();
	var toilettrain = $('#deve_his_tt').val();
	var feedhim = $('#deve_his_fed').val();
	var dresshim = $('#deve_his_dress').val();
	var deve_his_update = $('#deve_his_update').val();

		if(deve_his_update==''){
			myApp.showPreloader();

			var url="http://www.healthrecordspro.com/ws.php?type=insert&format=json&table=Developmentlhistory&columns=childid,HoldUpHead,RollOver,sitUnsupported,standAlone,walk,talk,toilettrain,feedhim,dresshim,customerId&values='"+childid+"','"+HoldUpHead+"','"+RollOver+"','"+sitUnsupported+"','"+standAlone+"','"+walk+"','"+talk+"','"+toilettrain+"','"+feedhim+"','"+dresshim+"','"+storedData1['userId']+"'";

			$.getJSON (url, function (json) {
				 myApp.hidePreloader();

			if( json['posts'][0] ){
				// getDevelopmentHisData();
				myApp.alert("Your Details has been Created",'Success');
				mainView.router.loadPage('development_his_listing.html');
			}else{
				myApp.alert("Your Details Not Created",'Failure');
			}

		});

		}else{

			if(isNaN($('#deve_his_chainame').val()))
			{
				var devchid = $('#deve_his_chn_id').val();
			}
			else
			{
				var devchid = $('#deve_his_chainame').val();
			}

			var val = "childid = '"+devchid+"',HoldUpHead = '"+HoldUpHead+"',RollOver = '"+RollOver+"',sitUnsupported = '"+sitUnsupported+"',standAlone = '"+standAlone+"',walk = '"+walk+"',talk = '"+talk+"',toilettrain = '"+toilettrain+"',feedhim = '"+feedhim+"',dresshim = '"+dresshim+"'";

				myApp.showPreloader();

			var url="http://www.healthrecordspro.com/ws.php?type=update&format=json&table=Developmentlhistory&columns="+val+"&condition=id="+deve_his_update;

			$.getJSON (url, function (json) {
				myApp.hidePreloader();

					if( json['posts'][0] ){
						// getDevelopmentHisData();
						myApp.alert("Your Details has been updated",'Success');
						mainView.router.loadPage('development_his_listing.html');
					}else{
						myApp.alert("Your Details Not Created",'Failure');
					}

				});

		}

}

function obestericformSubmit()
{
		var storedData1 = myApp.formGetData('logged_userId');

		if (document.getElementById('obe_his_check').checked) {
			var never_pregnant = document.getElementById('obe_his_check').value;
		}
			var dateOfDelivery = $('#obe_his_date').val();
			var nbrOfWeeks = $('#obe_his_now').val();
			var laborLength = $('#obe_his_lbln').val();
			var badyWeight = $('#obe_his_babw').val();
			var sex = $('#obe_his_sex').val();
		if (document.getElementById('obe_his_dt').checked) {
			var delveryType = document.getElementById('obe_his_dt').value;
		}
		if (document.getElementById('obe_his_dt1').checked) {
			var delveryType = document.getElementById('obe_his_dt1').value;
		}
			var epidural = $('#obe_his_epi').val();
			var LivingName = $('#obe_his_name').val();
			var comments = $('#obe_his_cmts').val();
			var obe_his_update = $('#obe_his_update').val();

		if(obe_his_update==''){

			var url="http://www.healthrecordspro.com/ws.php?type=insert&format=json&table=obstetric_history&columns=never_pregnant,dateOfDelivery,nbrOfWeeks,laborLength,badyWeight,sex,delveryType,epidural,LivingName,comments,customerId&values='"+never_pregnant+"','"+dateOfDelivery+"','"+nbrOfWeeks+"','"+laborLength+"','"+badyWeight+"','"+sex+"','"+delveryType+"','"+epidural+"','"+LivingName+"','"+comments+"','"+storedData1['userId']+"'";

		$.getJSON (url, function (json) {
		myApp.hidePreloader();

			if( json['posts'][0] ){
				// getObestetricData();
				myApp.alert("Your Details has been Created",'Success');
				mainView.router.loadPage('obestetric_history_listing.html');
			}
			else
			{
				myApp.alert("Your Details Not Created",'Failure');
			}
		});

		}else{

			var val = "never_pregnant = '"+never_pregnant+"',dateOfDelivery = '"+dateOfDelivery+"',nbrOfWeeks = '"+nbrOfWeeks+"',laborLength = '"+laborLength+"',badyWeight = '"+badyWeight+"',sex = '"+sex+"',delveryType = '"+delveryType+"',epidural = '"+epidural+"',LivingName = '"+LivingName+"',comments = '"+comments+"'";

				myApp.showPreloader();

			var url="http://www.healthrecordspro.com/ws.php?type=update&format=json&table=obstetric_history&columns="+val+"&condition=id="+obe_his_update;

			$.getJSON (url, function (json) {
			myApp.hidePreloader();

				if( json['posts'][0] ){
					// getObestetricData();
					myApp.alert("Your Details has been updated",'Success');
					mainView.router.loadPage('obestetric_history_listing.html');
				}
				else
				{
					myApp.alert("Your Details Not Created",'Failure');
				}
			});
		}
	}

function gynecologicformSubmit()
{
	var storedData1 = myApp.formGetData('logged_userId');
	var ageOfFirstPeriod = $('#gyne_his_afp').val();
	var dateOfLastPapSmear = $('#gyne_his_dolps').val();
	var result = $('#gyne_his_result').val();

	if (document.getElementById('gyne_his_have_abpap').checked) {
		var AbnolmalPapSmear = document.getElementById('gyne_his_have_abpap').value;
	}
		var ifyes = $('#gyne_his_wyear').val();
		var treatments = $('#gyne_his_wk').val();
		if (document.getElementById('gyne_his_have_sex_trinf').checked) {
			var secuallyInfections = document.getElementById('gyne_his_have_sex_trinf').value;
		}
		var ifyes2 = $('#gyne_his_wtypes').val();
		var gyne_his_update = $('#gyne_his_update').val();

		if(gyne_his_update==''){

			var url="http://www.healthrecordspro.com/ws.php?type=insert&format=json&table=womanGynecologic&columns=ageOfFirstPeriod,dateOfLastPapSmear,result,AbnolmalPapSmear,ifyes,treatments,secuallyInfections,ifyes2,customerId&values='"+ageOfFirstPeriod+"','"+dateOfLastPapSmear+"','"+result+"','"+AbnolmalPapSmear+"','"+ifyes+"','"+treatments+"','"+secuallyInfections+"','"+ifyes2+"','"+storedData1['userId']+"'";

			$.getJSON (url, function (json) {
				myApp.hidePreloader();

			if( json['posts'][0] ){
				getgynecologicData();
				myApp.alert("Your Details has been Created",'Success');
				mainView.router.loadPage('gynecologic_history_listing.html');
			}else{
				myApp.alert("Your Details Not Created",'Failure');
			}

		});

		}else{

			var val = "ageOfFirstPeriod = '"+ageOfFirstPeriod+"',dateOfLastPapSmear = '"+dateOfLastPapSmear+"',result = '"+result+"',AbnolmalPapSmear = '"+AbnolmalPapSmear+"',ifyes = '"+ifyes+"',treatments = '"+treatments+"',secuallyInfections = '"+secuallyInfections+"',ifyes2 = '"+ifyes2+"'";

				myApp.showPreloader();
			var url="http://www.healthrecordspro.com/ws.php?type=update&format=json&table=womanGynecologic&columns="+val+"&condition=id="+gyne_his_update;

				$.getJSON (url, function (json) {
				myApp.hidePreloader();

					if( json['posts'][0] ){
						getgynecologicData();
						myApp.alert("Your Details has been updated",'Success');
						mainView.router.loadPage('gynecologic_history_listing.html');
					}else{
						myApp.alert("Your Details Not Created",'Failure');
					}

				});
		}

}

function womenspregDatingSubmit()
{

	var storedData1 = myApp.formGetData('logged_userId');
	var menstrualPeriod = $('#womens_preg_dating_fdlmp').val();
	if (document.getElementById('womens_preg_dating_cer').checked) {
		var certainApproximate = document.getElementById('womens_preg_dating_cer').value;
	}
	if (document.getElementById('womens_preg_dating_app').checked) {
		var certainApproximate = document.getElementById('womens_preg_dating_app').value;
	}
		var frequencyPeriodDays = $('#womens_preg_dating_fpstne').val();
		var dop = $('#womens_preg_dating_duration').val();
	if (document.getElementById('womens_preg_dating_apr').checked) {
		var periodRegular = document.getElementById('womens_preg_dating_apr').value;
	}
	if (document.getElementById('womens_preg_dating_apr1').checked) {
		var periodRegular = document.getElementById('womens_preg_dating_apr1').value;
	}
	if (document.getElementById('womens_preg_dating_wbcp').checked) {
		var birthControl = document.getElementById('womens_preg_dating_wbcp').value;
	}
	if (document.getElementById('womens_preg_dating_wbcp1').checked) {
		var birthControl = document.getElementById('womens_preg_dating_wbcp1').value;
	}
		var method = $('#womens_preg_dating_methode').val();
	if (document.getElementById('womens_preg_dating_hythpt').checked) {
		var pregrancyTest = document.getElementById('womens_preg_dating_hythpt').value;
	}
	if (document.getElementById('womens_preg_dating_hythpt1').checked) {
		var pregrancyTest = document.getElementById('womens_preg_dating_hythpt1').value;
	}
		var pregnancyTestDate = $('#womens_preg_dating_ptd').val();
		var womens_preg_dating_update = $('#womens_preg_dating_update').val();

	if(womens_preg_dating_update==''){

	var url="http://www.healthrecordspro.com/ws.php?type=insert&format=json&table=womanPregnancyDating&columns=menstrualPeriod,certainApproximate,frequencyPeriodDays,dop,periodRegular,birthControl,method,pregrancyTest,pregnancyTestDate,customerId&values='"+menstrualPeriod+"','"+certainApproximate+"','"+frequencyPeriodDays+"','"+dop+"','"+periodRegular+"','"+birthControl+"','"+method+"','"+pregrancyTest+"','"+pregnancyTestDate+"','"+storedData1['userId']+"'";

			$.getJSON (url, function (json) {
				myApp.hidePreloader();

			if( json['posts'][0] ){
				getwomenspregDatingData();
				myApp.alert("Your Details has been Created",'Success');
				mainView.router.loadPage('womens_preg_dating_listing.html');
			}else{
				myApp.alert("Your Details Not Created",'Failure');
			}

		});

		}else{

			var val = "menstrualPeriod = '"+menstrualPeriod+"',certainApproximate = '"+certainApproximate+"',frequencyPeriodDays = '"+frequencyPeriodDays+"',dop = '"+dop+"',periodRegular = '"+periodRegular+"',birthControl = '"+birthControl+"',method = '"+method+"',pregrancyTest = '"+pregrancyTest+"',pregnancyTestDate = '"+pregnancyTestDate+"'";

			myApp.showPreloader();

			var url="http://www.healthrecordspro.com/ws.php?type=update&format=json&table=womanPregnancyDating&columns="+val+"&condition=id="+womens_preg_dating_update;

			$.getJSON (url, function (json) {
				myApp.hidePreloader();
				
				if( json['posts'][0] ){
						getwomenspregDatingData();
						myApp.alert("Your Details has been updated",'Success');
						mainView.router.loadPage('womens_preg_dating_listing.html');
					}else{
						myApp.alert("Your Details Not Created",'Failure');
					}

				});

		}

}

function socialHisDataSubmit()
{
	var storedData1 = myApp.formGetData('logged_userId');
	if (document.getElementById('social_his_smo').checked) {
	var smokeCigarettes = document.getElementById('social_his_smo').value;
	}
	if (document.getElementById('social_his_smo1').checked) {
	var smokeCigarettes = document.getElementById('social_his_smo1').value;
	}
	if (document.getElementById('social_his_smo2').checked) {
	var smokeCigarettes = document.getElementById('social_his_smo2').value;
	}
	if (document.getElementById('social_his_past').checked) {
	var pastUse = document.getElementById('social_his_past').value;
	}
	if (document.getElementById('social_his_past1').checked) {
	var pastUse = document.getElementById('social_his_past1').value;
	}
	var quitDate = $('#social_his_qd').val();
	var numberofPacks = $('#social_his_nopd').val();
	var numberofYears = $('#social_his_nop').val();
	if (document.getElementById('social_his_otu').checked) {
	var otherUse = document.getElementById('social_his_otu').value;
	}
	if (document.getElementById('social_his_otu1').checked) {
	var otherUse = document.getElementById('social_his_otu1').value;
	}
	if (document.getElementById('social_his_otu2').checked) {
	var otherUse = document.getElementById('social_his_otu2').value;
	}
	if (document.getElementById('social_his_otu3').checked) {
	var otherUse = document.getElementById('social_his_otu3').value;
	}
	if (document.getElementById('social_his_otu4').checked) {
	var otherUse = document.getElementById('social_his_otu4').value;
	}
	if (document.getElementById('social_his_dudal').checked) {
	var drinkAlcohol = document.getElementById('social_his_dudal').value;
	}
	if (document.getElementById('social_his_dudal1').checked) {
	var drinkAlcohol = document.getElementById('social_his_dudal1').value;
	}
	var NbrofDrinksPerWeek = $('#social_his_nodpw').val();
	var quitforpregancy = $('#social_his_qfp').val();
	var social_his_update = $('#social_his_update').val();

	if(social_his_update==''){

	var url="http://www.healthrecordspro.com/ws.php?type=insert&format=json&table=SocialHistory&columns=smokeCigarettes,pastUse,quitDate,numberofPacks,numberofYears,otherUse,drinkAlcohol,NbrofDrinksPerWeek,quitforpregancy,customerId&values='"+smokeCigarettes+"','"+pastUse+"','"+quitDate+"','"+numberofPacks+"','"+numberofYears+"','"+otherUse+"','"+drinkAlcohol+"','"+NbrofDrinksPerWeek+"','"+quitforpregancy+"','"+storedData1['userId']+"'";

			$.getJSON (url, function (json) {
				myApp.hidePreloader();

			if( json['posts'][0] ){
				getsocialhistoryData();
				myApp.alert("Your Details has been Created",'Success');
				mainView.router.loadPage('social_history_listing.html');
			}else{
				myApp.alert("Your Details Not Created",'Failure');
			}

		});

		}else{

			var val = "smokeCigarettes = '"+smokeCigarettes+"',pastUse = '"+pastUse+"',quitDate = '"+quitDate+"',numberofPacks = '"+numberofPacks+"',numberofYears = '"+numberofYears+"',otherUse = '"+otherUse+"',drinkAlcohol = '"+drinkAlcohol+"',NbrofDrinksPerWeek = '"+NbrofDrinksPerWeek+"',quitforpregancy = '"+quitforpregancy+"'"; 

			myApp.showPreloader();

			var url="http://www.healthrecordspro.com/ws.php?type=update&format=json&table=SocialHistory&columns="+val+"&condition=id="+social_his_update;

			$.getJSON (url, function (json) {
				 myApp.hidePreloader();

				if( json['posts'][0] ){
						getsocialhistoryData();
						myApp.alert("Your Details has been updated",'Success');
						mainView.router.loadPage('social_history_listing.html');
					}else{
						myApp.alert("Your Details Not Created",'Failure');
					}

				});

		}
}

function pastmediHisformSubmit()
{
		var storedData1 = myApp.formGetData('logged_userId');
		var childid = $('#past_medi_his_chainame').val();
		var familhisCaus = $('#medidos_count').val();

	if (document.getElementById('past_medi_his_aller').checked) {
		var allergy = document.getElementById('past_medi_his_aller').value;
	}
	if (document.getElementById('past_medi_his_aller1').checked) {
		var allergy = document.getElementById('past_medi_his_aller1').value;
	}
	if (document.getElementById('past_medi_his_bltr').checked) {
		var bloodtransfusions = document.getElementById('past_medi_his_bltr').value;
	}
	if (document.getElementById('past_medi_his_bltr1').checked) {
		var bloodtransfusions = document.getElementById('past_medi_his_bltr1').value;
	}
	if (document.getElementById('past_medi_his_chknpox').checked) {
		var chickenpox = document.getElementById('past_medi_his_chknpox').value;
	}
	if (document.getElementById('past_medi_his_chknpox1').checked) {
		var chickenpox = document.getElementById('past_medi_his_chknpox1').value;
	}
	if (document.getElementById('past_medi_his_contusions').checked) {
		var contusions = document.getElementById('past_medi_his_contusions').value;
	}
	if (document.getElementById('past_medi_his_contusions1').checked) {
		var contusions = document.getElementById('past_medi_his_contusions1').value;
	}
	if (document.getElementById('past_medi_his_convulison').checked) {
		var convuslsions = document.getElementById('past_medi_his_convulison').value;
	}
	if (document.getElementById('past_medi_his_convulison1').checked) {
		var convuslsions = document.getElementById('past_medi_his_convulison1').value;
	}
	if (document.getElementById('past_medi_his_fractures').checked) {
		var fractures = document.getElementById('past_medi_his_fractures').value;
	}
	if (document.getElementById('past_medi_his_fractures1').checked) {
		var fractures = document.getElementById('past_medi_his_fractures1').value;
	}
	if (document.getElementById('past_medi_his_germea').checked) {
		var rubella = document.getElementById('past_medi_his_germea').value;
	}
	if (document.getElementById('past_medi_his_germea1').checked) {
		var rubella = document.getElementById('past_medi_his_germea1').value;
	}
	if (document.getElementById('past_medi_his_hospi').checked) {
		var hospitalizations = document.getElementById('past_medi_his_hospi').value;
	}
	if (document.getElementById('past_medi_his_hospi1').checked) {
		var hospitalizations = document.getElementById('past_medi_his_hospi1').value;
	}
	if (document.getElementById('past_medi_his_measles').checked) {
		var measles = document.getElementById('past_medi_his_measles').value;
	}
	if (document.getElementById('past_medi_his_measles1').checked) {
		var measles = document.getElementById('past_medi_his_measles1').value;
	}
	if (document.getElementById('past_medi_his_meningts').checked) {
		var meningitis = document.getElementById('past_medi_his_meningts').value;
	}
	if (document.getElementById('past_medi_his_meningts1').checked) {
		var meningitis = document.getElementById('past_medi_his_meningts1').value;
	}
	if (document.getElementById('past_medi_his_mumps').checked) {
		var mumps = document.getElementById('past_medi_his_mumps').value;
	}
	if (document.getElementById('past_medi_his_mumps1').checked) {
		var mumps = document.getElementById('past_medi_his_mumps1').value;
	}
	if (document.getElementById('past_medi_his_oper').checked) {
		var operations = document.getElementById('past_medi_his_oper').value;
	}
	if (document.getElementById('past_medi_his_oper1').checked) {
		var operations = document.getElementById('past_medi_his_oper1').value;
	}
		var reason = $('#past_medi_his_reason').val();
	if (document.getElementById('past_medi_his_omill').checked) {
		var otherillnessescurrentmedications = document.getElementById('past_medi_his_omill').value;
	}
	if (document.getElementById('past_medi_his_omill1').checked) {
		var otherillnessescurrentmedications = document.getElementById('past_medi_his_omill1').value;
	}
	if (document.getElementById('past_medi_his_iucctm').checked) {
		var currenttaking = document.getElementById('past_medi_his_iucctm').value;
	}
	if (document.getElementById('past_medi_his_iucctm1').checked) {
		var currenttaking = document.getElementById('past_medi_his_iucctm1').value;
	}
	if (document.getElementById('past_medi_his_avpr').checked) {
		var visualproblems = document.getElementById('past_medi_his_avpr').value;
	}
	if (document.getElementById('past_medi_his_avpr1').checked) {
		var visualproblems = document.getElementById('past_medi_his_avpr1').value;
	}
	if (document.getElementById('past_medi_his_doelc').checked) {
		var eyescrosses = document.getElementById('past_medi_his_doelc').value;
	}
	if (document.getElementById('past_medi_his_doelc1').checked) {
		var eyescrosses = document.getElementById('past_medi_his_doelc1').value;
	}
	if (document.getElementById('past_medi_his_docweg').checked) {
		var eyeglasses = document.getElementById('past_medi_his_docweg').value;
	}
	if (document.getElementById('past_medi_his_docweg1').checked) {
		var eyeglasses = document.getElementById('past_medi_his_docweg1').value;
	}
	if (document.getElementById('past_medi_his_hprob').checked) {
		var hearingproblems = document.getElementById('past_medi_his_hprob').value;
	}
	if (document.getElementById('past_medi_his_hprob1').checked) {
		var hearingproblems = document.getElementById('past_medi_his_hprob1').value;
	}
	if (document.getElementById('past_medi_his_einfe').checked) {
		var earinfections = document.getElementById('past_medi_his_einfe').value;
	}
	if (document.getElementById('past_medi_his_einfe1').checked) {
		var earinfections = document.getElementById('past_medi_his_einfe1').value;
	}
	if (document.getElementById('past_medi_his_dchfaosn').checked) {
		var rubbing = document.getElementById('past_medi_his_dchfaosn').value;
	}
	if (document.getElementById('past_medi_his_dchfaosn1').checked) {
		var rubbing = document.getElementById('past_medi_his_dchfaosn1').value;
	}
	if (document.getElementById('past_medi_his_hnobl').checked) {
		var nosebleeds = document.getElementById('past_medi_his_hnobl').value;
	}
	if (document.getElementById('past_medi_his_hnobl1').checked) {
		var nosebleeds = document.getElementById('past_medi_his_hnobl1').value;
	}
	if (document.getElementById('past_medi_his_thinfe').checked) {
		var throatinfections = document.getElementById('past_medi_his_thinfe').value;
	}
	if (document.getElementById('past_medi_his_thinfe1').checked) {
		var throatinfections = document.getElementById('past_medi_his_thinfe1').value;
	}
	if (document.getElementById('past_medi_his_hrtmur').checked) {
		var hurtmumar = document.getElementById('past_medi_his_hrtmur').value;
	}
	if (document.getElementById('past_medi_his_hrtmur1').checked) {
		var hurtmumar = document.getElementById('past_medi_his_hrtmur1').value;
	}
	if (document.getElementById('past_medi_his_hrtdef').checked) {
		var heartdefet = document.getElementById('past_medi_his_hrtdef').value;
	}
	if (document.getElementById('past_medi_his_hrtdef1').checked) {
		var heartdefet = document.getElementById('past_medi_his_hrtdef1').value;
	}
	if (document.getElementById('past_medi_his_hbp').checked) {	
		var bloodpressure = document.getElementById('past_medi_his_hbp').value;
	}
	if (document.getElementById('past_medi_his_hbp1').checked) {
		var bloodpressure = document.getElementById('past_medi_his_hbp1').value;
	}
	if (document.getElementById('past_medi_his_bron').checked) {
		var bronchitis = document.getElementById('past_medi_his_bron').value;
	}
	if (document.getElementById('past_medi_his_bron1').checked) {
		var bronchitis = document.getElementById('past_medi_his_bron1').value;
	}
	if (document.getElementById('past_medi_his_chronic').checked) {
		var cough = document.getElementById('past_medi_his_chronic').value;
	}
	if (document.getElementById('past_medi_his_chronic1').checked) {
		var cough = document.getElementById('past_medi_his_chronic1').value;
	}
	if (document.getElementById('past_medi_his_bldst').checked) {
		var bloodinstools = document.getElementById('past_medi_his_bldst').value;
	}
	if (document.getElementById('past_medi_his_bldst1').checked) {
		var bloodinstools = document.getElementById('past_medi_his_bldst1').value;
	}
	if (document.getElementById('past_medi_his_fap').checked) {
		var abdominalpain = document.getElementById('past_medi_his_fap').value;
	}
	if (document.getElementById('past_medi_his_fap1').checked) {
		var abdominalpain = document.getElementById('past_medi_his_fap1').value;
	}
	if (document.getElementById('past_medi_his_fvd').checked) {
		var vomiting = document.getElementById('past_medi_his_fvd').value;
	}
	if (document.getElementById('past_medi_his_fvd1').checked) {
		var vomiting = document.getElementById('past_medi_his_fvd1').value;
	}
	if (document.getElementById('past_medi_his_jaundies').checked) {
		var jaundice = document.getElementById('past_medi_his_jaundies').value;
	}
	if (document.getElementById('past_medi_his_jaundies1').checked) {
		var jaundice = document.getElementById('past_medi_his_jaundies1').value;
	}
	if (document.getElementById('past_medi_his_mwloss').checked) {
		var weightloss = document.getElementById('past_medi_his_mwloss').value;
	}
	if (document.getElementById('past_medi_his_mwloss1').checked) {
		var weightloss = document.getElementById('past_medi_his_mwloss1').value;
	}
		var ifyes = $('#past_medi_his_ifyese').val();
	if (document.getElementById('past_medi_his_boffuri').checked) {
		var urination = document.getElementById('past_medi_his_boffuri').value;
	}
	if (document.getElementById('past_medi_his_boffuri1').checked) {
		var urination = document.getElementById('past_medi_his_boffuri1').value;
	}
	if (document.getElementById('past_medi_his_webed').checked) {
		var wetting = document.getElementById('past_medi_his_webed').value;
	}
	if (document.getElementById('past_medi_his_webed1').checked) {
		var wetting = document.getElementById('past_medi_his_webed1').value;
	}
	if (document.getElementById('past_medi_his_blinur').checked) {
		var urine = document.getElementById('past_medi_his_blinur').value;
	}
	if (document.getElementById('past_medi_his_blinur1').checked) {
		var urine = document.getElementById('past_medi_his_blinur1').value;
	}
	if (document.getElementById('past_medi_his_uranatrin').checked) {
		var tractinfection = document.getElementById('past_medi_his_uranatrin').value;
	}
	if (document.getElementById('past_medi_his_uranatrin1').checked) {
		var tractinfection = document.getElementById('past_medi_his_uranatrin1').value;
	}
	if (document.getElementById('past_medi_his_omill').checked) {
		var otherillnessescurrentmedications = document.getElementById('past_medi_his_omill').value;
	}
	if (document.getElementById('past_medi_his_omill1').checked) {
		var otherillnessescurrentmedications = document.getElementById('past_medi_his_omill1').value;
	}
	if (document.getElementById('past_medi_his_iucctm').checked) {
		var currenttaking = document.getElementById('past_medi_his_iucctm').value;
	}
	if (document.getElementById('past_medi_his_iucctm1').checked) {
		var currenttaking = document.getElementById('past_medi_his_iucctm1').value;
	}
	if (document.getElementById('past_medi_his_avpr').checked) {
		var visualproblems = document.getElementById('past_medi_his_avpr').value;
	}
	if (document.getElementById('past_medi_his_avpr1').checked) {
		var visualproblems = document.getElementById('past_medi_his_avpr1').value;
	}
	if (document.getElementById('past_medi_his_doelc').checked) {
		var eyescrosses = document.getElementById('past_medi_his_doelc').value;
	}
	if (document.getElementById('past_medi_his_doelc1').checked) {
		var eyescrosses = document.getElementById('past_medi_his_doelc1').value;
	}
	if (document.getElementById('past_medi_his_docweg').checked) {
		var eyeglasses = document.getElementById('past_medi_his_docweg').value;
	}
	if (document.getElementById('past_medi_his_docweg1').checked) {
		var eyeglasses = document.getElementById('past_medi_his_docweg1').value;
	}
	if (document.getElementById('past_medi_his_hprob').checked) {
		var hearingproblems = document.getElementById('past_medi_his_hprob').value;
	}
	if (document.getElementById('past_medi_his_hprob1').checked) {
		var hearingproblems = document.getElementById('past_medi_his_hprob1').value;
	}
	if (document.getElementById('past_medi_his_einfe').checked) {
		var earinfections = document.getElementById('past_medi_his_einfe').value;
	}
	if (document.getElementById('past_medi_his_einfe1').checked) {
		var earinfections = document.getElementById('past_medi_his_einfe1').value;
	}
	if (document.getElementById('past_medi_his_dchfaosn').checked) {
		var rubbing = document.getElementById('past_medi_his_dchfaosn').value;
	}
	if (document.getElementById('past_medi_his_dchfaosn1').checked) {
		var rubbing = document.getElementById('past_medi_his_dchfaosn1').value;
	}
	if (document.getElementById('past_medi_his_hnobl').checked) {
		var nosebleeds = document.getElementById('past_medi_his_hnobl').value;
	}
	if (document.getElementById('past_medi_his_hnobl1').checked) {
		var nosebleeds = document.getElementById('past_medi_his_hnobl1').value;
	}
	if (document.getElementById('past_medi_his_thinfe').checked) {
		var throatinfections = document.getElementById('past_medi_his_thinfe').value;
	}
	if (document.getElementById('past_medi_his_thinfe1').checked) {
		var throatinfections = document.getElementById('past_medi_his_thinfe1').value;
	}
	if (document.getElementById('past_medi_his_hrtmur').checked) {
		var hurtmumar = document.getElementById('past_medi_his_hrtmur').value;
	}
	if (document.getElementById('past_medi_his_hrtmur1').checked) {
		var hurtmumar = document.getElementById('past_medi_his_hrtmur1').value;
	}
	if (document.getElementById('past_medi_his_hrtdef').checked) {
		var heartdefet = document.getElementById('past_medi_his_hrtdef').value;
	}
	if (document.getElementById('past_medi_his_hrtdef1').checked) {
		var heartdefet = document.getElementById('past_medi_his_hrtdef1').value;
	}
	if (document.getElementById('past_medi_his_acne').checked) {
		var acne = document.getElementById('past_medi_his_acne').value;
	}
	if (document.getElementById('past_medi_his_acne1').checked) {
		var acne = document.getElementById('past_medi_his_acne1').value;
	}
	if (document.getElementById('past_medi_his_sensi').checked) {
		var sensitivity = document.getElementById('past_medi_his_sensi').value;
	}
	if (document.getElementById('past_medi_his_sensi1').checked) {
		var sensitivity = document.getElementById('past_medi_his_sensi1').value;
	}
	if (document.getElementById('past_medi_his_ecad').checked) {
		var eczema = document.getElementById('past_medi_his_ecad').value;
	}
	if (document.getElementById('past_medi_his_ecad1').checked) {
		var eczema = document.getElementById('past_medi_his_ecad1').value;
	}
	if (document.getElementById('past_medi_his_wpofarleg').checked) {
		var weakness = document.getElementById('past_medi_his_wpofarleg').value;
	}
	if (document.getElementById('past_medi_his_wpofarleg1').checked) {
		var weakness = document.getElementById('past_medi_his_wpofarleg1').value;
	}
	if (document.getElementById('past_medi_his_perlimp').checked) {
		var persistent = document.getElementById('past_medi_his_perlimp').value;
	}
	if (document.getElementById('past_medi_his_perlimp1').checked) {
		var persistent = document.getElementById('past_medi_his_perlimp1').value;
	}
	if (document.getElementById('past_medi_his_cosbr').checked) {
		var corrective = document.getElementById('past_medi_his_cosbr').value;
	}
	if (document.getElementById('past_medi_his_cosbr1').checked) {
		var corrective = document.getElementById('past_medi_his_cosbr1').value;
	}
	if (document.getElementById('past_medi_his_conorsei').checked) {
		var seizures = document.getElementById('past_medi_his_conorsei').value;
	}
	if (document.getElementById('past_medi_his_conorsei1').checked) {
		var seizures = document.getElementById('past_medi_his_conorsei1').value;
	}
	if (document.getElementById('past_medi_his_dizzins').checked) {
		var dizziness = document.getElementById('past_medi_his_dizzins').value;
	}
	if (document.getElementById('past_medi_his_dizzins1').checked) {
		var dizziness = document.getElementById('past_medi_his_dizzins1').value;
	}
	if (document.getElementById('past_medi_his_fainting').checked) {
		var fainting = document.getElementById('past_medi_his_fainting').value;
	}
	if (document.getElementById('past_medi_his_fainting1').checked) {
		var fainting = document.getElementById('past_medi_his_fainting1').value;
	}
	if (document.getElementById('past_medi_his_frehead').checked) {
		var frequent = document.getElementById('past_medi_his_frehead').value;
	}
	if (document.getElementById('past_medi_his_frehead1').checked) {
		var frequent = document.getElementById('past_medi_his_frehead1').value;
	}
	if (document.getElementById('past_medi_his_implsive').checked) {
		var impulsive = document.getElementById('past_medi_his_implsive').value;
	}
	if (document.getElementById('past_medi_his_implsive1').checked) {
		var impulsive = document.getElementById('past_medi_his_implsive1').value;
	}
	if (document.getElementById('past_medi_his_linselfc').checked) {
		var selfcontrol = document.getElementById('past_medi_his_linselfc').value;
	}
	if (document.getElementById('past_medi_his_linselfc1').checked) {
		var selfcontrol = document.getElementById('past_medi_his_linselfc1').value;
	}
	if (document.getElementById('past_medi_his_ovact').checked) {
		var overactive = document.getElementById('past_medi_his_ovact').value;
	}
	if (document.getElementById('past_medi_his_ovact1').checked) {
		var overactive = document.getElementById('past_medi_his_ovact1').value;
	}
	if (document.getElementById('past_medi_his_attsch').checked) {
		var attendingschool = document.getElementById('past_medi_his_attsch').value;
	}
	if (document.getElementById('past_medi_his_attsch1').checked) {
		var attendingschool = document.getElementById('past_medi_his_attsch1').value;
	}
	if (document.getElementById('past_medi_his_attspan').checked) {
		var attentionspan = document.getElementById('past_medi_his_attspan').value;
	}
	if (document.getElementById('past_medi_his_attspan1').checked) {
		var attentionspan = document.getElementById('past_medi_his_attspan1').value;
	}
	if (document.getElementById('past_medi_his_learning').checked) {
		var learning = document.getElementById('past_medi_his_learning').value;
	}
	if (document.getElementById('past_medi_his_learning1').checked) {
		var learning = document.getElementById('past_medi_his_learning1').value;
	}
	if (document.getElementById('past_medi_his_mood').checked) {
		var mood = document.getElementById('past_medi_his_mood').value;
	}
	if (document.getElementById('past_medi_his_mood1').checked) {
		var mood = document.getElementById('past_medi_his_mood1').value;
	}
	if (document.getElementById('past_medi_his_parents').checked) {
		var prents = document.getElementById('past_medi_his_parents').value;
	}
	if (document.getElementById('past_medi_his_parents1').checked) {
		var prents = document.getElementById('past_medi_his_parents1').value;
	}
	if (document.getElementById('past_medi_his_peers').checked) {
		var peers = document.getElementById('past_medi_his_peers').value;
	}
	if (document.getElementById('past_medi_his_peers1').checked) {
		var peers = document.getElementById('past_medi_his_peers1').value;
	}
	if (document.getElementById('past_medi_his_siblings').checked) {
		var siblings = document.getElementById('past_medi_his_siblings').value;
	}
	if (document.getElementById('past_medi_his_siblings1').checked) {
		var siblings = document.getElementById('past_medi_his_siblings1').value;
	}
	if (document.getElementById('past_medi_his_sleep').checked) {
		var sleep = document.getElementById('past_medi_his_sleep').value;
	}
	if (document.getElementById('past_medi_his_sleep1').checked) {
		var sleep = document.getElementById('past_medi_his_sleep1').value;
	}
	if (document.getElementById('past_medi_his_conabtpseea').checked) {
		var concernaboutphysicl = document.getElementById('past_medi_his_conabtpseea').value;
	}
	if (document.getElementById('past_medi_his_conabtpseea1').checked) {
		var concernaboutphysicl = document.getElementById('past_medi_his_conabtpseea1').value;
	}
	if (document.getElementById('past_medi_his_hycbp').checked) {
		var yourchild = document.getElementById('past_medi_his_hycbp').value;
	}
	if (document.getElementById('past_medi_his_hycbp1').checked) {
		var yourchild = document.getElementById('past_medi_his_hycbp1').value;
	}

		var otherconcerns = $('#past_medi_his_aoconcerns').val();
		var providername = $('#past_medi_his_proname').val();

		var medication = $('#past_medi_his_medication').val();
		var dose = $('#past_medi_his_dose').val();

		var past_medi_his_update = $('#past_medi_his_update').val();

				myApp.showPreloader();

		if(past_medi_his_update=='')
		{

		var url="http://www.healthrecordspro.com/ws.php?type=insert&format=json&table=pastmedicalhistory&columns=childid,allergy,bloodtransfusions,chickenpox,contusions,convuslsions,fractures,rubella,hospitalizations,measles,meningitis,mumps,operations,reason,otherillnessescurrentmedications,currenttaking,visualproblems,eyescrosses,eyeglasses,hearingproblems,earinfections,rubbing,nosebleeds,throatinfections,hurtmumar,heartdefet,bloodpressure,bronchitis,cough,bloodinstools,abdominalpain,vomiting,jaundice,weightloss,ifyes,urination,wetting,urine,tractinfection,acne,sensitivity,eczema,weakness,persistent,corrective,seizures,dizziness,fainting,frequent,impulsive,selfcontrol,overactive,attendingschool,attentionspan,learning,mood,prents,peers,siblings,sleep,concernaboutphysicl,yourchild,otherconcerns,providername,customerId&values='"+childid+"','"+allergy+"','"+bloodtransfusions+"','"+chickenpox+"','"+contusions+"','"+convuslsions+"','"+fractures+"','"+rubella+"','"+hospitalizations+"','"+measles+"','"+meningitis+"','"+mumps+"','"+operations+"','"+reason+"','"+otherillnessescurrentmedications+"','"+currenttaking+"','"+visualproblems+"','"+eyescrosses+"','"+eyeglasses+"','"+hearingproblems+"','"+earinfections+"','"+rubbing+"','"+nosebleeds+"','"+throatinfections+"','"+hurtmumar+"','"+heartdefet+"','"+bloodpressure+"','"+bronchitis+"','"+cough+"','"+bloodinstools+"','"+abdominalpain+"','"+vomiting+"','"+jaundice+"','"+weightloss+"','"+ifyes+"','"+urination+"','"+wetting+"','"+urine+"','"+tractinfection+"','"+acne+"','"+sensitivity+"','"+eczema+"','"+weakness+"','"+persistent+"','"+corrective+"','"+seizures+"','"+dizziness+"','"+fainting+"','"+frequent+"','"+impulsive+"','"+selfcontrol+"','"+overactive+"','"+attendingschool+"','"+attentionspan+"','"+learning+"','"+mood+"','"+prents+"','"+peers+"','"+siblings+"','"+sleep+"','"+concernaboutphysicl+"','"+yourchild+"','"+otherconcerns+"','"+providername+"','"+storedData1['userId']+"'";

			$.getJSON (url, function (json){
				myApp.hidePreloader();

				for(i=0;i<=familhisCaus;i++){

				var storedData1 = myApp.formGetData('logged_userId');
				var medication = $('#past_medi_his_medication_'+i).val();
				var dose = $('#past_medi_his_dose_'+i).val();

				var columnNam = "pastmedicalId,medication,dose,customerid";

				var columnVal = "'"+json['posts'][0]+"','"+medication+"','"+dose+"','"+storedData1['userId']+"'";

				var url2 = "http://www.healthrecordspro.com/ws.php?type=insert&format=json&table=medicationdosage&columns="+columnNam+"&values="+columnVal+"";

				$.getJSON (url2, function (json) {

					});
				}

				if( json['posts'][0] ){
					// getpastmediHis();
					myApp.alert("Your Details has been Created",'Success');
					mainView.router.loadPage('past_medical_his_listing.html');
				}else{
					myApp.alert("Your Details Not Created",'Failure');
				}
			});

		}else{

			var url4=  "http://www.healthrecordspro.com/ws.php?type=delete&format=json&table=medicationdosage&columns=&condition=pastmedicalId="+past_medi_his_update;

			$.getJSON (url4, function (json) {
				// console.log(json);
			});

			if(isNaN($('#past_medi_his_chainame').val()))
			{
				var pchaildid = $('#past_medi_his_chainame_id').val();
			}
			else
			{
				var pchaildid = $('#past_medi_his_chainame').val();
			}

			var val = "childid = '"+pchaildid+"',allergy = '"+allergy+"',bloodtransfusions = '"+bloodtransfusions+"',chickenpox = '"+chickenpox+"',contusions = '"+contusions+"',convuslsions = '"+convuslsions+"',fractures = '"+fractures+"',rubella = '"+rubella+"',hospitalizations = '"+hospitalizations+"',measles = '"+measles+"',meningitis = '"+meningitis+"',mumps = '"+mumps+"',operations = '"+operations+"',reason = '"+reason+"',otherillnessescurrentmedications = '"+otherillnessescurrentmedications+"',currenttaking = '"+currenttaking+"',visualproblems = '"+visualproblems+"',eyescrosses = '"+eyescrosses+"',eyeglasses = '"+eyeglasses+"',hearingproblems = '"+hearingproblems+"',earinfections = '"+earinfections+"',rubbing = '"+rubbing+"',nosebleeds = '"+nosebleeds+"',throatinfections = '"+throatinfections+"',hurtmumar = '"+hurtmumar+"',heartdefet = '"+heartdefet+"',bloodpressure = '"+bloodpressure+"',bronchitis = '"+bronchitis+"',cough = '"+cough+"',bloodinstools = '"+bloodinstools+"',abdominalpain = '"+abdominalpain+"',vomiting = '"+vomiting+"',jaundice = '"+jaundice+"',weightloss = '"+weightloss+"',ifyes = '"+ifyes+"',urination = '"+urination+"',wetting = '"+wetting+"',urine = '"+urine+"',tractinfection = '"+tractinfection+"',acne = '"+acne+"',sensitivity = '"+sensitivity+"',eczema = '"+eczema+"',weakness = '"+weakness+"',persistent = '"+persistent+"',corrective = '"+corrective+"',seizures = '"+seizures+"',dizziness = '"+dizziness+"',fainting = '"+fainting+"',frequent = '"+frequent+"',impulsive = '"+impulsive+"',selfcontrol = '"+selfcontrol+"',overactive = '"+overactive+"',attendingschool = '"+attendingschool+"',attentionspan = '"+attentionspan+"',learning = '"+learning+"',mood = '"+mood+"',prents = '"+prents+"',peers = '"+peers+"',siblings = '"+siblings+"',sleep = '"+sleep+"',concernaboutphysicl = '"+concernaboutphysicl+"',yourchild = '"+yourchild+"',otherconcerns = '"+otherconcerns+"',providername = '"+providername+"'";

			myApp.showPreloader();

				var url="http://www.healthrecordspro.com/ws.php?type=update&format=json&table=pastmedicalhistory&columns="+val+"&condition=id="+past_medi_his_update;

				$.getJSON (url, function (json) {


				for(i=0;i<=familhisCaus;i++){

				var storedData1 = myApp.formGetData('logged_userId');
				var medication = $('#past_medi_his_medication_'+i).val();
				var dose = $('#past_medi_his_dose_'+i).val();

				var columnNam = "pastmedicalId,medication,dose,customerid";

				var columnVal = "'"+past_medi_his_update+"','"+medication+"','"+dose+"','"+storedData1['userId']+"'";

				var url5 = "http://www.healthrecordspro.com/ws.php?type=insert&format=json&table=medicationdosage&columns="+columnNam+"&values="+columnVal+"";

				$.getJSON (url5, function (json) {

					});


				}
				myApp.hidePreloader();
				if( json['posts'][0] ){
				// getpastmediHis();
					myApp.alert("Your Details has been updated",'Success');
					mainView.router.loadPage('past_medical_his_listing.html');
				}else{
					myApp.alert("Your Details Not Created",'Failure');
				}

				});

		}

}

function sexualHisformSubmit()
{

	var storedData1 = myApp.formGetData('logged_userId');
	if (document.getElementById('sexual_his_cur').checked) {
		var sexualactivity = document.getElementById('sexual_his_cur').value;
	}
	if (document.getElementById('sexual_his_cur1').checked) {
		var sexualactivity = document.getElementById('sexual_his_cur1').value;
	}
		var partnername = $('#sexual_his_partner').val();
	if (document.getElementById('sexual_his_havbeen').checked) {
		var sexualpartner = document.getElementById('sexual_his_havbeen').value;
	}
	if (document.getElementById('sexual_his_havbeen1').checked) {
		var sexualpartner = document.getElementById('sexual_his_havbeen1').value;
	}
	if (document.getElementById('sexual_his_havbeen2').checked) {
		var sexualpartner = document.getElementById('sexual_his_havbeen2').value;
	}
		var controlmethod = $('#sexual_his_bc').val();
		var sexual_his_update = $('#sexual_his_update').val();
		myApp.showPreloader();

		if (sexual_his_update=='') {

		var url="http://www.healthrecordspro.com/ws.php?type=insert&format=json&table=sexualactivity&columns=sexualactivity,partnername,sexualpartner,controlmethod,customerId&values='"+sexualactivity+"','"+partnername+"','"+sexualpartner+"','"+controlmethod+"','"+storedData1['userId']+"'";

			$.getJSON (url, function (json) {
			myApp.hidePreloader();

			if( json['posts'][0] ){
				myApp.alert("Your Details has been Created",'Success');
				mainView.router.loadPage('women_section_main.html');
			}else{
				myApp.alert("Your Details Not Created",'Failure');
			}

		});

		}else{

			var val = "sexualactivity = '"+sexualactivity+"',partnername = '"+partnername+"',sexualpartner = '"+sexualpartner+"',controlmethod = '"+controlmethod+"'";
			myApp.showPreloader();
			var url="http://www.healthrecordspro.com/ws.php?type=update&format=json&table=sexualactivity&columns="+val+"&condition=id="+sexual_his_update;

				$.getJSON (url, function (json) {
				myApp.hidePreloader();

					if( json['posts'][0] ){
						myApp.alert("Your Details has been updated",'Success');
						mainView.router.loadPage('women_section_main.html');
					}else{
						myApp.alert("Your Details Not Created",'Failure');
					}

				});
		}

}

function familypedformSubmit()
{
		var storedData1 = myApp.formGetData('logged_userId');
		var dateCompleted = $('#fam_ped_his_huh').val();
		var childid = $('#fam_ped_his_cn').val();
		var familyped = $('#rowIdFH').val();

		if (document.getElementById('fam_ped_his_tchlw').checked) {
			var childliveswith = document.getElementById('fam_ped_his_tchlw').value;
		}
		if (document.getElementById('fam_ped_his_tchlw1').checked) {
			var childliveswith = document.getElementById('fam_ped_his_tchlw1').value;
		}
		if (document.getElementById('fam_ped_his_tchlw2').checked) {
			var childliveswith = document.getElementById('fam_ped_his_tchlw2').value;
		}
		if (document.getElementById('fam_ped_his_tchlw3').checked) {
			var childliveswith = document.getElementById('fam_ped_his_tchlw3').value;
		}
		if (document.getElementById('fam_ped_his_tchlw4').checked) {
			var childliveswith = document.getElementById('fam_ped_his_tchlw4').value;
		}
		if (document.getElementById('fam_ped_his_atcrptmymc').checked) {
			var culturalorreligious = document.getElementById('fam_ped_his_atcrptmymc').value;
		}
		if (document.getElementById('fam_ped_his_atcrptmymc1').checked) {
			var culturalorreligious = document.getElementById('fam_ped_his_atcrptmymc1').value;
		}
			var ifyes = $('#fam_ped_his_pe').val();
		if (document.getElementById('fam_ped_his_ittuah').checked) {
			var tobaccouse = document.getElementById('fam_ped_his_ittuah').value;
		}
		if (document.getElementById('fam_ped_his_ittuah1').checked) {
			var tobaccouse = document.getElementById('fam_ped_his_ittuah1').value;
		}
			var fam_ped_his_update = $('#fam_ped_his_update').val();

		if(fam_ped_his_update==''){

			var url="http://www.healthrecordspro.com/ws.php?type=insert&format=json&table=pediatricsfamilyhistory&columns=dateCompleted,childid,childliveswith,culturalorreligious,ifyes,tobaccouse,customerId&values='"+dateCompleted+"','"+childid+"','"+childliveswith+"','"+culturalorreligious+"','"+ifyes+"','"+tobaccouse+"','"+storedData1['userId']+"'";

			$.getJSON (url, function (json) {
				myApp.hidePreloader();

				for(i=0;i<=familyped;i++){

					var storedData1 = myApp.formGetData('logged_userId');
					var parentname = $('#fam_ped_his_pname_'+i).val();
					var email = $('#fam_ped_his_pemail_'+i).val();
					var address = $('#fam_ped_his_hadres_'+i).val();
					var homephone = $('#fam_ped_his_pephne_'+i).val();
					var workphone = $('#fam_ped_his_pewpnno_'+i).val();
					var cell = $('#fam_ped_his_pecel_'+i).val();

					var columnNam = "childid,parentname,email,address,homephone,workphone,cell,customerId";

					var columnVal = "'"+json['posts'][0]+"','"+parentname+"','"+email+"','"+address+"','"+homephone+"','"+workphone+"','"+cell+"','"+storedData1['userId']+"'";

					var url1 = "http://www.healthrecordspro.com/ws.php?type=insert&format=json&table=parentcontact&columns="+columnNam+"&values="+columnVal+"";

					$.getJSON (url1, function (json) {
						// myApp.hidePreloader();
					});

				}

				if( json['posts'][0] ){
					// getFamilyPreData();
					myApp.alert("Your Details has been Created",'Success');
					mainView.router.loadPage('family_ped_his_listing.html');
				}else{
					myApp.alert("Your Details Not Created",'Failure');
				}

			});

		}else{

			if(isNaN($('#fam_ped_his_cn').val()))
			{
				var familypedhischild = $('#fam_ped_his_cn_id').val();
			}
			else
			{
				var familypedhischild = $('#fam_ped_his_cn').val();
			}

			var url3=  "http://www.healthrecordspro.com/ws.php?type=delete&format=json&table=parentcontact&columns=&condition=childid="+fam_ped_his_update;

			$.getJSON (url3, function (json) {
				// console.log(json);
			});

			var val = "dateCompleted = '"+dateCompleted+"',childid = '"+familypedhischild+"',childliveswith = '"+childliveswith+"',culturalorreligious = '"+culturalorreligious+"',ifyes = '"+ifyes+"',tobaccouse = '"+tobaccouse+"'";

			myApp.showPreloader();

			var url="http://www.healthrecordspro.com/ws.php?type=update&format=json&table=pediatricsfamilyhistory&columns="+val+"&condition=id="+fam_ped_his_update;

			// console.log( url );

				$.getJSON (url, function (json) {

					for(i=0;i<familyped;i++){

						var storedData1 = myApp.formGetData('logged_userId');
						var parentname = $('#fam_ped_his_pname_'+i).val();
						var email = $('#fam_ped_his_pemail_'+i).val();
						var address = $('#fam_ped_his_hadres_'+i).val();
						var homephone = $('#fam_ped_his_pephne_'+i).val();
						var workphone = $('#fam_ped_his_pewpnno_'+i).val();
						var cell = $('#fam_ped_his_pecel_'+i).val();

						var columnNam = "childid,parentname,email,address,homephone,workphone,cell,customerId";

						var columnVal = "'"+fam_ped_his_update+"','"+parentname+"','"+email+"','"+address+"','"+homephone+"','"+workphone+"','"+cell+"','"+storedData1['userId']+"'";

						// myApp.showPreloader();

						var url1 = "http://www.healthrecordspro.com/ws.php?type=insert&format=json&table=parentcontact&columns="+columnNam+"&values="+columnVal+"";

						$.getJSON (url1, function (json) {
							// myApp.hidePreloader();
							// console.log(json);
						});
					}
					// console.log(json);

					if( json['posts'][0] ){
						// getFamilyPreData();
						myApp.hidePreloader();
						myApp.alert("Your Details has been updated",'Success');
						mainView.router.loadPage('family_ped_his_listing.html');

					}else{
						// getFamilyPreData();
						myApp.hidePreloader();
						myApp.alert("Your Details has been updated",'Success');
						mainView.router.loadPage('family_ped_his_listing.html');
					}

				});
		}
}
function ChildformSubmit()
{
	var storedData1 = myApp.formGetData('logged_userId');
	var childname = $('#child_ped_Name').val();
	var childdob = $('#child_ped_date').val();
	var child_ped_update = $('#child_ped_update').val();

	if(child_ped_update==''){
	var url="http://www.healthrecordspro.com/ws.php?type=insert&format=json&table=pediatricschild&columns=childname,childdob,customerId&values='"+childname+"','"+childdob+"','"+storedData1['userId']+"'";

			$.getJSON (url, function (json) {
				myApp.hidePreloader();

				if( json['posts'][0] ){
				getchildData();
				myApp.alert("Your Details has been Created",'Success');
				mainView.router.loadPage('child_ped_his_listing.html');
			}else{
				myApp.alert("Your Details Not Created",'Failure');
			}

			});
		}else{

			var val = "childname = '"+childname+"',childdob = '"+childdob+"'";

			myApp.showPreloader();

			var url1="http://www.healthrecordspro.com/ws.php?type=update&format=json&table=pediatricschild&columns="+val+"&condition=id="+child_ped_update;

				$.getJSON (url1, function (json) {
					myApp.hidePreloader();

					if( json['posts'][0] ){
						getchildData();
						myApp.alert("Your Details has been updated",'Success');
						mainView.router.loadPage('child_ped_his_listing.html');
					}
					else
					{
						myApp.alert("Your Details Not Created",'Failure');
					}

				});
		}
}

function dentalHisformSubmit(){

		var storedData1 = myApp.formGetData('logged_userId');
		var curent_dental_problem = $('#dental_his_howddenprob').val();
		var Date_last_dental_exam = $('#dental_his_daofladeex').val();
		var last_dental_xrays = $('#dental_his_lastdenxrays').val();
		var dentist = $('#dental_his_dentst').val();
		var phone = $('#dental_his_denphne').val();

		if (document.getElementById('dental_his_dugblwyb').checked) {
			var do_brush = document.getElementById('dental_his_dugblwyb').value;
		}
		if (document.getElementById('dental_his_dugblwyb1').checked) {
			var do_brush = document.getElementById('dental_his_dugblwyb1').value;
		}
		if (document.getElementById('dental_his_aytsen').checked) {
			var teeth_sensitive = document.getElementById('dental_his_aytsen').value;
		}
		if (document.getElementById('dental_his_aytsen1').checked) {
			var teeth_sensitive = document.getElementById('dental_his_aytsen1').value;
		}
		if (document.getElementById('dental_his_aygsafyt').checked) {
			var Shrinking_theeth = document.getElementById('dental_his_aygsafyt').value;
		}
		if (document.getElementById('dental_his_aygsafyt1').checked) {
			var Shrinking_theeth = document.getElementById('dental_his_aygsafyt1').value;
		}
		if (document.getElementById('dental_his_dywrdap').checked) {
			var appliances = document.getElementById('dental_his_dywrdap').value;
		}
		if (document.getElementById('dental_his_dywrdap1').checked) {
			var appliances = document.getElementById('dental_his_dywrdap1').value;
		}
		if (document.getElementById('dental_his_hyhas').checked) {
			var dental_treatment = document.getElementById('dental_his_hyhas').value;
		}
		if (document.getElementById('dental_his_hyhas1').checked) {
			var dental_treatment = document.getElementById('dental_his_hyhas1').value;
		}
		if (document.getElementById('dental_his_ayhseawdi').checked) {
			var Dental_injections = document.getElementById('dental_his_ayhseawdi').value;
		}
		if (document.getElementById('dental_his_ayhseawdi1').checked) {
			var Dental_injections = document.getElementById('dental_his_ayhseawdi1').value;
		}
		if (document.getElementById('dental_his_ayjtateod').checked) {
			var jaws_tired = document.getElementById('dental_his_ayjtateod').value;
		}
		if (document.getElementById('dental_his_ayjtateod1').checked) {
			var jaws_tired = document.getElementById('dental_his_ayjtateod1').value;
		}
		if (document.getElementById('dental_his_dygyt').checked) {
			var clinch_teeth = document.getElementById('dental_his_dygyt').value;
		}
		if (document.getElementById('dental_his_dygyt1').checked) {
			var clinch_teeth = document.getElementById('dental_his_dygyt1').value;
		}
		if (document.getElementById('dental_his_dygc').checked) {
			var cold_sores = document.getElementById('dental_his_dygc').value;
		}
		if (document.getElementById('dental_his_dygc1').checked) {
			var	cold_sores = document.getElementById('dental_his_dygc1').value;
		}
		if (document.getElementById('dental_his_adrtyta').checked) {
			var priortodental_treatment = document.getElementById('dental_his_adrtyta').value;
		}
		if (document.getElementById('dental_his_adrtyta1').checked) {
			var priortodental_treatment = document.getElementById('dental_his_adrtyta1').value;
		}

		var ifyes = $('#dental_his_antibdo').val();
		if (document.getElementById('dental_his_ortho').checked) {
			var Orthodontics = document.getElementById('dental_his_ortho').value;
		}
		if (document.getElementById('dental_his_ortho1').checked) {
			var Orthodontics = document.getElementById('dental_his_ortho1').value;
		}
		var Orthodonticsifyes = $('#dental_his_orthoy').val();

		if (document.getElementById('dental_his_tmj').checked){
			var Tmj_therapy = document.getElementById('dental_his_tmj').value;
		}
		if (document.getElementById('dental_his_tmj1').checked) {
			var Tmj_therapy = document.getElementById('dental_his_tmj1').value;
		}

		var Tmj_therapyifyes = $('#dental_his_tmjyes').val();

		if (document.getElementById('dental_his_extra').checked) {
			var Extractions = document.getElementById('dental_his_extra').value;
		}
		if (document.getElementById('dental_his_extra1').checked) {
			var	Extractions = document.getElementById('dental_his_extra1').value;
		}

		var Extractionsifyes = $('#dental_his_extra').val();

		if (document.getElementById('dental_his_periothe').checked) {
			var Periodontal_therapy = document.getElementById('dental_his_periothe').value;
		}
		if (document.getElementById('dental_his_periothe1').checked) {
			var Periodontal_therapy = document.getElementById('dental_his_periothe1').value;
		}

		var Periodontal_therapyifyes = $('#dental_his_periyes').val();

		if (document.getElementById('dental_his_endodonatics').checked) {
			var Endodontics = document.getElementById('dental_his_endodonatics').value;
		}
		if (document.getElementById('dental_his_endodonatics1').checked) {
			var Endodontics = document.getElementById('dental_his_endodonatics1').value;
		}

		var Endodonticsifyes = $('#dental_his_endodoyes').val();

		if (document.getElementById('dental_his_oralsur').checked) {
			var Oral_surgery = document.getElementById('dental_his_oralsur').value;
		}
		if (document.getElementById('dental_his_oralsur1').checked) {
			var Oral_surgery = document.getElementById('dental_his_oralsur1').value;
		}

		var Oral_surgeryifyes = $('#dental_his_oralsuryes').val();

		if (document.getElementById('dental_his_oralcan').checked) {
			var Oral_cancer = document.getElementById('dental_his_oralcan').value;
		}
		if (document.getElementById('dental_his_oralcan1').checked) {
			var Oral_cancer = document.getElementById('dental_his_oralcan1').value;
		}

		var Oral_cancerifyes = $('#dental_his_oralcanyes').val();

		if (document.getElementById('dental_his_denimp').checked) {
			var Dental_implants = document.getElementById('dental_his_denimp').value;
		}
		if (document.getElementById('dental_his_denimp1').checked) {
			var Dental_implants = document.getElementById('dental_his_denimp1').value;
		}

		var Dental_implantsifyes = $('#dental_his_denimpyes').val();
		var dental_his_update = $('#dental_his_update').val();

		if(dental_his_update==''){

				var url="http://www.healthrecordspro.com/ws.php?type=insert&format=json&table=dental_history&columns=curent_dental_problem,	Date_last_dental_exam,last_dental_xrays,dentist,phone,do_brush,teeth_sensitive,Shrinking_theeth,appliances,dental_treatment,Dental_injections,jaws_tired,clinch_teeth,cold_sores,priortodental_treatment,ifyes,Orthodontics,Orthodonticsifyes,Tmj_therapy,Tmj_therapyifyes,Extractions,Extractionsifyes,Periodontal_therapy,Periodontal_therapyifyes,Endodontics,Endodonticsifyes,Oral_surgery,Oral_surgeryifyes,Oral_cancer,Oral_cancerifyes,Dental_implants,Dental_implantsifyes,user_id&values='"+curent_dental_problem+"','"+Date_last_dental_exam+"','"+last_dental_xrays+"','"+dentist+"','"+phone+"','"+do_brush+"','"+teeth_sensitive+"','"+Shrinking_theeth+"','"+appliances+"','"+dental_treatment+"','"+Dental_injections+"','"+jaws_tired+"','"+clinch_teeth+"','"+cold_sores+"','"+priortodental_treatment+"','"+ifyes+"','"+Orthodontics+"','"+Orthodonticsifyes+"','"+Tmj_therapy+"','"+Tmj_therapyifyes+"','"+Extractions+"','"+Extractionsifyes+"','"+Periodontal_therapy+"','"+Periodontal_therapyifyes+"','"+Endodontics+"','"+Endodonticsifyes+"','"+Oral_surgery+"','"+Oral_surgeryifyes+"','"+Oral_cancer+"','"+Oral_cancerifyes+"','"+Dental_implants+"','"+Dental_implantsifyes+"','"+storedData1['userId']+"'";

			// console.log( url );
		$.getJSON (url, function (json) {
			myApp.hidePreloader();
			// console.log(json);
			if( json['posts'][0] ){
				// getdentalhistoryData();
				myApp.alert("Your Details has been Created",'Success');
				mainView.router.loadPage('dental_history_listing.html');
			}else{
				myApp.alert("Your Details Not Created",'Failure');
			}
		});

		}else{

			var val = "curent_dental_problem = '"+curent_dental_problem+"',Date_last_dental_exam = '"+	Date_last_dental_exam+"',last_dental_xrays = '"+	last_dental_xrays+"',dentist = '"+dentist+"',phone = '"+phone+"',do_brush = '"+do_brush+"',teeth_sensitive = '"+teeth_sensitive+"',Shrinking_theeth = '"+Shrinking_theeth+"',appliances = '"+appliances+"',dental_treatment = '"+dental_treatment+"',Dental_injections = '"+Dental_injections+"',jaws_tired = '"+jaws_tired+"',clinch_teeth = '"+clinch_teeth+"',cold_sores = '"+cold_sores+"',priortodental_treatment = '"+priortodental_treatment+"',ifyes = '"+ifyes+"',Orthodontics = '"+Orthodontics+"',Orthodonticsifyes = '"+Orthodonticsifyes+"',Tmj_therapy = '"+Tmj_therapy+"',Tmj_therapyifyes = '"+Tmj_therapyifyes+"',Extractions = '"+Extractions+"',Extractionsifyes = '"+Extractionsifyes+"',Periodontal_therapy = '"+Periodontal_therapy+"',Periodontal_therapyifyes = '"+Periodontal_therapyifyes+"',Endodontics = '"+Endodontics+"',Endodonticsifyes = '"+Endodonticsifyes+"',Oral_surgery = '"+Oral_surgery+"',Oral_surgeryifyes = '"+Oral_surgeryifyes+"',Oral_cancer = '"+Oral_cancer+"',Oral_cancerifyes = '"+Oral_cancerifyes+"',Dental_implants = '"+Dental_implants+"',Dental_implantsifyes = '"+Dental_implantsifyes+"'";

			myApp.showPreloader();

		var url="http://www.healthrecordspro.com/ws.php?type=update&format=json&table=dental_history&columns="+val+"&condition=id="+dental_his_update;

			// console.log( url );

				$.getJSON (url, function (json) {
					myApp.hidePreloader();
					// console.log(json);
					if( json['posts'][0] ){
						// getdentalhistoryData();
						myApp.alert("Your Details has been updated",'Success');
						mainView.router.loadPage('dental_history_listing.html');
					}else{
						myApp.alert("Your Details Not Created",'Failure');
					}
				});
		}
}

function activitydailyformSubmit(){

	var storedData1 = myApp.formGetData('logged_userId');

	if (document.getElementById('activity_daily_hyesim').checked) {
		var military = document.getElementById('activity_daily_hyesim').value;
	}
	if (document.getElementById('activity_daily_hyesim1').checked) {
		var military = document.getElementById('activity_daily_hyesim1').value;
	}
	if (document.getElementById('activity_daily_hyebt').checked) {
		var transfusion = document.getElementById('activity_daily_hyebt').value;
	}
	if (document.getElementById('activity_daily_hyebt1').checked) {
		var transfusion = document.getElementById('activity_daily_hyebt1').value;
	}
	if (document.getElementById('activity_daily_dyhacac').checked) {
		var caffeine = document.getElementById('activity_daily_dyhacac').value;
	}
	if (document.getElementById('activity_daily_dyhacac1').checked) {
		var caffeine = document.getElementById('activity_daily_dyhacac1').value;
	}
	if (document.getElementById('activity_daily_dyhaoe').checked) {
		var occupational = document.getElementById('activity_daily_dyhaoe').value;
	}
	if (document.getElementById('activity_daily_dyhaoe1').checked) {
		var occupational = document.getElementById('activity_daily_dyhaoe1').value;
	}
	if (document.getElementById('activity_daily_dypiaehh').checked) {
		var hazardoushobbies = document.getElementById('activity_daily_dypiaehh').value;
	}
	if (document.getElementById('activity_daily_dypiaehh1').checked) {
		var hazardoushobbies = document.getElementById('activity_daily_dypiaehh1').value;
	}
	if (document.getElementById('activity_daily_dyhasc').checked) {
		var sleepconcerns = document.getElementById('activity_daily_dyhasc').value;
	}
	if (document.getElementById('activity_daily_dyhasc1').checked) {
		var sleepconcerns = document.getElementById('activity_daily_dyhasc1').value;
	}
	if (document.getElementById('activity_daily_ayceaus').checked) {
		var unusualstressors = document.getElementById('activity_daily_ayceaus').value;
	}
	if (document.getElementById('activity_daily_ayceaus1').checked) {
		var unusualstressors = document.getElementById('activity_daily_ayceaus1').value;
	}
	if (document.getElementById('activity_daily_dyhawc').checked) {
		var weight = document.getElementById('activity_daily_dyhawc').value;
	}
	if (document.getElementById('activity_daily_dyhawc1').checked) {
		var weight = document.getElementById('activity_daily_dyhawc1').value;
	}
	if (document.getElementById('activity_daily_dyesdsa').checked) {
		var vegetarian = document.getElementById('activity_daily_dyesdsa').value;
	}
	if (document.getElementById('activity_daily_dyesdsa1').checked) {
		var vegetarian = document.getElementById('activity_daily_dyesdsa1').value;
	}
	if (document.getElementById('activity_daily_dyhapbis').checked) {
		var injuries = document.getElementById('activity_daily_dyhapbis').value;
	}
	if (document.getElementById('activity_daily_dyhapbis1').checked) {
		var injuries = document.getElementById('activity_daily_dyhapbis1').value;
	}
	if (document.getElementById('activity_daily_dye').checked) {
		var exercise = document.getElementById('activity_daily_dye').value;
	}
	if (document.getElementById('activity_daily_dye1').checked) {
		var exercise = document.getElementById('activity_daily_dye1').value;
	}
	var doexercise = $('#activity_daily_wtdoyfe').val();

	if (document.getElementById('activity_daily_dywhrb').checked) {
		var bicycle = document.getElementById('activity_daily_dywhrb').value;
	}
	if (document.getElementById('activity_daily_dywhrb1').checked) {
		var bicycle = document.getElementById('activity_daily_dywhrb1').value;
	}
	if (document.getElementById('activity_daily_dywsc').checked) {
		var seatbelt = document.getElementById('activity_daily_dywsc').value;
	}
	if (document.getElementById('activity_daily_dywsc1').checked) {
		var seatbelt = document.getElementById('activity_daily_dywsc1').value;
	}
	if (document.getElementById('activity_daily_dydsb').checked) {
		var selfbreast = document.getElementById('activity_daily_dydsb').value;
	}
	if (document.getElementById('activity_daily_dydsb1').checked) {
		var selfbreast = document.getElementById('activity_daily_dydsb1').value;
	}

	var activity_daily_update = $('#activity_daily_update').val();

	if(activity_daily_update==''){

		var url="http://www.healthrecordspro.com/ws.php?type=insert&format=json&table=activitiesofdailyLiving&columns=military,transfusion,caffeine,occupational,hazardoushobbies,sleepconcerns,unusualstressors,weight,vegetarian,injuries,exercise,doexercise,bicycle,seatbelt,selfbreast,CustomerId&values='"+military+"','"+transfusion+"','"+caffeine+"','"+occupational+"','"+hazardoushobbies+"','"+sleepconcerns+"','"+unusualstressors+"','"+weight+"','"+vegetarian+"','"+injuries+"','"+exercise+"','"+doexercise+"','"+bicycle+"','"+seatbelt+"','"+selfbreast+"','"+storedData1['userId']+"'";

			// console.log( url );
		$.getJSON (url, function (json) {
			myApp.hidePreloader();
			// console.log(json);

			if( json['posts'][0] ){
				//getsocialhistoryData();
				myApp.alert("Your Details has been Created",'Success');
				mainView.router.loadPage('women_section_main.html');
			}else{
				myApp.alert("Your Details Not Created",'Failure');
			}
		});

		}else{

			var val = "military = '"+military+"',transfusion = '"+transfusion+"',caffeine = '"+caffeine+"',occupational = '"+occupational+"',hazardoushobbies = '"+hazardoushobbies+"',sleepconcerns = '"+sleepconcerns+"',unusualstressors = '"+unusualstressors+"',weight = '"+weight+"',vegetarian = '"+vegetarian+"',injuries = '"+injuries+"',exercise = '"+exercise+"',doexercise = '"+doexercise+"',bicycle = '"+bicycle+"',seatbelt = '"+seatbelt+"',selfbreast = '"+selfbreast+"'";

			myApp.showPreloader();

		var url="http://www.healthrecordspro.com/ws.php?type=update&format=json&table=activitiesofdailyLiving&columns="+val+"&condition=id="+activity_daily_update;

			// console.log( url );
				$.getJSON (url, function (json) {
				myApp.hidePreloader();
					// console.log(json);
				if( json['posts'][0] ){
					//getsocialhistoryData();
					myApp.alert("Your Details has been updated",'Success');
					mainView.router.loadPage('women_section_main.html');
				}else{
					myApp.alert("Your Details Not Created",'Failure');
				}

				});
		}
}
function socialsftydocformSubmit(){

	var storedData1 = myApp.formGetData('logged_userId');
	var livewith = $('#social_safety_wdulw').val();

	if (document.getElementById('social_safety_duhacyh').checked) {
		var cats = document.getElementById('social_safety_duhacyh').value;
	}
	if (document.getElementById('social_safety_duhacyh1').checked) {
		var cats = document.getElementById('social_safety_duhacyh1').value;
	}

	var lifterbox = $('#social_safety_wctlb').val();

	if (document.getElementById('social_safety_dyhwsal').checked) {
		var smokealarms = document.getElementById('social_safety_dyhwsal').value;
	}
	if (document.getElementById('social_safety_dyhwsal1').checked) {
		var smokealarms = document.getElementById('social_safety_dyhwsal1').value;
	}
	if (document.getElementById('social_safety_atagih').checked) {
		var gunsinhome = document.getElementById('social_safety_atagih').value;
	}
	if (document.getElementById('social_safety_atagih1').checked) {
		var gunsinhome = document.getElementById('social_safety_atagih1').value;
	}

	var lockedup = $('#social_safety_atlups').val();
	var religiousPref = $('#social_safety_dyharp').val();
	var ethnicity = $('#social_safety_wiyre').val();
	var language = $('#social_safety_pl').val();
	var history = $('#social_safety_htbhv').val();
	var yearsofeducation = $('#social_safety_hmyoeyh').val();
	var typeofDegree = $('#social_safety_tod').val();
	var occupation = $('#social_safety_wiyo').val();
	var partneroccupation = $('#social_safety_poc').val();
	var social_safety_update = $('#social_safety_update').val();

	if(social_safety_update==''){

		var url="http://www.healthrecordspro.com/ws.php?type=insert&format=json&table=socialsafety&columns=livewith,cats,lifterbox,smokealarms,gunsinhome,lockedup,religiousPref,ethnicity,language,history,yearsofeducation,typeofDegree,occupation,partneroccupation,customerId&values='"+livewith+"','"+cats+"','"+lifterbox+"','"+smokealarms+"','"+gunsinhome+"','"+lockedup+"','"+religiousPref+"','"+ethnicity+"','"+language+"','"+history+"','"+yearsofeducation+"','"+typeofDegree+"','"+occupation+"','"+partneroccupation+"','"+storedData1['userId']+"'";

	// console.log( url );

			$.getJSON (url, function (json) {
				myApp.hidePreloader();
			// console.log(json);
				if( json['posts'][0] ){
					//getsocialhistoryData();
					myApp.alert("Your Details has been Created",'Success');
					mainView.router.loadPage('women_section_main.html');
				}else{
					myApp.alert("Your Details Not Created",'Failure');
				}

			});

	}else{

			var val = "livewith = '"+livewith+"',cats = '"+cats+"',lifterbox = '"+lifterbox+"',smokealarms = '"+smokealarms+"',gunsinhome = '"+gunsinhome+"',lockedup = '"+lockedup+"',religiousPref = '"+religiousPref+"',ethnicity = '"+ethnicity+"',language = '"+language+"',history = '"+history+"',yearsofeducation = '"+yearsofeducation+"',typeofDegree = '"+typeofDegree+"',occupation = '"+occupation+"',partneroccupation = '"+partneroccupation+"'";

			myApp.showPreloader();

			var url="http://www.healthrecordspro.com/ws.php?type=update&format=json&table=socialsafety&columns="+val+"&condition=id="+social_safety_update;
			// console.log( url );
			$.getJSON (url, function (json) {
				myApp.hidePreloader();
				// console.log(json);
				if( json['posts'][0] ){
					//getsocialhistoryData();
					myApp.alert("Your Details has been updated",'Success');
					mainView.router.loadPage('women_section_main.html');
				}else{
					myApp.alert("Your Details Not Created",'Failure');
				}
			});
		}

	}

function biochemicalDataSubmit()
{

	var storedData1 = myApp.formGetData('logged_userId');
	var height = $('#bio_che_height').val();
	var weight = $('#bio_che_Weight_p').val();
	var bmi = $('#bio_che_BMI').val();
	var wc = $('#bio_che_wc').val();
	var bp_s = $('#bio_che_bp').val();
	var pulse = $('#bio_che_Pulse').val();
	var rmr = $('#bio_che_rmr').val();
	var bp_d = $('#bio_che_bon').val();
	var calorimetryprodictiveequ = $('#bio_che_cpe').val();
	var tee = $('#bio_che_TEE').val();
	var bio_update = $('#bio_update').val();

	if(bio_update==''){

		var url2=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=user_profile&columns=metrics&condition=user_id="+storedData1['userId'];
		$.getJSON (url2, function (json) {

			if(json['posts']['0']['metrics'] == 0)
			{
				// $("#showU").css('display','block');
				// $("#showEUROP").css('display','none');
				var height_feet = $('#bio_che_height').val();
				var height_inches = $('#bio_che_height_i').val();
				var height = height_feet + '.' + height_inches;
				var weight = $('#bio_che_Weight_p').val();

				var columnNames = "height,weight,bmi,wc,bp_s,pulse,rmr,bp_d,calorimetryprodictiveequ,tee,customerid";

				var columnValues = "'"+height+"','"+weight+"','"+bmi+"','"+wc+"','"+bp_s+"','"+pulse+"','"+rmr+"','"+bp_d+"','"+calorimetryprodictiveequ+"','"+tee+"','"+storedData1['userId']+"'";

			}else if(json['posts']['0']['metrics'] == 1)
			{
				var height = $('#bio_che_height_cm').val();
				var weight = $('#bio_che_Weight_kg').val();

			var columnNames = "height,weight,bmi,wc,bp_s,pulse,rmr,bp_d,calorimetryprodictiveequ,tee,customerid";

			var columnValues = "'"+height+"','"+weight+"','"+bmi+"','"+wc+"','"+bp_s+"','"+pulse+"','"+rmr+"','"+bp_d+"','"+calorimetryprodictiveequ+"','"+tee+"','"+storedData1['userId']+"'";
			}
			var url="http://www.healthrecordspro.com/ws.php?type=insert&format=json&table=biochemicalandrisk&columns="+columnNames+"&values="+columnValues+"";


		$.getJSON (url, function (json) {
			myApp.hidePreloader();
			// console.log(json);

			if( json['posts'][0] ){
				// getbioData();
				myApp.alert("Your Details has been Created",'Success');
				mainView.router.loadPage('bio_chemical_listing.html');
			}else{
				myApp.alert("Your Details Not Created",'Failure');
			}

		});
		});

		}else{

		var url1=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=user_profile&columns=metrics&condition=user_id="+storedData1['userId'];

			$.getJSON (url1, function (json) {
			if(json['posts']['0']['metrics'] == 0)
			{
				// $("#showU").css('display','block');
				// $("#showEUROP").css('display','none');
				var height_feet = $('#bio_che_height').val();
				var height_inches = $('#bio_che_height_i').val();
				var height = height_feet + '.' + height_inches;
				var weight = $('#bio_che_Weight_p').val();

			var val = "height = '"+height+"',weight = '"+weight+"',bmi = '"+bmi+"',wc = '"+wc+"',bp_s = '"+bp_s+"',pulse = '"+pulse+"',rmr = '"+rmr+"',bp_d = '"+bp_d+"',calorimetryprodictiveequ = '"+calorimetryprodictiveequ+"',tee = '"+tee+"'";

		}else if (json['posts']['0']['metrics'] == 1) {
			var height =$('#bio_che_height_cm').val();
			var weight =$('#bio_che_Weight_kg').val();

			var val = "height = '"+height+"',weight = '"+weight+"',bmi = '"+bmi+"',wc = '"+wc+"',bp_s = '"+bp_s+"',pulse = '"+pulse+"',rmr = '"+rmr+"',bp_d = '"+bp_d+"',calorimetryprodictiveequ = '"+calorimetryprodictiveequ+"',tee = '"+tee+"'";

		}
			myApp.showPreloader();

			var url="http://www.healthrecordspro.com/ws.php?type=update&format=json&table=biochemicalandrisk&columns="+val+"&condition=id="+bio_update;

			// console.log( url );

				$.getJSON (url, function (json) {
					myApp.hidePreloader();
					// console.log(json);
					if( json['posts'][0] ){
						// getbioData();
						myApp.alert("Your Details has been updated",'Success');
						mainView.router.loadPage('bio_chemical_listing.html');

					}else{
						myApp.alert("Your Details Not Created",'Failure');
					}
				});

			});

		}

}

function medicaldirectivesSubmit()
{
		var storedData1 = myApp.formGetData('logged_userId');
		var proxy = $('#medical_legal_Proxy').val();
		var attorney_power = $('#medical_legal_atto_power').val();
		var durable_attorney_power = $('#medical_legal_durable_apower').val();
		var living_will = $('#medical_legal_livingwill').val();
		var legal_authority_name = $('#medical_legal_authority').val();
		var address = $('#medical_legal_Address').val();
		var city = $('#medical_legal_city').val();
		var state = $('#medical_legal_state').val();
		var zip_code = $('#medical_legal_zip').val();
		var country = $('#medical_legal_country').val();
		var home_phone_number = $('#medical_legal_home_phno').val();
		var mobile_phone_number = $('#medical_legal_mobile_phno').val();
		var email = $('#medical_legal_email').val();
		var remarks = $('#medical_legal_remarks').val();
		var update_medicaldirec_id = $('#update_medicaldirec_id').val();

		if(update_medicaldirec_id==''){

		var url="http://www.healthrecordspro.com/ws.php?type=insert&format=json&table=medical_legal_directors&columns=proxy,attorney_power,durable_attorney_power,living_will,legal_authority_name,address,city,state,zip_code,country,home_phone_number,mobile_phone_number,email,remarks,user_id,active&values='"+proxy+"','"+attorney_power+"','"+durable_attorney_power+"','"+living_will+"','"+legal_authority_name+"','"+address+"','"+city+"','"+state+"','"+zip_code+"','"+country+"','"+home_phone_number+"','"+mobile_phone_number+"','"+email+"','"+remarks+"','"+storedData1['userId']+"','1'";

			$.getJSON (url, function (json){
				myApp.hidePreloader();

				if( json['posts'][0] ){
					// getMedicalDirectorsData();
					myApp.alert("Your Details has been Created",'Success');
					mainView.router.loadPage('medicalandlega_directives_listing.html');
				}else{
					myApp.alert("Your Details Not Created",'Failure');
			}

		});

		}else{
				if(isNaN($('#medical_legal_country').val()))
				{
					var mecountryid = $('#medical_legal_country_id').val();
				}
				else
				{
					var mecountryid = $('#medical_legal_country').val();
				}

				var val = "proxy = '"+proxy+"',attorney_power = '"+attorney_power+"',durable_attorney_power = '"+durable_attorney_power+"',living_will = '"+living_will+"',legal_authority_name = '"+legal_authority_name+"',address = '"+address+"',city = '"+city+"',state = '"+state+"',zip_code = '"+zip_code+"',country='"+mecountryid+"',home_phone_number='"+home_phone_number+"',mobile_phone_number='"+mobile_phone_number+"',email='"+email+"',remarks='"+remarks+"'";

					myApp.showPreloader();

				var url="http://www.healthrecordspro.com/ws.php?type=update&format=json&table=medical_legal_directors&columns="+val+"&condition=director_id="+update_medicaldirec_id;

					$.getJSON (url, function (json) {
						myApp.hidePreloader();

						if( json['posts'][0] ){
							// getMedicalDirectorsData();
							myApp.alert("Your Details has been updated",'Success');
							mainView.router.loadPage('medicalandlega_directives_listing.html');
						}else{
							myApp.alert("Your Details Not Created",'Failure');
					}

				});

		}
 }

function hospitalizationdataSubmit()
{
	var storedData1 = myApp.formGetData('logged_userId');
	var admission_date = $('#hospitalization_ad_date').val();
	var discharge_date = $('#hospitalization_dis_date').val();
	var reason = $('#hospitalization_reason').val();
	var hospital_name = $('#hospitalization_hospitalName').val();
	var Case = $('#hospitalization_case').val();
	var address = $('#hospitalization_addr').val();
	var update_hospitalization_id = $('#update_hospitalization_id').val();
	myApp.showPreloader();

	if(update_hospitalization_id==''){

		var url="http://www.healthrecordspro.com/ws.php?type=insert&format=json&table=hospitalizations&columns=admission_date,discharge_date,reason,hospital_name,`Case`,address,user_id&values='"+admission_date+"','"+discharge_date+"','"+reason+"','"+hospital_name+"','"+Case+"','"+address+"','"+storedData1['userId']+"'";
			
			$.getJSON (url, function (json) {
				myApp.hidePreloader();

				if( json['posts'][0] ){
					gethospitalizationsData();
					myApp.alert("Your Details has been Created",'Success');
					mainView.router.loadPage('hospitalization_listing.html');
				}else{
					myApp.alert("Your Details Not Created",'Failure');
					}
			});

		}else{

			var val = "admission_date = '"+admission_date+"',discharge_date = '"+discharge_date+"',reason = '"+reason+"',hospital_name = '"+hospital_name+"',`Case` = '"+Case+"',address = '"+address+"'";
			myApp.showPreloader();
			var url="http://www.healthrecordspro.com/ws.php?type=update&format=json&table=hospitalizations&columns="+val+"&condition=id="+update_hospitalization_id;

				$.getJSON (url, function (json) {
					myApp.hidePreloader();

					if( json['posts'][0] ){
						gethospitalizationsData();
						myApp.alert("Your Details has been updated",'Success');
						mainView.router.loadPage('hospitalization_listing.html');
					}else{
						myApp.alert("Your Details Not Created",'Failure');
					}

				});
		}
}

function doccounformSubmit()
{
	var storedData1 = myApp.formGetData('logged_userId');
	var physician_name = $('#doc_cn1_np').val();
	var reason = $('#doc_cn1_reason').val();
	var diagnosis = $('#doc_cn1_diag').val();
	var treatment = $('#doc_cn1_trt').val();
	var date = $('#doc_cn1_dt').val();
	var doc_cn1_update = $('#doc_cn1_update').val();

		if(doc_cn1_update==''){
			if (date == '') {
				myApp.alert("Please Enter Date",'Doctors Consultation');
			}else{
			myApp.showPreloader();
			var url="http://www.healthrecordspro.com/ws.php?type=insert&format=json&table=doctors_consultation&columns=physician_name,reason,diagnosis,treatment,date,user_id,active&values='"+physician_name+"','"+reason+"','"+diagnosis+"','"+treatment+"','"+date+"','"+storedData1['userId']+"','1'";

			$.getJSON (url, function (json) {
				myApp.hidePreloader();
				if( json['posts'][0] ){
					// getdocCounsaltationData();
					myApp.alert("Your Details has been Created",'Success');
					mainView.router.loadPage('doctors_counsaltation_listing.html');
				}else{
					myApp.alert("Your Details Not Created",'Failure');
				}

			});
			}

		}else{

			var val = "physician_name = '"+physician_name+"',reason = '"+reason+"',diagnosis = '"+diagnosis+"',treatment = '"+treatment+"',date = '"+date+"'";
				myApp.showPreloader();

			var url="http://www.healthrecordspro.com/ws.php?type=update&format=json&table=doctors_consultation&columns="+val+"&condition=id="+doc_cn1_update;

			// console.log( url );

			$.getJSON (url, function (json) {
				myApp.hidePreloader();

				if( json['posts'][0] ){
					// getdocCounsaltationData();
					myApp.alert("Your Details has been updated",'Success');
					mainView.router.loadPage('doctors_counsaltation_listing.html');
				}else{
					myApp.alert("Your Details Not Created",'Failure');
				}
			});

		}
}

function autocalselfBmi_U()
{
	var height_f = $('#self_height_f').val();
	var height_i = $('#self_height_i').val();
	var weight = $('#self_weight').val();
	var height = (parseInt(height_f)*12);
	var inche = (height + parseInt(height_i));
	var inche_sq = inche * inche;
	var BMI = ((parseInt(weight)) / (parseInt(inche_sq)))*703;
	BMI = BMI.toFixed(2);
	if (!isNaN(BMI)) {
		$('#self_bmi').val(BMI);
	}
}

function autocalselfBmi_E()
{
	var height_cm = $('#self_height_cm').val();
	var weight_kg = $('#self_weight_kg').val();
	var height = height_cm * height_cm;
	//var height = (parseInt(user_height_cm)*12);
	var BMI = ((parseInt(weight_kg)) / (parseInt(height)))*10000;
	BMI = BMI.toFixed(2);
	if (!isNaN(BMI)) {
	$('#self_bmi').val(BMI);
	}
}

function autocallBMI_U()
{
	var height_f = $('#user_height_f').val();
	var height_i = $('#user_height_i').val();
	var weight = $('#user_weight').val();

	var height = (parseInt(height_f)*12);
	var inche = (height + parseInt(height_i));
	var inche_sq = inche * inche;
	var BMI = ((parseInt(weight)) / (parseInt(inche_sq)))*703;
	BMI = BMI.toFixed(2);
	if (!isNaN(BMI)) {
	$('#user_bmi').val(BMI);
	}

}

function autocallBMI_E()
{
	var height_cm = $('#user_height_cm').val();
	var weight_kg = $('#user_weight_kg').val();
	var height = height_cm * height_cm;
	//var height = (parseInt(user_height_cm)*12);
	var BMI = ((parseInt(weight_kg)) / (parseInt(height)))*10000;
	BMI = BMI.toFixed(2);
	if (!isNaN(BMI)) {
	$('#user_bmi').val(BMI);
	}

}
function autocalbioBmi_U()
{
	var height_f = $('#bio_che_height').val();
	var height_i = $('#bio_che_height_i').val();
	var weight = $('#bio_che_Weight_p').val();

	var height = (parseInt(height_f)*12);
	var inche = (height + parseInt(height_i));
	var inche_sq = inche * inche;
	var BMI = ((parseInt(weight)) / (parseInt(inche_sq)))*703;
	BMI = BMI.toFixed(2);
	if (!isNaN(BMI)) {
	$('#bio_che_BMI').val(BMI);
	}
}
function autocalbioBMI_E()
{
	var height_cm = $('#bio_che_height_cm').val();
	var weight_kg = $('#bio_che_Weight_kg').val();
	var height = height_cm * height_cm;
	//var height = (parseInt(user_height_cm)*12);
	var BMI = ((parseInt(weight_kg)) / (parseInt(height)))*10000;
	BMI = BMI.toFixed(2);
	if (!isNaN(BMI)) {
	$('#bio_che_BMI').val(BMI);
	}

}
function selfmonitoringSubmit(){
	var storedData1 = myApp.formGetData('logged_userId');

	var urldeleteselfResults = "http://www.healthrecordspro.com/ws.php?type=delete&format=json&table=mychartsresults&columns=&condition=date="+$('#date_LabResult').val()+" AND customerId="+storedData1['userId'];
			$.getJSON (urldeleteselfResults, function (json2) {
				// console.log(urldeleteLabResults);
			});

	var urlGettingTestsName= "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=mychartstests&columns=*&condition=active=1";
		$.getJSON(urlGettingTestsName,function (json){
			arrayofids = new Array();
				var key, count = 0;
				for(key in json['posts']) {
					if(json['posts'].hasOwnProperty(key)) {
						arrayofids[count] = json['posts'][key]['id'];
						count++;
					}
				}
				if ($('#self_date').val() == '') {
					myApp.alert('Please Enter Date','Labresults');
				}else{
					for(i=0;i<=count;i++){
						if ($('#value_'+arrayofids[i]).val() != undefined && $('#value_'+arrayofids[i]).val() != '') {
							var urlInsertTestsself = "http://www.healthrecordspro.com/ws.php?type=insert&format=json&table=mychartsresults&columns=date,customerId,testId,testName,testValue&values='"+$('#self_date').val()+"','"+storedData1['userId']+"','"+arrayofids[i]+"','"+json['posts'][i]['name']+"','"+$('#value_'+arrayofids[i]).val()+"'";
							$.getJSON (urlInsertTestsself, function (json) {

							});
						}
					}
					if( json['posts'][0] )
					{
						selfDataMetrics();
						myApp.alert("Your Details has been updated",'Success');
						mainView.router.loadPage('self_moni_listing_new.html');
					}else{
						myApp.alert("Your Details Not Created",'Failure');
					}
				}
		});
		for (var j=0; j<$('#extrafieldcount').val(); j++)
			{
				if ($('#otherfield_'+j).val() != undefined && $('#otherfield_'+j).val() != '' && $('#othervalue_'+j).val() != undefined && $('#othervalue_'+j).val() != '') {
					var urlInsertOthersFieldValue = "http://www.healthrecordspro.com/ws.php?type=insert&format=json&table=mychartsresults&columns=date,customerId,testId,testName,testValue&values='"+$('#self_date').val()+"','"+storedData1['userId']+"','"+j+"','"+$('#otherfield_'+j).val()+"','"+$('#othervalue_'+j).val()+"'";
					$.getJSON (urlInsertOthersFieldValue, function (json1) {
						console.log(json1);
					});
				}
			}
}

function manage_albums(catId,selectId)
{
	currentMenuModuleId = 71;
//	if(currentMenuModuleId == 8 ){
//		currentMenuModuleId = 71;
//	}
//	else if(currentMenuModuleId == 34)
//	{
//		currentMenuModuleId = 73;
//	}
//	else if(currentMenuModuleId == 10){
//		currentMenuModuleId = 75;
//	}
//	else if(currentMenuModuleId == 26 ){
//		currentMenuModuleId = 78;
//	}
//	else if(currentMenuModuleId ==25){
//		currentMenuModuleId = 80
//	}
//	else if(currentMenuModuleId ==2){
//		currentMenuModuleId = 82
//	}
//	else if(currentMenuModuleId ==68){
//		currentMenuModuleId = 85
//	}
//	else if(currentMenuModuleId ==9){
//		currentMenuModuleId = 88
//	}
//	else if(currentMenuModuleId ==35){
//		currentMenuModuleId = 91
//	}
//	else if(currentMenuModuleId ==64){
//		currentMenuModuleId = 103
//	}
//	else if(currentMenuModuleId ==107){
//		currentMenuModuleId = 108
//	}
//	else if(currentMenuModuleId ==15){
//		currentMenuModuleId = 110
//	}
//	else if(currentMenuModuleId ==24){
//		currentMenuModuleId = 112
//	}
//	else if(currentMenuModuleId ==33){
//		currentMenuModuleId = 113
//	}
//	else if(currentMenuModuleId ==66){
//		currentMenuModuleId = 116
//	}
	setTimeout(function(){
		var sectionname = selectId;
		var storedData1 = myApp.formGetData('logged_userId');
		myApp.showPreloader();
		var url = "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=scannedalbums&columns=*&condition=customerId="+storedData1['userId']+" AND categoryId="+catId;

		$.getJSON (url, function (json) {
			var key, count = 0;
			$.each( json['posts'], function( key,value ) {
				count++;
			});
			$('#titleID').val(selectId);
			selectId=selectId +" "+count;
			$('#title').val(selectId);

				if(json['posts']==0){
					var data = "No Records Found!!!";
					$('#albumscatiddiv').append('<input type="hidden" name="catid" id="catid" value="'+catId+'" />');
					$('#albumscatiddiv1').append('<input type="hidden" name="catid" id="catid" value="'+catId+'" />');
					$('#display_albums_area').append(data);
				}
				else
				{
					$('#albumscatiddiv').append('<input type="hidden" name="catid" id="catid" value="'+catId+'" />');
					$('#albumscatiddiv1').append('<input type="hidden" name="catid" id="catid" value="'+catId+'" />');

					for (var i=0;i<count;i++){

						var url2 = "http://www.healthrecordspro.com/ws.php?type=select_count&format=json&table=scanneditems&columns=*&condition=userid="+storedData1['userId']+" AND albumid="+json['posts'][i]['id'];
						jQuery.ajaxSetup({async:false});
						$.getJSON (url2, function (json2) {
							var countofimages = json2['posts'][0]['count'];
							var AlbumNameDi = json['posts'][i]['title'];

							$('#display_albums_area').append('<a href = "manage_albums_images.html"><div style="float: left;margin: 5px;text-align: center;width: 90px;"  onclick="view_album_images('+json['posts'][i]['id']+',\''+AlbumNameDi+'\',\''+sectionname+'\','+catId+')"><i class="fa fa-folder-o" style=" color: #0db7c4;font-size: 90px;"></i><p align="center" style="color:#000;font-size:13px">'+json['posts'][i]['title']+'('+countofimages+')</p><div></a>');
						});
					}
				}
				myApp.hidePreloader();
		});

		$('.placeUploadOptionPopUp').html('<a class="open-about" href="#" onclick=" OpenPopUp('+catId+',\''+sectionname+'\');"><img src="img/icon-plus(1).png" style="box-shadow: 0px 5px 8px rgb(204, 204, 204); border-radius: 52%;"></a>')
	},1000);
}
var albumtempId = 0;
var Albumtitle ;
var secName ;
var albumCatId ;
function view_album_images(id,tileAlbum,SectionName,catId)
{
	albumtempId = id;
    Albumtitle = tileAlbum;
   secName = SectionName;
   albumCatId = catId; 
	setTimeout(function(){
		$('#albumid_up12').val(id);
		$('#albumid_up123').val(id);
		$('#albumid').val(id);
		var storedData1 = myApp.formGetData('logged_userId');
		// var url = "http://www.healthrecordspro.com/ws.php?type=select&format=json&table=scanneditems&columns=*&condition=userid="+storedData1['userId']+" AND albumid="+id;

		var url = "http://www.healthrecordspro.com/ws.php?type=scanneditems&format=json&userid="+storedData1['userId']+"&albumid="+id;

		$.getJSON (url, function (json) {
			// console.log(json['posts']);
			$.getJSON (url, function (json){
				var key, count = 0;
				for(key in json['posts']) {
					if(json['posts'].hasOwnProperty(key)) {
						count++;
					}
				}
				$('#AlbmNameDisp').append(tileAlbum);
				if(json['posts']==0){
					var data = "No Records Found!!!";
					$('#self_img').append(data);
				}
				else
				{
					for (var i=0;i<count;i++)
					{
						var x=json['posts'][i]['id']+','+id;
						if (json['posts'][i]['isVideo']=='0') {

							$('#self_img').append('<li><a href="image_description_page.html" onclick="ImageDescription(\''+json['posts'][i]['id']+'\','+id+',\''+tileAlbum+'\',\''+SectionName+'\','+catId+');" style="color:black;margin-right: -13px; margin-top: -23px;"><i class="fa fa-info-circle" ></i></a><img src="http://healthrecordspro.com/newsite/uploads/'+json['posts'][i]['image']+'" onclick="image_popup_display(\''+json['posts'][i]['id']+'\',\''+json['posts'][i]['albumid']+'\')"></li>');
						}else{
							


							$('#self_img').append('<li><a href="image_description_page.html"  style="color:black;margin-right: -13px; margin-top: -23px;"><i class="fa fa-info-circle" onclick="ImageDescription(\''+json['posts'][i]['id']+'\','+id+',\''+tileAlbum+'\',\''+SectionName+'\','+catId+');" ></i></a><img src="img/play-icon.png" onclick="playVideo(\''+json['posts'][i]['image']+'\');" style="height: 84px;"/><p style="font-size:9px;color: black;">'+json['posts'][i]['image']+'</p></li>');
						}
					}
				}
			});
		});
		$('.placeSingleImageup').html('<a class="open-about" href="#" onclick=" OpenPopUpSingleImageUpInAlbm('+id+',\''+tileAlbum+'\');"><img src="img/icon-plus(1).png" style="box-shadow: 0px 5px 8px rgb(204, 204, 204); border-radius: 52%;"></a>')
	},1000);
}

function ImageDescription(id,albumId,FolderName,SectionName,catId){
	setTimeout(function(){
		var storedData1 = myApp.formGetData('logged_userId');
	

		var url = "http://www.healthrecordspro.com/ws.php?type=select&format=json&table=scanneditems&columns=*&condition=userid="+storedData1['userId']+" AND id="+id;

		$.getJSON (url, function (json) {
			var key, count = 0;
			for(key in json['posts']) {
				if(json['posts'].hasOwnProperty(key)) {
					count++;
				}
			}
			var Iid =  json['posts'][0]['image'];
			var lastChar = Iid.substr(Iid.length - 3)
			
			
			var srcImage = "http://healthrecordspro.com/newsite/uploads/"+json['posts'][0]['image'];
			
			if(lastChar != "jpg"){
					$('#self_img_desc').append('<img src="img/play-img.png"  style="width: 100%;height:93%;margin-top: 44px;">');	
			}
			else{
				$('#self_img_desc').append('<img src="http://healthrecordspro.com/newsite/uploads/'+json['posts'][0]['image']+'"  style="width: 100%;height:93%;margin-top: 44px;">');
			}
			
			var srcImage = "http://healthrecordspro.com/newsite/uploads/"+json['posts'][0]['image'];
		
			for (var i = 0; i < count; i++) {
				// $('#sharing_options').append('<li><div class="item-content"><div class="item-media"></div><div class="item-inner" style="text-align: center;"><div class="item-title label" style="width: 20%;" onClick="socialshare()"><i class="fa fa-share-alt-square"></i><p>share</p></div><div class="item-input"><div class="item-title" onclick="MoveTheImageAlbums('+id+','+albumId+','+catId+')"><i class="fa fa-exchange"></i><p>Move</p></div></div><div class="item-input"><a href="'+srcImage+'" target="_blank"><div class="item-title" style="color: black;"><i class="fa fa-download"></i><p>Download</p></div></a></div><div class="item-input"><div class="item-title" onClick="DeleteImage('+id+','+albumId+');"><i class="fa fa-trash"></i><p>Delete</p></div></div></div></div></li>');
				$('#sharing_options').append('<li><div class="item-content"><div class="item-media"></div><div class="item-inner" style="text-align: center;"><div class="item-title label" style="width: 20%;" onclick="window.plugins.socialsharing.share(null, null,\''+srcImage+'\', null)"><i class="fa fa-share-alt-square"></i><p>share</p></div><div class="item-input"><div class="item-title" onclick="MoveTheImageAlbums('+id+','+albumId+','+catId+')"><i class="fa fa-exchange"></i><p>Move</p></div></div><div class="item-input"><div id="loadingmessage4" style="display:none"><img src="img/default.gif" align="middle"/></div><div class="item-title" onClick="downloadImage1(\''+srcImage+'\',\'HRP\',\''+json['posts'][0]['image']+'\')" style="color: black;"><i class="fa fa-download"></i><p>Download</p></div></div><div class="item-input"><div class="item-title" onClick="DeleteImage('+id+','+albumId+');"><i class="fa fa-trash"></i><p>Delete</p></div></div></div></div></li>');

				var x = document.lastModified;
				//document.getElementById("date_lastmodified").innerHTML = x;
				
					$('#folder_name').append(FolderName);
					$('#Section_Name').append(SectionName);
			}
		});
	},500);
}
function downloadImage1(URL,Folder_Name,File_Name){
	// console.log(URL);
	if (URL == null && Folder_Name == null && File_Name == null) {
		return;
	}
	else{
	//checking Internet connection availablity
		var networkState = navigator.connection.type;
		if (networkState == Connection.NONE) {
			return;
		}else {
			downloadImagess(URL, Folder_Name, File_Name); //If available download function call
		}
	}
}

function downloadImagess(URL, Folder_Name, File_Name) {
//step to request a file system 
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, fileSystemSuccess, fileSystemFail);

	function fileSystemSuccess(fileSystem) {
		var download_link = encodeURI(URL);
		ext = download_link.substr(download_link.lastIndexOf('.') + 1); //Get extension of URL

		var directoryEntry = fileSystem.root; // to get root path of directory
		directoryEntry.getDirectory(Folder_Name, { create: true, exclusive: false }, onDirectorySuccess, onDirectoryFail); // creating folder in sdcard
		var rootdir = fileSystem.root;
		var fp = rootdir.fullPath; // Returns Fulpath of local directory

		fp = fp + "/" + Folder_Name + "/" + File_Name + "." + ext; // fullpath and name of the file which we want to give
				// download function call
			filetransfer(download_link, fp);
	}

	function onDirectorySuccess(parent) {
		// Directory created successfuly
	}
	function onDirectoryFail(error) {
		//Error while creating directory
		alert("Unable to create new directory: " + error.code);
	}
	function fileSystemFail(evt) {
		//Unable to access file system
		alert(evt.target.error.code);
	}
}

function filetransfer(download_link, fp) {

	var fileTransfer = new FileTransfer();
	$('#loadingmessage4').show();
	// File download function with URL and local path
	fileTransfer.download(download_link, fp,
			function (entry) {
				// alert("download complete: " + entry.fullPath);
				window.plugins.scanmedia.scanFile(fp, function (msg) {
					myApp.alert("Download Completed");
				},
				function (err) {
					// alert("Fail ScanMedia: " + err);
				})
				$('#loadingmessage4').hide();
					// refreshMedia.refresh(fp);
				},
				function (error) {
					//Download abort errors or download failed errors
					myApp.alert("download error source " + error.source);
					//alert("download error target " + error.target);
					//alert("upload error code" + error.code);
				}
		);
}

function MoveTheImageAlbums(imgId,albId,catId){
	var popupHTML = '<div class="popup">'+
							'<div class="content-block">'+
								'<div class="content-block-title" style="font-size:16px;">Move To Folder <br><hr></div><div id="display_albums_pop1" style=" padding-left: 10px;text-align: center;"></div></div>'+

								'<p><a href="#" class="close-popup" style="color: black;"><i class="fa fa-times-circle" style="font-size: 23px;"></i></a></p>'+
							'</div>'+
						'</div>'
	myApp.popup(popupHTML);
	setTimeout(function(){
		var storedData1 = myApp.formGetData('logged_userId');
		// var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=scannedcategories&limit=250&columns=id,name&condition=1";
		var url= "http://www.healthrecordspro.com/ws.php?type=allmedia&format=json&customerid="+storedData1['userId'];

		var albumsTitles = [];
		$.getJSON (url, function (json) {
			$.each( json['posts'], function( key,value ) {
			albumsTitles.push(value);
			});
			myApp.showPreloader();
			jQuery.ajaxSetup({async:false});
				$.each( albumsTitles, function( key,value ) {
					// var url1 = "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=scannedalbums&columns=*&condition=customerId="+storedData1['userId']+" AND categoryId="+value['id'];
					var url1 = "http://www.healthrecordspro.com/ws.php?type=allmediaalbums&format=json&customerid="+storedData1['userId']+"&catid="+value['id'];
					$.getJSON (url1, function (json) {
						if( json['posts'][0] != 0 ){

							var CategotyName = value['name'];

							var data = "<ul style='list-style: outside none none;'><li id='titles_display1'><div class='item-content'><div class='item-inner'><div class='item-title' style='color: #000000;font-weight: bold;'>"+CategotyName.toUpperCase()+"</div></div></div></li><div class='row' id='allalbums_dis_"+value['id']+"' style='float: left;margin: 5px;text-align: center;width: 96%;'></ul>";

							$('#display_albums_pop1').append(data);
						}
						$.each( json['posts'], function( key1,value1 ) {
							if( value1 != 0 ){
								$('#allalbums_dis_'+value['id']).append('<div class="col-33 tablet-33" ><a href="#" class="item-link" onclick="Move_img_to_album('+imgId+','+value1['id']+','+catId+')" ><i class="fa fa-folder-o" style=" color: #0db7c4;font-size: 50px;"></i><div style="color:#000;font-size:13px">'+value1['title']+'</div></a></div>');
							}
						});

					});
				});

		});
myApp.hidePreloader();
	},500);
}

function Move_img_to_album(imageId,albumId,catId){
	var storedData1 = myApp.formGetData('logged_userId');
	var url="http://www.healthrecordspro.com/ws.php?type=update&format=json&table=scanneditems&columns=albumid="+albumId+"&condition=id="+imageId;
	myApp.showPreloader();
	$.getJSON (url, function (json) {
		if( json['posts'][0] ){
			myApp.alert("Image Moved ",'Success');
			$('.popup').remove();
			$('.popup-overlay').remove();
			$('#self_img').empty();
			myApp.hidePreloader();
			mainView.router.loadPage('manage_albums_images.html');
			view_album_images(albumId,catId);
		}else{
			myApp.alert("Image not moved",'Failure');
		}
	});
}

function DownloadTheImage(id,ImageName){

	// var url = "http://healthrecordspro.com/newsite/uploads/"+ImageName;
	// window.open("http://healthrecordspro.com/newsite/uploads/"+ImageName, "_system");
	document.getElementById('downloadfile123').click();
	// window.open(url, '_self');
}

function DeleteImage(id,albumId){
	var storedData1 = myApp.formGetData('logged_userId');
	myApp.confirm('Are you sure','Delete');

	$( ".modal-button-bold" ).click(function() {
		var storedData1 = myApp.formGetData('logged_userId');
		myApp.showPreloader();
		var url=  "http://www.healthrecordspro.com/ws.php?type=delete&format=json&table=scanneditems&columns=&condition=id="+id;
		$.getJSON (url, function (json) {
			myApp.hidePreloader();
			view_album_images(albumId);
			mainView.router.loadPage('manage_albums_images.html');
		});
	});
}

function playVideo(nameVid){
	window.open("http://healthrecordspro.com/newsite/uploads/"+nameVid, "_system");
	// VideoPlayer.play("http://healthrecordspro.com/newsite/uploads/"+nameVid);
	// window.plugins.videoPlayer.play("http://healthrecordspro.com/newsite/uploads/"+nameVid);
}

function image_popup_display(imgId,albmId)
{
	var storedData1 = myApp.formGetData('logged_userId');
	var value = [];
	var url = "http://www.healthrecordspro.com/ws.php?type=select&format=json&table=scanneditems&columns=*&condition=userid="+storedData1['userId']+" AND albumid="+albmId;

	$.getJSON (url, function (json){
		var key, count = 0;
		for(key in json['posts']) {
			if(json['posts'].hasOwnProperty(key)) {
				string = 'http://healthrecordspro.com/newsite/uploads/'+json['posts'][count]['image'];
				if(string != '')
				{
					if (json['posts'][count]['isVideo'] == '0') {
						if(json['posts'][count]['id'] != imgId){
							value.push(string);
							content = value;
						}else{
							content1 = string;
						}
					}
				}
			}
			count++;
		}
		content.unshift(content1);
		// console.log( content );
		var myPhotoBrowserPopupDark = myApp.photoBrowser({
			photos : content,
			theme: 'dark',
			type: 'popup'
		});
		myPhotoBrowserPopupDark.open();
	});
}

function storeSelfOtherFields(lastinsertedid)
{
	var storedData1 = myApp.formGetData('logged_userId');
	var date = $('#self_date').val();

	// Insert New Row Which is Already Added.
	var url0 = "http://www.healthrecordspro.com/ws.php?type=select&format=json&table=mychart_otherfield&columns=*&condition=CustomerId="+storedData1['userId'];

		$.getJSON (url0, function (json) {

			var key, count = 0;
			for(key in json['posts']) {
				if(json['posts'].hasOwnProperty(key)) {
					count++;
				}
			}
			for (var j = 0; j < count; j++) {

				var otherfield1 = json['posts'][j]['id'];
				var othervalue1 = $('#selfothers_'+otherfield1).val();
				if (othervalue1 !='') {
					var url01="http://www.healthrecordspro.com/ws.php?type=insert&format=json&table=mychart_others&columns=customerId,mychartId,OtherFieldsId,OtherValues,date&values='"+storedData1['userId']+"','"+lastinsertedid+"','"+otherfield1+"','"+othervalue1+"','"+date+"'";
					$.getJSON (url01, function (json) {
					});
				}
			}
		});

	if($('#extrafieldcount').val() != 0)
	{
		for (var i = 0; i < $('#extrafieldcount').val(); i++)
		{
			var otherfield = $('#otherfield_'+i).val();
			var othervalue = $('#othervalue_'+i).val();
			// alert('Fields = '+otherfield+'Value = '+othervalue);
			var url="http://www.healthrecordspro.com/ws.php?type=insert&format=json&table=mychart_otherfield&columns=CustomerId,OtherFields&values='"+storedData1['userId']+"','"+otherfield+"'";
			$.getJSON (url, function (json) {
				// console.log( url );
				var url12="http://www.healthrecordspro.com/ws.php?type=insert&format=json&table=mychart_others&columns=customerId,mychartId,OtherFieldsId,OtherValues,date&values='"+storedData1['userId']+"','"+lastinsertedid+"','"+json['posts'][0]+"','"+othervalue+"','"+date+"'";
				$.getJSON (url12, function (json) {
					// console.log( url12 );
				});
			});
		}
	}
}

function physicalExamsSubmit()
{
    uploadPhysicalExamPic();
    var storedData1 = myApp.formGetData('logged_userId');
    var physicianName = $('#physical_name').val();
    var specialty = $('#physical_speciality').val();
    var date = $('#physical_doe').val();
    var heightu = $('#physical_ht').val();
    var height = $('#physical_height').val();
    var weightu = $('#physical_wt').val();
    var weight = $('#physical_weight').val();
    var tempu = $('#physical_tmp').val();
    var temp = $('#physical_temp').val();
    var bloodPressureR = $('#physical_bpr').val();
    var systolicBPR = $('#physical_sysbpr2').val();
    var bloodPressureL = $('#physical_bpl').val();
    var diastolicBPR= $('#physical_diabpl2').val();
    var heartrate = $('#physical_hrate').val();
    var respiratoryrate = $('#physical_resrate').val();
    var physicalform_id = $('#physicalform_id').val();
    var preffhos1 = $('#count').val();

    if(physicalform_id==''){
    myApp.showPreloader();

    var url="http://www.healthrecordspro.com/ws.php?type=insert&format=json&table=physicalexams&columns=physicianName,specialty,date,heightu,height,weightu,weight,tempu,temp,bloodPressureR,systolicBPR,bloodPressureL,diastolicBPR,heartrate,respiratoryrate,customerId&values='"+physicianName+"','"+specialty+"','"+date+"','"+heightu+"','"+height+"','"+weightu+"','"+weight+"','"+tempu+"','"+temp+"','"+bloodPressureR+"','"+systolicBPR+"','"+bloodPressureL+"','"+diastolicBPR+"','"+heartrate+"','"+respiratoryrate+"','"+storedData1['userId']+"'";

        $.getJSON (url, function (json) {
        myApp.hidePreloader();

        for(i=0;i<=preffhos1;i++){

            if(document.getElementById('physical_n_'+i).checked){
                var N = document.getElementById('physical_n_'+i).value;
            }
            if(document.getElementById('physical_ab_'+i).checked) {
                var N = document.getElementById('physical_ab_'+i).value;
            }
                var bodysystemId = $('#physical_exam_name_'+i).children().attr('id');
                var description = $('#physical_desc_'+i).val();
                var columnNa = "physicalexamId,N,description,customerId,bodysystemId";
                var columnVa = "'"+json['posts']+"','"+N+"','"+description+"','"+storedData1['userId']+"','"+$('#'+bodysystemId).val()+"'";

                var url1 = "http://www.healthrecordspro.com/ws.php?type=insert&format=json&table=physicalexamsbody&columns="+columnNa+"&values="+columnVa+"";
                $.getJSON (url1, function (json){
                    // console.log(json);
                });
            }

            if( json['posts'][0] ){
                // getPhysicalExamData();
                myApp.alert("Your Details has been Created",'Success');
                mainView.router.loadPage('physical_exam.html');
            }else{
                myApp.alert("Your Details Not Created",'Failure');
            }

        });

    }else{
            uploadPhysicalExamPic();

            var val = "physicianName = '"+$('#physical_name').val()+"',specialty = '"+$('#physical_speciality').val()+"',date = '"+$('#physical_doe').val()+"',heightu = '"+$('#physical_ht').val()+"',height = '"+$('#physical_height').val()+"',weightu = '"+$('#physical_wt').val()+"',weight = '"+$('#physical_weight').val()+"',tempu = '"+$('#physical_tmp').val()+"',temp = '"+$('#physical_temp').val()+"',bloodPressureR = '"+$('#physical_bpr').val()+"',systolicBPR = '"+$('#physical_sysbpr2').val()+"',bloodPressureL = '"+$('#physical_bpl').val()+"',diastolicBPR = '"+$('#physical_diabpl2').val()+"',heartrate = '"+$('#physical_hrate').val()+"',respiratoryrate = '"+$('#physical_resrate').val()+"'";

            myApp.showPreloader();

            var url="http://www.healthrecordspro.com/ws.php?type=update&format=json&table=physicalexams&columns="+val+"&condition=id="+physicalform_id;

            $.getJSON (url, function (json) {
            myApp.hidePreloader();

                if( json['posts'][0] ){
                    // getPhysicalExamData();
                    myApp.alert("Your Details has been updated",'Success');
                    mainView.router.loadPage('physical_exam.html');
                }else{
                        // getPhysicalExamData();
                    myApp.alert("Your Details has been updated",'Success');
                    mainView.router.loadPage('physical_exam.html');
                }

            });

            var url3=  "http://www.healthrecordspro.com/ws.php?type=delete&format=json&table=physicalexamsbody&columns=&condition=physicalexamId="+physicalform_id;

                $.getJSON (url3, function (json){
                // console.log(json);
                });

                for(i=0;i<=preffhos1;i++)
                {
                    if (document.getElementById('physical_n_'+i).checked){
                        var N = document.getElementById('physical_n_'+i).value;
                    }
                    if (document.getElementById('physical_ab_'+i).checked) {
                        var N = document.getElementById('physical_ab_'+i).value;
                    }
                        var bsid = $('#physical_exam_name_'+i).children().attr('id');
                        var description = $('#physical_desc_'+i).val();

                var val1 = "'"+N+"','"+$('#'+bsid).val()+"','"+description+"','"+physicalform_id+"','"+storedData1['userId']+"'";
                var val2 = "N,bodysystemId,description,physicalexamId,customerId"
                var url1 = "http://www.healthrecordspro.com/ws.php?type=insert&format=json&table=physicalexamsbody&columns="+val2+"&values="+val1+"";

                $.getJSON (url1, function (json){

                });
            }

            $.getJSON (url, function (json){
                myApp.hidePreloader();

                if( json['posts'][0] ){
                    // getPhysicalExamData();
                    myApp.alert("Your Details has been Created",'Success');
                    mainView.router.loadPage('physical_exam.html');
                }else{
                    // getPhysicalExamData();
                    myApp.alert("Your Details has been Created",'Success');
                    mainView.router.loadPage('physical_exam.html');
                }
            });
        }
}

function insuEdit(insurance_id)
{
    setTimeout(function(){
        $("#insurance_inbtn").css('display','block');
        $("#insurance_upbtn").css('display','none');
    },500);

    var storedData1 = myApp.formGetData('logged_userId');
    myApp.showPreloader();

    var url= "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=health_insurance&columns=*&condition=insurance_id="+insurance_id;

    $.getJSON (url, function (json) {
        myApp.hidePreloader();

        $('#hi_first_name').val( json['posts']['0']['cp_first_name'] );
        $('#hi_last_name').val( json['posts']['0']['cp_last_name'] );
        $('#hi_group_no').val( json['posts']['0']['cp_groupnumber'] );
        $('#hi_member_id').val( json['posts']['0']['cp_member_id'] );
        $('#hi_primary_ins_per').val( json['posts']['0']['cp_primary_insured_person'] );
        $('#hi_social_secno').val( json['posts']['0']['cp_social_security_number'] );
        $('#hi_policy_no').val( json['posts']['0']['policy'] );
        $('#hi_coverage').val( json['posts']['0']['coverage'] );
        $('#hi_company_name').val( json['posts']['0']['company_name'] );
        $('#hi_phone1').val( json['posts']['0']['phone1'] );
        $('#hi_phone2').val( json['posts']['0']['phone2'] );
        $('#hi_copays').val( json['posts']['0']['copays'] );
        $('#hi_city').val( json['posts']['0']['city'] );
        $('#hi_state').val( json['posts']['0']['state'] );
        $('#hi_zip').val( json['posts']['0']['zip_code'] );
        $('#insu_country').val( json['posts']['0']['country'] );
        $('#hi_emp_name').val( json['posts']['0']['cp_employer_name'] );
        $('#hi_phone').val( json['posts']['0']['cp_phone'] );
        $('#hi_email').val( json['posts']['0']['cp_email'] );
        $('#hi_city1').val( json['posts']['0']['cp_city'] );
        $('#hi_state1').val( json['posts']['0']['cp_state'] );
        $('#hi_zip1').val( json['posts']['0']['cp_zip_code'] );
        $('#update_health_insu').val( json['posts']['0']['insurance_id'] );

        if(json['posts']['0']['card1'] != '')
		{
		$('#insu_img_display').html('<img src="http://healthrecordspro.com/newsite/images/insurancecard_b/'+json['posts']['0']['card1']+'"  style="max-height: 150px;max-width: 150px;"  onclick="Insuranceimagepopupdisplay(\''+json['posts']['0']['card1']+'\')">');
		}else{
			$('#insuimagehide').hide();
		}
		if(json['posts']['0']['card2'] != '')
			{
		$('#insu_policy_img_display').html('<img src="http://healthrecordspro.com/newsite/images/insurancecard_f/'+json['posts']['0']['card2']+'" style= "max-width:150px;max-height:150px" onclick="Insurance1imagepopupdisplay(\''+json['posts']['0']['card2']+'\')">');
		}else{
			$('#insuimagehide1').hide();
		}

        });

}
function Insuranceimagepopupdisplay(id)
{
    var popupHTML = '<div class="popup popupImage">'+
                                '<div class="content-block  " >'+
                                    '<div style="width: 100%;">'+
                                        '<div>'+
                                            '<img src="http://healthrecordspro.com/newsite/images/insurancecard_b/'+id+'" height="450" width="600" />'+
                                        '</div>'+
                                    '</div>'+
                                    '<p>Insurance Image</p>'+
                                    '<p><a href="#" style="color:black;float:right;margin-right: -13px; margin-top: -23px;" class="close-popup"><i class="fa fa-times-circle fa-2x" ></i></a></p>'+
                                '</div>'+
                            '</div>';
    myApp.popup(popupHTML);
}
function Insurance1imagepopupdisplay(id)
{
    var popupHTML = '<div class="popup popupImage">'+
                                '<div class="content-block  " >'+
                                    '<div style="width: 100%;">'+
                                        '<div>'+
                                            '<img src="http://healthrecordspro.com/newsite/images/insurancecard_f/'+id+'" height="450" width="600" />'+
                                        '</div>'+
                                    '</div>'+
                                    '<p>Insurance Image</p>'+
                                    '<p><a href="#" style="color:black;float:right;margin-right: -13px; margin-top: -23px;" class="close-popup"><i class="fa fa-times-circle fa-2x" ></i></a></p>'+
                                '</div>'+
                            '</div>';
    myApp.popup(popupHTML);
}

function insuformAdd()
{
    setTimeout(function(){
        $("#insurance_inbtn").css('display','none');
        $("#insurance_upbtn").css('display','block');
        $("#insuimagehide").css('display','none');
        $("#insuimagehide1").css('display','none');
    },500);

}

function healthProviderEdit(hcp_id)
{
    setTimeout(function(){
        $("#healthproviders_inbtn").css('display','block'); 
        $("#healthproviders_upbtn").css('display','none');  
    },500);

    var storedData1 = myApp.formGetData('logged_userId');
    myApp.showPreloader();

    var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=healthcare_providers&columns=*&condition=hcp_id="+hcp_id;

        $.getJSON (url, function (json) {
            myApp.hidePreloader();

        $('#hp_firstName').val( json['posts']['0']['first_name'] );
        $('#hp_lastName').val( json['posts']['0']['last_name'] );

        var url1=  "http://www.healthrecordspro.com/ws.php?type=getidname&format=json&table=doctors_speciality&condition=id="+json['posts']['0']['specialty'];

            $.getJSON (url1, function (json) {
            myApp.hidePreloader();

            $('#hp_speciality').val( json['posts']['0']['name'] );
            $('#hp_speciality_id').val( json['posts']['0']['id'] );
            healthProSpeciality( json['posts']['0']['id'] );

        });

        $('#hp_email').val( json['posts']['0']['email'] );
        $('#hp_street').val( json['posts']['0']['street'] );
        $('#hp_city').val( json['posts']['0']['city'] );
        $('#hp_state').val( json['posts']['0']['state'] );
        $('#hp_zipcode').val( json['posts']['0']['zip_code'] );
        $('#hp_country').val( json['posts']['0']['country'] );
        $('#hp_home_phone').val( json['posts']['0']['home_phone_number'] );
        $('#hp_work_phone').val( json['posts']['0']['work_phone_number'] );
        $('#hp_mob_phone').val( json['posts']['0']['mobile_phone'] );
        $('#hp_hospital_affili').val( json['posts']['0']['hospital_affiliation'] );
        $('#update_healthpro_id').val( json['posts']['0']['hcp_id'] );

    });

}
function HealthProvidersAdd()
{
    setTimeout(function(){
        $("#healthproviders_inbtn").css('display','none');
        $("#healthproviders_upbtn").css('display','block');
        healthProSpeciality( ' ' );
    },500);

}

function familyPedHisEdit(id)
{
    setTimeout(function(){
        $("#familypedhis_inbtn").css('display','block');
        $("#familypedhis_upbtn").css('display','none');
        getfamipedcalendar();

    var storedData1 = myApp.formGetData('logged_userId');
    myApp.showPreloader();

    var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=pediatricsfamilyhistory&columns=*&condition=id="+id;

    $.getJSON (url, function (json) {
        myApp.hidePreloader();

        $('#fam_ped_his_huh').val( json['posts']['0']['dateCompleted'] );
        if(json['posts']['0']['childliveswith'] == 1){
            $('#fam_ped_his_tchlw').attr('checked','checked');
        }
        if(json['posts']['0']['childliveswith'] == 2){
            $('#fam_ped_his_tchlw1').attr('checked','checked');
        }
        if(json['posts']['0']['childliveswith'] == 3){
            $('#fam_ped_his_tchlw2').attr('checked','checked');
        }
        if(json['posts']['0']['childliveswith'] == 4){
            $('#fam_ped_his_tchlw3').attr('checked','checked');
        }
        if(json['posts']['0']['childliveswith'] == 5){
            $('#fam_ped_his_tchlw4').attr('checked','checked');
        }
        if(json['posts']['0']['culturalorreligious'] == 1){
            $('#fam_ped_his_atcrptmymc').attr('checked','checked');
        }
        if(json['posts']['0']['culturalorreligious'] == 2){
            $('#fam_ped_his_atcrptmymc1').attr('checked','checked');
        }
        $('#fam_ped_his_pe').val( json['posts']['0']['ifyes'] );
        if(json['posts']['0']['tobaccouse'] == 1){
            $('#fam_ped_his_ittuah').attr('checked','checked');
        }
        if(json['posts']['0']['tobaccouse'] == 2){
            $('#fam_ped_his_ittuah1').attr('checked','checked');
        }

        $('#fam_ped_his_update').val( json['posts']['0']['id'] );

        var url3=  "http://www.healthrecordspro.com/ws.php?type=getidname&format=json&table=pediatricschild&condition=id="+json['posts']['0']['childid'];

            $.getJSON (url3, function (json) {
                 myApp.hidePreloader();
                    $('#fam_ped_his_cn').val( json['posts']['0']['childname'] );
                    $('#fam_ped_his_cn_id').val( json['posts']['0']['id'] );
                    familypedChild(json['posts']['0']['id']);

                });

        var url1=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=parentcontact&columns=*&condition=childid="+id;

        $.getJSON (url1, function (json) {
            var key, count = 0;
            for(key in json['posts']) {
                if(json['posts'].hasOwnProperty(key)) {
                    count++;

                }

            }
            $("#parentcontact_hide").html('');
            var p = 1;
            for (var i = 0; i <count; i++) {

                var prname="<h4><div style='margin-left: 28px;'>Contact Information for Parent "+p+"</div></h4><li><div class='item-content'><div class='item-media'></div><div class='item-inner'><div class='item-title label'>Name</div><div class='item-input'><input type='text' name='fam_ped_his_pname' id='fam_ped_his_pname_"+i+"'' placeholder='Name' value='"+json['posts'][i]['parentname']+"'></div></div></div></li><li><div class='item-content ' ><div class='item-media'></div><div class='item-inner'><div class='item-title label'>Email</div><div class='item-input'><input type='text' name='fam_ped_his_pemail' id='fam_ped_his_pemail_"+i+"'' placeholder='Email' value='"+json['posts'][i]['email']+"'></div></div></div></li><li><div class='item-content ' ><div class='item-media'></div><div class='item-inner'><div class='item-title label'>Home address</div><div class='item-input'><input type='text' name='fam_ped_his_hadres' id='fam_ped_his_hadres_"+i+"'' placeholder='Home address' value='"+json['posts'][i]['address']+"'></div></div></div></li><li><div class='item-content ' ><div class='item-media'></div><div class='item-inner'><div class='item-title label'>Home Phone</div><div class='item-input'><input type='text' name='fam_ped_his_pephne' id='fam_ped_his_pephne_"+i+"'' placeholder='Home Phone' value='"+json['posts'][i]['homephone']+"'></div></div></div></li><li><div class='item-content ' ><div class='item-media'></div><div class='item-inner'><div class='item-title label'>Work Phone</div><div class='item-input'><input type='text' name='fam_ped_his_pewpnno' id='fam_ped_his_pewpnno_"+i+"'' placeholder='Work Phone' value='"+json['posts'][i]['workphone']+"'></div></div></div></li><li><div class='item-content ' ><div class='item-media'></div><div calendarss='item-inner'><div class='item-title label'>Cell/Other</div><div class='item-input'><input type='text' name='fam_ped_his_pecel' id='fam_ped_his_pecel_"+i+"'' placeholder='Cell/Other' value='"+json['posts'][i]['cell']+"'></div></div></li>";

                $("#parentcontact_hide").append(prname);
                p++;
            }

            $("#parentcontact_hide").append("<li id='responce8'></li><input type='hidden' id='rowIdFH' value="+count+" />");

        });

    });
},500);
}

function emergencyContactEdit(contact_id){

    setTimeout(function(){
        $("#emergency_inbtn").css('display','block');
        $("#emergency_upbtn").css('display','none');

    var storedData1 = myApp.formGetData('logged_userId');
    myApp.showPreloader();

    var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=emergency_contacts&columns=*&condition=contact_id="+contact_id;

        $.getJSON (url, function (json) {
            myApp.hidePreloader();
            // console.log(json['posts'][0]['first_name']);
            $('#emergency_con_firstName').val( json['posts']['0']['first_name'] );
            $('#emergency_con_MidleName').val( json['posts']['0']['middle_name'] );
            $('#emergency_con_lastName').val( json['posts']['0']['last_name'] );
            $('#emergency_con_relaship').val( json['posts']['0']['relationship'] );
            $('#emergency_con_email').val( json['posts']['0']['email'] );
            $('#emergency_con_street').val( json['posts']['0']['street'] );
            $('#emergency_con_city').val( json['posts']['0']['city'] );
            $('#emergency_con_state').val( json['posts']['0']['state'] );
            $('#emergency_con_zip').val( json['posts']['0']['zip_code'] );
            // $('#emergency_country_select').val( json['posts']['0']['country'] );
            document.getElementById("emergency_country_select").selectedIndex = json['posts']['0']['country'];
            $('#emergency_con_home_phno').val( json['posts']['0']['home_phone_number'] );
            $('#emergency_con_work_phno').val( json['posts']['0']['work_phone_number'] );
            $('#emergency_con_mobile_phno').val( json['posts']['0']['mobile_phone'] );
            $('#update_emergency_id').val( json['posts']['0']['contact_id'] );

            if (json['posts']['0']['image'] != '') {
            $('#emergency_img_display').html('<img src="http://healthrecordspro.com/newsite/images/emergencycontact/'+json['posts']['0']['image']+'" width="200" height="200" onclick="Emergencyimagepopupdisplay(\''+json['posts']['0']['image']+'\')">');
            }else{
                    $('#emergencyRemovehide').hide();
            }

        });
},500);

}
function Emergencyimagepopupdisplay(id)
{
    var popupHTML = '<div class="popup popupImage">'+
                                '<div class="content-block  " >'+
                                    '<div style="width: 100%;">'+
                                        '<div>'+
                                            '<img src="http://healthrecordspro.com/newsite/images/emergencycontact/'+id+'" height="450" width="600" />'+
                                        '</div>'+
                                    '</div>'+
                                    '<p>Emergency image</p>'+
                                    '<p><a href="#" style="color:black;float:right;margin-right: -13px; margin-top: -23px;" class="close-popup"><i class="fa fa-times-circle fa-2x" ></i></a></p>'+
                                '</div>'+
                            '</div>';
    myApp.popup(popupHTML);
}
function docConEdit(id)
{
    setTimeout(function(){
        $("#doccounsaltation_inbtn").css('display','block');
        $("#doccounsaltation_upbtn").css('display','none');
        getCalenderDoc();
    },500);
    var storedData1 = myApp.formGetData('logged_userId');
    myApp.showPreloader();

    var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=doctors_consultation&columns=*&condition=id="+id;

    $.getJSON (url, function (json) {
        myApp.hidePreloader();
        $('#doc_cn1_np').val( json['posts']['0']['physician_name'] );
        $('#doc_cn1_reason').val( json['posts']['0']['reason'] );
        $('#doc_cn1_diag').val( json['posts']['0']['diagnosis'] );
        $('#doc_cn1_trt').val( json['posts']['0']['treatment'] );
        $('#doc_cn1_dt').val( json['posts']['0']['date'] );
        $('#doc_cn1_update').val( json['posts']['0']['id'] );

    });

}

function medicallegalDirectorsEdit(director_id)
{
    setTimeout(function(){
        $("#medicaldirec_inbtn").css('display','block');
        $("#medicaldirec_upbtn").css('display','none');
    },500);
    var storedData1 = myApp.formGetData('logged_userId');
    myApp.showPreloader();

    var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=medical_legal_directors&columns=*&condition=director_id="+director_id;

    $.getJSON (url, function (json) {

        $('#medical_legal_Proxy').val( json['posts']['0']['proxy'] );
        $('#medical_legal_atto_power').val( json['posts']['0']['attorney_power'] );
        $('#medical_legal_durable_apower').val( json['posts']['0']['durable_attorney_power'] );
        $('#medical_legal_livingwill').val( json['posts']['0']['living_will'] );
        $('#medical_legal_authority').val( json['posts']['0']['legal_authority_name'] );
        $('#medical_legal_Address').val( json['posts']['0']['address'] );
        $('#medical_legal_city').val( json['posts']['0']['city'] );
        $('#medical_legal_state').val( json['posts']['0']['state'] );
        $('#medical_legal_zip').val( json['posts']['0']['zip_code'] );

        var url1= "http://www.healthrecordspro.com/ws.php?type=getidname&format=json&table=country&condition=id="+json['posts']['0']['country'];

        $.getJSON (url1, function (json) {
        myApp.hidePreloader();

        // $('#medical_legal_country').val( json['posts']['0']['name'] );

        $('#medical_legal_country_id').val( json['posts']['0']['id'] );

    });
        document.getElementById("medical_legal_country").selectedIndex = json['posts']['0']['country'];
        $('#medical_legal_home_phno').val( json['posts']['0']['home_phone_number'] );
        $('#medical_legal_mobile_phno').val( json['posts']['0']['mobile_phone_number'] );
        $('#medical_legal_email').val( json['posts']['0']['email'] );
        $('#medical_legal_remarks').val( json['posts']['0']['remarks'] );
        $('#update_medicaldirec_id').val( json['posts']['0']['director_id'] );

    });

}

function implantsAndMediDevicesEdit(id)
{
    setTimeout(function(){
        $("#implants_inbtn").css('display','block');
        $("#implants_upbtn").css('display','none');
        getimplantsCal();
    },500);
    var storedData1 = myApp.formGetData('logged_userId');
    myApp.showPreloader();

    var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=medicaldevices&columns=*&condition=id="+id;

    $.getJSON (url, function (json) {
        myApp.hidePreloader();

        $('#implants_meddevices_physician').val( json['posts']['0']['physician'] );
        $('#implants_meddevices_hospital').val( json['posts']['0']['hospital'] );
        $('#implants_meddevices_date').val( json['posts']['0']['date'] );
        $('#implants_meddevices_reason').val( json['posts']['0']['reason'] );
        $('#implants_meddevices_type').val( json['posts']['0']['type'] );
        $('#update_implants_id').val( json['posts']['0']['id'] );

    });

}

function dentalhistEdit(id)
{
    setTimeout(function(){
        $("#dentalhis_inbtn").css('display','block');
        $("#dentalhis_upbtn").css('display','none');
    },500);
    var storedData1 = myApp.formGetData('logged_userId');
    myApp.showPreloader();

    var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=dental_history&columns=*&condition=id="+id;

    $.getJSON (url, function (json) {
        myApp.hidePreloader();

            $('#dental_his_howddenprob').val( json['posts']['0']['curent_dental_problem'] );
            $('#dental_his_daofladeex').val( json['posts']['0']['Date_last_dental_exam'] );
            $('#dental_his_lastdenxrays').val( json['posts']['0']['last_dental_xrays'] );
            $('#dental_his_dentst').val( json['posts']['0']['dentist'] );
            $('#dental_his_denphne').val( json['posts']['0']['phone'] );

            if(json['posts']['0']['do_brush'] == 1){
                $('#dental_his_dugblwyb').attr('checked','checked');
            }
            if(json['posts']['0']['do_brush'] == 0){
                $('#dental_his_dugblwyb1').attr('checked','checked');
            }
            if(json['posts']['0']['teeth_sensitive'] == 1){
                $('#dental_his_aytsen').attr('checked','checked');
            }
            if(json['posts']['0']['teeth_sensitive'] == 0){
                $('#dental_his_aytsen1').attr('checked','checked');
            }
            if(json['posts']['0']['Shrinking_theeth'] == 1){
                $('#dental_his_aygsafyt').attr('checked','checked');
            }
            if(json['posts']['0']['Shrinking_theeth'] == 0){
                $('#dental_his_aygsafyt1').attr('checked','checked');
            }
            if(json['posts']['0']['appliances'] == 1){
                $('#dental_his_dywrdap').attr('checked','checked');
            }
            if(json['posts']['0']['appliances'] == 0){
                $('#dental_his_dywrdap1').attr('checked','checked');
            }
            if(json['posts']['0']['dental_treatment'] == 1){
                $('#dental_his_hyhas').attr('checked','checked');
            }
            if(json['posts']['0']['dental_treatment'] == 0){
                $('#dental_his_hyhas1').attr('checked','checked');
            }
            if(json['posts']['0']['Dental_injections'] == 1){
                $('#dental_his_ayhseawdi').attr('checked','checked');
            }
            if(json['posts']['0']['Dental_injections'] == 0){
                $('#dental_his_ayhseawdi1').attr('checked','checked');
            }
            if(json['posts']['0']['jaws_tired'] == 1){
                $('#dental_his_ayjtateod').attr('checked','checked');
            }
            if(json['posts']['0']['jaws_tired'] == 0){
                $('#dental_his_ayjtateod1').attr('checked','checked');
            }
            if(json['posts']['0']['clinch_teeth'] == 1){
                $('#dental_his_dygyt').attr('checked','checked');
            }
            if(json['posts']['0']['clinch_teeth'] == 0){
                $('#dental_his_dygyt1').attr('checked','checked');
            }
            if(json['posts']['0']['cold_sores'] == 1){
                $('#dental_his_dygc').attr('checked','checked');
            }
            if(json['posts']['0']['cold_sores'] == 0){
                $('#dental_his_dygc1').attr('checked','checked');
            }
            if(json['posts']['0']['priortodental_treatment'] == 1){
                $('#dental_his_adrtyta').attr('checked','checked');
            }
            if(json['posts']['0']['priortodental_treatment'] == 0){
                $('#dental_his_adrtyta1').attr('checked','checked');
            }
                $('#dental_his_antibdo').val( json['posts']['0']['ifyes'] );
            if(json['posts']['0']['Orthodontics'] == 1){
                $('#dental_his_ortho').attr('checked','checked');
            }
            if(json['posts']['0']['Orthodontics'] == 0){
                $('#dental_his_ortho1').attr('checked','checked');
            }
                $('#dental_his_orthoy').val( json['posts']['0']['Orthodonticsifyes'] );
            if(json['posts']['0']['Tmj_therapy'] == 1){
                $('#dental_his_tmj').attr('checked','checked');
            }
            if(json['posts']['0']['Tmj_therapy'] == 0){
                $('#dental_his_tmj1').attr('checked','checked');
            }
                $('#dental_his_tmjyes').val( json['posts']['0']['Tmj_therapyifyes'] );
            if(json['posts']['0']['Extractions'] == 1){
                $('#dental_his_extra').attr('checked','checked');
            }
            if(json['posts']['0']['Extractions'] == 0){
                $('#dental_his_extra1').attr('checked','checked');
            }
                $('#dental_his_extra').val( json['posts']['0']['Extractionsifyes'] );
            if(json['posts']['0']['Periodontal_therapy'] == 1){
                $('#dental_his_periothe').attr('checked','checked');
            }
            if(json['posts']['0']['Periodontal_therapy'] == 0){
                $('#dental_his_periothe1').attr('checked','checked');
            }
                $('#dental_his_periyes').val( json['posts']['0']['Periodontal_therapyifyes'] );
            if(json['posts']['0']['Endodontics'] == 1){
                $('#dental_his_endodonatics').attr('checked','checked');
            }
            if(json['posts']['0']['Endodontics'] == 0){
                $('#dental_his_endodonatics1').attr('checked','checked');
            }
                $('#dental_his_endodoyes').val( json['posts']['0']['Endodonticsifyes'] );
            if(json['posts']['0']['Oral_surgery'] == 1){
                $('#dental_his_oralsur').attr('checked','checked');
            }
            if(json['posts']['0']['Oral_surgery'] == 0){
                $('#dental_his_oralsur1').attr('checked','checked');
            }
                $('#dental_his_oralsuryes').val( json['posts']['0']['   Oral_surgeryifyes'] );
            if(json['posts']['0']['Oral_cancer'] == 1){
                $('#dental_his_oralcan').attr('checked','checked');
            }
            if(json['posts']['0']['Oral_cancer'] == 0){
                $('#dental_his_oralcan1').attr('checked','checked');
            }
                $('#dental_his_oralcanyes').val( json['posts']['0']['Oral_cancerifyes'] );
            if(json['posts']['0']['Dental_implants'] == 1){
                $('#dental_his_denimp').attr('checked','checked');
            }
            if(json['posts']['0']['Dental_implants'] == 0){
                $('#dental_his_denimp1').attr('checked','checked');
            }

                $('#dental_his_denimpyes').val( json['posts']['0']['Dental_implantsifyes'] );

                $('#dental_his_update').val( json['posts']['0']['id'] );
    });

}

function obestetricHisDataEdit(id)
{
    setTimeout(function(){
        $("#obestric_inbtn").css('display','block');
        $("#obestric_upbtn").css('display','none');
        ObestricCalendar();
    },500);
    var storedData1 = myApp.formGetData('logged_userId');
    myApp.showPreloader();

    var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=obstetric_history&columns=*&condition=id="+id;

        $.getJSON (url, function (json) {
        myApp.hidePreloader();

            if(json['posts']['0']['never_pregnant']==0)
            {
                $('#obe_his_check').attr('checked','checked');
            }
            $('#obe_his_date').val( json['posts']['0']['dateOfDelivery'] );
            $('#obe_his_now').val( json['posts']['0']['nbrOfWeeks'] );
            $('#obe_his_lbln').val( json['posts']['0']['laborLength'] );
            $('#obe_his_babw').val( json['posts']['0']['badyWeight'] );
            $('#obe_his_sex').val( json['posts']['0']['sex'] );
            if(json['posts']['0']['delveryType'] == 0){
                $('#obe_his_dt').attr('checked','checked');
            }
            if(json['posts']['0']['delveryType'] == 1){
                $('#obe_his_dt1').attr('checked','checked');
            }
            $('#obe_his_epi').val( json['posts']['0']['epidural'] );
            $('#obe_his_name').val( json['posts']['0']['LivingName'] );
            $('#obe_his_cmts').val( json['posts']['0']['comments'] );
            $('#obe_his_update').val( json['posts']['0']['id'] );
    });
}

function childpedEdit(id)
{
    setTimeout(function(){
        $("#child_inbtn").css('display','block');
        $("#child_upbtn").css('display','none');
    },500);
    var storedData1 = myApp.formGetData('logged_userId');
    myApp.showPreloader();

    var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=pediatricschild&columns=*&condition=id="+id;

        $.getJSON (url, function (json) {
        myApp.hidePreloader(); 

            $('#child_ped_Name').val( json['posts']['0']['childname'] );
            $('#child_ped_date').val( json['posts']['0']['childdob'] );
            $('#child_ped_update').val( json['posts']['0']['id'] );
        });
}

function gynecologicHisDataEdit(id)
{
    setTimeout(function(){
        $("#gynacologies_inbtn").css('display','block');
        $("#gynacologies_upbtn").css('display','none');
        getGynaCalender();
    },500);
    var storedData1 = myApp.formGetData('logged_userId');
    myApp.showPreloader();

    var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=womanGynecologic&columns=*&condition=id="+id;

    $.getJSON (url, function (json) {
        myApp.hidePreloader();

        $('#gyne_his_afp').val( json['posts']['0']['ageOfFirstPeriod'] );
        $('#gyne_his_dolps').val( json['posts']['0']['dateOfLastPapSmear'] );
        $('#gyne_his_result').val( json['posts']['0']['result'] );

        if(json['posts']['0']['AbnolmalPapSmear'] == 1){
            $('#gyne_his_have_abpap').attr('checked','checked');
            var dvPassport = document.getElementById("dvPassport");
            var dvPassport1 = document.getElementById("dvPassport1");
            dvPassport.style.display = gyne_his_have_abpap.checked ? "block" : "none";
            dvPassport1.style.display = gyne_his_have_abpap.checked ? "block" : "none";
        }
        $('#gyne_his_wyear').val( json['posts']['0']['ifyes'] );
        $('#gyne_his_wk').val( json['posts']['0']['treatments'] );
        if(json['posts']['0']['secuallyInfections'] == 1){
            $('#gyne_his_have_sex_trinf').attr('checked','checked');
            var dvPassport3 = document.getElementById("dvPassport3");
            dvPassport3.style.display = gyne_his_have_sex_trinf.checked ? "block" : "none";
        }
        $('#gyne_his_wtypes').val( json['posts']['0']['ifyes2'] );
        $('#gyne_his_update').val( json['posts']['0']['id'] );
    });
}

function womensPregDatingEdit(id)
{
    setTimeout(function(){
        $("#womenpregdat_inbtn").css('display','block');
        $("#womenpregdat_upbtn").css('display','none');
        getwomenPregDat();
    },500);
    var storedData1 = myApp.formGetData('logged_userId');
    myApp.showPreloader();

    var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=womanPregnancyDating&columns=*&condition=id="+id;

    $.getJSON (url, function (json) {
        myApp.hidePreloader();

        $('#womens_preg_dating_fdlmp').val( json['posts']['0']['menstrualPeriod'] );
        if(json['posts']['0']['certainApproximate'] == 0){
                $('#womens_preg_dating_cer').attr('checked','checked');
            }
        if(json['posts']['0']['certainApproximate'] == 1){
            $('#womens_preg_dating_app').attr('checked','checked');
        }
                $('#womens_preg_dating_fpstne').val( json['posts']['0']['frequencyPeriodDays'] );
                $('#womens_preg_dating_duration').val( json['posts']['0']['dop'] );

        if(json['posts']['0']['periodRegular'] == 0){
                $('#womens_preg_dating_apr').attr('checked','checked');
            }
        if(json['posts']['0']['periodRegular'] == 1){
            $('#womens_preg_dating_apr1').attr('checked','checked');
        }
        if(json['posts']['0']['birthControl'] == 0){
                $('#womens_preg_dating_wbcp').attr('checked','checked');
            }
        if(json['posts']['0']['birthControl'] == 1){
            $('#womens_preg_dating_wbcp1').attr('checked','checked');
        }
            $('#womens_preg_dating_methode').val( json['posts']['0']['method'] );
        if(json['posts']['0']['pregrancyTest'] == 0){
                $('#womens_preg_dating_hythpt').attr('checked','checked');
            }
        if(json['posts']['0']['pregrancyTest'] == 1){
                $('#womens_preg_dating_hythpt1').attr('checked','checked');
        }
                $('#womens_preg_dating_ptd').val( json['posts']['0']['pregnancyTestDate'] );
                $('#womens_preg_dating_update').val( json['posts']['0']['id'] );

    });
}

function socialHistoryEdit(id)
{
    setTimeout(function(){
        $("#socialhistory_inbtn").css('display','block');
        $("#socialhistory_upbtn").css('display','none');
        getSocialHCalendar();
    },500);
    var storedData1 = myApp.formGetData('logged_userId');
    myApp.showPreloader();

    var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=SocialHistory&columns=*&condition=id="+id;

    $.getJSON (url, function (json) {
        myApp.hidePreloader();

            if(json['posts']['0']['smokeCigarettes'] == 1){
                $('#social_his_smo').attr('checked','checked');
            }
            if(json['posts']['0']['smokeCigarettes'] == 2){
                $('#social_his_smo1').attr('checked','checked');
            }
            if(json['posts']['0']['smokeCigarettes'] == 3){
                $('#social_his_smo2').attr('checked','checked');
            }
            if(json['posts']['0']['pastUse'] == 1){
            $('#social_his_past').attr('checked','checked');
            }
            else
            {
            $('#social_his_past1').attr('checked','checked');
            }

            $('#social_his_qd').val( json['posts']['0']['quitDate'] );
            $('#social_his_nopd').val( json['posts']['0']['numberofPacks'] );
            $('#social_his_nop').val( json['posts']['0']['numberofYears'] );

            if(json['posts']['0']['otherUse'] == 1){
                $('#social_his_otu').attr('checked','checked');
            }
            if(json['posts']['0']['otherUse'] == 2){
                $('#social_his_otu1').attr('checked','checked');
            }
            if(json['posts']['0']['otherUse'] == 3){
                $('#social_his_otu2').attr('checked','checked');
            }
            if(json['posts']['0']['otherUse'] == 4){
                $('#social_his_otu3').attr('checked','checked');
            }
            if(json['posts']['0']['otherUse'] == 5){
                $('#social_his_otu4').attr('checked','checked');
            }
            if(json['posts']['0']['drinkAlcohol'] == 1){
            $('#social_his_dudal').attr('checked','checked');
            }
            else
            {
            $('#social_his_dudal1').attr('checked','checked');
            }

            $('#social_his_nodpw').val( json['posts']['0']['NbrofDrinksPerWeek'] );
            $('#social_his_qfp').val( json['posts']['0']['quitforpregancy'] );
            $('#social_his_update').val( json['posts']['0']['id'] );
    });
}

function pathalogyEdit(id)
{
    var storedData1 = myApp.formGetData('logged_userId');
    myApp.showPreloader();

    var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=pathology&columns=*&condition=id="+id;

    $.getJSON (url, function (json) {
        myApp.hidePreloader();
        $('#pathalogy_date').val( json['posts']['0']['date']);
        $('#pathalogy_pro').val( json['posts']['0']['operation']);
        $('#pathalogy_phy').val( json['posts']['0']['physician']);
        $('#pathalogy_hsptl').val( json['posts']['0']['hospital']);
        $('#pathalogy_findings').val( json['posts']['0']['report']);
        $('#pathalogy_update').val( json['posts']['0']['id']);

    });

}

function biochemicalDataEdit(id)
{
    setTimeout(function(){
        $("#biochemical_inbtn").css('display','block');
        $("#biochemical_upbtn").css('display','none');
    },500);
    var storedData1 = myApp.formGetData('logged_userId');
    myApp.showPreloader();

    var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=biochemicalandrisk&columns=*&condition=id="+id;
    var url1=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=user_profile&columns=*&condition=user_id="+storedData1['userId'];

    $.getJSON (url, function (json) {
        myApp.hidePreloader();

        $.getJSON (url1, function (json1) {
            if(json1['posts']['0']['metrics'] == 0)
            {
                $("#showUr").css('display','block');
                $("#showEUROP12").css('display','none');
                $('#bio_che_height').val( json['posts']['0']['height'] );
                $('#bio_che_Weight_p').val( json['posts']['0']['weight'] );
                // $('#bio_che_height_i').val( json['posts']['0']['inches'] );
            }
            else if(json1['posts']['0']['metrics'] == 1)
            {
                $("#showUr").css('display','none');
                $("#showEUROP12").css('display','block');
                $('#bio_che_height_cm').val( json['posts']['0']['height'] );
                $('#bio_che_Weight_kg').val( json['posts']['0']['weight'] );
            }
        });
        $('#bio_che_BMI').val( json['posts']['0']['bmi']);
        $('#bio_che_wc').val( json['posts']['0']['wc']);
        $('#bio_che_bp').val( json['posts']['0']['bp_s']);
        $('#bio_che_Pulse').val( json['posts']['0']['pulse']);
        $('#bio_che_rmr').val( json['posts']['0']['rmr']);
        $('#bio_che_bon').val( json['posts']['0']['bp_d']);
        $('#bio_che_cpe').val( json['posts']['0']['calorimetryprodictiveequ']);
        $('#bio_che_TEE').val( json['posts']['0']['tee']);
        $('#bio_update').val( json['posts']['0']['id'] );
    });
}

function hospitalizationEdit(id)
{
    var storedData1 = myApp.formGetData('logged_userId');
    myApp.showPreloader();
    var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=hospitalizations&columns=*&condition=id="+id;

    $.getJSON (url, function (json) {
        myApp.hidePreloader();

        $('#hospitalization_ad_date').val( json['posts']['0']['admission_date'] );
        $('#hospitalization_dis_date').val( json['posts']['0']['discharge_date'] );
        $('#hospitalization_reason').val( json['posts']['0']['reason'] );
        $('#hospitalization_hospitalName').val( json['posts']['0']['hospital_name'] );
        $('#hospitalization_case').val( json['posts']['0']['Case'] );
        $('#hospitalization_addr').val( json['posts']['0']['address'] );
        $('#update_hospitalization_id').val( json['posts']['0']['id'] );
    });
}

function medicationEdit(id)
{
    setTimeout(function(){
        $("#medication_inbtn").css('display','block');
        $("#medication_upbtn").css('display','none');
        getCalenderMedication();
        getCalenderMedication1();
        getCalenderMedication2();
        getCalenderMedication3();
        getmediTime();
    },5000);
    var storedData1 = myApp.formGetData('logged_userId');
    myApp.showPreloader();

    var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=medications&columns=*&condition=id="+id;

    var url1=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=calendar&columns=*&condition=itemId="+id;

    $.getJSON (url1, function (json) {
        myApp.hidePreloader();

            $('#medi_start_remind').val( json['posts']['0']['reminderDate']);
            $('#medi_remind_time').val( json['posts']['0']['reminderTime']);
            $('#medicationsform_id').val( id );

            if(json['posts']['0']['monday'] == 1){
                $('#medi_monday').attr('checked','checked');
            }
            if(json['posts']['0']['tuesday'] == 1){
                $('#medi_tuesday').attr('checked','checked');
            }
            if(json['posts']['0']['wednesday'] == 1){
                $('#medi_wednesday').attr('checked','checked');
            }
            if(json['posts']['0']['thursday'] == 1){
                $('#medi_thursday').attr('checked','checked');
            }
            if(json['posts']['0']['friday'] == 1){
                $('#medi_friday').attr('checked','checked');
            }
            if(json['posts']['0']['saturday'] == 1){
                $('#medi_saturday').attr('checked','checked');
            }
            if(json['posts']['0']['sunday'] == 1){
                $('#medi_sunday').attr('checked','checked');
            }
            if(json['posts']['0']['email'] == 1){
                $('#medi_receive_email').attr('checked','checked');
            }
        });

        $.getJSON (url, function (json) {

            $('#medi_medicine_name').val( json['posts']['0']['name']);
            $('#medi_dosage').val( json['posts']['0']['dosage']);
            $('#medi_medi_reference').val( json['posts']['0']['reference']);
            $('#medi_used_treatment').val( json['posts']['0']['treatmentof']);

            if(json['posts']['0']['tomd'] == 1){
                $('#medi_tab').attr('checked','checked');
            }
            if(json['posts']['0']['tomd'] == 2){
                $('#medi_cap').attr('checked','checked');
            }
            if(json['posts']['0']['tomd'] == 3){
                $('#medi_syrup').attr('checked','checked');
            }
            if(json['posts']['0']['tomd'] == 4){
                $('#medi_suppos').attr('checked','checked');
            }
            if(json['posts']['0']['tomd'] == 5){
                $('#medi_inj').attr('checked','checked');
            }
            $('#medi_datestarted').val( json['posts']['0']['dateStarted'] );
            $('#medi_enddate').val( json['posts']['0']['enddate1'] );
            $('#medi_end_remind').val( json['posts']['0']['enddate'] );
            if(json['posts']['0']['type']==1)
            {
                $('#medi_still_using').attr('checked','checked');
            }
            $('#medicationsform_id').val( json['posts']['0']['id'] );

            var url2= "http://www.healthrecordspro.com/ws.php?type=getidname&format=json&table=healthcare_providers&condition=hcp_id="+json['posts']['0']['prescribedbydr'];

                $.getJSON (url2, function (json) {
                myApp.hidePreloader();

                if(json['posts'] == 0){
                    prescribed(-1);
                    $('#medi_precribed_others_li').css('display','block');
                }else{
                    $('#medi_precribed').val( json['posts']['0']['first_name'] );
                    $('#medi_precribed_id_others').val( json['posts']['0']['hcp_id'] );
                    prescribed( json['posts']['0']['hcp_id'] );
                }

            });
                $('#medi_precribed_others').val( json['posts']['0']['otherProvider'] );
                if (json['posts']['0']['image'] != '') {
                $('#medication_img_display').html('<img src="http://healthrecordspro.com/newsite/images/medication/'+json['posts']['0']['image']+'" width="200" height="200" onclick="Medicationimagepopupdisplay(\''+json['posts']['0']['image']+'\')">');
            }else{
                $('#medicationimghide').hide();
            }
    });

}

function Medicationimagepopupdisplay(id)
{
    var popupHTML = '<div class="popup popupImage">'+
                                '<div class="content-block  " >'+
                                    '<div style="width: 100%;">'+
                                        '<div>'+
                                            '<img src="http://healthrecordspro.com/newsite/images/medication/'+id+'" height="450" width="600" />'+
                                        '</div>'+
                                    '</div>'+
                                    '<p>Medication Chart</p>'+
                                    '<p><a href="#" style="color:black;float:right;margin-right: -13px; margin-top: -23px;" class="close-popup"><i class="fa fa-times-circle fa-2x" ></i></a></p>'+
                                '</div>'+
                            '</div>';
    myApp.popup(popupHTML);
}

function medihistoryEdit(medi_id)
{
    setTimeout(function(){
        $("#medihistory_inbtn").css('display','block');
        $("#medihistory_upbtn").css('display','none');
        $("#medi_add").css('display','none');
        getcalendarMedihis(0);
        getcalendarMedihis1(0);


    var storedData1 = myApp.formGetData('logged_userId');
    myApp.showPreloader();

    var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=illnessescustomers&columns=*&condition=id="+medi_id;

    $.getJSON (url, function (json){
        myApp.hidePreloader();
        var key, count = 0;
        for(key in json['posts']) {
            if(json['posts'].hasOwnProperty(key)) {
                count++;
            }
        }
        for (var i = 0; i <count; i++) {
            var url1 =  "http://www.healthrecordspro.com/ws.php?type=getidname&format=json&table=illnesses&condition=id="+json['posts']['0']['illnessId'];

            $.getJSON (url1, function (json){

                if(json['posts'] == 0){
                    DieasesName(0,-1);
                    $('#medi_his_name_others_li_0').css('display','block');
                 }else{
                    $('#medi_his_name_0').val( json['posts']['0']['name'] );
                    $('#medi_his_name_id_0').val( json['posts']['0']['id'] );
                    DieasesName(0,json['posts']['0']['id'] );
                }

            });
            if(json['posts']['0']['stillActive']==1)
            {
                $('#medi_sactive_'+i).attr('checked','checked');

            }else{
                $('.text3').hide();
            }
            $('#medi_his_name_others_0').val( json['posts']['0']['other'] );
            // $('#medi_sactive').val( json['posts']['0']['stillActive'] );
            $('#medi_sdate_'+i).val( json['posts']['0']['start_date'] );
            $('#medi_rdate_'+i).val( json['posts']['0']['resolvedDate'] );
            $('#update_medi_sdate').val( json['posts']['0']['id'] );
        }
    });
    },1000);
}

function allergiesEdit(id)
{
    setTimeout(function(){
        $("#allergies_inbtn").css('display','block');
        $("#allergies_upbtn").css('display','none');
    },500);
    var storedData1 = myApp.formGetData('logged_userId');
        myApp.showPreloader();

    var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=allergies&columns=*&condition=id="+id;

    $.getJSON (url, function (json) {
        myApp.hidePreloader();

        $('#allergies_select').val( json['posts']['0']['type'] );
        $('#allergies_alrto').val( json['posts']['0']['typename'] );
        $('#allergies_react').val( json['posts']['0']['reaction'] );
        $('#allergies_treat').val( json['posts']['0']['treatment'] );
        $('#allergies_id').val( json['posts']['0']['id'] );

        if (json['posts']['0']['image'] != '') {
        $('#allergies_img_display').html('<img src="http://healthrecordspro.com/newsite/images/allergies/'+json['posts']['0']['image']+'" width="200" height="200" onclick="Allergiesimagepopupdisplay(\''+json['posts']['0']['image']+'\')">');
    }else{
        $('#allergiesremovehide').hide();
    }

    });

}

function Allergiesimagepopupdisplay(id)
{
    var popupHTML = '<div class="popup popupImage">'+
                                '<div class="content-block  " >'+
                                    '<div style="width: 100%;">'+
                                        '<div>'+
                                            '<img src="http://healthrecordspro.com/newsite/images/allergies/'+id+'" height="450" width="600" />'+
                                        '</div>'+
                                    '</div>'+
                                    '<p>Allergies Chart</p>'+
                                    '<p><a href="#" style="color:black;float:right;margin-right: -13px; margin-top: -23px;" class="close-popup"><i class="fa fa-times-circle fa-2x" ></i></a></p>'+
                                '</div>'+
                            '</div>';
    myApp.popup(popupHTML);
}

function surgeriesEdit(id)
{
    setTimeout(function(){
        $("#surgeries_inbtn").css('display','block');
        $("#surgeries_upbtn").css('display','none'); 
        getsuraddCal();
        getsurdisCal();
    },500);
    var storedData1 = myApp.formGetData('logged_userId');
    myApp.showPreloader();

    var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=surgeries&columns=*&condition=id="+id;

    $.getJSON (url, function (json) {
        myApp.hidePreloader();

            $('#sur_add_date').val( json['posts']['0']['adminissionDate'] );
            $('#sur_dis_date').val( json['posts']['0']['dischargeDate'] );
            $('#sur_caseno').val( json['posts']['0']['case'] );
            $('#sur_physician').val( json['posts']['0']['physician'] );
            $('#sur_reason').val( json['posts']['0']['reason'] );
            $('#sur_hospital').val( json['posts']['0']['hospital'] );
            $('#sur_address').val( json['posts']['0']['address'] );
            $('#sur_diag').val( json['posts']['0']['diagnosis'] );
            $('#sur_procedure').val( json['posts']['0']['procedure'] );
            $('#sur_pathology').val( json['posts']['0']['pathology'] );
            $('#sur_important_findings').val( json['posts']['0']['importantFindings'] );
            $('#surgeries_id').val( json['posts']['0']['id'] );
if (json['posts']['0']['image'] != '') {
$('#surgeries_img_display').html('<img src="http://healthrecordspro.com/newsite/images/surgeries/'+json['posts']['0']['image']+'" width="200" height="200" onclick="Surgeriesimagepopupdisplay(\''+json['posts']['0']['image']+'\')">');
}else{
    $('#surgeriesRemovehide').hide();
}

    });

}

function Surgeriesimagepopupdisplay(id)
{
    var popupHTML = '<div class="popup popupImage">'+
                                '<div class="content-block  " >'+
                                    '<div style="width: 100%;">'+
                                        '<div>'+
                                            '<img src="http://healthrecordspro.com/newsite/images/surgeries/'+id+'" height="450" width="600" />'+
                                        '</div>'+
                                    '</div>'+
                                    '<p>Surgeries Chart</p>'+
                                    '<p><a href="#" style="color:black;float:right;margin-right: -13px; margin-top: -23px;" class="close-popup"><i class="fa fa-times-circle fa-2x" ></i></a></p>'+
                                '</div>'+
                            '</div>';
    myApp.popup(popupHTML);
}

function immunizationEdit(immunizations_id)
{
    setTimeout(function(){
        $("#immunization_inbtn").css('display','block');
        $("#immunization_upbtn").css('display','none');
        $("#immu_add").css('display','none');
        getimmuCalander(0);
        getimmuCalander1(0);
        getimmuCalander2(0);

    var storedData1 = myApp.formGetData('logged_userId');
        myApp.showPreloader();

    var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=immunizations&columns=*&condition=immunizations_id="+immunizations_id;

    $.getJSON (url, function (json) {

        myApp.hidePreloader();
        var key, count = 0;
            for(key in json['posts']) {
                if(json['posts'].hasOwnProperty(key)) {
                    count++;
                }
            }

        var url1=  "http://www.healthrecordspro.com/ws.php?type=getidname&format=json&table=immunization_types&condition=immunizations_type_id="+json['posts']['0']['immunizations_type_id'];
        for (var i = 0; i <count; i++) {
        $.getJSON (url1, function (json) {

        // $('#immu_name_0').val( json['posts']['0']['type'] );
        // $('#immu_name_id_0').val( json['posts']['0']['immunizations_type_id'] );
        // MedicineName(0,json['posts']['0']['immunizations_type_id']);

            if(json['posts'] == 0){
                    MedicineName(0,-1);
                    $('#immu_name_others_li_0').css('display','block');
                 }else{
                    $('#immu_name_0').val( json['posts']['0']['type'] );
                    $('#immu_name_id_0').val( json['posts']['0']['immunizations_type_id'] );
                    MedicineName(0,json['posts']['0']['immunizations_type_id'] );
            }

        });

        $('#immu_name_others_'+i).val( json['posts']['0']['other'] );
        $('#boost1_'+i).val( json['posts']['0']['booster1'] );
        $('#boost2_'+i).val( json['posts']['0']['booster2'] );
        $('#boost3_'+i).val( json['posts']['0']['booster3'] );
        $('#immunization_id').val( json['posts']['0']['immunizations_id'] );
        if (json['posts']['0']['image'] != '') {
        $('#immunization_img_display').html('<img src="http://healthrecordspro.com/newsite/images/immunizations/'+json['posts']['0']['image']+'" width="200" height="200" onclick="Immunizationimagepopupdisplay(\''+json['posts']['0']['image']+'\')">');
    }else{
        $('#immuniRemovehide').hide();
    }
    }

    });
    },500);

}
function Immunizationimagepopupdisplay(id)
{
    var popupHTML = '<div class="popup popupImage">'+
                                '<div class="content-block  " >'+
                                    '<div style="width: 100%;">'+
                                        '<div>'+
                                            '<img src="http://healthrecordspro.com/newsite/images/immunizations/'+id+'" height="450" width="600" />'+
                                        '</div>'+
                                    '</div>'+
                                    '<p>Immunization</p>'+
                                    '<p><a href="#" style="color:black;float:right;margin-right: -13px; margin-top: -23px;" class="close-popup"><i class="fa fa-times-circle fa-2x" ></i></a></p>'+
                                '</div>'+
                            '</div>';
    myApp.popup(popupHTML);
}

function selfMonEdit(datess){
	setTimeout(function(){
		$("#changeonInsert_self").css('display','none');
		$("#changeonUpdate_self").css('display','block');
		$("#add").css('display','none');
		getCalenderSelf();
		var storedData1 = myApp.formGetData('logged_userId');
		var urlgetUpResultsByDate= "http://www.healthrecordspro.com/ws.php?type=mychartsupdateformbydate&format=json&customerid="+storedData1['userId']+"&date='"+datess+"'";

		$.getJSON (urlgetUpResultsByDate, function (json){
			$.each( json['posts'], function( key, val ) {
				$('#self_date').val(val['date']);
				$("#self_tests").append("<li ><div class='item-content'><div class='item-inner' style='padding-right: 0;'><div class='item-title label' style='font-size: 13px;'>"+val['testName']+"</div><div class='item-input' style='width: 40%;'><input type='number' name='name_"+val['id']+"' id='value_"+val['id']+"' placeholder='value' value='"+val['testValue']+"' style='font-size: 13px;'></div></div><img src='img/chart.png' class='lab_ch_img' onClick='SelfmoniCharts("+val['testId']+");'/></div></li>");
			});
		});
	},500);
}

function SelfmoniCharts(testId){
	var storedData1 = myApp.formGetData('logged_userId');
	var value = [];
	var dateval = [];

	var urlCharts="http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=mychartsresults&columns=*&condition=customerId="+storedData1['userId']+" AND testId="+testId;

	$.getJSON (urlCharts, function (json) {
		var key, count = 0;
		for(key in json['posts']) {
			if(json['posts'].hasOwnProperty(key)) {
				if(json['posts'][count]['testValue'] != ''){

					string = json['posts'][count]['testValue'].toString();
					if(string != '')
					{
					string1 = json['posts'][count]['date'].toString();
					value.push(string);
					dateval.push(string1);
					content = value.toString();
					content1 = dateval.toString();
					}
				}
				count++;
			}
		}
		var popupHTML = '<div class="popup popup1">'+
							'<div class="content-block content-block1">'+
								'<div style="width: 100%;">'+
									'<div>'+
										'<canvas id="canvas" height="450" width="600"></canvas>'+
									'</div>'+
								'</div>'+
								'<table style="width:100%;">'+
									'<thead>'+
										'<tr>'+
											'<th>Date</th>'+
											'<th>Values</th>'+
										'</tr>'+
									'</thead>'+
									'<tbody>'+
									'<tr style="text-align:center"><td>'+string1+'</td><td>'+string+'</td></tr>'+
								'</tbody>'+
								'</table>'+
								'<p>Self Charts</p>'+
								'<p><a href="#" style="color:black;float:right;margin-right: -13px; margin-top: -23px;" class="close-popup"><i class="fa fa-times-circle fa-2x" ></i></a></p>'+
							'</div>'+
						'</div>';

		myApp.popup(popupHTML);

		var lineChartData = {
			labels : content1.split(','),
			datasets : [
				{
					label: "",
					fillColor : "rgba(220,220,220,0.2)",
					strokeColor : "rgba(220,220,220,1)",
					pointColor : "rgba(220,220,220,1)",
					pointStrokeColor : "#fff",
					pointHighlightFill : "#fff",
					pointHighlightStroke : "rgba(220,220,220,1)",
					data : JSON.parse("[" + content + "]")
					// data : [10,20,30,10,60]
				}
			]
		}
		var ctx = document.getElementById("canvas").getContext("2d");
		window.myLine = new Chart(ctx).Line(lineChartData, {
			responsive: true
		});
	});
}

function selfDataMetrics(){
	setTimeout(function(){
		var storedData1 = myApp.formGetData('logged_userId');
		var urlgetResultsList= "http://www.healthrecordspro.com/ws.php?type=mychartsbytest&format=json&customerid="+storedData1['userId'];

		$.getJSON (urlgetResultsList, function (json) {
			$.each( json['posts'], function( key, val ) {
				$('#self_listpage_data').append('<li><a href="self_height_chart.html" class="close-panel item-link" onclick="displaySelfBydateCharts('+val['testId']+');"><div class="item-content white"><div class="item-inner"><div class="item-title">'+val['testName']+'</div></div></div></a></li>');
			});
			$('#selfrep').append('<a href="self_all_reports.html" onclick="selfReports('+json['posts']['0']['id']+');" class="link icon-only" style="color:white;border-right:1px white solid ">Charts</a><a href="self_table_display.html" onClick="selfTableDisplay()" class="link icon-only" style="color:white">Table</a>');
		});
	},500);
}

function displaySelfBydateCharts(chartIdss){
	setTimeout(function(){
		var storedData1 = myApp.formGetData('logged_userId');
		var value = [];
		var dateval = [];
		var TestName = [];
		var urlgetResultsByDateCharts="http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=mychartsresults&columns=*&condition=customerId="+storedData1['userId']+" AND testId="+chartIdss;

		$.getJSON (urlgetResultsByDateCharts, function (json) {
			var key, count = 0;
			if(json['posts'][count]['testValue'] != ''){
			for(key in json['posts']) {
				if(json['posts'].hasOwnProperty(key)) {
					$("#self_Test_name").html('');
					$("#self_Test_name_otrs").html('');
						string = json['posts'][count]['testValue'].toString();
						if(string != '')
						{
						string1 = json['posts'][count]['date'].toString();
						string2 = json['posts'][count]['testName'].toString();
						value.push(string);
						dateval.push(string1);
						TestName.push(string2);
						$("#table_height").append('<tr style="text-align:center"><td>'+string1+'</td><td>'+string+'</td></tr>');
						$("#self_Test_name").append('<p>'+string2+'</p>');
						$("#self_Test_name_otrs").append('<p>'+string2+'</p>');
						content = value.toString();
						content1 = dateval.toString();
						}
					}
						count++;
				}
				var lineChartData = {
					labels : content1.split(','),
					datasets : [
						{
							label: "",
							fillColor : "rgba(220,220,220,0.2)",
							strokeColor : "rgba(220,220,220,1)",
							pointColor : "rgba(220,220,220,1)",
							pointStrokeColor : "#fff",
							pointHighlightFill : "#fff",
							pointHighlightStroke : "rgba(220,220,220,1)",
							data : JSON.parse("[" + content + "]")
							// data : [10,20,30]
						}
					]
				}
				var ctx = document.getElementById("canvas_height").getContext("2d");
				window.myLine = new Chart(ctx).Line(lineChartData, {
					responsive: true
				});
			}else{
				var data = "No Records Found!!!";
				$('#test').append(data);
			}
		});
	},500);
}
function selfMonitoringAdd(){
	setTimeout(function(){
		$("#changeonInsert_self").css('display','block');
		$("#changeonUpdate_self").css('display','none');
		getCalenderSelf();
		var storedData1 = myApp.formGetData('logged_userId');
		var url1= "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=mychartstests&columns=*&condition=active=1";
		$.getJSON (url1, function (json) {
			$.each( json['posts'], function( key, val ) {
				$('#self_tests').append('<li ><div class="item-content"><div class="item-inner" style="padding-right: 0;"><div class="item-title label" style="font-size: 13px;">'+val['name']+'</div><div class="item-input" style="width: 40%;"><input type="number" name="name_'+val['id']+'" id="value_'+val['id']+'" placeholder="value" style="font-size: 13px;"></div></div></div></li>');
			});
		});
	},500);
}

function EmergencycontactAdd()
{
    setTimeout(function(){
        $("#emergency_inbtn").css('display','none');
        $("#emergency_upbtn").css('display','block');
        $("#emergencyRemovehide").css('display','none');
    },500);

}

function EyeprescAdd()
{
    setTimeout(function(){
        $("#eyepresc_inbtn").css('display','none');
        $("#eyepresc_upbtn").css('display','block');
    },500);
}

function doccounsaltationAdd()
{
    setTimeout(function(){
        $("#doccounsaltation_inbtn").css('display','none');
        $("#doccounsaltation_upbtn").css('display','block');
        getCalenderDoc();
    },500);
}

function medicationAdd()
{
    setTimeout(function(){
        $("#medication_inbtn").css('display','none');
        $("#medication_upbtn").css('display','block');
        $("#medicationimghide").css('display','none');
        prescribed(' ');
        getCalenderMedication();
        getCalenderMedication1();
        getCalenderMedication2();
        getCalenderMedication3();
        getmediTime();
    },500);
}

function medihistoryAdd()
{
    setTimeout(function(){
        $("#medihistory_inbtn").css('display','none');
        $("#medihistory_upbtn").css('display','block');
        $("#medi_add").css('display','block');
        DieasesName(0);
        getcalendarMedihis(0);
        getcalendarMedihis1(0);
    },500);
}

function allergiesAdd()
{
    setTimeout(function(){
        $("#allergies_inbtn").css('display','none');
        $("#allergies_upbtn").css('display','block');
        $("#allergiesremovehide").css('display','none');
    },500);
}

function obestrichisAdd(){
    setTimeout(function(){
        $("#obestric_inbtn").css('display','none');
        $("#obestric_upbtn").css('display','block');
        ObestricCalendar();
    },500);
}

function immunizationAdd(){
    setTimeout(function(){
        $("#immunization_inbtn").css('display','none');
        $("#immunization_upbtn").css('display','block');
        $("#immu_add").css('display','block');
        $("#immuniRemovehide").css('display','none');
        MedicineName(0);
        getimmuCalander(0);
        getimmuCalander1(0);
        getimmuCalander2(0);
    },500);
}

function gynacologicAdd(){
    setTimeout(function(){
        $("#gynacologies_inbtn").css('display','none');
        $("#gynacologies_upbtn").css('display','block');
        getGynaCalender();
    },500);
}

function womenpregDatAdd(){
    setTimeout(function(){
        $("#womenpregdat_inbtn").css('display','none');
        $("#womenpregdat_upbtn").css('display','block');
        getwomenPregDat();
    },500);
}

function socialHistoryAdd(){
    setTimeout(function(){
        $("#socialhistory_inbtn").css('display','none');
        $("#socialhistory_upbtn").css('display','block');
        getSocialHCalendar();
    },500);
}

function familypedhisAdd(){
    setTimeout(function(){
        $("#familypedhis_inbtn").css('display','none');
        $("#familypedhis_upbtn").css('display','block');
        getfamipedcalendar();
        familypedChild('');
    },500);
}

function birthpedhiAdd(){
    setTimeout(function(){
        $("#birthhis_inbtn").css('display','none');
        $("#birthhis_upbtn").css('display','block');
        childnamebirth( ' ' );
    },500);
}

function developmentHisPedAdd(){
    setTimeout(function(){
        $("#devepped_inbtn").css('display','none');
        $("#devepped_upbtn").css('display','block');
        developmentHiscname( ' ' );
    },500);
}

function pastmediAdd(){
    setTimeout(function(){
        $("#pastmedical_inbtn").css('display','none');
        $("#pastmedical_upbtn").css('display','block');
        childname('');
    },500);
}

function dentalAdd(){
    setTimeout(function(){
        $("#dentalhis_inbtn").css('display','none');
        $("#dentalhis_upbtn").css('display','block');
        dentalCalander();
    },500);
}

function biochemicalAdd(){
    setTimeout(function(){
        $("#biochemical_inbtn").css('display','none');
        $("#biochemical_upbtn").css('display','block');
    },500);

        var storedData1 = myApp.formGetData('logged_userId');

        var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=user_profile&columns=metrics&condition=user_id="+storedData1['userId'];

        var url1=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=user_profile&columns=*&condition=user_id="+storedData1['userId'];

        $.getJSON (url, function (json) {

            $.getJSON (url1, function (json1) {

                if(json1['posts']['0']['metrics'] == 0)

                {

                $("#showUr").css('display','block');
                $("#showEUROP12").css('display','none');
                $('#bio_che_height').val( json['posts']['0']['height'] );
                // $('#bio_che_height_i').val( json['posts']['0']['inches'] );
                $('#bio_che_Weight_p').val( json['posts']['0']['weight'] );

                }else if(json1['posts']['0']['metrics'] == 1){

                $("#showUr").css('display','none');
                $("#showEUROP12").css('display','block');
                $('#bio_che_height_cm').val( json['posts']['0']['height'] );
                $('#bio_che_Weight_kg').val( json['posts']['0']['weight'] );

                }

            });

        });
}

function implantsAdd(){
    setTimeout(function(){
        $("#implants_inbtn").css('display','none');
        $("#implants_upbtn").css('display','block');
        getimplantsCal();
    },500);
}

function mediDirAdd(){
    setTimeout(function(){
        $("#medicaldirec_inbtn").css('display','none');
        $("#medicaldirec_upbtn").css('display','block');
    },500);
}

function surgeriesAdd(){
    setTimeout(function(){
        $("#surgeries_inbtn").css('display','none');
        $("#surgeries_upbtn").css('display','block');
        $("#surgeriesRemovehide").css('display','none');
        getsuraddCal();
        getsurdisCal();
    },500);
}

function docappoinAdd(){
    setTimeout(function(){
        $("#docappoint_inbtn").css('display','none');
        $("#docappoint_upbtn").css('display','block');
        physicianProvider('');
        Speciality('');
        getDocAppointCalender();
        docApptimePicker();
        getDocAppointCalender1();
        getDocAppointCalender2();
        docApptimePicker1();
        docApptimePicker2();
    },500);
}
function childaddnew()
{
    setTimeout(function(){
        $("#child_inbtn").css('display','none');
        $("#child_upbtn").css('display','block');
        getCalenderChildPed();
    },500);
}

function PhysicalDataEdit(id)
{
    setTimeout(function(){
        $("#physical_inbtn").css('display','block');
        $("#physical_upbtn").css('display','none');
        getphysicalCalendar();
        
        var storedData1 = myApp.formGetData('logged_userId');
        myApp.showPreloader();

        var url =  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=user_profile&columns=metrics&condition=user_id="+storedData1['userId'];

        $.getJSON (url, function (json) {
            myApp.hidePreloader();
            if(json['posts']['0']['metrics'] == 1)
            {
                $('#pev_metricheight').html('cm');
                $('#pev_metricweight').html('Kg');
                $('#pev_metrictemp').html('Fahrenheit');
            }
            else if (json['posts']['0']['metrics'] == 0)
            {
                $('#pev_metricheight').html('inch');
                $('#pev_metricweight').html('Pounds');
                $('#pev_metrictemp').html('Celsius');
            }
        });
            myApp.showPreloader();
        var url1=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=physicalexams&columns=*&condition=id="+id;

        $.getJSON (url1, function (json) {
            myApp.hidePreloader();
            // $('#physical_name').val( json['posts']['0']['physicianName'] );
            // $('#physical_speciality').val( json['posts']['0']['specialty'] );
            $('#physical_doe').val( json['posts']['0']['date'] );
            $('#physical_ht').val( json['posts']['0']['heightu'] );
            $('#physical_height').val( json['posts']['0']['height'] );
            $('#physical_wt').val( json['posts']['0']['weightu'] );
            $('#physical_weight').val( json['posts']['0']['weight'] );
            $('#physical_tmp').val( json['posts']['0']['tempu'] );
            $('#physical_temp').val( json['posts']['0']['temp'] );
            $('#physical_bpr').val( json['posts']['0']['bloodPressureR'] );
            $('#physical_sysbpr2').val( json['posts']['0']['systolicBPR'] );
            $('#physical_bpl').val( json['posts']['0']['bloodPressureL'] );
            $('#physical_diabpl2').val( json['posts']['0']['diastolicBPR'] );
            $('#physical_hrate').val( json['posts']['0']['heartrate'] );
            $('#physical_resrate').val( json['posts']['0']['respiratoryrate'] );
            $('#physicalform_id').val( json['posts']['0']['id'] );

            var url2=  "http://www.healthrecordspro.com/ws.php?type=getidname&format=json&table=healthcare_providers&condition=hcp_id="+ json['posts']['0']['physicianName'];

                $.getJSON (url2, function (json) {
                    $('#physical_name').val( json['posts']['0']['first_name'] );
                    $('#physical_name_id').val( json['posts']['0']['hcp_id'] );
                    PhysicianNameExams( json['posts']['0']['hcp_id'] );

                });
            var url3=  "http://www.healthrecordspro.com/ws.php?type=getidname&format=json&table=doctors_speciality&condition=id="+ json['posts']['0']['specialty'];

            $.getJSON (url3, function (json) {
                $('#physical_speciality').val( json['posts']['0']['name'] );
                $('#physical_speciality_id').val( json['posts']['0']['id'] );
                PhysicalExamSpeciality(json['posts']['0']['id']);
            });
            var url4 = "http://www.healthrecordspro.com/ws.php?type=getidname&format=json&table=physicalexamsbody&condition=physicalexamId="+json['posts']['0']['id'];

            $.getJSON (url4, function (json) {
                if( json['posts']['0']['N'] == 1)
                {
                    $('#physical_n_0').attr('checked','checked');
                }
                else
                {
                    $('#physical_ab_0').attr('checked','checked');
                }

                $('#physical_desc_0').val( json['posts']['0']['description'] );
                var url5 = "http://www.healthrecordspro.com/ws.php?type=getidname&format=json&table=physicalexambodysystems&condition=id="+json['posts']['0']['bodysystemId'];
                $.getJSON (url5, function (json) {
                    if (json['posts'] == 0) {
                        PhysicalExamVal(0,-1);
                        $('#physical_exam_name_others_li').css('display','block');
                    }else{
                        $('#physical_exam_name_others_0').val( json['posts']['0']['name'] );
                        $('#physical_exam_name_others_id_0').val( json['posts']['0']['bodysystemId'] );
                        PhysicalExamVal(0,json['posts']['0']['bodysystemId'] );
                    }
                });
                $('#physical_exam_name_others').val( json['posts']['0']['other'] );
            });
            $('#physicalexam_img_display').html('<img src="http://healthrecordspro.com/newsite/images/physicalexamsvitals/'+json['posts']['0']['image']+'" width="200" height="200" onclick="Physicalimagepopupdisplay(\''+json['posts']['0']['image']+'\')">');
        });
    },500);
}

function Physicalimagepopupdisplay(id)
{
    var popupHTML = '<div class="popup popupImage">'+
                                '<div class="content-block  " >'+
                                    '<div style="width: 100%;">'+
                                        '<div>'+
                                            '<img src="http://healthrecordspro.com/newsite/images/physicalexamsvitals/'+id+'" height="450" width="600" />'+
                                        '</div>'+
                                    '</div>'+
                                    '<p>Physical image</p>'+
                                    '<p><a href="#" style="color:black;float:right;margin-right: -13px; margin-top: -23px;" class="close-popup"><i class="fa fa-times-circle fa-2x" ></i></a></p>'+
                                '</div>'+
                            '</div>';
    myApp.popup(popupHTML);
}

function getOrganData()
{
    setTimeout(function(){
        var storedData1 = myApp.formGetData('logged_userId');
        var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=organdonor&columns=*&condition=customerId="+storedData1['userId'];

            $.getJSON (url, function (json) {

            $('#which_organ').val( json['posts']['0']['do_which_organ'] );
            $('#organ_name_recipient').val( json['posts']['0']['do_name_recipient'] );
            $('#organ_city_organ_trans').val( json['posts']['0']['do_city_transfer'] );
            $('#organ_whe_trans_occ').val( json['posts']['0']['do_hospital'] );
            $('#organ_name_doc').val( json['posts']['0']['do_doctorid'] );

             var url1=  "http://www.healthrecordspro.com/ws.php?type=getidname&format=json&table=healthcare_providers&condition=hcp_id="+json['posts']['0']['do_doctorid'];
             $.getJSON (url1, function (json) {

            $('#organ_name_doc').val( json['posts']['0']['first_name'] );
            $('#organ_name_doc_id').val( json['posts']['0']['hcp_id'] );

        });

            $('#organ_which').val( json['posts']['0']['ro_which_organ'] );
            $('#organ_name_of_recei').val( json['posts']['0']['ro_name_recipient'] );
            $('#organ_transfer_city').val( json['posts']['0']['ro_city_transfer'] );
            $('#organ_hospi_ortrans').val( json['posts']['0']['ro_hospital'] );

             var url3=  "http://www.healthrecordspro.com/ws.php?type=getidname&format=json&table=healthcare_providers&condition=hcp_id="+json['posts']['0']['ro_doctorid'];

             $.getJSON (url3, function (json) {

            $('#organ_name_doc1').val( json['posts']['0']['first_name'] );
            $('#organ_name_doc1_id').val( json['posts']['0']['hcp_id'] );
        });

            $('#organ_which1').val( json['posts']['0']['which_organs'] );
            $('#organ_id').val( json['posts']['0']['id'] );

            $('#organdonation_img_display').html('<img src="http://healthrecordspro.com/newsite/images/donor/'+json['posts']['0']['image']+'" width="200" height="200" onclick="organdonimagepopupdisplay(\''+json['posts']['0']['image']+'\')">');

        });
    },500);

}
function OrganIMGpopupdisplay(id)
{
    var popupHTML = '<div class="popup popupImage">'+
                                '<div class="content-block  " >'+
                                    '<div style="width: 100%;">'+
                                        '<div>'+
                                            '<img src="http://healthrecordspro.com/newsite/uploads/'+id+'" height="450" width="600" />'+
                                        '</div>'+
                                    '</div>'+
                                    '<p>Organ Donation Image</p>'+
                                    '<p><a href="#" style="color:black;float:right;margin-right: -13px; margin-top: -23px;" class="close-popup"><i class="fa fa-times-circle fa-2x" ></i></a></p>'+
                                '</div>'+
                            '</div>';
    myApp.popup(popupHTML);
}
var updateId;
function doctorsEdit(id)
{
	setTimeout(function(){
		$("#docappoint_inbtn").css('display','block');
		$("#docappoint_upbtn").css('display','none');
		getDocAppointCalender();
		docApptimePicker();
		getDocAppointCalender1();
		getDocAppointCalender2();
		docApptimePicker1();
		docApptimePicker2();

		var storedData1 = myApp.formGetData('logged_userId');
		myApp.showPreloader();

		var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=doctors_appointment&columns=*&condition=id="+id;

		$.getJSON (url, function (json) {
			myApp.hidePreloader();

			var url1=  "http://www.healthrecordspro.com/ws.php?type=getidname&format=json&table=healthcare_providers&condition=hcp_id="+ json['posts']['0']['physicianname'];
				$.getJSON (url1, function (json) {
					myApp.hidePreloader();
					if (json['posts'] == 0) {
						physicianProvider(-1);
						$('#doc_apoint_phyname_others_li').css('display','block');
					}else{
						$('#doc_apoint_phyname').val( json['posts']['0']['first_name'] );
						$('#doc_apoint_phyname_id').val( json['posts']['0']['hcp_id'] );
						physicianProvider( json['posts']['0']['hcp_id'] );
					}

				});
				$('#doc_apoint_phyname_others').val(json['posts']['0']['name_other']);

				var url2=  "http://www.healthrecordspro.com/ws.php?type=getidname&format=json&table=doctors_speciality&condition=id="+ json['posts']['0']['specialty'];  

				$.getJSON (url2, function (json) {
					myApp.hidePreloader();

						if(json['posts'] == 0){
							Speciality(-1);
							$('#doc_apoint_speciality_others_li').css('display','block');

						}else{
							$('#doc_apoint_speciality').val( json['posts']['0']['name'] );
							$('#doc_apoint_speciality_id').val( json['posts']['0']['id'] );
							Speciality( json['posts']['0']['id']);
						}

					});
						$('#doc_apoint_speciality_others').val( json['posts']['0']['specialty_other'] );
						$('#doc_apoint_dofapointment').val( json['posts']['0']['dateofappointment'] );
						$('#doc_apoint_time').val( json['posts']['0']['time'] );
						$('#doc_apoint_reminder_date').val( json['posts']['0']['reminderdate'] );
						$('#doc_apoint_reminder_time').val( json['posts']['0']['remindertime'] );
						$('#doc_apoint_sec_reminder_date').val( json['posts']['0']['reminderdate2'] );
						$('#doc_apoint_sec_reminder_time').val( json['posts']['0']['remindertime2'] );
						if( json['posts']['0']['reminder'] == 1)
						{
							$('#doc_aopint_rem_email').attr('checked','checked');
						}
						$('#doctors_id').val( json['posts']['0']['id'] );
						updateId = id;
			});
	},1000);
}

function getSurgeriesData()
{
    setTimeout(function(){
        var storedData1 = myApp.formGetData('logged_userId');
        // myApp.showPreloader();

        var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=surgeries&columns=*&condition=user_id="+storedData1['userId'];

        $.getJSON (url, function (json) {
            // myApp.hidePreloader();

            var key, count = 0;
            for(key in json['posts']) {
                if(json['posts'].hasOwnProperty(key)) {
                count++;
                }
            }
                if(json['posts']==0){
                    var data = "No Records Found!!!";
                    $('#surgeriesd').append(data);
                }
                else
                {

                    for(i=0;i<count;i++){

                        var data = "<ul id='surgeries_ul_"+i+"'><li><a href='surgeries.html' class='item-link' onclick='surgeriesEdit("+json['posts'][i]['id']+");'><div class='item-content white'><div class='item-inner'><div class='item-title'>"+json['posts'][i]['adminissionDate']+" | "+json['posts'][i]['hospital']+"</div></div></div></a></li></ul>";

                        $('#surgeriesd').append(data);

                    }
                }

        });
    },500);
}

function getPhysicalExamData()
{
    setTimeout(function(){
        var storedData1 = myApp.formGetData('logged_userId');
        // myApp.showPreloader();

            var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=physicalexams&columns=*&condition=customerId="+storedData1['userId'];

            $.getJSON (url, function (json) {
            // myApp.hidePreloader();
                var key, count = 0;
                for(key in json['posts']) {
                    if(json['posts'].hasOwnProperty(key)) {
                    count++;
                    }
                }
                var phynames = [];
                var speciality = [];
                if(json['posts']==0){
                    var data = "No Records Found!!!";
                    $('#physicalexams').append(data);
                }
                else
                {
                    for(i=0;i<count;i++){

                        var data="<ul id='physical_exams_vitals_ul_"+i+"'><li><a href='physical_exam_form.html' class='item-link' onclick='PhysicalDataEdit("+json['posts'][i]['id']+");'><div class='item-content white'><div class='item-inner'><div class='item-title' id='display_phy_list_"+i+"'>"+json['posts'][i]['date']+"</div></div></div></a></li></ul>";

                        $('#physicalexams').append(data);

                        var url1="http://www.healthrecordspro.com/ws.php?type=getidname&format=json&table=healthcare_providers&condition=hcp_id="+json['posts'][i]['physicianName'];
                        jQuery.ajaxSetup({async:false});
                        $.getJSON (url1, function (json) {
                            phynames.push(json);

                        });
                        var url2="http://www.healthrecordspro.com/ws.php?type=getidname&format=json&table=doctors_speciality&condition=id="+ json['posts'][i]['specialty'];
                        jQuery.ajaxSetup({async:false});
                        $.getJSON (url2, function (json) {
                            speciality.push(json);

                        });
                    }
                }
                for( var i=0; i<count;i++ ){
                    $('#display_phy_list_'+i).append(" | "+phynames[i]['posts'][0]['first_name']+"  "+phynames[i]['posts'][0]['last_name']);
                    $('#display_phy_list_'+i).append(" | "+speciality[i]['posts'][0]['name']);
                }

            });
    },500);

}

function getInsuranceData()
{
    setTimeout(function(){
        var storedData1 = myApp.formGetData('logged_userId');
            // myApp.showPreloader();

        var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=health_insurance&columns=*&condition=user_id="+storedData1['userId'];

            $.getJSON (url, function (json) {
                // myApp.hidePreloader();

                var key, count = 0;
                 for(key in json['posts']) {
                    if(json['posts'].hasOwnProperty(key)) {
                    count++;
                    }
                }
                if(json['posts']==0){
                    var data = "No Records Found!!!";
                    $('#healthinsurance').append(data);
                }
                else
                {

                    for(i=0;i<count;i++){

                        var data = "<ul id='health_insurance_ul_"+i+"'><li><a href='health_insu_form.html' class='item-link' onclick='insuEdit("+json['posts'][i]['insurance_id']+");'><div class='item-content white'><div class='item-inner'><div class='item-title'>"+json['posts'][i]['cp_first_name']+"&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; "+json['posts'][i]['cp_last_name']+"</div></div></div></a></li></ul>";

                        $('#healthinsurance').append(data);

                    }
                }

            });
        },500);
}

function getMedicationsData()
{
    setTimeout(function(){
    var storedData1 = myApp.formGetData('logged_userId');
  

    var url= "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=medications&columns=*&condition=customerId="+storedData1['userId'];
    var urlz = "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=medications&columns=id,name,dosage,dateStarted,type&condition="+storedData1['userId'];
    myApp.showPreloader();
        $.getJSON (urlz, function (json) {
            //
        	 

                var key, count = 0;
                for(key in json['posts']) {
                    if(json['posts'].hasOwnProperty(key)) {
                        count++;
                    }
                }

                if(json['posts']==0){
                    var data = "No Records Found!!!";
                    $('#medications').append(data);
                }else{

                    for(i=0;i<count;i++){
                    
                    if(json['posts'][i]['type'] == 0){
                        var data = "<ul id='medications_ul_"+i+"'><li><a href='medications.html' class='item-link' onclick='medicationEdit("+json['posts'][i]['id']+");'><div class='item-content white'><div class='item-inner'><div class='item-title'>"+json['posts'][i]['name']+"&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; "+json['posts'][i]['dosage']+"&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;"+json['posts'][i]['dateStarted']+"</div></div></div></a></li></ul>";

                        $('#medications1').append(data);

                    }else{
                        var data = "<ul id='medications_ul_"+i+"'><li><a href='medications.html' class='item-link' onclick='medicationEdit("+json['posts'][i]['id']+");'><div class='item-content white'><div class='item-inner'><div class='item-title'>"+json['posts'][i]['name']+"&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; "+json['posts'][i]['dosage']+"&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;"+json['posts'][i]['dateStarted']+"</div></div></div></a></li></ul>";

                        $('#medications').append(data);
                    }

                }
        }
                myApp.hidePreloader();

    });
       
    },2000);
}

function gethealthProviderData()
{
    setTimeout(function(){
        var storedData1 = myApp.formGetData('logged_userId');
        // myApp.showPreloader();

        var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=healthcare_providers&columns=*&condition=user_id="+storedData1['userId'];

            $.getJSON (url, function (json) {
                // myApp.hidePreloader();

                    var key, count = 0;
                    for(key in json['posts']) {
                        if(json['posts'].hasOwnProperty(key)) {
                        count++;
                    }
                }
                if(json['posts']==0){
                        var data = "No Records Found!!!";
                        $('#healthproviders').append(data);
                    }
                    else
                    {
                        for(i=0;i<count;i++){

                            var data = "<ul id='health_providers_ul_"+i+"'><li><a href='health_providers.html' class='item-link' onclick='healthProviderEdit("+json['posts'][i]['hcp_id']+");'><div class='item-content white'><div class='item-inner'><div class='item-title'>"+json['posts'][i]['first_name']+ "&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;"+json['posts'][i]['email']+"</div></div></div></a></li></ul>";
                            $('#healthproviders').append(data);
                        }
                    }
            });
    },500);
    myApp.hidePreloader();
}

function getEmergencyContactData(){

    var storedData1 = myApp.formGetData('logged_userId');
     myApp.showPreloader();

    var url= "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=emergency_contacts&columns=*&condition=user_id="+storedData1['userId'];

        $.getJSON (url, function (json) {
          
                var key, count = 0;
                for(key in json['posts']) {
                    if(json['posts'].hasOwnProperty(key)) {
                    count++;
                    }
                }

                if(json['posts']==0){
                    var data = "No Records Found!!!";
                    $('#emergencycontact').append(data);
                }
                else
                {
                    for(i=0;i<count;i++){

                    var data = "<ul id='emergency_contact_ul_"+i+"'><li><a href='emergency_contact.html' class='item-link' onclick='emergencyContactEdit("+json['posts'][i]['contact_id']+");'><div class='item-content white'><div class='item-inner'><div class='item-title'>"+json['posts'][i]['first_name']+ "&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;"+json['posts'][i]['email']+"</div></div></div></a></li></ul>";

                        $('#emergencycontact').append(data);
                    }

                }
                 myApp.hidePreloader();
            });
}


function getBirthData()
{
    setTimeout(function(){
    var storedData1 = myApp.formGetData('logged_userId');
    // myApp.showPreloader();

    var url= "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=birthhistory&columns=*&condition=customerId="+storedData1['userId'];

        $.getJSON (url, function (json) {
            // myApp.hidePreloader();

                var key, count = 0;
                for(key in json['posts']) {
                    if(json['posts'].hasOwnProperty(key)) {
                    count++;
                    }
                }
                if(json['posts']==0){
                    var data = "No Records Found!!!";
                    $('#birthpediatrichistory').append(data);
                }
                else
                {
                    var names = [];
                    for(i=0;i<count;i++){

                        var data = "<ul id='birth_ped_his_ul_"+i+"'><li><a href='birth_history_form.html' class='item-link' onclick='birthPedHisEdit("+json['posts'][i]['id']+");'><div class='item-content white'><div class='item-inner'><div class='item-title' id='display_birthhis_"+i+"'>"+json['posts'][i]['placeofbirth']+"&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</div></div></div></a></li></ul>";

                        $('#birthpediatrichistory').append(data);

                        var url1=  "http://www.healthrecordspro.com/ws.php?type=getidname&format=json&table=pediatricschild&condition=id="+json['posts']['0']['childid'];
                        jQuery.ajaxSetup({async:false});
                        $.getJSON (url1, function (json) {
                                myApp.showPreloader();
                            names.push(json);
                        });

                    }
                }
                for( var i=0; i<count;i++ ){
                    myApp.hidePreloader();
                    $('#display_birthhis_'+i).append(names[i]['posts'][0]['childname']);
                }
            });
    },1000);

}

function getDevelopmentHisData()
{
    setTimeout(function(){
    var storedData1 = myApp.formGetData('logged_userId');
    // myApp.showPreloader();

    var url= "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=Developmentlhistory&columns=*&condition=customerId="+storedData1['userId'];

        $.getJSON (url, function (json) {
            // myApp.hidePreloader();

            var key, count = 0;
            for(key in json['posts']) {
                if(json['posts'].hasOwnProperty(key)) {
                count++;
                }
            }
            if(json['posts']==0){
                var data = "No Records Found!!!";
                $('#devepediatrichistory').append(data);
            }
            else
            {
                var names = [];
                for(i=0;i<count;i++){

                    var data = "<ul id='dev_ped_his_ul_"+i+"'><li><a href='development_history_form.html' class='item-link' onclick='devePedHisEdit("+json['posts'][i]['id']+");'><div class='item-content white'><div class='item-inner'><div class='item-title' id='display_developmenthis_"+i+"'>"+json['posts'][i]['HoldUpHead']+ "&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</div></div></div></a></li></ul>";

                    $('#devepediatrichistory').append(data);

                    var url1=  "http://www.healthrecordspro.com/ws.php?type=getidname&format=json&table=pediatricschild&condition=id="+json['posts']['0']['childid'];
                    jQuery.ajaxSetup({async:false});
                    $.getJSON (url1, function (json) {
                        myApp.showPreloader();
                        names.push(json);
                    });

                }
            }
            for( var i=0; i<count;i++ ){
                myApp.hidePreloader();
                $('#display_developmenthis_'+i).append(names[i]['posts'][0]['childname']);
            }
        });
    },1000);

}

function getpastmediHis()
{
    setTimeout(function(){
    var storedData1 = myApp.formGetData('logged_userId');
    // myApp.showPreloader();

    var url= "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=pastmedicalhistory&columns=*&condition=customerId="+storedData1['userId'];

     $.getJSON (url, function (json) {
             // myApp.hidePreloader();

            var key, count = 0;

            for(key in json['posts']) {
                if(json['posts'].hasOwnProperty(key)) {
                count++;
            }
        }
        if(json['posts']==0){
                    var data = "No Records Found!!!";
                    $('#pastmedicalhistory1').append(data);
                }
                else
                {
                var names = [];
                for(i=0;i<count;i++){

                    var data = "<ul id='past_medi_ped_his_ul_"+i+"'><li><a href='past_medical_his_form.html' class='item-link' onclick='pastPedHisEdit("+json['posts'][i]['id']+");'><div class='item-content white'><div class='item-inner'><div class='item-title' id='display_pastmedi_"+i+"'>"+json['posts'][i]['allergy']+ "&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</div></div></div></a></li></ul>";

                    $('#pastmedicalhistory1').append(data);

                    var url1=  "http://www.healthrecordspro.com/ws.php?type=getidname&format=json&table=pediatricschild&condition=id="+json['posts']['0']['childid'];
                    jQuery.ajaxSetup({async:false});
                    $.getJSON (url1, function (json){
                            myApp.showPreloader();
                        names.push(json);
                    });

                }
            }

            for( var i=0; i<count;i++ ){
                myApp.hidePreloader();
                $('#display_pastmedi_'+i).append(names[i]['posts'][0]['childname']);
            }
        });
    },1000);
}
function getchildData()
{
    var storedData1 = myApp.formGetData('logged_userId');
    myApp.showPreloader();

    var url= "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=pediatricschild&columns=*&condition=customerId="+storedData1['userId'];

     $.getJSON (url, function (json) {
             myApp.hidePreloader();

            var key, count = 0;

            for(key in json['posts']) {
                if(json['posts'].hasOwnProperty(key)) {
                count++;
            }
        }
        if(json['posts']==0){
                    var data = "No Records Found!!!";
                    $('#childhis').append(data);
                }
                else
                {

        for(i=0;i<count;i++){

            var data = "<ul id='past_medi_ped_his_ul_"+i+"' ><li><a href='child_ped_form.html' class='item-link' onclick='childpedEdit("+json['posts'][i]['id']+");'><div class='item-content white'><div class='item-inner'><div class='item-title'>"+json['posts'][i]['childname']+ "&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;"+json['posts'][i]['childdob']+"</div></div></div></a></li><li><a href='ped_child_reports.html' class='item-link' onclick='childpedRep("+json['posts'][i]['id']+");'><div class='item-content white'><div class='item-inner'><div class='item-title'>Reports</div></div></div></a></li></ul>";

            $('#childhis').append(data);

        }
        }

    });
}

function childpedRep(id)
{
    var storedData1 = myApp.formGetData('logged_userId');
    myApp.showPreloader();

    setTimeout(function(){
        $('#pdfpedId').html('<a href="#" class="link icon-only"  style="color:white;border-right:1px white solid " onclick="ExportPdfPed('+id+');">ExportToPdf</a>');
    },500);

     var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=pediatricschild&columns=*&condition=id="+id;

        $.getJSON (url, function (json) {
         myApp.hidePreloader();

            $('#child_ped_Name').val( json['posts']['0']['childname'] );
            $('#child_ped_date').val( json['posts']['0']['childdob'] );
        });
        var url1=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=birthhistory&columns=*&condition=id="+id;

                 $.getJSON (url1, function (json) {
                     myApp.hidePreloader();

                var url2=  "http://www.healthrecordspro.com/ws.php?type=getidname&format=json&table=pediatricschild&condition=id="+id;
                    $.getJSON (url2, function (json) {
                     myApp.hidePreloader();
                        $('#birth_his_cname').val( json['posts']['0']['childname'] );
                        $('#birth_his_cname_id').val( json['posts']['0']['id'] );

                });
                        $('#birth_his_pb').val( json['posts']['0']['placeofbirth'] );

                        if(json['posts']['0']['induceddlabor'] == 1){
                            $('#birth_his_ail').attr('checked','checked');
                        }
                        if(json['posts']['0']['induceddlabor'] == 0){
                            $('#birth_his_ail1').attr('checked','checked');
                        }
                        $('#birth_his_dol').val( json['posts']['0']['duration'] );
                        $('#birth_his_pop').val( json['posts']['0']['gestationperiod'] );
                        if(json['posts']['0']['methodOfDelivery'] == 0){
                            $('#birth_his_mod').attr('checked','checked');
                        }
                        if(json['posts']['0']['methodOfDelivery'] == 1){
                            $('#birth_his_mod1').attr('checked','checked');
                        }
                        if(json['posts']['0']['methodOfDelivery'] == 2){
                            $('#birth_his_mod2').attr('checked','checked');
                        }
                        if(json['posts']['0']['methodOfDelivery'] == 3){
                            $('#birth_his_mod3').attr('checked','checked');
                        }
                        $('#birth_his_bw').val( json['posts']['0']['birthweight'] );
                        $('#birth_his_aps').val( json['posts']['0']['apgarscore'] );

                        if(json['posts']['0']['Antibiotic'] == 1){
                            $('#birth_his_abiot').attr('checked','checked');
                        }
                        if(json['posts']['0']['Antibiotic'] == 0){
                            $('#birth_his_abiot1').attr('checked','checked');
                        }
                        if(json['posts']['0']['bluespells'] == 1){
                            $('#birth_his_blsp').attr('checked','checked');
                        }
                        if(json['posts']['0']['bluespells'] == 0){
                            $('#birth_his_blsp1').attr('checked','checked');
                        }
                        if(json['posts']['0']['convulsions'] == 1){
                            $('#birth_his_co').attr('checked','checked');
                        }
                        if(json['posts']['0']['convulsions'] == 0){
                            $('#birth_his_co1').attr('checked','checked');
                        }
                        if(json['posts']['0']['jaundice'] == 1){
                            $('#birth_his_jaun').attr('checked','checked');
                        }
                        if(json['posts']['0']['jaundice'] == 0){
                            $('#birth_his_jaun1').attr('checked','checked');
                        }
                        if(json['posts']['0']['skinrash'] == 1){
                            $('#birth_his_skinr').attr('checked','checked');
                        }
                        if(json['posts']['0']['skinrash'] == 0){
                            $('#birth_his_skinr1').attr('checked','checked');
                        }
                        if(json['posts']['0']['hospitallonger'] == 1){
                            $('#birth_his_dcrihltm').attr('checked','checked');
                        }
                        if(json['posts']['0']['hospitallonger'] == 0){
                            $('#birth_his_dcrihltm1').attr('checked','checked');
                        }
                        if(json['posts']['0']['babyfed'] == 1){
                            $('#birth_his_hwbf').attr('checked','checked');
                        }
                        if(json['posts']['0']['babyfed'] == 0){
                            $('#birth_his_hwbf1').attr('checked','checked');
                        }
            });
        var url3 =  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=Developmentlhistory&columns=*&condition=id="+id;

     $.getJSON (url3, function (json) {
         myApp.hidePreloader();

            var url4=  "http://www.healthrecordspro.com/ws.php?type=getidname&format=json&table=pediatricschild&condition=id="+id;

                    $.getJSON (url4, function (json) {
                     myApp.hidePreloader();

                        $('#deve_his_chainame').val( json['posts']['0']['childname'] );
                        $('#deve_his_chn_id').val( json['posts']['0']['id'] );

                });

                        $('#deve_his_huh').val( json['posts']['0']['HoldUpHead'] );
                        $('#deve_his_rover').val( json['posts']['0']['RollOver'] );
                        $('#deve_his_sitsup').val( json['posts']['0']['sitUnsupported'] );
                        $('#deve_his_salone').val( json['posts']['0']['standAlone'] );
                        $('#deve_his_walk').val( json['posts']['0']['walk'] );
                        $('#deve_his_talk').val( json['posts']['0']['talk'] );
                        $('#deve_his_tt').val( json['posts']['0']['toilettrain'] );
                        $('#deve_his_fed').val( json['posts']['0']['feedhim'] );
                        $('#deve_his_dress').val( json['posts']['0']['dresshim'] );
            });
}

function getFamilyPreData()
{
    setTimeout(function(){
    var storedData1 = myApp.formGetData('logged_userId');
    // myApp.showPreloader();

    var url= "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=pediatricsfamilyhistory&columns=*&condition=customerId="+storedData1['userId'];
     $.getJSON (url, function (json) {
             // myApp.hidePreloader();
            var key, count = 0;
            for(key in json['posts']) {
                if(json['posts'].hasOwnProperty(key)) {
                count++;
            }
        }
        if(json['posts']==0){
                    var data = "No Records Found!!!";
                    $('#familypediahistory').append(data);
                }
                else
                {
                    var names = [];
                    for(i=0;i<count;i++){

                        var data = "<ul id='family_ped_his_ul_"+i+"'><li><a href='family_ped_history_form.html' class='item-link' onclick='familyPedHisEdit("+json['posts'][i]['id']+");'><div class='item-content white'><div class='item-inner'><div class='item-title' id='display_familypedhis_"+i+"'>"+json['posts'][i]['childliveswith']+"&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</div></div></div></a></li></ul>";

                        $('#familypediahistory').append(data);

                        var url1=  "http://www.healthrecordspro.com/ws.php?type=getidname&format=json&table=pediatricschild&condition=id="+json['posts']['0']['childid'];
                        jQuery.ajaxSetup({async:false});
                        $.getJSON (url1, function (json) {
                             myApp.showPreloader();
                            names.push(json);
                         });

                    }
                }
                for( var i=0; i<count;i++ ){
                    myApp.hidePreloader();
                    $('#display_familypedhis_'+i).append(names[i]['posts'][0]['childname']);
                }
        });
    },1000);

}

function getMedicalDirectorsData()
{
    var storedData1 = myApp.formGetData('logged_userId');
    // myApp.showPreloader();

    var url= "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=medical_legal_directors&columns=*&condition=user_id="+storedData1['userId'];

     $.getJSON (url, function (json) {
             // myApp.hidePreloader();

             var key, count = 0;

            for(key in json['posts']) {
                if(json['posts'].hasOwnProperty(key)) {
                count++;
            }
        }
        if(json['posts']==0){
                    var data = "No Records Found!!!";
                    $('#medicaldirectors').append(data);
                }
                else
                {

        for(i=0;i<count;i++){

            var data = "<ul id='medical_directors_ul_"+i+"'><li><a href='medicalandlegal_directives.html' class='item-link' onclick='medicallegalDirectorsEdit("+json['posts'][i]['director_id']+");'><div class='item-content white'><div class='item-inner'><div class='item-title'>"+json['posts'][i]['attorney_power']+ "&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;"+json['posts'][i]['email']+"</div></div></div></a></li></ul>";

            $('#medicaldirectors').append(data);

        }
        }

    });

}

function getImplantsAndMediData()
{
    setTimeout(function(){
    var storedData1 = myApp.formGetData('logged_userId');
    myApp.showPreloader();

    var url= "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=medicaldevices&columns=*&condition=customerId="+storedData1['userId'];

        $.getJSON (url, function (json) {
            myApp.hidePreloader();
            
            var key, count = 0;
            for(key in json['posts']) {
                if(json['posts'].hasOwnProperty(key)) {
                count++;
                }
            }
                if(json['posts']==0){
                    var data = "No Records Found!!!";
                    $('#implantsandmedicaldevices').append(data);
                }
                else
                {

                    for(i=0;i<count;i++){

                        var data = "<ul id='implants_medi_ul_"+i+"'><li><a href='implants_medicaldevices.html' class='item-link' onclick='implantsAndMediDevicesEdit("+json['posts'][i]['id']+");'><div class='item-content white'><div class='item-inner'><div class='item-title'>"+json['posts'][i]['physician']+ "&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;"+json['posts'][i]['type']+"</div></div></div></a></li></ul>";

                        $('#implantsandmedicaldevices').append(data);
                    }
                }

        });
    },500);
}

function getdentalhistoryData()
{
    setTimeout(function(){
        var storedData1 = myApp.formGetData('logged_userId');
        // myApp.showPreloader();

        var url= "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=dental_history&columns=*&condition=  user_id="+storedData1['userId'];

        $.getJSON (url, function (json) {
            // myApp.hidePreloader();

            var key, count = 0;
            for(key in json['posts']) {
                if(json['posts'].hasOwnProperty(key)) {
                count++;
                }
            }
                if(json['posts']==0){
                    var data = "No Records Found!!!";
                    $('#dentalhistory').append(data);
                }
                else
                {

                    for(i=0;i<count;i++){

                        var data = "<ul id='dental_his_ul_"+i+"'><li><a href='dental_history_form.html' class='item-link' onclick='dentalhistEdit("+json['posts'][i]['id']+");'><div class='item-content white'><div class='item-inner'><div class='item-title'>"+json['posts'][i]['dentist']+ "&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;"+json['posts'][i]['phone']+"</div></div></div></a></li></ul>";

                        $('#dentalhistory').append(data);

                    }
                }
        });
    },500);

}

function getObestetricData()
{
    setTimeout(function(){
    var storedData1 = myApp.formGetData('logged_userId');
    // myApp.showPreloader();

    var url= "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=obstetric_history&columns=*&condition=customerId="+storedData1['userId'];

        $.getJSON (url, function (json) {
             // myApp.hidePreloader();

            var key, count = 0;
            for(key in json['posts']) {
                if(json['posts'].hasOwnProperty(key)) {
                count++;
            }
        }
        if(json['posts']==0){
                    var data = "No Records Found!!!";
                    $('#obestric').append(data);
                }
                else
                {

        for(i=0;i<count;i++){

            var data = "<ul id='obestetric_his_ul_"+i+"'><li><a href='obestetric_history_form.html' class='item-link' onclick='obestetricHisDataEdit("+json['posts'][i]['id']+");'><div class='item-content white'><div class='item-inner'><div class='item-title'>"+json['posts'][i]['LivingName']+ "&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;"+json['posts'][i]['badyWeight']+"</div></div></div></a></li></ul>";

            $('#obestric').append(data);

        }
        }

    });
    },500);

}

function getgynecologicData()
{
    setTimeout(function(){
    var storedData1 = myApp.formGetData('logged_userId');
    myApp.showPreloader();

    var url= "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=womanGynecologic&columns=*&condition=customerId="+storedData1['userId'];

     $.getJSON (url, function (json) {
             myApp.hidePreloader();

            var key, count = 0;

            for(key in json['posts']) {
                if(json['posts'].hasOwnProperty(key)) {
                count++;
            }
        }
        if(json['posts']==0){
                    var data = "No Records Found!!!";
                    $('#gynecologic').append(data);
                }
                else
                {

        for(i=0;i<count;i++){

            var data = "<ul id='gynecologic_his_ul_"+i+"'><li><a href='gynecologic_history_form.html' class='item-link' onclick='gynecologicHisDataEdit("+json['posts'][i]['id']+");'><div class='item-content white'><div class='item-inner'><div class='item-title'>"+json['posts'][i]['ageOfFirstPeriod']+ "&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;"+json['posts'][i]['dateOfLastPapSmear']+"</div></div></div></a></li></ul>";

            $('#gynecologic').append(data);

        }
        }

    });
    },500);

}

function getwomenspregDatingData()
{
    setTimeout(function(){
    var storedData1 = myApp.formGetData('logged_userId');
        myApp.showPreloader();

    var url= "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=womanPregnancyDating&columns=*&condition=customerId="+storedData1['userId'];

     $.getJSON (url, function (json) {
             myApp.hidePreloader();

            var key, count = 0;
            for(key in json['posts']) {
                if(json['posts'].hasOwnProperty(key)) {
                count++;
            }
        }
        if(json['posts']==0){
                    var data = "No Records Found!!!";
                    $('#womenpreg').append(data);
                }
                else
                {

        for(i=0;i<count;i++){

            var data = "<ul id='womens_preg_dating_ul_"+i+"'><li><a href='womens_preg_dating_form.html' class='item-link' onclick='womensPregDatingEdit("+json['posts'][i]['id']+");'><div class='item-content white'><div class='item-inner'><div class='item-title'>"+json['posts'][i]['menstrualPeriod']+ "&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;"+json['posts'][i]['frequencyPeriodDays']+"</div></div></div></a></li></ul>";

            $('#womenpreg').append(data);
        }
        }

    });
    },500);
}

function getsocialhistoryData()
{
    setTimeout(function(){
    var storedData1 = myApp.formGetData('logged_userId');
    myApp.showPreloader();

    var url= "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=SocialHistory&columns=*&condition=customerId="+storedData1['userId'];

     $.getJSON (url, function (json) {
             myApp.hidePreloader();

            var key, count = 0;
            for(key in json['posts']) {
                if(json['posts'].hasOwnProperty(key)) {
                count++;
            }
        }
        if(json['posts']==0){
                    var data = "No Records Found!!!";
                    $('#socialhistory').append(data);
                }
                else
                {

        for(i=0;i<count;i++){

            var data = "<ul id='social_history_ul_"+i+"'><li><a href='social_history_form.html' class='item-link' onclick='socialHistoryEdit("+json['posts'][i]['id']+");'><div class='item-content white'><div class='item-inner'><div class='item-title'>"+json['posts'][i]['smokeCigarettes']+ "&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;"+json['posts'][i]['numberofPacks']+"</div></div></div></a></li></ul>";

            $('#socialhistory').append(data);

        }
        }

    });
    },500);
}

function getMonitoringEvoData()
{
    var storedData1 = myApp.formGetData('logged_userId');
    myApp.showPreloader();
    var url= "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=NutritionIntakeOutcomes&columns=*&condition=1";

    $.getJSON (url, function (json) {
            myApp.hidePreloader();

        var key, count = 0;
        for(key in json['posts']) {
            if(json['posts'].hasOwnProperty(key)) {
            count++;
            }
        }
        var count1=count;
        for(i=0;i<count;i++){
            if(json['posts'][i]['parent']==0){
                var data1="<h4>"+json['posts'][i]['name']+"</h4>";
                for(j=0;j<count1;j++){
                    if(json['posts'][i]['id']==json['posts'][j]['parent']){

                        data1 += '<ul style="background: #ffffff;margin-bottom: 0px;"><li ><div class="item-content"><div class="item-media"></div><div class="item-inner"><div class="item-title label">'+json['posts'][j]['name']+'</div><div class="item-input"><input type="text" name="name_'+json['posts'][j]['id']+'" id="value_'+json['posts'][j]['id']+'" placeholder="'+json['posts'][j]['name']+'" ></div></div></div></li></ul>';
                    }
                }
            $('#monitoring').append(data1);
            }

        }

    });

}

function monitoringData()
{
    var storedData1 = myApp.formGetData('logged_userId');
     myApp.showPreloader();

    var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=foodandnutrition&columns=*&condition=customerId="+storedData1['userId'];
}

function monitoringAndEvoDataSubmit()
{
    var storedData1 = myApp.formGetData('logged_userId');
    var url2=  "http://www.healthrecordspro.com/ws.php?type=delete&format=json&table=monitoringevaluation&columns=&condition=customerid="+storedData1['userId'];
    $.getJSON (url2, function (json) {
    });
    var url= "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=NutritionIntakeOutcomes&columns=*&condition=1";
    myApp.showPreloader();
        
        $.getJSON (url, function (json) {
            myApp.hidePreloader();
        var key, count = 0;
        for(key in json['posts']) {
            if(json['posts'].hasOwnProperty(key)) {
            count++;
            }
        }

        for(i=0;i<count;i++){

            if($('#value_'+i).val() != '' && $('#value_'+i).val() != undefined){
                var url1 = "http://www.healthrecordspro.com/ws.php?type=insert&format=json&table=monitoringevaluation&columns=customerid,intakeId,intakevalue&values='"+storedData1['userId']+"','"+i+"','"+$('#value_'+i).val()+"'";

                $.getJSON (url1, function (json) {

                    if( json['posts'][0] ){
                        myApp.alert("Your Details has been Created",'Success');
                        mainView.router.loadPage('nutrition_diet_practise.html');
                    }else{
                        myApp.alert("Your Details Not Created",'Failure');
                    }
                });
            }

        }

    });
}

function getGeneticHistory()
{
    var storedData1 = myApp.formGetData('logged_userId');
    myApp.showPreloader();
    var url= "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=womangeneticTypes&columns=*&condition=1";

    $.getJSON (url, function (json) {
        myApp.hidePreloader();

        var key, count = 0;
        for(key in json['posts']) {
            if(json['posts'].hasOwnProperty(key)) {
            count++;
            }
        }
        for(i=0;i<count;i++){

            var data1 = '<ul style="background: #ffffff;margin-bottom: 0px;"><li><div class="item-content"><div class="item-media"></div><div class="item-inner"><div class="item-title label">'+json['posts'][i]['name']+'</div><div class="item-input" style="margin-left: 74px;"><input type="checkbox" name="family_'+json['posts'][i]['id']+'" id="family_'+json['posts'][i]['id']+'" value="1"><input type="checkbox" name="partner_'+json['posts'][i]['id']+'" id="partner_'+json['posts'][i]['id']+'" value="1"></div></div></div></li></ul>';
            $('#genetichistory').append(data1);

        }

    });

        var url1= "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=WomanGeneticHistory&columns=*&condition=customerId="+storedData1['userId'];

        $.getJSON (url1, function (json) {
            myApp.hidePreloader();
            var key1, count1 = 0;
            for(key1 in json['posts']) {
                if(json['posts'].hasOwnProperty(key1)) {
                count1++;
                }
            }

            for(j=0;j<count1;j++){
                if(json['posts'][j]['YourFamily'] == 1)
                {
                    $('#family_'+json['posts'][j]['typeName']).attr('checked','checked');
                }
                if(json['posts'][j]['PartnerFamily'] == 1)
                {
                    $('#partner_'+json['posts'][j]['typeName']).attr('checked','checked');
                }

            }
    });
}

function geneticHisDataSubmit()
{
    var storedData1 = myApp.formGetData('logged_userId');
    var url1= "http://www.healthrecordspro.com/ws.php?type=delete&format=json&table=WomanGeneticHistory&columns=&condition=customerId="+storedData1['userId'];

    $.getJSON (url1, function (json) {

    });
    /*myApp.showPreloader();*/

    var url= "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=womangeneticTypes&columns=*&condition=1";

        $.getJSON (url, function (json) {
        /* myApp.hidePreloader();*/
            var key, count = 0;
            for(key in json['posts']) {
                if(json['posts'].hasOwnProperty(key)) {
                count++;
                }
            }

            for(i=1;i<=count;i++){
                if ((document.getElementById('family_'+i).checked) && (document.getElementById('partner_'+i).checked)) {

                    var url="http://www.healthrecordspro.com/ws.php?type=insert&format=json&table=WomanGeneticHistory&columns=customerId,typeName,YourFamily,PartnerFamily&values="+storedData1['userId']+","+i+",1,1";

                    $.getJSON (url, function (json) {
                        // myApp.hidePreloader();
                    });
                }
                else if ((document.getElementById('family_'+i).checked) || (document.getElementById('partner_'+i).checked)){
                    if(document.getElementById('family_'+i).checked){

                        var url="http://www.healthrecordspro.com/ws.php?type=insert&format=json&table=WomanGeneticHistory&columns=customerId,typeName,YourFamily,PartnerFamily&values="+storedData1['userId']+","+i+",1,0";

                        $.getJSON (url, function (json) {
                            // myApp.hidePreloader();
                        });

                    }else{

                        var url="http://www.healthrecordspro.com/ws.php?type=insert&format=json&table=WomanGeneticHistory&columns=customerId,typeName,YourFamily,PartnerFamily&values="+storedData1['userId']+","+i+",0,1";
                        // console.log( url );
                        $.getJSON (url, function (json) {
                            // myApp.hidePreloader();
                        });
                    }
                }
            }
        });
}

function getLabResults()
{
	setTimeout(function(){
	var storedData1 = myApp.formGetData('logged_userId');
	myApp.showPreloader();

	var url= "http://www.healthrecordspro.com/ws.php?type=getlabresults&format=json";

	$.getJSON (url, function (json) {
		myApp.hidePreloader();

		var key, count = 0;
		for(key in json['posts']) {
			if(json['posts'].hasOwnProperty(key)) {
			count++;
			}
		}
		// $('#cat_iiid').val(json['posts']['0']['catname']);
		for(i=0;i<count;i++){
			var labCatName = '"'+json['posts'][i]['catname']+'"';
			var data = "<ul><li><a href='labreports.html' class='item-link' onclick='getLabRecordsByCatId("+json['posts'][i]['id']+","+labCatName+");' ><div class='item-content white'><div class='item-inner'><div class='item-title'>"+json['posts'][i]['catname']+"</div></div></div></a></li></ul>";
			$('#labresults').append(data);

		}

	});
},500);

}
function getLabResults1(){
	tipID = 0;
	// mainView.router.loadPage('lab_results_main.html');
	var storedData1 = myApp.formGetData('logged_userId');
	myApp.showPreloader();

	var url= "http://www.healthrecordspro.com/ws.php?type=getlabresults&format=json";

	$.getJSON (url, function (json) {
		myApp.hidePreloader();

		var key, count = 0;
		for(key in json['posts']) {
			if(json['posts'].hasOwnProperty(key)) {
			count++;
			}
		}
		// $('#cat_iiid').val(json['posts']['0']['catname']);
		$('#labresults').html('');
		for(i=0;i<count;i++){
			var labCatName = '"'+json['posts'][i]['catname']+'"';
			var data = "<ul><li><a href='labreports.html' class='item-link' onclick='getLabRecordsByCatId("+json['posts'][i]['id']+","+labCatName+");' ><div class='item-content white'><div class='item-inner'><div class='item-title'>"+json['posts'][i]['catname']+"</div></div></div></a></li></ul> ";
			$('#labresults').append(data);

		}

	});
}
/* ################# Click Lab Results Main Page ################# */
var tipID
function getLabRecordsByCatId(Catid,labCatName)
{
	mainView.router.loadPage('urinalysis_listing.html');
	setTimeout(function(){
	$('#labresultsReports').html('<a href="LabResultsSectionReports.html" onclick="LabReportsDisplay('+Catid+',\''+labCatName + '\');" class="link icon-only" style="color:white">Reports</a>');
	},1000);
	/* ################# Urinilysis ################# */
	if(Catid==3){
		setTimeout(function(){
			var storedData1 = myApp.formGetData('logged_userId');
			
			// var url= "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=CustomerLabResults&columns=*&condition=catId="+Catid+" AND CustomerId="+storedData1['userId'];
			var urlurinanalysis = "http://healthrecordspro.com/ws.php?type=labresultsreportdatesdd&format=json&customerid="+storedData1['userId']+"&catid="+Catid;

			$.getJSON (urlurinanalysis, function (json) {

				var key, count = 0;
				for(key in json['posts']) {
					if(json['posts'].hasOwnProperty(key)) {
						count++;
					}
				}
				$('#labpage_heading_name').append(labCatName);
				if(json['posts']==0){

					var data = "No Records Found!!!";
					$('#urinalysis').append(data);
				}
				else
				{
				for(i=0;i<count;i++)
				{

					var labdate1 = '"'+json['posts'][i]['date']+'"';
					var data = "<ul id='pathalogy_ul_"+i+"'><li><a href='labreports.html' class='item-link' onclick='LabCategoryDataEdit("+Catid+","+storedData1['userId']+","+labdate1+",\""+labCatName+"\");'><div class='item-content white'><div class='item-inner'><div class='item-title'>"+json['posts'][i]['date']+"</div></div></div></a></li></ul>";

					$('#urinalysis').append(data);
				}
			}
			});
			var formName = '"'+labCatName+'"';
			var Urinalysis='Urinalysis';
			$('.toolbar-inner').append('<a href="labreports.html" onclick="getlabData('+Catid+',\'' + labCatName + '\');" class="link icon-only" style="color:white;border-right:1px white solid;"><i class="fa fa-plus-circle"></i>Add New</a><a href="manage_albums.html" onclick="manage_albums(11,\'' + Urinalysis + '\');" class="link icon-only" style="color:white;"><i class="fa fa-file-image-o"></i>Manage Images</a>');

		},500);
	}

	if(Catid==7){
		setTimeout(function(){
			var storedData1 = myApp.formGetData('logged_userId');

			// var url= "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=CustomerLabResults&columns=*&condition=catId="+Catid+" AND CustomerId="+storedData1['userId'];
			var urlHematology = "http://healthrecordspro.com/ws.php?type=labresultsreportdatesdd&format=json&customerid="+storedData1['userId']+"&catid="+Catid;

			$.getJSON (urlHematology, function (json) {
				var key, count = 0;
				for(key in json['posts']) {
					if(json['posts'].hasOwnProperty(key)) {
						count++;
					}
				}
				$('#labpage_heading_name').append(labCatName);
				if(json['posts']==0){
					var data = "No Records Found!!!";
					$('#urinalysis').append(data);
				}
				else
				{
					for(i=0;i<count;i++)
					{
						//var data = "<ul id='pathalogy_ul_"+i+"'> <li class='swipeout'><div class='swipeout-content item-content white' >"+json['posts'][i]['date']+"</div><div class='swipeout-actions-left'><a href='labreports.html' onclick='LabCategoryDataEdit("+Catid+","+json['posts'][i]['id']+");' class='action1 bg-orange'>EDIT</a><a href='#' onclick='LabCategoryDataDelete("+json['posts'][i]['id']+","+i+");' class='action1'>DELETE</a></div></li></ul>";
						var labdate1 = '"'+json['posts'][i]['date']+'"';
						var data = "<ul id='pathalogy_ul_"+i+"'><li><a href='labreports.html' class='item-link' onclick='LabCategoryDataEdit("+Catid+","+storedData1['userId']+","+labdate1+",\""+labCatName+"\");'><div class='item-content white'><div class='item-inner'><div class='item-title'>"+json['posts'][i]['date']+"</div></div></div></a></li></ul>";
						$('#urinalysis').append(data);
					}
				}
			});
				var formName = '"'+labCatName+'"';
				var Hematology='Hematology';
			$('.toolbar-inner').append('<a href="labreports.html" onclick="getlabData('+Catid+',\'' + labCatName + '\');" class="link icon-only" style="color:white;border-right:1px white solid;"><i class="fa fa-plus-circle"></i>Add New</a><a href="manage_albums.html" onclick="manage_albums(8,\'' + Hematology + '\');" class="link icon-only" style="color:white;"><i class="fa fa-file-image-o"></i>Manage Images</a>');
		},500);
	}

	if(Catid==9){
		setTimeout(function(){
			var storedData1 = myApp.formGetData('logged_userId');

			// var url= "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=CustomerLabResults&columns=*&condition=catId="+Catid+" AND CustomerId="+storedData1['userId'];

			var urlBloodChe = "http://healthrecordspro.com/ws.php?type=labresultsreportdatesdd&format=json&customerid="+storedData1['userId']+"&catid="+Catid;

			$.getJSON (urlBloodChe, function (json) {
				var key, count = 0;
				for(key in json['posts']) {
					if(json['posts'].hasOwnProperty(key)) {
						count++;
					}
				}
				$('#labpage_heading_name').append(labCatName);
				if(json['posts']==0)
				{
					var data = "No Records Found!!!";
					$('#urinalysis').append(data);
				}else{
					for(i=0;i<count;i++)
					{
						var labdate1 = '"'+json['posts'][i]['date']+'"';
						var data = "<ul id='pathalogy_ul_"+i+"'><li><a href='labreports.html' class='item-link' onclick='LabCategoryDataEdit("+Catid+","+storedData1['userId']+","+labdate1+",\""+labCatName+"\");'><div class='item-content white'><div class='item-inner'><div class='item-title'>"+json['posts'][i]['date']+"</div></div></div></a></li></ul>";
						$('#urinalysis').append(data);
					}
				}
			});
			var formName = '"'+labCatName+'"';
			var BloodChemistry = "Blood Chemistry";
			$('.toolbar-inner').append('<a href="labreports.html" onclick="getlabData('+Catid+',\'' + labCatName + '\');" class="link icon-only" style="color:white;border-right:1px white solid;"><i class="fa fa-plus-circle"></i>Add New</a><a href="manage_albums.html" class="link icon-only" onclick="manage_albums(10,\'' + BloodChemistry + '\');" style="color:white;"><i class="fa fa-file-image-o"></i>Manage Images</a>');
		},500);
	}

	if(Catid==11){
		setTimeout(function(){
			var storedData1 = myApp.formGetData('logged_userId');
			
			// var url= "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=CustomerLabResults&columns=*&condition=catId="+Catid+" AND CustomerId="+storedData1['userId'];
			var urlPathalogy = "http://healthrecordspro.com/ws.php?type=labresultsreportdatesdd&format=json&customerid="+storedData1['userId']+"&catid="+Catid;
			$.getJSON (urlPathalogy, function (json) {
				var key, count = 0;
				for(key in json['posts']) {
					if(json['posts'].hasOwnProperty(key)) {
						count++;
					}
				}
				$('#labpage_heading_name').append(labCatName);
				if(json['posts']==0){
					var data = "No Records Found!!!";
					$('#urinalysis').append(data);
				}else{
					for(i=0;i<count;i++)
					{
						var labdate1 = '"'+json['posts'][i]['date']+'"';
						var data = "<ul id='pathalogy_ul_"+i+"'><li><a href='labreports.html' class='item-link' onclick='LabCategoryDataEdit("+Catid+","+storedData1['userId']+","+labdate1+",\""+labCatName+"\");'><div class='item-content white'><div class='item-inner'><div class='item-title'>"+json['posts'][i]['date']+"</div></div></div></a></li></ul>";
						$('#urinalysis').append(data);
					}
				}
			});
			var formName = '"'+labCatName+'"';
			var PathologyCultureReports = "Pathology & Culture Reports";
			$('.toolbar-inner').append('<a href="labreports.html" onclick="getlabData('+Catid+',\'' + labCatName + '\');" class="link icon-only" style="color:white;border-right:1px white solid;"><i class="fa fa-plus-circle"></i>Add New</a><a href="manage_albums.html" onclick="manage_albums(13,\'' + PathologyCultureReports + '\');" class="link icon-only" style="color:white;"><i class="fa fa-file-image-o"></i>Manage Images</a>');
		},500);
	}
	if(Catid==12){
		setTimeout(function(){

			var storedData1 = myApp.formGetData('logged_userId');

			// var url= "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=CustomerLabResults&columns=*&condition=catId="+Catid+" AND CustomerId="+storedData1['userId'];
			var urlRadiology = "http://healthrecordspro.com/ws.php?type=labresultsreportdatesdd&format=json&customerid="+storedData1['userId']+"&catid="+Catid
			$.getJSON (urlRadiology, function (json) {
				var key, count = 0;
				for(key in json['posts']) {
					if(json['posts'].hasOwnProperty(key)) {
						count++;
					}
				}
				$('#labpage_heading_name').append(labCatName);
				if(json['posts']==0){
					var data = "No Records Found!!!";
					$('#urinalysis').append(data);
				}else{
					for(i=0;i<count;i++)
					{
						var labdate1 = '"'+json['posts'][i]['date']+'"';
						var data = "<ul id='pathalogy_ul_"+i+"'><li><a href='labreports.html' class='item-link' onclick='LabCategoryDataEdit("+Catid+","+storedData1['userId']+","+labdate1+",\""+labCatName+"\");'><div class='item-content white'><div class='item-inner'><div class='item-title'>"+json['posts'][i]['date']+"</div></div></div></a></li></ul>";
						$('#urinalysis').append(data);
					}
				}
			});
				var formName = '"'+labCatName+'"';
				var Radiology = "Radiology";
			$('.toolbar-inner').append('<a href="labreports.html" onclick="getlabData('+Catid+',\'' + labCatName + '\');" class="link icon-only" style="color:white;border-right:1px white solid;"><i class="fa fa-plus-circle"></i>Add New</a><a href="manage_albums.html" onclick="manage_albums(9,\'' + Radiology + '\');" class="link icon-only" style="color:white;"><i class="fa fa-file-image-o"></i>Manage Images</a>');
		},500);
	}
	if(Catid==13){
		setTimeout(function(){
			$('#labpage_heading_name').append(labCatName);
			mainView.router.loadPage('manage_albums.html');
			manage_albums(29,"Lab Results Other Reports");
			
		},500);

	}
}

/* ################# Click Lab Results Main Page -> Based on Category ID(Add New Form)   ################# */
function getlabData(Catid,formNamesss){
	setTimeout(function(){
		$("#labreports_inbtn").css('display','none'); 
		$("#labreports_upbtn").css('display','block');
		getLabCalandar();
		myApp.showPreloader();
	       setTimeout(function (){myApp.hidePreloader();},4000);
	var storedData1 = myApp.formGetData('logged_userId');
	var url= "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=labsRecords&columns=*&condition=Catid="+Catid;
	$.getJSON (url, function (json) {
		
		var key, count = 0;
		for(key in json['posts']) {
			if(json['posts'].hasOwnProperty(key)) {
				count++;
			}
		}
		
		$('#lab_heading').append(formNamesss);
		for(i=0;i<count;i++)
		{
			if (json['posts'][i]['defaultvalue'] == 1) {
				var data1 = '<ul style="background: #ffffff;margin-bottom: 0px;"><li ><div class="item-content"><div class="item-inner" style="padding-right: 0;"><div class="item-title label" style="font-size: 13px;">'+json['posts'][i]['name']+'</div><div class="item-input" style="width: 40%;"><input type="number" name="name_'+json['posts'][i]['lab_id']+'" id="value_'+json['posts'][i]['lab_id']+'" placeholder="value" style="font-size: 13px;"></div><div class="col-25" id="end_date" style="white-space: normal;word-wrap: break-word;width: 20%;font-size: 12px;">'+json['posts'][i]['normalvalue']+'</div></div></div></li></ul>';
				console.log(Catid);
				 if(Catid == '12'){
				 	if(i==3){
				 		data1 = '<ul style="background: #ffffff;margin-bottom: 0px; height:"><li ><div class="item-content"><div class="item-inner" style="padding-right: 0;"><div class="item-title label" style="font-size: 13px;">'+json['posts'][i]['name']+'</div><div class="item-input" style="width: 40%;"><textarea rows="30" name="name_'+json['posts'][i]['lab_id']+'" id="value_'+json['posts'][i]['lab_id']+'" placeholder="Result" style="font-size: 13px;height:144px"></textarea></div><div class="col-25" id="end_date" style="white-space: normal;word-wrap: break-word;width: 20%;font-size: 12px;">'+json['posts'][i]['normalvalue']+'</div></div></div></li></ul>';
				 	}
				 }
				 if(Catid == '11'){
					 	
					 		data1 = '<ul style="background: #ffffff;margin-bottom: 0px;margin-top:5px"><li ><div class="item-content"><div class="item-inner" style="padding-right: 0;"><div class="item-title label" style="font-size: 13px;">'+json['posts'][i]['name']+'</div><div class="item-input" style="width: 40%;"><textarea rows="30" name="name_'+json['posts'][i]['lab_id']+'" id="value_'+json['posts'][i]['lab_id']+'" placeholder="Enter text" style="font-size: 13px;height:144px;margin-top:2%""></textarea></div><div class="col-25" id="end_date" style="white-space: normal;word-wrap: break-word;width: 20%;font-size: 12px;">'+json['posts'][i]['normalvalue']+'</div></div></div></li></ul>';

					 	
					 }
				$('#labreports').append(data1);
				$('#cat_id').val(Catid);
			}
			
		}
		
	});

	},500);
}

function LabResTabValuesDis(chartId,labsId){
	var storedData1 = myApp.formGetData('logged_userId');
	var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=labsresults&columns=*&condition=userid="+storedData1['userId']+" AND categoryid="+chartId+" AND recordId="+labsId;

		$.getJSON (url, function (json) {

			console.log( json );
			var key, count = 0;
			for(key in json['posts']) {
				if(json['posts'].hasOwnProperty(key)) {
					// $("#table_data").append('<td><p>'+json['posts'][count]['value']+'</p></td>');
					$("#table_data").append('<tr><td>'+json['posts'][count]['value']+'</td></tr>');
				}
				count++;
			}
		});
}

function LabResTabValuesDis1(chartId,labsId){

	var storedData1 = myApp.formGetData('logged_userId');
	var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=labsresults_OtherField&columns=*&condition=customerId="+storedData1['userId']+" AND CatId="+chartId+" AND OtherFieldsId="+labsId;

		$.getJSON (url, function (json) {
			$("#table_data").append(json['posts'][0]['OtherValue']);
		});
}

function LabResTabValuesDisdate(chartId,labsId){

	var storedData1 = myApp.formGetData('logged_userId');
	myApp.showPreloader();
	var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=labsresults&columns=*&condition=userid="+storedData1['userId']+" AND categoryid="+chartId+" AND recordId="+labsId;

		$.getJSON (url, function (json) {
			myApp.hidePreloader();
			var key, count = 0;
			for(key in json['posts']) {
				if(json['posts'].hasOwnProperty(key)) {
					count++;
				}
			}
			for (var i = 0; i <count; i++) {
				$("#table_data").append('<tr id="valuesofda_'+i+'"><td>'+json['posts'][i]['date']+'</td></tr>');
			}
		});
}

function LabReportsDisplay(catId,headingNames){
	var storedData1 = myApp.formGetData('logged_userId');
	setTimeout(function(){
		var urlDisplayRNames = "http://healthrecordspro.com/ws.php?type=labresultsreporttests&format=json&customerid="+storedData1['userId']+"&catid="+catId;

		jQuery.ajaxSetup({async:false});
		$.getJSON (urlDisplayRNames, function (json) {
			$.each( json['posts'], function( key,value ) {
				$("#LabresultsTabledat").append('<th>'+value['recordName']+'</th>');
			});
		});
		var urlResults = "http://healthrecordspro.com/ws.php?type=labresultsreportdatesdd&format=json&customerid="+storedData1['userId']+"&catid="+catId;

		$.getJSON (urlResults, function (json) {
			var key, count = 0;
			for(key in json['posts']) {
				if(json['posts'].hasOwnProperty(key)) {
					count++;
				}
			}
			var datesArray=[];
			$.each( json['posts'], function( key,value ) {
				datesArray.push(value['date']);
			});
			for(var i=0;i<count;i++){
				var html = '';
				var urlDisplayValues = "http://healthrecordspro.com/ws.php?type=labresultsreportvaluesbydate&format=json&customerid="+storedData1['userId']+"&catid="+catId+"&date="+datesArray[i];
					html += '<tr><td>'+datesArray[i]+'</td>';
				$.getJSON (urlDisplayValues, function (json1){
					$.each( json1['posts'], function( key1,value1 ) {
						html += '<td>'+value1+'</td>';
					});
					html += '</tr>';
					$("#table_data").append( html );
				});
			}
		});
	},500);
}

/* ################## Edit Lad Records Data ######################### */

function LabCategoryDataEdit(Catid,CustomerLabResultsId,labdate,headingNamess)
{
	setTimeout(function(){
		$("#labreports_inbtn").css('display','block');
		$("#labreports_upbtn").css('display','none');
		$("#add1").css('display','none');
		getLabCalandar();
		addFieldsLabFields(0);

		var storedData1 = myApp.formGetData('logged_userId');
		myApp.showPreloader();
		var url = "http://www.healthrecordspro.com/ws.php?type=labresultsedit&format=json&customerid="+CustomerLabResultsId+"&date="+labdate+"&catid="+Catid;
		$.getJSON (url, function (json) {
			myApp.hidePreloader();
			var key, count = 0;
			for(key in json['posts']){
				if(json['posts'].hasOwnProperty(key)) {
					count++;
				}
			}
			$('#lab_heading').append(headingNamess);
			for(i=0;i<count;i++)
			{
				$('#date_LabResult').val(json['posts'][i]['date']);
				// if (json['posts'][i]['defaultvalue'] == 1) {
					var data1 = '<ul style="background: #ffffff;margin-bottom: 0px;"><li><div class="item-content"><div class="item-media"></div><div class="item-inner"><div class="item-title label" style="font-size: 13px;">'+json['posts'][i]['recordName']+'</div><div class="item-input" style="width: 20%;"><input type="number" class="lab_r_list" name="name_'+json['posts'][i]['recordId']+'" id="value_'+json['posts'][i]['recordId']+'" placeholder="'+json['posts'][i]['recordName']+'" style="font-size: 13px;width: 25%;" value='+json['posts'][i]['value']+'></div><div class="col-25" id="end_date" style="white-space: normal;word-wrap: break-word;width: 20%;font-size: 12px;">'+json['posts'][i]['normalvalue']+'</div></div><img src="img/chart.png" class="lab_ch_img" onclick="labRecordDataCharts('+Catid+','+json['posts'][i]['recordId']+');"/></div></li></ul>';
	
					$('#labreports').append(data1);
					$('#cat_id').val(Catid);
					$('#CustomerLabResults_Id').val(CustomerLabResultsId);
					if (Catid == '11') {
						$('.lab_ch_img').hide();
					}
					if (Catid == '12') {
						$('.lab_ch_img').hide();
					}
				// }
			}
		});
		setTimeout(function(){
			$('#labDeleteId').html('<a href="#" class="link icon-only" onclick="labReportsDataSubmit();" style="color:white;border-right:1px white solid ">Update</a><a href="#" onclick="LabCategoryDataDelete('+Catid+','+CustomerLabResultsId+');" class="link icon-only" style="color:white">Delete</a>');
			$('#labresultsReports').html('<a href="LabResultsSectionReports.html" onclick="LabReportsDisplay('+Catid+');" class="link icon-only" style="color:white">Reports</a>');
		},500);

	},1000);
}

function LabCategoryDataDelete(id,CustomerLabResults_Id)
{
	var storedData1 = myApp.formGetData('logged_userId');
	myApp.confirm('Are you sure','Delete');
	$( ".modal-button-bold" ).click(function() {
		myApp.showPreloader();
	var url2 =  "http://www.healthrecordspro.com/ws.php?type=delete&format=json&table=CustomerLabResults&columns=&condition=id="+CustomerLabResults_Id;

	$.getJSON (url2, function (json){

	});
	var url3 =  "http://www.healthrecordspro.com/ws.php?type=delete&format=json&table=labsresults&columns=&condition=CustomerLabResultsId="+CustomerLabResults_Id;
	$.getJSON (url3, function (json) {

	});
	var url5 =  "http://www.healthrecordspro.com/ws.php?type=delete&format=json&table=labsRecords_OtherField&columns=&condition=id="+CustomerLabResults_Id;
	$.getJSON (url5, function (json) {

	});
	var url4 =  "http://www.healthrecordspro.com/ws.php?type=delete&format=json&table=labsresults_OtherField&columns=&condition=CustomerLabResultsId="+CustomerLabResults_Id;
	$.getJSON (url4, function (json) {
		 myApp.hidePreloader();
		 getLabResults();
			mainView.router.loadPage('lab_results_main.html');

	});
});
}

/* ######################## Insert/Update The Lab Records Data ###################### */

function labReportsDataSubmit()
{
	var storedData1 = myApp.formGetData('logged_userId');
	var categoryid = $('#cat_id').val();

	var labCatName = [];

		var urldeleteLabResults = "http://www.healthrecordspro.com/ws.php?type=delete&format=json&table=labsresults&columns=&condition=categoryid="+categoryid+" AND date='"+$('#date_LabResult').val()+"' AND userid="+storedData1['userId'];
			$.getJSON (urldeleteLabResults, function (json2) {
				// console.log(urldeleteLabResults);
			});

		var url20= "http://www.healthrecordspro.com/ws.php?type=getlabresults&format=json";
		$.getJSON (url20, function (json1) {
			$.each( json1['posts'], function( key, val ) {
				labCatName.push(val['catname']);
				
				labCatName.push(json1['posts'][0]['catname']);
			});

		var urlGettingTests= "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=labsRecords&columns=*&condition=Catid="+categoryid;
		$.getJSON(urlGettingTests,function (json){
			arrayofid = new Array();
				var key, count = 0;
				for(key in json['posts']) {
					if(json['posts'].hasOwnProperty(key)) {
						arrayofid[count] = json['posts'][key]['lab_id'];
						count++;
					}
				}
				if ($('#date_LabResult').val() == '') {
					myApp.alert('Please Enter Date','Labresults');
				}else{
					for(i=0;i<=count;i++){

					var labCatName = json1['posts'][0]['catname'];
					if ($('#value_'+arrayofid[i]).val() != undefined && $('#value_'+arrayofid[i]).val() != '') {
						var urlInsertTests = "http://www.healthrecordspro.com/ws.php?type=insert&format=json&table=labsresults&columns=recordId,recordName,value,normalvalue,date,userid,categoryid&values='"+arrayofid[i]+"','"+json['posts'][i]['name']+"','"+$('#value_'+arrayofid[i]).val()+"','"+json['posts'][i]['normalvalue']+"','"+$('#date_LabResult').val()+"','"+storedData1['userId']+"','"+categoryid+"'";
						$.getJSON (urlInsertTests, function (json) {

						});
					}
				}
				if( json['posts'][0] )
				{
					getLabRecordsByCatId(categoryid,labCatName);
					myApp.alert("Your Details has been Created",'Success');
					mainView.router.loadPage('urinalysis_listing.html');
				}else{
					myApp.alert("Your Details Not Created",'Failure');
				}
				}
				
		});
	});
	if($('#count123').val() != 1)
	{
		for (var j=1; j<=$('#count123').val(); j++)
		{
			if ($('#lab_rec_text_val_'+j).val() != undefined && $('#lab_rec_text_val_'+j).val() != '' && $('#lab_rec_val_'+j).val() != undefined && $('#lab_rec_val_'+j).val() != '') {
				var urlInsertOthersField = "http://www.healthrecordspro.com/ws.php?type=insert&format=json&table=labsresults&columns=recordId,recordName,value,date,userid,categoryid&values="+j+",'"+$('#lab_rec_text_val_'+j).val()+"','"+$('#lab_rec_val_'+j).val()+"','"+$('#date_LabResult').val()+"','"+storedData1['userId']+"','"+categoryid+"'";
				$.getJSON (urlInsertOthersField, function (json1) {
					console.log(json1);
				});
			}
		}
	}
}

function labresultsOtherFields(lastinsertedid)
{
	var categoryid = $('#cat_id').val();
	var storedData1 = myApp.formGetData('logged_userId');

	if($('#count123').val() != 1)
	{
		for (var i = 2; i <= $('#count123').val(); i++)
		{
			if ($('#lab_rec_text_val_'+i).val() != '' && $('#lab_rec_val_'+i).val() != '') {
				var recordfield = $('#lab_rec_text_val_'+i).val();
				var recordvalue = $('#lab_rec_val_'+i).val();
				var measurementunit = $('#measurementsunits_'+i).val();
				// alert('Fields = '+recordfield+'Value = '+recordvalue);
				// var url="http://www.healthrecordspro.com/ws.php?type=insert&format=json&table=labsRecords_OtherField&columns=customerId,CatId,name,measureUnit&values='"+storedData1['userId']+"','"+categoryid+"','"+recordfield+"','"+measurementunit+"'";
				// $.getJSON (url, function (json) {
					// console.log( url );
					var url12="http://www.healthrecordspro.com/ws.php?type=insert&format=json&table=labsresults_OtherField&columns=customerId,CatId,OtherFieldName,OtherValue,CustomerLabResultsId,date&values='"+storedData1['userId']+"','"+categoryid+"','"+recordfield+"','"+recordvalue+"','"+lastinsertedid+"','"+$('#date_LabResult').val()+"'";
					$.getJSON (url12, function (json) {
					});
				// });
			}
		}
	}
	else{
		$('[id^="record_value_"]').each(function(){

			// var OtherFieldsId = $(this).attr('id').split('_');
			var url12="http://www.healthrecordspro.com/ws.php?type=insert&format=json&table=labsresults_OtherField&columns=customerId,CatId,OtherFieldName,OtherValue,CustomerLabResultsId,date&values='"+storedData1['userId']+"','"+categoryid+"','"+$(this).val()+"','"+$(this).val()+"','"+lastinsertedid+"','"+$('#date_LabResult').val()+"'";
			$.getJSON (url12, function (json) {
				console.log( url12 );
			});
		});
	}
}

function labRecordDataCharts(CatId,recordId)
{
	var storedData1 = myApp.formGetData('logged_userId');
	var value = [];
	var dateval = [];

	var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=labsresults&columns=*&condition=userid="+storedData1['userId']+" AND recordId="+recordId+" AND categoryid="+CatId; 

	$.getJSON (url, function (json) {
		var key, count = 0;
		for(key in json['posts']) {
			if(json['posts'].hasOwnProperty(key)) {
				if(json['posts'][count]['value'] != ''){

					string = json['posts'][count]['value'].toString();
					if(string != '')
					{
					string1 = json['posts'][count]['date'].toString();
					value.push(string);
					dateval.push(string1);
					content = value.toString();
					content1 = dateval.toString();
					}
				}
				count++;
			}
		}

		var popupHTML = '<div class="popup popup1">'+
							'<div class="content-block content-block1">'+
								'<div style="width: 100%;">'+
									'<div>'+
										'<canvas id="canvas" height="450" width="600"></canvas>'+
									'</div>'+
								'</div>'+
								'<table style="width:100%;">'+
									'<thead>'+
										'<tr>'+
											'<th>Date</th>'+
											'<th>Casts in</th>'+
										'</tr>'+
									'</thead>'+
									'<tbody>'+
									'<tr style="text-align:center"><td>'+string1+'</td><td>'+string+'</td></tr>'+
								'</tbody>'+
								'</table>'+
								'<p>Lab Record Chart</p>'+
								'<p><a href="#" style="color:black;float:right;margin-right: -13px; margin-top: -23px;" class="close-popup"><i class="fa fa-times-circle fa-2x" ></i></a></p>'+
							'</div>'+
						'</div>';

		myApp.popup(popupHTML);

		var lineChartData = {
			labels : content1.split(','),
			datasets : [
				{
					label: "",
					fillColor : "rgba(220,220,220,0.2)",
					strokeColor : "rgba(220,220,220,1)",
					pointColor : "rgba(220,220,220,1)",
					pointStrokeColor : "#fff",
					pointHighlightFill : "#fff",
					pointHighlightStroke : "rgba(220,220,220,1)",
					data : JSON.parse("[" + content + "]")
					// data : [10,20,30,10,60]
				}
			]
		}
		var ctx = document.getElementById("canvas").getContext("2d");
		window.myLine = new Chart(ctx).Line(lineChartData, {
			responsive: true
		});
	});
}

function labRecordDataChartsother(CatId,recordId)
{
	var storedData1 = myApp.formGetData('logged_userId');
	var value = [];
	var dateval = [];

	var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=labsresults_OtherField&columns=*&condition=customerId="+storedData1['userId']+" AND id="+recordId+" AND CatId="+CatId; 

	$.getJSON (url, function (json) {
		var key, count = 0;
		for(key in json['posts']) {
			if(json['posts'].hasOwnProperty(key)) {
				if(json['posts'][count]['OtherValue'] != ''){

					string = json['posts'][count]['OtherValue'].toString();
					if(string != '')
					{
					string1 = json['posts'][count]['date'].toString();
					value.push(string);
					dateval.push(string1);
					content = value.toString();
					content1 = dateval.toString();
					}
				}
				count++;
			}
		}

		var popupHTML = '<div class="popup popup1">'+
							'<div class="content-block content-block1">'+
								'<div style="width: 100%;">'+
									'<div>'+
										'<canvas id="canvas" height="450" width="600"></canvas>'+
									'</div>'+
								'</div>'+
								'<p>Lab Record Chart</p>'+
								'<p><a href="#" style="color:black;float:right;margin-right: -13px; margin-top: -23px;" class="close-popup"><i class="fa fa-times-circle fa-2x" ></i></a></p>'+
							'</div>'+
						'</div>';

		myApp.popup(popupHTML);

		var lineChartData = {
			labels : content1.split(','),
			datasets : [
				{
					label: "",
					fillColor : "rgba(220,220,220,0.2)",
					strokeColor : "rgba(220,220,220,1)",
					pointColor : "rgba(220,220,220,1)",
					pointStrokeColor : "#fff",
					pointHighlightFill : "#fff",
					pointHighlightStroke : "rgba(220,220,220,1)",
					data : JSON.parse("[" + content + "]")
					// data : [10,20,30,10,60]
				}
			]
		}
		var ctx = document.getElementById("canvas").getContext("2d");
		window.myLine = new Chart(ctx).Line(lineChartData, {
			responsive: true
		});
	});
}

function getbioData()
{
	var storedData1 = myApp.formGetData('logged_userId');
	// myApp.showPreloader();

	var url= "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=biochemicalandrisk&columns=*&condition=customerid="+storedData1['userId'];

	$.getJSON (url, function (json) {
		// myApp.hidePreloader();
		var key, count = 0;
		for(key in json['posts']) {
		if(json['posts'].hasOwnProperty(key)) {
				count++;
			}
		}
		if(json['posts']==0){
			var data = "No Records Found!!!";
			$('#biochemical').append(data);
		}
		else
		{
			for(i=0;i<count;i++){
			// var data = "<ul id='bio_chemical_ul_"+i+"'> <li class='swipeout'><div class='swipeout-content item-content white' >"+json['posts'][i]['height']+ "&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;"+json['posts'][i]['weight']+"</div><div class='swipeout-actions-left'><a href='bio_chemical_form.html' onclick='biochemicalDataEdit("+json['posts'][i]['id']+");' class='action1 bg-orange'>EDIT</a><a href='#' onclick='deleteBioChemical("+json['posts'][i]['id']+","+i+");' class='action1'>DELETE</a></div></li></ul>";
				var data = "<ul id='bio_chemical_ul_"+i+"'><li><a href='bio_chemical_form.html' class='item-link' onclick='biochemicalDataEdit("+json['posts'][i]['id']+");'><div class='item-content white'><div class='item-inner'><div class='item-title'>"+json['posts'][i]['height']+ "&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;"+json['posts'][i]['weight']+"</div></div></div></a></li></ul>";
				$('#biochemical').append(data);
			}
		}
	});
}

function gethospitalizationsData()
{
	var storedData1 = myApp.formGetData('logged_userId');
	myApp.showPreloader();

	var url= "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=hospitalizations&columns=*&condition=user_id="+storedData1['userId'];

		$.getJSON (url, function (json) {
			myApp.hidePreloader();

			var key, count = 0;
			for(key in json['posts']) {
				if(json['posts'].hasOwnProperty(key)) {
					count++;
				}
			}
			for(i=0;i<count;i++){			
				var data = "<ul id='hospitalization_ul_"+i+"'> <li class='swipeout'><div class='swipeout-content item-content white' >"+json['posts'][i]['hospital_name']+ "&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;"+json['posts'][i]['admission_date']+"</div><div class='swipeout-actions-left'><a href='hospitalization_form.html' onclick='hospitalizationEdit("+json['posts'][i]['id']+");' class='action1 bg-orange'>EDIT</a><a href='#' onclick='deletehospitalization("+json['posts'][i]['id']+","+i+");' class='action1'>DELETE</a></div></li></ul>";
				$('#hospitalization').append(data);
			}		
		});
}

function getdocCounsaltationData()
{
    var storedData1 = myApp.formGetData('logged_userId');
    // myApp.showPreloader();

    var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=doctors_consultation&columns=*&condition=user_id="+storedData1['userId'];

     $.getJSON (url, function (json) {
            // myApp.hidePreloader();

        var key, count = 0;
            for(key in json['posts']) {
                if(json['posts'].hasOwnProperty(key)) {
                count++;
            }
        }
        if(json['posts']==0){
                    var data = "No Records Found!!!";
                    $('#doctors_cunsaltation').append(data);
                }
                else
                {

        for(i=0;i<count;i++)

        {
            var data = "<ul id='emergency_contact_ul_"+i+"'><li><a href='doctors_counsaltation_form.html' class='item-link' onclick='docConEdit("+json['posts'][i]['id']+");'><div class='item-content white'><div class='item-inner'><div class='item-title'>"+json['posts'][i]['physician_name']+ "&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;"+json['posts'][i]['date']+"</div></div></div></a></li></ul>";

            $('#doctors_cunsaltation').append(data);
        }
        }

    });
}
function getmedihistoryData(){
    setTimeout(function(){
        var storedData1 = myApp.formGetData('logged_userId');
        // myApp.showPreloader();

        var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=illnessescustomers&columns=*&condition=customerId="+storedData1['userId'];

            $.getJSON (url, function (json) {
                // myApp.hidePreloader();

                var key, count = 0;
                for(key in json['posts']) {
                    if(json['posts'].hasOwnProperty(key)) {
                    count++;
                    }
                }
                var namesSpeciality = [];
                var namesSpecialityID = [];
                var editId = [];
                if(json['posts']==0){
                    var data = "No Records Found!!!";
                    $('#medicalhistory').append(data);
                }
                else
                {
                    for(var i=0; i < count;i++){
                        if(json['posts'][i]['stillActive'] == 0){
                            var data = "<ul id='medical_history_conditions_ul_"+i+"'><li ><a href='medical_history.html' class='item-link' onclick='medihistoryEdit("+json['posts'][i]['id']+");'><div class='item-content white'><div class='item-inner'><div class='item-title' id='display_medhis_"+i+"'></div></div></div></a></li></ul>";
                        $('#medicalhistory1').append(data);
                        }else{
                            var data = "<ul id='medical_history_conditions_ul_"+i+"'><li ><a href='medical_history.html' class='item-link' onclick='medihistoryEdit("+json['posts'][i]['id']+");'><div class='item-content white'><div class='item-inner'><div class='item-title' id='display_medhis_"+i+"'></div></div></div></a></li></ul>";
                        $('#medicalhistory').append(data);
                        }
                        namesSpecialityID.push(json['posts'][i]['illnessId']);
                        editId.push(json['posts'][i]['id']+"_"+json['posts'][i]['illnessId']);

                        // myApp.showPreloader();
                    }
                }
                // setTimeout(function(){
                for( var j=0; j<namesSpecialityID.length;j++ ){
                    myApp.showPreloader()
                    var url1=  "http://www.healthrecordspro.com/ws.php?type=getidname&format=json&table=illnesses&condition=id="+namesSpecialityID[j];
                    // myApp.hidePreloader();
                    jQuery.ajaxSetup({async:false});
                    $.getJSON (url1, function (json1) {
                        namesSpeciality.push(json1);
                    });
                    myApp.hidePreloader();
                    // $('#display_medhis_'+i).append(namesSpeciality[i]['posts'][0]['name']);
                }
                for( var k=0; k<namesSpeciality.length;k++ ){
                    if (json['posts'][k]['illnessId'] == '-1') {
                        $('#display_medhis_'+k).append(json['posts'][k]['other']);
                    }else{
                        $('#display_medhis_'+k).append(namesSpeciality[k]['posts'][0]['name']);
                    }
                }
            // },600);
            myApp.hidePreloader();
        });
    },1000);

}

function getAllergiesData()
{
    setTimeout(function(){
        var storedData1 = myApp.formGetData('logged_userId');
        // myApp.showPreloader();

        var url= "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=allergies&columns=*&condition=customerid="+storedData1['userId'];

        $.getJSON (url, function (json) {
                // myApp.hidePreloader();

                var key, count = 0;
                for(key in json['posts']) {
                    if(json['posts'].hasOwnProperty(key)) {
                    count++;
                    }
                }
                if(json['posts']==0){
                        var data = "No Records Found!!!";
                        $('#allergies').append(data);
                }
                else
                {
                    for(i=0;i<count;i++){

                        if(json['posts'][i]['type']=='1'){var type = 'DRUG';}else if(json['posts'][i]['type']=='2'){var type = 'FOOD';}else if(json['posts'][i]['type']=='3'){var type = 'ENVIRONMENTAL';}

                        var data = "<ul id='allergies_ul_"+i+"'><li><a href='allergies.html' class='item-link' onclick='allergiesEdit("+json['posts'][i]['id']+");'><div class='item-content white'><div class='item-inner'><div class='item-title'>"+type+" | "+json['posts'][i]['typename']+"</div></div></div></a></li></ul>";

                        $('#allergies').append(data);
                    }
                }

            });
    },500);
}

function getimmuData()
{
    setTimeout(function(){
    var storedData1 = myApp.formGetData('logged_userId');
    myApp.showPreloader();
    var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=immunizations&columns=*&condition=user_id="+storedData1['userId'];
    
     $.getJSON (url, function (json) {

        var key, count = 0;
            for(key in json['posts']) {
                if(json['posts'].hasOwnProperty(key)) {
                count++;
            }
        }
        if(json['posts']==0){
                    var data = "No Records Found!!!";
                    $('#immunizations').append(data);
                }
                else
                {
                    var names = [];
                    for(var i=0; i < count;i++){

                        var data = "<ul id='immunizations_ul_"+i+"'><li><a href='immunization.html' class='item-link' onclick='immunizationEdit("+json['posts'][i]['immunizations_id']+");'><div class='item-content white'><div class='item-inner'><div class='item-title' id='display_immunization_"+i+"'></div></div></div></a></li></ul>";
                        $('#immunizations').append(data);

                        var url1=  "http://www.healthrecordspro.com/ws.php?type=getidname&format=json&table=immunization_types&condition=immunizations_type_id="+json['posts'][i]['immunizations_type_id'];
                        jQuery.ajaxSetup({async:false});
                        $.getJSON (url1, function (json1) {
                            names.push(json1);
                        });
                    }
                }
                    for( var i=0; i<count;i++ ){
                        myApp.hidePreloader();
                        if (json['posts'][i]['immunizations_type_id'] == '-1') {
                            $('#display_immunization_'+i).append(json['posts'][i]['other']);
                        }else{
                            $('#display_immunization_'+i).append(names[i]['posts'][0]['type']);
                        }
                    }
        });
},600);
}

function getAboutData()
{
    //var storedData1 = myApp.formGetData('logged_userId');
    var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=pages&columns=*&condition=id=2";
    $.getJSON (url, function (json) {
        // console.log(json['posts'][0]['description']);
        $("#AboutUsContent").html(json['posts'][0]['description']);
    });

}

function getHealthIdData()
{
    var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=pages&columns=*&condition=id=26";

    $.getJSON (url, function (json) {
        // console.log(json['posts'][0]['description']);
        $("#HealthIdContent").html(json['posts'][0]['description']);
    });

}

function getFamilyAccountData()
{
    var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=pages&columns=*&condition=id=25";

    $.getJSON (url, function (json) {
        // console.log(json['posts'][0]['description']);
        $("#FamilyAcccContent").html(json['posts'][0]['description']);
    });

}

function getSelfData(){
	var storedData1 = myApp.formGetData('logged_userId');
	var urlgetResultsByDate= "http://www.healthrecordspro.com/ws.php?type=mychartsbydate&format=json&customerid="+storedData1['userId'];

	$.getJSON (urlgetResultsByDate, function (json) {
		$("#getallselfmonitoringchart").html('');
		$.each( json['posts'], function( key, val ) {
			if(json['posts']==0){
				var data = "No Records Found!!!";
				$('#getallselfmonitoringchart').append(data);
			}
			else
			{
				var Self_datess = val['date'];
				$("#getallselfmonitoringchart").append("<ul><li><a href='self_monitoring_charts.html' class='close-panel item-link' onclick='selfMonEdit(\""+Self_datess+"\");'><div class='item-content white'><div class='item-inner'><div class='item-title'>"+val['date']+"</div></div></div></a></li></ul>");
			}
		});
	});
}

function getDocAppData()
{
		myApp.showPreloader();
       // setTimeout(function (){myApp.hidePreloader();},3000);
    setTimeout(function(){
    	tipID = 0;

    var storedData1 = myApp.formGetData('logged_userId');
//    myApp.showPreloader();
    var url2 ="http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=doctors_appointment&columns=*&condition="+storedData1['userId']+"%20order%20by%20dateofappointment%20desc"
    var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=doctors_appointment&columns=*&condition=customerid="+storedData1['userId'];
    var urlz = "http://www.healthrecordspro.com/ws.php?type=doctorsappoitmentslist&format=json&userId="+storedData1['userId'];
		var Dspeciality;
		var Dname;
			var key, count = 0;
        $.getJSON(urlz,function(json){
        
            for(key in json['posts']) {
                if(json['posts'].hasOwnProperty(key)) {
                count++;
            }
        }


if(json['posts']==0){
            var data = "No Records Found!!!";
            $('#doctorsappointments').append(data);
        }
        else
        {
        	for(var i=0; i < count;i++){
        		  	Dspeciality = " | "+json['posts'][i]['name']; 
                	Dname = " | "+json['posts'][i]['first_name']+"  "+json['posts'][i]['last_name'] ;
                    var data = "<ul id='doc_appointment_ul_"+i+"'><li><a href='doctor_consultation.html' class='item-link' onclick='doctorsEdit("+json['posts'][i]['id']+");'><div class='item-content white'><div class='item-inner'><div class='item-title' id='display_dc_list_"+i+"'>"+json['posts'][i]['dateofappointment']+Dname+Dspeciality+" </div></div></div></a></li></ul>";
                     $('#doctorsappointments').append(data); 

            }
            
              
                     
        }

        });
			myApp.hidePreloader();
   },2000);


}
function deleteInsuItem()
{
    insurance_id = $('#update_health_insu').val();
    myApp.confirm('Are you sure','Delete');
    $( ".modal-button-bold" ).click(function() {

        var storedData1 = myApp.formGetData('logged_userId');
        myApp.showPreloader();

        var url=  "http://www.healthrecordspro.com/ws.php?type=delete&format=json&table=health_insurance&columns=&condition=insurance_id="+insurance_id;

        $.getJSON (url, function (json) {
            myApp.hidePreloader();
            // getInsuranceData();
            mainView.router.loadPage('insurance.html');
            // $("#health_insurance_ul_"+id).remove();
        });

    });

}

function deletefamilyPedHis(tableid,id)
{
    tableid = $('#fam_ped_his_update').val();
    myApp.confirm('Are you sure','Delete');

    $( ".modal-button-bold" ).click(function() {
        var storedData1 = myApp.formGetData('logged_userId');
         myApp.showPreloader();

        var url=  "http://www.healthrecordspro.com/ws.php?type=delete&format=json&table=pediatricsfamilyhistory&columns=&condition=id="+tableid;

        $.getJSON (url, function (json) {
            myApp.hidePreloader();
            // getFamilyPreData();
            mainView.router.loadPage('family_ped_his_listing.html');
            // $("#family_ped_his_ul_"+id).remove();
        });
    });
}

function deleteEmergencyContact()
{
    contact_id = $('#update_emergency_id').val();
    myApp.confirm('Are you sure','Delete');

    $( ".modal-button-bold" ).click(function() {
        var storedData1 = myApp.formGetData('logged_userId');
         myApp.showPreloader();
        var url=  "http://www.healthrecordspro.com/ws.php?type=delete&format=json&table=emergency_contacts&columns=&condition=contact_id="+contact_id;
        $.getJSON (url, function (json) {
             myApp.hidePreloader();
            // $("#emergency_contact_ul_"+id).remove();
            // getEmergencyContactData();
            mainView.router.loadPage('emergency_contact_listing.html');
        });
    });
}

function deletemedicaldirectors()
{
    director_id = $('#update_medicaldirec_id').val();
    myApp.confirm('Are you sure','Delete');

    $( ".modal-button-bold" ).click(function() {
        var storedData1 = myApp.formGetData('logged_userId');
        myApp.showPreloader();

        var url=  "http://www.healthrecordspro.com/ws.php?type=delete&format=json&table=medical_legal_directors&columns=&condition=director_id="+director_id;

        $.getJSON (url, function (json) {
            myApp.hidePreloader();
            // getMedicalDirectorsData();
            mainView.router.loadPage('medicalandlega_directives_listing.html');

            // $("#medical_directors_ul_"+id).remove();
        });
    });
}

function deletebirthPedHis()
{
    tableid = $('#birth_his_update').val();
    myApp.confirm('Are you sure','Delete');

    $( ".modal-button-bold" ).click(function() {
        var storedData1 = myApp.formGetData('logged_userId');
        myApp.showPreloader();

        var url=  "http://www.healthrecordspro.com/ws.php?type=delete&format=json&table=birthhistory&columns=&condition=id="+tableid;

        $.getJSON (url, function (json) {
            myApp.hidePreloader();
            // getBirthData();
            mainView.router.loadPage('birth_ped_his_listing.html');
            // $("#birth_ped_his_ul_"+id).remove();

        });
    });
}

function deletepastmediPedHis()
{
    tableid = $('#past_medi_his_update').val();
    myApp.confirm('Are you sure','Delete');

    $( ".modal-button-bold" ).click(function() {
        var storedData1 = myApp.formGetData('logged_userId');
        myApp.showPreloader();

        var url=  "http://www.healthrecordspro.com/ws.php?type=delete&format=json&table=pastmedicalhistory&columns=&condition=id="+tableid;

        $.getJSON (url, function (json) {
            myApp.hidePreloader();
            // getpastmediHis();
            mainView.router.loadPage('past_medical_his_listing.html');
            // $("#past_medi_ped_his_ul_"+id).remove();

        });
    });
}

function deletechildped()
{
    tableid = $('#child_ped_update').val();
    myApp.confirm('Are you sure','Delete');

    $( ".modal-button-bold" ).click(function() {
        var storedData1 = myApp.formGetData('logged_userId');
        myApp.showPreloader();

        var url=  "http://www.healthrecordspro.com/ws.php?type=delete&format=json&table=pediatricschild&columns=&condition=id="+tableid;

        $.getJSON (url, function (json) {
            myApp.hidePreloader();
            getchildData();
            mainView.router.loadPage('child_ped_his_listing.html');
            // $("#past_medi_ped_his_ul_"+id).remove();

        });
    });
}

function deletedevePedHis(tableid,id)
{
    tableid = $('#deve_his_update').val();
    myApp.confirm('Are you sure','Delete');

    $( ".modal-button-bold" ).click(function() {
        var storedData1 = myApp.formGetData('logged_userId');
        myApp.showPreloader();

        var url=  "http://www.healthrecordspro.com/ws.php?type=delete&format=json&table=Developmentlhistory&columns=&condition=id="+tableid;

        $.getJSON (url, function (json) {
            myApp.hidePreloader();
            // getDevelopmentHisData();
            mainView.router.loadPage('development_his_listing.html');
            // $("#dev_ped_his_ul_"+id).remove();

        });
    });
}

function deleteImplantsAndMedicalDevices()
{
    tableidid = $('#update_implants_id').val();
    myApp.confirm('Are you sure','Delete');

    $( ".modal-button-bold" ).click(function() {
        var storedData1 = myApp.formGetData('logged_userId');
        myApp.showPreloader();

        var url=  "http://www.healthrecordspro.com/ws.php?type=delete&format=json&table=medicaldevices&columns=&condition=id="+tableidid;

        $.getJSON (url, function (json) {
            myApp.hidePreloader();
            getImplantsAndMediData();
            mainView.router.loadPage('implants_medicaldevices_listing.html');
            // $("#implants_medi_ul_"+id).remove();

        });
    });
}

function deletedentalHis()
{
    tableidid = $('#dental_his_update').val();
    myApp.confirm('Are you sure','Delete');

    $( ".modal-button-bold" ).click(function() {
        var storedData1 = myApp.formGetData('logged_userId');
        myApp.showPreloader();

        var url=  "http://www.healthrecordspro.com/ws.php?type=delete&format=json&table=dental_history&columns=&condition=id="+tableidid;

        $.getJSON (url, function (json) {
            myApp.hidePreloader();
            // getdentalhistoryData();
            mainView.router.loadPage('dental_history_listing.html');
            // $("#dental_his_ul_"+id).remove();

        });
    });
}

function deleteobestetricHis()
{
    tableidid = $('#obe_his_update').val();
    myApp.confirm('Are you sure','Delete');

    $( ".modal-button-bold" ).click(function() {
        var storedData1 = myApp.formGetData('logged_userId');
         myApp.showPreloader();

        var url=  "http://www.healthrecordspro.com/ws.php?type=delete&format=json&table=obstetric_history&columns=&condition=id="+tableidid;

        $.getJSON (url, function (json) {
             myApp.hidePreloader();

            // $("#obestetric_his_ul_"+id).remove();
            // getObestetricData();
            mainView.router.loadPage('obestetric_history_listing.html');
        });
    });
}

function deletegynecologicHis()
{
    tableidid = $('#gyne_his_update').val();
    myApp.confirm('Are you sure','Delete');

    $( ".modal-button-bold" ).click(function() {
        var storedData1 = myApp.formGetData('logged_userId');
        myApp.showPreloader();

        var url=  "http://www.healthrecordspro.com/ws.php?type=delete&format=json&table=womanGynecologic&columns=&condition=id="+tableidid;

        $.getJSON (url, function (json) {
            myApp.hidePreloader();
            getgynecologicData();
            mainView.router.loadPage('gynecologic_history_listing.html');
            // $("#gynecologic_his_ul_"+id).remove();
        });
    });
}

function deletewomensPreg()
{
    tableidid = $('#womens_preg_dating_update').val();
    myApp.confirm('Are you sure','Delete');

    $( ".modal-button-bold" ).click(function() {
        var storedData1 = myApp.formGetData('logged_userId');
         myApp.showPreloader();

        var url=  "http://www.healthrecordspro.com/ws.php?type=delete&format=json&table=womanPregnancyDating&columns=&condition=id="+tableidid;

        $.getJSON (url, function (json) {
            myApp.hidePreloader();
            getwomenspregDatingData();
            mainView.router.loadPage('womens_preg_dating_listing.html');
            // $("#womens_preg_dating_ul_"+id).remove();

        });
    });
}

function deletesocialHistory(){
    tableidid = $('#social_his_update').val();
    myApp.confirm('Are you sure','Delete');

    $( ".modal-button-bold" ).click(function() {
        var storedData1 = myApp.formGetData('logged_userId');
        myApp.showPreloader();

        var url=  "http://www.healthrecordspro.com/ws.php?type=delete&format=json&table=SocialHistory&columns=&condition=id="+tableidid;

        $.getJSON (url, function (json) {
            myApp.hidePreloader();
            getsocialhistoryData();
            // $("#social_history_ul_"+id).remove();
            mainView.router.loadPage('social_history_listing.html');
        });
    });
}

function deletepathalogy(tableidid,id)
{
    myApp.confirm('Are you sure','Delete');

    $( ".modal-button-bold" ).click(function() {
        var storedData1 = myApp.formGetData('logged_userId');
        myApp.showPreloader();
        var url=  "http://www.healthrecordspro.com/ws.php?type=delete&format=json&table=pathology&columns=&condition=id="+tableidid;

        $.getJSON (url, function (json) {
            myApp.hidePreloader();
            $("#pathalogy_ul_"+id).remove();

        });

    });

}

function deleteBioChemical()
{
    tableidid = $('#bio_update').val();
    myApp.confirm('Are you sure','Delete');

    $( ".modal-button-bold" ).click(function() {
        var storedData1 = myApp.formGetData('logged_userId');
        myApp.showPreloader();

        var url=  "http://www.healthrecordspro.com/ws.php?type=delete&format=json&table=biochemicalandrisk&columns=&condition=id="+tableidid;

        $.getJSON (url, function (json) {
            myApp.hidePreloader();
            // getbioData();
            mainView.router.loadPage('bio_chemical_listing.html');
            // $("#bio_chemical_ul_"+id).remove();

        });
    });
}

function deletehospitalization(tableidid,id)
{
    myApp.confirm('Are you sure','Delete');

    $( ".modal-button-bold" ).click(function() {
        var storedData1 = myApp.formGetData('logged_userId');
        myApp.showPreloader();
        var url=  "http://www.healthrecordspro.com/ws.php?type=delete&format=json&table=hospitalizations&columns=&condition=id="+tableidid;
        $.getJSON (url, function (json) {
            myApp.hidePreloader();
            $("#hospitalization_ul_"+id).remove();
        });
    });
}

function deleteDocCon()
{
    id = $('#doc_cn1_update').val();
    myApp.confirm('Are you sure','Delete');

    $( ".modal-button-bold" ).click(function() {
        var storedData1 = myApp.formGetData('logged_userId');
         myApp.showPreloader();

        var url=  "http://www.healthrecordspro.com/ws.php?type=delete&format=json&table=doctors_consultation&columns=&condition=id="+id;

        $.getJSON (url, function (json) {
            myApp.hidePreloader();

            // $("#doc_counsul_ul_"+id).remove();
            // getdocCounsaltationData();
            mainView.router.loadPage('doctors_counsaltation_listing.html');

        });
    });

}

function physicalDelete()
{
    tableid = $('#physicalform_id').val();
    myApp.confirm('Are you sure','Delete');

    $( ".modal-button-bold" ).click(function() {
        var storedData1 = myApp.formGetData('logged_userId');
         myApp.showPreloader();

        var url=  "http://www.healthrecordspro.com/ws.php?type=delete&format=json&table=physicalexams&columns=&condition=id="+tableid;

        $.getJSON (url, function (json) {
            myApp.hidePreloader();
            // $("#physical_exams_vitals_ul_"+id).remove();
            // getPhysicalExamData();
            mainView.router.loadPage('physical_exam.html');

        });
    });

}

function deleteMedication()
{
    tableid = $('#medicationsform_id').val();
    myApp.confirm('Are you sure','Delete');

    $( ".modal-button-bold" ).click(function() {

        var storedData1 = myApp.formGetData('logged_userId');
        myApp.showPreloader();

        var url=  "http://www.healthrecordspro.com/ws.php?type=delete&format=json&table=medications&columns=&condition=id="+tableid;

        $.getJSON (url, function (json) {
            myApp.hidePreloader();

            // $("#medications_ul_"+id).remove();
            // getMedicationsData();
            mainView.router.loadPage('medications_listing.html');

        });
    });
}

function deleteselfItem()
{
    tableid = $('#update_id').val();
    myApp.confirm('Are you sure','Delete'); 

    $( ".modal-button-bold" ).click(function() {
        var storedData1 = myApp.formGetData('logged_userId');
        myApp.showPreloader();

        var url=  "http://www.healthrecordspro.com/ws.php?type=delete&format=json&table=mycharts&columns=&condition=id="+tableid;

        var url1=  "http://www.healthrecordspro.com/ws.php?type=delete&format=json&table=mychart_otherfield&columns=&condition=customerId="+storedData1['userId'];

        $.getJSON (url, function (json) {
            myApp.hidePreloader();

        });
        $.getJSON (url1, function (json) {
            myApp.hidePreloader();

            // $("#self_monitoring_ul_"+id).remove();
            // $('#getallselfmonitoringchart').html();
            mainView.router.loadPage('self_moni_listing_new.html');

        });
    });
}

function deleteHealthProvider()
{
    hcp_id = $('#update_healthpro_id').val();
    myApp.confirm('Are you sure','Delete');

    $( ".modal-button-bold" ).click(function() {
        var storedData1 = myApp.formGetData('logged_userId');
         myApp.showPreloader();

        var url=  "http://www.healthrecordspro.com/ws.php?type=delete&format=json&table=healthcare_providers&columns=&condition=hcp_id="+hcp_id;

        $.getJSON (url, function (json) {
            myApp.hidePreloader();

            // $("#health_providers_ul_"+id).remove();
            // gethealthProviderData();
            mainView.router.loadPage('health_provider_listing.html');
        });

    });

}

function deleteMediHistory()
{
     tableid = $('#update_medi_sdate').val();
    myApp.confirm('Are you sure','Delete');

    $( ".modal-button-bold" ).click(function() {
        var storedData1 = myApp.formGetData('logged_userId');
        myApp.showPreloader();

        var url=  "http://www.healthrecordspro.com/ws.php?type=delete&format=json&table=illnessescustomers&columns=&condition=id="+tableid;
        $.getJSON (url, function (json) {
                myApp.hidePreloader();

            // $("#medical_history_conditions_ul_"+id).remove();
            // getmedihistoryData();
            mainView.router.loadPage('medical_history_condi_listing.html');

        });

    });
}

function deleteAllergies()
{
    tableid = $('#allergies_id').val();
    myApp.confirm('Are you sure','Delete');

    $( ".modal-button-bold" ).click(function() {
        var storedData1 = myApp.formGetData('logged_userId');
         myApp.showPreloader();

        var url=  "http://www.healthrecordspro.com/ws.php?type=delete&format=json&table=allergies&columns=&condition=id="+tableid;

        $.getJSON (url, function (json) {
            myApp.hidePreloader();

            // $("#allergies_ul_"+id).remove();
            // getAllergiesData();
            mainView.router.loadPage('allergies_listing.html');
        });
    });
}

function deleteSurgeries()
{
    tableid = $('#surgeries_id').val();
    myApp.confirm('Are you sure','Delete');

    $( ".modal-button-bold" ).click(function() {
        var storedData1 = myApp.formGetData('logged_userId');
         myApp.showPreloader();

        var url=  "http://www.healthrecordspro.com/ws.php?type=delete&format=json&table=surgeries&columns=&condition=id="+tableid;

        $.getJSON (url, function (json) {
             myApp.hidePreloader();
            // $("#surgeries_ul_"+id).remove();
            // getSurgeriesData();
            mainView.router.loadPage('surgeries_listing.html');
        });
    });
}

function deleteImmunization()
{
    immunizations_id = $('#immunization_id').val();
    myApp.confirm('Are you sure','Delete');

    $( ".modal-button-bold" ).click(function() {
        var storedData1 = myApp.formGetData('logged_userId');
         myApp.showPreloader();

        var url=  "http://www.healthrecordspro.com/ws.php?type=delete&format=json&table=immunizations&columns=&condition=immunizations_id="+immunizations_id;

        $.getJSON (url, function (json) {
            myApp.hidePreloader();

            // $("#immunizations_ul_"+id).remove();
            getimmuData();
            mainView.router.loadPage('immunization_listing.html');

        });
    });
}

function deleteDocAppoint()
{
    tableid = $('#doctors_id').val();
    myApp.confirm('Are you sure','Delete');

    $( ".modal-button-bold" ).click(function() {
        var storedData1 = myApp.formGetData('logged_userId');
        myApp.showPreloader();

        var url=  "http://www.healthrecordspro.com/ws.php?type=delete&format=json&table=doctors_appointment&columns=&condition=id="+tableid;

        $.getJSON (url, function (json) {
            myApp.hidePreloader();
            // $("#doc_appointment_ul_"+id).remove();
            getDocAppData();
            mainView.router.loadPage('doctors_appoin_listing.html');

        });
    });
}
// On change of the Country the State Changed
function userState(id)
{

    var storedData1 = myApp.formGetData('logged_userId');

    var url="http://www.healthrecordspro.com/ws.php?type=select&format=json&table=state&limit=250&columns=state_id,state_name&condition=country_id="+id;
    // console.log(url);

    $.getJSON (url, function (json) {
        // console.log(json['posts']);
        var text = "";
        text += "<select name='primary_state' id='primary_state'>"
                        + "<option value='0'>Select</option>";

        $.each( json['posts'], function( key, val ) {
            //console.log(val['id']);
            text += "<option value='"+val['state_id']+"'>"+val['state_name']+"</option>";

        });
        text += "</select>";
        $("#stateid").html(text);
    });

}

//Belongs to User Profile

//start

function giveAlert()
{
    setTimeout(function(){
        var storedData1 = myApp.formGetData('logged_userId');
        myApp.showPreloader();

        var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=user_profile&columns=*&condition=user_id="+storedData1['userId'];
        document.getElementById("user_img_display").innerHTML = " ";
        $.getJSON (url, function (json) {
        	
             myApp.hidePreloader();
            $('#nameProfile').val( json['posts']['0']['first_name'] );
            console.log("called");
            $('#email').val( json['posts']['0']['email'] );
            $('#uname').val( json['posts']['0']['username'] );
            $('#lname').val( json['posts']['0']['last_name'] );
            $('#password').val( json['posts']['0']['password'] );
            $('#primary_country').val( json['posts']['0']['country'] );
            $('#per_dob').val( json['posts']['0']['date_of_birth'] );
            $('#primary_nationality').val( json['posts']['0']['nationality'] );
            $('#primary_city').val( json['posts']['0']['city'] );
            $('#middleName').val( json['posts']['0']['middle_name'] );
            $('#maidenName').val( json['posts']['0']['maiden_name'] );
            $('#primary_street').val( json['posts']['0']['street'] );

            userState( json['posts']['0']['country'] );

            $('#primary_state').val(json['posts']['0']['state']);
            $('#primary_zip').val( json['posts']['0']['zip_code'] );
            $('#primary_h_phone_no').val( json['posts']['0']['home_phone_number'] );
            $('#primary_w_phone_no').val( json['posts']['0']['work_phone_number'] );
            $('#primary_m_phone_no').val( json['posts']['0']['mobile_phone'] );
            $('#primary_gen').val( json['posts']['0']['gender'] );

            if(json['posts']['0']['metrics'] == 0)
            {

                $("#showUS").css('display','block');
                $("#showEUROPE").css('display','none');
                $('#user_height_f').val( json['posts']['0']['height_feet'] );
                $('#user_weight').val( json['posts']['0']['pounds'] );
                $('#user_height_i').val( json['posts']['0']['height_inches'] );

            }else if(json['posts']['0']['metrics'] == 1){

                $("#showUS").css('display','none');
                $("#showEUROPE").css('display','block');
                $('#user_height_cm').val( json['posts']['0']['height'] );
                $('#user_weight_kg').val( json['posts']['0']['weight'] );

            }
            document.getElementById("user_img_display").innerHTML = " ";
            $("img").remove("#user_img_display");

            $('#user_bmi').val( json['posts']['0']['bmi'] );
            $('#primary_m_status').val( json['posts']['0']['marital_status'] );
            if(json['posts']['0']['dobimage'] != '')
            {
                $('#dob_img_display').html('<img src="http://healthrecordspro.com/newsite/images/dateofbirth/'+json['posts']['0']['dobimage']+'" width="80%"  onclick="dobimagepopupdisplay(\''+json['posts']['0']['dobimage']+'\')">');
            }else{
                $('.remove_dob_btn').hide();
            }
            if(json['posts']['0']['image'] != '')
            {
                $('#user_img_display').html('<img src="http://healthrecordspro.com/newsite/images/user/'+json['posts']['0']['image']+'" style="height:150px;width:150px;border-radius:20%"   onclick="userimagepopupdisplay(\''+json['posts']['0']['image']+'\')">');
          
            }else{
                $('.remove_user_btn').hide();
            }

            var url1=  "http://www.healthrecordspro.com/ws.php?type=getidname&format=json&table=occupation&condition=id="+json['posts']['0']['occupation'];

            $.getJSON (url1, function (json) {
                // console.log(url1);
             myApp.hidePreloader();

            $('#comp_info_occu').val( json['posts']['0']['occupation_name'] );
            $('#comp_info_occu_id').val( json['posts']['0']['id'] );

         });
            $('#comp_info_compname').val( json['posts']['0']['company_name'] );
            $('#comp_info_compAddr').val( json['posts']['0']['company_address'] );
            $('#comp_info_compStreet').val( json['posts']['0']['company_street'] );
            
            $('#comp_info_compCity').val( json['posts']['0']['company_city'] );
            $('#comp_info_compZip').val( json['posts']['0']['company_zip_code'] );
            $('#comp_info_compCountry').val( json['posts']['0']['company_country'] );
            $('#comp_info_compPhone').val( json['posts']['0']['company_phone_number'] );
            $('#user_born_at').val( json['posts']['0']['hospitalbornat'] );
            $('#user_bgroop').val( json['posts']['0']['blood'] );
            

            var url2 = "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=scannedalbums&columns=*&condition=customerId="+storedData1['userId']+" AND categoryId=27";

                $.getJSON (url2, function (json) {
                    $.getJSON (url2, function (json){
                        var key, count = 0;
                        for(key in json['posts']) {
                            if(json['posts'].hasOwnProperty(key)) {
                                count++;
                            }
                        }

                        for (var i=0;i<count;i++)
                        {
                            $('#userImg_display_albm').append('<div style="width:150px;height:100px;border:1px solid #000;backgroud-color:#DDD;margin: auto;"  onclick="ViewUserProAlbumImages('+json['posts'][i]['id']+')"><a href = "user_pro_Albumimage_display.html"><p align="center" style="color:#000;">('+json['posts'][i]['title']+')</p></a><div>');
                        }
                    });
        myApp.hidePreloader();
    });
        });
        getPrefeHospitalData();
        getPreffPharmaData();
    },500);

}
$("#uP").on('click', function() {
	giveAlert();
	});
function dobimagepopupdisplay(id)
{

    var popupHTML = '<div class="popup popupImage">'+
                                '<div class="content-block  " >'+
                                    '<div style="width: 100%;">'+
                                        '<div>'+
                                            '<img src="http://healthrecordspro.com/newsite/images/dateofbirth/'+id+'" height="450" width="600" />'+
                                        '</div>'+
                                    '</div>'+
                                    '<p>Birth Image</p>'+
                                    '<p><a href="#" style="color:black;float:right;margin-right: -13px; margin-top: -23px;" class="close-popup"><i class="fa fa-times-circle fa-2x" ></i></a></p>'+
                                '</div>'+
                            '</div>';
    myApp.popup(popupHTML);
}

function userimagepopupdisplay(id)
{
    
    var popupHTML = '<div class="popup popupImage">'+
                                '<div class="content-block " >'+
                                    '<div style="width: 100%;">'+
                                        '<div>'+
                                            '<img src="http://healthrecordspro.com/newsite/images/user/'+id+'" height="450" width="600" />'+
                                        '</div>'+
                                    '</div>'+
                                    '<p>User Image</p>'+
                                    '<p><a href="#" style="color:black;float:right;margin-right: -13px; margin-top: -23px;" class="close-popup"><i class="fa fa-times-circle fa-2x" ></i></a></p>'+
                                '</div>'+
                            '</div>';
    myApp.popup(popupHTML);
}
function ViewUserProAlbumImages(id)
{
    setTimeout(function(){
    var storedData1 = myApp.formGetData('logged_userId');
    myApp.showPreloader();

    var url = "http://www.healthrecordspro.com/ws.php?type=select&format=json&table=scanneditems&columns=*&condition=userid="+storedData1['userId']+" AND albumid="+id;

    $.getJSON (url, function (json) {
        // console.log(json['posts']);
        $.getJSON (url, function (json){
            var key, count = 0;
            for(key in json['posts']) {
                if(json['posts'].hasOwnProperty(key)) {
                    count++;
                }
            }

            for (var i=0;i<count;i++)
            {
                $('#display_userpro_img').append('<img src="http://healthrecordspro.com/newsite/uploads/'+json['posts'][i]['image']+'" width="200" height="200" onclick="UserProimageAlbumpopupdisplay(\''+json['posts'][i]['image']+'\')">');
            }
        });
        myApp.hidePreloader();
    });
},1000);
}
function UserProimageAlbumpopupdisplay(id)
{
    var popupHTML = '<div class="popup popupImage">'+
                                '<div class="content-block  " >'+
                                    '<div style="width: 100%;">'+
                                        '<div>'+
                                            '<img src="http://healthrecordspro.com/newsite/uploads/'+id+'" height="450" width="600" />'+
                                        '</div>'+
                                    '</div>'+
                                    '<p>User Profile Image</p>'+
                                    '<p><a href="#" style="color:black;float:right;margin-right: -13px; margin-top: -23px;" class="close-popup"><i class="fa fa-times-circle fa-2x" ></i></a></p>'+
                                '</div>'+
                            '</div>';
    myApp.popup(popupHTML);
}

function getPrefeHospitalData(){

    var storedData1 = myApp.formGetData('logged_userId');
    // myApp.showPreloader();

    var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=customers_hospitals_references&columns=*&condition=customerId="+storedData1['userId'];
    $.getJSON (url, function (json) {
        
        var items = [];
        if(json['posts']['0'] != '0')
        {
            $('#PerfHospitalData').html('');
            $.each( json['posts'], function( key, val ) {

                $('#PerfHospitalData').append('<li><div class="item-content item-title_inner"><div class="item-inner"><div class="item-title label">Hospital</div><div class="item-input"><input type="text" name="pre_hospital" id="pre_hospital_'+key+'" value="'+val['hospital']+'" /></div></div></div></li><li><div class="item-content item-title_inner"><div class="item-inner"><div class="item-title label">Medical record number </div><div class="item-input"><input type="text" name="pref_me_re_no" id="pref_me_re_no_'+key+'" value="'+val['medicalrecord']+'" /></div></div></div></li><li><div class="item-content item-title_inner"><div class="item-inner"><div class="item-title label">Hospital telephone Number </div><div class="item-input"><input type="text" name="pre_ho_no" id="pre_ho_no_'+key+'" value="'+val['hospital_telephone_number']+'" /></div></div></div></li>');
                items.push(key);
            });
            $('#count').val((items.length)-1);
            // console.log(items);
        }
    });
}

function getPreffPharmaData(){

    var storedData1 = myApp.formGetData('logged_userId');

    var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=prefferedpharmacies&columns=*&condition=customerId="+storedData1['userId'];
    $.getJSON (url, function (json) {
        
        var items = [];
        if(json['posts']['0'] != '0')
        {
            $('#PerfPharmaData').html('');
            $.each( json['posts'], function( key, val ) {

                $('#PerfPharmaData').append('<li><div class="item-content item-title_inner"><div class="item-inner"><div class="item-title label">Pharmacy Name </div><div class="item-input"><input type="text" name="user_phar_name" id="user_phar_name_'+key+'" value="'+val['pharmacyName']+'" /></div></div></div><div class="item-content item-title_inner"><div class="item-inner"><div class="item-title label">Pharmacy Number  </div><div class="item-input" ><input type="text" name="user_phar_number" id="user_phar_number_'+key+'" value="'+val['pharmacy_number']+'" /></div></div></div></li>');
                items.push(key);
            });
            $('#phar_count').val((items.length)-1);
            // console.log(items);
        }
    });



}

//update forms
//user Profile
function userProfileUpdate(){
        uploadProfilePic();
    var storedData1 = myApp.formGetData('logged_userId');
    var preffhos = $('#count').val();

    var preffhos3 = $('#phar_count').val();

    var val = "last_name = '"+$('#lname').val()+"',first_name = '"+$('#nameProfile').val()+"',middle_name = '"+$('#middleName').val()+"',maiden_name = '"+$('#maidenName').val()+"',street = '"+$('#primary_street').val()+"',city = '"+$('#primary_city').val()+"',state = '"+$('#primary_state').val()+"',zip_code = '"+$('#primary_zip').val()+"',country = '"+$('#primary_country').val()+"',nationality = '"+$('#primary_nationality').val()+"',home_phone_number = '"+$('#primary_h_phone_no').val()+"',work_phone_number = '"+$('#primary_w_phone_no').val()+"',mobile_phone = '"+$('#primary_m_phone_no').val()+"',email = '"+$('#email').val()+"',password = '"+$('#password').val()+"',username = '"+$('#uname').val()+"',date_of_birth = '"+$('#per_dob').val()+"',gender = '"+$('#primary_gen').val()+"',height_feet = '"+$('#user_height_f').val()+"',height_inches = '"+$('#user_height_i').val()+"',pounds = '"+$('#user_weight').val()+"',bmi2 = '"+$('#user_bmi').val()+"',blood = '"+$('#user_bgroop').val()+"',marital_status = '"+$('#primary_m_status').val()+"',occupation = '"+$('#comp_info_occu').val()+"',company_name = '"+$('#comp_info_compname').val()+"',company_address = '"+$('#comp_info_compAddr').val()+"',company_street = '"+$('#comp_info_compStreet').val()+"',company_city = '"+$('#comp_info_compCity').val()+"',company_zip_code = '"+$('#comp_info_compZip').val()+"',company_country = '"+$('#comp_info_compCountry').val()+"',company_phone_number = '"+$('#comp_info_compPhone').val()+"',hospitalbornat = '"+$('#user_born_at').val()+"',height = '"+$('#user_height_cm').val()+"',weight = '"+$('#user_weight_kg').val()+"',bmi = '"+$('#user_bmi').val()+"'";
    myApp.showPreloader();

    var url="http://www.healthrecordspro.com/ws.php?type=update&format=json&table=user_profile&columns="+val+"&condition=user_id="+storedData1['userId'];

    var url1 = "http://www.healthrecordspro.com/ws.php?type=delete&format=json&table=customers_hospitals_references&condition=customerId="+storedData1['userId'];
    $.getJSON (url1, function (json) {});

    var url2 = "http://www.healthrecordspro.com/ws.php?type=delete&format=json&table=prefferedpharmacies&condition=customerId="+storedData1['userId'];
    $.getJSON (url2, function (json) {});

    // console.log(preffhos);
    // console.log(preffhos3);
    setTimeout(function(){
        for(i=0;i<=preffhos;i++)
        {
            var storedData1 = myApp.formGetData('logged_userId');
            var hospital = $('#pre_hospital_'+i).val();
            var medicalrecord = $('#pref_me_re_no_'+i).val();
            var hospital_telephone_number = $('#pre_ho_no_'+i).val();

            // var columnNa = "hospital,medicalrecord,hospital_telephone_number,customerId";
            // var columnVa = "'"+hospital+"','"+medicalrecord+"','"+hospital_telephone_number+"','"+storedData1['userId']+"'";
            // myApp.showPreloader();

            // var urlph = "http://www.healthrecordspro.com/ws.php?type=insert&format=json&table=customers_hospitals_references&columns="+columnNa+"&values="+columnVa+"";
            var urlph = "http://www.healthrecordspro.com/ws.php?type=insert&format=json&table=customers_hospitals_references&columns=hospital,medicalrecord,hospital_telephone_number,customerId&values='"+hospital+"','"+medicalrecord+"','"+hospital_telephone_number+"',"+storedData1['userId'];
            // console.log(urlph);
            $.getJSON (urlph, function (json) {
                // console.log(json);
            });
        }
    },1000);

    setTimeout(function(){
        for(j=0;j<=preffhos3;j++)
        {

            var storedData1 = myApp.formGetData('logged_userId');
            var pharmacyName = $('#user_phar_name_'+j).val();
            var pharmacy_number = $('#user_phar_number_'+j).val();
            
            // var columnNam = "pharmacyName,pharmacy_number,customerId";
            // var columnVal = "'"+pharmacyName+"','"+pharmacy_number+"','"+storedData1['userId']+"'";
            // myApp.showPreloader();

            // var urlpp = "http://www.healthrecordspro.com/ws.php?type=insert&format=json&table=prefferedpharmacies&columns="+columnNam+"&values="+columnVal+"";
            var urlpp = "http://www.healthrecordspro.com/ws.php?type=insert&format=json&table=prefferedpharmacies&columns=pharmacyName,pharmacy_number,customerId&values='"+pharmacyName+"','"+pharmacy_number+"',"+storedData1['userId'];
            // console.log(urlpp);
            $.getJSON (urlpp, function (json) {
                // console.log(json);
            });
        }
    },1000);

    $.getJSON (url, function (json) {
        myApp.hidePreloader();
        // console.log(json);
        if( json['posts'][0] )
        {
            myApp.alert("Your Details has been Created",'Success');
            mainView.router.loadPage('loginnormal.html');
        }else{
            myApp.alert("Your Details has been Created",'Success');
            mainView.router.loadPage('loginnormal.html');
        }

    });
}

//user profile End
function metricksUpdate()
{
    var storedData1 = myApp.formGetData('logged_userId');
        if (document.getElementById('sett_radio1').checked) {
            var rate_value = document.getElementById('sett_radio1').value;
        }
        if (document.getElementById('sett_radio2').checked) {
            var rate_value = document.getElementById('sett_radio2').value;
        }
        var val = "metrics = '"+rate_value+"'";

        var url="http://www.healthrecordspro.com/ws.php?type=update&format=json&table=user_profile&columns="+val+"&condition=user_id="+storedData1['userId']; 

        $.getJSON (url, function (json) {

            // if( json['posts'][0] ){
            //  myApp.alert("Your Details has been Created",'Success');
            //  mainView.router.loadPage('loginnormal.html');
            // }else{
            //  myApp.alert("Your Details Not Created",'Failure');
            // }

        });
        updateHomePageGrid();

}

//Display the Metrics of the Current User

function showmetrics()
{
    var storedData1 = myApp.formGetData('logged_userId');
    var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=user_profile&columns=metrics&condition=user_id="+storedData1['userId'];
    $.getJSON (url, function (json) {
    
        if(json['posts']['0']['metrics'] == 1)
        {
            document.getElementById("sett_radio2").checked = true;
        }else{
            document.getElementById("sett_radio1").checked = true;
        }
    });
showGridRadio();
}

function showMe (box)
{
    var chboxs = document.getElementsByName("c1");
    var vis = "none";
    for(var i=0;i<chboxs.length;i++) {
        if(chboxs[i].checked){
        vis = "block";
        break;
        }
    }
    document.getElementById(box).style.display = vis;
}

function showMe1 (box)
{
    var chboxs1 = document.getElementsByName("c2");
    var vis1 = "none";
    for(var i=0;i<chboxs1.length;i++) {
        if(chboxs1[i].checked){
        vis1 = "block";
        break;
        }
    }
    document.getElementById(box).style.display = vis1;
}

function showMe2 (box)
{
    var chboxs2 = document.getElementsByName("c3");
    var vis2 = "none";
    for(var i=0;i<chboxs2.length;i++) {
        if(chboxs2[i].checked){
        vis2 = "block";
        break;
        }
    }
    document.getElementById(box).style.display = vis2;
}

//user Homepage Display

function updateHomePageGrid(){
    var storedData1 = myApp.formGetData('logged_userId');

        if (document.getElementById('sett_ShowGrid_radio1').checked) {
            var view_type_home = document.getElementById('sett_ShowGrid_radio1').value;
        }
        if (document.getElementById('sett_ShowList_radio2').checked) {
            var view_type_home = document.getElementById('sett_ShowList_radio2').value;
        }
        var val1 = "view_type = '"+view_type_home+"'";

        var url1="http://www.healthrecordspro.com/ws.php?type=update&format=json&table=user_profile&columns="+val1+"&condition=user_id="+storedData1['userId']; 

        $.getJSON (url1, function (json) {
            selectHomepageDisplay();
        });
}

function showGridRadio(){
    var storedData1 = myApp.formGetData('logged_userId');
    var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=user_profile&columns=view_type&condition=user_id="+storedData1['userId'];
    $.getJSON (url, function (json) {
    
        if(json['posts']['0']['view_type'] == 1)
        {
            document.getElementById("sett_ShowList_radio2").checked = true;
        }else{
            document.getElementById("sett_ShowGrid_radio1").checked = true;
        }
    });
}
//physical add new

function physicalExamAddnew()
{
    setTimeout(function(){
        $("#physical_inbtn").css('display','none');
        $("#physical_upbtn").css('display','block');
        getphysicalCalendar();
        PhysicalExamVal(0);
        PhysicalExamSpeciality( '' );
        PhysicianNameExams(' ');
    },500);
    var storedData1 = myApp.formGetData('logged_userId');

    var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=user_profile&columns=metrics&condition=user_id="+storedData1['userId'];

    $.getJSON (url, function (json) {

        if(json['posts']['0']['metrics'] == 1)
        {
            $('#pev_metricheight').html('cm');
            $('#pev_metricweight').html('Kg');
            $('#pev_metrictemp').html('Fahrenheit');
        }
        if (json['posts']['0']['metrics'] == 0)
        {

            $('#pev_metricheight').html('inch');
            $('#pev_metricweight').html('Pounds');
            $('#pev_metrictemp').html('Celsius');
        }

    });

}

function getCalenderSelf()
{
    var calendarDefault = myApp.calendar({
    input: '#self_date',
    });
}
function getcalUserP(){
    var calendarDefault = myApp.calendar({
    input: '#per_dob',
    });
}
function getCalenderDoc()
{
    var calendarDefault = myApp.calendar({
    input: '#doc_cn1_dt',
    });
}
function getCalenderMedication()
{
    var calendarDefault = myApp.calendar({
    input: '#medi_datestarted',
    });
}
function getCalenderMedication1()
{
    var calendarDefault = myApp.calendar({
    input: '#medi_enddate',
    });
}
function getCalenderMedication2()
{
    var calendarDefault = myApp.calendar({
    input: '#medi_start_remind',
    });
}
function getCalenderMedication3()
{
    var calendarDefault = myApp.calendar({
    input: '#medi_end_remind',
    });
}
function getcalendarMedihis(ele)
{
    var calendarDefault = myApp.calendar({
    input: '#medi_sdate_'+ele,
    });
}
function getcalendarMedihis1(ele)
{
    var calendarDefault = myApp.calendar({
    input: '#medi_rdate_'+ele,
    });
}
function getCalenderChildPed()
{
    var calendarDefault = myApp.calendar({
    input: '#child_ped_date',
    });
}
function getLabCalandar()
{
    var calendarDefault = myApp.calendar({
    input: '#date_LabResult',
    });
}
function getDocAppointCalender()
{
    var calendarDefault = myApp.calendar({
    input: '#doc_apoint_dofapointment',
    });
}
function getDocAppointCalender1()
{
    var calendarDefault = myApp.calendar({
    input: '#doc_apoint_reminder_date',
    });
}
function getDocAppointCalender2()
{
    var calendarDefault = myApp.calendar({
    input: '#doc_apoint_sec_reminder_date',
    });
}

function ObestricCalendar()
{
    var calendarDefault = myApp.calendar({
    input: '#obe_his_date',
    });
}
function getGynaCalender()
{
    var calendarDefault = myApp.calendar({
    input: '#gyne_his_dolps',
    });
}
function getwomenPregDat()
{
    var calendarDefault = myApp.calendar({
    input: '#womens_preg_dating_ptd',
    });
}
function getSocialHCalendar()
{
    var calendarDefault = myApp.calendar({
    input: '#social_his_qd',
    });
}
function getfamipedcalendar()
{
    var calendarDefault = myApp.calendar({
    input: '#fam_ped_his_huh',
    });
}
function getfamipedcalendar1()
{
    var calendarDefault = myApp.calendar({
    input: '#fam_ped_his_dob',
    });
}
function dentalCalander()
{
    var calendarDefault = myApp.calendar({
    input: '#dental_his_daofladeex',
    });
}
function getimplantsCal()
{
    var calendarDefault = myApp.calendar({
    input: '#implants_meddevices_date',
    });
}
function getsuraddCal()
{
    var calendarDefault = myApp.calendar({
    input: '#sur_add_date',
    });
}
function getsurdisCal()
{
    var calendarDefault = myApp.calendar({
    input: '#sur_dis_date',
    });
}
function getimmuCalander(ele)
{
    var calendarDefault = myApp.calendar({
    input: '#boost1_'+ele,
    });
}
function getimmuCalander1(ele)
{
    var calendarDefault = myApp.calendar({
    input: '#boost2_'+ele,
    });
}
function getimmuCalander2(ele)
{
    var calendarDefault = myApp.calendar({
    input: '#boost3_'+ele,
    });
}
function getphysicalCalendar()
{
    var calendarDefault = myApp.calendar({
    input: '#physical_doe',
    });
}
function geteyeCalendar()
{
    var calendarDefault = myApp.calendar({
    input: '#eye_doe',
    });
}
 function logout(){

// var storedData = myApp.formStoreData('logged_userId', {
//                                    'userId':''
//                    });
	 localStorage.removeItem("");

mainView.router.loadPage('index.html');
}

// function formCalender(){
//  var calendarDefault = myApp.calendar({
//      input: '#dob',
//  });
// }

function getSignUpData(){
    setTimeout(function(){
        // formCalender();
        FormCountry();
        RegistrationDate();
    },500);
}

function getHealthCalendarData(){

    var storedData1 = myApp.formGetData('logged_userId');

    var url= "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=doctors_appointment&columns=*&condition=customerid="+storedData1['userId'];

    $.getJSON (url, function (json) {
        var key, count = 0;
            for(key in json['posts']) {
                if(json['posts'].hasOwnProperty(key)) {
                count++;
            }
        }
        var names = [];
        var phyname = [];

        for(i=0;i<count;i++){

        var html = '<div class="card" id="doctorscard_ul_'+i+'"><div class="card-header"><span id="physname_'+i+'"></span></div><div class="card-content"><div class="card-content-inner">Specialty: <span id="docspec_'+i+'"></span> Date of Appointment : '+json['posts'][i]['dateofappointment']+'Time : '+json['posts'][i]['time']+' Reminder date: '+json['posts'][i]['reminderdate']+' Reminder Time: '+json['posts'][i]['remindertime']+'</div></div><div class="card-footer">Date of Appointment : '+json['posts'][i]['dateofappointment']+'<i class="fa fa-pencil"><a href="doctor_consultation.html" class="link" style="color: #007aff;font-size: 15px;" onclick="doctorsEdit('+json['posts'][i]['id']+');"></i></a><i class="fa fa-trash-o"><a href="#" class="link" style="color: #007aff;font-size: 15px;" onclick="deleteDocAppointCard('+json['posts'][i]['id']+','+i+');"></i></a></div></div>';

        $('#healthcalendarcontent').append(html);

                var url1= "http://www.healthrecordspro.com/ws.php?type=getidname&format=json&table=doctors_speciality&condition=id="+json['posts']['0']['specialty'];

                myApp.showPreloader();

                $.getJSON (url1, function (json) {
                            names.push(json);
                });

                var url2=  "http://www.healthrecordspro.com/ws.php?type=getidname&format=json&table=healthcare_providers&condition=hcp_id="+json['posts']['0']['physicianname'];
                    $.getJSON (url2, function (json) {
                            myApp.hidePreloader();
                            phyname.push(json);
                    });
        }
        setTimeout(function(){
            //  alert( totalTime );
            for( var i=0; i<count;i++ )
            {
                $('#docspec_'+i).html(names[i]['posts'][0]['name']);
                $('#physname_'+i).html(phyname[i]['posts'][0]['first_name']);
            }
        },1000);

        var url3=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=medications&columns=*&condition=customerId="+storedData1['userId'];

        $.getJSON (url3, function (json) {

            for(j=0;j<count;j++){

            var data = '<div class="card" id="medicationscard_ul_'+j+'"><div class="card-header">'+json['posts'][j]['name']+'</div><div class="card-content"><div class="card-content-inner">Dosage: '+json['posts'][j]['dosage']+': Start Date :'+json['posts'][j]['dateStarted']+' </div></div><div class="card-footer">Date  Started : '+json['posts'][j]['dateStarted']+'<i class="fa fa-pencil"><a href="medications.html" class="link" style="color: #007aff;font-size: 15px;" onclick="medicationEdit('+json['posts'][j]['id']+');"></i></a><i class="fa fa-trash-o"><a href="#"  class="link" style="color: #007aff;font-size: 15px;" onclick="deleteCardMedication('+json['posts'][j]['id']+','+j+');"></i></a></div></div>';

        $('#medicationcalendarcontent').append(data);

            }

        });
    });
}

function deleteCardMedication(tableid,id)
{
    myApp.confirm('Are you sure','Delete');
        $( ".modal-button-bold" ).click(function() {
            var storedData1 = myApp.formGetData('logged_userId');
             myApp.showPreloader();
            var url=  "http://www.healthrecordspro.com/ws.php?type=delete&format=json&table=medications&columns=&condition=id="+tableid;

            $.getJSON (url, function (json) {
                myApp.hidePreloader();
                $("#medicationscard_ul_"+id).remove();

            });
        });
}

function deleteDocAppointCard(tableid,id)
{
    myApp.confirm('Are you sure','Delete');

    $( ".modal-button-bold" ).click(function() {
        var storedData1 = myApp.formGetData('logged_userId');
        myApp.showPreloader();
        var url=  "http://www.healthrecordspro.com/ws.php?type=delete&format=json&table=doctors_appointment&columns=&condition=id="+tableid;

        $.getJSON (url, function (json) {
             myApp.hidePreloader();
            $("#doctorscard_ul_"+id).remove();

        });
    });
}

function getFoodData(customerId)
{

    var storedData1 = myApp.formGetData('logged_userId');
     myApp.showPreloader();

    var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=foodandnutrition&columns=*&condition=customerId="+storedData1['userId'];

        $.getJSON (url, function (json) {
            myApp.hidePreloader();
            $('#food_nut_his_cal').val( json['posts']['0']['energyintake'] );
            $('#food_nut_his_ecin').val( json['posts']['0']['estimatedenergy'] );
            $('#food_nut_his_cff').val( json['posts']['0']['caloriesfromfat'] );
            $('#food_nut_his_calfcar').val( json['posts']['0']['fromcarbohydrate'] );

            if(json['posts']['0']['dairyfoods'] == 1){
                $('#food_con_yes').attr('checked','checked');
            }
            if(json['posts']['0']['dairyfoods'] == 0){
                $('#food_con_no').attr('checked','checked');
            }
            $('#food_nut_his_servday').val( json['posts']['0']['servingsforday'] );
            if(json['posts']['0'][' dinesaway'] == 1){
                $('#food_dines_yes').attr('checked','checked');
            }
            if(json['posts']['0'][' dinesaway'] == 0){
                $('#food_dines_no').attr('checked','checked');
            }
            $('#food_nut_his_tpw').val( json['posts']['0']['timesPerweek'] );
            $('#food_nut_his_loc').val( json['posts']['0']['locations'] );
            $('#food_nut_his_res').val( json['posts']['0']['restaurants'] );
            $('#food_nut_his_ff').val( json['posts']['0']['fastfoot'] );
            if(json['posts']['0'][' readsfood'] == 1){
                $('#food_reads_yes').attr('checked','checked');
            }
            if(json['posts']['0'][' readsfood'] == 0){
                $('#food_reads_no').attr('checked','checked');
            }
            if(json['posts']['0'][' modifiesfood'] == 1){
                $('#food_modifies_yes').attr('checked','checked');
            }
            if(json['posts']['0'][' modifiesfood'] == 0){
                $('#food_modifies_no').attr('checked','checked');
            }
            if(json['posts']['0'][' portionsizes'] == 1){
                $('#food_limitp_yes').attr('checked','checked');
            }
            if(json['posts']['0'][' portionsizes'] == 0){
                $('#food_limitp_no').attr('checked','checked');
            }
            if(json['posts']['0'][' vitaminsandminerals'] == 1){
                $('#food_maintain_yes').attr('checked','checked');
            }
            if(json['posts']['0'][' vitaminsandminerals'] == 0){
                $('#food_maintain_no').attr('checked','checked');
            }
            if(json['posts']['0']['activitylevel'] == 1){
                $('#food_phya_sed').attr('checked','checked');
            }
            if(json['posts']['0']['activitylevel'] == 2){
                $('#food_phya_low').attr('checked','checked');
            }
            if(json['posts']['0']['activitylevel'] == 3){
                $('#food_phya_act').attr('checked','checked');
            }
            if(json['posts']['0']['activitylevel'] == 4){
                $('#food_phya_vact').attr('checked','checked');
            }
            $('#food_nut_his_spe').val( json['posts']['0']['specify'] );
            $('#food_nut_his_mod').val( json['posts']['0']['moderate'] );
            $('#food_nut_his_vig').val( json['posts']['0']['vigorous'] );
            $('#food_nut_his_set').val( json['posts']['0']['sedentarytime'] );
            $('#update_food').val( json['posts']['0']['id'] );

        });


}

function getsocialsafetyData(customerId)
{
    setTimeout(function(){
    var storedData1 = myApp.formGetData('logged_userId');
    myApp.showPreloader();
    var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=socialsafety&columns=*&condition=customerId="+storedData1['userId'];

    $.getJSON (url, function (json) {
        myApp.hidePreloader();
        // console.log(json['posts'][0]['name']);

        $('#social_safety_wdulw').val( json['posts']['0']['livewith'] );
        if(json['posts']['0']['cats'] == 1){
            $('#social_safety_duhacyh').attr('checked','checked');
        }
        if(json['posts']['0']['cats'] == 0){
            $('#social_safety_duhacyh1').attr('checked','checked');
        }
            $('#social_safety_wctlb').val( json['posts']['0']['lifterbox'] );
        if(json['posts']['0'][' smokealarms'] == 1){
            $('#social_safety_dyhwsal').attr('checked','checked');
        }
        if(json['posts']['0'][' smokealarms'] == 0){
            $('#social_safety_dyhwsal1').attr('checked','checked');
        }
        if(json['posts']['0'][' gunsinhome'] == 1){
            $('#social_safety_atagih').attr('checked','checked');
        }
        if(json['posts']['0'][' gunsinhome'] == 0){
            $('#social_safety_atagih1').attr('checked','checked');
        }
        $('#social_safety_atlups').val( json['posts']['0']['lockedup'] );
        $('#social_safety_dyharp').val( json['posts']['0']['religiousPref'] );
        $('#social_safety_wiyre').val( json['posts']['0']['ethnicity'] );
        $('#social_safety_pl').val( json['posts']['0']['language'] );
        $('#social_safety_htbhv').val( json['posts']['0']['history'] );
        $('#social_safety_hmyoeyh').val( json['posts']['0']['yearsofeducation'] );
        $('#social_safety_tod').val( json['posts']['0']['typeofDegree'] );
        $('#social_safety_wiyo').val( json['posts']['0']['occupation'] );
        $('#social_safety_poc').val( json['posts']['0']['partneroccupation'] );
        $('#social_safety_update').val( json['posts']['0']['id'] );

    });
},500);
}

function getsexcualActivityData(customerId)
{
    setTimeout(function(){
    var storedData1 = myApp.formGetData('logged_userId');
     myApp.showPreloader();

     var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=sexualactivity&columns=*&condition=customerId="+storedData1['userId'];  

     $.getJSON (url, function (json) {
         myApp.hidePreloader();

            if(json['posts']['0']['sexualactivity'] == 1){
                $('#sexual_his_cur').attr('checked','checked');
            }
            if(json['posts']['0']['sexualactivity'] == 2){
                $('#sexual_his_cur1').attr('checked','checked');
            }
            $('#sexual_his_partner').val( json['posts']['0']['partnername'] );
            if(json['posts']['0']['sexualpartner'] == 0){
                $('#sexual_his_havbeen').attr('checked','checked');
            }
            if(json['posts']['0']['sexualpartner'] == 1){
                $('#sexual_his_havbeen1').attr('checked','checked');
            }
            if(json['posts']['0']['sexualpartner'] == 2){
                $('#sexual_his_havbeen2').attr('checked','checked');
            }
            $('#sexual_his_bc').val( json['posts']['0']['controlmethod'] );
            $('#sexual_his_update').val( json['posts']['0']['id'] );

        });
    },500);
}

function getactivitydailyData(CustomerId)
{
    setTimeout(function(){
    var storedData1 = myApp.formGetData('logged_userId');
     myApp.showPreloader();
     var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=activitiesofdailyLiving&columns=*&condition=CustomerId="+storedData1['userId'];

        $.getJSON (url, function (json) {
            myApp.hidePreloader();

        if(json['posts']['0']['military'] == 1){
            $('#activity_daily_hyesim').attr('checked','checked');
        }
        if(json['posts']['0']['military'] == 2){
            $('#activity_daily_hyesim1').attr('checked','checked');
        }
        if(json['posts']['0']['transfusion'] == 1){
            $('#activity_daily_hyebt').attr('checked','checked');
        }
        if(json['posts']['0']['transfusion'] == 2){
            $('#activity_daily_hyebt1').attr('checked','checked');
        }
        if(json['posts']['0']['caffeine'] == 1){
            $('#activity_daily_dyhacac').attr('checked','checked');
        }
        if(json['posts']['0']['caffeine'] == 2){
            $('#activity_daily_dyhacac1').attr('checked','checked');
        }
        if(json['posts']['0']['occupational'] == 1){
            $('#activity_daily_dyhaoe').attr('checked','checked');
        }
        if(json['posts']['0']['occupational'] == 2){
            $('#activity_daily_dyhaoe1').attr('checked','checked');
        }
        if(json['posts']['0']['hazardoushobbies'] == 1){
            $('#activity_daily_dypiaehh').attr('checked','checked');
        }
        if(json['posts']['0']['hazardoushobbies'] == 2){
            $('#activity_daily_dypiaehh1').attr('checked','checked');
        }
        if(json['posts']['0']['sleepconcerns'] == 1){
            $('#activity_daily_dyhasc').attr('checked','checked');
        }
        if(json['posts']['0']['sleepconcerns'] == 2){
            $('#activity_daily_dyhasc1').attr('checked','checked');
        }
        if(json['posts']['0']['unusualstressors'] == 1){
            $('#activity_daily_ayceaus').attr('checked','checked');
        }
        if(json['posts']['0']['unusualstressors'] == 2){
            $('#activity_daily_ayceaus1').attr('checked','checked');
        }
        if(json['posts']['0']['weight'] == 1){
            $('#activity_daily_dyhawc').attr('checked','checked');
        }
        if(json['posts']['0']['weight'] == 2){
            $('#activity_daily_dyhawc1').attr('checked','checked');
        }
        if(json['posts']['0']['vegetarian'] == 1){
            $('#activity_daily_dyesdsa').attr('checked','checked');
        }
        if(json['posts']['0']['vegetarian'] == 2){
            $('#activity_daily_dyesdsa1').attr('checked','checked');
        }
        if(json['posts']['0']['injuries'] == 1){
            $('#activity_daily_dyhapbis').attr('checked','checked');
        }
        if(json['posts']['0']['injuries'] == 2){
            $('#activity_daily_dyhapbis1').attr('checked','checked');
        }
        if(json['posts']['0']['exercise'] == 1){
            $('#activity_daily_dye').attr('checked','checked');
        }
        if(json['posts']['0']['exercise'] == 2){
            $('#activity_daily_dye1').attr('checked','checked');
        }
        $('#activity_daily_wtdoyfe').val( json['posts']['0']['doexercise'] );
        if(json['posts']['0'][' bicycle'] == 1){
            $('#activity_daily_dywhrb').attr('checked','checked');
        }
        if(json['posts']['0'][' bicycle'] == 2){
            $('#activity_daily_dywhrb1').attr('checked','checked');
        }
        if(json['posts']['0'][' seatbelt'] == 1){
            $('#activity_daily_dywsc').attr('checked','checked');
        }
        if(json['posts']['0'][' seatbelt'] == 2){
            $('#activity_daily_dywsc1').attr('checked','checked');
        }
        if(json['posts']['0'][' selfbreast'] == 1){
            $('#activity_daily_dydsb').attr('checked','checked');
        }
        if(json['posts']['0'][' selfbreast'] == 2){
            $('#activity_daily_dydsb1').attr('checked','checked');
        }
        $('#activity_daily_update').val( json['posts']['0']['id'] );

    });
},500);

}

function pastPedHisEdit(id)
{
    setTimeout(function(){
        $("#pastmedical_inbtn").css('display','block');
        $("#pastmedical_upbtn").css('display','none');

    var storedData1 = myApp.formGetData('logged_userId');
     myApp.showPreloader();

     var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=pastmedicalhistory&columns=*&condition=id="+id;

     $.getJSON (url, function (json) {
         myApp.hidePreloader();

         var url1=  "http://www.healthrecordspro.com/ws.php?type=getidname&format=json&table=pediatricschild&condition=id="+json['posts']['0']['childid'];

            $.getJSON (url1, function (json) {
                 myApp.hidePreloader();
                    $('#past_medi_his_chainame').val( json['posts']['0']['childname'] );
                    $('#past_medi_his_chainame_id').val( json['posts']['0']['id'] );
                    childname(json['posts']['0']['id']);

                });

                    if(json['posts']['0']['allergy'] == 1){
                        $('#past_medi_his_aller').attr('checked','checked');
                    }
                    if(json['posts']['0']['allergy'] == 0){
                        $('#past_medi_his_aller1').attr('checked','checked');
                    }
                    if(json['posts']['0']['bloodtransfusions'] == 1){
                        $('#past_medi_his_bltr').attr('checked','checked');
                    }
                    if(json['posts']['0']['bloodtransfusions'] == 0){
                        $('#past_medi_his_bltr1').attr('checked','checked');
                    }
                    if(json['posts']['0']['chickenpox'] == 1){
                        $('#past_medi_his_chknpox').attr('checked','checked');
                    }
                    if(json['posts']['0']['chickenpox'] == 0){
                        $('#past_medi_his_chknpox1').attr('checked','checked');
                    }
                    if(json['posts']['0']['contusions'] == 1){
                        $('#past_medi_his_contusions').attr('checked','checked');
                    }
                    if(json['posts']['0']['contusions'] == 0){
                        $('#past_medi_his_contusions1').attr('checked','checked');
                    }
                    if(json['posts']['0']['convuslsions'] == 1){
                        $('#past_medi_his_convulison').attr('checked','checked');
                    }
                    if(json['posts']['0']['convuslsions'] == 0){
                        $('#past_medi_his_convulison1').attr('checked','checked');
                    }
                    if(json['posts']['0']['fractures'] == 1){
                        $('#past_medi_his_fractures').attr('checked','checked');
                    }
                    if(json['posts']['0']['fractures'] == 0){
                        $('#past_medi_his_fractures1').attr('checked','checked');
                    }
                    if(json['posts']['0']['rubella'] == 1){
                        $('#past_medi_his_germea').attr('checked','checked');
                    }
                    if(json['posts']['0']['rubella'] == 0){
                        $('#past_medi_his_germea1').attr('checked','checked');
                    }
                    if(json['posts']['0']['hospitalizations'] == 1){
                        $('#past_medi_his_hospi').attr('checked','checked');
                    }
                    if(json['posts']['0']['hospitalizations'] == 0){
                        $('#past_medi_his_hospi1').attr('checked','checked');
                    }
                    if(json['posts']['0']['measles'] == 1){
                        $('#past_medi_his_measles').attr('checked','checked');
                    }
                    if(json['posts']['0']['measles'] == 0){
                        $('#past_medi_his_measles1').attr('checked','checked');
                    }
                    if(json['posts']['0']['meningitis'] == 1){
                        $('#past_medi_his_meningts').attr('checked','checked');
                    }
                    if(json['posts']['0']['meningitis'] == 0){
                        $('#past_medi_his_meningts1').attr('checked','checked');
                    }
                    if(json['posts']['0']['mumps'] == 1){
                        $('#past_medi_his_mumps').attr('checked','checked');
                    }
                    if(json['posts']['0']['mumps'] == 0){
                        $('#past_medi_his_mumps1').attr('checked','checked');
                    }
                    if(json['posts']['0'][' operations'] == 1){
                        $('#past_medi_his_oper').attr('checked','checked');
                    }
                    if(json['posts']['0'][' operations'] == 0){
                        $('#past_medi_his_oper1').attr('checked','checked');
                    }
                    $('#past_medi_his_reason').val( json['posts']['0']['reason'] );
                    if(json['posts']['0'][' otherillnessescurrentmedications'] == 1){
                        $('#past_medi_his_omill').attr('checked','checked');
                    }
                    if(json['posts']['0'][' otherillnessescurrentmedications'] == 0){
                        $('#past_medi_his_omill1').attr('checked','checked');
                    }
                    if(json['posts']['0']['currenttaking'] == 1){
                        $('#past_medi_his_iucctm').attr('checked','checked');
                    }
                    if(json['posts']['0']['currenttaking'] == 0){
                        $('#past_medi_his_iucctm1').attr('checked','checked');
                    }
                    if(json['posts']['0']['visualproblems'] == 1){
                        $('#past_medi_his_avpr').attr('checked','checked');
                    }
                    if(json['posts']['0']['visualproblems'] == 0){
                        $('#past_medi_his_avpr1').attr('checked','checked');
                    }
                    if(json['posts']['0']['eyescrosses'] == 1){
                        $('#past_medi_his_doelc').attr('checked','checked');
                    }
                    if(json['posts']['0']['eyescrosses'] == 0){
                        $('#past_medi_his_doelc1').attr('checked','checked');
                    }
                    if(json['posts']['0']['eyeglasses'] == 1){
                        $('#past_medi_his_docweg').attr('checked','checked');
                    }
                    if(json['posts']['0']['eyeglasses'] == 0){
                        $('#past_medi_his_docweg1').attr('checked','checked');
                    }
                    if(json['posts']['0']['hearingproblems'] == 1){
                        $('#past_medi_his_hprob').attr('checked','checked');
                    }
                    if(json['posts']['0']['hearingproblems'] == 0){
                        $('#past_medi_his_hprob1').attr('checked','checked');
                    }
                    if(json['posts']['0']['earinfections'] == 1){
                        $('#past_medi_his_einfe').attr('checked','checked');
                    }
                    if(json['posts']['0']['earinfections'] == 0){
                        $('#past_medi_his_einfe1').attr('checked','checked');
                    }
                    if(json['posts']['0']['rubbing'] == 1){
                        $('#past_medi_his_dchfaosn').attr('checked','checked');
                    }
                    if(json['posts']['0']['rubbing'] == 0){
                        $('#past_medi_his_dchfaosn1').attr('checked','checked');
                    }
                    if(json['posts']['0']['nosebleeds'] == 1){
                        $('#past_medi_his_hnobl').attr('checked','checked');
                    }
                    if(json['posts']['0']['nosebleeds'] == 0){
                        $('#past_medi_his_hnobl1').attr('checked','checked');
                    }
                    if(json['posts']['0']['throatinfections'] == 1){
                        $('#past_medi_his_thinfe').attr('checked','checked');
                    }
                    if(json['posts']['0']['throatinfections'] == 0){
                        $('#past_medi_his_thinfe1').attr('checked','checked');
                    }
                    if(json['posts']['0']['hurtmumar'] == 1){
                        $('#past_medi_his_hrtmur').attr('checked','checked');
                    }
                    if(json['posts']['0']['hurtmumar'] == 0){
                        $('#past_medi_his_hrtmur1').attr('checked','checked');
                    }
                    if(json['posts']['0']['heartdefet'] == 1){
                        $('#past_medi_his_hrtdef').attr('checked','checked');
                    }
                    if(json['posts']['0']['heartdefet'] == 0){
                        $('#past_medi_his_hrtdef1').attr('checked','checked');
                    }
                    if(json['posts']['0'][' bloodpressure'] == 1){
                        $('#past_medi_his_hbp').attr('checked','checked');
                    }
                    if(json['posts']['0'][' bloodpressure'] == 0){
                        $('#past_medi_his_hbp1').attr('checked','checked');
                    }
                    if(json['posts']['0'][' bronchitis'] == 1){
                        $('#past_medi_his_bron').attr('checked','checked');
                    }
                    if(json['posts']['0'][' bronchitis'] == 0){
                        $('#past_medi_his_bron1').attr('checked','checked');
                    }
                    if(json['posts']['0'][' cough'] == 1){
                        $('#past_medi_his_chronic').attr('checked','checked');
                    }
                    if(json['posts']['0'][' cough'] == 0){
                        $('#past_medi_his_chronic1').attr('checked','checked');
                    }
                    if(json['posts']['0']['bloodinstools'] == 1){
                        $('#past_medi_his_bldst').attr('checked','checked');
                    }
                    if(json['posts']['0']['bloodinstools'] == 0){
                        $('#past_medi_his_bldst1').attr('checked','checked');
                    }
                    if(json['posts']['0']['abdominalpain'] == 1){
                        $('#past_medi_his_fap').attr('checked','checked');
                    }
                    if(json['posts']['0']['abdominalpain'] == 0){
                        $('#past_medi_his_fap1').attr('checked','checked');
                    }
                    if(json['posts']['0']['vomiting'] == 1){
                        $('#past_medi_his_fvd').attr('checked','checked');
                    }
                    if(json['posts']['0']['vomiting'] == 0){
                        $('#past_medi_his_fvd1').attr('checked','checked');
                    }
                    if(json['posts']['0']['jaundice'] == 1){
                        $('#past_medi_his_jaundies').attr('checked','checked');
                    }
                    if(json['posts']['0']['jaundice'] == 0){
                        $('#past_medi_his_jaundies1').attr('checked','checked');
                    }
                    if(json['posts']['0']['weightloss'] == 1){
                        $('#past_medi_his_mwloss').attr('checked','checked');
                    }
                    if(json['posts']['0']['weightloss'] == 0){
                        $('#past_medi_his_mwloss1').attr('checked','checked');
                    }
                    $('#past_medi_his_ifyese').val( json['posts']['0']['ifyes'] );
                    if(json['posts']['0']['urination'] == 1){
                        $('#past_medi_his_boffuri').attr('checked','checked');
                    }
                    if(json['posts']['0']['urination'] == 0){
                        $('#past_medi_his_boffuri1').attr('checked','checked');
                    }
                    if(json['posts']['0']['wetting'] == 1){
                        $('#past_medi_his_webed').attr('checked','checked');
                    }
                    if(json['posts']['0']['wetting'] == 0){
                        $('#past_medi_his_webed1').attr('checked','checked');
                    }
                    if(json['posts']['0']['urine'] == 1){
                        $('#past_medi_his_blinur').attr('checked','checked');
                    }
                    if(json['posts']['0']['urine'] == 0){
                        $('#past_medi_his_blinur1').attr('checked','checked');
                    }
                    if(json['posts']['0']['tractinfection'] == 1){
                        $('#past_medi_his_uranatrin').attr('checked','checked');
                    }
                    if(json['posts']['0']['tractinfection'] == 0){
                        $('#past_medi_his_uranatrin1').attr('checked','checked');
                    }
                    if(json['posts']['0']['acne'] == 1){
                        $('#past_medi_his_acne').attr('checked','checked');
                    }
                    if(json['posts']['0']['acne'] == 0){
                        $('#past_medi_his_acne1').attr('checked','checked');
                    }
                    if(json['posts']['0']['sensitivity'] == 1){
                        $('#past_medi_his_sensi').attr('checked','checked');
                    }
                    if(json['posts']['0']['sensitivity'] == 0){
                        $('#past_medi_his_sensi1').attr('checked','checked');
                    }
                    if(json['posts']['0'][' eczema'] == 1){
                        $('#past_medi_his_ecad').attr('checked','checked');
                    }
                    if(json['posts']['0'][' eczema'] == 0){
                        $('#past_medi_his_ecad1').attr('checked','checked');
                    }
                    if(json['posts']['0'][' weakness'] == 1){
                        $('#past_medi_his_wpofarleg').attr('checked','checked');
                    }
                    if(json['posts']['0'][' weakness'] == 0){
                        $('#past_medi_his_wpofarleg1').attr('checked','checked');
                    }
                    if(json['posts']['0'][' persistent'] == 1){
                        $('#past_medi_his_perlimp').attr('checked','checked');
                    }
                    if(json['posts']['0'][' persistent'] == 0){
                        $('#past_medi_his_perlimp1').attr('checked','checked');
                    }
                    if(json['posts']['0']['corrective'] == 1){
                        $('#past_medi_his_cosbr').attr('checked','checked');
                    }
                    if(json['posts']['0']['corrective'] == 0){
                        $('#past_medi_his_cosbr1').attr('checked','checked');
                    }
                    if(json['posts']['0']['seizures'] == 1){
                        $('#past_medi_his_conorsei').attr('checked','checked');
                    }
                    if(json['posts']['0']['seizures'] == 0){
                        $('#past_medi_his_conorsei1').attr('checked','checked');
                    }
                    if(json['posts']['0']['dizziness'] == 1){
                        $('#past_medi_his_dizzins').attr('checked','checked');
                    }
                    if(json['posts']['0']['dizziness'] == 0){
                        $('#past_medi_his_dizzins1').attr('checked','checked');
                    }
                    if(json['posts']['0']['fainting'] == 1){
                        $('#past_medi_his_fainting').attr('checked','checked');
                    }
                    if(json['posts']['0']['fainting'] == 0){
                        $('#past_medi_his_fainting1').attr('checked','checked');
                    }
                    if(json['posts']['0']['frequent'] == 1){
                        $('#past_medi_his_frehead').attr('checked','checked');
                    }
                    if(json['posts']['0']['frequent'] == 0){
                        $('#past_medi_his_frehead1').attr('checked','checked');
                    }
                    if(json['posts']['0']['impulsive'] == 1){
                        $('#past_medi_his_implsive').attr('checked','checked');
                    }
                    if(json['posts']['0']['impulsive'] == 0){
                        $('#past_medi_his_implsive1').attr('checked','checked');
                    }
                    if(json['posts']['0']['selfcontrol'] == 1){
                        $('#past_medi_his_linselfc').attr('checked','checked');
                    }
                    if(json['posts']['0']['selfcontrol'] == 0){
                        $('#past_medi_his_linselfc1').attr('checked','checked');
                    }
                    if(json['posts']['0']['overactive'] == 1){
                        $('#past_medi_his_ovact').attr('checked','checked');
                    }
                    if(json['posts']['0']['overactive'] == 0){
                        $('#past_medi_his_ovact1').attr('checked','checked');
                    }
                    if(json['posts']['0']['attendingschool'] == 1){
                        $('#past_medi_his_attsch').attr('checked','checked');
                    }
                    if(json['posts']['0']['attendingschool'] == 0){
                        $('#past_medi_his_attsch1').attr('checked','checked');
                    }
                    if(json['posts']['0']['attentionspan'] == 1){
                        $('#past_medi_his_attspan').attr('checked','checked');
                    }
                    if(json['posts']['0']['attentionspan'] == 0){
                        $('#past_medi_his_attspan1').attr('checked','checked');
                    }
                    if(json['posts']['0']['learning'] == 1){
                        $('#past_medi_his_learning').attr('checked','checked');
                    }
                    if(json['posts']['0']['learning'] == 0){
                        $('#past_medi_his_learning1').attr('checked','checked');
                    }
                    if(json['posts']['0'][' mood'] == 1){
                        $('#past_medi_his_mood').attr('checked','checked');
                    }
                    if(json['posts']['0'][' mood'] == 0){
                        $('#past_medi_his_mood1').attr('checked','checked');
                    }
                    if(json['posts']['0'][' prents'] == 1){
                        $('#past_medi_his_parents').attr('checked','checked');
                    }
                    if(json['posts']['0'][' prents'] == 0){
                        $('#past_medi_his_parents1').attr('checked','checked');
                    }
                    if(json['posts']['0'][' peers'] == 1){
                        $('#past_medi_his_peers').attr('checked','checked');
                    }
                    if(json['posts']['0'][' peers'] == 0){
                        $('#past_medi_his_peers1').attr('checked','checked');
                    }
                    if(json['posts']['0']['siblings'] == 1){
                        $('#past_medi_his_siblings').attr('checked','checked');
                    }
                    if(json['posts']['0']['siblings'] == 0){
                        $('#past_medi_his_siblings1').attr('checked','checked');
                    }
                    if(json['posts']['0']['sleep'] == 1){
                        $('#past_medi_his_sleep').attr('checked','checked');
                    }
                    if(json['posts']['0']['sleep'] == 0){
                        $('#past_medi_his_sleep1').attr('checked','checked');
                    }
                    if(json['posts']['0'][' concernaboutphysicl'] == 1){
                        $('#past_medi_his_conabtpseea').attr('checked','checked');
                    }
                    if(json['posts']['0'][' concernaboutphysicl'] == 0){
                        $('#past_medi_his_conabtpseea1').attr('checked','checked');
                    }
                    if(json['posts']['0'][' yourchild'] == 1){
                        $('#past_medi_his_hycbp').attr('checked','checked');
                    }
                    if(json['posts']['0'][' yourchild'] == 0){
                        $('#past_medi_his_hycbp1').attr('checked','checked');
                    }
                    $('#past_medi_his_aoconcerns').val( json['posts']['0']['otherconcerns'] );
                    $('#past_medi_his_proname').val( json['posts']['0']['providername'] );
                    $('#past_medi_his_update').val( json['posts']['0']['id'] );

                    var url3=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=medicationdosage&columns=*&condition=pastmedicalId="+id;

                    $.getJSON (url3, function (json) {
                        var key, count = 0;
                        for(key in json['posts']) {
                            if(json['posts'].hasOwnProperty(key)) {
                                count++;

                            }

                        }

                        for (var i = 0; i <count; i++) {

                            var name="<li><div class='item-content item-title_inner'><div class='item-inner'><div class='item-title label'>Medication </div><div class='item-input'><input id='past_medi_his_medication_"+i+"' type='text' placeholder='Medication  ' name='past_medi_his_medication' value='"+json['posts'][i]['medication']+"'></div></div></div></li><li><div class='item-content item-title_inner'><div class='item-inner'><div class='item-title label'>Dose </div><div class='item-input'><input id='past_medi_his_dose_"+i+"' type='text' placeholder='Dose ' name='past_medi_his_dose' value='"+json['posts'][i]['dose']+"'></div></div></div></li>";
                            $("#responce1").append(name);
                        }
                    });

            });
    },500);
}

function birthPedHisEdit(id)
{
    setTimeout(function(){
        $("#birthhis_inbtn").css('display','block');
        $("#birthhis_upbtn").css('display','none');

    var storedData1 = myApp.formGetData('logged_userId');
        myApp.showPreloader();

            var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=birthhistory&columns=*&condition=id="+id;

                 $.getJSON (url, function (json) {
                     myApp.hidePreloader();

                var url1=  "http://www.healthrecordspro.com/ws.php?type=getidname&format=json&table=pediatricschild&condition=id="+json['posts']['0']['childid'];
                    $.getJSON (url1, function (json) {
                     myApp.hidePreloader();
                        $('#birth_his_cname').val( json['posts']['0']['childname'] );
                        $('#birth_his_cname_id').val( json['posts']['0']['id'] );
                        childnamebirth( json['posts']['0']['id'] );

                });
                        $('#birth_his_pb').val( json['posts']['0']['placeofbirth'] );

                        if(json['posts']['0']['induceddlabor'] == 1){
                            $('#birth_his_ail').attr('checked','checked');
                        }
                        if(json['posts']['0']['induceddlabor'] == 0){
                            $('#birth_his_ail1').attr('checked','checked');
                        }
                        $('#birth_his_dol').val( json['posts']['0']['duration'] );
                        $('#birth_his_pop').val( json['posts']['0']['gestationperiod'] );
                        if(json['posts']['0']['methodOfDelivery'] == 0){
                            $('#birth_his_mod').attr('checked','checked');
                        }
                        if(json['posts']['0']['methodOfDelivery'] == 1){
                            $('#birth_his_mod1').attr('checked','checked');
                        }
                        if(json['posts']['0']['methodOfDelivery'] == 2){
                            $('#birth_his_mod2').attr('checked','checked');
                        }
                        if(json['posts']['0']['methodOfDelivery'] == 3){
                            $('#birth_his_mod3').attr('checked','checked');
                        }
                        $('#birth_his_bw').val( json['posts']['0']['birthweight'] );
                        $('#birth_his_aps').val( json['posts']['0']['apgarscore'] );

                        if(json['posts']['0']['Antibiotic'] == 1){
                            $('#birth_his_abiot').attr('checked','checked');
                        }
                        if(json['posts']['0']['Antibiotic'] == 0){
                            $('#birth_his_abiot1').attr('checked','checked');
                        }
                        if(json['posts']['0']['bluespells'] == 1){
                            $('#birth_his_blsp').attr('checked','checked');
                        }
                        if(json['posts']['0']['bluespells'] == 0){
                            $('#birth_his_blsp1').attr('checked','checked');
                        }
                        if(json['posts']['0']['convulsions'] == 1){
                            $('#birth_his_co').attr('checked','checked');
                        }
                        if(json['posts']['0']['convulsions'] == 0){
                            $('#birth_his_co1').attr('checked','checked');
                        }
                        if(json['posts']['0']['jaundice'] == 1){
                            $('#birth_his_jaun').attr('checked','checked');
                        }
                        if(json['posts']['0']['jaundice'] == 0){
                            $('#birth_his_jaun1').attr('checked','checked');
                        }
                        if(json['posts']['0']['skinrash'] == 1){
                            $('#birth_his_skinr').attr('checked','checked');
                        }
                        if(json['posts']['0']['skinrash'] == 0){
                            $('#birth_his_skinr1').attr('checked','checked');
                        }
                        if(json['posts']['0']['hospitallonger'] == 1){
                            $('#birth_his_dcrihltm').attr('checked','checked');
                        }
                        if(json['posts']['0']['hospitallonger'] == 0){
                            $('#birth_his_dcrihltm1').attr('checked','checked');
                        }
                        if(json['posts']['0']['babyfed'] == 1){
                            $('#birth_his_hwbf').attr('checked','checked');
                        }
                        if(json['posts']['0']['babyfed'] == 0){
                            $('#birth_his_hwbf1').attr('checked','checked');
                        }
                        $('#birth_his_update').val( json['posts']['0']['id'] );

            });
    },500);
}

function devePedHisEdit(id)
{
    setTimeout(function(){
        $("#devepped_inbtn").css('display','block');
        $("#devepped_upbtn").css('display','none');

    var storedData1 = myApp.formGetData('logged_userId');
     myApp.showPreloader();

     var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=Developmentlhistory&columns=*&condition=id="+id;

     $.getJSON (url, function (json) {
         myApp.hidePreloader();

            var url1=  "http://www.healthrecordspro.com/ws.php?type=getidname&format=json&table=pediatricschild&condition=id="+json['posts']['0']['childid'];

                    $.getJSON (url1, function (json) {
                     myApp.hidePreloader();

                        $('#deve_his_chainame').val( json['posts']['0']['childname'] );
                        $('#deve_his_chn_id').val( json['posts']['0']['id'] );
                        developmentHiscname(json['posts']['0']['id']);

                 });

                        $('#deve_his_huh').val( json['posts']['0']['HoldUpHead'] );
                        $('#deve_his_rover').val( json['posts']['0']['RollOver'] );
                        $('#deve_his_sitsup').val( json['posts']['0']['sitUnsupported'] );
                        $('#deve_his_salone').val( json['posts']['0']['standAlone'] );
                        $('#deve_his_walk').val( json['posts']['0']['walk'] );
                        $('#deve_his_talk').val( json['posts']['0']['talk'] );
                        $('#deve_his_tt').val( json['posts']['0']['toilettrain'] );
                        $('#deve_his_fed').val( json['posts']['0']['feedhim'] );
                        $('#deve_his_dress').val( json['posts']['0']['dresshim'] );
                        $('#deve_his_update').val( json['posts']['0']['id'] );

            });
    },500);
}

function uploadProfilePic()
{
	
    var storedData1 = myApp.formGetData('logged_userId');
    $('#attachment_id').val(storedData1['userId']);
    formData = new FormData($('#file-attachment-form')[0]);

    $.ajax({
        type:'POST',
        url:'http://healthrecordspro.com/mobileapp1/scriptfiles/upload.php',
        data:formData,
        contentType: false,
        processData: false,
        error:function (jqXHR, textStatus, errorThrown) {
            // alert('Failed to upload file')
        },
        success:function (data) {
             //alert(data);
            //alert('File uploaded')
        }

    })
    return false;
}

function uploadInsuranceCardsPic(update_id)
{
    var storedData1 = myApp.formGetData('logged_userId');
    if(update_id == ''){
        var update_health_insu = $('#update_health_insu');
    }else{
        var update_health_insu = update_id;
    }

    $('#health_insu_coinsucard_id').val(update_health_insu);
    formData = new FormData($('#file-attachment-form1')[0]);

    $.ajax({
        type:'POST',
        url:'http://healthrecordspro.com/mobileapp1/scriptfiles/uploadInsuCards.php',
        data:formData,
        contentType: false,
        processData: false,
        error:function (jqXHR, textStatus, errorThrown) {
            // alert('Failed to upload file')
        },
        success:function (data) {
            // alert(data);
            // alert('File uploaded')
        }
    })
    return false;
}

function uploadEmergencyContactCardsPic(update_id)
{
    var storedData1 = myApp.formGetData('logged_userId');
    if(update_id == ''){
        var update_emergency_id = $('#update_emergency_id').val();
    }else{
        var update_emergency_id = update_id;
    }
    $('#emer_con_image_id').val(update_emergency_id);
    formData = new FormData($('#file-attachment-form4')[0]);

    $.ajax({
        type:'POST',
        url:'http://healthrecordspro.com/mobileapp1/scriptfiles/uploadEmergencyContact.php',
        data:formData,
        contentType: false,
        processData: false,
        error:function (jqXHR, textStatus, errorThrown) {
            // alert('Failed to upload file')
        },
        success:function (data) {
            //alert(data);
            // alert('File uploaded')
        }
    })
    return false;
}

function uploadEmergencyContactCardsCameraPic(update_id)
{
    // alert('id='+update_id);
    var storedData1 = myApp.formGetData('logged_userId');
    if(update_id == ''){
        var update_emergency_id = $('#update_emergency_id').val();
    }else{
        var update_emergency_id = update_id;
    }

    var canvas = document.getElementById("myCanvas1");
    var c = canvas.getContext("2d");
    // alert(myCanvas1.toDataURL());

    $.post('http://healthrecordspro.com/mobileapp1/scriptfiles/uploadEmergencyContact.php',
    {
        img : myCanvas1.toDataURL(),
        uid_up : storedData1['userId'],
        emer_con_image_id : update_emergency_id
    },
    function(data) {
        // alert(data);
//        myApp.alert("Image Uploaded",'Success')
    });

    // return false;
}

function uploadSurgeriesUploadPic(update_id)
{
    var storedData1 = myApp.formGetData('logged_userId');
    if(update_id == ''){
        var surgeries_id = $('#surgeries_id');
    }else{
        var surgeries_id = update_id;
    }


    $('#sur_upload_image_id').val(surgeries_id);
    formData = new FormData($('#file-attachment-form5')[0]);

    $.ajax({
        type:'POST',
        url:'http://healthrecordspro.com/mobileapp1/scriptfiles/uploadSurgeriesImage.php',
        data:formData,
        contentType: false,
        processData: false,
        error:function (jqXHR, textStatus, errorThrown) {
            // alert('Failed to upload file')
        },
        success:function (data) {
            //alert(data);
            // alert('File uploaded')
        }
    })
    return false;
}
function uploadMedicationPic(update_id)
{
    var storedData1 = myApp.formGetData('logged_userId');

    if(update_id == ''){
        var medicationsform_id = $('#medicationsform_id');
    }else{
        var medicationsform_id = update_id;
    }


    $('#medi_image_id').val(
);
    formData = new FormData($('#file-attachment-form8')[0]);

    $.ajax({
        type:'POST',
        url:'http://healthrecordspro.com/mobileapp1/scriptfiles/uploadMedicationImage.php',
        data:formData,
        contentType: false,
        processData: false,
        error:function (jqXHR, textStatus, errorThrown) {
            // alert('Failed to upload file')
        },
        success:function (data) {
            // alert(data);
            // alert('File uploaded');
            // mainView.router.loadPage('doctors_appoin_listing.html');
        }
    })
    return false;
}
function uploadOrgandonationPic(update_id)
{
    var storedData1 = myApp.formGetData('logged_userId');
    if(update_id == ''){
        var organ_id = $('#organ_id');
    }else{
        var organ_id = update_id;
    }
    

    $('#organ_don_image_id').val(organ_id);
    formData = new FormData($('#file-attachment-form9')[0]);

    $.ajax({
        type:'POST',
        url:'http://healthrecordspro.com/mobileapp1/scriptfiles/uploadOrgandonationImage.php',
        data:formData,
        contentType: false,
        processData: false,
        error:function (jqXHR, textStatus, errorThrown) {
            // alert('Failed to upload file')
        },
        success:function (data) {
            //alert(data);
            // alert('File uploaded');
            // mainView.router.loadPage('doctors_appoin_listing.html');
        }
    })
    return false;
}
function uploadAllergiesPic(update_id)
{
    var storedData1 = myApp.formGetData('logged_userId');
    if(update_id == ''){
        var allergies_id = $('#allergies_id').val();
    }else{
        var allergies_id = update_id;
    }

    $('#allergies_con_image_id').val(allergies_id);
    formData = new FormData($('#file-attachment-form10')[0]);

    $.ajax({
        type:'POST',
        url:'http://healthrecordspro.com/mobileapp1/scriptfiles/uploadAllergiesImage.php',
        data:formData,
        contentType: false,
        processData: false,
        error:function (jqXHR, textStatus, errorThrown) {
            // alert('Failed to upload file')
        },
        success:function (data) {
            // alert(data);
            // alert('File uploaded');
            // mainView.router.loadPage('doctors_appoin_listing.html');
        }
    })
    return false;
}
function uploadImmunizationPic(update_id)
{
    var storedData1 = myApp.formGetData('logged_userId');

    if(update_id == ''){
        var immunization_id = $('#immunization_id');
    }else{
        var immunization_id = update_id;
    }


    $('#immunization_image_id').val(immunization_id);
    formData = new FormData($('#file-attachment-form12')[0]);

    $.ajax({
        type:'POST',
        url:'http://healthrecordspro.com/mobileapp1/scriptfiles/uploadImmunizationImage.php',
        data:formData,
        contentType: false,
        processData: false,
        error:function (jqXHR, textStatus, errorThrown) {
            // alert('Failed to upload file')
        },
        success:function (data) {
            //alert(data);
            // alert('File uploaded');
            // mainView.router.loadPage('doctors_appoin_listing.html');
        }
    })
    return false;
}
function uploadPhysicalExamPic()
{
    var storedData1 = myApp.formGetData('logged_userId');
    $('#phy_exam_image_id').val(storedData1['userId']);
    formData = new FormData($('#file-attachment-form13')[0]);

    $.ajax({
        type:'POST',
        url:'http://healthrecordspro.com/mobileapp1/scriptfiles/uploadPhysicalImage.php',
        data:formData,
        contentType: false,
        processData: false,
        error:function (jqXHR, textStatus, errorThrown) {
            // alert('Failed to upload file')
        },
        success:function (data) {
            //alert(data);
            // alert('File uploaded');
            // mainView.router.loadPage('doctors_appoin_listing.html');
        }
    })
    return false;
}
function AddMoreRow()
{
    var html ='';

    html += '<div style="clear:both;padding:.5%;"><input name="myfile[]" type="file" class="demoInputBox userImage" /><img src="img/action_delete.gif" class="pull-right" onclick="DeleteRow(this);" style=" cursor: pointer;"></div>';

    $('#addrow').append(html);
}

function DeleteRow(thisss)
{
    $(thisss).parent('div').remove();
}

function uploadAlbums(){

    var storedData1 = myApp.formGetData('logged_userId');
    $('#uid').val(storedData1['userId']);
    formData = new FormData($('#createalbum_form')[0]);
    myApp.showPreloader();
    $.ajax({
        type:'POST',
        url:'http://healthrecordspro.com/mobileapp1/scriptfiles/albumscript/createalbum.php?title='+$('#title').val(),
        data:formData,
        cache: false,
        contentType: false,
        processData: false,
        error:function (jqXHR, textStatus, errorThrown) {
            // alert('Failed to upload file')
        },
        success:function (data) {
        myApp.hidePreloader();
        // alert(data);
        $('#display_albums_area').empty();
        manage_albums($("#catid").val(),$("#titleID").val());
        }
    })
    return false;
}

function AlbumUpdateImage(){
    var storedData1 = myApp.formGetData('logged_userId');
    $('#uid_up').val(storedData1['userId']);
    formData = new FormData($('#updatealbum_form_single')[0]);
    myApp.showPreloader();
    $.ajax({
        type:'POST',
        url:'http://healthrecordspro.com/mobileapp1/scriptfiles/albumscript/createalbum.php',
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        error:function (jqXHR, textStatus, errorThrown) {
            // alert('Failed to upload file')
        },
        success:function (data) {
            // alert(data);
            myApp.hidePreloader();
            $('#self_img').empty();
            $('#delete_albm').empty();
            view_album_images($('#albumid_up12').val());

        }
    })
    return false;
}


function AlbumUpdateCameraImage()
{
    var storedData1 = myApp.formGetData('logged_userId');
    // $('#uid_up').val(storedData1['userId']);
    // formData = new FormData($('#updatealbum_form')[0]);
    myApp.showPreloader();

    $.post('http://healthrecordspro.com/mobileapp1/scriptfiles/albumscript/createalbum.php',
    {
        img : cameraCanvas.toDataURL(),
        uid_up : storedData1['userId'],
        catid : document.getElementById('catid').value,
        albumid_up : document.getElementById('albumid_up').value,
        title : document.getElementById('title').value,
        submit : 'Insert' 
    },
    function(data) {
        // alert(data);
        myApp.hidePreloader();
        $('#display_albums_area').empty();
        manage_albums($("#catid").val(),$("#titleID").val());
        // document.getElementById('display_albums_area').empty();
        // manage_albums(document.getElementById('catid').value,document.getElementById('titleID').value);
    });
}

function AlbumUpdateCameraImage1(){
    var storedData1 = myApp.formGetData('logged_userId');
    myApp.showPreloader();

    $.post('http://healthrecordspro.com/mobileapp1/scriptfiles/albumscript/createalbum.php',
    {
        img : cameraCanvas_image.toDataURL(),
        uid_up : storedData1['userId'],
        albumid_up : document.getElementById('albumid_up123').value
    },
    function(data) {
        //alert(data);
        myApp.hidePreloader();
        $('#self_img').empty();
        $('#delete_albm').empty();
        view_album_images($('#albumid_up12').val());
    });
}

function openSearchPopUp()
{
    var popupHTML = '<div class="popup popupImage" style="display: block;">'+
                        '<div class="list-block">'+
                            '<ul style="background-color:#FFFFFF">'+
                                '<li>'+
                                    '<div class="item-content">'+
                                        '<div class="item-media"></div>'+
                                            '<div class="item-inner">'+
                                                '<div class="item-title label"></div>'+
                                                    '<div class="item-input">'+
                                                        ' <input type="text" name="search_keyword" id="search_keyword" placeholder="Search.." />'+
                                                    '</div>'+
                                            '</div>'+
                                    '</div>'+
                                '</li>'+
                            '</ul>'+
                        '</div>'+
                        ' <p style="text-align:center;"><a href="search.html" onClick="SearchButton(); return false;" style="width:50%;margin:0 auto" class="button close-popup" id="button_search">search</a></p>'+
                        '<p><a href="#" style="color: #007aff;float:right;margin-right: 0px; margin-top: -23px;" class="close-popup"><i class="fa fa-times-circle fa-2x" ></i></a></p>'+
                    '</div>'

    myApp.popup(popupHTML);
    setTimeout(function(){
        $('#search_keyword').focus();
    },100);

}

function SearchButton(){
    var s_keywords = $('#search_keyword').val();
    setTimeout(function(){
        // myApp.alert(s_keywords);
        s_keywords = s_keywords.trim();
        s_keywords = s_keywords.toLowerCase().replace(/\b[a-z]/g, function(letter) {
            return letter.toUpperCase();
        });
        s_keywords = s_keywords.replace(" ", "_");
        url = 'https://en.m.wikipedia.org/wiki/'+s_keywords;
        $('#searchResults_iframe').attr('src',url);
    },500);
}

function mySelfAdd(divName)
{
    var count = document.getElementById('extrafieldcount').value;
    var newdiv = document.createElement('ul');
    newdiv.style.cssText = 'background-color:white';
    newdiv.innerHTML = "<li><div class='item-content'><div class='item-media'></div><div class='item-inner'><div class='item-title label'><input type='text' name='otherfield[]' id='otherfield_"+count+"' placeholder='Other Fields' value='' required='required'/></div><div class='item-input'><input type='number' name='othervalue[]' id='othervalue_"+count+"' placeholder='Other Value' style='width: 94%;display: -moz-inline-box;'/><img src='img/action_delete.gif' onclick='delSelfRow(this);' ></div></div></div></li>";

    document.getElementById(divName).appendChild(newdiv);
    count++;
    document.getElementById('extrafieldcount').value = count;
}

function delSelfRow(row)
{
    $(row).parent().parent().parent().parent().parent('ul').remove();
}
function FamilyCausesOfDSubmit()
{
    var familhisCaus = $('#rowIdFH2').val();

    for(i=0;i<=familhisCaus;i++){

        var storedData1 = myApp.formGetData('logged_userId');
        var causeofdeathid = $('#family_his_causeofDe_'+i).val();
        var other1 = $('#family_his_causeofDe_others_'+i).val();
        var description = $('#family_caus_death_'+i).val();
        var update_familycause_id = $('#update_familycause_id').val();
        if(update_familycause_id == '')
        {
            var columnNam = "causeofdeathid,other1,description,customerid";

            var columnVal = "'"+causeofdeathid+"','"+other1+"','"+description+"','"+storedData1['userId']+"'";
            myApp.showPreloader();
            var url = "http://www.healthrecordspro.com/ws.php?type=insert&format=json&table=familycauseofdeathcustomer&columns="+columnNam+"&values="+columnVal+"";

            $.getJSON (url, function (json) {
                // console.log(json);
                myApp.hidePreloader(); 
                if( json['posts'][0] ){
                    // getFamilyCauseDeathData();
                    myApp.alert("Your Details has been Created",'Success');
                    mainView.router.loadPage('family_causesof_death_listing.html');

                }
                else
                {
                    myApp.alert("Your Details Not Created",'Failure');
                }
            });
        }else{

            var val = "causeofdeathid = '"+causeofdeathid+"',other1 = '"+other1+"',description = '"+description+"'";

             myApp.showPreloader();
            var url1="http://www.healthrecordspro.com/ws.php?type=update&format=json&table=familycauseofdeathcustomer&columns="+val+"&condition=id="+update_familycause_id;
                    // console.log(url1);
            $.getJSON (url1, function (json) {
                 myApp.hidePreloader(); 
                if( json['posts'][0] ){
                        // getFamilyCauseDeathData();
                        myApp.alert("Your Details has been updated",'Success');
                        mainView.router.loadPage('family_causesof_death_listing.html');
                }
                else
                {
                    myApp.alert("Your Details Not Created",'Failure');
                }
            });

        }
    }
    getFamilyCauseDeathData();
}

function getFamilyCauseDeathData()
{
    setTimeout(function(){
    var storedData1 = myApp.formGetData('logged_userId');
    // myApp.showPreloader();

    var url= "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=familycauseofdeathcustomer&columns=*&condition=customerid="+storedData1['userId'];

     $.getJSON (url, function (json) {
             // myApp.hidePreloader();

            var key, count = 0;

            for(key in json['posts']) {
                if(json['posts'].hasOwnProperty(key)) {
                count++;
            }
        }

        if(json['posts']==0){
                    var data = "No Records Found!!!";
                    $('#familyhiscauseofdeath').append(data);
                }
                else
                {
                    for(i=0;i<count;i++){


                        var data = "<ul><li><a href='family_causesof_death.html' class='item-link' onclick='familyHisCauseEdit("+json['posts'][i]['id']+");'><div class='item-content white'><div class='item-inner'><div class='item-title'>"+json['posts'][i]['description']+"</div></div></div></a></li></ul>";

                        $('#familyhiscauseofdeath').append(data);

                    }
                }

        });
    },500);
}
function familyHisCauseEdit(id)
{
    setTimeout(function(){
        $("#family_causeofd_inbtn").css('display','block');
        $("#family_causeofd_upbtn").css('display','none');


    var storedData1 = myApp.formGetData('logged_userId');
    myApp.showPreloader();

     var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=familycauseofdeathcustomer&columns=*&condition=id="+id;

    $.getJSON (url, function (json) {
        myApp.hidePreloader();

        var key, count = 0;
            for(key in json['posts']) {
                if(json['posts'].hasOwnProperty(key)) {
                    count++;
                }
            }
            var url1=  "http://www.healthrecordspro.com/ws.php?type=getidname&format=json&table=familycauseofdeath&condition=id="+json['posts']['0']['causeofdeathid'];
            for (var i = 0; i <count; i++) {

                $.getJSON (url1, function (json) {

                    if(json['posts'] == 0){
                            FamilyHisCauseofD(0,-1);
                            $('#family_cuses_of_de_li_0').css('display','block');
                         }else{
                            $('#family_his_causeofDe_0').val( json['posts']['0']['name'] );
                            $('#family_his_causeofDe_id_0').val( json['posts']['0']['id'] );
                            FamilyHisCauseofD(0,json['posts']['0']['id'] );
                    }

                });
                $('#family_his_causeofDe_others_'+i).val( json['posts']['0']['other1'] );
                $('#family_his_causeofDe_'+i).val( json['posts']['0']['causeofdeathid'] );
                $('#family_caus_death_'+i).val( json['posts']['0']['description'] );
                $('#update_familycause_id').val( json['posts']['0']['id'] );
            }
    });
},500);
}
function familyCauseOfDAdd()
{
    setTimeout(function(){
        $("#family_causeofd_inbtn").css('display','none'); 
        $("#family_causeofd_upbtn").css('display','block'); 
        FamilyHisCauseofD(0);
      },500);
}
function deleteFamilyCauseDContact()
{
    id = $('#update_familycause_id').val();
    myApp.confirm('Are you sure','Delete');

    $( ".modal-button-bold" ).click(function() {
        var storedData1 = myApp.formGetData('logged_userId');
         myApp.showPreloader();
        var url=  "http://www.healthrecordspro.com/ws.php?type=delete&format=json&table=familycauseofdeathcustomer&columns=&condition=id="+id;
        $.getJSON (url, function (json) {
             myApp.hidePreloader();
            // $("#emergency_contact_ul_"+id).remove();
            getFamilyCauseDeathData();
            mainView.router.loadPage('family_causesof_death_listing.html');
        });
    });
}
function familyhisImgAlbm()
{
    var storedData1 = myApp.formGetData('logged_userId');
    myApp.showPreloader();

    var url = "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=scannedalbums&columns=*&condition=customerId="+storedData1['userId']+" AND categoryId=30";

    $.getJSON (url, function (json) {
        // console.log(json['posts']);
        $.getJSON (url, function (json){
            var key, count = 0;
            for(key in json['posts']) {
                if(json['posts'].hasOwnProperty(key)) {
                    count++;
                }
            }
            if(json['posts']==0){
                    var data = "No Records Found!!!";
                    $('#familyhis_display_albm').append(data);
                }
                else
                {
            for (var i=0;i<count;i++)
            {
                $('#familyhis_display_albm').append('<a href = "family_his_Albumimage_display.html"><div style="width:140px;backgroud-color:#DDD;margin: auto;"  onclick="ViewFamilyHisAlbumImages('+json['posts'][i]['id']+')"><i class="fa fa-folder-o" style="font-size: 120px;color: #000000;"></i><p align="center" style="color:#000;">'+json['posts'][i]['title']+'</p><div></a>');
            }
         }
        });
        myApp.hidePreloader();
    });
}//family  history
function FamilyhisAddnew()
{
    setTimeout(function(){
        $("#family_his1_inbtn").css('display','none'); 
        $("#family_his1_upbtn").css('display','block');
        FamilyHisTypes(0);
      },500);
}

function familyhisSubmit(){
    setTimeout(function(){
        var storedData1 = myApp.formGetData('logged_userId');
        var historyid = $('#family_his_speciality').val();
        var other = $('#family_his_speciality_others').val();

        if (document.getElementById('family_his_mother').checked) {
        var check = document.getElementById('family_his_mother').value;
        }
        if (document.getElementById('family_his_father').checked) {
        var check = document.getElementById('family_his_father').value;
        }
        if (document.getElementById('family_his_sibling').checked) {
        var check = document.getElementById('family_his_sibling').value;
        }
        var update_familyhis1_id = $('#update_familyhis1_id').val();
        if(update_familyhis1_id == '')
        {
            // var other = $('#family_his_others_').val();
            var columnNa = "historyid,other,`check`,customerid";

            var columnVa = "'"+historyid+"','"+other+"','"+check+"','"+storedData1['userId']+"'";

            myApp.showPreloader();

            var url = "http://www.healthrecordspro.com/ws.php?type=insert&format=json&table=familyhistorycustomers&columns="+columnNa+"&values="+columnVa+"";

            $.getJSON (url, function (json) {
                myApp.hidePreloader();
                // console.log(json);
                if( json['posts'][0] ){
                    getFamilyhisData();
                    myApp.alert("Your Details has been Created",'Success');
                    mainView.router.loadPage('family_his_listing1.html');
                }else{
                    myApp.alert("Your Details Not Created",'Failure');
                }
            });
        }else{
            var val = "historyid = '"+historyid+"',other = '"+other+"',`check` = '"+check+"'";

            myApp.showPreloader();
        var url5="http://www.healthrecordspro.com/ws.php?type=update&format=json&table=familyhistorycustomers&columns="+val+"&condition=id="+update_familyhis1_id;
                // console.log(url5);
            $.getJSON (url5, function (json) {
                myApp.hidePreloader();
                if( json['posts'][0] ){
                    getFamilyhisData();
                    myApp.alert("Your Details has been updated",'Success');
                    mainView.router.loadPage('family_his_listing1.html');
                }
                else
                {
                    myApp.alert("Your Details Not Created",'Failure');
                }
            });
        }
    },500);
}

function getFamilyhisData(){
    setTimeout(function(){
    var storedData1 = myApp.formGetData('logged_userId');
    myApp.showPreloader();

    var url= "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=familyhistorycustomers&columns=*&condition=customerid="+storedData1['userId'];

        $.getJSON (url, function (json) {
            myApp.hidePreloader();
            var key, count = 0;
            for(key in json['posts']) {
                if(json['posts'].hasOwnProperty(key)) {
                count++;
                }
            }
            if (json['posts']==0) {
            var data = "No Records Found!!!";
            $('#familyhis').append(data);
            }
            else
            {
                var names = [];
                for(i=0;i<count;i++){
                    var data = "<ul id='family_his_ul'><li><a href='family_history.html' class='item-link' onclick='familyHisEdit("+json['posts'][i]['id']+");'><div class='item-content white'><div class='item-inner'><div class='item-title' id='display_family_his_"+i+"'></div></div></div></a></li></ul>";

                    $('#familyhis').append(data);
                    var url1=  "http://www.healthrecordspro.com/ws.php?type=getidname&format=json&table=familyhistory&condition=id="+json['posts'][i]['historyid'];
                    //alert(json['posts'][i]['historyid']);
                    jQuery.ajaxSetup({async:false});
                    $.getJSON (url1, function (json1) {
                        names.push(json1);
                    });
                }
            }
            for( var i=0; i<count;i++ ){
                myApp.hidePreloader();
                if (json['posts'][i]['historyid'] == '-1') {
                    $('#display_family_his_'+i).append(json['posts'][i]['other']);
                }else{
                    $('#display_family_his_'+i).append(names[i]['posts'][0]['type']);
                }
            }
        });
    },500);
}

function familyHisEdit(hisID){
	setTimeout(function(){
		$("#family_his1_inbtn").css('display','block');
		$("#family_his1_upbtn").css('display','none');
			var storedData1 = myApp.formGetData('logged_userId');
			myApp.showPreloader();

			var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=familyhistorycustomers&columns=*&condition=id="+hisID;

			$.getJSON (url, function (json) {
				myApp.hidePreloader();
				var key, count = 0;
				for(key in json['posts']) {
					if(json['posts'].hasOwnProperty(key)) {
						count++;
					}
				}
				var url2=  "http://www.healthrecordspro.com/ws.php?type=getidname&format=json&table=familyhistory&condition=id="+json['posts']['0']['historyid'];

				$.getJSON (url2, function (json) {
					myApp.hidePreloader();
						if(json['posts'] == 0){
							FamilyHisTypes(-1);
							$('#family_his_speciality_li').css('display','block');
						}else{
							$('#family_his_speciality_others').val( json['posts']['0']['type'] );
							$('#family_his_speciality_id').val( json['posts']['0']['id'] );
							FamilyHisTypes( json['posts']['0']['id'] );
						}
				});
					$('#family_his_speciality_others').val( json['posts']['0']['other'] );
					if(json['posts']['0']['check'] == 1){
						$('#family_his_mother').attr('checked','checked');
					}
					if(json['posts']['0']['check'] == 1){
						$('#family_his_father').attr('checked','checked');
					}
					if(json['posts']['0']['check'] == 1){
						$('#family_his_sibling').attr('checked','checked');
					}
					$('#update_familyhis1_id').val( json['posts']['0']['id'] );
			});
	},500);
}

function deleteFamilyHis1()
{
	id = $('#update_familyhis1_id').val();
	myApp.confirm('Are you sure','Delete');

	$( ".modal-button-bold" ).click(function() {
		var storedData1 = myApp.formGetData('logged_userId');
		myApp.showPreloader();
		var url=  "http://www.healthrecordspro.com/ws.php?type=delete&format=json&table=familyhistorycustomers&columns=&condition=id="+id;
		$.getJSON (url, function (json) {
			myApp.hidePreloader();
			// $("#emergency_contact_ul_"+id).remove();
			getFamilyhisData();
			mainView.router.loadPage('family_his_listing1.html');
		});
	});
}

function selfReports()
{
	setTimeout(function(){
		var storedData1 = myApp.formGetData('logged_userId');
		
		var urlAllReports="http://www.healthrecordspro.com/ws.php?type=mychartsbytest&format=json&customerid="+storedData1['userId'];
		jQuery.ajaxSetup({async:false});
		$.getJSON (urlAllReports, function (json) {
			$.each( json['posts'], function( key,value ) {
				$('#self_Report_name_chart').append('<li id="report_charts'+value['testId']+'" style="list-style: outside none none;"><h2>'+value['testName']+'</h2></li>');

				var canHtml = '<canvas id="canvas_all_reports'+value['testId']+'" height="450" width="600" style="border-left: 2px solid;border-right: 2px solid;margin-left: 3px;"></canvas>';
						$('#report_charts'+value['testId']+'').append( canHtml );

				var urlGettingResults = "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=mychartsresults&columns=*&condition=customerId="+storedData1['userId']+" AND testId="+value['testId'];
				jQuery.ajaxSetup({async:false});
				$.getJSON (urlGettingResults, function (json1) {
					var valueStr = [];
					var dateval = [];
					$.each( json1['posts'], function( key1,value1 ) {

						valueStr.push(value1['testValue']);
						dateval.push(value1['date']);
						content = valueStr.toString();
						content1 = dateval.toString();
					});
					var lineChartData = {
						labels : content1.split(','),
						datasets : [
							{
								label: "",
								fillColor : "rgba(220,220,220,0.2)",
								strokeColor : "rgba(220,220,220,1)",
								pointColor : "rgba(220,220,220,1)",
								pointStrokeColor : "#fff",
								pointHighlightFill : "#fff",
								pointHighlightStroke : "rgba(220,220,220,1)",
								data : JSON.parse("[" + content + "]")
								// data : [10,20,30]
							}
						]
					}
					var ctx = document.getElementById("canvas_all_reports"+value['testId']+"").getContext("2d");
					window.myLine = new Chart(ctx).Line(lineChartData, {
						responsive: true
					});
				});
			});
		});

	},500);
}

function selfTableDisplay(){
	setTimeout(function(){
		var storedData1 = myApp.formGetData('logged_userId');
		var datesArray=[];
		var urlOFDates= "http://www.healthrecordspro.com/ws.php?type=mychartsvitalstabletests&format=json&customerid="+storedData1['userId'];
		jQuery.ajaxSetup({async:false});
		$.getJSON (urlOFDates, function (json) {
			$.each( json['posts'], function( key,value ) {
				$("#self_mon_tab_data").append('<th>'+value['testName']+'</th>');
			});
		});
		var urlselfDates = "http://healthrecordspro.com/ws.php?type=mychartsreportdatesdd&format=json&customerid="+storedData1['userId'];

			$.getJSON (urlselfDates, function (json1) {
				var key, count = 0;
				for(key in json1['posts']) {
					if(json1['posts'].hasOwnProperty(key)) {
						count++;
					}
				}
				var datesArray=[];
				$.each( json1['posts'], function( key,value ) {
					datesArray.push(value['date']);
				});
				for(var i=0;i<count;i++){
					var html = '';
					var urlDisplayValues = "http://healthrecordspro.com/ws.php?type=mychartsvitalstable&format=json&customerid="+storedData1['userId']+"&date="+datesArray[i];
						html += '<tr><td>'+datesArray[i]+'</td>';
					$.getJSON (urlDisplayValues, function (json2){
						$.each( json2['posts'], function( key1,value1 ) {
							html += '<td>'+value1+'</td>';
						});
						html += '</tr>';
						$("#self_table_data").append( html );
					});
				}
			});
	},500);
}

function richText ()
{
    setTimeout(function(){

        // document.ontouchmove = function(e){ e.preventDefault(); }
        var canvas  = document.getElementById('healthdiries_canvas');
        var canvastop = canvas.offsetTop

        var context = canvas.getContext("2d");

        var lastx;
        var lasty;

        context.strokeStyle = "#000000";
        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.lineWidth = 5;

        function clear() {
        context.fillStyle = "#ffffff";
        context.rect(0, 0, 300, 300);
        context.fill();
        }

        function dot(x,y) {
        context.beginPath();
        context.fillStyle = "#000000";
        context.arc(x,y,1,0,Math.PI*2,true);
        context.fill();
        context.stroke();
        context.closePath();
        }

        function line(fromx,fromy, tox,toy) {
        context.beginPath();
        context.moveTo(fromx, fromy);
        context.lineTo(tox, toy);
        context.stroke();
        context.closePath();
        }

        canvas.ontouchstart = function(event){
        event.preventDefault();

        lastx = event.touches[0].clientX;
        lasty = event.touches[0].clientY - canvastop;

        dot(lastx,lasty);
        }

        canvas.ontouchmove = function(event){
        event.preventDefault();

        var newx = event.touches[0].clientX;
        var newy = event.touches[0].clientY - canvastop;

        line(lastx,lasty, newx,newy);

        lastx = newx;
        lasty = newy;
        }
        // var clearButton = document.getElementById('clear')
    //      clearButton.onclick = clear

    //      clear()
    document.getElementById('clear').addEventListener('click', function() {
    context.clearRect(0, 0, canvas.width, canvas.height);
  }, false);

    },1000);

}

function HealthdiriesCanvasImgdisplay(id)
{
    var storedData1 = myApp.formGetData('logged_userId');
    setTimeout(function(){
    var url2 = "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=health_diaries&columns=*&condition=customerId="+storedData1['userId'];

        $.getJSON (url2, function (json) {
            // console.log(json['posts']);
            $.getJSON (url2, function (json){
                var key, count = 0;
                for(key in json['posts']) {
                    if(json['posts'].hasOwnProperty(key)) {
                        count++;
                    }
                }
                
                if(json['posts']==0){
                var data = "No Records Found!!!";
                $('#display_canvas_img').append(data);
                }
                else
                {
                for (var i=0;i<count;i++)
                {
                    if (json['posts'][i]['image'] != ''){
                    var x=json['posts'][i]['id']+','+id;

                    $('#display_canvas_img').append('<li><a href="#" onclick="deleteCanvasAlbmImg('+x+');" style="color:black;margin-right: -13px; margin-top: -23px;"><i class="fa fa-times-circle fa-2x" ></i></a><img src="http://healthrecordspro.com/newsite/uploads/sketch/'+json['posts'][i]['image']+'" width="200" height="200" onclick="HealthDiacanimageAlbumpopupdisplay(\''+json['posts'][i]['image']+'\')"></li>');
                    }

            }
            }
            });
        myApp.hidePreloader();
    });
        getTextData();
        },1000);
}

function deleteCanvasAlbmImg(id)
{
    var storedData1 = myApp.formGetData('logged_userId');
    myApp.confirm('Are you sure','Delete');

    $( ".modal-button-bold" ).click(function() {
        var storedData1 = myApp.formGetData('logged_userId');
        myApp.showPreloader();
        var url=  "http://www.healthrecordspro.com/ws.php?type=delete&format=json&table=health_diaries&columns=&condition=id="+id;
        // console.log(url);
        $.getJSON (url, function (json) {
             myApp.hidePreloader();
             $('#display_canvas_img').empty();
            HealthdiriesCanvasImgdisplay(id);

        });

    });
}

function HealthDiacanimageAlbumpopupdisplay(id)
{

    var popupHTML = '<div class="popup popupImage">'+
                                '<div class="content-block  " >'+
                                    '<div style="width: 100%;">'+
                                        '<div>'+
                                            '<img src="http://healthrecordspro.com/newsite/uploads/sketch/'+id+'" height="450" width="600" />'+
                                        '</div>'+
                                    '</div>'+
                                    '<p>Canvas Image</p>'+
                                    '<p><a href="#" style="color:black;float:right;margin-right: -13px; margin-top: -23px;" class="close-popup"><i class="fa fa-times-circle fa-2x" ></i></a></p>'+
                                '</div>'+
                            '</div>';
    myApp.popup(popupHTML);
}

function HealthdiariesInsertImage()
{
    var alias = 'text_dia';
    var alias1 = 'draw_can';
    if($('#' + alias.replace(/%/g, "\\\\")).hasClass('active')){
        HealthdiriesText();
    }else if($('#' + alias1.replace(/%/g, "\\\\")).hasClass('active')){
        var storedData1 = myApp.formGetData('logged_userId');
        var textvalue = $('#hd_textcontain').val();
        if(healthdiries_canvas.toDataURL() != '' ){
            myApp.showPreloader();
            $.post('http://healthrecordspro.com/mobileapp1/scriptfiles/upload-image.php',{
                  img : healthdiries_canvas.toDataURL(),
                  uid : storedData1['userId'],
                  // textvalue : document.getElementById('hd_textcontain').value
                },
                function(data) {
                    myApp.hidePreloader();
                    myApp.alert("Image uploaded",'Success');
            });
        }
    }
}

function HealthdiriesText()
{
	var textvalue = $('#hd_textcontain').val();
	var storedData1 = myApp.formGetData('logged_userId');

	var url="http://www.healthrecordspro.com/ws.php?type=insert&format=json&table=health_diaries&columns=textvalue,customerId&values='"+textvalue+"','"+storedData1['userId']+"'";

	$.getJSON (url, function (json) {
		$('#hd_textcontain').remove();
		myApp.alert("The Title Inserted",'Success');

	});
}

function getTextData()
{
    setTimeout(function(){
    var storedData1 = myApp.formGetData('logged_userId');
    var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=health_diaries&columns=*&condition=customerId="+storedData1['userId'];
    myApp.showPreloader();
    $.getJSON (url, function (json) {
        myApp.hidePreloader();
        var key, count = 0;
                for(key in json['posts']) {
                    if(json['posts'].hasOwnProperty(key)) {
                        count++;
                    }
                }
                if(json['posts']==0){
                var data = "No Records Found!!!";
                $('#hd_textcontain1').append(data);
                }
                else
                {
                for (var i=0;i<count;i++)
                {
                    //$('#hd_textcontain1_id').val(json['posts'][i]['id']);

                    if (json['posts'][i]['textvalue'] != '') {
                    $('#hd_textcontain1').append('<li><div class="item-content"><div class="item-inner" style="width: 72%;"><div class="item-title"><span>'+json['posts'][i]['textvalue']+'</span></div></div><i class="fa fa-pencil fa-lg" onclick="HealthDiriesTextEdit('+json['posts'][i]['id']+')"></i><i class="fa fa-trash fa-lg" onclick="HealthDiriesTextDelete('+json['posts'][i]['id']+')"></i></div></li>');
                    }
                }

            }
    });
    },500);
}

function HealthDiriesTextEdit(textId)
{
    mainView.router.loadPage('HealthdiriesTextEdit_page.html');
    setTimeout(function(){
        myApp.showPreloader();
        $('#update_healthdiries_text').val(textId);
        var storedData1 = myApp.formGetData('logged_userId');
        var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=health_diaries&columns=*&condition=id="+textId;
            $.getJSON (url, function (json) {
                myApp.hidePreloader();
                $('#hd_textcontain2').val(json['posts']['0']['textvalue']);
            });
    },1000);
}

function HealthDirisTextUpdate()
{
    var storedData1 = myApp.formGetData('logged_userId');
    var update_healthdiries_text = $('#update_healthdiries_text').val();
    var val = "textvalue = '"+$('#hd_textcontain2').val()+"'";

    var url="http://www.healthrecordspro.com/ws.php?type=update&format=json&table=health_diaries&columns="+val+"&condition=id="+update_healthdiries_text;
        $.getJSON (url, function (json) {
                if( json['posts'][0] ){

                        HealthdiriesCanvasImgdisplay();
                        myApp.alert("Your Details has been updated",'Success');
                        mainView.router.loadPage('health_diaries_tabs_display.html');
                    }
                    else
                    {
                        HealthdiriesCanvasImgdisplay();
                        myApp.alert("Your Details has been updated",'Success');
                        mainView.router.loadPage('health_diaries_tabs_display.html');
                    }
            
        });
}

function HealthDiriesTextDelete(textDelId)
{
    myApp.confirm('Are you sure','Delete');

    $( ".modal-button-bold" ).click(function() {
        var storedData1 = myApp.formGetData('logged_userId');
         myApp.showPreloader();
        var url=  "http://www.healthrecordspro.com/ws.php?type=delete&format=json&table=health_diaries&columns=&condition=id="+textDelId;
        $.getJSON (url, function (json) {
             myApp.hidePreloader();
            $("#hd_textcontain1").empty();
            HealthdiriesCanvasImgdisplay(); 
            mainView.router.loadPage('health_diaries_tabs_display.html');
        });
    });
}

function getDetailedSUmmary()
{
    var data = [];
    $('input:checkbox[id^="checkboxvalue_"]:checked').each(function(){
        data.push('&'+$(this).attr('name')+'='+$(this).attr('name'));
    });
    data = data.toString();
    data = data.replace (/,/g, "");

    var storedData1 = myApp.formGetData('logged_userId');
    $.ajax({
        type:'POST',
        // url:'http://healthrecordspro.com/mobileap/scriptfiles/customsummaryprint.php',
        url:'http://healthrecordspro.com/mobileapp1/scriptfiles/customsummaryprint.php',
        data : '&uid='+storedData1['userId']+data,
        cache: false,
        success: function(res)
        {
            setTimeout(function(){
                // alert(res);
                document.getElementById("health_summary_details").innerHTML = res;
                // $('#health_summary_details').html(res);
            },500);
        }
    })
    return false;

}

function emergencyContactsDis(){

    setTimeout(function(){

        var storedData1 = myApp.formGetData('logged_userId');
        var popupHTML = '';
        
        myApp.showPreloader();
        
        var url= "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=emergency_contacts&columns=*&condition=user_id="+storedData1['userId'];

        $.getJSON (url, function (json) {

            myApp.hidePreloader();

            popupHTML += '<div class="popup popupImage" style="display: block; width: 90%; height: 90%;background-color: white;margin: 10% auto auto 5%;">';
            popupHTML += '<p style="font-size: 150%;">Emergency Contact</p>';
            popupHTML += '<p><a href="#" style="color:black;float:right;margin-right: -7px; margin-top: -47px;" class="close-popup">';
            popupHTML += '<i class="fa fa-times-circle fa-2x" ></i>';
            popupHTML += '</a></p>';

            for( i=0;i < json['posts'].length;i++ ){

                var num = json['posts'][i]['mobile_phone'];
                var n = num.toString();


                popupHTML += '<div class="content-block">';
                popupHTML += '<div style="width: 100%;">';

                popupHTML += '<div><i class="fa fa-phone-square" style="font-size:23px;color:#51B8BD;">&nbsp&nbsp<a style="color: black;" onclick="callSomeone(\''+n+'\')"></i>'+json['posts'][i]['first_name']+' '+json['posts'][i]['last_name']+'</br>'+json['posts'][i]['mobile_phone']+'</a></div>';

                popupHTML += '</div>';
                popupHTML += '</div>';
                // console.log(popupHTML);
            }
            popupHTML += '</div>';
            myApp.popup( popupHTML );
        });

},500);

}

function callSomeone(mobileNumber){

    // alert(parseInt(mobileNumber));
    // console.log(mobileNumber);
    window.open('tel:'+mobileNumber, '_system');
     // navigator.app.loadUrl('tel:+919999999999', { openExternal:true });

}

function  findMyLocation ()
{
	navigator.geolocation.getCurrentPosition(showPosition, showError, { enableHighAccuracy: true } );
}
function showPosition(position) {
	var latitude = position.coords.latitude;
	var longitude = position.coords.longitude;

	// console.log('Received current location: ' + latitude + ',' + longitude);
	var secheltLoc = new google.maps.LatLng(latitude, longitude);

	var currentlocation = "http://maps.google.com/?q="+latitude+","+ longitude+"";
	$('#map_hidden').val(currentlocation);
	var myMapOptions = {
		zoom: 16
		,center: secheltLoc
		,mapTypeId: google.maps.MapTypeId.HYBRID
	};
	var theMap = new google.maps.Map(document.getElementById("map_canvas"), myMapOptions);

	var marker = new google.maps.Marker({
		map: theMap,
		draggable: false,
		position: new google.maps.LatLng(latitude, longitude),
		visible: true,
		title:'Title' // Title
	});
	var contentString = '<div class="map_anotaion_title">Please help me</div>'; //Address on pin click

	var infowindow = new google.maps.InfoWindow({
		content: contentString
	});
	infowindow.open(theMap,marker);
	google.maps.event.addListener(marker, "click", function (e) {
		infowindow.open(theMap,marker);
	});
}
function showError(error) {
	alert("Errorcode: "+ error.code+
			 "Errormessage: "+ error.message );
}

function ShareTheLocation()
{
	var shareLocationMap = $('#map_hidden').val();
	window.plugins.socialsharing.share(null,null,null,shareLocationMap);
}

function ShareTheLocation()
{
	var shareLocationMap = $('#map_hidden').val();
//	window.plugins.socialsharing.share(null,null,null,'"'+shareLocationMap+'"');
	window.plugins.socialsharing.share(null,null,null,shareLocationMap);
}
function sendSms(mobileNumber)
{
    var map_hidden = $('#map_hidden').val();
    // console.log(map_hidden);
    window.location.href = "sms:" + mobileNumber + "?body=" + map_hidden; 
    // window.location.href = "sms:" + mobileNumber + "?body=" + map_hidden + " I am at   "  + map_hidden;
}

function removeUserProfileImage()
{
    var storedData1 = myApp.formGetData('logged_userId');
    myApp.confirm('Are you sure','Delete');

    $( ".modal-button-bold" ).click(function() {
        var storedData1 = myApp.formGetData('logged_userId');
        myApp.showPreloader();
        var val = "image = ''";
        var url="http://www.healthrecordspro.com/ws.php?type=update&format=json&table=user_profile&columns="+val+"&condition=user_id="+storedData1['userId'];

        $.getJSON (url, function (json) {
             myApp.hidePreloader();
             mainView.router.loadPage('loginnormal.html');
            // $("#health_insurance_ul_"+id).remove();
        });

    });

}
function removeUserBirthImage()
{
    var storedData1 = myApp.formGetData('logged_userId');
    myApp.confirm('Are you sure','Delete');

    $( ".modal-button-bold" ).click(function() {
        var storedData1 = myApp.formGetData('logged_userId');
        myApp.showPreloader();
        var val = "dobimage = ''";
        var url="http://www.healthrecordspro.com/ws.php?type=update&format=json&table=user_profile&columns="+val+"&condition=user_id="+storedData1['userId'];

        $.getJSON (url, function (json) {
             myApp.hidePreloader();
             mainView.router.loadPage('loginnormal.html');
            // $("#health_insurance_ul_"+id).remove();
        });

    });

}

function removeAllergiesImage()
{
    var storedData1 = myApp.formGetData('logged_userId');
    myApp.confirm('Are you sure','Delete');

    $( ".modal-button-bold" ).click(function() {
        var storedData1 = myApp.formGetData('logged_userId');
        myApp.showPreloader();
        var val = "image = ''";
        var url="http://www.healthrecordspro.com/ws.php?type=update&format=json&table=allergies&columns="+val+"&condition=customerid="+storedData1['userId'];

        $.getJSON (url, function (json) {
             myApp.hidePreloader();
             mainView.router.loadPage('loginnormal.html');
            // $("#health_insurance_ul_"+id).remove();
        });

    });
}

function removeEmergencyImage()
{
    var storedData1 = myApp.formGetData('logged_userId');
    myApp.confirm('Are you sure','Delete');

    $( ".modal-button-bold" ).click(function() {
        var storedData1 = myApp.formGetData('logged_userId');
        myApp.showPreloader();
        var val = "image = ''";
        var url="http://www.healthrecordspro.com/ws.php?type=update&format=json&table=emergency_contacts&columns="+val+"&condition=user_id="+storedData1['userId'];

        $.getJSON (url, function (json) {
             myApp.hidePreloader();
             mainView.router.loadPage('loginnormal.html');
            // $("#health_insurance_ul_"+id).remove();
        });

    });
}

function removeFrontInsuImage()
{
    var storedData1 = myApp.formGetData('logged_userId');
    myApp.confirm('Are you sure','Delete');

    $( ".modal-button-bold" ).click(function() {
        var storedData1 = myApp.formGetData('logged_userId');
        myApp.showPreloader();
        var val = "card1 = ''";
        var url="http://www.healthrecordspro.com/ws.php?type=update&format=json&table=health_insurance&columns="+val+"&condition=user_id="+storedData1['userId'];

        $.getJSON (url, function (json) {
             myApp.hidePreloader();
             mainView.router.loadPage('loginnormal.html');
            // $("#health_insurance_ul_"+id).remove();
        });

    });
}

function removeBackInsuImage()
{
    var storedData1 = myApp.formGetData('logged_userId');
    myApp.confirm('Are you sure','Delete');

    $( ".modal-button-bold" ).click(function() {
        var storedData1 = myApp.formGetData('logged_userId');
        myApp.showPreloader();
        var val = "card2 = ''";
        var url="http://www.healthrecordspro.com/ws.php?type=update&format=json&table=health_insurance&columns="+val+"&condition=user_id="+storedData1['userId'];

        $.getJSON (url, function (json) {
             myApp.hidePreloader();
             mainView.router.loadPage('loginnormal.html');
            // $("#health_insurance_ul_"+id).remove();
        });

    });
}

function removeMedicationImage()
{
    var storedData1 = myApp.formGetData('logged_userId');
    myApp.confirm('Are you sure','Delete');

    $( ".modal-button-bold" ).click(function() {
        var storedData1 = myApp.formGetData('logged_userId');
        myApp.showPreloader();
        var val = "image = ''";
        var url="http://www.healthrecordspro.com/ws.php?type=update&format=json&table=medications&columns="+val+"&condition=customerId="+storedData1['userId'];

        $.getJSON (url, function (json) {
             myApp.hidePreloader();
             mainView.router.loadPage('loginnormal.html');
            // $("#health_insurance_ul_"+id).remove();
        });

    });
}

function removeImmuImage()
{
    var storedData1 = myApp.formGetData('logged_userId');
    myApp.confirm('Are you sure','Delete');

    $( ".modal-button-bold" ).click(function() {
        var storedData1 = myApp.formGetData('logged_userId');
        myApp.showPreloader();
        var val = "image = ''";
        var url="http://www.healthrecordspro.com/ws.php?type=update&format=json&table=immunizations&columns="+val+"&condition=user_id="+storedData1['userId'];

        $.getJSON (url, function (json) {
             myApp.hidePreloader();
             mainView.router.loadPage('loginnormal.html');
            // $("#health_insurance_ul_"+id).remove();
        });

    });
}

function removeOrganImage()
{
    var storedData1 = myApp.formGetData('logged_userId');
    myApp.confirm('Are you sure','Delete');

    $( ".modal-button-bold" ).click(function() {
        var storedData1 = myApp.formGetData('logged_userId');
        myApp.showPreloader();
        var val = "image = ''";
        var url="http://www.healthrecordspro.com/ws.php?type=update&format=json&table=organdonor&columns="+val+"&condition=customerId="+storedData1['userId'];

        $.getJSON (url, function (json) {
             myApp.hidePreloader();
             mainView.router.loadPage('loginnormal.html');
            // $("#health_insurance_ul_"+id).remove();
        });

    });
}

function removeSurgeriesImage()
{
    var storedData1 = myApp.formGetData('logged_userId');
    myApp.confirm('Are you sure','Delete');

    $( ".modal-button-bold" ).click(function() {
        var storedData1 = myApp.formGetData('logged_userId');
        myApp.showPreloader();
        var val = "image = ''";
        var url="http://www.healthrecordspro.com/ws.php?type=update&format=json&table=surgeries&columns="+val+"&condition=user_id="+storedData1['userId'];

        $.getJSON (url, function (json) {
             myApp.hidePreloader();
             mainView.router.loadPage('loginnormal.html');
            // $("#health_insurance_ul_"+id).remove();
        });

    });
}
function docApptimePicker(){
$('#doc_apoint_time').timepicki();
}
function docApptimePicker1(){
$('#doc_apoint_reminder_time').timepicki();
}
function docApptimePicker2(){
$('#doc_apoint_sec_reminder_time').timepicki();
}
//function getmediTime(){
//    $('#medi_remind_time').timepicki();
//}
function DetailedSummary(){


    var storedData1 = myApp.formGetData('logged_userId');
    
    window.open('http://healthrecordspro.com/newsite/prints/detailedsummaryprint_pdf.php?app_session='+storedData1['userId'], '_system');
    myApp.alert("Your Detailed Summary has been downloaded please check your downloads",'Success');
    return false;
}
function BriefSummary(){

    var storedData1 = myApp.formGetData('logged_userId');

    window.open('http://healthrecordspro.com/newsite/prints/printsummary_pdf.php?app_session='+storedData1['userId'], '_system');
    myApp.alert("Your Brief Summary has been downloaded please check your downloads",'Success');
    return false;

}
function exporttoPDF(){

    var storedData1 = myApp.formGetData('logged_userId');
    var data = [];
    $('input:checkbox[id^="checkboxvalue_"]:checked').each(function(){
        data.push($(this).attr('name'));
    });
    data = data.toString();
    // data = data.replace (/,/g, ""); //to remove the comma that generate automatically
    // window.open('prints/customsummaryprint_pdf.php?'+data, '_blank');

    window.open('http://healthrecordspro.com/newsite/prints/customsummaryprint_pdf.php?app_session='+storedData1['userId']+'&data='+data, '_system');
    myApp.alert("Your Health Summary has been downloaded please check your downloads",'Success');

    return false;
}

function ExportPdfPed(id)
{
    window.open('http://healthrecordspro.com/newsite/prints/printpediatricschild_pdf.php?child='+id, '_system');

    return false;
}

function getMediaAlbums(){
	var storedData1 = myApp.formGetData('logged_userId');

	var urlGetTitle= "http://www.healthrecordspro.com/ws.php?type=allmedia&format=json&customerid="+storedData1['userId'];
	var albumsDetails = [];
	$.getJSON (urlGetTitle, function (json) {
		$.each( json['posts'], function( key,value ) {
			albumsDetails.push(value);
		});
		myApp.showPreloader();
		jQuery.ajaxSetup({async:false});
		$.each( albumsDetails, function( key,value ) {
			var url1 = "http://www.healthrecordspro.com/ws.php?type=allmediaalbums&format=json&customerid="+storedData1['userId']+"&catid="+value['id'];
			$.getJSON (url1, function (json1) {
				if( json1['posts'][0] != 0 ){
					var CategotyName = value['name'];

					var data = "<ul style='list-style: outside none none;'><li id='titles_display'><div class='item-content'><div class='item-inner'><div class='item-title' style='color: #000000;font-weight: bold;'>"+CategotyName.toUpperCase()+"</div></div></div></li><div class='row' id='albums_dis_"+value['id']+"' style='float: left;margin: 5px;text-align: center;width: 96%;'></ul>";

					$('#albums_names').append(data);
				}
				$.each( json1['posts'], function( key1,value1 ) {
					var countofImages = [];
					var GettingCount = "http://www.healthrecordspro.com/ws.php?type=select_count&format=json&table=scanneditems&columns=*&condition=userid="+storedData1['userId']+" AND albumid="+value1['id'];
					$.getJSON (GettingCount, function (json2) {
						countofImages.push(json2['posts'][0]['count']);
					});
					if( value1 != 0 ){
						$('#albums_dis_'+value['id']).append('<div class="col-33 tablet-33" ><a href="manage_albums_images.html" class="item-link" onclick="view_album_images('+value1['id']+',\''+value1['title']+'\',\''+CategotyName+'\')" ><i class="fa fa-folder-o" style=" color: #0db7c4;font-size: 50px;"></i><div style="color:#000;font-size:13px">'+value1['title']+'('+countofImages+')</div></a></div>');
					}
				});
			});
		});
myApp.hidePreloader();
	});
}

function getSectionsData(){
    var storedData1 = myApp.formGetData('logged_userId');
    myApp.showPreloader();
    $.ajax({
        type:'POST',
        url:"http://www.healthrecordspro.com/ws.php?type=sectionpreferences1&format=json",
        data:"",
        dataType:"json",
        async:false,
        contentType: false,
        processData: false,
        success:function (res) {
            setTimeout(function(){
                console.log(res);
                $('#sections_pref').html('');
                
                $('#sections_pref').append('<li><label class="label-checkbox item-content"><input type="checkbox" onchange="if(this.checked) {$(\'.sections_pag\').prop(\'checked\', true);}else{ $(\'.sections_pag\').prop(\'checked\', false);}"><div class="item-media"><i class="icon icon-form-checkbox"></i></div><div class="item-inner"><div class="item-title" style="color: black;">&nbsp;&nbsp;&nbsp;Check All</div></div></label></li>');

                $.each( res['posts'], function( key, val ) {
                    var checked = SectionPreferencesCheck(val['id']);
                    if(val['showinsection'] == '0'){
                    if (checked == '1' ){
                        $('#sections_pref').append('<li><label class="label-checkbox item-content"><input type="checkbox" class="sections_pag" name="sectionpref[]" id="'+val['id']+'" value="'+val['id']+'" checked="checked"><div class="item-media"><i class="icon icon-form-checkbox"></i></div><div class="item-inner"><div class="item-title" style="color: black;">&nbsp;&nbsp;&nbsp;'+val['name']+'</div></div></label></li>');
                    }else{
                        $('#sections_pref').append('<li><label class="label-checkbox item-content"><input type="checkbox" class="sections_pag" name="sectionpref[]" id="sectionpref_'+val['id']+'" value="'+val['id']+'"><div class="item-media"><i class="icon icon-form-checkbox"></i></div><div class="item-inner"><div class="item-title" style="color: black;">&nbsp;&nbsp;&nbsp;'+val['name']+'</div></div></label></li>');
                    }
                }

                });
                myApp.hidePreloader();
            },1000);
            
        }

    });

}

function SectionPreferencesCheck(id)
{
    var storedData1 = myApp.formGetData('logged_userId');
    var returnVal = "";
    $.ajax({
        type:'POST',
        url:"http://www.healthrecordspro.com/ws.php?type=select&format=json&table=usersections&columns=count(*) as count&condition=customerId="+storedData1['userId']+" AND sectionId="+id+"AND showinsection=0",
        data:"",
        dataType:"json",
        async:false,
        contentType: false,
        processData: false,
        success:function (res) {
            // console.log(res['posts'][0]['count']);
            returnVal = res['posts'][0]['count'];
        }
    });
    // console.log(returnVal);
    return returnVal;
}

function UpdateSectionsPre()
{
    // console.log(  $('#section_pre_form').serializeArray() );
    var storedData1 = myApp.formGetData('logged_userId');
    myApp.showPreloader();
    $.ajax({
        type:'POST',
        url:"http://healthrecordspro.com/mobileapp1/scriptfiles/updateSectionPreference.php?uid="+storedData1['userId']+"&update=Update",
        data: $('#section_pre_form').serializeArray(),
        success:function (res) {
            // alert(res);
            myApp.alert("Your Sections Updated",'Success');
        }

    });
    myApp.hidePreloader();
}
var currentMenuModuleId = '';
function getHomepageSections(){
        // myApp.showPreloader();
        // myApp.hidePreloader();
        var storedData1 = myApp.formGetData('logged_userId');
                // $('#attachment_id').val(storedData1['userId']);

                $.ajax({
                    type:'POST',
                    url:"http://www.healthrecordspro.com/ws.php?type=sectionuserpreference&format=json&customerid="+storedData1['userId'],
                    data:"",
                    dataType:"json",
                    contentType: false,
                    processData: false,
                    success:function (res) {

                        $('#display_home_sections').html('');
                        $.each( res['posts'], function( key, val ) {
                            //var checked = SectionPreferencesCheck(val['id']);
                        //  if (checked == '1'){
                                $('#display_home_sections').append('<li onclick="assignModuleId('+val['sectionId']+')"><a href="'+val['filename_mobile']+'" class="item-link" onclick="'+val['onclick_mobile']+'" ><div class="item-content white"><div class="item-inner"><div class="item-title"><img src="img/'+val['icon_mobile']+'" height="37"/><span>'+val['name']+'</span></div></div></div></a></li>');
                        //  }
                        });
                        

                    }

                });

                // return false;
    }

function MobileAppInfo(){
	if (tipID != null){
	 labresultsListInfo();
	}
    myApp.openPanel('left');
    $('#usefultips_mobile').html('');
    var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=modules&limit=250&columns=mobiletips&condition=id="+currentMenuModuleId;
    $.getJSON (url, function (json) {
        $('#usefultips_mobile').html(json['posts']['0']['mobiletips']);
    });
}
function assignModuleId( moduleId ){
    currentMenuModuleId = moduleId;

}

function OpenPopUp(catId,selectId){
    var storedData1 = myApp.formGetData('logged_userId');
    var popupHTML = '<div class="popup popUpDisplayOptions">'+
                      '<div class="content-block">'+

                        '<div class="list-block popup-self" style="padding:0;width:100%;"><h2 style="border-bottom: 1px solid #ddd;">New</h2>'+
                        '<div id="loadingmessage1" style="display:none;text-align:center;"><img src="img/default.gif" align="middle"/></div>'+
                            '<div style="text-align: center; width: 28%; float:left;margin-right:5%"  >'+
                              '<a href = "javascript:void(0);" onclick="CreateFolder('+catId+',\''+selectId+'\');">'+
                                  '<i class="fa fa-folder-o" style=" color: #000;font-size: 40px;height:50px;"></i>'+
                                    '<span align="center" style="color:#000;font-size:13px;display: block;">Create Folder</span>'+
                                '</a>'+
                            '</div>'+
                         '<div style="text-align: center; width: 28%; float:left;margin-right:5%"  >'+

                          '<form id="CreateUploadImage_form" enctype="multipart/form-data">'+
                            '<ul style="background-color:#FFFFFF">'+
                              '<li>'+
                                '<div class="image-upload">'+

                                  '<label for="file">'+
                                    '<i class="fa fa-upload fa-2x" style=" color: #000;font-size: 40px;height:50px;"></i>'+
                                    '<span align="center" style="color:#000;font-size:13px;display:block;">Upload Image</span>'+
                                  '</label>'+
                                    '<input type="file" name="myfile" id="file" multiple="true" accepts="image/*" required onchange="CreateUploadImage('+catId+')"/>'+
                                '</div>'+
                              '</li>'+
                            '</ul>'+
                              '<div class="row" >'+
                                  '<input type="hidden" name="catId" id="catId" value="'+catId+'" />'+
                                  '<input type="hidden" name="customerId" id="customerId" value="'+storedData1['userId']+'" />'+
                                  '<input type="hidden" name="option" id="option" value="UploadBrowseImage" />'+
                                  '<input type="hidden" name="sectionname" id="sectionname" value="'+selectId+'" />'+
                                '</div>'+
                          '</form>'+
                        '</div>'+
                         '<div style="text-align: center; width: 28%; float:left;margin-right:5%"  >'+

                        '<div class="list-block">'+
                            '<ul style="background-color:#FFFFFF">'+
                                '<li id="Cambutton_button">'+
                                '<i class="fa fa-camera fa-2x" style=" color: #000;font-size: 40px;height:50px;"></i>'+
                                    '<input type="button" id="cameraCapture" onclick="capturePhoto();" class="Cambutton"/>'+
                                '<span align="center" style="color:#000;font-size:13px;display: block;">Capture Image</span>'+
                                '</li>'+
                                '<div class="row" >'+
                                    '<div class="row" >'+
                                          '<input type="hidden" name="camera_catId" id="camera_catId" value="'+catId+'" />'+
                                          '<input type="hidden" name="camera_customerId" id="camera_customerId" value="'+storedData1['userId']+'" />'+
                                          '<input type="hidden" name="camera_sectionname" id="camera_sectionname" value="'+selectId+'" />'+
                                    '</div>'+
                                    '<div class="col-5"></div>'+
                                    '<div class="col-5"></div>'+
                                    '<div class="col-30"></div>'+
                                '</div>'+
                            '</ul>'+
                        '</div>'+
                        '</div>'+
                        '</div>'+
                      '</div>'+
                    '</div>';
    myApp.popup(popupHTML);
}

function CreateFolder(catId,selectId)
{
	$('#loadingmessage1').css("display","block");
    var storedData1 = myApp.formGetData('logged_userId');
   setTimeout(function(){ $.ajax({
        type: 'POST',
        url: 'http://healthrecordspro.com/mobileapp1/scriptfiles/albumscript/DriveUpload.php',
        async: false,
        data: "catId="+catId+"&customerId="+storedData1['userId']+"&option=CountNxtId",
        success:function (count) {
            // myApp.alert(data);
            myApp.modal({ 
                    title: 'Folder Name',
                    text: '',
                    afterText: '<input type="text" class="modal-text-input" value="'+selectId+' '+count+'"/>',
                    buttons: [{
                                text: 'OK',
                                onClick: function() { 
                                    $.ajax({
                                        type: 'POST',
                                        url: 'http://healthrecordspro.com/mobileapp1/scriptfiles/albumscript/DriveUpload.php',
                                        data: "foldername="+$('.modal-text-input').val()+"&catId="+catId+"&customerId="+storedData1['userId']+"&option=CreateFolder",
                                        success:function (data) {
                                            // myApp.alert(data);
                                            $('.popup').remove();
                                            $('.popup-overlay').remove();
                                            document.getElementById('display_albums_area').innerHTML="";
                                            manage_albums(catId,selectId);
                                           
                                        }
                                    });
                                }
                            },
                            {
                                text: 'Cancel',
                                onClick: function() { 
                                    // myApp.alert&#40;'You clicked Cancel!'&#41; 
                                }
                            }]
                });
        }
    });},3000);
}

function CreateUploadImage(catid)
{
	$('#loadingmessage1').css("display","block");
    var storedData1 = myApp.formGetData('logged_userId');
    
    formData = new FormData($('#CreateUploadImage_form')[0]);
     //myApp.showPreloader();
   setTimeout(function(){ $.ajax({
        type: 'POST',
        url: 'http://healthrecordspro.com/mobileapp1/scriptfiles/albumscript/DriveUpload.php',
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success:function (data) {
            // myApp.alert(data); 
            $('.popup').remove();
            $('.popup-overlay').remove();
            $('#display_albums_area').empty();
            manage_albums(catid);
            myApp.hidePreloader();
            $('#lodr').css("display","none");
        }
    });},3000);
    
}
$('.popup-overlay').click(function(){
	myApp.closeModal(popup)
});
function OpenPopUpSingleImageUpInAlbm(AlbumUpSImgId,tileAlbums){
    var storedData1 = myApp.formGetData('logged_userId');
   
    myApp.showPreloader();
    var popupHTML = '<div class="popup popUpDisplayOptions remove-on-close modal-in">'+
                      
                      '<div class="content-block">'+
                        '<div class="list-block popup-self" style="padding:0"><h2 style="border-bottom: 1px solid #ddd;">New</h2>'+
                        '<div id="loadingmessage1" style="display:none;text-align:center"><img src="img/default.gif" align="middle"/></div>'+
                            '<div style="text-align: center; width: 20%; float:left;margin-right:5%"  >'+
                              '<a href = "javascript:void(0);" onclick="RenameFolder('+AlbumUpSImgId+',\''+tileAlbums+'\');">'+
                                  '<i class="fa fa-pencil fa-lg" style=" color: #000;font-size: 40px;height:50px;"></i>'+
                                  '<span align="center" style="color:#000;font-size:13px;display: block;">Rename folder</span>'+
                                '</a>'+
                            '</div>'+
                           
                         '<div style="text-align: center; width: 20%; float:left;margin-right:5%"  >'+
                            '<form id="CreateUploadSingleImage_form" enctype="multipart/form-data">'+
                            '<ul style="background-color:#FFFFFF">'+
                              '<li>'+
                                '<div class="image-upload">'+
                                  '<label for="file">'+
                                    '<i class="fa fa-upload fa-2x" style=" color: #000;font-size: 40px;height:50px;"></i>'+
                                    '<span align="center" style="color:#000;font-size:13px;display:block;">Upload image or video </span>'+

                                  '</label>'+
                                    '<input type="file" name="myfile" id="file" multiple="true" accepts="image/*" required onchange="CreateSingleUploadImage('+AlbumUpSImgId+')"/>'+
                                '</div>'+
                              '</li>'+
                            '</ul>'+
                              '<div class="row" >'+
                                  '<input type="hidden" name="albumid" id="albumid" value="'+AlbumUpSImgId+'" />'+
                                  '<input type="hidden" name="customerId" id="customerId" value="'+storedData1['userId']+'" />'+
                                  '<input type="hidden" name="option" id="option" value="UploadBrowseImage" />'+
                                '</div>'+
                          '</form>'+
                        '</div>'+
                        '<div style="text-align: center; width: 20%; float:left;margin-right:5%"  >'+

                        '<div class="list-block">'+
                            '<ul style="background-color:#FFFFFF">'+
                                '<li id="Cambutton_button">'+
                                '<i class="fa fa-camera fa-2x" style=" color: #000;font-size: 40px;height:50px;"></i>'+
                                    '<input type="button" id="cameraCapture" onclick="capturePhoto1('+AlbumUpSImgId+');" class="Cambutton"/>'+
                                '<span align="center" style="color:#000;font-size:13px;display:block;">Capture image </span>'+
                                '</li>'+
                                '<div class="row" >'+
                                    '<div class="row" >'+
                                          '<input type="hidden" name="camera_albumid" id="camera_albumid" value="'+AlbumUpSImgId+'" />'+
                                          '<input type="hidden" name="camera_customerId" id="camera_customerId" value="'+storedData1['userId']+'" />'+
                                    '</div>'+
                                    '<div class="col-5"></div>'+
                                    '<div class="col-5"></div>'+
                                    '<div class="col-30"></div>'+
                                '</div>'+

                            '</ul>'+
                        '</div>'+
                        '</div>'+
                            '<div style="text-align: center; width: 20%; float:left;margin-right:5%"  >'+
                            '<div class="list-block" style=" margin-top: 0px;">'+
                                '<ul style="background-color:#FFFFFF">'+
                                    '<li>'+
                                    '<a style="color:black;margin-right: -13px; margin-top: -23px;" onclick="DeleteAlbums('+AlbumUpSImgId+');" href="#"><i class="fa fa-times-circle" style="font-size: 40px;height:50px;"></i></a>'+
                                    '<span align="center" style="color:#000;font-size:13px;display:block;">Delete Folder</span>'+
                                    
                                '</li>'+
                                '<div class="row" >'+
                                    '<div class="row" >'+
                                          '<input type="hidden" name="delete_album_id" id="delete_album_id" value="'+AlbumUpSImgId+'" />'+
                                          '<input type="hidden" name="d_a_customerId" id="d_a_customerId" value="'+storedData1['userId']+'" />'+
                                    '</div>'+
                                    '<div class="col-5"></div>'+
                                    '<div class="col-5"></div>'+
                                    '<div class="col-30"></div>'+
                                '</div>'+
                                '</ul>'+
                            '</div>'+

                        '</div>'+
                        '</div>'+
                        '<p><a href="#" class="close-popup">Close me</a></p>'+
                     '</div>'+
                    '</div>';
    myApp.popup(popupHTML);
     myApp.hidePreloader();
}

function RenameFolder(albumId,tileAlbums)
{
    var storedData1 = myApp.formGetData('logged_userId');
    // $.ajax({
    //  type: 'POST',
    //  url: 'http://healthrecordspro.com/mobileapp1/scriptfiles/albumscript/DriveUpload.php',
    //  data: "catId="+catId+"&customerId="+storedData1['userId']+"&option=CountNxtId",
    //  success:function (count) {
    //      // myApp.alert(data);
    myApp.showPreloader();
            myApp.modal({
                    title: 'Change album name',
                    text: '',
                    afterText: '<input type="text" class="modal-text-input" value="'+tileAlbums+'"/>',
                    buttons: [{
                                text: 'OK',
                                onClick: function() {
                                	$('#loadingmessage1').css("display","block");
                                    setTimeout(function(){$.ajax({
                                        type: 'POST',
                                        url: 'http://healthrecordspro.com/mobileapp1/scriptfiles/albumscript/DriveAlbumSingleImgUpload.php',
                                        data: "foldername="+$('.modal-text-input').val()+"&albumId="+albumId+"&customerId="+storedData1['userId']+"&option=RenameAlbumName",
                                        success:function (data) {
                                            $('.popup').remove();
                                            $('.popup-overlay').remove();
                                            manage_albums(albumId);
                                            mainView.router.loadPage('manage_albums.html');
                                        }
                                    });},2000);
                                }
                            },
                            {
                                text: 'Cancel',
                                onClick: function() { 
                                    // myApp.alert&#40;'You clicked Cancel!'&#41; 
                                }
                            }]
                });
            myApp.hidePreloader();


//      }
//  });
}

function CreateSingleUploadImage(AlbumUpSImgId){
    var storedData1 = myApp.formGetData('logged_userId');
    $('#loadingmessage1').css("display","block");
    formData = new FormData($('#CreateUploadSingleImage_form')[0]);
    setTimeout(function(){$.ajax({
        type: 'POST',
        url: 'http://healthrecordspro.com/mobileapp1/scriptfiles/albumscript/DriveAlbumSingleImgUpload.php',
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success:function (data) {
            //mainView.router.loadPage('manage_albums.html');
            myApp.hidePreloader();
            $('.popup').remove();
            $('.popup-overlay').remove();
            $('#self_img').empty();
            view_album_images(AlbumUpSImgId);
            $('#loadingmessage1').hide();
        }

    });},2000);
    
}

function DeleteAlbums(abmId){

    var storedData1 = myApp.formGetData('logged_userId');
    var categoryiId = [];

    myApp.confirm('Are you sure','Delete');
        $( ".modal-button-bold" ).click(function() {
            var url3= "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=scannedalbums&columns=*&condition=id="+abmId;
            $.getJSON (url3, function (json) {
                categoryiId.push(json['posts'][0]['categoryId']);
            });

            myApp.showPreloader();
            var url=  "http://www.healthrecordspro.com/ws.php?type=delete&format=json&table=scannedalbums&columns=&condition=id="+abmId;

                var url1=  "http://www.healthrecordspro.com/ws.php?type=delete&format=json&table=scanneditems&columns=&condition=albumid="+abmId;
                $.getJSON (url1, function (json) {

                });
            $.getJSON (url, function (json) {
                $.getJSON (url1, function (json) {
                 myApp.hidePreloader();

                mainView.router.loadPage('manage_albums.html');
                $('.popup').remove();
                $('.popup-overlay').remove();
                manage_albums(categoryiId[0]);
            });
            });

        });
}

function getGridViewSections()
{
    var storedData1 = myApp.formGetData('logged_userId');
    $.ajax({
        type:'POST',
        url:"http://www.healthrecordspro.com/ws.php?type=sectionuserpreference&format=json&customerid="+storedData1['userId'],
        data:"",
        dataType:"json",
        async:false,
        contentType: false,
        processData: false,
        success:function (res) {
            setTimeout(function(){
                $('#sections_displayGridView').html('');
                $.each( res['posts'], function( key, val ) {
                    $('#sections_displayGridView').append('<div class="col-50 tablet-33" style="background-color: rgb(13, 183, 196);"><a href="'+val['filename_mobile']+'" class="item-link" onclick="'+val['onclick_mobile']+'" ><img src="img/'+val['icon_mobile']+'" height="70"/><div>'+val['name']+'</div></a></div>');

                    });
            },500);
        }
    });
}

function selectHomepageDisplay(){
    var storedData1 = myApp.formGetData('logged_userId');
    setTimeout(function(){
        var url1=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=user_profile&columns=view_type&condition=user_id="+storedData1['userId'];
        $.getJSON (url1, function (json) {

                if(json['posts']['0']['view_type'] == 1){
                    getHomepageSections();
                    mainView.router.loadPage('loginnormal.html');
                }
                if(json['posts']['0']['view_type'] == 0){
                    getGridViewSections();
                    mainView.router.loadPage('hrp_all_sections.html');
                }
            
        });
    },500);
}

function forgetpasswordemail(){
    var email = $('#email_forpass').val();

    var url = "http://healthrecordspro.com/ws.php?type=resetpassword&format=json&emailid="+email+"";
    $.getJSON (url, function (json) {
            mainView.router.loadPage('forgotpassword_sucess.html');
            // myApp.alert("Please check your email for the password",'Success');
    });
}

function GrandAccessSubmit(){
    var email_ac = $('#Email_gacess').val();
    var gac_role = $('#gac_role_select').val();
//    var url = "http://healthrecordspro.com/ws.php?type=resetpassword&format=json&emailid="+email_ac+"";
//    $.getJSON (url, function (json) {
//            // mainView.router.loadPage('');
//            // myApp.alert("Please check your email for the password",'Success');
//    });

    var url1="http://www.healthrecordspro.com/ws.php?type=insert&format=json&table=grantAccessRoles&columns=role,active&values='"+gac_role+"','1'";

        $.getJSON (url1, function (json) {
            myApp.hidePreloader();

            if( json['posts'][0] ){
                myApp.alert("Your Details has been Created",'Success');
                // mainView.router.loadPage('implants_medicaldevices_listing.html');
            }else{
                myApp.alert("Your Details Not Created",'Failure');
            }

        });
}

function account_summary1(){
    setTimeout(function(){
        var storedData1 = myApp.formGetData('logged_userId');
        var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=orders&columns=*&condition=customerId="+storedData1['userId'];

            $.getJSON (url, function (json) {
                var key3, count3 = 0;
                for(key3 in json['posts']) {
                    if(json['posts'].hasOwnProperty(key3)) {
                    count3++;
                    }
                }
                for(k=0;k<count3;k++){
                    var url1=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=subscriptions&columns=*&condition=customerId="+storedData1['userId']+" AND orderId="+json['posts'][k]['id'];
                    $.getJSON (url1, function (json) {
                        var key4, count4 = 0;
                        for(key4 in json['posts']) {
                            if(json['posts'].hasOwnProperty(key4)) {
                            count4++;
                            }
                        }
                        for(l=0;l<count4;l++){
                            // var Sdates = json['posts'][l]['startingDate'];
                            // $('#start_date').append('Sdates');
                            // alert(Sdates);
                        }
                    });
                    var url2=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=packagesduration&columns=*&condition=id="+json['posts'][k]['packageDurationPriceId'];
                    $.getJSON (url2, function (json) {
                        var key1, count1 = 0;
                            for(key1 in json['posts']) {
                                if(json['posts'].hasOwnProperty(key1)) {
                                count1++;
                                }
                            }
                            for(j=0;j<count1;j++){
                                $('#account_details').html('');
                                var url3=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=packages&columns=*&condition=id="+json['posts'][j]['packageId'];
                                $.getJSON (url3, function (json) {
                                    var key, count = 0;
                                    for(key in json['posts']) {
                                        if(json['posts'].hasOwnProperty(key)) {
                                        count++;
                                        }
                                    }

                                    for(i=0;i<count;i++){
                                    $('#account_details').append('<div class="span5 offset1" style=" background-color: #F1F1F1; width:100%; height:auto;background-repeat: no-repeat; background-position: bottom right; border: 1px solid #D4D4D4; border-radius: 5px; margin: 10px 10px; padding: 15px;"><h1 style="overflow: hidden; text-overflow: ellipsis; background-color: #0171bc; border-top-left-radius: 5px; border-top-right-radius: 5px; color: #fff; margin: -15px -15px 15px -15px; padding: 15px;font-size: 14px;">'+json['posts'][i]['name']+'</h1><ul style="list-style: outside none none;"><li style="margin-left: -45px;font-size: 12px;">'+json['posts'][i]['description']+'</li></ul><div class="row"><div class="col-25">Price</div><div class="col-25">Start Date </div><div class="col-25" id="end_date">End Date</div><div class="col-25">Remaining Days</div></div></div>');
                                    }
                                });
                            }
                    });
                }

            });
    },500);
}

function account_summary(){
	var storedData1 = myApp.formGetData('logged_userId');
	var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=orders&columns=*&condition=customerId="+storedData1['userId'];

	var startDate = [];
	var endDate = [];
	var price = [];
	var name = [];
	var description = [];
	var daysDifference = [];

	jQuery.ajaxSetup({async:false});
	myApp.showPreloader();
	$.getJSON (url, function (json) {

		$.each( json['posts'], function( key,value ) {

			var orderId = value.id;
			var packageDurationId = value.packageDurationPriceId;
			
			var url1=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=subscriptions&columns=*&condition=orderId="+orderId;

			$.getJSON (url1, function (json1) {

				$.each( json1['posts'], function( key1,value1 ) {
					//var startDate = value1.startingDate;
					//var endDate = value1.endingDate;
					var date1 = new Date(value1.startingDate);
					var date2 = new Date(value1.endingDate);
					var timeDiff = Math.abs(date2.getTime() - date1.getTime());
					var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
					daysDifference.push(diffDays);
					startDate.push( value1.startingDate );
					endDate.push( value1.endingDate );

				});
			});
			var url2=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=packagesduration&columns=*&condition=id="+packageDurationId;
			$.getJSON (url2, function (json2) {
				$.each( json2['posts'], function( key2,value2 ) {

					//var price = value2.price;
					price.push( value2.price );
					var packageId = value2.packageId;

					var url3=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=packages&columns=*&condition=id="+packageId;
					$.getJSON (url3, function (json3) {
						$.each( json3['posts'], function( key3,value3 ) {
							name.push( value3.name );
							description.push( value3.description );
						});
					});
				});
			});
			
			
		});

	});
	
	setTimeout(function(){
		$('#account_details').html('');
		$.each( startDate, function( key4,value4 ) {

			$('#account_details').append('<div class="span5 offset1" style=" background-color: #F1F1F1; width:100%; height:auto;background-repeat: no-repeat; background-position: bottom right; border: 1px solid #D4D4D4; border-radius: 5px; margin: 10px 10px; padding: 15px;"><h1 style="overflow: hidden; text-overflow: ellipsis; background-color: #0171bc; border-top-left-radius: 5px; border-top-right-radius: 5px; color: #fff; margin: -15px -15px 15px -15px; padding: 15px;font-size: 14px;">'+name[key4]+'</h1><ul style="list-style: outside none none;"><li style="margin-left: -45px;font-size: 12px;">'+description[key4]+'</li></ul><div class="row" style="font-size:0.78em ;width:105%"><div class="col-25">Price</div><div class="col-25">Start Date </div><div class="col-25"  id="end_date">End Date</div><div class="col-25" >Remaining Days</div></div><div class="row"><div class="col-25" style="font-size:0.7em">'+price[key4]+'</div><div class="col-25" style="font-size:0.7em">'+startDate[key4]+'</div><div class="col-25" id="end_date" style="font-size:0.7em" >'+endDate[key4]+'</div><div class="col-25" style="font-size:0.7em" >'+daysDifference[key4]+' Days</div></div></div></div>');
		});

	},1000);
myApp.hidePreloader();

}

function getAllMediaFromAllSections(){
	setTimeout(function(){
		var storedData1 = myApp.formGetData('logged_userId');

		var url1 = "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=scannedalbums&columns=*&condition=customerId="+storedData1['userId'];

		var photos = [];
		jQuery.ajaxSetup({async:false});
		$.getJSON (url1, function (json1){
			$.each( json1['posts'], function( key1,value1 ) {
				//console.log( value1 );
				photos[value1.id] = [];
				photos[value1.id]["title"] = value1.title;
				photos[value1.id]["catId"] = value1.categoryId;
			});
		});

		var url = "http://www.healthrecordspro.com/ws.php?type=select&format=json&table=scanneditems&limit=250&columns=*&condition=userid="+storedData1['userId']+" AND active=1";
			// myApp.showPreloader();
			jQuery.ajaxSetup({async:false});
			$.getJSON (url, function (json) {
				$.each( json['posts'], function( key,value ) {

					if( photos[value['albumid']] == undefined ){
						var albumTitle = '';
						var categoryid = '';
					}else{
						var albumTitle = photos[value['albumid']]['title'];
						var categoryid = photos[value['albumid']]['catId'];
					}
					if( albumTitle != '' ){
						if (value['isVideo']=='0') {
							$('#display_all_images_allsec').append('<li><a href="image_description_page.html" onClick="ImageDescription('+value['id']+','+value['albumid']+',\''+categoryid+'\',\''+albumTitle+'\')" style="color:black;margin-right: -13px; margin-top: -23px;"><i class="fa fa-info-circle" ></i></a><img src="http://healthrecordspro.com/newsite/uploads/'+value['image']+'" onclick="image_popup_displayofall(\''+value['id']+'\')"></li>');
						}else{
							$('#display_all_images_allsec').append('<li><a href="#" style="color:black;margin-right: -13px; margin-top: -23px;"></a><a href="#" onclick="playVideo(\''+value['image']+'\');"><img src="img/play-icon.png" style="height: 84px;"/></a></li>');
						}
					}
				});
			});
			// myApp.hidePreloader();
	},2000);
}

function image_popup_displayofall(imgIds){
	var storedData1 = myApp.formGetData('logged_userId');
	var value = [];
	var url = "http://www.healthrecordspro.com/ws.php?type=select&format=json&table=scanneditems&limit=250&columns=*&condition=userid="+storedData1['userId'];
	$.getJSON (url, function (json){
		var key, count = 0;
		for(key in json['posts']) {
			if(json['posts'].hasOwnProperty(key)) {
				string = 'http://healthrecordspro.com/newsite/uploads/'+json['posts'][count]['image'];
				if(string != '')
				{
					if (json['posts'][count]['isVideo'] == '0') {
						if(json['posts'][count]['id'] != imgIds){
							value.push(string);
							content = value;
						}else{
							content1 = string;
						}
					}
				}
			}
			count++;
		}
		content.unshift(content1);
			// console.log(content1);
			// console.log( content );
		var myPhotoBrowserPopupDark = myApp.photoBrowser({
			photos : content,
			theme: 'dark',
			type: 'popup'
		});
		myPhotoBrowserPopupDark.open();
	});
}

function createCalendarEventWithOptions(ids){
	var storedData1 = myApp.formGetData('logged_userId');
	var title = 'Medication';
	var loc = 'Lebanon';
	var notes = 'We would like to Remind you of your Medication ';

	var url= "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=medications&columns=*&condition=id="+ids;

		$.getJSON (url, function (json) {
			notes += '\n';
			notes += 'Medication Name:';
			notes += json['posts'][0]['name'];
			var url2= "http://www.healthrecordspro.com/ws.php?type=getidname&format=json&table=healthcare_providers&condition=hcp_id="+json['posts']['0']['prescribedbydr'];

			$.getJSON (url2, function (json) {
				notes += '\n';
				notes += 'Prescribed by Doctor:';
				notes += json['posts'][0]['first_name'];
			});
			notes += '\n';
			notes += 'Dosage:';
			notes += json['posts'][0]['dosage'];

			var url1=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=calendar&columns=*&condition=itemId="+json['posts']['0']['id'];;

				$.getJSON (url1, function (json) {
					var startDate = json['posts'][0]['reminderDate'];
					var timeNew = json['posts'][0]['reminderTime'];
						timeNew = timeNew.split(':');
						startDate = startDate.split('-');
					var endDate = $('#medi_end_remind').val();
					if(timeNew[2].trim()=='PM'){
						timeNew[0] = parseInt(timeNew[0])+parseInt(12);
					}

					var startDate = new Date(startDate[0],parseInt(startDate[1])-parseInt(1),startDate[2],timeNew[0],timeNew[1]);

					// var endDate = new Date();
					var endDate = $('#medi_end_remind').val();

					endDate = endDate.split('-');
					var endDate = new Date(endDate[0],parseInt(endDate[1])-parseInt(1),endDate[2],timeNew[0],timeNew[1]);
					var calendarName = 'HRP';
					var options = {
						calendarName: calendarName, // iOS specific
						calendarId: 1 // Android specific
					};

					// add a few hours to the dates, JS will automatically update the date (+1 day) if necessary
					startDate.setHours(startDate.getHours());
					endDate.setHours(endDate.getHours()+1);
					window.plugins.calendar.createEventInteractivelyWithOptions(title, loc, notes, startDate,options, endDate,onSuccess, onError);
					function onSuccess(msg) {
						myApp.alert('Calendar success ','Sucess');
					}

					function onError(msg) {
						myApp.alert('Calendar error ','Failed');
					}
				});
		});
}



function createCalendarDocAppointment(id){
	var storedData1 = myApp.formGetData('logged_userId');
	var title = 'DoctorsAppointment';
	var loc = 'Lebanon';
	var notes = 'We would like to confirm that you have added a new appointment on your system with the following details:';
	var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=doctors_appointment&columns=*&condition=customerid="+storedData1['userId'];
	var urlappt ="http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=doctors_appointment&columns=*&condition=id="+id;

	$.getJSON (urlappt, function (json) {
		var url1="http://www.healthrecordspro.com/ws.php?type=getidname&format=json&table=healthcare_providers&condition=hcp_id="+json['posts'][0]['physicianname'];
			// jQuery.ajaxSetup({async:false});
			$.getJSON (url1, function (json) {
				notes += '\n';
				notes += 'Physician Name:';
				notes += json['posts'][0]['first_name'];
			});
			var url2="http://www.healthrecordspro.com/ws.php?type=getidname&format=json&table=doctors_speciality&condition=id="+ json['posts'][0]['specialty'];
				// jQuery.ajaxSetup({async:false});
			$.getJSON (url2, function (json) {
				notes += '\n';
				notes += 'Specialty:';
				notes += json['posts'][0]['name'];
			});
				notes += '\n';
				notes += 'Date:';
				notes += json['posts'][0]['dateofappointment'];
				notes += '\n';
				notes += 'Time:';
				notes += json['posts'][0]['time'];

				var startDate = json['posts'][0]['reminderdate'];
				var timeNew = json['posts'][0]['remindertime'];

				timeNew = timeNew.split(':');
				startDate = startDate.split('-');
				if(timeNew[2].trim()=='PM'){
					timeNew[0] = parseInt(timeNew[0])+parseInt(12);
				}

		var startDate = new Date(startDate[0],parseInt(startDate[1])-parseInt(1),startDate[2],timeNew[0],timeNew[1]);
		var endDate = json['posts'][0]['reminderdate2'];

		endDate = endDate.split('-');
		var endDate = new Date(endDate[0],parseInt(endDate[1])-parseInt(1),endDate[2],timeNew[0],timeNew[1]);
		var calendarName = 'HRP';
		var options = {
			calendarName: calendarName, // iOS specific
			calendarId: 1 // Android specific
		};
		startDate.setHours(startDate.getHours());
		endDate.setHours(endDate.getHours()+1);
		console.log(startDate);
		console.log(endDate);
		console.log(notes);
		window.plugins.calendar.createEventInteractivelyWithOptions(title, loc, notes, startDate, endDate,options,onSuccess1, onError1);
	});
}	


function onSuccess1(msg) {
	myApp.alert('Calendar success','Sucess');
}

function onError1(msg) {
	myApp.alert('Calendar error','Failed');
}

function OpenLabResultsPDF(){
	setTimeout(function(){
		window.open("http://docs.google.com/viewer?url=http://healthrecordspro.com/mobileapp1/uploads/Normalvalues.pdf", '_blank', 'location=no');
	},100);
}

function ReportOfBugs(){
	var storedData1 = myApp.formGetData('logged_userId');
	var SectionName = $('#report_title_text').val();
	var Bug = $('#report_bug').val();
	var Description = $('#report_desc').val();
	myApp.showPreloader();
	var url="http://www.healthrecordspro.com/ws.php?type=insert&format=json&table=report_bugs_app&columns=SectionName,Bug,Description,user_id&values='"+SectionName+"','"+Bug+"','"+Description+"','"+storedData1['userId']+"'";
	$.getJSON (url, function (json) {
	myApp.hidePreloader();

		if( json['posts'][0]){
			myApp.alert("Thank you for your report",'Success');
			mainView.router.loadPage('loginnormal.html');
		}
		else
		{
			myApp.alert("Your Details Not Created",'Failure');
		}
	});
}

function SuggestionsApp(){
	var storedData1 = myApp.formGetData('logged_userId');
	var Title_note = $('#suggestion_title_text').val();
	var suggestion = $('#sugestion_text').val();
	var Description = $('#suggestion_desc').val();
	myApp.showPreloader();
	var url="http://www.healthrecordspro.com/ws.php?type=insert&format=json&table=Suggestions_App&columns=Title_note,suggestion,Description,user_Id&values='"+Title_note+"','"+suggestion+"','"+Description+"','"+storedData1['userId']+"'";
	$.getJSON (url, function (json) {
	myApp.hidePreloader();

		if( json['posts'][0]){
			myApp.alert("Thank you for your suggestion",'Success');
			mainView.router.loadPage('loginnormal.html');
		}
		else
		{
			myApp.alert("Your Details Not Created",'Failure');
		}
	});
}

function EyeprescAdd()
{
	setTimeout(function(){
		$("#eyepresc_upbtn").css('display','none');
		$("#eyepresc_inbtn").css('display','block');
		geteyeCalendar();
	},500);
}

function eyeprescriptionSubmit(){
	var storedData1 = myApp.formGetData('logged_userId');
	var drName = $('#eye_dr_name').val();
	var examinationDate = $('#eye_doe').val();
	var findings = $('#eye_find').val();
	var update_preseye_id = $('#update_preseye_id').val();
	if(update_preseye_id==''){
		myApp.showPreloader();
		var url="http://www.healthrecordspro.com/ws.php?type=insert&format=json&table=prescriptionEyeGlasses&columns=drName,examinationDate,findings,customerId&values='"+drName+"','"+examinationDate+"','"+findings+"','"+storedData1['userId']+"'";
		$.getJSON (url, function (json) {
		myApp.hidePreloader();

			if( json['posts'][0]){
				myApp.alert("Your Details Created",'Success');
				mainView.router.loadPage('Prescription_eye_listing.html');
			}
			else
			{
				myApp.alert("Your Details Not Created",'Failure');
			}
		});
	}else{
		var val = "drName = '"+drName+"',examinationDate = '"+examinationDate+"',findings = '"+findings+"'";

			myApp.showPreloader();

			var urlUpdate="http://www.healthrecordspro.com/ws.php?type=update&format=json&table=prescriptionEyeGlasses&columns="+val+"&condition=id="+update_preseye_id;
			$.getJSON (urlUpdate, function (json) {
				myApp.hidePreloader();
				if( json['posts'][0]){
					myApp.alert("Your Details Created",'Success');
					mainView.router.loadPage('Prescription_eye_listing.html');
				}
				else
				{
					myApp.alert("Your Details Not Created",'Failure');
				}
			});
	}
}

function getPrescriptionData(){
	var storedData1 = myApp.formGetData('logged_userId');

	var url= "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=prescriptionEyeGlasses&columns=*&condition=customerId="+storedData1['userId'];

		$.getJSON (url, function (json) {
			if(json['posts']==0){
					var data = "No Records Found!!!";
					$('#eyeprescriptioncontact').append(data);
				}
				else
				{
					$.each( json['posts'], function( key, val ) {
						var data = "<ul><li><a href='eye_presc_form.html' class='item-link' onclick='prescriptioneyeEdit("+val['id']+");'><div class='item-content white'><div class='item-inner'><div class='item-title'>"+val['drName']+ "&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;"+val['examinationDate']+"</div></div></div></a></li></ul>";

						$('#eyeprescriptioncontact').append(data);
					});
				}
		});
}
function prescriptioneyeEdit(eye_id){
	setTimeout(function(){
		$("#eyepresc_upbtn").css('display','block');
		$("#eyepresc_inbtn").css('display','none');
		geteyeCalendar();
		var storedData1 = myApp.formGetData('logged_userId');
		myApp.showPreloader();

		var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=prescriptionEyeGlasses&columns=*&condition=id="+eye_id;

		$.getJSON (url, function (json) {
			myApp.hidePreloader();
			$('#eye_dr_name').val( json['posts']['0']['drName']);
			$('#eye_doe').val( json['posts']['0']['examinationDate']);
			$('#eye_find').val( json['posts']['0']['findings']);
			$('#update_preseye_id').val( json['posts']['0']['id']);
		});
	},500);
}

function DeletePrescEyeG(){
	id = $('#update_preseye_id').val();
	alert(id);
	myApp.confirm('Are you sure','Delete');

	$( ".modal-button-bold" ).click(function() {
		var storedData1 = myApp.formGetData('logged_userId');
		 myApp.showPreloader();
		var url=  "http://www.healthrecordspro.com/ws.php?type=delete&format=json&table=prescriptionEyeGlasses&columns=&condition=id="+id;
		$.getJSON (url, function (json) {
			 myApp.hidePreloader();
			// $("#emergency_contact_ul_"+id).remove();
			// getEmergencyContactData();
			mainView.router.loadPage('Prescription_eye_listing.html');
		});
	});
}
//function SignUppageTerms(){
//	mainView.router.loadPage('TermsConditionsPage.html');
//}

function DownloadAllImagesToGallery(){
	var storedData1 = myApp.formGetData('logged_userId');
	var url = "http://www.healthrecordspro.com/ws.php?type=select&format=json&table=scanneditems&limit=250&columns=*&condition=userid="+storedData1['userId']+" AND active=1";
			// myApp.showPreloader();
			jQuery.ajaxSetup({async:false});
			$.getJSON (url, function (json) {
				$.each( json['posts'], function( key,value ) {
					// var imageSrc = "http://healthrecordspro.com/newsite/uploads/'+value['image']+'";
					var imageSrc = 'http://healthrecordspro.com/newsite/uploads/'+value['image']+'';
					downloadAllImages(imageSrc,'HRP',value['image']);
				});
			});
}
function downloadAllImages(imageSrc,FolderName,fileName){
	if (imageSrc == null && FolderName == null && fileName == null) {
		return;
	}
	else{
	//checking Internet connection availablity
		var networkState = navigator.connection.type;
		if (networkState == Connection.NONE) {
			return;
		}else {
			downloadHRPImagess(imageSrc, FolderName, fileName); //If available download function call
		}
	}
}

function downloadHRPImagess(URL, Folder_Name, File_Name){
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, fileSystemSuccess, fileSystemFail);
	function fileSystemSuccess(fileSystem) {
		var download_link = encodeURI(URL);
		ext = download_link.substr(download_link.lastIndexOf('.') + 1); //Get extension of URL

		var directoryEntry = fileSystem.root; // to get root path of directory
		directoryEntry.getDirectory(Folder_Name, { create: true, exclusive: false }, onDirectorySuccess, onDirectoryFail); // creating folder in sdcard
		var rootdir = fileSystem.root;
		var fp = rootdir.fullPath; // Returns Fulpath of local directory

		fp = fp + "/" + Folder_Name + "/" + File_Name + "." + ext; // fullpath and name of the file which we want to give
				// download function call
				filetransferDownload(download_link, fp);
			}

		function onDirectorySuccess(parent) {
			// Directory created successfuly
		}

		function onDirectoryFail(error) {
			//Error while creating directory
			alert("Unable to create new directory: " + error.code);
		}

		function fileSystemFail(evt) {
			//Unable to access file system
			alert(evt.target.error.code);
		}
}
function filetransferDownload(download_link, fp) {

	var fileTransfer = new FileTransfer();
//	 $('#loadingmessage10').show();
	myApp.showPreloader();
	// File download function with URL and local path
	fileTransfer.download(download_link, fp,
				function (entry) {
					// alert("download complete: " + entry.fullPath);
					window.plugins.scanmedia.scanFile(fp, function (msg) {
						myApp.alert("Download Completed");
					},
					function (err) {
//						alert("Fail ScanMedia: " + err);
					})
					myApp.hidePreloader();
//					 $('#loadingmessage10').hide();
					// refreshMedia.refresh(fp);
				},
				function (error) {
					//Download abort errors or download failed errors
					myApp.alert("download error source " + error.source);
					//alert("download error target " + error.target);
					//alert("upload error code" + error.code);
				}
		);
}

function RegistrationDate()
{
	var today = new Date();
	var pickerInline = myApp.picker({
		input: '#picker-date',
//		container: '#picker-date-container',
		toolbar: false,
		rotateEffect: true,
		value: [today.getMonth(), today.getDate(), today.getFullYear()],
		onChange: function (picker, values, displayValues) {
		var daysInMonth = new Date(picker.value[2], picker.value[0]*1 + 1, 0).getDate();
			if (values[1] > daysInMonth) {
				picker.cols[1].setValue(daysInMonth);
			}
		},
		formatValue: function (p, values, displayValues) {
			var month = parseInt( values[0] ) + parseInt( 1 );
			if( month < 10 ){
				month = '0'+month;
			}
		return values[2] + '-' + month + '-' + values[1];
		},
		cols: [
			// Months
				{
					values: ('0 1 2 3 4 5 6 7 8 9 10 11').split(' '),
					displayValues: ('January February March April May June July August September October November December').split(' '),
					textAlign: 'left'
				},
				// Days
				{
					values: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
				},
				// Years
				{
					values: (function () {
						var arr = [];
						for (var i = 1950; i <= 2030; i++) { arr.push(i); }
						return arr;
					})(),
				},
				// Space divider
				{
					divider: true,
					content: '  '
				},
		]
	});
}

function getmediTime(){
	var today = new Date();
	var pickerInline = myApp.picker({
		input: '#medi_remind_time',
//		container: '#medi_remind_time_container',
		toolbar: false,
		rotateEffect: true,
		value: [today.getHours(), (today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes())],
		onChange: function (picker, values, displayValues) {
			var daysInMonth = new Date(picker.value[2], picker.value[0]*1 + 1, 0).getDate();
			if (values[1] > daysInMonth) {
				picker.cols[1].setValue(daysInMonth);
			}
		},
		formatValue: function (p, values, displayValues) {

			var ampm = values[0] >= 12 ? 'PM' : 'AM';
			var hours = values[0] % 12;

			return hours + ':' + values[1]+' : '+ampm;
		},
		cols: [
			// Hours
				{
					values: (function () {
						var arr = [];
						for (var i = 0; i <= 23; i++) { arr.push(i); }
						return arr;
					})(),
				},
				// Divider
				{
					divider: true,
					content: ':'
				},
				// Minutes
				{
				values: (function () {
					var arr = [];
					for (var i = 0; i <= 59; i++) { arr.push(i < 10 ? '0' + i : i); }
					return arr;
					})(),
				}
		]
	});
}
function docApptimePicker(){
	var today = new Date();
	var pickerInline = myApp.picker({
		input: '#doc_apoint_time',
		// container: '#medi_remind_time_container',
		toolbar: false,
		rotateEffect: true,
		value: [today.getHours(), (today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes())],
		onChange: function (picker, values, displayValues) {
			var daysInMonth = new Date(picker.value[2], picker.value[0]*1 + 1, 0).getDate();
			if (values[1] > daysInMonth) {
				picker.cols[1].setValue(daysInMonth);
			}
		},
		formatValue: function (p, values, displayValues) {

			var ampm = values[0] >= 12 ? 'PM' : 'AM';
			var hours = values[0] % 12;

			return hours + ':' + values[1]+' : '+ampm;
		},
		cols: [
			// Hours
				{
					values: (function () {
						var arr = [];
						for (var i = 0; i <= 23; i++) { arr.push(i); }
						return arr;
					})(),
				},
				// Divider
				{
					divider: true,
					content: ':'
				},
				// Minutes
				{
				values: (function () {
					var arr = [];
					for (var i = 0; i <= 59; i++) { arr.push(i < 10 ? '0' + i : i); }
					return arr;
					})(),
				}
		]
	});
}
function docApptimePicker1(){
	var today = new Date();
	var pickerInline = myApp.picker({
		input: '#doc_apoint_reminder_time',
		// container: '#medi_remind_time_container',
		toolbar: false,
		rotateEffect: true,
		value: [today.getHours(), (today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes())],
		onChange: function (picker, values, displayValues) {
			var daysInMonth = new Date(picker.value[2], picker.value[0]*1 + 1, 0).getDate();
			if (values[1] > daysInMonth) {
				picker.cols[1].setValue(daysInMonth);
			}
		},
		formatValue: function (p, values, displayValues) {

			var ampm = values[0] >= 12 ? 'PM' : 'AM';
			var hours = values[0] % 12;

			return hours + ':' + values[1]+' : '+ampm;
		},
		cols: [
			// Hours
				{
					values: (function () {
						var arr = [];
						for (var i = 0; i <= 23; i++) { arr.push(i); }
						return arr;
					})(),
				},
				// Divider
				{
					divider: true,
					content: ':'
				},
				// Minutes
				{
				values: (function () {
					var arr = [];
					for (var i = 0; i <= 59; i++) { arr.push(i < 10 ? '0' + i : i); }
					return arr;
					})(),
				}
		]
	});
}
function docApptimePicker2(){
	var today = new Date();
	var pickerInline = myApp.picker({
		input: '#doc_apoint_sec_reminder_time',
		// container: '#medi_remind_time_container',
		toolbar: false,
		rotateEffect: true,
		value: [today.getHours(), (today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes())],
		onChange: function (picker, values, displayValues) {
			var daysInMonth = new Date(picker.value[2], picker.value[0]*1 + 1, 0).getDate();
			if (values[1] > daysInMonth) {
				picker.cols[1].setValue(daysInMonth);
			}
		},
		formatValue: function (p, values, displayValues) {

			var ampm = values[0] >= 12 ? 'PM' : 'AM';
			var hours = values[0] % 12;

			return hours + ':' + values[1]+' : '+ampm;
		},
		cols: [
			// Hours
				{
					values: (function () {
						var arr = [];
						for (var i = 0; i <= 23; i++) { arr.push(i); }
						return arr;
					})(),
				},
				// Divider
				{
					divider: true,
					content: ':'
				},
				// Minutes
				{
				values: (function () {
					var arr = [];
					for (var i = 0; i <= 59; i++) { arr.push(i < 10 ? '0' + i : i); }
					return arr;
					})(),
				}
		]
	});
}

function emergencycont_pageinfo()
{
	myApp.openPanel('left');
	$('#usefultips_mobile').html('');
	var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=modules&limit=250&columns=mobiletips&condition=id=8";
	$.getJSON (url, function (json) {
		$('#usefultips_mobile').html(json['posts']['0']['mobiletips']);
	});
}
function emergencynewforminfo()
{
	myApp.openPanel('left');
	$('#usefultips_mobile').html('');
	var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=modules&limit=250&columns=mobiletips&condition=id=70";
	$.getJSON (url, function (json) {
		$('#usefultips_mobile').html(json['posts']['0']['mobiletips']);
	});
}
function healthproviderListingTips()
{

	myApp.openPanel('left');
	$('#usefultips_mobile').html('');
	var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=modules&limit=250&columns=mobiletips&condition=id=34";
	$.getJSON (url, function (json) {
		$('#usefultips_mobile').html(json['posts']['0']['mobiletips']);
	});

}
function HealthproviderInfo(){
	myApp.openPanel('left');
	$('#usefultips_mobile').html('');
	var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=modules&limit=250&columns=mobiletips&condition=id=72";
	$.getJSON (url, function (json) {
		$('#usefultips_mobile').html(json['posts']['0']['mobiletips']);
	});
}

function insuranceInfo()
{
		myApp.openPanel('left');
	$('#usefultips_mobile').html('');
	var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=modules&limit=250&columns=mobiletips&condition=id=10";
	$.getJSON (url, function (json) {
		$('#usefultips_mobile').html(json['posts']['0']['mobiletips']);
	});
}

function Insuranceforminfo(){
		myApp.openPanel('left');
	$('#usefultips_mobile').html('');
	var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=modules&limit=250&columns=mobiletips&condition=id=74";
	$.getJSON (url, function (json) {
		$('#usefultips_mobile').html(json['posts']['0']['mobiletips']);
	});
}
function DoctorappointmentList(){

		myApp.openPanel('left');
	$('#usefultips_mobile').html('');
	var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=modules&limit=250&columns=mobiletips&condition=id=7";
	$.getJSON (url, function (json) {
		$('#usefultips_mobile').html(json['posts']['0']['mobiletips']);
	});
}
function doctor_appointmentadditioninfo(){
		myApp.openPanel('left');
	$('#usefultips_mobile').html('');
	var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=modules&limit=250&columns=mobiletips&condition=id=76";
	$.getJSON (url, function (json) {
		$('#usefultips_mobile').html(json['posts']['0']['mobiletips']);
	});
}
function MedicationListinfo(){
	myApp.openPanel('left');
	$('#usefultips_mobile').html('');
	var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=modules&limit=250&columns=mobiletips&condition=id=26";
	$.getJSON (url, function (json) {
		$('#usefultips_mobile').html(json['posts']['0']['mobiletips']);
	});
}
function MedicationformInfo(){
	myApp.openPanel('left');
	$('#usefultips_mobile').html('');
	var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=modules&limit=250&columns=mobiletips&condition=id=77";
	$.getJSON (url, function (json) {
		$('#usefultips_mobile').html(json['posts']['0']['mobiletips']);
	});
}
function MedicalhistoryInfo(){
		myApp.openPanel('left');
	$('#usefultips_mobile').html('');
	var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=modules&limit=250&columns=mobiletips&condition=id=25";
	$.getJSON (url, function (json) {
		$('#usefultips_mobile').html(json['posts']['0']['mobiletips']);
	});
}
function MedicalhistoryformInfo(){
	myApp.openPanel('left');
	$('#usefultips_mobile').html('');
	var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=modules&limit=250&columns=mobiletips&condition=id=79";
	$.getJSON (url, function (json) {
		$('#usefultips_mobile').html(json['posts']['0']['mobiletips']);
	});
}
function AllergicformInfo(){
	myApp.openPanel('left');
	$('#usefultips_mobile').html('');
	var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=modules&limit=250&columns=mobiletips&condition=id=81";
	$.getJSON (url, function (json) {
		$('#usefultips_mobile').html(json['posts']['0']['mobiletips']);
	});
}
function AllergicPageInfo(){
	myApp.openPanel('left');
	$('#usefultips_mobile').html('');
	var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=modules&limit=250&columns=mobiletips&condition=id=2";
	$.getJSON (url, function (json) {
		$('#usefultips_mobile').html(json['posts']['0']['mobiletips']);
	});
}
function ImmuniztionformInfo(){
	myApp.openPanel('left');
	$('#usefultips_mobile').html('');
	var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=modules&limit=250&columns=mobiletips&condition=id=83";
	$.getJSON (url, function (json) {
		$('#usefultips_mobile').html(json['posts']['0']['mobiletips']);
	});
}
function ImmunizationInfo(){
	myApp.openPanel('left');
	$('#usefultips_mobile').html('');
	var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=modules&limit=250&columns=mobiletips&condition=id=14";
	$.getJSON (url, function (json) {
		$('#usefultips_mobile').html(json['posts']['0']['mobiletips']);
	});
}
function surgeriesFormInfo(){
	myApp.openPanel('left');
	$('#usefultips_mobile').html('');
	var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=modules&limit=250&columns=mobiletips&condition=id=84";
	$.getJSON (url, function (json) {
		$('#usefultips_mobile').html(json['posts']['0']['mobiletips']);
	});
}

function SurgeriesInfo(){
	myApp.openPanel('left');
	$('#usefultips_mobile').html('');
	var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=modules&limit=250&columns=mobiletips&condition=id=68";
	$.getJSON (url, function (json) {
		$('#usefultips_mobile').html(json['posts']['0']['mobiletips']);
	});
}

function FamilyhistoryInfo(){
	myApp.openPanel('left');
	$('#usefultips_mobile').html('');
	var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=modules&limit=250&columns=mobiletips&condition=id=9";
	$.getJSON (url, function (json) {
		$('#usefultips_mobile').html(json['posts']['0']['mobiletips']);
	});
}
function familyMedicalhistoryListinfo(){
	myApp.openPanel('left');
	$('#usefultips_mobile').html('');
	var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=modules&limit=250&columns=mobiletips&condition=id=86";
	$.getJSON (url, function (json) {
		$('#usefultips_mobile').html(json['posts']['0']['mobiletips']);
	});
}
function familyHistoryforminfo(){
		myApp.openPanel('left');
	$('#usefultips_mobile').html('');
	var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=modules&limit=250&columns=mobiletips&condition=id=87";
	$.getJSON (url, function (json) {
		$('#usefultips_mobile').html(json['posts']['0']['mobiletips']);
	});
}
function familyHistorycausesofDeathinfo(){
	myApp.openPanel('left');
	$('#usefultips_mobile').html('');
	var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=modules&limit=250&columns=mobiletips&condition=id=88";
	$.getJSON (url, function (json) {
		$('#usefultips_mobile').html(json['posts']['0']['mobiletips']);
	});
}
function physicalexaminfo(){
	myApp.openPanel('left');
	$('#usefultips_mobile').html('');
	var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=modules&limit=250&columns=mobiletips&condition=id=35";
	$.getJSON (url, function (json) {
		$('#usefultips_mobile').html(json['posts']['0']['mobiletips']);
	});
}
function physicalExamForminfo(){
	myApp.openPanel('left');
	$('#usefultips_mobile').html('');
	var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=modules&limit=250&columns=mobiletips&condition=id=90";
	$.getJSON (url, function (json) {
		$('#usefultips_mobile').html(json['posts']['0']['mobiletips']);
	});
}
function labresultsListInfo(){
	var idz
	var catids ;
	catids = tipID;
	if(catids ==7){
		idz = 70
	}
	else if (catids ==7)
		{
		idz = 21;
		}
	else if (catids ==3)
	{
	idz = 17;
	}
	else if (catids ==11)
	{
	idz = 59;
	}
	else if (catids ==12)
	{
	idz = 70;
	}
	else{
		idz=16;
	}
	myApp.openPanel('left');
	$('#usefultips_mobile').html('');
	var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=modules&limit=250&columns=mobiletips&condition=id="+idz;
	$.getJSON (url, function (json) {
		$('#usefultips_mobile').html(json['posts']['0']['mobiletips']);
	});
}
function pediatricListInfo(){
	myApp.openPanel('left');
	$('#usefultips_mobile').html('');
	var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=modules&limit=250&columns=mobiletips&condition=id=36";
	$.getJSON (url, function (json) {
		$('#usefultips_mobile').html(json['posts']['0']['mobiletips']);
	});
}
function managechildInfo(){
	myApp.openPanel('left');
	$('#usefultips_mobile').html('');
	var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=modules&limit=250&columns=mobiletips&condition=id=95";
	$.getJSON (url, function (json) {
		$('#usefultips_mobile').html(json['posts']['0']['mobiletips']);
	});
}
function pediatricchildForm(){
	myApp.openPanel('left');
	$('#usefultips_mobile').html('');
	var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=modules&limit=250&columns=mobiletips&condition=id=96";
	$.getJSON (url, function (json) {
		$('#usefultips_mobile').html(json['posts']['0']['mobiletips']);
	});
}

function pastmedicalhistoryinfo(){
	myApp.openPanel('left');
	$('#usefultips_mobile').html('');
	var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=modules&limit=250&columns=mobiletips&condition=id=97";
	$.getJSON (url, function (json) {
		$('#usefultips_mobile').html(json['posts']['0']['mobiletips']);
	});
}
function pastmedicalhistoryforminfo(){
	myApp.openPanel('left');
	$('#usefultips_mobile').html('');
	var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=modules&limit=250&columns=mobiletips&condition=id=98";
	$.getJSON (url, function (json) {
		$('#usefultips_mobile').html(json['posts']['0']['mobiletips']);
	});
}
function pediatricdevelopmenthistory(){
	myApp.openPanel('left');
	$('#usefultips_mobile').html('');
	var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=modules&limit=250&columns=mobiletips&condition=id=100";
	$.getJSON (url, function (json) {
		$('#usefultips_mobile').html(json['posts']['0']['mobiletips']);
	});
}
function birthhistoryInfo(){
		myApp.openPanel('left');
	$('#usefultips_mobile').html('');
	var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=modules&limit=250&columns=mobiletips&condition=id=38";
	$.getJSON (url, function (json) {
		$('#usefultips_mobile').html(json['posts']['0']['mobiletips']);
	});

}
function familypediatrichistoryinfo(){
		myApp.openPanel('left');
	$('#usefultips_mobile').html('');
	var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=modules&limit=250&columns=mobiletips&condition=id=101";
	$.getJSON (url, function (json) {
		$('#usefultips_mobile').html(json['posts']['0']['mobiletips']);
	});
}
function prescriptioneyelistInfo(){
		myApp.openPanel('left');
	$('#usefultips_mobile').html('');
	var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=modules&limit=250&columns=mobiletips&condition=id=64";
	$.getJSON (url, function (json) {
		$('#usefultips_mobile').html(json['posts']['0']['mobiletips']);
	});
}
function eyepriscriptionforminfo(){
	myApp.openPanel('left');
	$('#usefultips_mobile').html('');
	var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=modules&limit=250&columns=mobiletips&condition=id=102";
	$.getJSON (url, function (json) {
		$('#usefultips_mobile').html(json['posts']['0']['mobiletips']);
	});
}
function nutritionanddietInfo(){
		myApp.openPanel('left');
	$('#usefultips_mobile').html('');
	var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=modules&limit=250&columns=mobiletips&condition=id=28";
	$.getJSON (url, function (json) {
		$('#usefultips_mobile').html(json['posts']['0']['mobiletips']);
	});
}
function foodandDietInfo(){
	myApp.openPanel('left');
	$('#usefultips_mobile').html('');
	var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=modules&limit=250&columns=mobiletips&condition=id=104";
	$.getJSON (url, function (json) {
		$('#usefultips_mobile').html(json['posts']['0']['mobiletips']);
	});
	}
	function biologicallistingInfo(){
		myApp.openPanel('left');
		$('#usefultips_mobile').html('');
		var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=modules&limit=250&columns=mobiletips&condition=id=105";
		$.getJSON (url, function (json) {
			$('#usefultips_mobile').html(json['posts']['0']['mobiletips']);
		});
	}
	function biochemicalFormInfo(){
		myApp.openPanel('left');
		$('#usefultips_mobile').html('');
		var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=modules&limit=250&columns=mobiletips&condition=id=106";
		$.getJSON (url, function (json) {
			$('#usefultips_mobile').html(json['posts']['0']['mobiletips']);
		});
	}
	function moniteringandEvaluation(){
		myApp.openPanel('left');
		$('#usefultips_mobile').html('');
		var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=modules&limit=250&columns=mobiletips&condition=id=107";
		$.getJSON (url, function (json) {
			$('#usefultips_mobile').html(json['posts']['0']['mobiletips']);
		});
	}
	function implantmedicaldevicesListInfo(){
		myApp.openPanel('left');
		$('#usefultips_mobile').html('');
		var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=modules&limit=250&columns=mobiletips&condition=id=15";
		$.getJSON (url, function (json) {
			$('#usefultips_mobile').html(json['posts']['0']['mobiletips']);
		});
	}
	function implantdeviceforminfo(){
		myApp.openPanel('left');
		$('#usefultips_mobile').html('');
		var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=modules&limit=250&columns=mobiletips&condition=id=109";
		$.getJSON (url, function (json) {
			$('#usefultips_mobile').html(json['posts']['0']['mobiletips']);
		});
	}
	function MedicallegalDirectiveinfo(){
			myApp.openPanel('left');
		$('#usefultips_mobile').html('');
		var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=modules&limit=250&columns=mobiletips&condition=id=24";
		$.getJSON (url, function (json) {
			$('#usefultips_mobile').html(json['posts']['0']['mobiletips']);
		});
	}

	function MedicalandlegalDirectiveForm(){
		myApp.openPanel('left');
		$('#usefultips_mobile').html('');
		var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=modules&limit=250&columns=mobiletips&condition=id=111";
		$.getJSON (url, function (json) {
			$('#usefultips_mobile').html(json['posts']['0']['mobiletips']);
		});
	}
	function organdonationinfo(){
		myApp.openPanel('left');
		$('#usefultips_mobile').html('');
		var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=modules&limit=250&columns=mobiletips&condition=id=33";
		$.getJSON (url, function (json) {
			$('#usefultips_mobile').html(json['posts']['0']['mobiletips']);
		});
		
	}
	function healthdairiesInfo(){
		myApp.openPanel('left');
		$('#usefultips_mobile').html('');
		var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=modules&limit=250&columns=mobiletips&condition=id=67";
		$.getJSON (url, function (json) {
			$('#usefultips_mobile').html(json['posts']['0']['mobiletips']);
		});

	}
	function managedairiesinfo(){
		myApp.openPanel('left');
		$('#usefultips_mobile').html('');
		var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=modules&limit=250&columns=mobiletips&condition=id=114";
		$.getJSON (url, function (json) {
			$('#usefultips_mobile').html(json['posts']['0']['mobiletips']);
		});

	}
	function doctorsconsultationInfo(){
		myApp.openPanel('left');
		$('#usefultips_mobile').html('');
		var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=modules&limit=250&columns=mobiletips&condition=id=66";
		$.getJSON (url, function (json) {
			$('#usefultips_mobile').html(json['posts']['0']['mobiletips']);
		});

	}
	function doctorsconsultationformInfo(){
		myApp.openPanel('left');
		$('#usefultips_mobile').html('');
		var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=modules&limit=250&columns=mobiletips&condition=id=117";
		$.getJSON (url, function (json) {
			$('#usefultips_mobile').html(json['posts']['0']['mobiletips']);
		});
	}

	function healthsummaryInfo(){
		myApp.openPanel('left');
		$('#usefultips_mobile').html('');
		var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=modules&limit=250&columns=mobiletips&condition=id=42";
		$.getJSON (url, function (json) {
			$('#usefultips_mobile').html(json['posts']['0']['mobiletips']);
		});
	}
	function UserProfileInfo(){
	myApp.openPanel('left');
		$('#usefultips_mobile').html('');
		var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=modules&limit=250&columns=mobiletips&condition=id=120";
		$.getJSON (url, function (json) {
			$('#usefultips_mobile').html(json['posts']['0']['mobiletips']);
		});	
	}

	function customhealthsummaryInfo(){
		myApp.openPanel('left');
		$('#usefultips_mobile').html('');
		var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=modules&limit=250&columns=mobiletips&condition=id=119";
		$.getJSON (url, function (json) {
			$('#usefultips_mobile').html(json['posts']['0']['mobiletips']);
		});
	}
		function reportBuginfo(){
	    myApp.openPanel('left');
		$('#usefultips_mobile').html('');
		var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=modules&limit=250&columns=mobiletips&condition=id=121";
		$.getJSON (url, function (json) {
			$('#usefultips_mobile').html(json['posts']['0']['mobiletips']);
		});	
	}
	function SuggestionsInfo(){
		myApp.openPanel('left');
		$('#usefultips_mobile').html('');
		var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=modules&limit=250&columns=mobiletips&condition=id=122";
		$.getJSON (url, function (json) {
			$('#usefultips_mobile').html(json['posts']['0']['mobiletips']);
		});
	}
	// function AboutUsInfo(){
	// 	myApp.openPanel('left');
	// 	$('#usefultips_mobile').html('');
	// 	var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=modules&limit=250&columns=mobiletips&condition=id=123";
	// 	$.getJSON (url, function (json) {
	// 		$('#usefultips_mobile').html(json['posts']['0']['mobiletips']);
	// 	});
	// }
	function accountsummaryInfo()
	{
		myApp.openPanel('left');
		$('#usefultips_mobile').html('');
		var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=modules&limit=250&columns=mobiletips&condition=id=123";
		$.getJSON (url, function (json) {
			$('#usefultips_mobile').html(json['posts']['0']['mobiletips']);
		});
	}
	function grantaccesInfo()
	{
			myApp.openPanel('left');
		$('#usefultips_mobile').html('');
		var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=modules&limit=250&columns=mobiletips&condition=id=124";
		$.getJSON (url, function (json) {
			$('#usefultips_mobile').html(json['posts']['0']['mobiletips']);
		});
	}
	function sectionpreferenceInfo()
	{
			myApp.openPanel('left');
		$('#usefultips_mobile').html('');
		var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=modules&limit=250&columns=mobiletips&condition=id=125";
		$.getJSON (url, function (json) {
			$('#usefultips_mobile').html(json['posts']['0']['mobiletips']);
		});
	}
	function settingsInfo(){
			myApp.openPanel('left');
		$('#usefultips_mobile').html('');
		var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=modules&limit=250&columns=mobiletips&condition=id=126";
		$.getJSON (url, function (json) {
			$('#usefultips_mobile').html(json['posts']['0']['mobiletips']);
		});
	}
	function healthcalendarInfo(){

		myApp.openPanel('left');
		$('#usefultips_mobile').html('');
		var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=modules&limit=250&columns=mobiletips&condition=id=11";
		$.getJSON (url, function (json) {
			$('#usefultips_mobile').html(json['posts']['0']['mobiletips']);
		});
}

function healthcalendarappointmentInfo(){

	myApp.openPanel('left');
		$('#usefultips_mobile').html('');
		var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=modules&limit=250&columns=mobiletips&condition=id=62";
		$.getJSON (url, function (json) {
			$('#usefultips_mobile').html(json['posts']['0']['mobiletips']);
		});
}

function healthcalendarmediactionInfo(){

	myApp.openPanel('left');
		$('#usefultips_mobile').html('');
		var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=modules&limit=250&columns=mobiletips&condition=id=63";
		$.getJSON (url, function (json) {
			$('#usefultips_mobile').html(json['posts']['0']['mobiletips']);
		});
}

function urinanalasysinfo(){
	myApp.openPanel('left');
	$('#usefultips_mobile').html('');
	var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=modules&limit=250&columns=mobiletips&condition=id=63";
	$.getJSON (url, function (json) {
		$('#usefultips_mobile').html(json['posts']['0']['mobiletips']);
	});
	
}
function healthidinfo(){
	myApp.openPanel('left');
	$('#usefultips_mobile').html('');
	var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=modules&limit=250&columns=mobiletips&condition=id=63";
	$.getJSON (url, function (json) {
		$('#usefultips_mobile').html(json['posts']['0']['mobiletips']);
	});
	
}

function womensectioninfo(){
	myApp.openPanel('left');
	$('#usefultips_mobile').html('');
	var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=modules&limit=250&columns=mobiletips&condition=id=47";
	$.getJSON (url, function (json) {
		$('#usefultips_mobile').html(json['posts']['0']['mobiletips']);
	});
}

function obestriclistinginfo(){
	myApp.openPanel('left');
	$('#usefultips_mobile').html('');
	var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=modules&limit=250&columns=mobiletips&condition=id=48";
	$.getJSON (url, function (json) {
		$('#usefultips_mobile').html(json['posts']['0']['mobiletips']);
	});
}
function gynecologyhistorylistingInfo(){
	myApp.openPanel('left');
	$('#usefultips_mobile').html('');
	var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=modules&limit=250&columns=mobiletips&condition=id=49";
	$.getJSON (url, function (json) {
		$('#usefultips_mobile').html(json['posts']['0']['mobiletips']);
	});
}
	function genetichistoryInfo(){
		myApp.openPanel('left');
		$('#usefultips_mobile').html('');
		var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=modules&limit=250&columns=mobiletips&condition=id=50";
		$.getJSON (url, function (json) {
			$('#usefultips_mobile').html(json['posts']['0']['mobiletips']);
		});
		
	}
	function womenPregInfo(){
		myApp.openPanel('left');
		$('#usefultips_mobile').html('');
		var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=modules&limit=250&columns=mobiletips&condition=id=51";
		$.getJSON (url, function (json) {
			$('#usefultips_mobile').html(json['posts']['0']['mobiletips']);
		});
			
	}
	function socialHistoryInfo(){
		myApp.openPanel('left');
		$('#usefultips_mobile').html('');
		var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=modules&limit=250&columns=mobiletips&condition=id=52";
		$.getJSON (url, function (json) {
			$('#usefultips_mobile').html(json['posts']['0']['mobiletips']);
		});	
	}
	function SexualActivityInfo(){
		myApp.openPanel('left');
		$('#usefultips_mobile').html('');
		var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=modules&limit=250&columns=mobiletips&condition=id=53";
		$.getJSON (url, function (json) {
			$('#usefultips_mobile').html(json['posts']['0']['mobiletips']);
		});	
	}
	function activityDailyLivingInfo(){
		myApp.openPanel('left');
		$('#usefultips_mobile').html('');
		var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=modules&limit=250&columns=mobiletips&condition=id=54";
		$.getJSON (url, function (json) {
			$('#usefultips_mobile').html(json['posts']['0']['mobiletips']);
		});	
	}
	function SocialsafetyDoc(){
		myApp.openPanel('left');
		$('#usefultips_mobile').html('');
		var url=  "http://www.healthrecordspro.com/ws.php?type=select_one&format=json&table=modules&limit=250&columns=mobiletips&condition=id=55";
		$.getJSON (url, function (json) {
			$('#usefultips_mobile').html(json['posts']['0']['mobiletips']);
		});	
	}
		
	function submitContactE(){
		var email = $('#Cemail').val();
		var name = $('#Cname').val();
		var message = $('#contact_msg').val();
		var url = "http://healthrecordspro.com/ws.php?type=email&format=json&email=%27touficy@optimalsolutions.it%27&name=%27toufic%27&phone=03755614&message=this%20is%20just%20a%20test";
		 var urlZ = "http://healthrecordspro.com/ws.php?type=email&format=json&email="+email+"&name="+name+"&phone=''&message="+message;
		$.getJSON (url, function (json) {
			 myApp.alert("Your Details has been Created",'Success');
		});
	}
	$$('.ac-5').on('click', function () {
	    var buttons = [
	        {
	            text: 'Button1',
	            onClick: function () {
	                myApp.alert('Button1 clicked');
	            }
	        },
	        {
	            text: 'Button2',
	            onClick: function () {
	                myApp.alert('Button2 clicked');
	            }
	        },
	        {
	            text: 'Cancel',
	            color: 'red',
	            onClick: function () {
	                myApp.alert('Cancel clicked');
	            }
	        },
	    ];
	    myApp.actions(buttons);
	});   