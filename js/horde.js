class Horde {
    constructor(){
        this.aliens = [];
        this.new(1);
    }

    new(speed){
        this.speed = speed;
        this.addLine(1);
        this.addLine(2);
        this.addLine(3);
        this.addLine(4);
        this.addLine(5);
        this.shots = [];
    }


    addLine(level){
        const line = [];
        let y = 0;
        let points = 0;
        let image = "";
        switch(level){
            case 1:
                y = 250;
                points = 10;
                image = imageAlienLevel1;
                break;
            case 2:
                y = 200;
                points = 20;
                image = imageAlienLevel2;
                break;
            case 3:
                y = 150;
                points = 20;
                image = imageAlienLevel2;
                break;
            case 4:
                y = 100;
                points = 30;
                image = imageAlienLevel3;
                break;        
            case 5:
                y = 50;
                points = 30;
                image = imageAlienLevel3;
                break;                  
            default:
                return;
        }

        for(let i=0;i<10;i++){
            line.push(new Alien((70*i),y,image,points)); 
        }    

        this.aliens.push(line);
    }

    move(){
        this.aliens.forEach((line)=>{
            line.forEach((alien)=>{
                let speed = alien.move(this.speed);
                if(this.speed !== speed){
                    this.speed = speed;
                    this.down();
                }
            });
        });
    }   

    down(){
        this.aliens.forEach((line)=>{
            line.forEach((alien)=>{
               alien.y += 10;
            });
        });
    }   

    fire(){
        let line = Math.floor(Math.random()*this.aliens.length);
        let col = Math.floor(Math.random()*this.aliens[line].length);

        for(let i = 0; i <= line; i++){
            if(this.aliens[i][col]){
                let alien = this.aliens[i][col];
                this.shots.push(alien.fire());
                break;
            }
        }
    }

    count(){
        return this.aliens.length;
    }

    bottom(){
        let y = 0;
       this.aliens.forEach((line)=>{
            line.forEach((alien)=>{
               if(y < alien.bottom())
               y = alien.bottom();
            });
        });
        return y;
    }

    


}