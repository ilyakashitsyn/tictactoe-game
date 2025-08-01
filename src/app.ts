import './main.css';
import { Board } from './components/Board';
import { GameState } from './state/GameState';
import { checkWinner, isDraw, reset } from './utils/checkWinner';
import type { Position } from './models/types';

// 1. Инициализация доски и состояния игры
const board = new Board((pos: Position) => {
  const cell = board.getCell(pos);

  // Нельзя ставить, если уже занято или игра завершена
  if (cell.getValue() !== null || gameState.getWinner() !== null) return;

  cell.setValue(gameState.getCurrentPlayer());

  // Проверяем победу
  const winner = checkWinner(gameState.getCurrentPlayer(), board.getAllCells());
  if (winner) {
    gameState.setWinner(winner);
    alert(`🎉 Победил игрок: ${winner}`);
    board.disable();
    return;
  }

  // Проверяем на ничью
  if (isDraw(board.getAllCells())) {
    gameState.setWinner(null);
    alert('🤝 Ничья!');
    return;
  }

  // Меняем игрока
  gameState.switchPlayer();
});

// Инициализация состояния игры
const gameState = new GameState(board.getAllCells());

// 2. Получаем корневой DOM-элемент и вставляем туда доску
const appRoot = document.getElementById('game') as HTMLDivElement;
if (!appRoot) throw new Error('Root element not found');

// 4. Добавим кнопку для сброса игры
const resetButton = document.getElementById('restart') as HTMLButtonElement;
resetButton.addEventListener('click', () => {
  reset(board);
  gameState.reset();
});

appRoot.appendChild(resetButton);
