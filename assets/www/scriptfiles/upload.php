<?php

//include_once('testing/common.php');
include_once('../../newsite/common.php');

extract( $_GET );
//echo "<pre>";
//print_r($_FILES);
//echo "</pre>";

$userId = $_POST['attachment_id'];

//if(!empty($_FILES["attachment"]["name"]))
//{
   if(!empty($_FILES["attachment"]["name"]))
    {
        $extension = pathinfo($_FILES["attachment"]["name"], PATHINFO_EXTENSION);
        $fileName = $userId.'_user.'.$extension;
        
        move_uploaded_file($_FILES["attachment"]["tmp_name"], "../../newsite/images/user/".$fileName);

       echo $sql = "UPDATE `user_profile` SET `image` ='".$fileName ."'  WHERE `user_id` = '".$userId."'";
        $qry = mysql_query($sql);
    }

    if(!empty($_FILES["birth_cir"]["name"]))
    {
         $extension1 = pathinfo($_FILES["birth_cir"]["name"], PATHINFO_EXTENSION);
         $fileName1 = $userId.'_dob.'.$extension1;

         move_uploaded_file($_FILES["birth_cir"]["tmp_name"], "../../newsite/images/dateofbirth/".$fileName1);
        
      echo  $sql1 = "UPDATE `user_profile` SET `dobimage` ='".$fileName1 ."'  WHERE `user_id` = '".$userId."'";
        $qry1 = mysql_query($sql1);
    }    
//}
?>