<?php

declare(strict_types=1);

namespace App\Models;

//COISINHAS QUE A GENTE GOSTA
class Util
{
    //NZ = NULO VIRA ZERO
    public function nz($v)
    {
        if ($v!="") {
            return $v;
        } else {
            return 0;
        }
    }

    //ARRUMA A STRING PARA INSERÇÃO NO BANCO
    function limpaString($v)    
    {
        $v = str_replace('  ', ' ', $v);
        $v = str_replace('<', '', $v);
        $v = str_replace('>', '', $v);
        $v = str_replace('#', '', $v);
        $v = str_replace('$', '', $v);
        $v = str_replace('%', '', $v);
        $v = str_replace('*', '', $v);
        $v = str_replace("'", '´', $v);
        $v = str_replace('"', '', $v);
        $v = mb_strtoupper(trim($v));
        return $v;
    }

    //AUTO EXPLICATIVO:
    function formataTelefone($telefone) {
        //SE FOR TEL INTERNACIONAL, IGNORA FORMATAÇÃO
        if (substr($telefone, 0, 1) == "+") {
            return $telefone;
        } else {
            $telefoneNumeros = preg_replace('/\D/', '', $telefone);
    
            if (strlen($telefoneNumeros) === 11) {
                $telefoneFormatado = '(' . substr($telefoneNumeros, 0, 2) . ') ' . substr($telefoneNumeros, 2, 5) . '-' . substr($telefoneNumeros, 7);
            } else {
                $telefoneFormatado = $telefone;
            }
    
        return $telefoneFormatado;
        }
    }

    function formataCpf($cpf)
    {
        if ($cpf!="")
        {
            $cpf=$stringNumeros = preg_replace('/[^0-9]/', '', $cpf);

            while (strlen($cpf)<11 && strlen($cpf)>8)
            {
	            $cpf="0".$cpf;
            }

            $cpfFormatado = substr($cpf, 0, 3) . '.' . substr($cpf, 3, 3) . '.' . substr($cpf, 6, 3) . '-' . substr($cpf, 9);

            return $cpfFormatado;
            
        } else {
	        return "";
        }
    }


}