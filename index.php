<?php

require_once __DIR__ . '/vendor/autoload.php';

use App\Models\Cliente;

$clientes = (new Cliente("dados/clientes.json"))->getClientes();

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Teste</title>
</head>
<body>
    <table cellpadding="2" cellspacing="0" border="1">
        <tr>
            <td>id</td>
            <td>Nome</td>
            <td>CPF</td>
        </tr>

        <?php foreach ($clientes as $cliente): ?>
        <tr>
            <td><?= $cliente['id'] ?></td>
            <td><?= $cliente['nome'] ?></td>
            <td><?= $cliente['cpf'] ?></td>
        </tr>
        <?php endforeach; ?>
</table>
</body>
</html>