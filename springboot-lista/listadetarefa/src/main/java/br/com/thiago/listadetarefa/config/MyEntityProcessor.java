package br.com.thiago.listadetarefa.config;


import br.com.thiago.listadetarefa.entity.Tarefa;
import org.springframework.context.annotation.Configuration;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelProcessor;

@Configuration
public class MyEntityProcessor implements RepresentationModelProcessor<EntityModel<Tarefa>> {

    @Override
    public EntityModel<Tarefa> process(EntityModel<Tarefa> model) {
        return EntityModel.of(model.getContent());
    }
}
