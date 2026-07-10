<?php
// Zezwalamy Reactowi na pobieranie danych (CORS)
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Dołączamy Twoje połączenie z bazą danych
require_once 'db.php'; 

try {
    // Zakładam, że tabela nazywa się 'rezerwacje', a kolumny to 'data_od' i 'data_do'
    // Jeśli w bazie masz inne nazwy (np. od_kiedy, do_kiedy), zmień je poniżej!
    $query = "SELECT data_przyjazdu, data_wyjazdu FROM rezerwacje";
    $stmt = $pdo->prepare($query);
    $stmt->execute();
    
    $bookings = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Wysyłamy dane jako czysty JSON do Reacta
    echo json_encode($bookings);

} catch (PDOException $e) {
    echo json_encode(["error" => "Błąd bazy danych: " . $e->getMessage()]);
}
?>