package exceptionhandling;

public class VoterValidityException extends RuntimeException{
    public VoterValidityException(String msg){
    super(msg);
    }
}