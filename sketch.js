var dog, happydog,database, foodS,foodStock;
var dogimage,dogimage1;
var lastfed, fedtime,gameState, foodobj,butadd,butfeed,readstate,changestate
var bedroomimg,livingroomimg,washroomimg;
var gardenimg,saddog
function preload()
{
	//load images here
  dogimage=loadImage('dogimg.png')
  dogimage1=loadImage('dogimg1.png')
  bedroomimg=loadImage('Bed Room.png')
  livingroomimg=loadImage('Living Room.png')
  washroomimg=loadImage('Wash Room.png')
  gardenimg=loadImage('Garden.png');
  saddog=loadImage('Lazy.png');
}

function setup() {
  database=firebase.database();
	createCanvas(900,700);

  dog=createSprite(350,350,50,50)
  dog.addImage(dogimage);
  dog.scale=0.5;
  
  foodobj= new Food();

  foodStock=database.ref("/food");
        foodStock.on("value",function(data){
        foodS=data.val();
foodobj.updatefoodstock(foodS);
      }) ;

      butadd=createButton("add the food");
      butadd.position(600,200);
      butadd.mousePressed(addfood);

      butfeed=createButton("feed dog");
      butfeed.position(700,200);
      butfeed.mousePressed(feeddog);

      fedtime=database.ref("/lastfed");
fedtime.on("value",function(data){
  lastfed=data.val();
});

readstate=database.ref("/gameState")
readstate.on("value",function(data){
  gameState=data.val();
});
}


function draw() {  
background(46,139,87);

foodobj.display();


  drawSprites();

  CurrentTime=hour();
  if(CurrentTime==(lastfed+1))
  {
    update("playing");
    foodobj.garden();
  }else if(CurrentTime==(lastfed+2))
  {
    update("sleeping");
    foodobj.bedroom();
  }else if (CurrentTime>(lastfed+2) && CurrentTime<=(lastfed+4))
  {
    update("bathing");
    foodobj.washroom();
  }else{
    update("hungry")
    foodobj.display();
  }
text("food remaining: "+foodS, 20,50);
text("dog is in: "+gameState, 20,150);
if(gameState!="hungry"){
  butfeed .hide()
  butadd.hide();
  dog.remove();
}else{
  butfeed.show();
  butadd.show();
  dog.addImage(dogimage);
}
}

function feeddog()
{
  dog.addImage(dogimage1);
 foodobj.updatefoodstock(foodobj.getfoodstock()-1)
  database.ref('/').update({
    food:foodobj.getfoodstock(),
   lastfed:hour(),
   gameState:"hungry"
  })

}


function addfood()
{
  foodS++
  database.ref('/').update({
    food:foodS
  })
}

function update(state)
{
  database.ref('/').update({
    gameState:state
  });
}
