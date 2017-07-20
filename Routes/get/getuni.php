<?php




$app->get('/uni', function($request, $response) use ($diy_storage){
    global $app;
    $result["controller"] = __FUNCTION__;
   $storage = $diy_storage();
    try {
	$g =" SELECT a.*";
	$g .=" FROM data AS a";
	$g .=" WHERE a.institution <>";
	$g .="    ( SELECT b.institution*";
	$g .="    FROM data AS b";
	//$g .="    WHERE a.minedu_id = b.minedu_id";
	$g .="   )";
	$g =" SELECT a.* FROM data AS a group by a.institution";
	//$g =" SELECT a.* FROM data AS a WHERE a.minedu_id <> ( SELECT b.minedu_id FROM data AS b where a.institution <> b.institution ) group by a.minedu_id";
        $stmt = $storage->prepare($g);
        $stmt->execute();
	//$row = $stmt->fetch(PDO::FETCH_ASSOC);
        $nr=0;
	while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                //foreach ($stmt as $row) {
                        $q["data"][$nr]["id"]= $row["minedu_id"];
                        $q["data"][$nr]["name"]= $row["institution"];
                        $nr++;
                }
	//result_messages===============================================================      
        $result["result"]=  $q;
        $result["status"] = "200";
        $result["message"] = "NoErrors";
    } catch (Exception $e) {
        $result["status"] = $e->getCode();
        $result["message"] = $e->getMessage();
    }
     $response->withHeader('Content-Type', 'application/json;charset=utf-8');
     $response->getBody()->write( toGreek( json_encode( $result ) ) );
     return $response;
});
