function startGame(settings) {
  resetGame()
  map.size = settings.map_size
  map.setWidth()
  map.generate()
  for (let i = 0; i < settings.nb_players ; i++) {
    characters[characters.length] = new Character(i, {x: map.spawn_point[i][0], y: map.spawn_point[i][1]}, {up: settings.player_control[i][0],  down: settings.player_control[i][1], left: settings.player_control[i][2], right: settings.player_control[i][3], bomb: settings.player_control[i][4]})
  }


  for (let j = settings.nb_players; j < settings.nb_AI + settings.nb_players ; j++){
    if (characters.length < 4) {
      characters[characters.length] = new IA(j, {x: map.spawn_point[j][0], y: map.spawn_point[j][1] }, {up: 380,  down: 400, left: 370, right: 390, bomb: 140})
      characters[characters.length - 1].goToTarget()
    }
  }
}

function resetGame(){
  characters = []
}