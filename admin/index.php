<?php

session_start();


$username = 'admin';
$password = '1234';
if (isset($_POST["login"])) {
    $loginUsername = $_POST["username"];
    $loginPassword = $_POST["password"];


    if ($loginUsername == $username && $loginPassword == $password) {
        $_SESSION["user"] = $username;
    } else {
        echo "Ungültiges Passwort";
    }
    echo "<script>window.location.href='index.php';</script>";
}

if (isset($_POST["logout"])) {
    unset($_SESSION["user"]);
    session_destroy();
    echo "<script>window.location.href='index.php';</script>";
}
?>
<!DOCTYPE html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <title>Benni | Admin</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
          integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css">

    <script src="https://kit.fontawesome.com/259afa04ac.js" crossorigin="anonymous"></script>

    <link rel="stylesheet" type="text/css" href="../CSS/Style.css">
</head>
<body id="admin-body" class="bg-white">
<?php
if (isset($_SESSION["user"])) {
    ?>
    <nav class="navbar sticky-top navbar-expand-md navbar-dark bg-dark">
        <div class="container-fluid">
            <a class="navbar-brand" href="index.php">Administration | Benni</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mb-2 mb-md-0">
                    <li class="nav-item">
                        <a class="nav-link <?php  if(!isset($_GET["site"])){ echo 'active';} ?>" href="index.php">Shows</a>
                    </li>
                </ul>
                <form action="index.php" method="post">
                    <button class="btn" style="color: #737373" type="submit" name="logout"><i class="fas fa-sign-out"></i></button>
                </form>
            </div>
        </div>
    </nav>
    <?php
        include "termine.html";
}
else {

    ?>
    <div class="container-fluid vh-100">
        <div class="d-flex h-100">
            <div class="my-auto w-100">
                <div class="rounded d-flex justify-content-center">
                    <div class="col-md-4 col-sm-12 shadow-lg p-5 bg-light">
                        <div class="text-center">
                            <h3 class="text-primary">Sign In</h3>
                        </div>
                        <form method="post" class="needs-validation" novalidate>
                            <div class="p-4">
                                <div class="input-group mb-3">
                                    <span class="input-group-text bg-primary"><i
                                            class="bi bi-person-plus-fill text-white"></i></span>
                                    <input type="text" class="form-control" placeholder="Username" name="username">
                                </div>
                                <div class="input-group mb-3">
                                    <span class="input-group-text bg-primary"><i
                                            class="bi bi-key-fill text-white"></i></span>
                                    <input type="password" class="form-control" placeholder="password" name="password">
                                </div>
                                <div class="d-grid">
                                    <button type="submit" name="login"
                                            class="btn btn-primary">Log in
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
<?php } ?>
<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
<?php
if(isset($_SESSION["user"])){
    ?>
    <script src="./Script.js"></script>
    <?php
}
?>
</body>
</html>
