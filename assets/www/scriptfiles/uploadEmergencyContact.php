<?php

//include_once('testing/common.php');
include_once('../../newsite/common.php');

extract( $_GET );
$userId = $_POST['emer_con_image_id'];
if(!empty($_FILES["emer_con_image"]["name"]))
{

$extension = pathinfo($_FILES["emer_con_image"]["name"], PATHINFO_EXTENSION);
$fileName = $userId.'_emer.'.$extension;

move_uploaded_file($_FILES["emer_con_image"]["tmp_name"], "../../newsite/images/emergencycontact/".$fileName);

$sql = "UPDATE `emergency_contacts` SET `image` ='".$fileName ."'  WHERE `contact_id` = '".$userId."'";
$qry = mysql_query($sql);

}

?>