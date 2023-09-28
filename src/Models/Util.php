<?php

declare(strict_types=1);

namespace App\Models;

class Util
{
    public function nz($value): mixed
    {
        return $value ?? 0;
    }

    public function limpaString(?string $value = null): string
    {
        if (empty($value)) {
            return '';
        }

        $value = str_replace('  ', ' ', $value);
        $value = str_replace('<', '', $value);
        $value = str_replace('>', '', $value);
        $value = str_replace('#', '', $value);
        $value = str_replace('$', '', $value);
        $value = str_replace('%', '', $value);
        $value = str_replace('*', '', $value);
        $value = str_replace("'", '´', $value);
        $value = str_replace('"', '', $value);
        $value = mb_strtoupper(trim($value));

        return $value;
    }

    public function formataTelefone(?string $telefone = null): string
    {
        if (empty($telefone)) {
            return '';
        }

        return $this->checkIfPhoneIsInternationalAndFormat($telefone);
    }

    private function checkIfPhoneIsInternationalAndFormat(string $telefone): string
    {
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

    public function formataCpf(?string $cpf = null): string
    {
        if (empty($cpf)) {
            return '';
        }

        $cpf = preg_replace('/[^0-9]/', '', $cpf);

        while (strlen($cpf) < 11 && strlen($cpf) > 8) {
            $cpf = "0" . $cpf;
        }

        $cpfFormatado = substr($cpf, 0, 3) . '.' . substr($cpf, 3, 3) . '.' . substr($cpf, 6, 3) . '-' . substr($cpf, 9);

        return $cpfFormatado;
    }
}
