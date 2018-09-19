document.addEventListener("DOMContentLoaded", function() {

    function Furry(){
        this.x = 0;
        this.y = 0;
        this.direction = "right";
    }
    function Coin(){
        this.x = Math.floor(Math.random()*10);
        this.y = Math.floor(Math.random()*10);
    }
    function Game(){
        this.board = document.querySelectorAll("#board div");
        this.furry = new Furry();
        this.coin = new Coin();
        this.score = 0;
        this.index = function(x,y){
            return x + (y*10);
        };
        function showFurry() {
            this.board[this.index(this.furry.x, this.furry.y)].classList.add("furry");
        };
        function showCoin() {
            this.board[this.index(this.coin.x, this.coin.y)].classList.add("coin");
        };
        showFurry();
        showCoin();

        function startGame() {
            this.idSetInterval = setInterval(function(){
                moveFurry();
            }, 250);
        };
        startGame();

        var self = this;
        function moveFurry() {
            hideVisibleFurry();
            if(self.furry.direction == "right"){
                self.furry.x = self.furry.x + 1;
            } else if (self.furry.direction == "left"){
                self.furry.x = self.furry.x - 1;
            } else if (self.furry.direction == "up"){
                self.furry.y = self.furry.y - 1;
            } else if (self.furry.direction == "down"){
                self.furry.y = self.furry.y + 1;
            };

            showFurry();
            checkCoinCollision();
            gameOver();
        };

        function hideVisibleFurry() {
            document.querySelector(".furry").classList.remove("furry");
        };

        document.addEventListener('keydown', function(event){
            turnFurry(event)
        });
        function turnFurry(){
            switch (event.which){
                case 37:
                    this.furry.direction = "left";
                    break;
                case 38:
                    this.furry.direction = "up";
                    break;
                case 39:
                    this.furry.direction = "right";
                    break;
                case 40:
                    this.furry.direction = "down";
                    break;
            };
        };
        function checkCoinCollision(){
            if(self.furry.x == self.coin.x && self.furry.y == self.coin.y){
                document.querySelector(".coin").classList.remove("coin");
                self.score = self.score + 1;
                document.querySelector("#score div strong").innerText = self.score;
                this.coin = new Coin();
                showCoin();
            }
        };
        function gameOver(){
            if((self.furry.x < 0 || self.furry.x > 9) || (self.furry.y < 0 || self.furry.y > 9)){
                clearInterval(idSetInterval);
                hideVisibleFurry();
                var died = document.createElement("div");
                died.innerText = "Koniec gry, masz: " + self.score + " punktów!";
                document.getElementById("score").appendChild(died);
                document.getElementById("over").classList.remove("invisible");
            }
        }

    };

    Game();
})
