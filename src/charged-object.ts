import { Charge } from "./charge";
import { SceneObject } from "./scene-object";
import { Scene } from "three";

export enum ChargedObjectType {
    ISOLATOR,
    CONDUCTOR
}

export class ChargedObject implements SceneObject {
    
    charges: Charge[] = [];
    type: ChargedObject;

    addToScene(scene: Scene): void {
        this.charges.forEach(charge => charge.addToScene(scene));
    }
}