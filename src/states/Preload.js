var preloadState = {

    preload: function() {

        game.load.image('background', 'assets/images/darkPurple.png');
        game.load.image('inGameBackground', 'assets/images/purple.png');
        game.load.image('playButton', 'assets/images/playButton.png');
        game.load.image('checkmark', 'assets/images/checkmark.png');
        game.load.image('cross', 'assets/images/cross.png');
        game.load.image('checkmark', 'assets/images/checkmark.png');
        game.load.image('arrow', 'assets/images/arrow.png');

        game.load.image('fish', 'assets/images/bluey.png');
        game.load.image('fish1', 'assets/images/pink.png');
    },
    
    create: function() {
        
        game.state.start('Menu');
    }
};