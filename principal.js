var juego = new Phaser.Game(360,550,Phaser.CANVAS,'bloque_juego');

juego.state.add('Menu',Menu);
juego.state.add('Juego',Juego);
juego.state.add('Game_over',Game_over);

juego.state.start('Menu');