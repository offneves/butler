package br.com.app.butler.entity.repository;

import br.com.app.butler.entity.model.ToolModel;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ToolRepository extends JpaRepository<ToolModel, Long> {

}
