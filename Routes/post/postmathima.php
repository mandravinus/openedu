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
	foreach($data as $key => $param){
	   //GET parameters list
	}

	//POST or PUT
	$allPostPutVars = $request->getParsedBody();
	foreach($allPostPutVars as $key => $param){
	   //POST or PUT parameters list
	    $dgettmp["$key"]=$param;
	}
   	$datatmp = $allPostPutVars['data'];
	$data = json_decode($datatmp, true);
	foreach($data as $key => $param){
	   //POST or PUT parameters list
	    $dget[$key]=$param;
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
CREATE TABLE datamathima(
  "id" INTEGER PRIMARY KEY,
  "mathima" TEXT,
  "ellak" TEXT,
  "ellakurl" TEXT
);
CREATE TABLE datameta(
  "id" INTEGER PRIMARY KEY,
  "metamathima" TEXT,
  "ellak" TEXT,
  "ellakurl" TEXT
);
*/

   $storage = $diy_storage();
    try {
 		$g = 'INSERT INTO dataellak ( "onoma", "epitheto", "email", "eidikotita", "ergastirio", "ergastirioonoma", "ergastiriodrastiriotita", "ergastirioperigrafi", "ergastirioypefthinos", "ergastiriourl", "meta", "metatitlos", "idrima", "sxolh" ) VALUES ( :onoma, :epitheto, :email, :eidikotita, :ergastirio, :ergastirioonoma, :ergastiriodrastiriotita, :ergastirioperigrafi, :ergastirioypefthinos, :ergastiriourl, :meta, :metatitlos, :idrima, :sxolh)';
		$tmp = $data['eidikotita'];
        	$stmt = $storage->prepare($g);
		$stmt->bindValue(':onoma', $dget["onoma"]);
		$stmt->bindValue(':epitheto', $dget["epitheto"]);
		$stmt->bindValue(':email', $dget["email"]);
		$stmt->bindValue(':eidikotita', $dget["eidikotita"]);
		$stmt->bindValue(':ergastirio', $dget["ergastirio"]);
		$stmt->bindValue(':ergastirioonoma', $dget["ergastirioonoma"]);
		$stmt->bindValue(':ergastiriodrastiriotita', $dget["ergastiriodrastiriotita"]);
		$stmt->bindValue(':ergastirioperigrafi', $dget["ergastirioperigrafi"]);
		$stmt->bindValue(':ergastirioypefthinos', $dget["ergastirioypefthinos"]);
		$stmt->bindValue(':ergastiriourl', $dget["ergastiriourl"]);
		$stmt->bindValue(':meta', $dget["meta"]);
		$stmt->bindValue(':metatitlos', $dget["metatitlos"]);
		$stmt->bindValue(':idrima', $dget["idrima"]);
		$stmt->bindValue(':sxolh', $dget["sxolh"]);
        	$stmt->execute();

        	$lastid = $storage->lastInsertId();
		if($data['eidikotita'] == 'didaktiko' || $data['eidikotita'] == 'fititis' || $data['eidikotita'] == 'ergastiriako'){
			$g1 = 'INSERT INTO datamathima ( "id", "mathima", "ellak", "ellakurl" ) VALUES ( :lastid, :mathima, :ellak, :ellakurl)';
		}elseif($data['eidikotita'] == 'meta'){
                        $g1 = 'INSERT INTO datameta ( "id", "metamathima", "ellak", "ellakurl" ) VALUES ( :lastid, :mathima, :ellak, :ellakurl)';
		}elseif($data['eidikotita'] == 'dioikitiko'){
                        $g1 = 'INSERT INTO datadioikitiko ( "id", "mathima", "ellak", "ellakurl" ) VALUES ( :lastid, :mathima, :ellak, :ellakurl)';
		}
			$arr_length = count($dget["ellak"]);
			$stmt1 = $storage->prepare($g1);
			$ii=1;
			for($i=0;$i<$arr_length;$i++) {
					$stmt1->bindValue(':lastid', $lastid);
					if($data['eidikotita'] == 'dioikitiko'){
						$stmt1->bindValue(':mathima', '');
					}else{
						$stmt1->bindValue(':mathima', $dget["ellak"][$i]["mathima"]);
					}
					if($dget["ellak"][$i]["tech"] != '')
						$stmt1->bindValue(':ellak', $dget["ellak"][$i]["tech"]);
					if($dget["ellak"][$i]["url"] != '')
						$stmt1->bindValue(':ellakurl', $dget["ellak"][$i]["url"]);
				if($i == $ii){
					$stmt1->execute();
					$ii = $ii + 2;
				}
			}
		

	//result_messages===============================================================      
        $result["result"]=  $q;
        $result["dget"]=  $dget;
        $result["dgettmp"]=  $dgettmp["test"];
        $result["dgettmp1"]=  $arr_length;
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
