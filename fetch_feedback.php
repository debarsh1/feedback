<?php
// Establish a database connection (replace with your own credentials)
$conn = mysqli_connect("localhost", "root", "", "feedback");

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$sql = "SELECT text, timestamp FROM feedback ORDER BY id DESC";
$result = mysqli_query($conn, $sql);

$feedbackData = array();

if (mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_assoc($result)) {
        $feedbackData[] = array(
            "timestamp" => $row["timestamp"],
            "text" => $row["text"]
        );
    }
}

mysqli_close($conn);

// Set the content type to JSON
header("Content-Type: application/json");

// Output the feedback data as JSON
echo json_encode($feedbackData);
?>
