import { ui } from "../ui/layaMaxUI";
import gamecontrol from "../controller/control";
export default class GameUI extends ui.InstancePracticeUI {
    public Controller1:gamecontrol=null;
    public btn:Laya.Button;
    public _text:Laya.Text;
    constructor() {
        super();
        this.btn=this.Loopbtn as Laya.Button
        this._text=this.Words as Laya.Text
        this._text.fontSize=60

}
    onEnable(): void {
        this.Controller1=this.getComponent(gamecontrol)
        this.btn.on(Laya.Event.CLICK,this,this.Controller1.LoopThroughTextData);
    }
}
