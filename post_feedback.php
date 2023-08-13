<?php
// Establish a database connection (replace with your own credentials)
$conn = mysqli_connect("localhost", "root", "", "feedback");

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["feedback"])) {
    $feedback = $_POST["feedback"];

    $sql = "INSERT INTO feedback (text) VALUES ('$feedback')";

    if (mysqli_query($conn, $sql)) {
        echo "Feedback submitted successfully.";
    } else {
        echo "Error: " . $sql . "<br>" . mysqli_error($conn);
    }
}

mysqli_close($conn);
?>