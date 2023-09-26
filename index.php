<?php

require_once __DIR__ . '/vendor/autoload.php';

use App\Models\Cliente;

$cliente = new Cliente();

if (isset($_POST["nome"])) {
	
	$cliente->addClientes($_POST["nome"], $_POST["cpf"]);
	
    header('Location: index.php');

	exit("");
}

if (isset($_GET["del"])) {
	
	$cliente->deleteClientes($_GET["del"]);
	
    header('Location: index.php');

	exit("");
}

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Teste</title>
    <link href="style.css" rel="stylesheet" type="text/css">
    <script src="js/mpxclass.js"></script>
</head>
<body>
<br>
<div align="center">

<form name="fFiltro" id="fFiltro" method="get" action="">
    <table border="0" cellpadding="2" cellspacing="0" class="box">
        <tr class="linha">
            <td><input name="nome" type="text" class="Formulario" id="nome"></td>
            <td><input name="filtrar" type="submit" class="botao" id="filtrar" value="filtrar"></td>
        </tr>
        <tr class="linha">
            <td colspan="2" align="center">
                <input name="adicionar" type="button" class="botao" id="adicionar" value="adicionar" 
                onClick="
                exibir('fCad');
                ocultar('fFiltro');
                fCad.nome.focus();"
                style="background-color:#096">
            </td>
        </tr>
    </table>
</form>
<script>
    fFiltro.nome.focus();
</script>
<form name="fCad" id="fCad" method="post" action="" style="display:none;">
    <table border="0" cellpadding="2" cellspacing="0" class="box">
        <tr class="linha">
            <td>Nome: </td>
            <td><input name="nome" type="text" class="Formulario" id="nome"></td>
        </tr>
        <tr class="linha">
            <td>CPF:</td>
            <td><input name="cpf" type="text" class="Formulario" id="cpf"></td>
        </tr>
        <tr class="linha">
            <td colspan="2" align="right">
                <input name="filtrar" type="reset" class="botao" id="filtrar" value="cancelar"
                onClick="
                ocultar('fCad');
                exibir('fFiltro');
                fFiltro.nome.focus();" style="background-color:#C00"
                >
                &nbsp; 
                <input name="filtrar" type="submit" class="botao" id="filtrar" value="cadastrar">
            </td>
        </tr>
    </table>
</form>
<br><br>
<table border="0" align="center" cellpadding="4" cellspacing="0" class="box">
    <tr>
        <td>id</td>
        <td>Nome</td>
        <td>CPF</td>
         <td>&nbsp;</td>
    </tr>

<?php 
	$nome = isset($_GET["nome"]) ? $_GET["nome"] : NULL;
	if ($nome!="") {
		$clientes = $cliente->getClientes($nome);
	} else {
	$clientes = $cliente->getClientes();
	}
								
	foreach ($clientes as $cliente): ?>
        <tr class="linha">
            <td><?= $cliente['id'] ?></td>
            <td><?= $cliente['nome'] ?></td>
            <td><?= $cliente['cpf'] ?></td>
            <td><input name="adicionar" type="button" class="botao" id="adicionar" value="x"
            onClick="confirmar('index.php?del=<?= $cliente['id'] ?>','TEM CERTEZA QUE DESEJA APAGAR ESSE CLIENTE?');" 
            style="background-color:#C00"></td>
        </tr>
    <?php endforeach; ?>
</table>
</div>
</body>
</html>