var scene;

var Main() = function () {
	this.canvas = document.getElementById("renderCanvas");

	if (!BABYLON.Engine.isSupport()) {
		window.alert('Browser not supported');
	}
	else {

		var engine = new BABYLON.Engine(canvas, true);

		var newScene = CreateGameScene(engine);

		newScene.activeCamera.attachControl(canvas);
        scene = newScene;

        // Once the scene is loaded, just register a render loop to render it
        engine.runRenderLoop(function () {
            if (scene)
                scene.render();
        });

        // Resize
        window.addEventListener("resize", function () {
            engine.resize();
        });

	}
};