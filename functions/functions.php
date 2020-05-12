<?php
//var_dump($_POST);
if(isset($_GET['action'])){
        $apiKey='7998bab66788508cd868f53ce325dee5-us8';
        $listId='dede8c2ad5';
        $email=$_GET['email'];

        $memberID= md5(strtolower($email));
        $data_center = substr($apiKey,strpos($apiKey,'-')+1);

        if($_GET['action']=='delete'){
            //Código para deletar um usuário da lista do mailchimp
            $url = 'https://'. $data_center .'.api.mailchimp.com/3.0/lists/'. $listId .'/members/'. md5(strtolower($email));
            $ch = curl_init($url);
            curl_setopt($ch, CURLOPT_USERPWD, 'user:' . $apiKey);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_TIMEOUT, 10);
            curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'DELETE');
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
            $result = curl_exec($ch);
            $status_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
            curl_close($ch);
            exit();
        }else{
            $url = 'https://'. $data_center .'.api.mailchimp.com/3.0/lists/'. $listId .'/members';

            $json = json_encode([
                'email_address' => $_GET['email'],
                'status'        => 'subscribed',
                'merge_fields'  => [
                    'FNAME' => htmlentities('Teste de tecnologia'),
                    'PHONE' => '19999999999',
                    'TYPECOMP' => htmlentities('Teste de tecnologia promovame'),
                    'COMPANY' => htmlentities('Teste de tecnologia promovame'),
                ]//pass 'subscribed' or 'pending'
            ]);

            $ch = curl_init($url);
            curl_setopt($ch, CURLOPT_USERPWD, 'user:' . $apiKey);
            curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_TIMEOUT, 10);
            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $json);
            $result = curl_exec($ch);
            $status_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
            curl_close($ch);

            echo print_r($result);
            exit();
        }

}else{
    try {
    $pdo = new PDO('mysql:host=localhost;dbname=promovam_db', 'promovam_admin', '@pR0mOv4M3#');
//        $pdo = new PDO('mysql:host=localhost;dbname=promovam_db', 'root', '');
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $stmt = $pdo->prepare('INSERT INTO company (name,phone,email,where_deliver,services,newsletter,src)
                                                        VALUES(:name,:phone,:email,:where_deliver,:services,:newsletter,:src)');
        $stmt->execute(array(
            ':name' => utf8_decode($_POST['name']),
            ':phone' => $_POST['phone'],
            ':email' => $_POST['email'],
            ':where_deliver' => utf8_decode($_POST['delivery']),
            ':services' => utf8_decode($_POST['desc']),
            ':newsletter' => $_POST['newsletter']=='true' ? 1:0,
            ':src' => $_COOKIE['src'],

        ));
        echo $stmt->rowCount();

        if($stmt->rowCount()==1){
//    if(true){
            $apiKey='7998bab66788508cd868f53ce325dee5-us8';
            $listId='dede8c2ad5';
            $email=$_POST['email'];


            $memberID= md5(strtolower($email));
            $data_center = substr($apiKey,strpos($apiKey,'-')+1);


                $url = 'https://'. $data_center .'.api.mailchimp.com/3.0/lists/'. $listId .'/members';
                $json = json_encode([
                    'email_address' => $email,
                    'status'        => 'subscribed',
                    'merge_fields'  => [
                        'FNAME' => htmlentities($_POST['name']),
                        'PHONE' => $_POST['phone'],
                        'TYPECOMP' => htmlentities($_POST['desc']),
                        'COMPANY' => htmlentities($_POST['name']),
                    ]//pass 'subscribed' or 'pending'
                ]);

                $ch = curl_init($url);
                curl_setopt($ch, CURLOPT_USERPWD, 'user:' . $apiKey);
                curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
                curl_setopt($ch, CURLOPT_TIMEOUT, 10);
                curl_setopt($ch, CURLOPT_POST, 1);
                curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
                curl_setopt($ch, CURLOPT_POSTFIELDS, $json);
                $result = curl_exec($ch);
                $status_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
                curl_close($ch);

            // store the status message based on response code
            if ($status_code == 200) {
                echo 'You have successfully subscribed';
            } else {
                switch ($status_code) {
                    case 214:
                        $msg = 'You are already subscribed.';
                        break;
                    default:
                        $msg = 'Some problem occurred, please try again.';
                        break;
                }
                echo $msg;
            }
        }else{
            echo 'Please enter valid email address';
        }

    } catch (PDOException $e) {
        echo 'Error: ' . $e->getMessage();
    }
}

