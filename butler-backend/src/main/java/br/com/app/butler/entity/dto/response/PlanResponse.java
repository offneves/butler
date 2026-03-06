package br.com.app.butler.entity.dto.response;

import java.time.LocalDateTime;


public record PlanResponse(

        Long id,
        String name,
        String description,
        Integer maxAgents,
        Integer maxToolsPerAgent,
        Boolean active,
        LocalDateTime createdAt,
        LocalDateTime updatedAt,
        LocalDateTime expiredAt

) {}
