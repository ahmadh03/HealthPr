<?php
   include_once('../../../newsite/common.php');
    error_reporting(0); 
    $output_dir = "../../../newsite/uploads/";

    /*echo "<pre>";
    print_r($_FILES);
    print_r($_REQUEST);
    echo "</pre>";*/

    if(isset($_REQUEST['albumid_up']) && isset($_REQUEST['uid_up']))
    {
        $_REQUEST['albumid'] = $_REQUEST['albumid_up'];
        $_REQUEST['uid'] = $_REQUEST['uid_up'];
    }

    // Insert the FIle Browse Image with Album Id = 100
    if(isset($_FILES["myfile"]))
    {
        $ret = array();
        $error =$_FILES["myfile"]["error"];
        {
            if(!is_array($_FILES["myfile"]['name'])) //single file
            {
                $RandomNum   = time();
                $ImageName      = str_replace(' ','-',strtolower($_FILES['myfile']['name']));
                
                $ImageType      = $_FILES['myfile']['type']; //"image/png", image/jpeg etc.
                $ImageExt = substr($ImageName, strrpos($ImageName, '.'));
                $ImageExt       = str_replace('.','',$ImageExt);
                $ImageName      = preg_replace("/\.[^.\s]{3,4}$/", "", $ImageName);
                $NewImageName = $ImageName.'-'.$RandomNum.'.'.$ImageExt;

                if($ImageExt == 'mp4' || $ImageExt == 'flv'){
                    $sql='INSERT INTO `scanneditems`(`albumid`,`userid`,`image`, `isVideo`, `active`)
                            VALUES("'.$_REQUEST['albumid'].'","'.$_REQUEST['uid'].'","'.$NewImageName.'", "1" , "1")';
                }else{                    
                    $sql='INSERT INTO `scanneditems`(`albumid`,`userid`,`image`, `active`)
                            VALUES("'.$_REQUEST['albumid'].'","'.$_REQUEST['uid'].'","'.$NewImageName.'",1)';
                }
                $qry=mysql_query($sql);

                move_uploaded_file($_FILES["myfile"]["tmp_name"],$output_dir. $NewImageName);
                //echo "<br> Error: ".$_FILES["myfile"]["error"];
                
                $ret[$fileName]= $output_dir.$NewImageName;

            }else{

                $fileCount = count($_FILES["myfile"]['name']);
                for($i=0; $i < $fileCount; $i++)
                {
                    $RandomNum   = time();
                    $ImageName      = str_replace(' ','-',strtolower($_FILES['myfile']['name'][$i]));
                    $ImageType      = $_FILES['myfile']['type'][$i]; //"image/png", image/jpeg etc.
                    $ImageExt = substr($ImageName, strrpos($ImageName, '.'));
                    $ImageExt       = str_replace('.','',$ImageExt);
                    $ImageName      = preg_replace("/\.[^.\s]{3,4}$/", "", $ImageName);
                    $NewImageName = $ImageName.'-'.$RandomNum.'.'.$ImageExt;

                    if($ImageExt == 'mp4' || $ImageExt == 'flv'){
                        $sql='INSERT INTO `scanneditems`(`albumid`,`userid`,`image`, `isVideo`, `active`)
                                VALUES("'.$_REQUEST['albumid'].'","'.$_REQUEST['uid'].'","'.$NewImageName.'", "1" , "1")';                        
                    }else{
                        $sql='INSERT INTO `scanneditems`(`albumid`,`userid`,`image`, `active`)
                                VALUES("'.$_REQUEST['albumid'].'","'.$_REQUEST['uid'].'","'.$NewImageName.'",1)';
                    }
                    $qry=mysql_query($sql);

                    $ret[$NewImageName]= $output_dir.$NewImageName;

                    move_uploaded_file($_FILES["myfile"]["tmp_name"][$i],$output_dir.$NewImageName );

                }
            }
        }
    }

    // Insert the Camera Upload Canvas Image with Album Id = 100
    if (array_key_exists('img',$_REQUEST)) 
    {
        $imagename = '';
        // echo $_REQUEST['img'];
        // decode the base64-encoded image received
        // drop the first 22 characters from the string received,
        // (having the substring "data:image/png;base64,")
        $imgData = base64_decode(substr($_REQUEST['img'],22));


        // Path where the image is going to be saved
        $random = time();
        $imagename = "Camera-".$random.".png";
        $file = $output_dir.$imagename;

        // delete previously uploaded image with the same path
        if (file_exists($file)) 
        { 
            unlink($file); 
        }

        // write $imgData into the file
        $fp = fopen($file, 'w');
        fwrite($fp, $imgData);
        fclose($fp);

        $sql='INSERT INTO `scanneditems`(`albumid`,`userid`,`image`, `active`)
                            VALUES("'.$_REQUEST['albumid'].'","'.$_REQUEST['uid'].'","'.$imagename.'",1)';

        $query = mysql_query($sql);
    }

    // Inserting the Scanned Category Album and Deleting all the Scanned Item AlbumId = 100  
    if(isset($_REQUEST['submit']) && $_REQUEST['submit']=="Insert")
    {
        
        $sql='INSERT INTO `scannedalbums` (`title`, `customerId`, `categoryId`)VALUES ("'.$_REQUEST['title'].'","'.$_REQUEST['uid'].'", "'.$_REQUEST['catid'].'")';
        $qry=mysql_query($sql);
        
        $id=mysql_insert_id();

        $sql2='UPDATE `scanneditems` SET 
                                `albumid`   = '.$id.'       
                                WHERE albumid=100 and userid='.$_REQUEST['uid'];
        mysql_query($sql2);
        
       
    }

    // Deleting the Scanned Items if the Album is not Inserted.
    if(!isset($_REQUEST['submit']))
    {
        $sql="DELETE FROM scanneditems WHERE albumid=100 and userid=$_REQUEST[uid]";
        
        $del=mysql_query($sql);
    }
?>