@extends('adminlte::page')

@section('title', 'Saldo')

@section('content_header')
    <h1>Saldo</h1>

    <ol class="breadcrumb">
        <li><a href="{{ route('admin.home') }}">Dashboard</a></li>
        <li><a href="{{ route('admin.balance') }}">Saldo</a></li>
    </ol>
@stop

@section('content')
    <div class="box">

        <div class="box-header">
            <a href="{{ route('balance.deposit') }}" class="btn btn-primary">
                <i class="mr-5 fa fa-cart-plus" style="margin-right: 1em;"></i>
                Recarregar
            </a>
            
            @if($amount > 0)
                <a href="{{ route('balance.withdraw') }}" class="btn btn-danger">
                    <i class="fa fa-cart-arrow-down" style="margin-right: 1em;"></i>
                    Sacar
                </a>
                
                <a href="{{ route('balance.transfer') }}" class="btn btn-info">
                    <i class="fa fa-exchange" style="margin-right: 1em;"></i>
                    Transferir
                </a>
            @endif
        </div>

        @include('admin.includes.alerts')

        <!-- small box -->
        <div class="small-box bg-green">
            <div class="inner">
                <h3>R$ {{ number_format($amount, 2, ',', '.') }}</h3>
            </div>

            <div class="icon">
                <i class="ion ion-cash"></i>
            </div>

            <a href="{{ route('admin.historic') }}" class="small-box-footer">
                Histórico <i class="fa fa-arrow-circle-right"></i>
            </a>
        </div>

    </div>
@stop