//inicializnado o canvas
document.fonts.load('10pt "Orbitron"').then(inicializa);

function inicializa(){
    return true;
}

 
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext('2d');

    //preload das imagens
    const imageBackground = new Image();
    imageBackground.src = "./images/SpaceBackGround.jpg";

    const imageTitle = new Image();
    imageTitle.src = "./images/title.png";

    const imageShooter = new Image();
    imageShooter.src = "./images/playerShip1_red.png";

    const imageAlienLevel1 = new Image();
    imageAlienLevel1.src = "./images/shipYellow_manned.png";

    const imageAlienLevel2 = new Image();
    imageAlienLevel2.src = "./images/shipBlue_manned.png";

    const imageAlienLevel3 = new Image();
    imageAlienLevel3.src = "./images/shipGreen_manned.png";

    const imageLaserShooter = new Image();
    imageLaserShooter.src = "./images/laserRed01.png";

    const imageLaserShooterFailed = new Image();
    imageLaserShooterFailed.src = "./images/laserRed10.png";

    const imageLaserAlien = new Image();
    imageLaserAlien.src = "./images/laserBlue03.png";

    const imageBlock = new Image();
    imageBlock.src = "./images/block3.svg";

    const imageAlienBoss = new Image();
    imageAlienBoss.src = "./images/ufoYellow.png";

    const imageKeyboard = new Image();
    imageKeyboard.src = "./images/keyboard.png";

    const audioShooter = new Audio();
    audioShooter.src =  "./audio/FX061.mp3";
<<<<<<< HEAD
    audioShooter.volume = 0.5;

    const audioAlienShot = new Audio();
    audioAlienShot.src = "./audio/FX064.mp3";
    audioAlienShot.volume = 0.5;
=======
    audioShooter.volume = 0.2;

    const audioAlienShot = new Audio();
    audioAlienShot.src = "./audio/FX064.mp3";
    audioAlienShot.volume = 0.7;
>>>>>>> master

    const audioShooterExplosion = new Audio();
    audioShooterExplosion.src = "./audio/Explosion.mp3";
    audioShooterExplosion.volume = 0.5;

    const audioAlienExplosion = new Audio();
    audioAlienExplosion.src = "./audio/explosion.wav";
<<<<<<< HEAD
    audioAlienExplosion.volume = 0.5;

    const audioBoss = new Audio();
    audioBoss.src = "./audio/space1.mp3"
=======
    audioAlienExplosion.volume = 0.1;

    const audioBoss = new Audio();
    audioBoss.src = "./audio/space1.mp3";
>>>>>>> master
    audioBoss.volume = 0.5;

    const fontName = "Orbitron";

    window.addEventListener('load', ()=>{
        game = new Game(canvas,ctx,imageBackground,imageTitle,fontName);
        game.splashScreen();

        document.addEventListener("keydown",(event)=>{
            switch(event.key){
                case "Enter":
                    if(game.frame ===0){
                        game.start(imageShooter);
                    }
                    break;
                case "ArrowLeft":
                    game.shooter.goLeft();
                    break;
                case "ArrowRight":
                    game.shooter.goRight();
                    break;
                case "ArrowUp":
                    game.shooter.fire();
                    break;
                case "ArrowDown":
                    game.shooter.stop();
                    break;    
                case " ":
                    if(!game.shooter.lifes){
                        game = new Game(canvas,ctx,imageBackground,imageTitle,fontName);
                        game.splashScreen();
                    }    
                    break;
                default:
                    return;            
            }
        });
    });




function update(){
    game.update();
}