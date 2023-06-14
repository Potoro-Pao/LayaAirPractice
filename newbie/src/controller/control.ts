import { TDM } from "../model/TestDataModel";

export default class GameController extends Laya.Script {
    public item: string;
    public _text: Laya.Text;
    public textlist: string[] = [];

    onEnable() {
        let text = this.owner.getChildByName("Words") as Laya.Text;
        
        this._text = text;
    }

    LoopThroughTextData(): void {
        this.textlist=[]
        console.log("btn pressed");
        
        for (this.item of TDM.instance.alphabetic) {
            this.textlist.push(this.item);
        }
        this._text.text = this.textlist.join(", ");
    }
}
