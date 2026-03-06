package br.com.app.butler.entity.mapper;

import br.com.app.butler.entity.dto.response.UserResponse;
import br.com.app.butler.entity.dto.utils.PlanSummary;
import br.com.app.butler.entity.model.UserModel;
import org.springframework.stereotype.Component;


@Component
public class UserMapper {

    public UserResponse userResponse(UserModel user) {
        return new UserResponse(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getRole(),
                user.getStatus(),
                new PlanSummary(
                        user.getPlan().getId(),
                        user.getPlan().getName(),
                        user.getPlan().getMaxAgents(),
                        user.getPlan().getMaxToolsPerAgent(),
                        user.getPlan().getActive()
                ),
                user.getCreatedAt()
        );
    }

}
