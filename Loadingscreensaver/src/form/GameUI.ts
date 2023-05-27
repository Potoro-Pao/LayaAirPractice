import { ui } from "../ui/layaMaxUI";
import Ball from "../component/Ball";
export default class GameUI extends ui.GameUI{
    private _ball:Ball
    constructor(){
        super()
        let ball:Ball=new Ball(this)
        this._ball=ball;
        Laya.timer.loop(20,this,this.framework)
        Laya.timer.clear
    }


    public framework(): void {
        this._ball.framework();
      }
}