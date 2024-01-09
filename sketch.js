
var bgimg
var splashimage, playButton, aboutButton
var gameState = "wait"
var playButton, bgimg, ground, groundimage, player, playerimage
var coin, coinimage, coinGroup
var enemy, enemyimage1, enemyimage2, enemyGroup, enemyimage3
var score = 0
var coinsl1 = 0, coinsl2 = 0
var health = 300, maxhealth = 300



function preload() {
  splashimage = loadImage('Treasure Titans.gif')
  bgimg = loadImage('background imagenew.png')
  groundimage = loadImage('ground.png')
  playerimage = loadImage('player.png')
  playerimage2 = loadImage('playerflip.png')

  enemyimage1 = loadImage('enemy.png')
  enemyimage2 = loadImage('enemy1.png')
  enemyimage3 = loadImage('enemy4.png')


  coinimage = loadAnimation('coin/c1.png', 'coin/c1.png', 'coin/c2.png', 'coin/c3.png', 'coin/c4.png', 'coin/c5.png', 'coin/c6.png', 'coin/c7.png', 'coin/c8.png', 'coin/c9.png', 'coin/c10.png')
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  playButton = createImg("paly1.png")
  // playButton= createButton('Play');
  playButton.position(width / 2.75, height / 2)
  playButton.size(150, 150)

  aboutButton = createImg("about1.png")
  //aboutButton=createButton('About');
  aboutButton.position(width / 2.75 + 200, height / 2)
  aboutButton.size(155, 145)


  ground = createSprite(width / 2, height - 35, width * 2)
  ground.addImage(groundimage)
  // ground.x=width/2
  ground.scale = 1.5

  invisibleGround = createSprite(width / 2, height - 100, width, 20)
  invisibleGround.visible = false

  player = createSprite(100, height - 210)
  player.addImage("right", playerimage)
  player.addImage("left", playerimage2)
  player.visible = false


  // groups
  coinGroup = new Group()
  enemyGroup = new Group()
  // player.debug=true

}


function draw() {
  player.collide(invisibleGround)
  background(splashimage);
  if (gameState == "wait") {

    background(splashimage);
    score = 0
    coinsl1 = 0
    coinsl2 = 0
    health = 300
    maxhealth = 300
    playButton.show()
    aboutButton.show()
    ground.velocityX = 0
  }

  playButton.mousePressed(() => {
    gameState = "play"


  })

  aboutButton.mousePressed(() => {
    gameState = "about"


  })


  if (gameState == "play") {
    // background(bgimg)
    image(bgimg, 0, 0, width, height)
    player.visible = true
    spawncoins()
    spawnenemies()
    playButton.hide()
    aboutButton.hide()
    ground.velocityX = -3
    playermovement()
    player.velocityY += 0.8
    if (ground.x <= width / 2.15) {
      ground.x = width / 1.85
    }

    for (var i = 0; i < (coinGroup.length); i++) {
      if (player.isTouching(coinGroup.get(i))) {
        coinGroup.get(i).remove()
        console.log("coin")
        coinsl1 += 5
      }
    }


    for (var i = 0; i < (enemyGroup.length); i++) {
      if (player.isTouching(enemyGroup.get(i))) {
        enemyGroup.get(i).remove()
        console.log("enemy")
        health -= 5
      }
    }



    if (health <= 5) {

      gameState = "overpop"

    }

    if (health >= 50 && coinsl1 >= 10) {

      gameState = "level2pop"
      player.x = 100
      player.visible = false
      enemyGroup.destroyEach()
      coinGroup.destroyEach()
      level2popup()

    }


  }

  if (gameState == "about") {

    aboutgame()
    playButton.hide()
    aboutButton.hide()
  }



  if (gameState == "level2") {
    image(bgimg, 0, 0, width, height)
    player.visible = true
    spawncoins()
    spawnenemies2()
    playButton.hide()
    aboutButton.hide()
    ground.velocityX = -3
    playermovement()
    player.velocityY += 0.8
    if (ground.x <= width / 2.15) {
      ground.x = width / 1.85
    }




    for (var i = 0; i < (coinGroup.length); i++) {
      if (player.isTouching(coinGroup.get(i))) {
        coinGroup.get(i).remove()
        console.log("coin")
        coinsl2 += 5
      }
    }


    for (var i = 0; i < (enemyGroup.length); i++) {
      if (player.isTouching(enemyGroup.get(i))) {
        enemyGroup.get(i).remove()
        console.log("enemy")
        health -= 5
      }
    }



    if (health <= 5) {

      gameState = "overpop"

    }

    if (health >= 50 && coinsl2 >= 10) {

      gameState = "winningpop"
      player.visible = false
      enemyGroup.destroyEach()
      coinGroup.destroyEach()


    }


    if (gameState == "winningpop") {

      win()

    }




  }




  drawSprites()


  if (gameState == "play") {
    healthl1()
    textAlign("Center")
    textSize(25)
    fill("yellow")
    stroke("green")
    strokeWeight(2)
    // text('SCORE:  ' + score, 100, 50)
    text('LEVEL : 1 ', width / 2 - 100, 50)
    text('COINS :  ' + coinsl1, width - 200 - 100, 50)


  }



  if (gameState == "level2") {
    healthl1()
    textAlign("Center")
    ground.velocityX = -5
    textSize(25)
    fill("yellow")
    stroke("green")
    strokeWeight(2)
    // text('SCORE:  ' + score, 100, 50)
    text('LEVEL : 2 ', width / 2 - 100, 50)
    text('COINS :  ' + coinsl2, width - 200 - 100, 50)


  }




}




function win() {

  swal({
    title: "HURRAY!!!",
    text: "You have Won!!!",
    textAlign: "center",
    imageUrl: "win.jpg",
    imageSize: "200x200",
    confirmButtonText: "Restart!!",
    confirmButtonColor: "green"
  },
    function (isConfirm) {
      if (isConfirm) {
        gameState = "wait"
        // location.reload();

      }
    }
  )


}



function aboutgame() {
  swal({
    title: "HOW TO PLAY THE GAME !!!",
    text: "The aim of the game is to collect the treasure",
    textAlign: "center",
    imageUrl: "rest-removebg-preview.png",
    imageSize: "200x200",
    confirmButtonText: "LET  THE TREASURE TITAN BEGIN!!",
    confirmButtonColor: "green"
  },
    function () {
      gameState = "wait"
    }
  )


}

function playermovement() {
  if (player.x >= width - 10) {
    player.x = 10
  }


  if (player.x <= 0) {
    player.x = width - 20
  }

  if (keyDown("RIGHT_ARROW")) {
    player.x += 5
    player.changeImage("right")
  }

  if (keyDown("LEFT_ARROW")) {
    player.x -= 5
    player.changeImage("left")
  }



  if (keyDown("space") && player.y >= (height - height / 3)) {
    player.velocityY -= 15
  }
  player.velocityY += 0.8


}



// level1

function healthl1() {
  stroke("yellow")
  strokeWeight(3)
  // noFill()
  fill('white')
  rect(100, 25, maxhealth, 25)

  fill('red')
  rect(100, 25, health, 25)


}


function spawncoins() {
  if (frameCount % 100 == 0) {

    coin = createSprite(width, Math.round(random(150, height - 100)))
    coin.addAnimation('coin', coinimage)
    coin.velocityX = -3

    coinGroup.add(coin)

  }

}




function spawnenemies() {
  if (frameCount % 150 == 0) {

    enemy = createSprite(width, height - 200)
    // enemy.addAnimation('coin',coinimage)
    enemy.velocityX = -5
    // enemy.debug=true

    randenemy = Math.round(random(1, 2))
    switch (randenemy) {
      case 1: enemy.addImage(enemyimage1)
        enemy.scale = 0.35
        break;
      case 2: enemy.addImage(enemyimage2)
        enemy.y = height - 210
        enemy.scale = 0.15



        break;
      default: break;
    }
    enemyGroup.add(enemy)

  }
}


function level2popup() {

  swal({

    title: "HEY YOU SUCCEEDED!!!",
    text: "You have Cleared the Level 1:\n\nLET THE TITAN FIND THE UNKNOWN!!",
    textAlign: "center",
    imageUrl: "levelup.png",
    imageSize: "200x200",
    confirmButtonText: "LEVEL 2",
    confirmButtonColor: "red"
  },
    function () {
      gameState = "level2"
    }
  )


}



function spawnenemies2() {
  if (frameCount % 150 == 0) {

    enemy = createSprite(width, height - 200)
    // enemy.addAnimation('coin',coinimage)
    enemy.velocityX = -5
    // enemy.debug=true

    randenemy = Math.round(random(1, 3))
    switch (randenemy) {
      case 1: enemy.addImage(enemyimage1)
        enemy.scale = 0.35
        break;
      case 2: enemy.addImage(enemyimage2)
        enemy.y = height - 210
        enemy.scale = 0.15

      case 3: enemy.addImage(enemyimage3)
        enemy.y = height - 210
        enemy.scale = 0.5
        enemy.setCollider("rectangle", 0, 0, enemy.width / 2, enemy.height)

        break;
      default: break;
    }
    enemyGroup.add(enemy)

  }
}