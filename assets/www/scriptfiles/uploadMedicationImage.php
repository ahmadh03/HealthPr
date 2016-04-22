<?php

//include_once('testing/common.php');
include_once('../../newsite/common.php');

extract( $_GET );
$userId = $_POST['medi_image_id'];
if(!empty($_FILES["medi_image"]["name"]))
{

$extension = pathinfo($_FILES["medi_image"]["name"], PATHINFO_EXTENSION);
$fileName = $userId.'_medi.'.$extension;

move_uploaded_file($_FILES["medi_image"]["tmp_name"], "../../newsite/images/medication/".$fileName);

$sql = "UPDATE `medications` SET `image` ='".$fileName ."'  WHERE `id` = '".$userId."'";
$qry = mysql_query($sql);

}

?>