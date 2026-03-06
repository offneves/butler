package br.com.app.butler.entity.dto.utils;

import br.com.app.butler.entity.enums.PlanType;


public record PlanSummary(

    Long id,
    String name,
    Integer maxAgents,
    Integer maxToolsPerAgent,
    Boolean active

) {}
