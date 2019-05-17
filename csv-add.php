<?php

# makes a 'now' timestamp
$timestamp = date("Y-m-d") . "T" . date("G.i:s");

// function sayHiBack() {
//   // Check if we have the correct parameters to execute the data entry
//   // if (isset($_GET["p1"]) && isset($_GET["p2"]) && isset($_GET["p3"]) && isset($_GET["num_guests"])){
//   if (isset($_GET["p1"]) && isset($_GET["p2"]) && isset($_GET["p3"]) && isset($_GET["num_guests"])){
//
//   } else {
//     echo "<p style='color: red'>Unable to read URL parameters correctly...</p><br>";
//   }
// }


# Opens the current id number, adds one to it, updates .csv file
$id_csv = fopen("data/id.csv", 'r');
$new_id = fread($id_csv,filesize("data/id.csv")) + 1;
$id_csv = fopen("data/id.csv", 'w');
fputcsv($id_csv, array($new_id));
fclose($id_csv);

# Generates a new line for the csv file using the front-end variables
$new_line = $new_id.','.$_GET["p1"].','.$_GET["p2"].','.$_GET["p3"].','.$_GET["num_guests"].','.$timestamp;

$handle = fopen('data/presence.csv', "a");
fputcsv($handle, array($new_line));
fclose($handle);


// echo "
//
// <style>
// body{
//   background-color: 000;
//   font-family: monospace;
//   color: #fff;
// }
//
// </style>
//
// Air Quality App prototype &mdash; Server-Side <br><br>
//
// Here is the latest line: <br>
// $new_line
//
// <br><br><br><br><br><br>
//
// To do (2019-05-19):<br>
//
// <ul>
// <li style='color: green;'>Link client-side with server-side</li>
// <li>Add in modal for feedback</li>
// </ul>
//
//
//
//
// ";


echo $new_line;


?>
