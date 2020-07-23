var bg;
var tubos;
var salto;
var timer;
var puntos;
var txtPuntos;

var Juego = {
    preload: function(){
        juego.load.image('fondo','img/bg.jpeg');
        juego.load.spritesheet('pajaros','img/pajaro.png',43,30);
        juego.load.image('tubo','img/tubo.png');
        juego.forceSingleUpdate = true;
    },
    create: function(){
        //Mostramos el fondo del juego
        bg = juego.add.tileSprite(0,0,370,550,'fondo');
        //Cargamos la física arcade
        juego.physics.startSystem(Phaser.Physics.ARCADE);
        //Creamos 20 tubos para hacerlos aparecer en escena según programemos
        tubos = juego.add.group();
        tubos.enableBody = true;
        tubos.createMultiple(20,'tubo');
        tubos.setAll('checkWorldBounds',true);
        tubos.setAll('outOfBoundsKill',true);
        
        //Creamos a Flappy, inicializamos su frame inicial y le agregamos la animacion de vuelo
        flappy = juego.add.sprite(100,245,'pajaros');
        flappy.anchor.setTo(0,0.5);
        flappy.frame = 1;
        flappy.animations.add('vuelo',[0,1,2],10,true);
        
        //Agregamos Fisica ARCADE a Flappy: para poder darle velocidad, control de bordes, gravedad, etc.
        juego.physics.arcade.enable(flappy);
        flappy.body.gravity.y = 1200;
         
        //Agregamos el SPACEBAR como tecla para saltar
        salto = juego.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        salto.onDown.add(this.saltar,this);
        
        //Creamos un loop que genera columnas cada segundo y medio
        timer = juego.time.events.loop(1500,this.crearColumna,this);
        
        //Creamos texto de puntos
        puntos = -1;
        txtPuntos = juego.add.text(120,20,"0",{font:"bold 24px Arial",fill:"#FFF"});
        juego.add.text(20,20,"Puntos",{font:"bold 24px Arial",fill:"#FFF"});
        
    },
    update: function(){
        
        if(flappy.inWorld == false){
            this.state.start("Game_over");
        } else if(flappy.position.y > 460){
            flappy.alive = false;
            juego.time.events.remove(timer);
            tubos.forEachAlive(function(t){
                t.body.velocity.x = 0;
            });
            
        } else {
            //Animación del fondo
            bg.tilePosition.x -= 1;
        }
        
        //comprobamos colisiones de flappy con tubos
        juego.physics.arcade.overlap(flappy,tubos,this.tocoTubo,null,this);
        
        //Reproducimos la animacion del vuelo
        flappy.animations.play('vuelo');
        if(flappy.angle < 20){
            flappy.angle +=1;
        }
        
    
    },
    saltar: function(){
        if(flappy.alive){
            flappy.body.velocity.y = -350;
        }    
        juego.add.tween(flappy).to({angle:-20},100).start();
        
    },
    
    crearColumna: function(){
        
        //Habra que crear aleotariamente un hueco de dos tubos consecutivos en cada columna
        var hueco = Math.floor(Math.random()*5 + 1);
        
        for(var i=0; i<8 ; i++){
            if(i != hueco && i != hueco + 1){
                this.crearUnTubo(350,i*55+20);
            }
        }
        
        puntos++;
        txtPuntos.text = puntos;
    },
    
    crearUnTubo: function(x,y){
        var tubo = tubos.getFirstDead();
        tubo.reset(x,y);
        tubo.body.velocity.x = -180;
        //tubo.checkWorldBounds = true;
        //tubo.outOfBoundsKill = true;
    },
    
    tocoTubo: function(){
        if(!flappy.alive)
            return;
        flappy.alive = false;
        juego.time.events.remove(timer);
        tubos.forEachAlive(function(t){
            t.body.velocity.x = 0;
        });
            
        
    }
};