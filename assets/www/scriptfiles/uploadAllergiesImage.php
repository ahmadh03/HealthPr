<?php

//include_once('testing/common.php');
include_once('../../newsite/common.php');

extract( $_GET );
$userId = $_POST['allergies_con_image_id'];
if(!empty($_FILES["allergies_con_image"]["name"]))
{
echo $extension = pathinfo($_FILES["allergies_con_image"]["name"], PATHINFO_EXTENSION);
echo $fileName = $userId.'_allergies.'.$extension;

move_uploaded_file($_FILES["allergies_con_image"]["tmp_name"], "../../newsite/images/allergies/".$fileName);

$sql = "UPDATE `allergies` SET `image` ='".$fileName ."'  WHERE `id` = '".$userId."'";
$qry = mysql_query($sql);

}

?>