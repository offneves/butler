package br.com.app.butler.entity.repository;

import br.com.app.butler.entity.model.AgentModel;
import org.springframework.data.jpa.repository.JpaRepository;


public interface AgentRepository extends JpaRepository<AgentModel, Long> {

}
