<?php

# makes a 'now' timestamp
$timestamp = date("Y-m-d") . "T" . date("G:i:s");

# Opens the current id number, adds one to it, updates .csv file
$id_csv = fopen("data/id.csv", 'r');
$new_id = fread($id_csv,filesize("data/id.csv")) + 1;
$id_csv = fopen("data/id.csv", 'w');
fputcsv($id_csv, array($new_id));
fclose($id_csv);

# Generates a new line for the csv file using the front-end variables
$new_line = $new_id.','.$_GET["p1"].','.$_GET["p2"].','.$_GET["p3"].','.$_GET["p4"].','.$_GET["num_guests"].','.$timestamp;

$handle = fopen('data/presence.csv', "a");
fputcsv($handle, array($new_line));
fclose($handle);

echo $new_line;


?>
