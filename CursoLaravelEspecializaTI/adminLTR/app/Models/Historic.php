<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use App\User;

class Historic extends Model
{
    protected $fillable =
    [
        'type',
        'amount',
        'total_before',
        'total_after',
        'user_id_transaction',
        'date'
    ];
    
    public function scopeUserAuth($query)
    {
        return $query->where('user_id', auth()->user()->id);
    }
    
    public function type($type = null)
    {
        $possibleTypes = '';
        $types =
            [
                'I' => 'Entrada',
                'O' => 'Saque',
                'T' => 'Transferência'
            ];
        
        if (is_null($type))
        {
            $possibleTypes = $types;
        }
        
        else
        {
            // Checa se o tipo do histórico é INPUT e se existe algum id
            // nesse histórico que referencia outro usuário. Caso exista,
            // significa que essa "Entrada" foi transferida por outro
            // usuário para essa conta.
            if ($type == 'I' && !is_null($this->user_id_transaction))
            {
                $possibleTypes = 'Recebido';
            }
            
            else
            {
                $possibleTypes = $types[$type];
            }
        }
        
        return $possibleTypes;
    }
    
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    
    public function userTransaction()
    {
        return $this->belongsTo(User::class, 'user_id_transaction');
    }
    
    public function getDateAttribute($value)
    {
        return Carbon::parse($value)->format('d/m/Y');
    }
    
    public function search(Array $data, int $historicsPerPage)
    {
        return $this->where
        (
            function ($query) use ($data)
            {
                if ( isset($data['id']) )
                {
                    $query->where('id', $data['id']);
                }
                
                if ( isset($data['date']) )
                {
                    $query->where('date', $data['date']);
                }
                
                if ( isset($data['type']) )
                {
                    $query->where('type', $data['type']);
                }
            }
        )
        //->where('user_id', auth()->user()->id)
        ->userAuth()
        ->with(['userTransaction'])
        ->paginate($historicsPerPage);
    }
}
