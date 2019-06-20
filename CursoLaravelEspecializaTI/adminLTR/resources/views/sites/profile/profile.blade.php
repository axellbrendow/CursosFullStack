@extends('sites.templates.app')

@section('title', 'Meu Perfil')

@section('content')

<h1>Meu Perfil</h1>

@include('admin.includes.alerts')

<form action="{{ route('profile.update') }}" method="post" enctype="multipart/form-data">
    {!! csrf_field() !!}
    
    <div class="form-group">
        <label for="name">Nome</label>
        <input type="text" value="{{ auth()->user()->name }}"name="name" placeholder="Nome" class="form-control">
    </div>

    <div class="form-group">
        <label for="email">E-mail</label>
        <input type="email" value="{{ auth()->user()->email }}"name="email" placeholder="E-mail" class="form-control">
    </div>

    <div class="form-group">
        <label for="password">Senha</label>
        <input type="password" name="password" placeholder="Senha" class="form-control">
    </div>

    <div class="form-group">
        @if (auth()->user()->image != null)
            <img src="{{ url('storage/users/'.auth()->user()->image) }}" alt="{{ auth()->user()->name }}" style="max-width: 50px">
        @endif
        
        <label for="image">Imagem</label>
        <input type="file" name="image" class="form-control">
    </div>

    <div class="form-group">
        <button type="submit" class="btn btn-info">Atualizar Perfil</button>
    </div>
</form>

@endsection

<?php
/*
<!doctype html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Laravel</title>

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Raleway:100,600" rel="stylesheet" type="text/css">

    <!-- Styles -->
    <style>
        html, body {
            background-color: #fff;
            color: #636b6f;
            font-family: 'Raleway', sans-serif;
            font-weight: 100;
            height: 100vh;
            margin: 0;
        }

        .full-height {
            height: 100vh;
        }

        .flex-center {
            align-items: center;
            display: flex;
            justify-content: center;
        }

        .position-ref {
            position: relative;
        }

        .top-right {
            position: absolute;
            right: 10px;
            top: 18px;
        }

        .content {
            text-align: center;
        }

        .title {
            font-size: 84px;
        }

        .links > a {
            color: #636b6f;
            padding: 0 25px;
            font-size: 12px;
            font-weight: 600;
            letter-spacing: .1rem;
            text-decoration: none;
            text-transform: uppercase;
        }

        .m-b-md {
            margin-bottom: 30px;
        }
    </style>
</head>
<body>
<div class="flex-center position-ref full-height">
    @if (Route::has('login'))
    <div class="top-right links">
        @auth
        <a href="{{ route('admin.home') }}">Home</a>
        <a href="{{ route('profile') }}">Meu Perfil</a>
        @else
        <a href="{{ route('login') }}">Login</a>
        <a href="{{ route('register') }}">Register</a>
        @endauth
    </div>
    @endif

    <div class="content">
        <div class="title m-b-md">
            Laravel
        </div>

        <div class="links">
            <a href="https://laravel.com/docs">Documentation</a>
            <a href="https://laracasts.com">Laracasts</a>
            <a href="https://laravel-news.com">News</a>
            <a href="https://forge.laravel.com">Forge</a>
            <a href="https://github.com/laravel/laravel">GitHub</a>
        </div>
    </div>
</div>
</body>
</html>
*/
?>