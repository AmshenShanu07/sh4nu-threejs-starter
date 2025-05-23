import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import Cube from './Cube';


class World {
  clock = new THREE.Clock();
  sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
    pixelRatio: Math.min(window.devicePixelRatio, 2)
  }


  constructor() {
    this._init();    
    this._animate();

    addEventListener('resize', () => this._onResize());
  }

  _init () {
    this.canvas = document.querySelector('canvas.webgl');
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, this.sizes.width / this.sizes.height, 0.1, 1000);
    
    this.camera.position.x = 5;
    this.camera.position.y = 5;
    this.camera.position.z = 5;

    this.scene.add(this.camera);

    this.controls = new OrbitControls(this.camera, this.canvas);
    this.controls.enableDamping = true;

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    });
    this.renderer.setClearColor(0x20272F, 1);
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(this.sizes.pixelRatio);

    const gridHelper = new THREE.GridHelper(100,100);
    this.scene.add(gridHelper);


    this.cubeMesh = new Cube();
    this.scene.add(this.cubeMesh.mesh);
 
  }

  _onResize() {
    this.sizes.width = window.innerWidth;
    this.sizes.height = window.innerHeight;
    this.sizes.pixelRatio = Math.min(window.devicePixelRatio, 2);

    this.camera.aspect = this.sizes.width / this.sizes.height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(this.sizes.pixelRatio);
  }

  _animate() {
    requestAnimationFrame(() => this._animate());
    const elapsedTime = this.clock.getElapsedTime();

    this.cubeMesh.update();

    this.controls.update();
    this.renderer.render(this.scene, this.camera);

  }

}

export default World;