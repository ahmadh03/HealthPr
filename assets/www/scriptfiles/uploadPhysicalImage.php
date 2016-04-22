<?php

//include_once('testing/common.php');
include_once('../../newsite/common.php');

extract( $_GET );
$userId = $_POST['phy_exam_image_id'];
if(!empty($_FILES["phy_exam_image"]["name"]))
{
echo $extension = pathinfo($_FILES["phy_exam_image"]["name"], PATHINFO_EXTENSION);
echo $fileName = $userId.'_phy.'.$extension;

move_uploaded_file($_FILES["phy_exam_image"]["tmp_name"], "../../newsite/images/physicalexamsvitals/".$fileName);

$sql = "UPDATE `physicalexams` SET `image` ='".$fileName ."'  WHERE `customerId` = '".$userId."'";
$qry = mysql_query($sql);

}

?>