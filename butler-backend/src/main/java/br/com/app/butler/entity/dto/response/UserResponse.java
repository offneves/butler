package br.com.app.butler.entity.dto.response;

import br.com.app.butler.entity.dto.utils.LLMCredentialSummary;
import br.com.app.butler.entity.dto.utils.PlanSummary;
import br.com.app.butler.entity.enums.UserRole;
import br.com.app.butler.entity.enums.UserStatus;
import java.time.LocalDateTime;


public record UserResponse(

    Long id,
    String username,
    String email,
    UserRole role,
    UserStatus status,
    PlanSummary plan,
    LocalDateTime createdAt

) {}
