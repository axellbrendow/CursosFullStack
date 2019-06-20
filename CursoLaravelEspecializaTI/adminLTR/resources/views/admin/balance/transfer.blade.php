@extends('adminlte::page')

@section('title', 'Nova Transferência')

@section('content_header')
    <h1>Fazer Transferência</h1>

    <ol class="breadcrumb">
        <li><a href="{{ route('admin.home') }}">Dashboard</a></li>
        <li><a href="{{ route('admin.balance') }}">Saldo</a></li>
        <li><a href="{{ route('balance.transfer') }}">Transferir</a></li>
    </ol>
@stop

@section('content')
    <div class="box">

        <div class="box-header">
            <h3>Transferir Saldo (Informe o recebedor)</h3>
        </div>

        <div class="box-body">
            @include('admin.includes.alerts')
            
            <form method="post" action="{{ route('transfer.confirm') }}">
                {!! csrf_field() !!}

                <div class="form-group">
                    <input type="text" name="receiver_info" placeholder="Informação de quem irá receber (Nome ou E-mail)" class="form-control" autofocus>
                </div>

                <div class="form-group">
                    <button type="submit" class="btn btn-success">Próxima Etapa</button>
                </div>
            </form>
        </div>

    </div>
@stop