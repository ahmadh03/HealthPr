<?php

//include_once('testing/common.php');
include_once('../../newsite/common.php');

extract( $_GET );
$userId = $_POST['medi_his_pic_id'];

echo $extension = pathinfo($_FILES["medi_his_pic"]["name"], PATHINFO_EXTENSION);
echo $fileName = $userId.'_emer.'.$extension;

move_uploaded_file($_FILES["medi_his_pic"]["tmp_name"], "../../newsite/images/emergencycontact/".$fileName);

$sql = "UPDATE `surgeries` SET `image` ='".$fileName ."'  WHERE `user_id` = '".$userId."'";
$qry = mysql_query($sql);



?>