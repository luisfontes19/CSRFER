<?php

session_start();

if(isset($_POST['logout']))
  session_unset();

if($_POST['login']){
  $user =  $_POST['username'];
  $pass =  $_POST['password'];

  if(($user == "victim" || $user == "attacker") && $pass == "password" )
  {    
    session_destroy();
    session_start();
    $_SESSION['user'] = $user;
  }
}

$logged_user = $_SESSION['user'];
if(!isset($logged_user))
  die('
  Please login to continue
  <form method="post">
    username: <input type="text" name="username">
    password: <input type="text" name="password">
    <input type="hidden" name="login" value="1">
    <input type="submit" value="login">
  </form>
');

?>

<form action="" method="post">
  <?php echo "Hi $logged_user"; ?> <input type="submit" name="logout" value="logout"/>
</form>


