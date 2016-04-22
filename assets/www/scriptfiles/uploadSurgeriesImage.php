<?php

//include_once('testing/common.php');
include_once('../../newsite/common.php');

extract( $_GET );
$userId = $_POST['sur_upload_image_id'];
if(!empty($_FILES["sur_upload_image"]["name"]))
{
$extension = pathinfo($_FILES["sur_upload_image"]["name"], PATHINFO_EXTENSION);
$fileName = $userId.'_emer.'.$extension;

move_uploaded_file($_FILES["sur_upload_image"]["tmp_name"], "../../newsite/images/surgeries/".$fileName);

$sql = "UPDATE `surgeries` SET `image` ='".$fileName ."'  WHERE `id` = '".$userId."'";
$qry = mysql_query($sql);

}

?>