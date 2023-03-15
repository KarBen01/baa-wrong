<?php
define('ROOT_PATH', realpath(dirname(__DIR__)) . '/');
include(ROOT_PATH.'models/Show.php');




class DB
{
    private $host;
    private $user;
    private $password;
    private $database;
    private $connect;



    function __construct()
    {

        $this->host = 'mysqlsvr77.world4you.com';
        $this->user = 'sql5616139';
        $this->password = 'v2aur+72';
        $this->database = '5289407db1';

/*
        $this->host = 'localhost';
        $this->user = 'root';
        $this->password = '';
        $this->database = '5289407db1';
*/

        $this->connect = new mysqli($this->host, $this->user, $this->password, $this->database);
        $this->connect->set_charset("utf8");
        if ($this->connect->connect_error) { return 'error'; }
    }


    function FetchShows()
    {
 //WHERE DATE(date) >= CURDATE()

        $shows = array();
        $result = $this->connect->query("SELECT * FROM shows ORDER BY DATE(date) asc");

        while ($data = $result->fetch_assoc()) {
            $tempShow = new Show($data["date"], $data["title"], $data["link"]);
            $tempShow->setId($data["id"]);
            $shows[] = $tempShow;
        }
        if(empty($shows)){
            return "No Data";
        }
        return $shows;
    }


    function InsertShow($show)
    {
        $sql = "INSERT INTO shows (date, title, link) VALUES (?,?,?);";
        $stmt = $this->connect->prepare($sql);
        $date = $show->getDate();
        $title = $show->getTitle();
        $link = $show->getLink();

        $stmt->bind_param("sss", $date, $title, $link);
        $stmt->execute();
        return $stmt->insert_id;
    }


    function DeleteShow($id)
    {
        $sql = "DELETE FROM shows WHERE ID = ?;";
        $stmt = $this->connect->prepare($sql);
        $stmt->bind_param("i", $id);
        return $stmt->execute();
    }
}