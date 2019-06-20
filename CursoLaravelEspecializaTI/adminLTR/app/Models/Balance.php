<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use App\Models\Historic;
use App\User;

class Balance extends Model
{
    public $timestamps = false;
    
    public function createHistoric(
        string $type,
        float $amount,
        float $total_before,
        float $total_after,
        string $date,
        int $user_id_transaction = null) : Historic
    {
        return
        auth()->user()->historics()->create // cria o histórico da transação
        ([
            'type'                  => $type,
            'amount'                => $amount,
            'total_before'          => $total_before,
            'total_after'           => $total_after,
            'user_id_transaction'   => $user_id_transaction,
            'date'                  => $date,
        ]);
    }
    
    /**
     * Função para manipulação da balança do usuário.
     *
     * @param callable $operation Esta função irá receber o saldo atual do usuário e ela
     * deve retornar o novo saldo do usuário de acordo com o valor da operação.
     * @param string $type Tipo da operação ['I' => input, 'O' => output, 'T' => transference].
     * @param float $value Valor da operação.
     * @param user_id_transaction Id de outro usuário que esteja relacionado com esta operação.
     * @param string $success_message Mensagem em caso de sucesso.
     * @param string $fail_message Mensagem em caso de falha.
     * @param string $exception_message Mensagem em caso de exceção por problemas no saldo.
     *
     * @return array Uma resposta do tipo ['success' => boolean, 'message' => string].
     */
    
    private function operate(
        callable $operation,
        string $type,
        float $value,
        int $user_id_transaction = null,
        string $success_message,
        string $fail_message,
        string $exception_message = 'No message')
    {
        $result = // resposta padrão
            [
                'success' => false,
                'message' => $fail_message
            ];
        
        try
        {
            // Se alguma exceção for lançada nesse bloco será feito um rollback automático.
            // A forma manual seria iniciar uma transação com o método DB::beginTransaction()
            // e depois, em algum momento, fazer o commit da transação ou o seu rollback com
            // os métodos DB::commit(), no primeiro caso, e DB::rollback() no segundo.
            DB::transaction
            (
                function () use ($operation, $type, $value, $user_id_transaction, &$result, $success_message, $exception_message)
                {
                    // é necessário checar se o amount está definido, pois pode ser a primeira
                    // vez que o usuário irá mexer no saldo
                    $oldAmount = ($this->amount ? $this->amount : 0); // guarda o saldo atual
                    
                    // realiza a operação passando o saldo atual
                    $this->amount = $operation($oldAmount);
                
                    if ($this->amount == null || $this->amount < 0)
                    {
                        $result['message'] = $exception_message;
                        
                        throw new \Exception($exception_message);
                    }
                    
                    $historic = $this->createHistoric(
                        $type,
                        $value,
                        $oldAmount,
                        $this->amount,
                        date('Ymd'),
                        $user_id_transaction >= 0 ? $user_id_transaction : null
                    ); // cria o histórico da transação
                
                    if ($this->save() && $historic) // tenta salvar a entidade no banco de dados
                    {
                        $result['success'] = true;
                        $result['message'] = $success_message;
                    }
                }
            );
        }
        
        catch (\Exception $e) { }
    
        return $result;
    }
    
    public function deposit(float $value, int $user_id_transaction = null) : Array
    {
        $result = // resposta padrão
            [
                'success' => false,
                'message' => 'Recarga falhou'
            ];
        
        if ($value > -1)
        {
            $result = $this->operate(
                function ($amount) use ($value)
                {
                    return $amount + $value;
                },
                'I',
                $value,
                $user_id_transaction,
                'Recarga bem sucedida',
                'Recarga falhou'
            );
        }
        
        return $result;
    }
    
    public function withdraw(float $value) : Array
    {
        $result = // resposta padrão
            [
                'success' => false,
                'message' => 'Falha ao retirar'
            ];
    
        if ($value > -1)
        {
            $result = $this->operate(
                function ($amount) use ($value)
                {
                    $new_amount = null;
                    
                    if ($amount >= $value)
                    {
                        $new_amount = $amount - $value;
                    }
                    
                    return $new_amount;
                },
                'O',
                $value,
                null,
                'Retirada bem sucedida',
                'Falha ao retirar',
                'Saldo insuficiente'
            );
        }
    
        return $result;
    }
    
    public function transfer(float $value, int $recipient_user_id)
    {
        $result = // resposta padrão
            [
                'success' => false,
                'message' => 'Falha ao transferir'
            ];
    
        if ($value > -1)
        {
            $result = $this->operate(
                function ($amount) use ($value, $recipient_user_id)
                {
                    $new_amount = null;
                    $user_to_send = User::find($recipient_user_id);
    
                    if ($user_to_send)
                    {
                        if ($amount >= $value)
                        {
                            $new_amount = $amount - $value;
                        }
                        
                        $balance_of_the_user_to_send = $user_to_send->balance()->firstOrCreate([]);
                        
                        if (!$balance_of_the_user_to_send->deposit($value, auth()->user()->id)['success'])
                        {
                            $new_amount = null;
                        }
                    }
                
                    return $new_amount;
                },
                'T',
                $value,
                $recipient_user_id,
                'Transferência bem sucedida',
                'Falha ao transferir'
            );
        }
    
        return $result;
    }
}