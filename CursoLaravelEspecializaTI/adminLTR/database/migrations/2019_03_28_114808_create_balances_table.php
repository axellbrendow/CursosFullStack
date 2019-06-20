<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBalancesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('balances', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->unsigned();
            // references('id') faz com que a coluna 'user_id' desta tabela se conecte
            // à uma outra chamada 'id' de outra tabela.
            // on('users') faz com que essa conexão seja feita com a tabela 'users'.
            // onDelete('cascade') faz com que uma exclusão na tabela conectada gere
            // uma exclusão nesta tabela também.
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->double('amount', 10, 2)->default(0);
            /*$table->increments('id');
            $table->integer('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->enum('type', ['I', 'O', 'T']);
            $table->double('amount', 10, 2);
            $table->double('total_before', 10, 2);
            $table->double('total_after', 10, 2);
            $table->integer('user_id_transaction')->nullable();
            $table->date('date');
            $table->timestamps();*/
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('balances');
    }
}
