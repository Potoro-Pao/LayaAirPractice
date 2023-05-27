(function () {
    'use strict';

    var Scene = Laya.Scene;
    var REG = Laya.ClassUtils.regClass;
    var ui;
    (function (ui) {
        class GameUI extends Scene {
            constructor() { super(); }
            createChildren() {
                super.createChildren();
                this.loadScene("Game");
            }
        }
        ui.GameUI = GameUI;
        REG("ui.GameUI", GameUI);
        class LoadingUI extends Scene {
            constructor() { super(); }
            createChildren() {
                super.createChildren();
                this.loadScene("Loading");
            }
        }
        ui.LoadingUI = LoadingUI;
        REG("ui.LoadingUI", LoadingUI);
    })(ui || (ui = {}));

    class Ball {
        constructor(scene) {
            this._radius = 50;
            this._x = 100;
            this._y = 100;
            this._speed_x = 3;
            this._speed_y = 3;
            this._speed = 1;
            this._sprite = new Laya.Sprite;
            this._scene = scene;
            scene.addChild(this._sprite);
            this._sprite.graphics.drawCircle(this._x, this._y, this._radius, "#0095DA");
        }
        framework() {
            this._x += this._speed_x;
            this._y += this._speed_y;
            if (this._x >= this._scene.width - 225) {
                this._speed_x = -this._speed_x;
            }
            if (this._x <= 25) {
                this._speed_x = -this._speed_x;
            }
            if (this._y >= this._scene.height - 50) {
                this._speed_y = -this._speed_y;
            }
            if (this._y <= 25) {
                this._speed_y = -this._speed_y;
            }
            this._sprite.graphics.clear();
            this._sprite.graphics.drawCircle(this._x, this._y, this._radius, "#0095DA");
        }
    }

    class GameUI extends ui.GameUI {
        constructor() {
            super();
            let ball = new Ball(this);
            this._ball = ball;
            Laya.timer.loop(20, this, this.framework);
            Laya.timer.clear;
        }
        framework() {
            this._ball.framework();
        }
    }

    class Loading extends ui.LoadingUI {
        constructor() {
            super();
        }
        onEnable() {
            Laya.timer.loop(500, this, this.framework);
        }
        framework() {
            let progressbar = this.getChildByName("ppp");
            progressbar.value += 0.1;
            if (progressbar.value == 1) {
                this.changeScene();
            }
        }
        changeScene() {
            Laya.Scene.open("Game.scene");
            Laya.timer.clear(this, this.framework);
        }
    }

    class GameConfig {
        constructor() { }
        static init() {
            var reg = Laya.ClassUtils.regClass;
            reg("form/GameUI.ts", GameUI);
            reg("form/LoadingProgress.ts", Loading);
        }
    }
    GameConfig.width = 1000;
    GameConfig.height = 800;
    GameConfig.scaleMode = "showall";
    GameConfig.screenMode = "horizontal";
    GameConfig.alignV = "middle";
    GameConfig.alignH = "center";
    GameConfig.startScene = "Loading.scene";
    GameConfig.sceneRoot = "";
    GameConfig.debug = false;
    GameConfig.stat = false;
    GameConfig.physicsDebug = false;
    GameConfig.exportSceneToJson = true;
    GameConfig.init();

    class Main {
        constructor() {
            if (window["Laya3D"])
                Laya3D.init(GameConfig.width, GameConfig.height);
            else
                Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);
            Laya["Physics"] && Laya["Physics"].enable();
            Laya["DebugPanel"] && Laya["DebugPanel"].enable();
            Laya.stage.scaleMode = GameConfig.scaleMode;
            Laya.stage.screenMode = GameConfig.screenMode;
            Laya.stage.alignV = GameConfig.alignV;
            Laya.stage.alignH = GameConfig.alignH;
            Laya.URL.exportSceneToJson = GameConfig.exportSceneToJson;
            if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true")
                Laya.enableDebugPanel();
            if (GameConfig.physicsDebug && Laya["PhysicsDebugDraw"])
                Laya["PhysicsDebugDraw"].enable();
            if (GameConfig.stat)
                Laya.Stat.show();
            Laya.alertGlobalError(true);
            Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
        }
        onVersionLoaded() {
            Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
        }
        onConfigLoaded() {
            GameConfig.startScene && Laya.Scene.open(GameConfig.startScene);
        }
    }
    new Main();

}());
