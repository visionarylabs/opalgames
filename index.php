<?php /*
    Game Tools
*/ ?>
<html>
    <head>

        <title>Game Tools</title>
        <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1, maximum-scale=1, user-scalable=0" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

        <link rel="stylesheet" type="text/css" href="main.css" media="all" />
        <link href="favicon.ico" rel="shortcut  icon">
        <script data-main="scripts/main" src="scripts/require.js"></script>
    </head>
    <body>

        <div id="game-area" class="game-area">
            <canvas id="game-canvas" class="game-canvas"></canvas>
        </div>

        <div id="game-info" class="game-info">
            <h1>Game Tools</h1>
            <h2>Opal Games: Game Tools Demo</h2>
        </div>

        <?php include_once('../../lib/includes/opalgames-footer.php'); ?>

    </body>
</html>
