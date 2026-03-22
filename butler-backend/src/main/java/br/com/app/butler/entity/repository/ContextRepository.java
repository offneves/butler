package br.com.app.butler.entity.repository;

import br.com.app.butler.entity.model.ContextModel;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ContextRepository extends JpaRepository<ContextModel, Long> {

}
