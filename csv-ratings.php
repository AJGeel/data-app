<?php

# makes a 'now' timestamp
$timestamp = date("Y-m-d") . "T" . date("G:i:s");

# Opens the current id number, adds one to it, updates .csv file
$id_csv = fopen("data/rating-id.csv", 'r');
$new_id = fread($id_csv,filesize("data/rating-id.csv")) + 1;
$id_csv = fopen("data/rating-id.csv", 'w');
fputcsv($id_csv, array($new_id));
fclose($id_csv);

# Generates a new line for the csv file using the front-end variables
$new_line = $new_id.','.$_GET["kitchenRating"].','.$timestamp;

$handle = fopen('data/ratings.csv', "a");
fputcsv($handle, array($new_line));
fclose($handle);

echo $new_line;


?>
