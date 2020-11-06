class Shooter {
    constructor(image,x,y){
        this.image = image;
        this.x = x;
        this.y = y;
        this.speed = 0;
        this.lifes = 3;
        this.shots = [];
        this.width = 50;
        this.height = 50;
    }
    goLeft(){
        this.speed = -3;
    }
    goRight(){
        this.speed = 3 ;
    }
    move(){
        if(this.speed < 0){
            if(this.x - this.speed > 0){
                this.x += this.speed;
            }else{
                this.x = 0;
                this.speed = 0;
            }
        }else{
            if(this.x + this.speed < (game.canvas.width)-this.width){
                this.x += this.speed;   
            }else{
                this.x = game.canvas.width - 50;
                this.speed = 0;
            }
        }    
    }

    stop(){
        this.speed = 0;
    }

    fire(){
        if(this.shots.length === 0){
            audioShooter.pause();
            audioShooter.currentTime = 0;
            audioShooter.play();
            this.shots[0] = new Bullet((this.x+this.width/2)-5,this.y-54,-8,imageLaserShooter);
            game.shotsNumber++;
        }

    }
    explode(){
        this.lifes--;
    }

    respawn(){

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


}