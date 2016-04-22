<?
	include_once('../../newsite/common.php'); 
	error_reporting(0);
	/*echo '<pre>';
	print_r($_REQUEST);
	echo '</pre>';*/
	if(isset($_REQUEST['update']) && $_REQUEST['update']=="Update")
	{
		$where = array(
						'customerId'=> $_REQUEST['uid']
					);
		_deleteRecord( 'usersections',$where );

		foreach ($_REQUEST['sectionpref'] as $key => $sectionId) {
			$data = array(
							'customerId'=> $_REQUEST['uid'],
							'sectionId'=>$sectionId
						);
			
			_insertRecord( 'usersections',$data );
		}
	}
?>