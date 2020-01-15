$(document).ready(function() {

      function Move() {
        this.row = 0;
        this.col = 0;
      }

      function movesLeft ( board ) {
        return board.flat().includes("_");
      }

      function win ( board ) {
        for ( var row = 0; row < 3; row++ ) {
          if ( board[row][0] === board[row][1] && board[row][1] === board[row][2] ) {
            if ( board[row][0] === AIPlayer ) {
              return +10;
            } else if ( board[row][0] === HumanPlayer ) {
              return -10;
            }
          }
        }

        for ( var col = 0; col < 3; col++ ) {
          if ( board[0][col] === board[1][col] && board[1][col] === board[2][col] ) {
            if ( board[0][col] === AIPlayer ) {
              return +10;
            } else if ( board[0][col] === HumanPlayer ) {
              return -10;
            }
          }
        }

        if ( board[0][0] === board[1][1] && board[1][1] === board[2][2] ) {
          if ( board[0][0] === AIPlayer ) {
            return +10;
          } else if ( board[0][0] === HumanPlayer ) {
            return -10;
          }
        }

        if ( board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
          if ( board[0][2] === AIPlayer ) {
            return +10;
          } else if ( board[0][2] === HumanPlayer ) {
            return -10;
          }
        }

        return 0;
      }

      function minimax(board, depth, isMax) {

        var score = win(board);

        if (score === 10) {
          return score;
        }

        if (score === -10) {
          return score;
        }

        if (movesLeft(board) === false) {
          return 0;
        }

        if (isMax) {
          var best = -1000;

          for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
              if (board[i][j] === "_") {
                board[i][j] = AIPlayer;

                best = Math.max(best, minimax(board, depth + 1, !isMax));
                //console.log(best);

                board[i][j] = "_";
              }
            }
          }

          return best;
        } else {
          var best = 1000;

          for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
              if (board[i][j] === "_") {
                board[i][j] = HumanPlayer;

                best = Math.min(best, minimax(board, depth + 1, !isMax));
                // console.log(board);

                board[i][j] = "_";
              }
            }
          }

          return best;
        }

      }

      function findBestMove(board) {

        var bestVal = -1000;
        var bestMove = new Move();
        bestMove.row = -1;
        bestMove.col = -1;

        for (var i = 0; i < 3; i++) {
          for (var j = 0; j < 3; j++) {

            if (board[i][j] === "_") {
              board[i][j] = AIPlayer;

              var moveVal = minimax(board, 0, false);

              board[i][j] = "_";

              // console.log(moveVal);
              if (moveVal > bestVal) {
                bestMove.row = i;
                bestMove.col = j;
                bestVal = moveVal;
                // console.log(bestVal);

              }
            }

          }
        }

        return bestMove;

      }

      function endGame(message) {
        $("#result").html(message);
        $("#game").fadeTo( 1000, 0.4 );
        $("#chooser").fadeIn();
        $("#result").fadeIn();
        $(".squares").prop( "disabled", true );
      }

      function resetGame() {
        $("#chooser").fadeOut();
        $("#result").fadeOut();
        $("#game").fadeTo( 1000, 1.0 );
        $(".squares").prop( "disabled", false );

        mainBoard = [
          ["_", "_", "_"],
          ["_", "_", "_"],
          ["_", "_", "_"]
        ];

        var keys = Object.keys( index );
        for (var i = 0; i < keys.length; i++) {
          $("#" + keys[i]).html("");
        }

        return mainBoard;
      }

      function checkGame() {
        if ( win( mainBoard ) === 10 ) {
          endGame( "You lost!" )
          return;
        }
        if ( win( mainBoard ) === -10 ) {
          endGame( "You win!" )
          return;
        }
        if ( movesLeft( mainBoard ) === false ) {
          endGame( "Draw!" )
          return;
        }
      }

      var index = {
        "1": [0, 0],
        "2": [0, 1],
        "3": [0, 2],
        "4": [1, 0],
        "5": [1, 1],
        "6": [1, 2],
        "7": [2, 0],
        "8": [2, 1],
        "9": [2, 2]
      };

      $("#game").hide();

      $(".squares").on("click", function() {

        var id = $(this).attr("id");
        var arr = index[id];
        if( mainBoard[arr[0]][arr[1]] !== "_" ){
          return;
        }
        id = '#' + id;
        $(id).html( HumanPlayer );
        mainBoard[arr[0]][arr[1]] = HumanPlayer;

        if ( win( mainBoard ) === -10 ) {
          endGame( "You win!" )
          return;
        }
        if ( movesLeft( mainBoard ) === false ) {
          endGame( "Draw!" )
          return;
        }

        var nowMove = findBestMove(mainBoard);
        var newId = 3 * nowMove.row + nowMove.col + 1;
        $("#" + newId).html( AIPlayer );
        mainBoard[nowMove.row][nowMove.col] = AIPlayer;

        if (win(mainBoard) === 10) {
          endGame( "You lost!" )
          return;
        }
        if ( movesLeft(mainBoard) === false ) {
          endGame( "Draw!" )
          return;
        }
      });

      $( "#X_chooser" ).on( "click", function() {
        AIPlayer = "O";
        HumanPlayer = "X";
        mainBoard = resetGame()
      });

      $( "#O_chooser" ).on( "click", function() {
        AIPlayer = "X";
        HumanPlayer = "O";
        mainBoard = resetGame()

        var keys = Object.keys( index );
        var rand = Math.floor(Math.random() * (keys.length + 1));
        var arr = index[keys[rand]];
        var id = 3 * arr[0] + arr[1] + 1;
        $("#" + id).html(AIPlayer);
        mainBoard[arr[0]][arr[1]] = AIPlayer;
      });

    });
