class Alien {
    constructor(x,y,image,points){
        this.x = x;
        this.y = y;
        this.image = image;
        this.width = 40;
        this.height = 40;
        this.points = points;
    }

    left() {
        return this.x;
    }

    right() {
        return this.x + this.width;
    }

    top() {
        return this.y;
    }

    bottom() {
        return this.y + this.height;
    }
   
    move(speed){
        if(speed < 0){
            if(this.x - speed > 0){
                this.x += speed;
            }else{
                this.x = 0;
                speed *= -1 ;
            }
        }else{
            if(this.x + speed < (game.canvas.width)-this.width){
                this.x += speed;   
            }else{
                this.x = game.canvas.width - this.width;
                speed *= -1;
            }
        }    
        return speed; 
    }

    fire(){
        audioAlienShot.pause();
        audioAlienShot.currentTime = 0;
        audioAlienShot.play();
        return new Bullet((this.x+this.width/2)-3,this.y+this.height,1,imageLaserAlien);
    }
   

}

class AlienBoss extends Alien {

    isCrashedWith(obstacle) {
        const condition = !(
        this.bottom() < obstacle.top() ||
        this.top() > obstacle.bottom() ||
        this.right() < obstacle.left() ||
        this.left() > obstacle.right()
        );

        return condition;
    }


    move(speed){
        this.x +=speed;        
        }
}
