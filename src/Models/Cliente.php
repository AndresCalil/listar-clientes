<?php

declare(strict_types=1);

namespace App\Models;

use App\Models\Executar;
use App\Models\Util;

class Cliente
{
    private Executar $executar;
    private Util $util;

    public function __construct()
    {
        $this->executar = new Executar();
        $this->util = new Util();
    }

    public function getClientes(?string $nome = null): string|bool|array
    {
        $sql = "SELECT * FROM clientes";

        if ($nome !== null) {
            $sql .= " WHERE CONVERT(nome USING utf8) COLLATE utf8_general_ci LIKE '%" . $nome . "%' ";
        }

        $sql .= " ORDER BY nome";

        return $this->executar->executarConsulta($sql);
    }

    public function addClientes(string $nome, string $cpf): string|bool|array
    {
        $nome = $this->util->limpaString($nome);
        $cpf = $this->util->formataCpf($cpf);

        $sql = "INSERT INTO clientes (nome, cpf) VALUES ('{$nome}', '{$cpf}')";

        return $this->executar->executarConsulta($sql);
    }

    public function updateClientes(int $id, string $nome, string $cpf): string|bool|array
    {
        $sql = "UPDATE clientes SET nome = '" . $nome . "', cpf = '" . $cpf . "' WHERE id = " . $id;

        return $this->executar->executarConsulta($sql);
    }

    public function deleteClientes(int $id): string|bool|array
    {
        $sql = "DELETE FROM clientes WHERE id = " . $id;

        return $this->executar->executarConsulta($sql);
    }
}
