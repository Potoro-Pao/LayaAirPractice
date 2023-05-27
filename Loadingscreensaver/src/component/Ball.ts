export default class Ball{
    private _radius:number=50;
    private _x:number=100;
    private _y:number=100;
    private _speed_x=3
    private _speed_y=3
    private _speed=1
    private _sprite:Laya.Sprite=new Laya.Sprite
    private _scene:Laya.Scene
    constructor(scene:Laya.Scene){
        this._scene=scene
        scene.addChild(this._sprite)
        this._sprite.graphics.drawCircle(this._x,this._y,this._radius,"#0095DA")

    }
    public framework(){
        this._x+=this._speed_x
        this._y+=this._speed_y
        if (this._x>=this._scene.width-225){
            this._speed_x=-this._speed_x
        }
        if (this._x<=25){
            this._speed_x=-this._speed_x
        }
        if (this._y>=this._scene.height-50){
            this._speed_y=-this._speed_y
        }
        if (this._y<=25){
            this._speed_y=-this._speed_y
        }
        
        this._sprite.graphics.clear()
        this._sprite.graphics.drawCircle(this._x,this._y,this._radius,"#0095DA")
    }
    }
  