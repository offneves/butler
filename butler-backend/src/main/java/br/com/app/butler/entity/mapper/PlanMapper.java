package br.com.app.butler.entity.mapper;

import br.com.app.butler.entity.dto.response.PlanResponse;
import br.com.app.butler.entity.model.PlanModel;
import org.springframework.stereotype.Component;


@Component
public class PlanMapper {

    public PlanResponse planResponse(PlanModel planModel) {
        return new PlanResponse(
                planModel.getId(),
                planModel.getName(),
                planModel.getDescription(),
                planModel.getMaxAgents(),
                planModel.getMaxToolsPerAgent(),
                planModel.getActive(),
                planModel.getCreatedAt(),
                planModel.getUpdatedAt(),
                planModel.getExpiredAt()
        );
    }

}
