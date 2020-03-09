var press = false;
var run = false;

cc.Class({
    extends: cc.Component,

    properties: {
        Caballero: {
            default: null,
            type: cc.Node
        },
    },


    // use this for initialization
    onLoad() {
        //add keyboard input listener to call turnLeft and turnRight
        var anim = this.Caballero.getComponent(cc.Animation);
        this._playAnimCallback = function() {
            anim.play('PersonajeRun');
            //anim.play('PersonajeRun').WrapMode = cc.WrapMode.Loop;
        };

        this._stopAnimCallback = function() {
            anim.stop('PersonajeRun');
        };
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    },

    onDestroy() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    },

    onKeyDown(event) {

        var macro = cc.macro;
        switch (event.keyCode) {

            case macro.KEY.a:
            case macro.KEY.left:
                this.turnLeft();
                press = true;
                break;

            case macro.KEY.d:
            case macro.KEY.right:
                this.turnRight();
                press = true;
                break;

        }
    },

    // called every frame
    update(dt) {

        if (press) {
            this.Caballero.x += this.speed * dt;
            if (!run) {
                this.schedule(this._playAnimCallback);
                run = true;
            }
        } else {
            this.scheduleOnce(this._stopAnimCallback);
            run = false;
        }

        press = false;
    },

    turnLeft() {
        this.speed = -250;
        this.Caballero.scaleX = -0.2;
    },

    turnRight() {
        this.speed = 250;
        this.Caballero.scaleX = 0.2;
    }
});