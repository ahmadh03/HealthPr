<?php

//include_once('testing/common.php');
include_once('../../newsite/common.php');

extract( $_GET );
$userId = $_POST['immunization_image_id'];
if(!empty($_FILES["immunization_image"]["name"]))
{
$extension = pathinfo($_FILES["immunization_image"]["name"], PATHINFO_EXTENSION);
$fileName = $userId.'_immunizations.'.$extension;

move_uploaded_file($_FILES["immunization_image"]["tmp_name"], "../../newsite/images/immunizations/".$fileName);

$sql = "UPDATE `immunizations` SET `image` ='".$fileName ."'  WHERE `immunizations_id` = '".$userId."'";
$qry = mysql_query($sql);

}

?>