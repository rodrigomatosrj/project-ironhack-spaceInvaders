class Game{
    constructor(canvas,context,backGround,title,fontName){
        this.canvas = canvas;
        this.ctx = context;
        this.backGround = backGround;
        this.title = title;
        this.font = fontName;
        this.alienBoss = [];
        this.new();
    }

    new(){
        this.intervalId = 0;
        this.horde = [];
        this.frame = 0;
        this.points = 0;
        this.down = [];
        this.shotsNumber = 0;
        this.frames = 0;
    }


    splashScreen(){
        this.ctx.fillStyle = "#FFFFFF";
        this.ctx.font = "40px Orbitron";
        this.ctx.drawImage(this.backGround,0,0,this.canvas.width,this.canvas.height);
        this.ctx.fillStyle = "#FFFFFF";
        this.ctx.font = "normal 40px Orbitron";
        this.ctx.fillText('Press "Start" to Play!',180,350);
        this.ctx.drawImage(this.title,(this.canvas.width-500)/2,40,500,210);
        this.ctx.font = "normal 30px Orbitron";
        this.ctx.fillText('How to Play:',50,500);
        this.ctx.drawImage(imageKeyboard,50,550,107,74);
        this.ctx.font = "normal 20px Orbitron";
        this.ctx.fillText('up: fire',180,550);
        this.ctx.fillText('down: stop',180,575);
        this.ctx.fillText('left: go left',180,600);
        this.ctx.fillText('right: go right',180,625);
        this.ctx.font = "40px Orbitron";
    }
   start(imageShooter){
        this.shooter = new Shooter(imageShooter,(this.canvas.width-50)/2,this.canvas.height-60);
        this.horde = new Horde();
        this.shield = new Shield(120,500);
        this.points = 0;
        this.down = [];
        this.frames = 0;
        this.shotsNumber = 0;
        this.update();
    }
    update(){
        this.frame++;
        this.shooter.move();
       
        this.ctx.drawImage(this.backGround,0,0,this.canvas.width,this.canvas.height);
       
        if(this.alienBoss.length){
            this.alienBoss[0].move(-4);
            if(this.alienBoss[0].x > 0){
                if(this.shooter.shots.length){
                    if(this.alienBoss[0].isCrashedWith(this.shooter.shots[0])){
                        this.alienBoss[0] = null;
                        this.alienBoss.pop();
                        this.shooter.shots[0] = null;
                        this.shooter.shots.pop();
                        this.points += 100;
                        this.down.push(100);
                    }else{
                        this.ctx.drawImage(this.alienBoss[0].image,this.alienBoss[0].x,this.alienBoss[0].y,this.alienBoss[0].width,this.alienBoss[0].height);
                    }
                }else{
                    this.ctx.drawImage(this.alienBoss[0].image,this.alienBoss[0].x,this.alienBoss[0].y,this.alienBoss[0].width,this.alienBoss[0].height);    
                }
            }else{
                this.alienBoss[0] = null;
                this.alienBoss.pop();
            }
        }


        for(let i=0;i< this.shooter.lifes;i++){
            this.ctx.drawImage(this.shooter.image,this.canvas.width-i*40,20,25,25);
        }



        this.ctx.fillText(this.points.toString().padStart(6,"0"),this.canvas.width-300,48);
        this.ctx.drawImage(this.shooter.image,this.shooter.x,this.shooter.y,this.shooter.width,this.shooter.height);
    
        this.shooter.shots.forEach((element)=>{
            element.move();
            this.ctx.drawImage(element.image,element.x,element.y);
        });

       this.shield.shields.forEach((shield,idxShield)=>{      
            shield.forEach((block,idxBlock)=>{  
                let draw = true;
                if(block){         
                    this.horde.shots.forEach((shot,idxShot)=>{     
                        if(block.isCrashedWith(shot)){
                            this.shield.shields[idxShield].splice(idxBlock,1);
                            //block = null;
                            this.horde.shots.splice(idxShot,1);
                            shot = null;
                            draw = false;
                        }    
                    });
                }
                if(block){
                    this.shooter.shots.forEach((element)=>{
                        if(block.isCrashedWith(element)){
                            this.shield.shields[idxShield].splice(idxBlock,1);
                            //block = null;
                            this.shooter.shots.pop();
                            element = null;
                            draw = false;
                        }
                    });
                }
                if(block){
                    this.horde.aliens.forEach((line,idx)=>{
                        line.forEach((alien,index)=>{
                            if(block.isCrashedWith(alien)){
                                this.shield.shields[idxShield].splice(idxBlock,1);
                                //block = null;
                                draw = false;   
                            }
                        });
                    });
                }
                if(draw){
                    this.ctx.drawImage(imageBlock,block.x,block.y,block.width,block.height);  
                }
            });
        }); 







    this.horde.shots.forEach((element,index)=>{
            if(element.isCrashedWith(this.shooter)){
                audioShooterExplosion.pause();
                audioShooterExplosion.currentTime = 0;
                audioShooterExplosion.play();
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
                        audioAlienExplosion.pause();
                        audioAlienExplosion.currentTime = 0;
                        audioAlienExplosion.play();
                        this.points += alien.points;
                        this.down.push(alien.points);
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

       if(!(this.frame % 1200)){
            this.alienBoss.push(new AlienBoss(this.canvas.width,80,imageAlienBoss,100));
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
        this.ctx.drawImage(this.backGround,0,0,this.canvas.width,this.canvas.height);
        this.ctx.fillStyle = "#FFFF00";
        this.ctx.font = "normal 80px Orbitron";
        this.ctx.fillText("Game Over",150,100);
        this.ctx.font = "normal 40px Orbitron";
        this.ctx.fillText(`Your Score: ${this.points.toString().padStart(6,"0")}`,160,200);
        this.ctx.font = "normal 25px Orbitron";
        let level1 = this.down.reduce((acc,item)=> item===10?acc+1:acc+0,0);
        let level2 = this.down.reduce((acc,item)=> item===20?acc+1:acc+0,0);
        let level3 = this.down.reduce((acc,item)=> item===30?acc+1:acc+0,0);
        let boss = this.down.reduce((acc,item)=> item===100?acc+1:acc+0,0);
        let shotacc = (level1+level2+level3+boss)/this.shotsNumber;


        this.ctx.drawImage(imageAlienBoss,280,280,30,30);
        this.ctx.drawImage(imageAlienLevel3,280,330,30,30);
        this.ctx.drawImage(imageAlienLevel2,280,380,30,30);
        this.ctx.drawImage(imageAlienLevel1,280,430,30,30);
        this.ctx.fillText(`x ${boss} = ${boss*100}`,330,300);
        this.ctx.fillText(`x ${level3} = ${level3*30}`,330,350);
        this.ctx.fillText(`x ${level2} = ${level2*20}`,330,400);
        this.ctx.fillText(`x ${level1} = ${level1*10}`,330,450);
        this.ctx.fillText(`Shot accurancy: ${(shotacc*100).toFixed(2)}%`,215,500);
        this.ctx.fillStyle = "#FFFFFF";
        this.ctx.font = "normal 40px Orbitron";
        this.ctx.fillText(`Press "Space Bar" to return...`,80,580);
        

    }

}