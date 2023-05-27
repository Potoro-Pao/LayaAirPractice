import { ui } from "../ui/layaMaxUI"
export default class Loading extends ui.LoadingUI{

    public progressbar:Laya.ProgressBar
    constructor(){
            super()
            // let progressbar=this.getChildByName("ppp") as Laya.ProgressBar      
        }
    onEnable(): void {
        Laya.timer.loop(500,this,this.framework)
        
    }
    
    public framework(){
        let progressbar=this.getChildByName("ppp") as Laya.ProgressBar
        progressbar.value+=0.1
        if (progressbar.value==1){
            this.changeScene()
        }     
    }
    public changeScene(){    
            Laya.Scene.open("Game.scene");
            Laya.timer.clear(this, this.framework);//不清掉，會一直跑下去喔～
    }
    }