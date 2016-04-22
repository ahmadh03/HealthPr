<? 
     include_once('../../newsite/common.php'); 
    // include_once('../../../../HealthRecordPro/common.php');
    $_SESSION['uid'] = $_POST['uid'];
    $data = getreqValue('user','user_id',$_SESSION['uid']);
?>

    <div class="span24 content-box">
      <div class="sumarydis">
        <div class="span24">
          <div class="sumarydis">
            <!-- /.span14 -->
            </div><div style="width:45%;margin-left:2%;float:left;"><span style="float: right;padding: 10%;">Name : <b> <?=ucfirst($data[first_name]).' '.ucfirst($data[last_name]) ?> </b></span></div>
              
              <div style="margin:1%;clear:both;"></div>
              <? $i = 0 ;?>

              <!-- ######################## User Profile #################################-->
              <? if(isset($_REQUEST['userprofile'])) {?>
              <div class="list-block accordion-list" style="display: inline-block;width: 93%;"> 
              <ul>     
                <li class="accordion-item">
                  <a href="" class="item-link item-content">
                    <div class="item-inner">
                        <div class="item-title">User Profile </div>
                    </div>
                  </a>
                  <div id="collapse<?=$i?>" class="accordion-item-content">
                  <? 
                    $resVal = getSesUserIdValuesAll('user_profile','user_id');
                    foreach ($resVal as $key => $user) {?>
                    <div class="list-block">
                      <ul style="background-color: white">
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">First Name</div>
                            
                              <div class="item-input">
                                <input type="text" name="nameProfile" id="nameProfile"  value="<?=$user['first_name']?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Middle Name</div>
                            
                              <div class="item-input">
                                <input type="text" name="nameProfile" id="nameProfile"  value="<?=$user['middle_name']?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Last Name</div>
                            
                              <div class="item-input">
                                <input type="text" name="nameProfile" id="nameProfile"  value="<?=$user['last_name']?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Maiden Name</div>
                            
                              <div class="item-input">
                                <input type="text" name="nameProfile" id="nameProfile"  value="<?=$user['maiden_name']?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">E-mail</div>
                            
                              <div class="item-input">
                                <input type="text" name="nameProfile" id="nameProfile"  value="<?=$user['email']?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <div class="item-title">Primary Address</div>
                     <li>
                            <div class="item-content item-title_inner">
                            <div class="item-inner">
                            <div class="item-title label">Country</div>
                            <div class="item-input" id="addcountriesuser">
                            <input type="text" name="primary_country" id="primary_country" value="<?=getonlyreqValue('name','country','id',$user['country'])?>" readonly />
                            </div>
                            </div>
                            </div>
                            </li>
                              <li>
                              <div class="item-content item-title_inner">
                                <div class="item-inner">
                                  <div class="item-title label">State</div>
                                    <div class="item-input">
                                      <input type="text" name="primary_nationality" id="primary_nationality" value="<?=$user['state']?>" readonly />
                                  </div>
                                </div>
                              </div>
                              </li>
                               <li>
                              <div class="item-content item-title_inner">
                                <div class="item-inner">
                                  <div class="item-title label">City</div>
                                    <div class="item-input">
                                      <input type="text" name="primary_nationality" id="primary_nationality" value="<?=$user['city']?>" readonly />
                                  </div>
                                </div>
                              </div>
                              </li>
                                 <li>
                              <div class="item-content item-title_inner">
                                <div class="item-inner">
                                  <div class="item-title label">Street</div>
                                    <div class="item-input">
                                      <input type="text" name="primary_nationality" id="primary_nationality" value="<?=$user['street']?>" readonly />
                                  </div>
                                </div>
                              </div>
                              </li>
                                 <li>
                              <div class="item-content item-title_inner">
                                <div class="item-inner">
                                  <div class="item-title label">ZIP code</div>
                                    <div class="item-input">
                                      <input type="text" name="primary_nationality" id="primary_nationality" value="<?=$user['zip_code']?>" readonly />
                                  </div>
                                </div>
                              </div>
                              </li>
                                 <li>
                              <div class="item-content item-title_inner">
                                <div class="item-inner">
                                  <div class="item-title label">Address</div>
                                    <div class="item-input">
                                      <input type="text" name="primary_nationality" id="primary_nationality" value="<?=$user['address']?>" readonly />
                                  </div>
                                </div>
                              </div>
                              </li>
                               <li>
                              <div class="item-content item-title_inner">
                                <div class="item-inner">
                                  <div class="item-title label">Home phone number</div>
                                    <div class="item-input">
                                      <input type="text" name="primary_nationality" id="primary_nationality" value="<?=$user['home_phone_number']?>" readonly />
                                  </div>
                                </div>
                              </div>
                              </li>
                               <li>
                              <div class="item-content item-title_inner">
                                <div class="item-inner">
                                  <div class="item-title label">Work phone number</div>
                                    <div class="item-input">
                                      <input type="text" name="primary_nationality" id="primary_nationality" value="<?=$user['work_phone_number']?>" readonly />
                                  </div>
                                </div>
                              </div>
                              </li>
                               <li>
                              <div class="item-content item-title_inner">
                                <div class="item-inner">
                                  <div class="item-title label">Mobile phone</div>
                                    <div class="item-input">
                                      <input type="text" name="primary_nationality" id="primary_nationality" value="<?=$user['mobile_phone']?>" readonly />
                                  </div>
                                </div>
                              </div>
                              </li>
                              <div class="item-title">Personal Information</div>
                              <li>
                              <div class="item-content item-title_inner">
                                <div class="item-inner">
                                  <div class="item-title label">Date of birth</div>
                                    <div class="item-input">
                                      <input type="text" name="primary_nationality" id="primary_nationality" value="<?=$user['date_of_birth']?>" readonly />
                                  </div>
                                </div>
                              </div>
                              </li>
                               <li>
                              <div class="item-content item-title_inner">
                                <div class="item-inner">
                                  <div class="item-title label">Gender</div>
                                    <div class="item-input">
                                      <input type="text" name="primary_nationality" id="primary_nationality" value="<?=$user['gender']?>" readonly />
                                  </div>
                                </div>
                              </div>
                              </li>
                               <li>
                              <div class="item-content item-title_inner">
                                <div class="item-inner">
                                  <div class="item-title label">Marital Status</div>
                                    <div class="item-input">
                                      <input type="text" name="primary_nationality" id="primary_nationality" value="<?=$user['marital_status']?>" readonly />
                                  </div>
                                </div>
                              </div>
                              </li>
                               <li>
                              <div class="item-content item-title_inner">
                                <div class="item-inner">
                                  <div class="item-title label">Height (cms)</div>
                                    <div class="item-input">
                                      <input type="text" name="primary_nationality" id="primary_nationality" value="<?=$user['height']?>" readonly />
                                  </div>
                                </div>
                              </div>
                              </li>
                               <li>
                              <div class="item-content item-title_inner">
                                <div class="item-inner">
                                  <div class="item-title label">Weight (kgs)</div>
                                    <div class="item-input">
                                      <input type="text" name="primary_nationality" id="primary_nationality" value="<?=$user['weight']?>" readonly />
                                  </div>
                                </div>
                              </div>
                              </li>
                               <li>
                              <div class="item-content item-title_inner">
                                <div class="item-inner">
                                  <div class="item-title label">Hospital Born at</div>
                                    <div class="item-input">
                                      <input type="text" name="primary_nationality" id="primary_nationality" value="<?=$user['hospitalbornat']?>" readonly />
                                  </div>
                                </div>
                              </div>
                              </li>
                              <li>
                              <div class="item-content item-title_inner">
                                <div class="item-inner">
                                  <div class="item-title label">Born Id</div>
                                    <div class="item-input">
                                      <input type="text" name="primary_nationality" id="primary_nationality" value="<?=$user['bornid']?>" readonly />
                                  </div>
                                </div>
                              </div>
                              </li>
                              <li>
                              <div class="item-content item-title_inner">
                                <div class="item-inner">
                                  <div class="item-title label">Blood Group</div>
                                    <div class="item-input">
                                      <input type="text" name="primary_nationality" id="primary_nationality" value="<?=$user['first_name']?>" readonly />
                                  </div>
                                </div>
                              </div>
                              </li>
                              <div class="item-title">
                      <span style="float:left;line-height: 39px;">Company Information </span></div>
                      <li>
                              <div class="item-content item-title_inner">
                                <div class="item-inner">
                                  <div class="item-title label">OCCUPATION</div>
                                    <div class="item-input" id="adduseroccuption">
                                        <input type="text" name="comp_info_occu" id="comp_info_occu" value="<?=getonlyreqValue('occupation_name','occupation','id',$user['occupation'])?>" readonly />
                                    </div>
                                </div>
                              </div>
                            </li>
                             <li>
                              <div class="item-content item-title_inner">
                                <div class="item-inner">
                                  <div class="item-title label">Company name</div>
                                    <div class="item-input" id="adduseroccuption">
                                        <input type="text" name="comp_info_occu" id="comp_info_occu" value="<?=$user['company_name']?>" readonly />
                                    </div>
                                </div>
                              </div>
                            </li>
                             <li>
                              <div class="item-content item-title_inner">
                                <div class="item-inner">
                                  <div class="item-title label">Company address</div>
                                    <div class="item-input" id="adduseroccuption">
                                        <input type="text" name="comp_info_occu" id="comp_info_occu" value="<?=$user['company_address']?>" readonly />
                                    </div>
                                </div>
                              </div>
                            </li>
                             <li>
                              <div class="item-content item-title_inner">
                                <div class="item-inner">
                                  <div class="item-title label">Street</div>
                                    <div class="item-input" id="adduseroccuption">
                                        <input type="text" name="comp_info_occu" id="comp_info_occu" value="<?=$user['company_street']?>" readonly />
                                    </div>
                                </div>
                              </div>
                            </li>
                             <li>
                              <div class="item-content item-title_inner">
                                <div class="item-inner">
                                  <div class="item-title label">City</div>
                                    <div class="item-input" id="adduseroccuption">
                                        <input type="text" name="comp_info_occu" id="comp_info_occu" value="<?=$user['company_city']?>" readonly />
                                    </div>
                                </div>
                              </div>
                            </li>
                             <li>
                              <div class="item-content item-title_inner">
                                <div class="item-inner">
                                  <div class="item-title label">State</div>
                                    <div class="item-input" id="adduseroccuption">
                                        <input type="text" name="comp_info_occu" id="comp_info_occu" value="<?=$user['company_state']?>" readonly />
                                    </div>
                                </div>
                              </div>
                            </li>
                             <li>
                              <div class="item-content item-title_inner">
                                <div class="item-inner">
                                  <div class="item-title label">ZIP code</div>
                                    <div class="item-input" id="adduseroccuption">
                                        <input type="text" name="comp_info_occu" id="comp_info_occu" value="<?=$user['company_zip_code']?>" readonly />
                                    </div>
                                </div>
                              </div>
                            </li>
                             <li>
                              <div class="item-content item-title_inner">
                                <div class="item-inner">
                                  <div class="item-title label">Country</div>
                                    <div class="item-input" id="adduseroccuption">
                                        <input type="text" name="comp_info_occu" id="comp_info_occu" value="<?=$user['company_country']?>" readonly />
                                    </div>
                                </div>
                              </div>
                            </li>
                             <li>
                              <div class="item-content item-title_inner">
                                <div class="item-inner">
                                  <div class="item-title label">Company Phone</div>
                                    <div class="item-input" id="adduseroccuption">
                                        <input type="text" name="comp_info_occu" id="comp_info_occu" value="<?=$user['company_phone_number']?>" readonly />
                                    </div>
                                </div>
                              </div>
                            </li>
                            <li>
                            <div class="item-title">
                      <span style="float:left;line-height: 39px;">Birth Certificate</span></div>
                       <div id="user_img_display" class="fileupload-preview fileupload-exists thumbnail" style="max-width: 200px; max-height: 200px; line-height: 20px;">
                              <img src="<? if($user['dobimage']=='') echo "http://www.placehold.it/200x150/EFEFEF/AAAAAA&text=no+image";  else echo '../images/dateofbirth/'.$user['dobimage']; ?>" style="width: 30%;" />
                              </div>
                              </li>
                              <li>
                              <div class="item-title">
                      <span style="float:left;line-height: 39px;">User Image</span></div>
                       <div id="user_img_display" class="fileupload-preview fileupload-exists thumbnail" style="max-width: 200px; max-height: 200px; line-height: 20px;">
                              <img alt="UserImage" src="<? if($user['image']=='') echo "http://www.placehold.it/200x150/EFEFEF/AAAAAA&text=no+image";  else echo '../images/user/'.$user['image']; ?>" style="width: 30%;"  />
                              </div>
                              </li>
                              <div class="item-title">
                           <? $resultVal = getUserHospitalPrefInfo(); if(!empty($resultVal)){ ?>
                          <span style="float:left;line-height: 39px;">Preferred Hospitals Info</span></div>
                          <? foreach ($resultVal as $key => $uhpi) {?>
                          <li>
                              <div class="item-content item-title_inner">
                                <div class="item-inner">
                                  <div class="item-title label">Hospital</div>
                                  <div class="item-input">
                                    <input type="text" name="pre_hospital" id="pre_hospital_0" value="<?=$uhpi['hospital']?>" readonly/>
                                  </div>
                                </div>
                              </div>
                            </li>
                            <li>
                              <div class="item-content item-title_inner">
                                <div class="item-inner">
                                  <div class="item-title label">Medical Record Number</div>
                                  <div class="item-input">
                                    <input type="text" name="pre_hospital" id="pre_hospital_0" value="<?=$uhpi['medicalrecord']?>" readonly/>
                                  </div>
                                </div>
                              </div>
                            </li>
                            <li>
                              <div class="item-content item-title_inner">
                                <div class="item-inner">
                                  <div class="item-title label">Hospital Telephone Number</div>
                                  <div class="item-input">
                                    <input type="text" name="pre_hospital" id="pre_hospital_0" value="<?=$uhpi['hospital_telephone_number']?>" readonly/>
                                  </div>
                                </div>
                              </div>
                            </li>
                            <div class="item-title">
                          <? } } $resultVal1 = getUserPrefPharmacy(); if(!empty($resultVal1)){ ?>
                            <span style="float:left;line-height: 39px;">Preffered Pharmacies</span></div>
                            <? foreach ($resultVal1 as $key => $upp) { ?>
                            <li>
                              <div class="item-content item-title_inner">
                                <div class="item-inner">
                                  <div class="item-title label">Pharmacy Name </div>
                                    <div class="item-input">
                                      <input type="text" name="user_phar_name" id="user_phar_name_0" value="<?=$upp['pharmacyName']?>" />
                                    </div>
                                </div>
                              </div>
                            </li>
                            <li>
                              <div class="item-content item-title_inner">
                                <div class="item-inner">
                                  <div class="item-title label">Pharmacy Number  </div>
                                    <div class="item-input" >
                                      <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$upp['pharmacy_number']?>" />
                                    </div>
                                </div>
                              </div>
                            </li>
                        </div>
                      </div>
                      <? } } ?>
                      </ul>
                       <? } $i++;?>
                    </div>
                    </div>
                    
                    </li>
                    </ul>
                    </div>
                     <? } ?>


<!-- ######################## Physician Provider #################################-->
               <? if(isset($_REQUEST['physicianprovider'])) {?>
              <div class="list-block accordion-list" style="display: inline-block;width: 93%;"> 
              <ul>     
                <li class="accordion-item">
                  <a href="" class="item-link item-content">
                    <div class="item-inner">
                        <div class="item-title">Physician Provider</div>
                    </div>
                  </a>
                  <div id="collapse<?=$i?>" class="accordion-item-content">
                   <? $resVal = getTableValBySessionId('healthcare_providers','user_id','hcp_id');
                        foreach ($resVal as $key => $sumarydis) { ?> 
                    <div class="list-block">
                      <ul style="background-color: white">
                        <li>
                              <div class="item-content item-title_inner">
                                <div class="item-inner">
                                  <div class="item-title label">First Name</div>
                                    <div class="item-input" >
                                      <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$sumarydis['first_name']?>" />
                                    </div>
                                </div>
                              </div>
                            </li>
                             <li>
                              <div class="item-content item-title_inner">
                                <div class="item-inner">
                                  <div class="item-title label">Last Name</div>
                                    <div class="item-input" >
                                      <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$sumarydis['last_name']?>" />
                                    </div>
                                </div>
                              </div>
                            </li>
                             <li>
                              <div class="item-content item-title_inner">
                                <div class="item-inner">
                                  <div class="item-title label">Specialty</div>
                                    <div class="item-input" >
                                      <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=getonlyreqValue('name','doctors_speciality','id',$sumarydis['specialty'])?>" />
                                    </div>
                                </div>
                              </div>
                            </li>
                            <li>
                              <div class="item-content item-title_inner">
                                <div class="item-inner">
                                  <div class="item-title label">Address</div>
                                    <div class="item-input" >
                                      <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$sumarydis['address']?>" />
                                    </div>
                                </div>
                              </div>
                            </li>
                             <li>
                              <div class="item-content item-title_inner">
                                <div class="item-inner">
                                  <div class="item-title label">E-mail</div>
                                    <div class="item-input" >
                                      <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$sumarydis['email']?>" />
                                    </div>
                                </div>
                              </div>
                            </li>
                             <li>
                              <div class="item-content item-title_inner">
                                <div class="item-inner">
                                  <div class="item-title label">Street</div>
                                    <div class="item-input" >
                                      <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$sumarydis['street']?>" />
                                    </div>
                                </div>
                              </div>
                            </li>
                             <li>
                              <div class="item-content item-title_inner">
                                <div class="item-inner">
                                  <div class="item-title label">City</div>
                                    <div class="item-input" >
                                      <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$sumarydis['city']?>" />
                                    </div>
                                </div>
                              </div>
                            </li>
                             <li>
                              <div class="item-content item-title_inner">
                                <div class="item-inner">
                                  <div class="item-title label">State</div>
                                    <div class="item-input" >
                                      <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$sumarydis['state']?>" />
                                    </div>
                                </div>
                              </div>
                            </li>
                             <li>
                              <div class="item-content item-title_inner">
                                <div class="item-inner">
                                  <div class="item-title label">ZIP code</div>
                                    <div class="item-input" >
                                      <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$sumarydis['zip_code']?>" />
                                    </div>
                                </div>
                              </div>
                            </li>
                             <li>
                              <div class="item-content item-title_inner">
                                <div class="item-inner">
                                  <div class="item-title label">Country</div>
                                    <div class="item-input" >
                                      <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=getonlyreqValue('name','country','id',$sumarydis['country'])?>" />
                                    </div>
                                </div>
                              </div>
                            </li>
                             <li>
                              <div class="item-content item-title_inner">
                                <div class="item-inner">
                                  <div class="item-title label">Home Phone Number</div>
                                    <div class="item-input" >
                                      <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$sumarydis['home_phone_number']?>" />
                                    </div>
                                </div>
                              </div>
                            </li>
                             <li>
                              <div class="item-content item-title_inner">
                                <div class="item-inner">
                                  <div class="item-title label">Work phone number</div>
                                    <div class="item-input" >
                                      <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$sumarydis['work_phone_number']?>" />
                                    </div>
                                </div>
                              </div>
                            </li>
                             <li>
                              <div class="item-content item-title_inner">
                                <div class="item-inner">
                                  <div class="item-title label">Mobile phone</div>
                                    <div class="item-input" >
                                      <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$sumarydis['mobile_phone']?>" />
                                    </div>
                                </div>
                              </div>
                            </li>
                            <? } $i++;?>
                      </ul>
                    </div>
                  </div>
                  </li>
                  </ul>
                  </div>
                  <? } ?>
                  <!-- ######################## Emergency Contacts #################################-->

                 <? if(isset($_REQUEST['emergencycontact'])) {?>
              <div class="list-block accordion-list" style="display: inline-block;width: 93%;"> 
              <ul>     
                <li class="accordion-item">
                  <a href="" class="item-link item-content">
                    <div class="item-inner">
                        <div class="item-title">Emergency Contacts</div>
                    </div>
                  </a>
                  <div id="collapse<?=$i?>" class="accordion-item-content">
                   <? $resVal = getTableValBySessionId('emergency_contacts','user_id','contact_id');
                      foreach ($resVal as $key => $res2) { ?>
                    <div class="list-block">
                      <ul style="background-color: white">
                        <li>
                              <div class="item-content item-title_inner">
                                <div class="item-inner">
                                  <div class="item-title label">First Name</div>
                                    <div class="item-input" >
                                      <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res2['first_name']?>" />
                                    </div>
                                </div>
                              </div>
                            </li>
                            <li>
                              <div class="item-content item-title_inner">
                                <div class="item-inner">
                                  <div class="item-title label">Middle Name</div>
                                    <div class="item-input" >
                                      <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res2['middle_name']?>" />
                                    </div>
                                </div>
                              </div>
                            </li>
                            <li>
                              <div class="item-content item-title_inner">
                                <div class="item-inner">
                                  <div class="item-title label">Last Name</div>
                                    <div class="item-input" >
                                      <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res2['last_name']?>" />
                                    </div>
                                </div>
                              </div>
                            </li>
                             <li>
                              <div class="item-content item-title_inner">
                                <div class="item-inner">
                                  <div class="item-title label">Relationship</div>
                                    <div class="item-input" >
                                      <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res2['relationship']?>" />
                                    </div>
                                </div>
                              </div>
                            </li>
                             <li>
                              <div class="item-content item-title_inner">
                                <div class="item-inner">
                                  <div class="item-title label">E-mail</div>
                                    <div class="item-input" >
                                      <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res2['email']?>" />
                                    </div>
                                </div>
                              </div>
                            </li>
                             <li>
                              <div class="item-content item-title_inner">
                                <div class="item-inner">
                                  <div class="item-title label">City</div>
                                    <div class="item-input" >
                                      <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res2['city']?>" />
                                    </div>
                                </div>
                              </div>
                            </li>
                             <li>
                              <div class="item-content item-title_inner">
                                <div class="item-inner">
                                  <div class="item-title label">State</div>
                                    <div class="item-input" >
                                      <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res2['state']?>" />
                                    </div>
                                </div>
                              </div>
                            </li>
                             <li>
                              <div class="item-content item-title_inner">
                                <div class="item-inner">
                                  <div class="item-title label">ZIP code</div>
                                    <div class="item-input" >
                                      <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res2['zip_code']?>" />
                                    </div>
                                </div>
                              </div>
                            </li>
                             <li>
                              <div class="item-content item-title_inner">
                                <div class="item-inner">
                                  <div class="item-title label">Country</div>
                                    <div class="item-input" >
                                      <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=getonlyreqValue('name','country','id',$res2['country'])?>" />
                                    </div>
                                </div>
                              </div>
                            </li>
                            <li>
                              <div class="item-content item-title_inner">
                                <div class="item-inner">
                                  <div class="item-title label">Home Phone Number</div>
                                    <div class="item-input" >
                                      <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res2['home_phone_number']?>" />
                                    </div>
                                </div>
                              </div>
                            </li>
                            <li>
                              <div class="item-content item-title_inner">
                                <div class="item-inner">
                                  <div class="item-title label">Work Phone Number</div>
                                    <div class="item-input" >
                                      <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res2['work_phone_number']?>" />
                                    </div>
                                </div>
                              </div>
                            </li>
                            <li>
                              <div class="item-content item-title_inner">
                                <div class="item-inner">
                                  <div class="item-title label">Mobile Phone</div>
                                    <div class="item-input" >
                                      <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res2['mobile_phone']?>" />
                                    </div>
                                </div>
                              </div>
                            </li>
                            <li>
                              <div class="item-title">
                                <span style="float:left;line-height: 39px;">Emergency Contact Image Upload</span></div>
                                 <div id="user_img_display" class="fileupload-preview fileupload-exists thumbnail" style="max-width: 200px; max-height: 200px; line-height: 20px;">
                              <img src="<? if($res2['image']=='') echo "http://www.placehold.it/200x150/EFEFEF/AAAAAA&text=no+image";  else echo '../images/emergencycontact/'.$res2['image']; ?>" style="width: 30%;" />
                              </div>
                            </li>
                            <? } $i++; ?>
                      </ul>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <? } ?>
            <!-- ######################## Health Insurance #################################-->
                <? if(isset($_REQUEST['healthinsurance'])) {?>
              <div class="list-block accordion-list" style="display: inline-block;width: 93%;"> 
              <ul>     
                <li class="accordion-item">
                  <a href="" class="item-link item-content">
                    <div class="item-inner">
                        <div class="item-title"> Health Insurance</div>
                    </div>
                  </a>
                  <div id="collapse<?=$i?>" class="accordion-item-content">
                   <? $resVal = getTableValBySessionId('health_insurance','user_id','insurance_id');
                      foreach ($resVal as $key => $res3) { ?>
                    <div class="list-block">
                      <ul style="background-color: white">
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Company Name</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res3['company_name']?>" />
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Phone</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res3['phone']?>" />
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">City</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res3['city']?>" />
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Address</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res3['address']?>" />
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">State</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res3['state']?>" />
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Zip code</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res3['zip_code']?>" />
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Country</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=getonlyreqValue('name','country','id',$res3['country'])?>" />
                              </div>
                          </div>
                        </div>
                      </li>
                      <div class="item-title">Contact Person</div>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Last Name</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res3['cp_last_name']?>" />
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">First Name</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res3['cp_first_name']?>" />
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Phone</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res3['cp_phone']?>" />
                              </div>
                          </div>
                        </div>
                      </li>
                       <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Group Number</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res3['cp_groupnumber']?>" />
                              </div>
                          </div>
                        </div>
                      </li>
                       <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Member Id</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res3['cp_member_id']?>" />
                              </div>
                          </div>
                        </div>
                      </li>
                       <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">E-mail</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res3['cp_email']?>" />
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Primary Insured Person</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res3['cp_primary_insured_person']?>" />
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Social Security Number</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res3['cp_social_security_number']?>" />
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Employer Name</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res3['cp_employer_name']?>" />
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">City</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res3['cp_city']?>" />
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">State</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res3['cp_state']?>" />
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">ZIP code</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res3['cp_zip_code']?>" />
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-title">
                          <span style="float:left;line-height: 39px;">Copy of Fornt Insurance Card</span></div>
                           <div id="user_img_display" class="fileupload-preview fileupload-exists thumbnail" style="max-width: 200px; max-height: 200px; line-height: 20px;">
                        <img src="<? if($res3['card1']=='') echo "http://www.placehold.it/200x150/EFEFEF/AAAAAA&text=no+image";  else echo '../images/insurancecard_f/'.$res3['card1']; ?>" style="width: 30%;" />
                        </div>
                      </li>
                      <li>
                        <div class="item-title">
                          <span style="float:left;line-height: 39px;">Copy of Back Insurance Card</span></div>
                           <div id="user_img_display" class="fileupload-preview fileupload-exists thumbnail" style="max-width: 200px; max-height: 200px; line-height: 20px;">
                        <img src="<? if($res3['card2']=='') echo "http://www.placehold.it/200x150/EFEFEF/AAAAAA&text=no+image";  else echo '../images/insurancecard_b/'.$res3['card2']; ?>" style="width: 30%;" />
                        </div>
                      </li>
                      <? } $i++; ?>
                      </ul>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <? } ?>

            <!-- ######################## Medical and Legal Directives #################################-->  
                <? if(isset($_REQUEST['medicallgalcond'])) {?>
              <div class="list-block accordion-list" style="display: inline-block;width: 93%;"> 
              <ul>     
                <li class="accordion-item">
                  <a href="" class="item-link item-content">
                    <div class="item-inner">
                        <div class="item-title">Medical and Legal Directives</div>
                    </div>
                  </a>
                  <div id="collapse<?=$i?>" class="accordion-item-content">
                   <? $resVal = getTableValBySessionId('medical_legal_directors','user_id','director_id');
                      foreach ($resVal as $key => $res4) { ?>
                    <div class="list-block">
                      <ul style="background-color: white">
                        <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Proxy</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res4['proxy']?>" />
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Attorney Power</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res4['attorney_power']?>" />
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Durable Attorney Power</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res4['durable_attorney_power']?>" />
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Living Will</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res4['living_will']?>" />
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Legal Authority Name</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res4['legal_authority_name']?>" />
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">E-mail</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res4['email']?>" />
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">City</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res4['city']?>" />
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">State</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res4['state']?>" />
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">ZIP code</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res4['zip_code']?>" />
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Country</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=getonlyreqValue('name','country','id',$res4['country'])?>" />
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Home phone number</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res4['home_phone_number']?>" />
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Mobile phone</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res4['mobile_phone_number']?>" />
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Remarks</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res4['remarks']?>" />
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Address</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res4['address']?>"/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <? } $i++; ?>
                      </ul>
                    </div>
                  </div>
                </li>
              </ul>
              </div>
               <? } ?>
               <!-- ######################## Current Medical Conditions #################################-->
              <? if(isset($_REQUEST['currentmedcond'])) {?>
              <div class="list-block accordion-list" style="display: inline-block;width: 93%;"> 
              <ul>     
                <li class="accordion-item">
                  <a href="" class="item-link item-content">
                    <div class="item-inner">
                        <div class="item-title">Current Medical Conditions</div>
                    </div>
                  </a>
                  <div id="collapse<?=$i?>" class="accordion-item-content">
                  <? $resVal = getCustomerIllness('1');
                      if(!empty($resVal)){
                        foreach ($resVal as $key => $res5) { ?>
                    <div class="list-block">
                      <ul style="background-color: white">
                        <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Name</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<? if($res5['illnessId'] != '0') echo getonlyreqValue('name','illnesses','id',$res5['illnessId']); else echo $res5['other']; ?>" />
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Start Date</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res5['start_date']?>" />
                              </div>
                          </div>
                        </div>
                      </li>

                      </ul>
                    </div>
                    <? } $i++;
                  }else{
                        echo "<tr><td colspan='2'>No Records Found !!!</td></tr>";
                      } ?>
                  </div>
                </li>
              </ul>
              </div>
              <? } ?>
              <!-- ######################## Previous Medical Conditions #################################-->
              <? if(isset($_REQUEST['previousmedcond'])) {?>
              <div class="list-block accordion-list" style="display: inline-block;width: 93%;"> 
              <ul>     
                <li class="accordion-item">
                  <a href="" class="item-link item-content">
                    <div class="item-inner">
                        <div class="item-title">Previous Medical Conditions</div>
                    </div>
                  </a>
                  <div id="collapse<?=$i?>" class="accordion-item-content">
                  <? $resVal = getCustomerIllness('0');
                      if(!empty($resVal)){
                        foreach ($resVal as $key => $res6) { ?>
                    <div class="list-block">
                      <ul style="background-color: white">
                        <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Name</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<? if($res6['illnessId'] != '0') echo getonlyreqValue('name','illnesses','id',$res6['illnessId']); else echo $res6['other']; ?>" />
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Start Date</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res6['start_date']?>" />
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Resolved Date</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res6['resolvedDate']?>" />
                              </div>
                          </div>
                        </div>
                      </li>
                      </ul>
                    </div>
                    <? } $i++;
                    }else{
                        echo "<tr><td colspan='3'>No Records Found !!!</td></tr>";
                      } ?>
                  </div>
                  </li>
                </ul>
                </div>
                <? } ?>
                <!-- ######################## Current Medications and Dosages #################################-->
                  <? if(isset($_REQUEST['currentmeddos'])) {?>
              <div class="list-block accordion-list" style="display: inline-block;width: 93%;"> 
              <ul>     
                <li class="accordion-item">
                  <a href="" class="item-link item-content">
                    <div class="item-inner">
                        <div class="item-title">Current Medications and Dosages</div>
                    </div>
                  </a>
                  <div id="collapse<?=$i?>" class="accordion-item-content">
                  <? $resVal = getCustomerMedication('1');
                      if(!empty($resVal)){
                        foreach ($resVal as $key => $res7) { ?>
                    <div class="list-block">
                      <ul style="background-color: white">
                        <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Name</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res7['name']; ?>" />
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Dosage</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res7['dosage'] ; ?>" />
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Date Started</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res7['dateStarted'] ; ?>" />
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">End Date</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res7['enddate1'] ; ?>" />
                              </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <? } $i++; 
                      }else{
                        echo "<tr><td colspan='4'>No Records Found !!!</td></tr>";
                      } ?>
                  </div>
                </li>
                </ul>
              </div>
              <? } ?>
              <!-- ######################## Previous Medications and Dosages #################################-->             
                <? if(isset($_REQUEST['previousmeddos'])) {?>
              <div class="list-block accordion-list" style="display: inline-block;width: 93%;"> 
              <ul>     
                <li class="accordion-item">
                  <a href="" class="item-link item-content">
                    <div class="item-inner">
                        <div class="item-title">Previous Medications and Dosages</div>
                    </div>
                  </a>
                  <div id="collapse<?=$i?>" class="accordion-item-content">
                  <? $resVal = getCustomerMedication('0');
                      if(!empty($resVal)){
                        foreach ($resVal as $key => $res8) { ?>
                    <div class="list-block">
                      <ul style="background-color: white">
                        <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Name</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res8['name']; ?>" />
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Dosage</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res8['dosage'] ; ?>" />
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Date Started</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res8['dateStarted'] ; ?>" />
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">End Date</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res8['enddate1'] ; ?>" />
                              </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <? } $i++; 
                      }else{
                        echo "<tr><td colspan='4'>No Records Found !!!</td></tr>";
                      } ?>
                  </div>
                </li>
                </ul>
              </div>
              <? } ?>
              <!-- ######################## Immunizations #################################-->
               <? if(isset($_REQUEST['immunization'])) {?>
              <div class="list-block accordion-list" style="display: inline-block;width: 93%;"> 
              <ul>     
                <li class="accordion-item">
                  <a href="" class="item-link item-content">
                    <div class="item-inner">
                        <div class="item-title">Immunizations</div>
                    </div>
                  </a>
                  <div id="collapse<?=$i?>" class="accordion-item-content">
                   <? $resVal = getTableValBySessionId('immunizations','user_id','immunizations_id');
                      if(!empty($resVal)){
                        foreach ($resVal as $key => $res9) { ?>
                    <div class="list-block">
                      <ul style="background-color: white">
                        <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Type</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<? if($res9['immunizations_type_id'] != '0'){ echo getonlyreqValue('type','immunization_types','immunizations_type_id',$res9['immunizations_type_id']); }else{ echo $res9['other']; } ?>" />
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Booster1</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res9['booster1'] ; ?>" />
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Booster2</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res9['booster2'] ; ?>" />
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Booster3</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res9['booster3'] ; ?>" />
                              </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                   <? } $i++; 
                      }else{
                        echo "<tr><td colspan='4'>No Records Found !!!</td></tr>";
                      } ?>
                  </div>
                </li>
                </ul>
              </div>
              <? } ?>
                <!-- ######################## Food Allergies and Sensitivities #################################-->
                <? if(isset($_REQUEST['foodalgsen'])) {?>
              <div class="list-block accordion-list" style="display: inline-block;width: 93%;"> 
              <ul>     
                <li class="accordion-item">
                  <a href="" class="item-link item-content">
                    <div class="item-inner">
                        <div class="item-title">Food Allergies and Sensitivities</div>
                    </div>
                  </a>
                  <div id="collapse<?=$i?>" class="accordion-item-content">
                    <? $resVal = getCutomerAllergies('2');
                      if(!empty($resVal)){
                        foreach ($resVal as $key => $res10) { ?>
                    <div class="list-block">
                      <ul style="background-color: white">
                        <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Name</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res10['typename'] ; ?>" />
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Reaction</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res10['reaction'] ; ?>" />
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Treatment</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res10['treatment'] ; ?>" />
                              </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                   <? } $i++; 
                      }else{
                        echo "<tr><td colspan='4'>No Records Found !!!</td></tr>";
                      } ?>
                  </div>
                </li>
                </ul>
              </div>
              <? } ?>
              <!-- ######################## Environmental Allergies and Sensitivities #################################-->
                <? if(isset($_REQUEST['enviromentalalgsen'])) {?>
              <div class="list-block accordion-list" style="display: inline-block;width: 93%;"> 
              <ul>     
                <li class="accordion-item">
                  <a href="" class="item-link item-content">
                    <div class="item-inner">
                        <div class="item-title">Environmental Allergies and Sensitivities</div>
                    </div>
                  </a>
                  <div id="collapse<?=$i?>" class="accordion-item-content">
                    <? $resVal = getCutomerAllergies('3');
                      if(!empty($resVal)){
                        foreach ($resVal as $key => $res11) { ?>
                    <div class="list-block">
                      <ul style="background-color: white">
                        <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Name</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res11['typename'] ; ?>" />
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Reaction</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res11['reaction'] ; ?>" />
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Treatment</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res11['treatment'] ; ?>" />
                              </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                   <? } $i++; 
                      }else{
                        echo "<tr><td colspan='4'>No Records Found !!!</td></tr>";
                      } ?>
                  </div>
                </li>
                </ul>
              </div>
              <? } ?>
              <!-- ######################## Drug Allergies and Sensitivities #################################-->
                 <? if(isset($_REQUEST['drugalgsen'])) {?>
              <div class="list-block accordion-list" style="display: inline-block;width: 93%;"> 
              <ul>     
                <li class="accordion-item">
                  <a href="" class="item-link item-content">
                    <div class="item-inner">
                        <div class="item-title">Drug Allergies and Sensitivities</div>
                    </div>
                  </a>
                  <div id="collapse<?=$i?>" class="accordion-item-content">
                    <? $resVal = getCutomerAllergies('1');
                      if(!empty($resVal)){
                        foreach ($resVal as $key => $res12) { ?>
                    <div class="list-block">
                      <ul style="background-color: white">
                        <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Name</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res12['typename'] ; ?>" />
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Reaction</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res12['reaction'] ; ?>" />
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Treatment</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res12['treatment'] ; ?>" />
                              </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                   <? } $i++; 
                      }else{
                        echo "<tr><td colspan='4'>No Records Found !!!</td></tr>";
                      } ?>
                  </div>
                </li>
                </ul>
              </div>
              <? } ?>
              <!-- ######################## Family Medical Conditions #################################-->
                <? if(isset($_REQUEST['familyhistory'])) {?>
              <div class="list-block accordion-list" style="display: inline-block;width: 93%;"> 
              <ul>     
                <li class="accordion-item">
                  <a href="" class="item-link item-content">
                    <div class="item-inner">
                        <div class="item-title">Family Medical Conditions</div>
                    </div>
                  </a>
                  <div id="collapse<?=$i?>" class="accordion-item-content">
                     <? $resVal = getTableValBySessionId('familyhistorycustomers','customerId','id');
                      if(!empty($resVal)){
                        foreach ($resVal as $key => $res13) { ?>
                    <div class="list-block">
                      <ul style="background-color: white">
                        <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">History</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<? if($res13['historyid'] != 0) echo getValue('type','familyhistory',$res13['historyid']); else echo 'Other'; ?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Family Member</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res13['name'] ; ?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Specify</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res13['value'] ; ?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                   <? } $i++; 
                      }else{
                        echo "<tr><td colspan='4'>No Records Found !!!</td></tr>";
                      } ?>
                  </div>
                </li>
                </ul>
              </div>
              <? } ?>
             <!-- ######################## Family Causes Of Death #################################-->
                  <? if(isset($_REQUEST['causeofdeath'])) {?>
              <div class="list-block accordion-list" style="display: inline-block;width: 93%;"> 
              <ul>     
                <li class="accordion-item">
                  <a href="" class="item-link item-content">
                    <div class="item-inner">
                        <div class="item-title">Family Causes Of Death</div>
                    </div>
                  </a>
                  <div id="collapse<?=$i?>" class="accordion-item-content">
                     <? $resVal = getTableValBySessionId('familycauseofdeathcustomer','customerId','id');
                      if(!empty($resVal)){
                        foreach ($resVal as $key => $res14) { ?>
                    <div class="list-block">
                      <ul style="background-color: white">
                        <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Name</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<? if($res14['causeofdeathid'] != 0) echo getValue('name','familycauseofdeath',$res14['causeofdeathid']); else echo 'Other'; ?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Causes of Death</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res14['description'] ; ?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                   <? } $i++; 
                      }else{
                        echo "<tr><td colspan='4'>No Records Found !!!</td></tr>";
                      } ?>
                  </div>
                </li>
                </ul>
              </div>
              <? } ?>
              <!-- ######################## Doctor Consultations #################################-->
                  <? if(isset($_REQUEST['doctorconsult'])) {?>
              <div class="list-block accordion-list" style="display: inline-block;width: 93%;"> 
              <ul>     
                <li class="accordion-item">
                  <a href="" class="item-link item-content">
                    <div class="item-inner">
                        <div class="item-title">Doctor Consultations</div>
                    </div>
                  </a>
                  <div id="collapse<?=$i?>" class="accordion-item-content">
                     <? $resVal = getTableValBySessionId('doctors_consultation','user_id','id');
                      if(!empty($resVal)){
                        foreach ($resVal as $key => $res15) { ?>
                    <div class="list-block">
                      <ul style="background-color: white">
                        <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Name Of Physician</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res15['physician_name']; ?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Reason</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res15['reason'] ; ?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                       <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Diagnosis</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res15['diagnosis'] ; ?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                       <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Treatment</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res15['treatment'] ; ?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                       <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Date Of Consultation</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res15['date'] ; ?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                   <? } $i++; 
                      }else{
                        echo "<tr><td colspan='4'>No Records Found !!!</td></tr>";
                      } ?>
                  </div>
                </li>
                </ul>
              </div>
              <? } ?>
             <!-- ######################## Surgeries #################################-->
                <? if(isset($_REQUEST['surgeries'])) {?>
              <div class="list-block accordion-list" style="display: inline-block;width: 93%;"> 
              <ul>     
                <li class="accordion-item">
                  <a href="" class="item-link item-content">
                    <div class="item-inner">
                        <div class="item-title">Hospitalization And Surgeries </div>
                    </div>
                  </a>
                  <div id="collapse<?=$i?>" class="accordion-item-content">
                     <? $resVal = getTableValBySessionId('surgeries','user_id','id');
                      if(!empty($resVal)){
                        foreach ($resVal as $key => $res16) { ?>
                    <div class="list-block">
                      <ul style="background-color: white">
                        <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Adminission Date</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res16['adminissionDate']?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Discharge Date</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res16['dischargeDate']?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                       <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Physician Name</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res16['physician']?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                       <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Hospital Name</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res16['hospital']?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                       <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Case Number</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res16['case']?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Reason</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res16['reason']?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Address</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res16['address']?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Diagnosis</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res16['diagnosis']?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Procedure</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res16['procedure']?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Pathology</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res16['pathology']?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Important Findings</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res16['importantFindings']?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                            <div class="item-title">
                      <span style="float:left;line-height: 39px;">Upload Surgery Document / Image</span></div>
                       <div id="user_img_display" class="fileupload-preview fileupload-exists thumbnail" style="max-width: 200px; max-height: 200px; line-height: 20px;">
                              <img src="<? if($res16['card1']=='') echo "http://www.placehold.it/200x150/EFEFEF/AAAAAA&text=no+image";  else echo '../images/surgeries/'.$res16['card1']; ?>" style="width: 30%;" />
                              </div>
                              </li>
                    </ul>
                  </div>
                   <? } $i++; 
                      }else{
                        echo "<tr><td colspan='4'>No Records Found !!!</td></tr>";
                      } ?>
                  </div>
                </li>
                </ul>
              </div>
              <? } ?>
              <!-- ######################## Hematology #################################-->
                <? if(isset($_REQUEST['hematology'])) {?>
              <div class="list-block accordion-list" style="display: inline-block;width: 93%;"> 
              <ul>     
                <li class="accordion-item">
                  <a href="" class="item-link item-content">
                    <div class="item-inner">
                        <div class="item-title">Hematology</div>
                    </div>
                  </a>
                  <div id="collapse<?=$i?>" class="accordion-item-content">
                      <? 
                      $select1="SELECT * FROM `CustomerLabResults` where customerId=$data[uid] and catId=7 ORDER BY id DESC";
                      $query1=mysql_query($select1);
                      if(mysql_num_rows($query1)>0){
                        while($res17=mysql_fetch_assoc($query1)) 
                        { ?>
                      <? foreach (getAllreqValue('labsresults','CustomerLabResultsId',$res17['id']) as $key => $resc1) { ?>
                    <div class="list-block">
                      <ul style="background-color: white">
                        <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Test</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=getonlyreqValue('name','labsRecords','lab_id',$resc1['recordId']); ?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Value</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$resc1['value'] ; ?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Date</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$resc1['date'] ; ?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                   <? } } } else { 
                          echo "<tr><td colspan='3'>No Records Found !!!</td></tr>";
                        }$i++; ?>
                  </div>
                </li>
                </ul>
              </div>
              <? } ?>
              <!-- ######################## Implants / Medical Devices #################################-->
                  <? if(isset($_REQUEST['implantmeddev'])) {?>
              <div class="list-block accordion-list" style="display: inline-block;width: 93%;"> 
              <ul>     
                <li class="accordion-item">
                  <a href="" class="item-link item-content">
                    <div class="item-inner">
                        <div class="item-title">Implants / Medical Devices</div>
                    </div>
                  </a>
                  <div id="collapse<?=$i?>" class="accordion-item-content">
                     <? $resVal = getTableValBySessionId('medicaldevices','customerId','id');
                      if(!empty($resVal)){
                        foreach ($resVal as $key => $res18) { ?>
                    <div class="list-block">
                      <ul style="background-color: white">
                        <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Name Of Physician</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res18['physician']; ?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Hospital Name</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res18['hospital'] ; ?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                       <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Reason</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res18['reason'] ; ?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                       <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Type</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res18['type'] ; ?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                       <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Date</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res18['date'] ; ?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                   <? } $i++; 
                      }else{
                        echo "<tr><td colspan='4'>No Records Found !!!</td></tr>";
                      } ?>
                  </div>
                </li>
                </ul>
              </div>
              <? } ?>
              <!-- ######################## Dental History #################################-->
                  <? if(isset($_REQUEST['dentalhistory'])) {?>
              <div class="list-block accordion-list" style="display: inline-block;width: 93%;"> 
              <ul>     
                <li class="accordion-item">
                  <a href="" class="item-link item-content">
                    <div class="item-inner">
                        <div class="item-title">Dental History</div>
                    </div>
                  </a>
                  <div id="collapse<?=$i?>" class="accordion-item-content">
                      <? $resVal = getTableValBySessionId('dental_history','user_id','id');
                      if(!empty($resVal)){
                        foreach ($resVal as $key => $res19) { ?>
                    <div class="list-block">
                      <ul style="background-color: white">
                        <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Current Dental Problem</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res19['curent_dental_problem']; ?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Dentist</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res19['dentist'] ; ?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                       <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Dentist Phone</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res19['phone'] ; ?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                       <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Date Dental Exam</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res19['Date_last_dental_exam'] ; ?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                       <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Date/Type Dental X-rays</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res19['last_dental_xrays'] ; ?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                   <? } $i++; 
                      }else{
                        echo "<tr><td colspan='5'>No Records Found !!!</td></tr>";
                      } ?>
                  </div>
                </li>
                </ul>
              </div>
              <? } ?>
              <!-- ######################## OBSTETRIC HISTORY #################################-->
                <? if(isset($_REQUEST['obstetrichistory'])) {?>
              <div class="list-block accordion-list" style="display: inline-block;width: 93%;"> 
              <ul>     
                <li class="accordion-item">
                  <a href="" class="item-link item-content">
                    <div class="item-inner">
                        <div class="item-title">OBSTETRIC HISTORY</div>
                    </div>
                  </a>
                  <div id="collapse<?=$i?>" class="accordion-item-content">
                       <? $resVal = getTableValBySessionId('obstetric_history','customerId','id');
                      if(!empty($resVal)){
                        foreach ($resVal as $key => $res20) { ?>
                    <div class="list-block">
                      <ul style="background-color: white">
                      <div class="item-title">Pregnancy History</div>
                        <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Date of Delivery</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res20['dateOfDelivery']?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">No of weeks of Gestation</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res20['nbrOfWeeks']?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                       <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Labor Length</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res20['laborLength']?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                       <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Baby's Weight</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res20['badyWeight']?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                       <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Sex (M/F)</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res20['sex']?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Name</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res20['LivingName']?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Delivery Type(Vag or C/S)</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?if($res20['delveryType']==1)echo "VAG";else echo "C/S";?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Epidural/Pain Med/None</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res20['epidural']?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Comments / Complications</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res20['comments']?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                   <? } $i++; 
                      }else{
                        echo "<tr><td colspan='5'>No Records Found !!!</td></tr>";
                      } ?>
                  </div>
                </li>
                </ul>
              </div>
              <? } ?>
              <!-- ######################## GYNECOLOGIC HISTORY #################################-->
                <? if(isset($_REQUEST['gynohistory'])) {?>
              <div class="list-block accordion-list" style="display: inline-block;width: 93%;"> 
              <ul>     
                <li class="accordion-item">
                  <a href="" class="item-link item-content">
                    <div class="item-inner">
                        <div class="item-title">GYNECOLOGIC HISTORY</div>
                    </div>
                  </a>
                  <div id="collapse<?=$i?>" class="accordion-item-content">
                      <? $resVal = getTableValBySessionId('womanGynecologic','customerId','id');
                      if(!empty($resVal)){
                        foreach ($resVal as $key => $res20) { ?>
                    <div class="list-block">
                      <ul style="background-color: white">
                      <div class="item-title">Gynecologic History</div>
                        <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Age of First Period</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res20['ageOfFirstPeriod']?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Date of Last Pap Smear</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res20['dateOfLastPapSmear']?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                       <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Result</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res20['result']?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                       <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Have you ever had an Abnormal Pap Smear</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?if($res20['AbnolmalPapSmear']==1)echo "Yes";else echo "No";?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">History of Sexually Transmitted Infections</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?if($res20['secuallyInfections']==1)echo "Yes";else echo "No";?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                   <? } $i++; 
                      }else{
                        echo "<tr><td colspan='5'>No Records Found !!!</td></tr>";
                      } ?>
                  </div>
                </li>
                </ul>
              </div>
              <? } ?>
              <!-- ######################## GENETIC HISTORY #################################-->
               <? if(isset($_REQUEST['genetichistory'])) {?>
              <div class="list-block accordion-list" style="display: inline-block;width: 93%;"> 
              <ul>     
                <li class="accordion-item">
                  <a href="" class="item-link item-content">
                    <div class="item-inner">
                        <div class="item-title">GENETIC HISTORY</div>
                    </div>
                  </a>
                  <div id="collapse<?=$i?>" class="accordion-item-content">
                     <? $resVal = getTableValBySessionId('WomanGeneticHistory','customerId','id');
                      if(!empty($resVal)){
                        foreach ($resVal as $key => $res20) { ?>
                    <div class="list-block">
                      <ul style="background-color: white">
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">History</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res20['nameofthetype']?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                       <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Your Family</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?if($res20['YourFamily']==1)echo "Yes";else echo "No";?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                       <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Partner's Family</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?if($res20['PartnerFamily']==1)echo "Yes";else echo "No";?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                   <? } $i++; 
                      }else{
                        echo "<tr><td colspan='5'>No Records Found !!!</td></tr>";
                      } ?>
                  </div>
                </li>
                </ul>
              </div>
              <? } ?>
             <!-- ######################## WOMAN PREGNANCY DATING #################################-->
               <? if(isset($_REQUEST['pregdating'])) {?>
              <div class="list-block accordion-list" style="display: inline-block;width: 93%;"> 
              <ul>     
                <li class="accordion-item">
                  <a href="" class="item-link item-content">
                    <div class="item-inner">
                        <div class="item-title">WOMAN PREGNANCY DATING</div>
                    </div>
                  </a>
                  <div id="collapse<?=$i?>" class="accordion-item-content">
                     <? $resVal = getTableValBySessionId('womanPregnancyDating','customerId','id');
                      if(!empty($resVal)){
                        foreach ($resVal as $key => $res20) { ?>
                    <div class="list-block">
                      <ul style="background-color: white">
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">First Day of Last Menstrual Period</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="(<?=$res20['menstrualPeriod']?>( <?if($res20['certainApproximate']==1)echo "Approximate";else echo "Certain ";?>)" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Frequency Period from start of one to the start of the next one evary</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res20['frequencyPeriodDays']?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Duration of Period</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res20['dop']?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Are your Periods Regular</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?if($res20['periodRegular']==1)echo "No";else echo "Yes";?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Were you on Birth Control when you become Pregnant</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?if($res20['birthControl']==1)echo "No";else echo "Yes";?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Which Method</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res20['method']?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Have you taken a Home Pregnancy Test</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?if($res20['pregrancyTest']==0)echo "No";else echo "Yes";?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Pregnancy Test Date</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res20['pregnancyTestDate']?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                   <? } $i++; 
                      }else{
                        echo "<tr><td colspan='5'>No Records Found !!!</td></tr>";
                      } ?>
                  </div>
                </li>
                </ul>
              </div>
              <? } ?>
              <!-- ######################## SOCIAL HISTORY #################################-->
             <? if(isset($_REQUEST['socialhistory'])) {?>
              <div class="list-block accordion-list" style="display: inline-block;width: 93%;"> 
              <ul>     
                <li class="accordion-item">
                  <a href="" class="item-link item-content">
                    <div class="item-inner">
                        <div class="item-title">SOCIAL HISTORY</div>
                    </div>
                  </a>
                  <div id="collapse<?=$i?>" class="accordion-item-content">
                     <? $resVal = getTableValBySessionId('SocialHistory','customerId','id');
                      if(!empty($resVal)){
                        foreach ($resVal as $key => $res20) { ?>
                    <div class="list-block">
                      <ul style="background-color: white">
                      <div class="item-title">Tobacco Use</div>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Do You Smoke Cigarettes</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?if($res20['smokeCigarettes']==1)echo "Yes";else if($res20['smokeCigarettes']==2) echo "No";else echo "Never";?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Past Use</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?if($res20['pastUse']==1)echo "Yes";else echo "No";?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Quit Date</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res20['quitDate']?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">If Yes Number of Packs for Day</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res20['numberofPacks']?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Number of Packs for Year</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res20['numberofPacks']?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Other Tobacco Use</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?if($res20['otherUse']==1)echo "Pipe";else if($res20['otherUse']==2)echo "Cigar";else if($res20['otherUse']==2)echo "Snuff ";else if($res20['otherUse']==2)echo "Snuff ";else echo "Never";?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <div class="item-title">Alcohol Use</div>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Do you Drink Alcohol</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?if($res20['drinkAlcohol']==1)echo "Yes";else echo "No";?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Number of Drinks Per Week</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res20['NbrofDrinksPerWeek']?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Quit for Pregancy</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res20['quitforpregancy']?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                   <? } $i++; 
                      }else{
                        echo "<tr><td colspan='5'>No Records Found !!!</td></tr>";
                      } ?>
                  </div>
                </li>
                </ul>
              </div>
              <? } ?>
              <!-- ######################## SOCIAL/SAFETY DOCUMENTATION #################################-->
               <? if(isset($_REQUEST['socialsafetyhistory'])) {?>
              <div class="list-block accordion-list" style="display: inline-block;width: 93%;"> 
              <ul>     
                <li class="accordion-item">
                  <a href="" class="item-link item-content">
                    <div class="item-inner">
                        <div class="item-title">SOCIAL/SAFETY DOCUMENTATION</div>
                    </div>
                  </a>
                  <div id="collapse<?=$i?>" class="accordion-item-content">
                     <? $resVal = getTableValBySessionId('socialsafety','customerId','id');
                      if(!empty($resVal)){
                        foreach ($resVal as $key => $res20) { ?>
                    <div class="list-block">
                      <ul style="background-color: white">
                      <div class="item-title">Social/Safety</div>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">What do you Live with</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res20['livewith']?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Do you have any Cats in your Home</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?if($res20['cats']==1)echo "Yes";else echo "No";?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">If yes, who cleans the Litter Box</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res20['lifterbox']?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Do you have working Smoke Alarms</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?if($res20['smokealarms']==1)echo "Yes";else echo "No";?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Are there any Guns in the Home</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?if($res20['gunsinhome']==1)echo "Yes";else echo "No";?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">If yes, are they Locked up or Secured</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res20['lockedup']?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Do you have a Religious Preference</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res20['religiousPref']?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">What is your Racial Ethnicity</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res20['ethnicity']?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Primary Language</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res20['language']?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Has there been a history of Violence, Trauma, or Physical, Sexual, or Emotional Abuse in your Family, or in your Relationship (Past or Present)</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res20['history']?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">How many years of Education do you have</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res20['yearsofeducation']?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Type of Degree</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res20['typeofDegree']?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">What is your occupation</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res20['occupation']?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">What is your Partner's Occupation</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res20['partneroccupation']?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                   <? } $i++; 
                      }else{
                        echo "<tr><td colspan='5'>No Records Found !!!</td></tr>";
                      } ?>
                  </div>
                </li>
                </ul>
              </div>
              <? } ?>
              <!-- ######################## SEXUAL ACTIVITY #################################-->
                <? if(isset($_REQUEST['sexualact'])) {?>
              <div class="list-block accordion-list" style="display: inline-block;width: 93%;"> 
              <ul>     
                <li class="accordion-item">
                  <a href="" class="item-link item-content">
                    <div class="item-inner">
                        <div class="item-title">SEXUAL ACTIVITY</div>
                    </div>
                  </a>
                  <div id="collapse<?=$i?>" class="accordion-item-content">
                     <? $resVal = getTableValBySessionId('sexualactivity','customerId','id');
                      if(!empty($resVal)){
                        foreach ($resVal as $key => $res20) { ?>
                    <div class="list-block">
                      <ul style="background-color: white">
                      <div class="item-title">Activity</div>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Currently Sexually Active</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?if($res20['sexualactivity']==1)echo "Yes";else echo "No";?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">If yes, Partner's Name</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res20['partnername']?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Sexual Partner(s) is/are/have been</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?if($res20['sexualpartner']==0)echo "Male";else if($res20['smokeCigarettes']==1) echo "Female";else echo "Both";?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Preferred Birth Control Method</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res20['controlmethod']?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                   <? } $i++; 
                      }else{
                        echo "<tr><td colspan='5'>No Records Found !!!</td></tr>";
                      } ?>
                  </div>
                </li>
                </ul>
              </div>
              <? } ?>
              <!-- ######################## ACTIVITIES OF DAILY LIVING #################################-->
               <? if(isset($_REQUEST['actdailyliving'])) {?>
              <div class="list-block accordion-list" style="display: inline-block;width: 93%;"> 
              <ul>     
                <li class="accordion-item">
                  <a href="" class="item-link item-content">
                    <div class="item-inner">
                        <div class="item-title">ACTIVITIES OF DAILY LIVING</div>
                    </div>
                  </a>
                  <div id="collapse<?=$i?>" class="accordion-item-content">
                    <? $resVal = getTableValBySessionId('activitiesofdailyLiving','CustomerId','id');
                      if(!empty($resVal)){
                        foreach ($resVal as $key => $res20) { ?>
                    <div class="list-block">
                      <ul style="background-color: white">
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Have you ever served in the military</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?if($res20['military']==1)echo "Yes";else echo "No";?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Have you ever had a blood transfusion</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?if($res20['transfusion']==1)echo "Yes";else echo "No";?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Do you have any concerns about caffeine</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?if($res20['caffeine']==1)echo "Yes";else echo "No";?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Do you have any occupational exposures (chemicals, x-rays, chemo, etc)</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?if($res20['occupational']==1)echo "Yes";else echo "No";?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Do you participate in any extreme or hazardous hobbies</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?if($res20['hazardoushobbies']==1)echo "Yes";else echo "No";?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Do you have any sleep concerns</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?if($res20['sleepconcerns']==1)echo "Yes";else echo "No";?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Are you currently experiencing any unusual stressors</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?if($res20['unusualstressors']==1)echo "Yes";else echo "No";?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Do you have any weight concerns</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?if($res20['weight']==1)echo "Yes";else echo "No";?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Do you eat special diet such as vegetarian or gluten-free</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?if($res20['vegetarian']==1)echo "Yes";else echo "No";?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                       <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Do you have any previous back injuries or scliosis</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?if($res20['injuries']==1)echo "Yes";else echo "No";?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Do you exercise</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?if($res20['exercise']==1)echo "Yes";else echo "No";?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">If so, What do you do for Exercise</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res20['doexercise'];?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Do you wear a helmet when riding a bicycle</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?if($res20['bicycle']==1)echo "Yes";else echo "No";?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Do you wear a seatbelt in the car</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?if($res20['seatbelt']==1)echo "Yes";else echo "No";?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Do you do self-breast exams</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?if($res20['selfbreast']==1)echo "Yes";else echo "No";?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                   <? } $i++; 
                      }else{
                        echo "<tr><td colspan='5'>No Records Found !!!</td></tr>";
                      } ?>
                  </div>
                </li>
                </ul>
              </div>
              <? } ?>
              <!-- ######################## BIO-CHEMICAL AND RISK #################################-->
                 <? if(isset($_REQUEST['BDRS'])) {?>
              <div class="list-block accordion-list" style="display: inline-block;width: 93%;"> 
              <ul>     
                <li class="accordion-item">
                  <a href="" class="item-link item-content">
                    <div class="item-inner">
                        <div class="item-title">BIO-CHEMICAL AND RISK</div>
                    </div>
                  </a>
                  <div id="collapse<?=$i?>" class="accordion-item-content">
                      <? $resVal = getTableValBySessionId('biochemicalandrisk','customerid','id');
                      if(!empty($resVal)){
                        foreach ($resVal as $key => $res20) { ?>
                    <div class="list-block">
                      <ul style="background-color: white">
                      <div class="item-title">Assessment</div>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Heigth</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res20['height'];?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Weight</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res20['weight']?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Body Mass Index (BMI)</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res20['bmi'];?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Waist Circumference</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res20['wc']?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Systolic Blood Pressure</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res20['bp_s']?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Diastolic Blood Pressure</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res20['bp_d']?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Resting Metabolic Rate (RMR)</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res20['rmr'];?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Pulse</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res20['pulse']?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Calorimetry Prodictive Equation</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res20['calorimetryprodictiveequ']?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Total Energy Expenditure(TEE)</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res20['tee']?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                   <? } $i++; 
                      }else{
                        echo "<tr><td colspan='5'>No Records Found !!!</td></tr>";
                      } ?>
                  </div>
                </li>
                </ul>
              </div>
              <? } ?>
              <!-- ######################## FOOD AND NUTRITION HISTORY #################################-->
                <? if(isset($_REQUEST['FNH'])) {?>
              <div class="list-block accordion-list" style="display: inline-block;width: 93%;"> 
              <ul>     
                <li class="accordion-item">
                  <a href="" class="item-link item-content">
                    <div class="item-inner">
                        <div class="item-title">FOOD AND NUTRITION HISTORY</div>
                    </div>
                  </a>
                  <div id="collapse<?=$i?>" class="accordion-item-content">
                      <? $resVal = getTableValBySessionId('foodandnutrition','customerid','id');
                      if(!empty($resVal)){
                        foreach ($resVal as $key => $res20) { ?>
                    <div class="list-block">
                      <ul style="background-color: white">
                      <div class="item-title">History</div>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Calories Intake</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res20['energyintake'];?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Estimated Calories Intake</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res20['estimatedenergy']?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Calories from Fat</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res20['caloriesfromfat'];?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Calories from Carbohydrate</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res20['fromcarbohydrate']?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Consumes Dairy Foods</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?if($res20['dairyfoods']==1)echo "Yes";else echo "No";?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Servings / Day</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res20['servingsforday']?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Dines away from Home</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?if($res20['dinesaway']==1)echo "Yes";else echo "No";?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Times per week</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res20['timesPerweek']?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Location(s)</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res20['locations']?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Restaurants (4-5x)</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res20['restaurants']?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Fast food (2-3x)</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res20['fastfoot']?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Reads food labels and uses labels to make Appropriate Food Selections</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?if($res20['appropriately']==1)echo "Yes";else echo "No";?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Modifies food preparation and recipes to reduce calories</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?if($res20['modifiesfood']==1)echo "Yes";else echo "No";?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Limits portion sizes</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?if($res20['portionsizes']==1)echo "Yes";else echo "No";?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Maintains vitamins/minerals adequacy</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?if($res20['vitaminsandminerals']==1)echo "Yes";else echo "No";?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Physical Activity Level</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?if($res20['activitylevel']==1)echo "Sedentary";else if($res20['activitylevel']==2)echo "Low Active";else if($res20['activitylevel']==3)echo "Active";else echo "Very Active";?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">specify</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res20['specify']?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Moderate</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res20['moderate']?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Vigorous</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res20['vigorous']?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Sedentary Time</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res20['vigorous']?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                   <? } $i++; 
                      }else{
                        echo "<tr><td colspan='5'>No Records Found !!!</td></tr>";
                      } ?>
                  </div>
                </li>
                </ul>
              </div>
              <? } ?>
              <!-- ######################## Pediatrics Family History #################################-->
                <? if(isset($_REQUEST['PFH'])) {?>
              <div class="list-block accordion-list" style="display: inline-block;width: 93%;"> 
              <ul>     
                <li class="accordion-item">
                  <a href="" class="item-link item-content">
                    <div class="item-inner">
                        <div class="item-title">Pediatrics Family History  </div>
                    </div>
                  </a>
                  <div id="collapse<?=$i?>" class="accordion-item-content">
                      <? $resVal = getTableValBySessionId('pediatricsfamilyhistory','customerId','id');
                      if(!empty($resVal)){
                        foreach ($resVal as $key => $res20) { ?>   
                    <div class="list-block">
                      <ul style="background-color: white">
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Date</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res20['dateCompleted'];?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Child's Name</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=getValue('childname','pediatricschild',$res20['childid'])?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">The Child Live with ?</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?if($res20['childliveswith']==0)echo "Mother";else if($res20['childliveswith']==1) echo "Father";else if($res20['childliveswith']==2) echo "Mother / Father";else if($res20['childliveswith']==3) echo "Mother / Partner";else echo "Grandparent / Other";?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Are there cultural or religious practices that might affect your child's medical care ?</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?if($res20['culturalorreligious']==1)echo "Yes";else echo "No";?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">If yes, please explain (e.g. blood transfusion, dietary rules,etc) ?</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res20['ifyes'];?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Is there tabacoo use in/around your household ?</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?if($res20['tobaccouse']==1)echo "Yes";else echo "No";?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <? $resVal1 = getTableValBySessionId('parentcontact','customerId','id');
                          if(!empty($resVal1)){
                            foreach ($resVal1 as $key => $res21) { ?>
                            <div class="item-title">Contact Information for Parent</div>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Name</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res21['parentname']?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Email</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res21['email']?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Home address</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res21['address']?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Home Phone</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?if($res21['homephone']==1)echo "Yes";else echo "No";?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Work Phone</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?if($res21['workphone']==1)echo "Yes";else echo "No";?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Cell/Other</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res21['cell'];?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                    <?  }
                          }
                        }  
                      }else{
                        echo "<tr><td colspan='4'>No Records Found !!!</td></tr>";
                      } $i++;?>
                  </div>
                </li>
                </ul>
              </div>
              <? } ?>
             <!-- ######################## Pediatrics Birth History #################################-->
                 <? if(isset($_REQUEST['PBH'])) {?>
              <div class="list-block accordion-list" style="display: inline-block;width: 93%;"> 
              <ul>     
                <li class="accordion-item">
                  <a href="" class="item-link item-content">
                    <div class="item-inner">
                        <div class="item-title">Pediatrics Birth History</div>
                    </div>
                  </a>
                  <div id="collapse<?=$i?>" class="accordion-item-content">
                    <? $resVal = getTableValBySessionId('birthhistory','customerId','id');
                      if(!empty($resVal)){
                        foreach ($resVal as $key => $res20) { ?>
                    <div class="list-block">
                      <ul style="background-color: white">
                      <div class="item-title"><?="Birth History of ".getValue('childname','pediatricschild',$res20['childid'])?></div>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Place of Birth of your Child ?</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res20['placeofbirth'];?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Any Induced Labor ?</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?if($res20['induceddlabor']==1)echo "Yes";else echo "No";?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Duration of Labor</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res20['duration'];?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Gestation period of pregnancy</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res20['gestationperiod']?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Method of Delivery</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?if($res20['methodOfDelivery']==0)echo "Breech";else if($res20['methodOfDelivery']==1) echo "Caesarean";else if($res20['methodOfDelivery']==2) echo "Forceps";else echo "Spontaneous Vaginal";?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Child's birth weight</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res20['birthweight'];?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Apgar Score (if Known)</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res20['apgarscore']?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <div class="item-title">During the hospital stay, did your child have any of the following ?</div>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Anti-biotic treatment</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?if($res20['Antibiotic']==1)echo "Yes";else echo "No";?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Blue spells</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?if($res20['bluespells']==1)echo "Yes";else echo "No";?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Convulsions</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?if($res20['convulsions']==1)echo "Yes";else echo "No";?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Jaundice</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?if($res20['jaundice']==1)echo "Yes";else echo "No";?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Skin Rash</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?if($res20['skinrash']==1)echo "Yes";else echo "No";?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Did child remain in hospital longer than mother ?</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="?if($res20['hospitallonger']==1)echo "Yes";else echo "No";?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">How was/is baby fed ?</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?if($res20['babyfed']==1)echo "Bottle";else echo "Breast";?>" readonly/>
                              </div>
                          </div>
                        </div>
                    </ul>
                  </div>
                    <? }  
                      }else{
                        echo "<tr><td colspan='4'>No Records Found !!!</td></tr>";
                      } $i++;?>
                  </div>
                </li>
                </ul>
              </div>
              <? } ?>
              <!-- ######################## Pediatrics Development History #################################-->
                 <? if(isset($_REQUEST['PDH'])) {?>
              <div class="list-block accordion-list" style="display: inline-block;width: 93%;"> 
              <ul>     
                <li class="accordion-item">
                  <a href="" class="item-link item-content">
                    <div class="item-inner">
                        <div class="item-title">Pediatrics Birth History</div>
                    </div>
                  </a>
                  <div id="collapse<?=$i?>" class="accordion-item-content">
                    <? $resVal = getTableValBySessionId('Developmentlhistory','customerId','id');
                      if(!empty($resVal)){
                        foreach ($resVal as $key => $res20) { ?>
                    <div class="list-block">
                      <ul style="background-color: white">
                      <div class="item-title">Development Histroy of <?=getValue('childname','pediatricschild',$res20['childid'])?></div>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">At what Age did Child ?</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0"  readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Age</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0"  readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Hold up head</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res20['HoldUpHead']?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Roll over</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res20['RollOver'];?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Sit unsupported</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res20['sitUnsupported']?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Stand alone</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res20['standAlone'];?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Walk</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res20['walk']?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Talk</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res20['talk'];?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Toilet Train</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res20['feedhim']?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Feed him/herself</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res20['toilettrain']?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-title_inner">
                          <div class="item-inner">
                            <div class="item-title label">Dress him/herself</div>
                              <div class="item-input" >
                                <input type="text" name="user_phar_number" id="user_phar_number_0" value="<?=$res20['dresshim']?>" readonly/>
                              </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                    <? }  
                      }else{
                        echo "<tr><td colspan='4'>No Records Found !!!</td></tr>";
                      } $i++;?>
                  </div>
                </li>
                </ul>
              </div>
              <? } ?>
            </div>
          </div>
        </div>
      </div>
    </div>
   
    