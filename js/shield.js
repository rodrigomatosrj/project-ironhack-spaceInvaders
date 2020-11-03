class Block {
    constructor(x,y){
        this.width = 30;
        this.height = 30;
        this.x = x;
        this.y = y;
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

class Shield {
    constructor(x,y){
        this.x = 0;
        this.y = 0;
        this.shields = [];
        this.shields.push(this.constructShield(x,y));
    }

    constructShield(inicial,y){
        let shield = [];
        for(let i = 0; i<5;i++){
            shield.push(new Block(inicial+(30*i),y));
        }
        for(let i = 0; i<5;i++){
            shield.push(new Block(inicial+(30*i),y+30));
        }
        return shield;
    }



}


