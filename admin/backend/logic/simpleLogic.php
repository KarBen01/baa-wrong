<?php
include("./db/DB.php");

class simpleLogic
{
    private $db;

    /**
     * simpleLogicWeingut constructor.
     */
    public function __construct()
    {
        $this->db = new DB();
    }

    //gets called with method and params
    //executes chosen db class functions (sql statements)
    function handleRequest($method, $param) {
        switch ($method) {
            case "FetchShows":
            {
                $res = $this->db->FetchShows();
                break;
            }
            case "InsertShow":
            {
                $res = $this->db->InsertShow($param);
                break;
            }
            case "DeleteShow":{
                $res = $this->db->DeleteShow($param);
                break;
            }
            default: {
                $res = null;
                break;
            }
        }
        return $res;
    }
}