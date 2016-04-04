var box;
var scene;
var camera;
var CreateScene = function(engine)
window.addEventListener('DOMContentLoaded', function(){
            // get the canvas DOM element
            var canvas = document.getElementById('renderCanvas');

            // load the 3D engine
            var engine = new BABYLON.Engine(canvas, true);

            // createScene function that creates and return the scene
            var createScene = function(){
                // create a basic BJS Scene object
                scene = new BABYLON.Scene(engine);

                // create a FreeCamera, and set its position to (x:0, y:5, z:-10)
                //var camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5,-10), scene);
                camera = new BABYLON.FollowCamera("FollowCam", new BABYLON.Vector3(0, 0, 0), scene);
                
                // target the camera to scene origin
                //camera.setTarget(BABYLON.Vector3.Zero());

                // attach the camera to the canvas
                //camera.attachControl(canvas, false);

                // create a basic light, aiming 0,1,0 - meaning, to the sky
                var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0,1,0), scene);

                // create a built-in "sphere" shape; its constructor takes 5 params: name, width, depth, subdivisions, scene
                //var sphere = BABYLON.Mesh.CreateSphere('sphere1', 16, 2, scene);
               
                // create a built-in "ground" shape; its constructor takes the same 5 params as the sphere's one
                var ground = BABYLON.Mesh.CreateGround('ground1', 6, 6, 2, scene);


                var skybox = BABYLON.Mesh.CreateBox("skyBox", 100.0, scene);
				var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
				skyboxMaterial.backFaceCulling = false;
				skyboxMaterial.disableLighting = true;
				skybox.material = skyboxMaterial;

				//skybox.infiniteDistance = true;

				skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
				skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);

				skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("textures/skyBox", scene);
				skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;

				skybox.renderingGroupId = 0;

                // return the created scene
                return scene;
            }

            // call the createScene function
            var scene = createScene();

            // run the render loop
            engine.runRenderLoop(function(){
                scene.render();
            });

            // the canvas/window resize event handler
            window.addEventListener('resize', function(){
                engine.resize();
            });
        });

        var accelerate = false;
        var reverse = false;
        window.addEventListener("keydown", function(evt) {

            if(evt.keyCode == 87) {
                accelerate = true;
                reverse = false;
            }
            if(evt.keyCode == 83) {
                accelerate = false;
                reverse = true;
            }

        });
        window.addEventListener("keyup", function(evt) {

            if(evt.keyCode == 87) {
                accelerate = false;
                reverse = false;
            }
            if(evt.keyCode == 83) {
                accelerate = false;
                reverse = false;
            }


        });
        var speedForward = 0;
        var speedBackward = 0;
        scene.registerBeforeRender(function() {
            if(scene.isReady()) {

                if (accelerate && speedForward < 0.5 && speedBackward == 0)
                    speedForward += 0.02;
                else if (speedForward > 0 && reverse)
                    speedForward -= 0.03;
                else if (speedFoward > 0 && !reverse)
                    speedForward -= 0.01;

                if (reverse && speedBackward < 0.5 && speedForward == 0)
                    speedBackward += 0.02;
                else if (speedBackward > 0 && accelerate)
                    speedBackward -= 0.03;
                else if (speedBackward > 0 && !accelerate)
                    speedBackward -= 0.01;

            }

        });
        var CreateBox = function() {
            box = BABYLON.Mesh.CreateBox('box1', 3, scene, false, 10);
            var boxMaterial = new BABYLON.StandardMaterial("texture3", scene);
            boxMaterial.diffuseTexture = new BABYLON.Texture("textures/tatsu.jpg", scene);
                // move the sphere upward 1/2 of its height
                //sphere.position.y = 1;
            box.material = boxMaterial;
            box.position.y = 1.5;

            camera.target = box;
        }
        CreateBox();