package br.com.app.butler.entity.dto.request;

import br.com.app.butler.entity.enums.UserRole;
import br.com.app.butler.entity.enums.UserStatus;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;


public record UserRequest(

    @NotBlank
    @Email
    String email,

    @NotBlank
    String password,

    @NotBlank
    String username,

    UserRole role,

    UserStatus status,

    Long planId

) {}
