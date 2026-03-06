package br.com.app.butler.entity.dto.utils;

import br.com.app.butler.entity.enums.LLMProvider;


public record LLMCredentialSummary(

    Long id,
    LLMProvider provider,
    String label,
    Boolean isDefault

) {}
