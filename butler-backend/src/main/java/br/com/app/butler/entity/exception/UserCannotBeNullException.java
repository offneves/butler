package br.com.app.butler.entity.exception;

public class UserCannotBeNullException extends RuntimeException {

    public UserCannotBeNullException(String message) {
        super(message);
    }

}
