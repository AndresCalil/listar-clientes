<?php

declare(strict_types=1);

namespace App\Models;

use PDO;
use PDOException;

class Executar
{
    //VARIÁVEIS DO BANCO QUE DEVERIAM SER ESCONDIDAS =P
    private $host = '162.241.62.70';
    private $usuario = 'cadas558_jobs';
    private $senha = 'Jobs!#2536';
    private $banco = 'cadas558_lista-clientes';

    private $con;

    public function __construct()
    {
            $this->con = new PDO("mysql:host={$this->host};dbname={$this->banco}", $this->usuario, $this->senha);
            $this->con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->con->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
    }

    //FUNÇÃO EXECUTA QUALQUER STRING SQL NO BANCO:
    public function executarConsulta(string $sql, $params = [])
    {
       try
       {
           $stmt = $this->con->prepare($sql);

            foreach ($params as $key => &$value) {
            $stmt->bindParam($key, $value);
        }

        $stmt->execute();

        if (!$stmt) {
            $erro = $this->con->errorInfo();
            echo $sql . '<br><br>';
            echo "Deu ruim: " . $erro[2];
            return false;
        }

        //AQUI, SE A CONSULTA FOR INSERT, EU RETORNO O ID PARA FINS DE REGISTRO EM LOG E TALS
        if (stripos($sql, 'INSERT') !== false) {
            return $this->con->lastInsertId();
        }
        //CASO CONTRÁRIO, EU RETORNO A LISTA (SE FOR CONSULTA)
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) 
        {
            echo "Deu ruim: " . $e->getMessage();
            return false;
        }
    }

}
