<?php
//include_once('testing/common.php');
include_once('../../testing/common.php');

extract( $_GET );
$userId = $_POST['birth_id'];

 $extension = pathinfo($_FILES["birth_cir"]["name"], PATHINFO_EXTENSION);

 $fileName = $userId.'_user.'.$extension;




move_uploaded_file($_FILES["birth_cir"]["tmp_name"], "testing/images/dateofbirth/".$fileName);

$sql = "UPDATE `user_profile` SET `dobimage` ='".$fileName ."'  WHERE `user_id` = '".$userId."'";
$qry = mysql_query($sql);
?>