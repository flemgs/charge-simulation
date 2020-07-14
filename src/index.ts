import { Charge, ChargeSign } from './charge';
import { ChargedObject } from './charged-object';
import { WebGLRenderer, OrthographicCamera, Scene, Vec2, Vector2 } from 'three';
import { PhysicsEngine } from './physics-engine';

// document.getElementsByTagName('h1')[0].innerHTML = "Hello, TypeScript+webpack World!";

const renderer = new WebGLRenderer( { antialias: true } );
const rendererWidth = window.innerWidth;
const rendererHeight = window.innerHeight;
const camera = new OrthographicCamera(- rendererWidth / 2, rendererWidth / 2, - rendererHeight / 2, rendererHeight / 2, -10000, 10000 );
const scene = new Scene();
const chargedObject = new ChargedObject();
const physicsEngine = new PhysicsEngine();

 
init();
animate();

 
function init() {
    renderer.setSize( rendererWidth, rendererHeight );
    document.body.appendChild( renderer.domElement );

    addCharge(ChargeSign.NEGATIVE, new Vector2(-40, 0));
    addCharge(ChargeSign.NEGATIVE, new Vector2(-20, 0));
    addCharge(ChargeSign.POSITIVE, new Vector2(0, 0));
    addCharge(ChargeSign.POSITIVE, new Vector2(20, 0));
    chargedObject.addToScene(scene);
    physicsEngine.charges = chargedObject.charges;
    physicsEngine.start();
}

function addCharge(sign: ChargeSign, position?: Vector2) {
    const charge = new Charge(sign);
    if (position) {
        charge.position = position;
    } else {
        const randX = (-0.5 + Math.random()) * 100;
        const randY = (-0.5 + Math.random()) * 100;
        charge.position.x = randX;
        charge.position.y = randY; 
    }
    chargedObject.charges.push(charge);
}

function addCharges(count: number, sign: ChargeSign) {
    for (let i = 0; i < count; i++) {
        addCharge(sign);
    }  
}

function animate() {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
}
