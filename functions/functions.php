<?php
var_dump($_POST);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=promovam_db', 'promovam_admin', '@pR0mOv4M3#');
//    $pdo = new PDO('mysql:host=localhost;dbname=promovam_db', 'root', '');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $pdo->prepare('INSERT INTO company (name,phone,email,where_deliver,services,newsletter) 
                                                        VALUES(:name,:phone,:email,:where_deliver,:services,:newsletter)');
    $stmt->execute(array(
        ':name' => utf8_decode($_POST['name']),
        ':phone' => $_POST['phone'],
        ':email' => $_POST['email'],
        ':where_deliver' => utf8_decode($_POST['delivery']),
        ':services' => utf8_decode($_POST['desc']),
        ':newsletter' => $_POST['newsletter']=='true' ? 1:0,

    ));
    echo $stmt->rowCount();
} catch (PDOException $e) {
    echo 'Error: ' . $e->getMessage();
}
