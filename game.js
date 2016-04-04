var CreateGameScene = function(engine) {
	var scene = new BABYLON.Scene(engine);
	var camera = new BABYLON.ArcRotateCamera("arcCamera", 1, 0.8, 50, new BABYLON.Vector3(0, 1, 0), scene);
	camera.keysUp = [];
	camera.keysDown = [];
	camera.keysLeft = [];
	camera.keysRight = [];

	var light1 = new BABYLON.PointLight("light1", new BABYLON.Vector3(-100, 150, 10), scene);

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

	var ground = BABYLON.Mesh.CreatePlane("ground", 500, scene);
    ground.rotation.x = Math.PI / 2;
    ground.position.y = -0.28;
    var matGround = new BABYLON.StandardMaterial("matGround", scene);
    matGround.diffuseTexture = new BABYLON.Texture("Assets/img/grass-texture.jpg", scene);
    matGround.diffuseTexture.uScale = 50;
    matGround.diffuseTexture.vScale = 50;
    ground.material = matGround;


    var skybox = BABYLON.Mesh.CreateBox("skyBox", 1000.0, scene);
    var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("Assets/skybox/skybox", scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skybox.material = skyboxMaterial;
    skybox.position.y = 5;


    // TRACK
    var track;
    track = new BABYLON.Mesh.CreatePlane("p1", 50, scene);
    track.rotation.x = Math.PI / 2;
    track.scaling.x = 0.5;
    track.scaling.y = 10;
    track.position.y = 0.05;
    var matTrack = new BABYLON.StandardMaterial("matTrack", scene);
    track.material = matTrack;
    track.material.emissiveColor = new BABYLON.Color3(0.2, 0.2, 0.2);
    track.material.diffuseColor = new BABYLON.Color3(0.3, 0.3, 0.3);
    track.material.diffuseTexture = new BABYLON.Texture("Assets/img/road.jpg", scene);
    track.material.diffuseTexture.vScale = 10;

    var borderMat = new BABYLON.StandardMaterial("borderMat", scene);
    borderMat.backFaceCulling = false;
    var border1 = new BABYLON.Mesh.CreatePlane("p1", 50, scene);
    border1.scaling.y = 0.1;
    border1.scaling.x = 10;

    border1.position.x = 12.5;
    border1.position.y = 0.05;

    border1.rotation.y = Math.PI / 2;
    border1.material = borderMat;

    var border2 = new BABYLON.Mesh.CreatePlane("p1", 50, scene);
    border2.scaling.y = 0.1;
    border2.scaling.x = 10;

    border2.position.x = -12.5;
    border2.position.y = 0.05;

    border2.rotation.y = Math.PI / 2;
    border2.material = borderMat;



    //CAR
    var tireFL; var tireFR;
    var tireRL; var tireRR;
    var allTires = new Array();
    var CreateTires = function () {

        var matTire = new BABYLON.StandardMaterial("matTire", scene);
        matTire.emissiveColor = new BABYLON.Vector3(0.4, 0.4, 0.4);

        tireFL = new BABYLON.Mesh.CreateBox("t1", 1.5, scene);
        tireFR = new BABYLON.Mesh.CreateBox("t2", 1.5, scene);
        tireRL = new BABYLON.Mesh.CreateBox("t3", 1.5, scene);
        tireRR = new BABYLON.Mesh.CreateBox("t4", 1.5, scene);

        tireFL.material = matTire;
        tireFR.material = matTire;
        tireRL.material = matTire;
        tireRR.material = matTire;

        tireFR.position = new BABYLON.Vector3(-3, 1, -2);
        tireFL.position = new BABYLON.Vector3(3, 1, -2);
        tireRR.position = new BABYLON.Vector3(-3, 1, 1.6);
        tireRL.position = new BABYLON.Vector3(3, 1, 1.6);

        allTires.push(tireFR);
        allTires.push(tireFL);
        allTires.push(tireRL);
        allTires.push(tireRR);
    }

    var centerCar; var boundingBox;
    var carMat;
    var CreateCar = function () {
        carMat = new BABYLON.StandardMaterial("carMat", scene);

        centerCar = new BABYLON.Mesh.CreateBox("center", 0.2, scene);

        boundingBox = new BABYLON.Mesh.CreateBox("main", 7, scene);
        boundingBox.visibility = 0.0;

        var car = new BABYLON.Mesh.CreateBox("main", 3, scene);
        car.scaling.z = 2.5;
        car.scaling.y = 0.4;
        car.scaling.x = 1.4;
        car.position.y = 1;

        car.parent = centerCar;
        car.material = carMat;

        var topCar = new BABYLON.Mesh.CreateBox("top", 3, scene);
        //topCar.scaling.z = 2;
        topCar.scaling.y = 0.6;
        topCar.position.y = 2;
        topCar.position.z = 1;

        topCar.parent = centerCar;
        topCar.material = carMat;

        CreateTires();


        tireFR.parent = centerCar;
        tireFL.parent = centerCar;
        tireRR.parent = centerCar;
        tireRL.parent = centerCar;
};