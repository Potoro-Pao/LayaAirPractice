(function () {
    'use strict';

    var Scene = Laya.Scene;
    var REG = Laya.ClassUtils.regClass;
    var ui;
    (function (ui) {
        class InstancePracticeUI extends Scene {
            constructor() { super(); }
            createChildren() {
                super.createChildren();
                this.loadScene("InstancePractice");
            }
        }
        ui.InstancePracticeUI = InstancePracticeUI;
        REG("ui.InstancePracticeUI", InstancePracticeUI);
    })(ui || (ui = {}));

    class TDM {
        constructor() {
            this.alphabetic = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
        }
        static init() {
            this.instance = new TDM();
        }
    }

    class GameController extends Laya.Script {
        constructor() {
            super(...arguments);
            this.textlist = [];
        }
        onEnable() {
            let text = this.owner.getChildByName("Words");
            this._text = text;
        }
        LoopThroughTextData() {
            this.textlist = [];
            console.log("btn pressed");
            for (this.item of TDM.instance.alphabetic) {
                this.textlist.push(this.item);
            }
            this._text.text = this.textlist.join(", ");
        }
    }

    class GameUI extends ui.InstancePracticeUI {
        constructor() {
            super();
            this.Controller1 = null;
            this.btn = this.Loopbtn;
            this._text = this.Words;
            this._text.fontSize = 60;
        }
        onEnable() {
            this.Controller1 = this.getComponent(GameController);
            this.btn.on(Laya.Event.CLICK, this, this.Controller1.LoopThroughTextData);
        }
    }

    class GameConfig {
        constructor() { }
        static init() {
            var reg = Laya.ClassUtils.regClass;
            reg("form/GameUI.ts", GameUI);
            reg("controller/control.ts", GameController);
        }
    }
    GameConfig.width = 800;
    GameConfig.height = 1200;
    GameConfig.scaleMode = "showall";
    GameConfig.screenMode = "horizontal";
    GameConfig.alignV = "top";
    GameConfig.alignH = "center";
    GameConfig.startScene = "InstancePractice.scene";
    GameConfig.sceneRoot = "";
    GameConfig.debug = false;
    GameConfig.stat = false;
    GameConfig.physicsDebug = false;
    GameConfig.exportSceneToJson = true;
    GameConfig.init();

    class Main {
        constructor() {
            TDM.init();
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
