class Block {
    constructor(x){
        this.width = 10;
        this.height = 10;
        this.x = x;
        this.y = 570;
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
    constructor(x){
        this.x = 0;
        this.y = 0;
        this.shields = [];
        this.shields.push(this.constructShield(x));
    }

    constructShield(inicial){
        let shield = [];
        for(let i = 0; i<10;i++){
            shield.push(new Block(inicial+(10*i)));
        }
        return shield;
    }



}


