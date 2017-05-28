<?php




$app->post('/mathima', function($request, $response) use ($diy_storage){



    global $app;
    $result["controller"] = __FUNCTION__;

	$headers = $request->getHeaders();
	foreach ($headers as $name => $values) {
	    //echo $name . ": " . implode(", ", $values);
	    //$dget[".$name."]=$values;
	}
	//GET
	$allGetVars = $request->getQueryParams();
	foreach($allGetVars as $key => $param){
	   //GET parameters list
	}

	//POST or PUT
	$allPostPutVars = $request->getParsedBody();
	foreach($allPostPutVars as $key => $param){
	   //POST or PUT parameters list
	}
   $unisxolh = $allPostPutVars['unisxolh'];
   $department = $allPostPutVars['department'];
   $onoma = $allPostPutVars['onoma'];
   $epitheto = $allPostPutVars['epitheto'];
   $email = $allPostPutVars['email'];
   $etmimalession = $allPostPutVars['etmimalession'];
   $lesson = $etmimalession[0]["m"];
   $ellak = $etmimalession[0]["s"];
   $g='';
/*
   $dget["unisxolh"] = $allPostPutVars['unisxolh'];
   $dget["department"] = $allPostPutVars['department'];
   $dget["onoma"] = $allPostPutVars['onoma'];
   $dget["epitheto"] = $allPostPutVars['epitheto'];
   $dget["email"] = $allPostPutVars['email'];
   $dget["etmimalession"] = $allPostPutVars['etmimalession'];
*/
   $storage = $diy_storage();
    try {
		$g =" INSERT INTO lesson ('onoma', 'epitheto', 'email', 'institution', 'department','lesson', 'ellak') VALUES ( :onoma, :epitheto, :email, :unisxolh, :department, :lesson, :ellak) ";
        	$stmt = $storage->prepare($g);
	for ($i = 0; $i < count($etmimalession); $i++) {
   		$lesson = $etmimalession[$i]["m"];
   		$ellak = $etmimalession[$i]["s"];
		$stmt->bindValue(':onoma', $onoma);
		$stmt->bindValue(':epitheto', $epitheto);
		$stmt->bindValue(':email', $email);
		$stmt->bindValue(':unisxolh', $unisxolh);
		$stmt->bindValue(':department', $department);
		$stmt->bindValue(':lesson', $lesson);
		$stmt->bindValue(':ellak', $ellak);
        	$stmt->execute();

	}
     
	//result_messages===============================================================      
        $result["result"]=  $q;
        $result["dget"]=  $dget;
        //$result["g"]=  $g;
        $result["status"] = "200";
        $result["message"] = "NoErrors";
    } catch (Exception $e) {
        $result["status"] = $e->getCode();
        $result["message"] = $e->getMessage();
    }

     $response->withHeader('Content-Type', 'application/json;charset=utf-8');
     //$response->getBody()->write(json_encode($result));
     $response->getBody()->write( toGreek( json_encode( $result ) ) );
     //return $response->withJson();

     return $response;
});
