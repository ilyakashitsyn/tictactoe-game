import './main.css';
import { Board } from './components/Board';
import { GameState } from './state/GameState';
import { checkWinner, isDraw, reset } from './utils/checkWinner';

// 1. Инициализация доски и состояния игры
const board = new Board();
const gameState = new GameState();

// 2. Получаем корневой DOM-элемент и вставляем туда доску
const appRoot = document.getElementById('game');
if (!appRoot) throw new Error('Root element not found');

appRoot.appendChild(board.render());

// 3. Навешиваем обработчики на клетки
board.getAllCells().forEach(row => {
  row.forEach(cell => {
    cell.onClick(() => {
      // Нельзя ставить, если уже занято или игра завершена
      if(cell.getValue() !== null || gameState.getWinner() !== null) return;

      // Устанавливаем значение клетки
      cell.setValue(gameState.getCurrentPlayer());

      // Проверяем победу
      const winner = checkWinner(gameState.getCurrentPlayer(), board.getAllCells());
      if (winner) {
        gameState.setWinner(winner);
        alert(`🎉 Победил игрок: ${winner}`);
        board.disable();
      }

      // Проверяем на ничью
      if (isDraw(board.getAllCells())) {
        gameState.setWinner(null);
        alert('🤝 Ничья!');
        return;
      }

      // Меняем игрока
      gameState.switchPlayer();
    })
  }
})

// 4. Добавим кнопку для сброса игры
const resetButton = document.createElement('button');
resetButton.textContent = '🔄 Начать заново';
resetButton.style.marginTop = '20px';
resetButton.addEventListener('click', () => {
  reset(board);
  gameState.reset();
});

appRoot.appendChild(resetButton);
