package miscillinous;

sealed class Vehicle permits Car, Bike{
}
non-sealed class Car extends Vehicle{}
sealed class Bike extends Vehicle permits SportsBike{}
//non-sealed class Bus extends Vehicle{}
final class SportBike extends Bike{}
class VintageCar extends Car{}
class EVCar extends Car{}
public class SealedClass{}