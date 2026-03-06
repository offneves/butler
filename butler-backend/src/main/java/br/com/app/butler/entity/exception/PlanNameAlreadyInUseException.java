package br.com.app.butler.entity.exception;

public class PlanNameAlreadyInUseException extends RuntimeException {

    public PlanNameAlreadyInUseException(String message) {
        super(message);
    }

}
