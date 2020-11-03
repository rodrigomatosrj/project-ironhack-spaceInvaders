class Bullet{
    constructor(x,y,speed,image){
        this.x = x
        this.y = y;
        this.speed = speed;
        this.width= 10;
        this.height = 54;
        this.image = image;

    }

    move(){
        if(this.speed < 0 ){ // Shooter bullet
            if(this.y >= 0){
                this.y += this.speed;
            }else{
                game.shooter.shots.pop();
                this.y = -200;
            }    
        }else{ // alien bullet
            if(this.y >= 0){
                this.y += this.speed;
            }else{
                this.destroy();
            }    
        }    
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

  destroy(){
      
  }

isCrashedWith(obstacle) {
    const condition = !(
      this.bottom() < obstacle.top() ||
      this.top() > obstacle.bottom() ||
      this.right() < obstacle.left() ||
      this.left() > obstacle.right()
    );

    return condition;
  }


}