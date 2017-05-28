<?php




$app->get('/mathima', function($request, $response) use ($diy_storage){



    global $app;
    $result["controller"] = __FUNCTION__;

	$headers = $request->getHeaders();
	foreach ($headers as $name => $values) {
	    //echo $name . ": " . implode(", ", $values);
	    $dget[".$name."]=$values;
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
   $unisxolh = $allGetVars['unisxolh'];
   $institution = $allGetVars['institution'];
	    $dget["unisxolh"]=$unisxolh;
	    $dget["institution"]=$institution;
   $storage = $diy_storage();
    try {
	$g =" SELECT a.* FROM data AS a where a.department='$unisxolh' and a.institution='$institution'";
     
        $stmt = $storage->prepare($g);
        $stmt->execute();
	$row = $stmt->fetch(PDO::FETCH_ASSOC);
        $nr=0;
                foreach ($stmt as $row) {
                        //$q["data"][$nr]["id"]= $row[$nr];
                        $q["data"][$nr]["id"]= $row["minedu_id"];
                        $q["data"][$nr]["department"]= $row["department"];
                        $q["data"][$nr]["institution"]= $row["institution"];
                        $q["data"][$nr]["lesson"]= $row["lesson"];
                        $nr++;
                }

	//result_messages===============================================================      
        $result["result"]=  $q;
        $result["dget"]=  $dget;
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
