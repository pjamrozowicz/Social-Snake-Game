   'use strict';

        Physijs.scripts.worker = 'racing/js/physijs_worker.js';
        Physijs.scripts.ammo = 'ammo.js';



	var initScene, render,
		building1material,  building2material, wallRock, wallWood,
		renderer, render_stats, physics_stats, scene, ground, light, camera,
			vehicle_body, vehicle, loader;
	var stopwatch = false;
	var gameFinish = false;
	
	initScene = function() {

	    show();

		renderer = new THREE.WebGLRenderer({ antialias: true });
		renderer.setSize( window.innerWidth, window.innerHeight );
		renderer.shadowMap.enabled = true;
		renderer.shadowMapSoft = true;
		document.getElementById( 'viewport' ).appendChild( renderer.domElement );
		
		render_stats = new Stats();
		render_stats.domElement.style.position = 'absolute';
		render_stats.domElement.style.top = '1px';
		render_stats.domElement.style.zvehicle = 100;
		document.getElementById( 'viewport' ).appendChild( render_stats.domElement );

		physics_stats = new Stats();
		physics_stats.domElement.style.position = 'absolute';
		physics_stats.domElement.style.top = '50px';
		physics_stats.domElement.style.zvehicle = 100;
		document.getElementById( 'viewport' ).appendChild( physics_stats.domElement );
		
		scene = new Physijs.Scene;
		scene.setGravity(new THREE.Vector3( 0, -30, 0 ));

		scene.addEventListener(
			'update',
			function() {

				if ( input && vehicle ) {
					if ( input.direction !== null ) {
						input.steering += input.direction / 50;
						if ( input.steering < -.6 ) input.steering = -.6;
						if ( input.steering > .6 ) input.steering = .6;
					}else {
					    if (input.steering > 0){
                            input.steering=Math.abs(input.steering-0.01);

						}
						if(input.steering < 0){
                            input.steering=-Math.abs(input.steering+0.01);
						}
					}
                    vehicle.setSteering( input.steering, 0 );
					vehicle.setSteering( input.steering, 1 );

					if ( input.power === true ) {
						vehicle.applyEngineForce( 300 );
					} else if ( input.power === false ) {
						vehicle.applyEngineForce(-100)
					} else if ( input.power === null){
                        vehicle.applyEngineForce(0);
                        vehicle.setBrake(5, 2);
                        vehicle.setBrake(5, 3);


					}
				}

				scene.simulate( undefined, 2 );
				physics_stats.update();
			}
		);
		
		camera = new THREE.PerspectiveCamera(
			35,
			window.innerWidth / window.innerHeight,
			1,
			1000
		);
		scene.add( camera );
		
		// Light
		light = new THREE.DirectionalLight( 0xFFFFFF );
		light.position.set( -30, 50, - 35 );
		light.intensity = 1;
		light.target.position.copy( scene.position );
		light.castShadow = true;
		light.shadowCameraLeft = -150;
		light.shadowCameraTop = -150;
		light.shadowCameraRight = 150;
		light.shadowCameraBottom = 150;
		light.shadowCameraNear = 20;
		light.shadowCameraFar = 400;
		light.shadowBias = -.0001
		light.shadowMapWidth = light.shadowMapHeight = 2048;
		light.shadowDarkness = .7;
		scene.add( light );



		var input;

		// Loader
		loader = new THREE.TextureLoader();

		building1material = Physijs.createMaterial(
			new THREE.MeshLambertMaterial({ map: loader.load( 'racing/js/images/glass.jpg' ) }),
			.4, // low friction
			.6 // high restitution
		);


        building2material = Physijs.createMaterial(
            new THREE.MeshLambertMaterial({ map: loader.load( 'racing/js/images/building.jpg' ) }),
            .4, // low friction
            .6 // high restitution
        );


        wallRock = Physijs.createMaterial(
            new THREE.MeshLambertMaterial({ map: loader.load( 'racing/js/images/wall.jpg' ) }),
            .4, // low friction
            .6 // high restitution
        );


        wallWood = Physijs.createMaterial(
            new THREE.MeshLambertMaterial({ map: loader.load( 'racing/js/images/wooden.jpg' ) }),
            .4, // low friction
            .6 // high restitution
        );

        var start_material = Physijs.createMaterial(
            new THREE.MeshLambertMaterial({ map: loader.load( 'racing/js/images/start.jpg' ) }),.8,.4);

        var road_material = Physijs.createMaterial(
            new THREE.MeshLambertMaterial({ map: loader.load( 'racing/js/images/road.jpg' ) }),.8,.4);

        var road2_material = Physijs.createMaterial(
            new THREE.MeshLambertMaterial({ map: loader.load( 'racing/js/images/road2.jpg' ) }),.8,.4);

        var rocks_material = Physijs.createMaterial(
            new THREE.MeshLambertMaterial({ map: loader.load( 'racing/js/images/rocks.jpg' ) }),.8,.4);

        var turn1_material = Physijs.createMaterial(
            new THREE.MeshLambertMaterial({ map: loader.load( 'racing/js/images/turn1.png' ) }),.8,.4);

        var turn2_material = Physijs.createMaterial(
            new THREE.MeshLambertMaterial({ map: loader.load( 'racing/js/images/turn2.png' ) }),.8,.4);

        var turn3_material = Physijs.createMaterial(
            new THREE.MeshLambertMaterial({ map: loader.load( 'racing/js/images/turn3.png' ) }),.8,.4);

        var turn4_material = Physijs.createMaterial(
            new THREE.MeshLambertMaterial({ map: loader.load( 'racing/js/images/turn4.png' ) }),.8,.4);

        var finish_material = Physijs.createMaterial(
            new THREE.MeshLambertMaterial({ map: loader.load( 'racing/js/images/finish.jpg' ) }),.8,.4);


        var ground_geometry = new THREE.PlaneGeometry( 40, 40 );
        ground = new Physijs.HeightfieldMesh(ground_geometry,road_material,0);
        var ground_map = [
            ['start','rocks','rocks','rocks','rocks','rocks','rocks','rocks','rocks','rocks','rocks','rocks'],
            ['road','rocks','rocks','rocks','rocks','rocks','rocks','rocks','rocks','rocks','rocks','rocks'],
            ['turn1','road2','road2','turn2','rocks','rocks','rocks','rocks','rocks','rocks','rocks','rocks'],
            ['rocks','rocks','rocks','road','rocks','turn4','road2','road2','road2','turn2','rocks','rocks'],
            ['rocks','rocks','turn4','turn3','rocks','road','rocks','rocks','rocks','road','rocks','rocks'],
            ['rocks','rocks','road','rocks','rocks','road','rocks','rocks','rocks','road','rocks','rocks'],
            ['rocks','rocks','road','rocks','turn4','turn3','rocks','rocks','rocks','road','rocks','rocks'],
            ['rocks','rocks','turn1','road2','turn3','rocks','rocks','rocks','rocks','road','rocks','rocks'],
            ['rocks','rocks','rocks','rocks','rocks','rocks','rocks','rocks','turn4','turn3','rocks','rocks'],
            ['finish','road2','road2','road2','turn2','rocks','rocks','rocks','road','rocks','rocks','rocks'],
            ['rocks','rocks','rocks','rocks','turn1','road2','road2','road2','turn3','rocks','rocks','rocks'],
            ['rocks','rocks','rocks','rocks','rocks','rocks','rocks','rocks','rocks','rocks','rocks','rocks'],
        ];

        for(var i = 0; i < 12; i++){
            var z = 20 + 40*i;
            for(var j = 0; j < 12; j++){
                var x = 20 + 40*j;
                if(ground_map[i][j] === 'start'){
                    ground = new Physijs.HeightfieldMesh(ground_geometry,start_material,0);
                }else if(ground_map[i][j] === 'road'){
                    ground = new Physijs.HeightfieldMesh(ground_geometry,road_material,0);
                }else if(ground_map[i][j] === 'road2'){
                    ground = new Physijs.HeightfieldMesh(ground_geometry,road2_material,0);
                }else if(ground_map[i][j] === 'rocks'){
                    ground = new Physijs.HeightfieldMesh(ground_geometry,rocks_material,0);
                }else if(ground_map[i][j] === 'turn1'){
                    ground = new Physijs.HeightfieldMesh(ground_geometry,turn1_material,0);
                }else if(ground_map[i][j] === 'turn2'){
                    ground = new Physijs.HeightfieldMesh(ground_geometry,turn2_material,0);
                }else if(ground_map[i][j] === 'turn3'){
                    ground = new Physijs.HeightfieldMesh(ground_geometry,turn3_material,0);
                }else if(ground_map[i][j] === 'turn4'){
                    ground = new Physijs.HeightfieldMesh(ground_geometry,turn4_material,0);
                }else if(ground_map[i][j] === 'finish'){
                    ground = new Physijs.HeightfieldMesh(ground_geometry,finish_material,0);
                }
                ground.rotation.x = -Math.PI / 2;
                ground.position.x = x;
                ground.position.z = z;
                ground.receiveShadow = true;
                scene.add( ground );
            }
        }

        //building function
		//h - 0,1,2,3,4 multiply random for height
		//x,y - coordinates
		//type - 1/2 type of texture
		function setBuilding(h,x,y,type) {

            var height = Math.random()*h*10 + 30;
            var building = new Physijs.BoxMesh(
                new THREE.BoxGeometry( 40, height, 40 )
            );
            if(type%2===0){
                building.material = building1material;
            }else {
                building.material = building2material;
            }
            building.castShadow = building.receiveShadow = true;
            building.position.set(
                x,
                height/2 + 0.2,
                y
            );
            scene.add(building)
        };




		//all buildings

		setBuilding(5,20,140,2);
		setBuilding(2,60,140,1);
		setBuilding(0,100,140,2);

        setBuilding(5,180,140,1);
        setBuilding(2,180,180,1);
        setBuilding(0,140,220,2);

        setBuilding(3,220,300,1);

        setBuilding(2,260,180,2);
        setBuilding(2,300,180,1);
        setBuilding(2,340,180,2);

        setBuilding(2,420,140,1);
        setBuilding(2,420,180,1);
        setBuilding(2,420,220,2);
        setBuilding(2,420,260,2);
        setBuilding(2,420,300,1);
        setBuilding(2,420,340,2);

        setBuilding(2,140,420,1);
        setBuilding(2,180,460,1);
        setBuilding(2,220,460,2);
        setBuilding(2,260,460,2);
        setBuilding(2,300,460,1);
        setBuilding(2,340,460,2);


        function setWall(l, w, x, y, type) {

            var wall = new Physijs.BoxMesh(
                new THREE.BoxGeometry( l, 6, w )
            );
            wall.mass = 6000;
            if(type%2===0){
                wall.material = wallWood;
            }else {
                wall.material = wallRock;
            }
            wall.castShadow = wall.receiveShadow = true;
            wall.position.set(
                x,
                3.1,
                y
            );
            scene.add(wall);
        }

        setWall(0.5,80,40.2,40,1);

        setWall(0.5,80,160.2,80,2);

        setWall(0.5,40,120.2,260,1);

        setWall(0.5,80,240.3,240,2);

        setWall(0.5,120,360.2,260,1);

        setWall(200,0.5,100,320.2,2);





		var json_loader = new THREE.JSONLoader();

		json_loader.load( "racing/js/models/mustang.js", function( car, car_materials ) {
		    json_loader.load( "racing/js/models/mustang_wheel.js", function( wheel, wheel_materials ) {
				var mesh = new Physijs.BoxMesh(
					car,
					new THREE.MeshFaceMaterial( car_materials )
				);
				mesh.position.y = 2;
				mesh.position.x = 20;
				mesh.position.z = 10;
				mesh.castShadow = mesh.receiveShadow = true;

				vehicle = new Physijs.Vehicle(mesh, new Physijs.VehicleTuning(
					10.88,
					1.83,
					0.28,
					500,
					10.5,
					6000
				));
				scene.add( vehicle );

				var wheel_material = new THREE.MeshFaceMaterial( wheel_materials );

				for ( var i = 0; i < 4; i++ ) {
					vehicle.addWheel(
						wheel,
						wheel_material,
						new THREE.Vector3(
								i % 2 === 0 ? -1.6 : 1.6,
								-1,
								i < 2 ? 3.3 : -3.2
						),
						new THREE.Vector3( 0, -1, 0 ),
						new THREE.Vector3( -1, 0, 0 ),
						0.5,
						0.7,
						i < 2 ? false : true
					);
				}

				input = {
					power: null,
					direction: null,
					steering: 0
				};
				document.addEventListener('keydown', function( ev ) {
					switch ( ev.keyCode ) {
						case 37: // left
							input.direction = 1;
							break;

						case 38: // forward
							input.power = true;
							break;

						case 39: // right
							input.direction = -1;
							break;

						case 40: // back
							input.power = false;
							break;

            case 82: // resp
				reset();
            	stopwatch=false;
            	scene.remove(vehicle.wheels);
            	scene.remove(vehicle);

              var mesh = new Physijs.BoxMesh(
                car,
                new THREE.MeshFaceMaterial( car_materials )
              );
              mesh.position.y = 2;
              mesh.position.x = 20;
              mesh.position.z = 10;
              mesh.castShadow = mesh.receiveShadow = true;

              vehicle = new Physijs.Vehicle(mesh, new Physijs.VehicleTuning(
                10.88,
                1.83,
                0.28,
                500,
                10.5,
                6000
              ));
              scene.add( vehicle );

              var wheel_material = new THREE.MeshFaceMaterial( wheel_materials );

              for ( var i = 0; i < 4; i++ ) {
                vehicle.addWheel(
                  wheel,
                  wheel_material,
                  new THREE.Vector3(
                    i % 2 === 0 ? -1.6 : 1.6,
                    -1,
                    i < 2 ? 3.3 : -3.2
                  ),
                  new THREE.Vector3( 0, -1, 0 ),
                  new THREE.Vector3( -1, 0, 0 ),
                  0.5,
                  0.7,
                  i < 2 ? false : true
                );
              }
              break;

					}
				});
				document.addEventListener('keyup', function( ev ) {
					switch ( ev.keyCode ) {
						case 37: // left
							input.direction = null;
							break;

						case 38: // forward
							input.power = null;
							break;

						case 39: // right
							input.direction = null;
							break;

						case 40: // back
							input.power = null;
							break;
					}
				});
			});
		});

		requestAnimationFrame( render );
		scene.simulate();
	};
	
	render = function() {
		requestAnimationFrame( render );
		if (!stopwatch && !gameFinish && vehicle.mesh.position.z>40){
		    start();
		    stopwatch=true;
		}
		if (stopwatch && vehicle.mesh.position.x<40 && vehicle.mesh.position.z>360){
		    stop();
		    stopwatch = false;
		    gameFinish = true;

		}

		if ( vehicle ) {
			camera.position.copy( vehicle.mesh.position )
				.add( new THREE.Vector3( 0, 90, -40 ) );
			camera.lookAt( vehicle.mesh.position );

		}
		renderer.render( scene, camera);
		render_stats.update();
	};

	window.onload = initScene;