from gpiozero import Servo
from time import sleep

servo = Servo(25)
servo2 = Servo(8)

try:
	while True:
		servo.min()
		servo2.min()

		servo.mid()
		servo2.mid()

		servo.max()
		servo2.max()


finally:
	print("Cleaning up")