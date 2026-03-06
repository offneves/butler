package br.com.app.butler.entity.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;


public record PlanRequest(

        Long id,

        @NotNull
        String name,

        @NotBlank
        String description,

        @NotNull
        Boolean active,

        @NotNull
        Integer maxAgents,

        @NotNull
        Integer maxToolsPerAgent

) {}
