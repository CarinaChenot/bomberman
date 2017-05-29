// Settings class
class Settings {
  constructor(timer = "1'", map_size = 'medium', nb_players = 2, nb_AI = 2) {
    this.timer = parseInt(timer);
    if (map_size === 'small') {
      this.map_size = [17, 11]
    } else if (map_size === 'medium') {
      this.map_size = [23, 17]
    } else if (map_size === 'big') {
      this.map_size = [37, 23]
    }
    this.nb_players = parseInt(nb_players)
    this.nb_AI = parseInt(nb_AI)
    this.game_status = true
    this.player_control = [
      [90, 83, 81, 68, 69],
      [38, 40, 37, 39, 16],      
      [78, 23, 47, 293, 10],
      [79, 24, 48, 294, 11],
    ]
  }
}

const settings = {}
settings.div = document.querySelector('.settings')
settings.button = settings.div.querySelector('.start')
settings.button.onclick = function () {
  let timer = settings.div.querySelector('.timer button.selected').innerHTML
  let map_size = settings.div.querySelector('.size button.selected').innerHTML
  let nb_players = settings.div.querySelector('.players button.selected').innerHTML
  let nb_AI = settings.div.querySelector('.ai button.selected').innerHTML
  const game = new Settings(timer, map_size, nb_players, nb_AI)
  settings.div.parentNode.classList.add('hide')
  startGame(game)
}
settings.timer_div = settings.div.querySelectorAll('.timer button')
settings.size_div = settings.div.querySelectorAll('.size button')
settings.players_div = settings.div.querySelectorAll('.players button')
settings.ai_div = settings.div.querySelectorAll('.ai button')

settings.select = (nodes) => {
  for (let i = 0; i < nodes.length; i++) {
    nodes[i].onclick = function () {
      const _nodes = this.parentElement.querySelectorAll('button')
      for (let y = 0; y < _nodes.length; y++) {
        if (_nodes[y].className.includes('selected')) {
          _nodes[y].className = ''
        }
      }
      this.className = ' selected'
    }
  }
}
settings.select(settings.timer_div)
settings.select(settings.size_div)
settings.select(settings.players_div)
settings.select(settings.ai_div)