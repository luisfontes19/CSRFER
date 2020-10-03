<?php 

require('authentication.php');

$dest = $_POST['destination'];
$amount = $_POST['amount'];

if(isset($dest) && isset($amount))
  echo "[+] Transfer of $amount to account $dest was done<br><br>";
?>


<!DOCTYPE html>
<html>
<head>
  <title></title>
</head>
<body>
<form action="" method="POST">
  Destination: <input name="destination" type="text" value="123-123123-123" /><br>
  Amount: <input name="amount" type="text" value="50€" /><br>
  <input type="submit" value="Send!" />
</form>

</body>
</html>
