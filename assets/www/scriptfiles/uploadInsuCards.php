<?php

//include_once('testing/common.php');
include_once('../../newsite/common.php');

extract( $_GET );
$userId = $_POST['health_insu_coinsucard_id'];

//if(!empty($_FILES["attachment"]["name"]))
//{

if(!empty($_FILES["health_insu_coinsucard"]["name"]))
{
$extension = pathinfo($_FILES["health_insu_coinsucard"]["name"], PATHINFO_EXTENSION);
$fileName = $userId.'_ins.'.$extension;

move_uploaded_file($_FILES["health_insu_coinsucard"]["tmp_name"], "../../newsite/images/insurancecard_b/".$fileName);

$sql = "UPDATE `health_insurance` SET `card1` ='".$fileName ."'  WHERE `insurance_id` = '".$userId."'";
$qry = mysql_query($sql);
}

if(!empty($_FILES["health_insu_coinsupolicy"]["name"]))
{
$extension1 = pathinfo($_FILES["health_insu_coinsupolicy"]["name"], PATHINFO_EXTENSION);
$fileName1 = $userId.'_ins1.'.$extension1;

move_uploaded_file($_FILES["health_insu_coinsupolicy"]["tmp_name"], "../../newsite/images/insurancecard_f/".$fileName1);

$sql1 = "UPDATE `health_insurance` SET `card2` ='".$fileName1 ."'  WHERE `insurance_id` = '".$userId."'";
$qry1 = mysql_query($sql1);
}

//}

?>