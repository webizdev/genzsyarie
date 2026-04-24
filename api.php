<?php
/**
 * API Endpoint for Syirkah Bisnis Mastery Registration
 * Compatible with cPanel / Shared Hosting (PHP + MySQL)
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Database Configuration
$db_host = 'localhost';
$db_name = 'alilogis_syirkahgenz';
$db_user = 'alilogis_syirkahgenz';
$db_pass = 'w2N3N7j4dMtZ8ZJwAQP2';

// Connect to MySQL
$conn = new mysqli($db_host, $db_user, $db_pass, $db_name);

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Database connection failed: ' . $conn->connect_error]);
    exit;
}

$conn->set_charset('utf8mb4');

// Parse request
$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents('php://input'), true);

switch ($method) {
    case 'POST':
        // Create new registration
        $full_name = trim($input['full_name'] ?? '');
        $whatsapp = trim($input['whatsapp_number'] ?? '');
        $address = trim($input['corporate_address'] ?? '');

        if (empty($full_name) || empty($whatsapp) || empty($address)) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Semua field wajib diisi']);
            exit;
        }

        $stmt = $conn->prepare('INSERT INTO registrations (full_name, whatsapp_number, corporate_address, status) VALUES (?, ?, ?, ?)');
        $status = 'pending';
        $stmt->bind_param('ssss', $full_name, $whatsapp, $address, $status);

        if ($stmt->execute()) {
            http_response_code(201);
            echo json_encode([
                'success' => true,
                'message' => 'Registrasi berhasil disimpan',
                'data' => [
                    'id' => $stmt->insert_id,
                    'full_name' => $full_name,
                    'whatsapp_number' => $whatsapp,
                    'corporate_address' => $address,
                    'status' => 'pending'
                ]
            ]);
        } else {
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => 'Database error: ' . $stmt->error]);
        }
        $stmt->close();
        break;

    case 'GET':
        // Get all registrations (for admin)
        $result = $conn->query('SELECT * FROM registrations ORDER BY created_at DESC');
        $rows = [];
        while ($row = $result->fetch_assoc()) {
            $rows[] = $row;
        }
        echo json_encode(['success' => true, 'data' => $rows]);
        break;

    default:
        http_response_code(405);
        echo json_encode(['success' => false, 'message' => 'Method not allowed']);
}

$conn->close();

