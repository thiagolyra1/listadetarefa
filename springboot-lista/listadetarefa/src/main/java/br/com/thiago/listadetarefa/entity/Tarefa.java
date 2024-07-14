package br.com.thiago.listadetarefa.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Table(name = "tarefa")
@Getter
@Setter
public class Tarefa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;
    @Column(name = "titulo")
    private String titulo;
    @Column(name = "descricao")
    private String descricao;
    @Column(name = "finalizado")
    private boolean finalizado;
    @Column(name = "data_vencimento")
    private Date dataVencimento;
    @Column(name = "prioridade")
    private int prioridade;

}