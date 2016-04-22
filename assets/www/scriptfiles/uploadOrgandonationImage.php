<?php

//include_once('testing/common.php');
include_once('../../newsite/common.php');

extract( $_GET );
$userId = $_POST['organ_don_image_id'];
if(!empty($_FILES["organ_don_image"]["name"]))
{
$extension = pathinfo($_FILES["organ_don_image"]["name"], PATHINFO_EXTENSION);
$fileName = $userId.'_donor.'.$extension;

move_uploaded_file($_FILES["organ_don_image"]["tmp_name"], "../../newsite/images/donor/".$fileName);

$sql = "UPDATE `organdonor` SET `image` ='".$fileName ."'  WHERE `id` = '".$userId."'";
$qry = mysql_query($sql);

}

?>