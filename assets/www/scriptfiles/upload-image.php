<?php

include_once('../../newsite/common.php');
//print_r($_REQUEST);
//die('EXIT');
$userId = $_POST['uid'];

if (array_key_exists('img',$_REQUEST) OR array_key_exists('textvalue',$_REQUEST))
{
    $imagename = '';
    // echo $_REQUEST['img'];
    if(array_key_exists('img',$_REQUEST))
    {
        // decode the base64-encoded image received
        // drop the first 22 characters from the string received,
        // (having the substring "data:image/png;base64,")
        $imgData = base64_decode(substr($_REQUEST['img'],22));

        // Path where the image is going to be saved
        $random = time();
        $imagename = $userId."_Draw_".$random.".png";
        $file = '../../newsite/uploads/sketch/'.$imagename;

        // delete previously uploaded image with the same path
        if (file_exists($file)) 
        { 
            unlink($file); 
        }

        // write $imgData into the file
        $fp = fopen($file, 'w');
        fwrite($fp, $imgData);
        fclose($fp);
    }

    $sql = "INSERT INTO `health_diaries`(`customerId`, `textvalue`, `image`) VALUES ('".$userId."', '".$_REQUEST['textvalue']."' , '".$imagename."')";

    $query = mysql_query($sql);
}
?>