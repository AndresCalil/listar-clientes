<?php

declare(strict_types=1);

namespace App\Models;

use PDO;
use PDOException;

class Executar
{
    private string $host = '162.241.62.70';
    private string $usuario = 'cadas558_jobs';
    private string $senha = 'Jobs!#2536';
    private string $banco = 'cadas558_lista-clientes';

    private PDO $connection;

    public function __construct()
    {
        $this->connection = new PDO("mysql:host={$this->host};dbname={$this->banco}", $this->usuario, $this->senha);
        $this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $this->connection->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
    }

    public function executarConsulta(string $sql, $params = []): bool|string|array
    {
        try {
            $stmt = $this->connection->prepare($sql);

            foreach ($params as $key => &$value) {
                $stmt->bindParam($key, $value);
            }

            $stmt->execute();

            if (!$stmt) {
                $erro = $this->connection->errorInfo();
                echo $sql . '<br><br>';
                echo "Deu ruim: " . $erro[2];
                return false;
            }

            if (str_contains($sql, 'INSERT')) {
                return $this->connection->lastInsertId();
            }

            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $exception) {
            echo "Erro ao executar query no arquivo " . __CLASS__ . ", método " . __METHOD__ . ". Erro: {$exception->getMessage()}";

            return false;
        }
    }
}
