package br.com.app.butler.entity.exception;

public class PlanRequestMismatchException extends RuntimeException{

    public PlanRequestMismatchException(String message) {
        super(message);
    }

}
