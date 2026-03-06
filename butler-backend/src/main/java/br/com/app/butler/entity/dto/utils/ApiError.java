package br.com.app.butler.entity.dto.utils;

import java.time.LocalDateTime;


public record ApiError(
        Integer httpCode,
        String httpMessage,
        String message,
        LocalDateTime timestamp) {

}
