<?php


include "logic/simpleLogic.php";

$logic = new simpleLogic();
$param = "";
$method = "";



/*
 *checks if ajax call with post is send
 * if so decode sent json object
 * depending if title etc or votename or Id is set call different functions
 * Name etc set -> insertAppointment
 * VoteName set -> insertVotes
 * Id set -> deleteAppointment
 *
 * sets param and method to needed values for handleRequest
 * if appointments need to be inserted call handlereuqest for all apoptions except last one cause last one will be called afterwards anyway
 */
if (!empty($_POST)) {
    $jsonObj = json_decode(file_get_contents('php://input'));
    switch ($jsonObj->func) {
        case "InsertShow":
        {
            $valid = true;

            $date = $jsonObj->date;
            $title = $jsonObj->title;
            $link = $jsonObj->link;
            $method = "InsertShow";
            $param = new Show($date, $title, $link);
            break;
        }
        case "DeleteShow":
        {
            $param = $jsonObj->id;
            $method = "DeleteShow";
            break;
        }
    }

}


//check if get param and methos is set
isset($_GET["method"]) ? $method = $_GET["method"] : false;
isset($_GET["param"]) ? $param = $_GET["param"] : false;


//execute handlerequest with method and param -> got set by post ajax call or get ajax call
$result = $logic->handleRequest($method, $param);
//var_dump($result);
//Send response if result is not null
if ($result == null) {
    response($_SERVER['REQUEST_METHOD'], 400, null);
} else {
    response($_SERVER['REQUEST_METHOD'], 200, $result);
}

//depending on method -> GET OR POST
// json encode or decode or if not one of those two -> error

function response($method, $httpStatus, $data)
{
    header('Content-Type: application/json');
    switch ($method) {
        case  "GET":
            http_response_code($httpStatus);
            echo(json_encode($data));
            break;
        case "POST":
            http_response_code($httpStatus);
            echo(json_decode($data));
            break;
        default:
            http_response_code(405);
            echo "Method not supported yet";
    }
}



