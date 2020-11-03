class Game{
    constructor(canvas,context,backGround,title,fontName){
        this.canvas = canvas;
        this.ctx = context;
        this.backGround = backGround;
        this.title = title;
        this.font = fontName;
        this.new();
    }

    new(){
        this.intervalId = 0;
        this.horde = [];
        this.frame = 0;
        this.points = 0;
    }


    splashScreen(){
        this.ctx.fillStyle = "#FFFFFF";
        this.ctx.font = "40px Orbitron";
        this.ctx.drawImage(this.backGround,0,0,this.canvas.width,this.canvas.height);
        this.ctx.fillStyle = "#FFFFFF";
        this.ctx.font = "normal 40px Orbitron";
        this.ctx.fillText('Press Start to Play!',180,350);
        this.ctx.drawImage(this.title,(this.canvas.width-500)/2,40,500,210);
        
    }
   start(imageShooter){
        this.shooter = new Shooter(imageShooter,(this.canvas.width-50)/2,this.canvas.height-60);
        this.horde = new Horde();
        this.shield = new Shield(50);
        this.update();
    }
    update(){
        this.frame++;
        this.shooter.move();
        this.ctx.drawImage(this.backGround,0,0,this.canvas.width,this.canvas.height);
        for(let i=0;i< this.shooter.lifes;i++){
            this.ctx.drawImage(this.shooter.image,this.canvas.width-i*40,20,25,25);
        }



        this.ctx.fillText(this.points.toString().padStart(6,"0"),this.canvas.width-300,48);
        this.ctx.drawImage(this.shooter.image,this.shooter.x,this.shooter.y,this.shooter.width,this.shooter.height);
    
        this.shooter.shots.forEach((element)=>{
            element.move();
            this.ctx.drawImage(element.image,element.x,element.y);
        });

    this.shield.shields[0].forEach((shield,idxShield)=>{
      this.horde.shots.forEach((shot,idxShot)=>{     
            if(shield.isCrashedWith(shot)){
                this.shield.shields[0].splice(idxShield,1);
                //shield = null;
                this.horde.shots.splice(idxShot,1);
                shot = null;
            }else{
                this.ctx.drawImage(imageLaserShooterFailed,shield.x,shield.y,shield.width,shield.height);  
            }
        });
    });


        this.horde.shots.forEach((element,index)=>{
            if(element.isCrashedWith(this.shooter)){
                this.ctx.drawImage(imageLaserShooterFailed,this.shooter.x+10,this.shooter.y,40,40);                
                if(this.shooter.lifes--){
                    this.isGameOver();
                    this.shooter.respawn();
                }
                this.horde.shots.splice(index,1);
                element = null;
            }
        });        

        this.horde.aliens.forEach((line,idx)=>{
            line.forEach((alien,index)=>{
                if(this.shooter.shots.length){
                    if(this.shooter.shots[0].isCrashedWith(alien)){
                        this.points += alien.points;
                        this.shooter.shots[0] = null;
                        this.shooter.shots.pop();
                        line.splice(index,1);
                        this.ctx.drawImage(imageLaserShooterFailed,alien.x,alien.y,alien.width,alien.height);
                        alien = null;
                    }else{
                        this.ctx.drawImage(alien.image,alien.x,alien.y,alien.width,alien.height);

                    }
                }else{
                    this.ctx.drawImage(alien.image,alien.x,alien.y,alien.width,alien.height);
                }
            });
            if(line.length === 0){
                this.horde.aliens.splice(idx,1);
            }
        });


        if(this.horde.count()=== 0){
            this.horde.new(this.horde.speed *= 2);
        }

        this.horde.shots.forEach(element=>{
            element.move();
            this.ctx.drawImage(element.image,element.x,element.y);            
        });
        
        this.horde.move();
        

       if(!(this.frame % 120)){
            this.horde.fire();
       } 

        this.intervalId = requestAnimationFrame(update);
    
        this.isGameOver();


    }
    isGameOver(){
        if(this.shooter.lifes <=0){
            this.gameOver();
        }
        if(this.shooter.top() === this.horde.bottom()){
            this.gameOver();
        }


    }


    gameOver(){
        cancelAnimationFrame(this.intervalId);
    }

}