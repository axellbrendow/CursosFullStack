<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateProfileFormRequest;

class UserController extends Controller
{
    public function profile()
    {
        return view('sites.profile.profile');
    }
    
    public function profileUpdate(UpdateProfileFormRequest $request)
    {
        $user = auth()->user();
        $data = $request->all();
        
        if ( !is_null($data['password']) )
        {
            $data['password'] = bcrypt($data['password']);
        }
        
        else
        {
            unset($data['password']);
        }
        
        if ($request->hasFile('image') && $request->file('image')->isValid())
        {
            if ($user->image)
            {
                $name = $user->image;
            }
            
            else
            {
                $name = $user->id.kebab_case($user->name);
            }
            
            $extension = $request->image->extension();
            $fileName = "{$name}.{$extension}";
            
            $data['image'] = $fileName;
            
            $upload = $request->image->storeAs('users', $fileName);
            
            if (!$upload)
            {
                $response = redirect()->back()
                    ->with('error', 'Falha ao fazer o upload da imagem');
            }
        }
        
        if (auth()->user()->update($data))
        {
            $response = redirect()->route('profile')
                ->with('success', 'Sucesso ao atualizar');
        }
        
        else
        {
            $response = redirect()->back()->with('error', 'Falha ao atualizar o perfil');
        }
        
        return $response;
    }
}
