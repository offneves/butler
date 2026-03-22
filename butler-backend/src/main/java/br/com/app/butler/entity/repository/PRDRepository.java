package br.com.app.butler.entity.repository;

import br.com.app.butler.entity.model.PRDModel;
import org.springframework.data.jpa.repository.JpaRepository;


public interface PRDRepository extends JpaRepository<PRDModel, Long> {

}
