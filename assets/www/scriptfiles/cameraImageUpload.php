<?php
	print_r($_FILES);
    /*include_once('../../../erpksa/common.php');
    
	// include_once('../../../../hertz/common.php');
    error_reporting(0); 
    $output_dir = "../../../erpksa/upload/accident/";
	// $output_dir = "../../../../hertz/upload/accident/";

    

    $sql1 = "INSERT INTO `accident`(`plateNbr`, `customerName`, `mobile`, `email`, `datetime`) VALUES ('".$_REQUEST['plateno']."', '".$_REQUEST['name']."', '".$_REQUEST['mobile_no']."', '".$_REQUEST['email']."', '".date('Y-m-d H:i:s')."' )";
    $qry1 = mysql_query($sql1);
    $insert_ud = mysql_insert_id();
    
    if(isset($_FILES["myfile"]))
    {
        $error =$_FILES["myfile"]["error"];
        {
            if(!is_array($_FILES["myfile"]['name'])) //single file
            {
                $RandomNum   = rand(100,1000000);
                $ImageName      = str_replace(' ','-',strtolower($_FILES['myfile']['name']));
                
                $ImageType      = $_FILES['myfile']['type']; //"image/png", image/jpeg etc.
                $ImageExt = substr($ImageName, strrpos($ImageName, '.'));
                $ImageExt       = str_replace('.','',$ImageExt);
                $ImageName      = preg_replace("/\.[^.\s]{3,4}$/", "", $ImageName);
                $NewImageName = $insert_ud.'-'.$RandomNum.'.'.$ImageExt;
                    
                $sql = "INSERT INTO `accidentImages`(`accidentId`, `image`) VALUES ('".$insert_ud."', '".$NewImageName."')";
                
                $qry=mysql_query($sql);

                move_uploaded_file($_FILES["myfile"]["tmp_name"],$output_dir. $NewImageName);
                

            }else{
                
                $fileCount = count($_FILES["myfile"]['name']);
                for($i=0; $i <= $fileCount; $i++)
                {
                    $RandomNum   = rand(100,1000000);
                    $ImageName      = str_replace(' ','-',strtolower($_FILES['myfile']['name'][$i]));
                    $ImageType      = $_FILES['myfile']['type'][$i]; //"image/png", image/jpeg etc.
                    $ImageExt = substr($ImageName, strrpos($ImageName, '.'));
                    $ImageExt       = str_replace('.','',$ImageExt);
                    $ImageName      = preg_replace("/\.[^.\s]{3,4}$/", "", $ImageName);
                    $NewImageName = $insert_ud.'-'.$RandomNum.'.'.$ImageExt;

                    $sql = "INSERT INTO `accidentImages`(`accidentId`, `image`) VALUES ('".$insert_ud."', '".$NewImageName."')";
                    $qry=mysql_query($sql);

                    move_uploaded_file($_FILES["myfile"]["tmp_name"][$i],$output_dir.$NewImageName );

                }
            }
        }
    }*/
   
?>