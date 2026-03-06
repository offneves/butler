package br.com.app.butler.entity.repository;

import br.com.app.butler.entity.model.PlanModel;
import org.springframework.data.jpa.repository.JpaRepository;


public interface PlanRepository extends JpaRepository<PlanModel, Long> {

    Boolean existsByName(String name);

}
