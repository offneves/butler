package br.com.app.butler.entity.repository;

import br.com.app.butler.entity.model.LLMCredentialModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;


@Repository
public interface LLMCredentialRepository extends JpaRepository<LLMCredentialModel, Long> {

    List<LLMCredentialModel> findByUserId(Long userId);

}
