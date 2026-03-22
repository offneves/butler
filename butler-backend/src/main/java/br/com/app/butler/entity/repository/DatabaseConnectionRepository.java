package br.com.app.butler.entity.repository;

import br.com.app.butler.entity.model.DatabaseConnectionModel;
import org.springframework.data.jpa.repository.JpaRepository;


public interface DatabaseConnectionRepository extends JpaRepository<DatabaseConnectionModel, Long> {

}
