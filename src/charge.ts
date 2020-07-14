
import { Color, SphereGeometry, MeshBasicMaterial, Mesh, Scene, Vector2 } from 'three';
import { SceneObject } from './scene-object';

export enum ChargeSign {
    POSITIVE,
    NEGATIVE
}

export class Charge implements SceneObject {
    public position: Vector2;
    public speed: Vector2;
    public acceleration: Vector2;
    public mesh: Mesh;

    constructor(public sign: ChargeSign) {
        this.position = new Vector2();
        this.speed = new Vector2();
        this.acceleration = new Vector2();
        let geometry = new SphereGeometry(5);
        let material = new MeshBasicMaterial();
        if (this.sign === ChargeSign.NEGATIVE) {
            material.color = new Color(0, 1, 0);
        } else {
            material.color = new Color(1, 0, 0);
        }
        this.mesh = new Mesh(geometry, material);
    }

    copy(): Charge {
        const copy = new Charge(this.sign);
        copy.position = new Vector2().copy(this.position);
        copy.speed = new Vector2().copy(this.speed);
        copy.acceleration = new Vector2().copy(this.acceleration);
        return copy;
    }

    addToScene(scene: Scene): void {
        scene.add(this.mesh);
    }

    updateMeshPosition(): void {
        this.mesh.position.x = this.position.x;
        this.mesh.position.y = this.position.y;
        this.mesh.position.z = this.sign === ChargeSign.NEGATIVE ? 1 : 0;
    }
}