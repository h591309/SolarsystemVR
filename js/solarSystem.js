"use strict";

import { AmbientLight, Color, Mesh, MeshBasicMaterial, MeshPhongMaterial, Object3D, PointLight, SphereGeometry, TextureLoader, TorusGeometry, Vector3 } from "./build/three.module.js";
import SimpleColorMaterial from "./simpleColorMaterial.js";

export default class SolarSystem {
    constructor(scene, camera) {
        let radius = 5;
        let widthSegments = 64;
        let heightSegments = 64;

        let sunConfig = {
            radius: 5
        }

        let earthConfig = {
            radius: 2.5,
            distance: 20
        };

        let moonConfig = {
            radius: 0.8,
            distance: 4
        }

        let marsConfig = {
            radius: 1,
            distance: 28
        }

        let venusConfig = {
            radius: 2.4,
            distance: 10
        }
        
        let jupiterConfig = {
            radius: 4,
            distance: 35
        }

        let saturnConfig = {
            radius: 3.5,
            distance: 45
        }

        /**
         * SUN
         */
        let sunGeometry = new SphereGeometry(sunConfig.radius, widthSegments, heightSegments);
        
        let sunTextureUrl = 'assets/texture_sun.jpg';
        let sunTexture = new TextureLoader().load(sunTextureUrl);

        /*
        let sunMaterial = new MeshBasicMaterial({
            map: sunTexture
        });
        */
        
        let sunBasicMaterial = new SimpleColorMaterial( {
            texture: sunTexture,
            color: new Color(0xffffff)
        });
        
        this.sun = new Mesh(sunGeometry, sunBasicMaterial);
        this.sun.position.z = -50;
        scene.add(this.sun);

        /**
         * EARTH
         */
        this.earthOrbitNode = new Object3D();
        this.sun.add(this.earthOrbitNode);

        let earthTextureUrl = 'assets/texture_earth.jpg';
        let earthTexture = new TextureLoader().load(earthTextureUrl);

        let earthMaterial = new MeshPhongMaterial({
            map: earthTexture,
            shininess: 1.0
        });

        let earthGeometry = new SphereGeometry(earthConfig.radius, widthSegments, heightSegments);

        this.earth = new Mesh(earthGeometry, earthMaterial);

        this.earth.position.x = earthConfig.distance;
        this.earthOrbitNode.add(this.earth);

         /**
         * MOON
         */
        this.moonOrbitNode = new Object3D();
        this.earth.add(this.moonOrbitNode);
        let moonTextureUrl = 'assets/8k_moon.jpeg';
        let moonTexture = new TextureLoader().load(moonTextureUrl);

        let moonMaterial = new MeshPhongMaterial({
            map: moonTexture,
            shininess: 0.8
        })

        let moonGeometry = new SphereGeometry(moonConfig.radius, widthSegments, heightSegments);
        this.moon = new Mesh(moonGeometry, moonMaterial);
        this.moon.position.x = moonConfig.distance;
        this.moonOrbitNode.add(this.moon);
        

        /**
         *  MARS
         */
        this.marsOrbitNode = new Object3D();
        this.sun.add(this.marsOrbitNode);
        let marsTextureUrl = 'assets/8k_mars.jpeg';
        let marsTexture = new TextureLoader().load(marsTextureUrl);

        let marsMaterial = new MeshPhongMaterial({
            map: marsTexture,
            shininess: 0.8
        });

        let marsGeometry = new SphereGeometry(marsConfig.radius, widthSegments, heightSegments);
        this.mars = new Mesh(marsGeometry, marsMaterial);
        this.mars.position.x = marsConfig.distance;
        this.marsOrbitNode.add(this.mars);

        /**
         *  VENUS
         */
        this.venusOrbitNode = new Object3D();
        this.sun.add(this.venusOrbitNode);
        let venusTextureUrl = 'assets/4k_venus_atmosphere.jpeg';
        let venusTexture = new TextureLoader().load(venusTextureUrl);

        let venusMaterial = new MeshPhongMaterial({
        map: venusTexture,
        shininess: 1
        });

        radius = 2.5;

        let venusGeometry = new SphereGeometry(venusConfig.radius, widthSegments, heightSegments);
        this.venus = new Mesh(venusGeometry, venusMaterial);
        this.venus.position.x = venusConfig.distance;
        this.venusOrbitNode.add(this.venus);

        /**
         *  JUPITER
         */
        this.jupiterOrbitNode = new Object3D();
        this.sun.add(this.jupiterOrbitNode);
        let jupiterTextureUrl = 'assets/8k_jupiter.jpeg';
        let jupiterTexture = new TextureLoader().load(jupiterTextureUrl);

        let jupiterMaterial = new MeshPhongMaterial({
        map: jupiterTexture,
        shininess: 1
        });

        radius = 2.5;

        let jupiterGeometry = new SphereGeometry(jupiterConfig.radius, widthSegments, heightSegments);
        this.jupiter = new Mesh(jupiterGeometry, jupiterMaterial);
        this.jupiter.position.x = jupiterConfig.distance;
        this.jupiterOrbitNode.add(this.jupiter);

        /**
         *  SATURN
         */
        this.saturnOrbitNode = new Object3D();
        this.sun.add(this.saturnOrbitNode);
        let saturnTextureUrl = 'assets/8k_saturn.jpeg';
        let saturnTexture = new TextureLoader().load(saturnTextureUrl);

        let saturnRingTextureUrl = 'assets/8k_saturn_ring_alpha.png';
        let saturnRingTexture = new TextureLoader().load(saturnRingTextureUrl);


        let saturnMaterial = new MeshPhongMaterial({
        map: saturnTexture,
        shininess: 1
        });

        let saturnRingMaterial = new MeshPhongMaterial({
            map: saturnRingTexture,
            shininess: 1
        });

        radius = 2.5;

        let saturnGeometry = new SphereGeometry(saturnConfig.radius, widthSegments, heightSegments);
        let saturnRingGeometry = new TorusGeometry(saturnConfig.radius + 5, widthSegments, heightSegments);

        this.saturn = new Mesh(saturnGeometry, saturnMaterial);
        this.saturnRing = new Mesh(saturnRingGeometry, saturnRingMaterial);
        this.saturn.position.x = saturnConfig.distance;
        this.saturnOrbitNode.add(this.saturn);

        /**
         * LIGHT
         */
        this.sunLight = new PointLight(0xffffff, 3);
        this.sun.add(this.sunLight);
        this.ambientLight = new AmbientLight(0xffffff, 0.05);
        scene.add(this.ambientLight);

        this.planets = {
            sun: this.sun,
            earth: this.earth,
            moon: this.moon,
            mars: this.mars,
            jupiter: this.jupiter,
            venus: this.venus,
            saturn: this.saturn,
        };
    }

    /**
     * 
     * @returns this.earthOrbitNode.position.xyz
     */
    getEarthPos() {
        return this.earthOrbitNode.position.xyz;
    }

    animate() {
        /**
         * SUN ROTATION
         */
        this.sun.rotation.y += 0.005;   

        /**
         * EARTH ROTATION
         */
        this.earthOrbitNode.rotation.y += 0.01;
        this.earth.rotation.y += 0.02;

        /**
         * MOON ROTATION
         */
        this.moonOrbitNode.rotation.y += 0.002;
        this.moon.rotation.y += 0.004;

        /**
         * MARS ROTATION
         */
        this.mars.rotation.y += 0.04;
        this.marsOrbitNode.rotation.y += 0.005;

        /**
         * VENUS ROTATION
         */
        this.venus.rotation.y += 0.04;
        this.venusOrbitNode.rotation.y += 0.03;

        /**
         * JUPITER ROTATION
         */
        this.jupiter.rotation.y += 0.02;
        this.jupiterOrbitNode.rotation.y += 0.003;

        /**
         * SATURN ROTATION
         */
         this.saturn.rotation.y += 0.03;
         this.saturnOrbitNode.rotation.y += 0.005;
    }
}