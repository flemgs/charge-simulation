import { Charge, ChargeSign } from "./charge";
import { Vector2 } from "three";

export class PhysicsEngine {
    charges: Charge[];
    deltaTime =  1000 / 60;
    private intervalId: number;
    private squareSide = 100;
    private squareSide2 = this.squareSide / 2;

    start() {
        this.intervalId = setInterval(() => {
            const newCharges: Charge[] = []

            this.charges.forEach(charge => {
                newCharges.push(charge.copy());
            });

            for (let a = 0; a < this.charges.length; a++) {
                for (let b = 0; b < this.charges.length; b++) {
                    if (a !== b && this.charges[a].sign === ChargeSign.NEGATIVE) {
                        // apply force from charge B on charge A if A is negative.
                        const readChargeA = this.charges[a];
                        const readChargeB = this.charges[b];
                        const writeChargeA = newCharges[a];
                        const oppositeCharge = readChargeA.sign !== readChargeB.sign;
                        const distanceScalar = readChargeB.position.distanceTo(readChargeA.position);
                        const distanceVector: Vector2 = new Vector2()
                            .copy(readChargeB.position)
                            .sub(readChargeA.position);
                        const forceBonA: Vector2 = new Vector2()
                            .copy(distanceVector)
                            .divideScalar((distanceScalar * distanceScalar * distanceScalar) + 100)
                            .multiplyScalar(oppositeCharge ? 1 : -1)
                            .multiplyScalar(50000);
                        writeChargeA.acceleration.add(forceBonA);
                        const deltaSpeedA = new Vector2().copy(forceBonA).divideScalar(this.deltaTime);
                        writeChargeA.speed.add(deltaSpeedA);
                        const deltaPosition = new Vector2().copy(deltaSpeedA).divideScalar(this.deltaTime);
                        writeChargeA.position.add(deltaPosition);
                    }
                }
            }

            for (let i = 0; i < this.charges.length; i++) {
                this.charges[i].acceleration = newCharges[i].acceleration;
                this.charges[i].speed = newCharges[i].speed;
                this.charges[i].position = newCharges[i].position;
                this.charges[i].updateMeshPosition();
            }
        }, this.deltaTime);
    }

    end() {
        clearInterval(this.intervalId);
    }
}