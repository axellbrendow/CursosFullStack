@extends('adminlte::page')

@section('title', 'Confirmar Transferência')

@section('content_header')
    <h1>Confirmar Transferência</h1>

    <ol class="breadcrumb">
        <li><a href="{{ route('admin.home') }}">Dashboard</a></li>
        <li><a href="{{ route('admin.balance') }}">Saldo</a></li>
        <li><a href="{{ route('balance.transfer') }}">Transferir</a></li>
        <li><a href="{{ route('transfer.confirm') }}">Confirmação</a></li>
    </ol>
@stop

@section('content')
    <div class="box">

        <div class="box-header">
            <h3>Transferir Saldo</h3>
        </div>

        <div class="box-body">
            @include('admin.includes.alerts')
            
            <p> <strong>Recebedor: </strong> {{ $receiver->name }} </p>
            <p> <strong>Seu Saldo Atual: </strong> {{ number_format($user_balance->amount, 2, ',', '.') }} </p>
            
            <form method="post" action="{{ route('transfer.store') }}">
                {!! csrf_field() !!}

                <input type="hidden" name="receiver_id" value="{{ $receiver->id }}">
                
                <div class="form-group">
                    <input type="text" name="value" placeholder="Valor" class="form-control" autofocus>
                </div>

                <div class="form-group">
                    <button type="submit" class="btn btn-success">Transferir</button>
                </div>
            </form>
        </div>

    </div>
@stop