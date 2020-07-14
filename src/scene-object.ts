import { Scene } from "three";

export interface SceneObject {
    addToScene(scene: Scene): void;
}