<?php

declare(strict_types=1);

namespace App\Models;

use PDO;

class Cliente
{
    
	private $host = 'localhost';
    private $usuario = 'andres';
    private $senha = 'cadeoandres1';
    private $banco = 'lista-clientes';

    private $con;
				
	public function __construct()
    	{
            $this->con = new PDO("mysql:host={$this->host};dbname={$this->banco}", $this->usuario, $this->senha);
            $this->con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    	}

    public function getClientes(string $nome = NULL)
    	{
        	$sql = "SELECT * FROM clientes";
        	$params = [];

        if ($nome !== NULL) {
            $sql .= " WHERE CONVERT(nome USING utf8) COLLATE utf8_general_ci LIKE :nome";
            $params[':nome'] = "%" . $nome . "%";
        }

    $sql .= " ORDER BY nome";

    $stmt = $this->con->prepare($sql);

    foreach ($params as $param => $value)
        {
            $stmt->bindValue($param, $value, PDO::PARAM_STR);
        }

        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
	}
				
	public function addClientes(string $nome, string $cpf)
    {
        $sql = "INSERT INTO clientes (nome, cpf) VALUES (:nome, :cpf)";
        $stmt = $this->con->prepare($sql);
        $stmt->bindParam(':nome', $nome, PDO::PARAM_STR);
        $stmt->bindParam(':cpf', $cpf, PDO::PARAM_STR);
        return $stmt->execute();
    }

    public function updateClientes(int $id, string $nome, string $cpf)
    {
        $sql = "UPDATE clientes SET nome = :nome, cpf = :cpf WHERE id = :id";
        $stmt = $this->con->prepare($sql);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->bindParam(':nome', $nome, PDO::PARAM_STR);
        $stmt->bindParam(':cpf', $cpf, PDO::PARAM_STR);
        return $stmt->execute();
    }

    public function deleteClientes(int $id)
    {
        $sql = "DELETE FROM clientes WHERE id = :id";
        $stmt = $this->con->prepare($sql);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        return $stmt->execute();
    }
				
}
