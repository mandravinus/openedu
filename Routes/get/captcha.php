<?php




$app->get('/captcha', function($request, $response) use ($diy_storage){
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

        $code =  $allGetVars['code'];
   $storage = $diy_storage();
	//result_messages===============================================================      
        session_start();


        if( strtolower($code) == strtolower($_SESSION['random_number']))
        {


              $q=1; 

        }
        else
        {
              $q=0; 
        }

        $result["result"]=  $q;
        $result["status"] = "200";
        $result["status1"] = $_SESSION['random_number'];
        $result["status2"] = $code;
        $result["message"] = "NoErrors";
     $response->withHeader('Content-Type', 'application/json;charset=utf-8');
     $response->getBody()->write( toGreek( json_encode( $result ) ) );
     return $response;
});
