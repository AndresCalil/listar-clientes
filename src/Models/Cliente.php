<?php

declare(strict_types=1);

namespace App\Models;

class Cliente
{
    public function __construct(
        protected string $nomeArquivo, 
        protected array $clientes = [],
    ) 
    {
        $this->clientes = json_decode(file_get_contents($nomeArquivo), true);
    }

    public function getClientes(): array
    {
        return $this->clientes;
    }
}
