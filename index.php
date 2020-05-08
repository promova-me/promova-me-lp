<?php
if(isset($_GET['src'])){
    $cookie_name = "src";
    $cookie_value = $_GET['src'];
    setcookie($cookie_name, $cookie_value, time() + (86400 * 30), "/");
}

require('landing/layout.php');
