/**This class is automatically generated by LayaAirIDE, please do not make any modifications. */
import GameUI from "./form/GameUI"
import control from "./controller/control"
/*
* 游戏初始化配置;
*/
export default class GameConfig{
    static width:number=800;
    static height:number=1200;
    static scaleMode:string="showall";
    static screenMode:string="horizontal";
    static alignV:string="top";
    static alignH:string="center";
    static startScene:any="InstancePractice.scene";
    static sceneRoot:string="";
    static debug:boolean=false;
    static stat:boolean=false;
    static physicsDebug:boolean=false;
    static exportSceneToJson:boolean=true;
    constructor(){}
    static init(){
        var reg: Function = Laya.ClassUtils.regClass;
        reg("form/GameUI.ts",GameUI);
        reg("controller/control.ts",control);
    }
}
GameConfig.init();