<?php




$app->get('/department', function($request, $response) use ($diy_storage){



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
   $department = $allGetVars['department'];
	    $dget["department"]=$department;
   $storage = $diy_storage();
    try {
	$g =" SELECT a.* FROM data AS a where a.institution='$department'   group by a.department";
     
        $stmt = $storage->prepare($g);
        $stmt->execute();
        $nr=0;
	while($row = $stmt->fetch(PDO::FETCH_ASSOC)) { 
	//$row = $stmt->fetch(PDO::FETCH_ASSOC);
                //foreach ($stmt as $row) {
                        //$q["data"][$nr]["id"]= $row[$nr];
                        $q["data"][$nr]["id"]= $row["minedu_id"];
                        $q["data"][$nr]["department"]= $row["department"];
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
