from gpiozero import Servo
from time import sleep

servo = Servo(25)
servo2 = Servo(8)

try:
	while True:
		servo.min()
		servo2.max()
		sleep(1)
		servo.mid()
		servo2.mid()
		sleep(1)
		servo.max()
		servo2.min()
		sleep(1)

		# servo2.max()
		# sleep(1)
		# servo2.mid()
		# sleep(1)
		# servo2.min()
		# sleep(1)



finally:
	print("Cleaning up")