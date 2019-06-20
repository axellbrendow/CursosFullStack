@extends('adminlte::page')

@section('title', 'Retirada')

@section('content_header')
    <h1>Fazer Retirada</h1>

    <ol class="breadcrumb">
        <li><a href="{{ route('admin.home') }}">Dashboard</a></li>
        <li><a href="{{ route('admin.balance') }}">Saldo</a></li>
        <li><a href="{{ route('balance.withdraw') }}">Retirar</a></li>
    </ol>
@stop

@section('content')
    <div class="box">

        <div class="box-header">
            <h3>Fazer Retirada</h3>
        </div>

        <div class="box-body">
            @include('admin.includes.alerts')
            
            <form method="post" action="{{ route('withdraw.store') }}">
                {!! csrf_field() !!}

                <div class="form-group">
                    <input type="text" name="value" placeholder="Valor retirada" class="form-control" autofocus>
                </div>

                <div class="form-group">
                    <button type="submit" class="btn btn-success">Sacar</button>
                </div>
            </form>
        </div>

    </div>
@stop