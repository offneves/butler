package br.com.app.butler.entity.exception;

public class PlanCannotBeNullException extends RuntimeException {

    public PlanCannotBeNullException(String message) {
        super (message);
    }

}
