<?php
$host = 'localhost';
$db   = 'chatagorska';
$user = 'root';
$pass = ''; // W XAMPP domyślne hasło dla root jest puste
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
     $pdo = new PDO($dsn, $user, $pass, $options);
     // Jeśli chcesz przetestować połączenie, odkomentuj linijkę niżej:
     // echo "Połączenie z bazą danych zakończone sukcesem!";
} catch (\PDOException $e) {
     throw new \PDOException($e->getMessage(), (int)$e->getCode());
}
?>