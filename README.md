# listadetarefa
Desafio media4all

back-end (Springboot 3.3.1) está na branch main e o front-end (Angular 16) está na branch master.


Esse foi o banco de dados criado no MySQL Workbench:

CREATE USER 'tarefaapp'@'localhost' IDENTIFIED BY 'tarefaapp';

GRANT ALL PRIVILEGES ON * . * TO 'tarefaapp'@'localhost';

ALTER USER 'tarefaapp'@'localhost' IDENTIFIED WITH mysql_native_password BY 'tarefaapp';

DROP DATABASE IF EXISTS `tarefa-app`;

CREATE DATABASE `tarefa-app`;

USE `tarefa-app` ;

CREATE TABLE IF NOT EXISTS `tarefa-app`.`tarefa` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `titulo` VARCHAR(255) DEFAULT NULL,
  `descricao` VARCHAR(255) DEFAULT NULL,
  `finalizado` BIT DEFAULT 1,
  `data_vencimento` DATETIME(6) DEFAULT NULL,
  `prioridade` INT DEFAULT NULL,
  PRIMARY KEY (`id`)
)
ENGINE=InnoDB
AUTO_INCREMENT = 1;
