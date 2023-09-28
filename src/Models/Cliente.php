<?php

declare(strict_types=1);

namespace App\Models;

use App\Models\Executar;
use App\Models\Util;

//CLASSE QUE CONTROLA A TABELA CLIENTE
class Cliente
{
    private $executar;
    private $util;

    public function __construct()
    {
    $this->executar = new Executar();
    $this->util = new Util();
    }

    //LISTA O CONTEÚDO DA TABELA, SE HOUVER PARÂMETRO, FILTRA O NOME.
    public function getClientes(string $nome = null)
    {
        $sql = "SELECT * FROM clientes";

        if ($nome !== null) {
            $sql .= " WHERE CONVERT(nome USING utf8) COLLATE utf8_general_ci LIKE '%" . $nome . "%' ";
        }

        $sql .= " ORDER BY nome";

        return $this->executar->executarConsulta($sql);
    }

    //ADICIONA REGISTROS NA TABELA CLIENTE
    public function addClientes(string $nome, string $cpf)
    {
        $nome = $this->util->limpaString($nome);
        $cpf = $this->util->formataCpf($cpf);
        
        $sql = "INSERT INTO clientes (nome, cpf) VALUES ('".$nome."', '".$cpf."')";

        return $this->executar->executarConsulta($sql);
    }

    //REALIZA UPDATES (PS: NÃO CRIEI ISSO NA INDEX POR PREGUIÇA)
    public function updateClientes(int $id, string $nome, string $cpf)
    {
        $sql = "UPDATE clientes SET nome = '".$nome."', cpf = '".$cpf."' WHERE id = ".$id;

        return $this->executar->executarConsulta($sql);
    }

    //APAGA A GALERA
    public function deleteClientes(int $id)
    {
        $sql = "DELETE FROM clientes WHERE id = ".$id;

        return $this->executar->executarConsulta($sql);
    }
}
