<?php




$app->post('/mathima', function($request, $response) use ($diy_storage, $diy_restapi){



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
	$content = '<table><tr><td>ΙΔΡΥΜΑ</td><td>ΣΧΟΛΗ</td><td>ΜΑΘΗΜΑ</td><td>ΤΕΧΝΟΛΟΓΙΑ</td><td>URL</td><tr>';
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
		$content .= "<tr><td>".$dget["idrima"];
		$stmt->bindValue(':sxolh', $dget["sxolh"]);
		$content .= "</td><td>";
		$content .= $dget["sxolh"];
		$content .= "</td>";
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
						$contentellakm = "<td>";
						$contentellakm .= $dget["ellak"][$i]["mathima"];
						$contentellakm .= "</td>";
					}
					if($dget["ellak"][$i]["tech"] != ''){
						$stmt1->bindValue(':ellak', $dget["ellak"][$i]["tech"]);
						$contentellakt = "<td>";
						$contentellakt .= $dget["ellak"][$i]["tech"];
						$contentellakt .= "</td>";
					}
					elseif($dget["ellak"][$i]["url"] != ''){
						$stmt1->bindValue(':ellakurl', $dget["ellak"][$i]["url"]);
						$contentellaku = "<td>";
						$contentellaku .= $dget["ellak"][$i]["url"];
						$contentellaku .= "</td>";
						$contentellaku .= "</tr>";
					}
				if($i == $ii){
					$content .= $contentellakm;
					$content .= $contentellakt;
					$content .= $contentellaku;
					$content .= '<td></td><td></td>';
					$contentellakm='';
					$contentellakt='';
					$contentellaku='';
					$stmt1->execute();
					$ii = $ii + 2;
				}
			}
	$content .= '</table>';;	

	//result_messages===============================================================      
   	$restapi = $diy_restapi();
   	$restapitmp = $restapi['restapi'];
   	$restapipoint = $restapi['endpoint'];
	//$rest['content'] = $dget; 
	//$rest['content'] = 'test test 1'; 
	//$rest['title'] = 'my titlos 1'; 
	//$rest['status'] = 'publish'; 
	//$data_json =  json_decode( $rest );
	$data_json =  '{ "title": "Ερωτηματολόγιο για το ανοιχτό λογισμικό", "content": "'.$content.'", "status":"publish" }';
	//$exec = 'curl --header "Authorization: Basic YWRtaW46U1VhSCB3NFBsIFhadVcgeTBFNyBpNjFaIFhxQ0Y=" -H "Content-Type: application/json" -X post   -i http://wp/wp-json/wp/v2/posts -d '."'".$data_json."'";
	$exec = 'curl --header "Authorization: Basic '.$restapitmp.'" -H "Content-Type: application/json" -X post -k  -i '.$restapipoint.' -d '."'".$data_json."'";
	exec($exec);
/*
	$restheaders = array(
	    'Content-Type: application/json;charset=utf-8',
    	    "Cache-Control: no-cache",
            "Pragma: no-cache" 
	);
	    //"Authorization: Basic " . "YWRtaW46U1VhSCB3NFBsIFhadVcgeTBFNyBpNjFaIFhxQ0Y="
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, "http://wp/wp-json/wp/v2/posts ");
	curl_setopt($ch, CURLOPT_HTTPHEADER, $restheaders);
	curl_setopt($ch, CURLOPT_POST, 1);
	curl_setopt($ch, CURLOPT_TIMEOUT, 60); 
	curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0); 
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); 
	curl_setopt($ch, CURLOPT_POSTFIELDS,$data_json);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	$restresponse  = curl_exec($ch);
	curl_close($ch	);

    $err     = curl_errno($ch);
    $errmsg  = curl_error($ch) ; 
*/
        $result["result"]=  $q;
        //$result["dget"]=  $dget;
        //$result["dgettmp"]=  $restresponse;
        //$result["dgettmp1"]=  $exec;
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
