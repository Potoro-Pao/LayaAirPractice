export class TDM{
    public static instance:TDM
    public static init(){
        this.instance=new TDM()      
    }
    public TextA:Laya.Text;
    public alphabetic:string[]=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
}