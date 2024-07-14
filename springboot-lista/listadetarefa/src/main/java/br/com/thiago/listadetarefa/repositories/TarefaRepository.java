package br.com.thiago.listadetarefa.repositories;

import br.com.thiago.listadetarefa.entity.Tarefa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TarefaRepository extends JpaRepository<Tarefa, Integer> {

    @Query(value = "SELECT * FROM TAREFA", nativeQuery = true)
    List<Tarefa> findAll();
}
