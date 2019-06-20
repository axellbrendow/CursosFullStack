<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Balance;
use App\Models\Historic;
use App\User;
use App\Http\Requests\MoneyValidationFormRequest;

class BalanceController extends Controller
{
    private $historicsPerPage = 5;
    
    public function index()
    {
        $balance = auth()->user()->balance;
        $amount = $balance ? $balance->amount : 0;

        // a função compact() cria um arranjo em que as chaves são os
        // parâmetros que ela recebe e os valores são os valores das
        // variáveis representadas pelos parâmetros
        return view('admin.balance.index', compact('amount'));
    }
    
    /**
     * Função genérica para realização de alguma ação no Balance de um
     * usuário.
     *
     * @param MoneyValidationFormRequest $request
     * @param Authenticatable $user
     * @param callable $balanceAction função que recebe o Balance do
     * usuário como parâmetro e o utiliza para fazer algo que retorne
     * uma resposta do tipo ['success' => boolean, 'message' => string].
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    
    public function doActionInBalance(
        MoneyValidationFormRequest $request,
        Authenticatable $user,
        callable $balanceAction)
    {
        $response = $balanceAction( $user->balance()->firstOrCreate([]) );
        
        if ($response['success'])
        {
            $redirectResponse = redirect()
                ->route('admin.balance')
                ->with('success', $response['message']);
        }
        
        else
        {
            $redirectResponse = redirect()->back()->with('error', $response['message']);
        }
        
        return $redirectResponse;
    }
    
    public function deposit()
    {
        return view('admin.balance.deposit');
    }
    
    public function depositStoreUser(MoneyValidationFormRequest $request, Authenticatable $user)
    {
        return $this->doActionInBalance($request, $user,
            function ($balance) use($request)
            {
                return $balance->deposit($request->value);
            });
    }

    public function depositStore(MoneyValidationFormRequest $request)
    {
        return $this->depositStoreUser($request, auth()->user());
    }
    
    public function withdraw()
    {
        return view('admin.balance.withdraw');
    }
    
    public function withdrawStoreUser(MoneyValidationFormRequest $request, Authenticatable $user)
    {
        return $this->doActionInBalance($request, $user,
            function ($balance) use($request)
            {
                return $balance->withdraw($request->value);
            });
    }
    
    public function withdrawStore(MoneyValidationFormRequest $request)
    {
        return $this->withdrawStoreUser($request, auth()->user());
    }
    
    public function transfer()
    {
        return view('admin.balance.transfer');
    }
    
    public function confirmTransfer(Request $request, User $user)
    {
        $receiver = $user->getReceiver($request->receiver_info);
        
        if (empty($receiver) || auth()->user()->id === $receiver->id)
        {
            $response = redirect()->back()->with('error', 'Usuário não encontrado');
        }
        
        else
        {
            $user_balance = auth()->user()->balance;
            
            $response = view('admin.balance.transfer-confirm',
                compact(['receiver', 'user_balance']));
        }
        
        return $response;
    }
    
    public function transferStoreUser(MoneyValidationFormRequest $request, Authenticatable $user)
    {
        return $this->doActionInBalance($request, $user,
            function ($balance) use($request)
            {
                return $balance->transfer($request->value, $request->receiver_id);
            });
    }
    
    public function transferStore(MoneyValidationFormRequest $request)
    {
        return $this->transferStoreUser($request, auth()->user());
    }
    
    public function historic(Historic $historic)
    {
        $historics = auth()
            ->user()
            ->historics()
            ->with(['userTransaction'])
            ->paginate($this->historicsPerPage);
        
        $types = $historic->type();
        
        return view('admin.balance.historics', compact('historics', 'types'));
    }
    
    public function searchHistoric(Request $request, Historic $historic)
    {
        $formData = $request->except('_token');
        
        $historics = $historic->search($formData, $this->historicsPerPage);
        
        $types = $historic->type();
        
        return view(
            'admin.balance.historics',
            compact('historics', 'types', 'formData')
        );
    }
}
