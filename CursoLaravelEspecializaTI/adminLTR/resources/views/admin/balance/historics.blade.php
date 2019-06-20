@extends('adminlte::page')

@section('title', 'Histórico')

@section('content_header')
    <h1>Histórico de Movimentações</h1>

    <ol class="breadcrumb">
        <li><a href="{{ route('admin.home') }}">Dashboard</a></li>
        <li><a href="{{ route('admin.historic') }}">Histórico</a></li>
    </ol>
@stop

@section('content')
    <div class="box">

        <!-- <div class="box-header">
            <form action="{{ route('historic.search') }}" method="post" class="form form-inline">
                {!! csrf_field() !!}
                
                <input type="text" name="id" class="form-control" placeholder="ID">
                <input type="date" name="date" class="form-control">
                
                <select name="type" class="form-control">
                    <option value="">-- Selecione o tipo --</option>
                    
                    @foreach ($types as $key => $value)
                        <option value="{{ $key }}">{{ $value }}</option>
                    @endforeach
                </select>

                <button type="submit" class="btn btn-primary">Pesquisar</button>
                
            </form>
        </div> -->

        <div class="box-body">
            @include('admin.includes.alerts')
            
            <table id="tabela-paginacao" class="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Valor</th>
                        <th>Tipo</th>
                        <th>Data</th>
                        <th>?Remetente ou Destinatário?</th>
                    </tr>
                </thead>
                
                <tbody>
                    @forelse ($historics as $historic)
                    <tr>
                        <td>{{ $historic->id }}</td>
                        <td>{{ number_format($historic->amount, 2, ',', '.') }}</td>
                        <td>{{ $historic->type($historic->type) }}</td>
                        <td>{{ $historic->created_at }}</td>
                        <td>
                            @if ($historic->user_id_transaction)
                                {{ $historic->userTransaction->name }}
                            @else
                                -
                            @endif
                        </td>
                    </tr>
                    @empty
                    @endforelse
                </tbody>
            </table>
            
            @if (isset($formData))
                {!! $historics->appends($formData)->links() !!}
            @else
                {!! $historics->links() !!}
            @endif
        </div>

    </div>
@stop

@section('css')
    <link rel="stylesheet" href="https://cdn.datatables.net/1.10.10/css/jquery.dataTables.min.css">
@stop

@section('js')
    <script type="text/javascript" src="https://cdn.datatables.net/1.10.10/js/jquery.dataTables.min.js"></script>
    <script>
        $(document).ready(
            function()
            {
                $('#tabela-paginacao').DataTable(
                    {
                        "language": {
                            "sProcessing":   "A processar...",
                            "sLengthMenu":   "Mostrar _MENU_ registos",
                            "sZeroRecords":  "Não foram encontrados resultados",
                            "sInfo":         "Mostrando de _START_ até _END_ de _TOTAL_ registos",
                            "sInfoEmpty":    "Mostrando de 0 até 0 de 0 registos",
                            "sInfoFiltered": "(filtrado de _MAX_ registos no total)",
                            "sInfoPostFix":  "",
                            "sSearch":       "Procurar:",
                            "sUrl":          "",
                            "oPaginate": {
                                "sFirst":    "Primeiro",
                                "sPrevious": "Anterior",
                                "sNext":     "Seguinte",
                                "sLast":     "Último"
                            }
                        }
                    }
                );
            }
        );
    </script>
@stop