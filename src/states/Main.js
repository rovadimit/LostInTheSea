var mainState = {
    
    scoreText: null,
    arrowLeft: null,
    arrowRight: null,
    arrowUp: null,
    arrowDown: null,
    fishGroup: null,
    lineFormPoss1: [],
    lineFormPoss2: [],    
    arrowFormPoss1: [],    
    arrowFormPoss2: [],    
    crossFormPoss: [],    
    leftPos: [],
    rightPos: [],
    upPos: [],
    downPos: [],
    positions: [],
    formations: [],
    currentDir: true,
    answerDir: true,
    fishes: [],
    fishesArr: [],
    mainFish: null,

    create: function() {    

        var inGameBackground = game.add.tileSprite(0, 0, 800, 1280, 'inGameBackground');

        //score label
        this.scoreText = game.add.text(game.world.width / 2, 0, Score.toString(), {
            font: "bold 65px Arial",
            fill: "#ffffff"
        });
        this.scoreText.anchor.setTo(0.5, 0);

        
        //left and right key press methods
        var leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        leftKey.onDown.add(function() {this.chooseTrueFalse(3);}, this);
        
        var rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        rightKey.onDown.add(function() {this.chooseTrueFalse(1);}, this);

        var upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        upKey.onDown.add(function() {this.chooseTrueFalse(0);}, this);
        
        var downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        downKey.onDown.add(function() {this.chooseTrueFalse(2);}, this);

        //directions - up: 0, right: 1, down: 2, left: 3
        this.upPos = {scaleX: 1, scaleY: 1, angle: 90, dir: 0, axis: "y", move: -800};
        this.rightPos = {scaleX: -1, scaleY: 1, angle: 0, dir: 1, axis: "x", move: 800};
        this.downPos = {scaleX: 1, scaleY: 1, angle: -90, dir: 2, axis: "y", move: 800};
        this.leftPos = {scaleX: 1, scaleY: 1, angle: 0, dir: 3, axis: "x", move: -800};

        this.positions.push(this.upPos);
        this.positions.push(this.rightPos);
        this.positions.push(this.downPos);
        this.positions.push(this.leftPos);

        
        //left and right arrow
        this.arrowLeft = game.add.sprite(game.world.width / 2 - 50, game.world.height - 80, 'arrow');
        this.arrowLeft.anchor.setTo(0.5);
        this.arrowLeft.angle = 180;
        this.arrowLeft.tint = 0xffff00;

        this.arrowRight = game.add.sprite(game.world.width / 2 + 50, game.world.height - 80, 'arrow');
        this.arrowRight.anchor.setTo(0.5);
        this.arrowRight.tint = 0xffff00;

        this.arrowUp = game.add.sprite(game.world.width / 2, game.world.height - 130, 'arrow');
        this.arrowUp.anchor.setTo(0.5);
        this.arrowUp.angle = -90;
        this.arrowUp.tint = 0xffff00;

        this.arrowDown = game.add.sprite(game.world.width / 2, game.world.height - 30, 'arrow');
        this.arrowDown.anchor.setTo(0.5);
        this.arrowDown.angle = 90;
        this.arrowDown.tint = 0xffff00;


        this.lineFormPoss1 = [[800, 800, 800, 800, 800], [200, 300, 500, 600, 400], this.leftPos]; //center pos at the end        
        this.lineFormPoss2 = [[200, 300, 500, 600, 400], [800, 800, 800, 800, 800], this.upPos];        

        this.arrowFormPoss1 = [[0, 100, 100, 0, 200], [200, 300, 500, 600, 400], this.rightPos];        
        this.arrowFormPoss2 = [[200, 300, 500, 600, 400], [0, 100, 100, 0, 200], this.downPos];

        this.crossFormPoss = [[0, 100, 100, 200, 100], [400, 300, 500, 400, 400], this.rightPos];   

        this.formations.push(this.lineFormPoss1);
        this.formations.push(this.lineFormPoss2); 
        this.formations.push(this.arrowFormPoss1); 
        this.formations.push(this.arrowFormPoss2); 
        this.formations.push(this.lineFormPoss1);      

        for (var i = 0; i < 4; i++) {
            var fish = game.add.sprite(0, 0, 'fish1');
            fish.anchor.setTo(0.5);
            this.fishesArr.push(fish);
        }        

        this.mainFish = game.add.sprite(0, 0, 'fish');
        this.mainFish.anchor.setTo(0.5);

        this.newFishes();
    },

    newFishes: function() {  

        if (FishesIndex < 10) {

            var formation = this.formations[game.rnd.integerInRange(0, this.formations.length - 1)];   
            var mainFishDirection = this.positions[game.rnd.integerInRange(0, this.positions.length - 1)];

            this.currentDir = mainFishDirection.dir;

            for (var i = 0; i < 4; i++) {
                
                this.fishesArr[i].x = formation[0][i];
                this.fishesArr[i].y = formation[1][i];
                this.fishesArr[i].angle = formation[2].angle;
                this.fishesArr[i].scale.setTo(formation[2].scaleX, formation[2].scaleY);
            }

            this.mainFish.x = formation[0][4];
            this.mainFish.y = formation[1][4];
            this.mainFish.angle = mainFishDirection.angle;
            this.mainFish.scale.setTo(mainFishDirection.scaleX, mainFishDirection.scaleY);

            if (formation[2].axis === "x") {

                for (var i = 0; i < 4; i++) {
                    var swimTween = game.add.tween(this.fishesArr[i]).to({x: this.fishesArr[i].x + formation[2].move}, 5000, Phaser.Easing.Linear.None, true, 0);
                }
                //mainFish
                var swimTween = game.add.tween(this.mainFish).to({x: this.mainFish.x + formation[2].move}, 5000, Phaser.Easing.Linear.None, true, 0);
            }
            else {

                for (var i = 0; i < 4; i++) {
                    var swimTween = game.add.tween(this.fishesArr[i]).to({y: this.fishesArr[i].y + formation[2].move}, 5000, Phaser.Easing.Linear.None, true, 0);
                }
                //mainFish
                var swimTween = game.add.tween(this.mainFish).to({y: this.mainFish.y + formation[2].move}, 5000, Phaser.Easing.Linear.None, true, 0);
            }

            swimTween.onComplete.add(function(){
                this.newFishes();
            }, this);

            console.log("   main dir: " + mainFishDirection.dir);

            FishesIndex++;
        }
        else {
            console.log("gameover----------------------------------------");
            for (var i = 0; i < 4; i++) {
                this.fishesArr[i].destroy();
                this.fishesArr[i] = null;
            }

            var moveScoreDown = game.add.tween(this.scoreText).to({y: game.world.height / 2 - this.scoreText.height}, 300, Phaser.Easing.Linear.None, true, 0);
            moveScoreDown.onComplete.add(function() {
                game.add.tween(this.scoreText.scale).to({x: 3, y: 3}, 300, Phaser.Easing.Linear.None, true, 0);
            }, this);
            game.add.tween(this.arrowLeft).to({x: - game.world.width / 2}, 300, Phaser.Easing.Linear.None, true, 0);
            game.add.tween(this.arrowRight).to({x: game.world.width + game.world.width / 2}, 300, Phaser.Easing.Linear.None, true, 0);

            game.add.tween(this.arrowUp).to({y: - game.world.height / 2}, 300, Phaser.Easing.Linear.None, true, 0);
            game.add.tween(this.arrowDown).to({y: game.world.height + game.world.height / 2}, 300, Phaser.Easing.Linear.None, true, 0);
        }
    },

    chooseTrueFalse: function(choice) {

        if (!GameOver) {

            if (choice === this.currentDir) {
                //yes
                console.log("true");
                var checkmark = game.add.sprite(game.world.width / 2, game.world.height / 2, 'checkmark');
                checkmark.tint = 0x00ff00;
                checkmark.anchor.setTo(0.5, 0.5);
                checkmark.scale.setTo(0);
                var checkmarkTween = game.add.tween(checkmark.scale).to({x: 3, y: 3}, 200, Phaser.Easing.Linear.None)
                    .to({x: 0, y: 0}, 200, Phaser.Easing.Linear.None);
                checkmarkTween.onComplete.add(function() {checkmark.destroy();});
                checkmarkTween.start();
            }
            else {
                console.log("false");
                var cross = game.add.sprite(game.world.width / 2, game.world.height / 2, 'cross');
                cross.tint = 0xffff00;
                cross.anchor.setTo(0.5, 0.5);
                cross.scale.setTo(0);
                var crossTween = game.add.tween(cross.scale).to({x: 3, y: 3}, 200, Phaser.Easing.Linear.None)
                    .to({x: 0, y: 0}, 200, Phaser.Easing.Linear.None);
                crossTween.onComplete.add(function() {cross.destroy();});
                crossTween.start();
            }
        }
    }
};