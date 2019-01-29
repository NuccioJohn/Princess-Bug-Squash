
//Variables
let heartCount = 3;
let gemCount = 0;


// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y + 50;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
    this.step = 101;
    this.boundry = this.step * 5;
    this.restPos = -this.step;
};


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.x < this.boundry) {
        //Move the enemy forwad with this equation increment x by speed * dt
        this.x += this.speed * dt;
    }else {
        //Reset the enemy to the start postion
        this.x = this.restPos;
    }


};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

// Player
// var Player = function() {
//     // Variables applied to each of our instances go here,
//     // we've provided one for you to get started

//     // The image/sprite for our enemies, this uses
//     // a helper we've provided to easily load images
//     this.sprite = 'images/char-princess-girl.png';
//     this.x = 0;
//     this.y = 0;
// };

class Heart {
    constructor(){
        this.xStart = 404;
        this.yStart = 382;
        this.x = this.xStart;
        this.y = this.yStart;
        this.sprite = "images/Heart.png";
    }
        // Draw Heart with current coord position
    render() {
            ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

        // // Reset Heart
    reset() {
            // Set x and y to starting x and y
            this.y = this.yStart;
            this.x = this.xStart;
    }

    collected() {
        //moves Heart off Screen
        this.y = 0;
        this.x = -101;

        //adds a heart and updates heartCount
        if(heartCount === 3){
            document.querySelector("#fourthHeart").removeAttribute('style');
            heartCount = 4;
        }
        else if (heartCount === 2){
            document.querySelector("#thirdHeart").removeAttribute('style');
            heartCount = 3;
        }
        else if (heartCount === 1){
            document.querySelector("#secondHeart").removeAttribute('style');
            heartCount = 2;
        }else{
            return;
        }
    }
}

class Gem {
    constructor(spritePath, startX, startY, cssID){
        // this.x = 100;
        // this.y = 83;
        // this.sprite = 'images/Gem-Blue.png';
        this.xStart = startX;
        this.yStart = startY;
        this.x = this.xStart;
        this.y = this.yStart;
        this.sprite = spritePath;
        this.id = cssID;
    }

    // Draw Gem with current coord position
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

        // Reset hero
    reset() {
        // Set x and y to starting x and y
        this.y = this.yStart;
        this.x = this.xStart;
    }

    collected() {
        let item = document.getElementById(this.id);
        item.classList.remove("hide-gem");
        this.y = 0;
        this.x = -101;

    }

    resetCollection() {
        let item = document.getElementById(this.id);
        item.classList.add("hide-gem");
    }
}

class Player {
    constructor() {
        this.sprite = 'images/char-princess-girl.png';
        this.step = 101;
        this.jump = 83;
        this.startX = this.step * 2;
        this.startY = (this.jump * 4) + 50;
        this.x = this.startX;
        this.y = this.startY;
    }

    // Draw player with current coord position
    render() {
        //ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    update() {

        //Check for Enemy collision here
        for(let enemy of allEnemies) {
            // Did the player x and y collide with enemy?
            if (this.y === enemy.y && (enemy.x + enemy.step/2 > this.x && enemy.x < this.x + this.step/2) ) {
                if(heartCount === 4){
                    heartCount = 3;
                    hideHeart("fourthHeart");
                    this.reset();
                }
                else if(heartCount === 3){
                    heartCount = 2;
                    hideHeart("thirdHeart");
                    this.reset();
                }
                else if(heartCount === 2){
                    heartCount = 1;
                    hideHeart("secondHeart");
                    this.reset();
                }
                else if(heartCount === 1){
                    heartCount = 0;
                    hideHeart("firstHeart");
                    lost();
                }else{
                    return;
                }
                
            }
        }

        //Check for gem collison here
        for(let gem of allGems){
            // Did the player x and y collide with enemy?
            if (this.y === gem.y && gem.x === this.x) {
                gem.collected();
                gemCount++;
                console.log(gemCount);
            }
        }

        //Check for Heart collision here
        if (this.y === heart.y && heart.x === this.x) {
                heart.collected();
        }

        //Did player win?
        if(gemCount >= 5){
            gemCount=0;
            win();
        }
    }

    // Reset hero
    reset() {
        // Set x and y to starting x and y
        this.y = this.startY;
        this.x = this.startX;
    }


    // Update Player position according to the input based on x and y coords
    handleInput(input){
        switch(input) {
            case 'left':
                if (this.x > 0) {
                    this.x -= this.step;
                }
                break;
            case 'up':
                 if (this.y > 0) {
                    this.y -= this.jump 
                 }                                                                                              ;
                break;
            case 'right':
                if( this.x < this.step * 4) {
                    this.x += this.step;
                }
                break;
            case 'down':
                if( this.y < this.jump * 4){
                    this.y += this.jump;
                }
                break;
        }

    }
}

///Heart Functions
//hide Star
function hideHeart(heart){
    document.querySelector("#"+ heart).style.display = "none";
}

//return Stars
let showHearts = ()=> {
    let starsArray = ["firstHeart","secondHeart","thirdHeart"];
    for(let i =0; i < starsArray.length; i++){
        document.querySelector("#"+ starsArray[i]).removeAttribute('style');
    }
    document.querySelector("#fourthHeart").style.display = "none";
    
}

 //You lose Function
 let lost = () => {
        //clearInterval(time);
        swal({
            title: "You Lost!", 
            text: "You lost all your Hearts!", 
            icon: "warning",
            buttons: "Play Again!"  
        }).then((restartGame) => {
            if(restartGame){
                restartStart();
            }
        });
}

 //Checks for win
 let win = () => {
        //clearInterval(time);
        swal({
            title: "You Won!", 
            text: "You won with " + heartCount + " Hearts Left!", 
            icon: "success",
            buttons: "Play Again!"  
        }).then((restartGame) => {
            if(restartGame){
                player.winning = false;
                restartStart();
            }
        });
}

let resetGems = () => {
    allGems.forEach(function(gem) {
        gem.reset();
        gem.resetCollection();
    });
}

///allows for the game to start and restart
let restartStart = () => {
    // clearInterval(time);
    showHearts();
    heartCount = 3;
    gemCount = 0;
    player.reset();
    heart.reset();
    resetGems();

}

// // Update the players's position, required method for game
// // Parameter: dt, a time delta between ticks
// Player.prototype.update = function(dt) {
//     // You should multiply any movement by the dt parameter
//     // which will ensure the game runs at the same speed for
//     // all computers.
// };


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const allEnemies = [];
const bug1 = new Enemy(-101, 0, 200);
const bug7 = new Enemy(-101*15, 0, 200);
const bug2 = new Enemy(-101, 83, 250);
const bug3 = new Enemy((-101*2.5), 83, 250);
const bug4 = new Enemy((-101*5), 166, 150);
const bug5 = new Enemy((-101*8), 166, 150);
const bug6 = new Enemy((-101*11), 166, 150);
allEnemies.push(bug1, bug7, bug2, bug3, bug4, bug5, bug6);

let player = new Player();
let heart = new Heart();

const allGems = [];
const gemBlue = new Gem('images/Gem-Blue.png', 101, 50, 'blueGem')
const gemOrange = new Gem('images/Gem-Orange.png', 0, 216, 'orangeGem')
const gemGreen = new Gem('images/Gem-Green.png', 303, 133, 'greenGem')
const gemKey = new Gem('images/Key.png', 0, -33, 'key')
const gemStar = new Gem('images/Star.png', 404, -33, 'star')
allGems.push(gemBlue, gemOrange, gemGreen, gemKey, gemStar);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
