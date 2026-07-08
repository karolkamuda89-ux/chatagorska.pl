<?php
// 1. Zezwalamy Reactowi (port 5173) na przesyłanie danych do Apache (port 80)
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");

// Jeśli to tylko zapytanie testowe przeglądarki (Preflight), kończymy wcześniej
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// 2. Podłączamy nasz wcześniejszy plik z bazą danych
require_once 'db.php';

// 3. Odbieramy surowe dane JSON, które wyśle nam React
$json = file_get_contents('php://input');
$data = json_decode($json, true);

// 4. Sprawdzamy, czy wszystkie potrzebne pola dojechały
if (
    !empty($data['imie_nazwisko']) && 
    !empty($data['email']) && 
    !empty($data['telefon']) && 
    !empty($data['data_przyjazdu']) && 
    !empty($data['data_wyjazdu']) && 
    !empty($data['liczba_gosci'])
) {
    try {
        // 5. Przygotowujemy bezpieczne zapytanie SQL (INSERT) do Twojej tabeli
        $sql = "INSERT INTO rezerwacje (imie_nazwisko, email, telefon, data_przyjazdu, data_wyjazdu, liczba_gosci) 
                VALUES (:imie, :email, :telefon, :przyjazd, :wyjazd, :gosci)";
        
        $stmt = $pdo->prepare($sql);
        
        // 6. Wykonujemy zapytanie, podstawiając prawdziwe dane
        $stmt->execute([
            ':imie'     => $data['imie_nazwisko'],
            ':email'    => $data['email'],
            ':telefon'  => $data['telefon'],
            ':przyjazd' => $data['data_przyjazdu'],
            ':wyjazd'   => $data['data_wyjazdu'],
            ':gosci'    => (int)$data['liczba_gosci']
        ]);
        // =================================================================
        // 📬 AUTOMATYZACJA: WYSYŁANIE MAILA DO WŁAŚCICIELKI
        // =================================================================
        
        $to = "twoj-email-wlascicielki@domena.pl"; // <-- TUTAJ WPISZ DOCELOWY MAIL PANI WŁAŚCICIELKI
        $subject = "Nowa rezerwacja - Chata Gorska";
        
        // Budujemy czytelną treść maila za pomocą składni HTML
        $message = "
        <html>
        <head>
            <title>Nowe zapytanie o rezerwacje</title>
        </head>
        <body style='font-family: Arial, sans-serif; line-height: 1.6; color: #333;'>
            <div style='max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;'>
                <h2 style='color: #d97706;'>Masz nowe zapytanie o nocleg!</h2>
                <hr style='border: 0; border-top: 1px solid #eee;'>
                <p><strong>Klient:</strong> " . htmlspecialchars($data['imie_nazwisko']) . "</p>
                <p><strong>E-mail:</strong> " . htmlspecialchars($data['email']) . "</p>
                <p><strong>Telefon:</strong> " . htmlspecialchars($data['telefon']) . "</p>
                <p><strong>Termin pobytu:</strong> " . htmlspecialchars($data['data_przyjazdu']) . " do " . htmlspecialchars($data['data_wyjazdu']) . "</p>
                <p><strong>Liczba gosci:</strong> " . (int)$data['liczba_gosci'] . " os.</p>
                <hr style='border: 0; border-top: 1px solid #eee;'>
                <p style='font-size: 12px; color: #777;'>Wiadomosc wygenerowana automatycznie przez system rezerwacji Chata Gorska.</p>
            </div>
        </body>
        </html>
        ";

        // Nagłówki informujące serwer pocztowy, że wysyłamy maila w formacie HTML z kodowaniem UTF-8
        $headers = "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
        $headers .= "From: system@chatagorska.pl" . "\r\n"; // Adres nadawcy (może być fikcyjny na tym etapie)

        // Odpalamy wbudowaną funkcję mailową PHP
        @mail($to, $subject, $message, $headers);
        
        // =================================================================

        // 7. Odpowiadamy Reactowi sukcesem
        echo json_encode(["status" => "success", "message" => "Rezerwacja zapisana pomyślnie!"]);

    } catch (\PDOException $e) {
        // Gdyby baza danych wypluła błąd
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Błąd bazy danych: " . $e->getMessage()]);
    }
} else {
    // Jeśli użytkownik nie wypełnił wszystkich pól
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Niepełne dane formularza."]);
}
?>