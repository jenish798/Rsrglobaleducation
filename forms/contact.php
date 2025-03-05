<?php
require 'mailer/src/Exception.php';
require 'mailer/src/PHPMailer.php';
require 'mailer/src/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Collect form data
$to = ["education@rsrglobal.org"];
// $to = ["solomonjenish@gmail.com"];
$from = $_POST['email'];
$name = $_POST['name'];
$contact_number = $_POST['contact_number'];
$qualification = $_POST['qualification'];
$city = $_POST['city'];
$country = $_POST['country'];
$program = $_POST['program'];
$destination = $_POST['destination'];
$message = $_POST['message'];
$sub = 'Education Enquiry';
$sub1 = 'Education Enquiry';

$message = "
<b>Name:</b> $name<br>
<b>Contact Number:</b> $contact_number<br>
<b>Email Id:</b> $from<br>
<b>qualification:</b> $qualification<br>
<b>city:</b> $city<br>
<b>country:</b> $country<br>
<b>program:</b> $program<br>
<b>destination:</b> $destination<br>
<b>Message:</b> $message
";

try {
    $mail = new PHPMailer(true);

    // Server settings
    // $mail->SMTPDebug = 2; // For detailed debugging info
    $mail->isSMTP();                                   // Set mailer to use SMTP
    $mail->Host       = 'smtp.office365.com';         // Specify main SMTP server
    $mail->SMTPAuth   = true;                         // Enable SMTP authentication
    $mail->Username   = 'noreply@rsrglobal.org';      // SMTP username
    $mail->Password   = 'RSRGlobal@2023';             // SMTP password (use an App Password if 2FA is enabled)
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // Enable TLS encryption
    $mail->Port       = 587;                          // TCP port to connect to

    // Send email to recipients
    $mail->setFrom('noreply@rsrglobal.org', 'RSR Global');
    foreach ($to as $recipient) {
        $mail->addAddress($recipient); // Add recipient
    }
    $mail->addReplyTo('contact@rsrglobal.org', 'RSR Global');
    $mail->isHTML(true);                                  // Set email format to HTML
    $mail->Subject = $sub;
    $mail->Body    = $message;
    $mail->AltBody = strip_tags($message);

    $mail->send();

    // Send confirmation email
    $confirmation_message = "
    <h2>Dear $name,</h2>

    <p>Congratulations on registering with <strong>RSR Global Education!</strong> You have taken the first step toward an exciting global education journey, and we are here to support you every step of the way.</p>

    <h2>Our Commitment to Your Success:</h2>

    <p><strong>Personalized Counseling:</strong> Our experienced counselor will connect with you soon to discuss your study abroad goals.</p>
	<p><strong>University & Course Selection:</strong> Expert guidance to help you choose the best academic and career path.</p>
	<p><strong>Application Assistance:</strong> Step-by-step support to ensure a smooth and successful application process.</p>
	<p><strong>Scholarship Guidance:</strong> Help in identifying and applying for scholarship and financial aid opportunities.</p>
	<p><strong>Visa & Immigration Support:</strong> Comprehensive assistance for a hassle-free visa process.</p>
    <p><strong>Pre-Departure Support:</strong> Helping you transition seamlessly to your new destination.</p>

    <h2>Next Steps:</h2>

    <p>Our team is excited to assist you! <strong>Our Experienced Counselor</strong> will reach out shortly to guide you through the process.</p>
    <p>For any questions, feel free to contact us at <strong>education@rsrglobal.org</strong> or call <strong>+44 2086 293 915.</strong></p>

    <h2>Welcome to RSR Global Education &ndash; Opening Doors to Global Education!</h2>

    <p><strong>Best regards</strong>,<br>RSR Global Education Team <br><strong>www.rsrglobaleducation.com</strong></p>

    ";

    $mail->clearAddresses(); // Clear previous recipients
    $mail->addAddress($from); // Add the sender as recipient
    $mail->Subject = $sub1;
    $mail->Body    = $confirmation_message;
    $mail->AltBody = strip_tags($confirmation_message);

    $mail->send();
    echo 'ok';

} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}
?>
