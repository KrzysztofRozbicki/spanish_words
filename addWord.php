<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods:  POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$jsonFile = 'vocabulary.json';

if (!file_exists($jsonFile)) {
    file_put_contents($jsonFile, '[]');
}

$method = $_SERVER['REQUEST_METHOD'];

if ($method !== 'POST') {
    http_response_code(400);
    echo json_encode(['error' => 'Błędne zapytanie']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);

if (!$input || !isset($input['spanish']) || !isset($input['polish'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Brakuje wymaganych danych']);
    exit;
}

if (empty(trim($input['spanish'])) || empty(trim($input['polish']))) {
    http_response_code(400);
    echo json_encode(['error' => 'Słowa nie mogą być puste']);
    exit;
}

$data = json_decode(file_get_contents($jsonFile), true) ?: [];

$spanishWord = strtolower(trim($input['spanish']));
$polishWord = strtolower(trim($input['polish']));

foreach ($data as $existingWord) {
    if ($existingWord['spanish'] === $spanishWord) {
        http_response_code(409);
        echo json_encode([
            'error' => 'Słowo hiszpańskie już istnieje w słowniku',
            'existing_word' => $existingWord
        ]);
        exit;
    }
}

$newWord = [
    'id' => count($data) + 1, // Prosty ID
    'spanish' => $spanishWord,
    'polish' => $polishWord,
    'created_at' => date('Y-m-d H:i:s')
];

$data[] = $newWord;
file_put_contents($jsonFile, json_encode($data, JSON_PRETTY_PRINT));
http_response_code(200);
echo json_encode($newWord);
exit;
