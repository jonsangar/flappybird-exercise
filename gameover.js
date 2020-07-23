var Game_over = {
    preload: function(){
        juego.stage.backgroundColor = "#FFF";
        juego.load.image('boton','img/btn.png');
    },
    create: function(){
        var boton = this.add.button(juego.width/2,juego.height/2,'boton',this.iniciarJuego,this);
        boton.anchor.setTo(0.5);
        
        var txtIniciar = juego.add.text(juego.width/2,juego.height/2 - 84,"GAME OVER",{font:"bold 23px sans-serif",fill:"black",align:"center"});
        var txtTitle = juego.add.text(juego.width/2,juego.height/2 - 129,"Flappy Bird",{font:"bold 36px sans-serif",fill:"black",align:"center"});
        txtIniciar.anchor.setTo(0.5);
        txtTitle.anchor.setTo(0.5);
    },
    iniciarJuego: function(){
        this.state.start('Juego');
    }
}