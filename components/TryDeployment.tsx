"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Code, Github, Rocket, Info } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toast } from "@/components/ui/toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import * as React from "react"
import { motion } from "framer-motion"
import Deploying from "./Deploying";

const snakeGameCode = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Enhanced Snake Game</title>
  <style>
    body { 
      background-color: #1a1a1a; 
      display: flex; 
      justify-content: center; 
      align-items: center; 
      height: 100vh; 
      margin: 0; 
      font-family: Arial, sans-serif; 
    }
    canvas { 
      background-color: #111; 
      border: 4px solid #444; 
      box-shadow: 0 0 20px rgba(0,255,0,0.3);
    }
    #score, #highScore {
      position: absolute;
      color: white;
      font-size: 18px;
    }
    #score { top: 10px; left: 10px; }
    #highScore { top: 10px; right: 10px; }
  </style>
</head>
<body>
  <div id="score">Score: 0</div>
  <div id="highScore">High Score: 0</div>
  <canvas id="game" width="400" height="400"></canvas>
  <script>
    const canvas = document.getElementById('game');
    const ctx = canvas.getContext('2d');
    const scoreElement = document.getElementById('score');
    const highScoreElement = document.getElementById('highScore');
    const grid = 20;
    const gridSize = canvas.width / grid;
    let count = 0;
    let score = 0;
    let highScore = localStorage.getItem('snakeHighScore') || 0;
    highScoreElement.textContent = 'High Score: ' + highScore;
    const snake = {
      x: (gridSize / 2) * grid,
      y: (gridSize / 2) * grid,
      dx: grid,
      dy: 0,
      cells: [],
      maxCells: 4,
      color: 'lime'
    };
    const apple = {
      x: 0,
      y: 0,
      color: 'red'
    };
    function placeApple() {
      apple.x = getRandomInt(0, gridSize - 1) * grid;
      apple.y = getRandomInt(0, gridSize - 1) * grid;
      // Ensure apple doesn't spawn on snake
      snake.cells.forEach(function(cell) {
        if (cell.x === apple.x && cell.y === apple.y) {
          placeApple();
        }
      });
    }
    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    function resetGame() {
      snake.x = (gridSize / 2) * grid;
      snake.y = (gridSize / 2) * grid;
      snake.cells = [];
      snake.maxCells = 4;
      snake.dx = grid;
      snake.dy = 0;
      if (score > highScore) {
        highScore = score;
        localStorage.setItem('snakeHighScore', highScore);
        highScoreElement.textContent = 'High Score: ' + highScore;
      }
      score = 0;
      scoreElement.textContent = 'Score: ' + score;
      placeApple();
    }
    function loop() {
      requestAnimationFrame(loop);
      if (++count < 4) return;
      count = 0;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      snake.x += snake.dx;
      snake.y += snake.dy;
      // Wraparound edges
      snake.x = (snake.x + canvas.width) % canvas.width;
      snake.y = (snake.y + canvas.height) % canvas.height;
      snake.cells.unshift({ x: snake.x, y: snake.y });
      // Remove tail if snake hasn't grown
      if (snake.cells.length > snake.maxCells) {
        snake.cells.pop();
      }
      // Draw apple
      ctx.fillStyle = apple.color;
      ctx.fillRect(apple.x, apple.y, grid - 1, grid - 1);
      // Draw snake
      ctx.fillStyle = snake.color;
      snake.cells.forEach(function(cell, index) {
        ctx.fillRect(cell.x, cell.y, grid - 1, grid - 1);
        // Eat apple
        if (cell.x === apple.x && cell.y === apple.y) {
          snake.maxCells++;
          score++;
          scoreElement.textContent = 'Score: ' + score;
          placeApple();
        }
        // Self-collision
        for (let i = index + 1; i < snake.cells.length; i++) {
          if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
            resetGame();
          }
        }
      });
    }
    document.addEventListener('keydown', function(e) {
      // Prevent reverse direction
      switch(e.key) {
        case 'ArrowLeft':
          if (snake.dx === 0) {
            snake.dx = -grid;
            snake.dy = 0;
          }
          break;
        case 'ArrowUp':
          if (snake.dy === 0) {
            snake.dy = -grid;
            snake.dx = 0;
          }
          break;
        case 'ArrowRight':
          if (snake.dx === 0) {
            snake.dx = grid;
            snake.dy = 0;
          }
          break;
        case 'ArrowDown':
          if (snake.dy === 0) {
            snake.dy = grid;
            snake.dx = 0;
          }
          break;
      }
    });
    // Initial apple placement
    placeApple();
    requestAnimationFrame(loop);
  </script>
</body>
</html>
`;

const calculatorCode = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Simple Calculator</title>
  <style>
    body { font-family: Arial, sans-serif; background-color: #f4f4f4; display: flex; justify-content: center; align-items: center; height: 100vh; }
    .calculator { background-color: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
    .display { width: 100%; padding: 10px; font-size: 2em; text-align: right; margin-bottom: 10px; border: none; background-color: #f9f9f9; }
    .keys { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
    button { padding: 20px; font-size: 1.5em; border: none; background-color: #e0e0e0; border-radius: 5px; cursor: pointer; }
    button.operation { background-color: #f9a825; color: #fff; }
    button.equals { grid-column: span 4; background-color: #0d47a1; color: #fff; }
  </style>
</head>
<body>
  <div class="calculator">
    <input type="text" class="display" id="display" readonly>
    <div class="keys">
      <button>7</button>
      <button>8</button>
      <button>9</button>
      <button class="operation">/</button>
      <button>4</button>
      <button>5</button>
      <button>6</button>
      <button class="operation">*</button>
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button class="operation">-</button>
      <button>0</button>
      <button>.</button>
      <button class="operation">+</button>
      <button class="equals">=</button>
    </div>
  </div>
  <script>
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('button');
    let displayValue = '';
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        if (button.textContent === '=') {
          try {
            display.value = eval(displayValue);
            displayValue = display.value;
          } catch {
            display.value = 'Error';
            displayValue = '';
          }
        } else {
          displayValue += button.textContent;
          display.value = displayValue;
        }
      });
    });
  </script>
</body>
</html>
`;

const landingPageCode = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Landing Page</title>
  <style>
    body { margin: 0; font-family: Arial, sans-serif; }
    .hero { background: linear-gradient(to right, #ff416c, #ff4b2b); color: #fff; padding: 100px 20px; text-align: center; }
    .hero h1 { font-size: 3em; margin-bottom: 20px; }
    .hero p { font-size: 1.2em; margin-bottom: 40px; }
    .hero button { padding: 15px 30px; font-size: 1em; border: none; background-color: #fff; color: #ff416c; cursor: pointer; border-radius: 5px; }
  </style>
</head>
<body>
  <section class="hero">
    <h1>Welcome to the Future</h1>
    <p>Your journey to the decentralized web starts here.</p>
    <button>Get Started</button>
  </section>
</body>
</html>
`;

const flappyBirdCode = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Relaxed Flappy Bird</title>
  <style>
    body { 
      margin: 0; 
      display: flex; 
      justify-content: center; 
      align-items: center; 
      height: 100vh; 
      background-color: #87CEEB; 
      font-family: 'Comic Sans MS', cursive; 
      position: relative; /* To position absolute children relative to body */
    }
    canvas { 
      border: 6px solid #4682B4; 
      border-radius: 15px;
      box-shadow: 0 8px 15px rgba(0,0,0,0.2);
    }
    #score {
      position: absolute;
      top: 3px;
      left: 50%;
      transform: translateX(-50%);
      color: white;
      font-size: 24px;
      font-weight: bold;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
    }
    #restart-button {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: 15px 25px;
      font-size: 20px;
      background-color: #4CAF50;
      color: white;
      border: none;
      border-radius: 10px;
      cursor: pointer;
      transition: background-color 0.3s;
      display: none; /* Initially hidden */
    }
    #restart-button:hover {
      background-color: #45a049;
    }
    #instructions {
      position: absolute;
      top: 60px;
      color: white;
      background-color: rgba(0,0,0,0.5);
      padding: 10px;
      border-radius: 10px;
      text-align: center;
      width: 80%;
      left: 50%;
      transform: translateX(-50%);
      font-size: 18px;
      text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
    }
  </style>
</head>
<body>
  <canvas id="canvas" width="400" height="600"></canvas>
  <div id="score">Max Score: 0</div> <!-- New Score Display -->
  <button id="restart-button">Restart Game</button>
  <script>
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const restartButton = document.getElementById('restart-button');
    const scoreElement = document.getElementById('score'); // Reference to score display

    let bird = { 
      x: 50, 
      y: 300, 
      width: 45, 
      height: 35, 
      gravity: 0.3, 
      lift: -6, 
      velocity: 0,
      color: '#FFD700'
    };
    let pipes = [];
    let frameCount = 0;
    let score = 0;
    let gameOver = false;

    function drawBird() {
      ctx.fillStyle = bird.color;
      ctx.beginPath();
      ctx.moveTo(bird.x, bird.y);
      ctx.lineTo(bird.x + bird.width, bird.y + bird.height / 2);
      ctx.lineTo(bird.x, bird.y + bird.height);
      ctx.closePath();
      ctx.fill();
    }

    function updateBird() {
      bird.velocity += bird.gravity;
      bird.y += bird.velocity;
      if (bird.y + bird.height > canvas.height) {
        bird.y = canvas.height - bird.height;
        gameOver = true;
      }
      if (bird.y < 0) {
        bird.y = 0;
        bird.velocity = 0;
      }
    }

    function drawPipes() {
      ctx.fillStyle = '#2ecc71';
      pipes.forEach(pipe => {
        ctx.fillRect(pipe.x, 0, pipe.width, pipe.top);
        ctx.fillRect(pipe.x, canvas.height - pipe.bottom, pipe.width, pipe.bottom);
      });
    }

    function updatePipes() {
      if (frameCount % 120 === 0) {
        let gap = 200; // Adjusted gap for better gameplay
        let pipeWidth = 70;
        let top = Math.random() * (canvas.height - gap - 150) + 75;
        pipes.push({ 
          x: canvas.width, 
          width: pipeWidth, 
          top: top, 
          bottom: canvas.height - top - gap 
        });
      }
      pipes.forEach((pipe, index) => {
        pipe.x -= 1.5;
        if (pipe.x + pipe.width < 0) {
          pipes.splice(index, 1);
          score++;
          updateScore();
        }
        if (
          bird.x < pipe.x + pipe.width &&
          bird.x + bird.width > pipe.x &&
          (bird.y < pipe.top || bird.y + bird.height > canvas.height - pipe.bottom)
        ) {
          gameOver = true;
        }
      });
    }

    function drawScore() {
      ctx.fillStyle = '#fff';
      ctx.font = '24px Comic Sans MS';
      ctx.textAlign = 'center';
      ctx.fillText('Score: ' + score, canvas.width / 2, 40);
    }

    function updateScore() {
      scoreElement.textContent = 'Score: ' + score;
    }

    function gameLoop() {
      if (!gameOver) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBird();
        updateBird();
        drawPipes();
        updatePipes();
        drawScore();
        frameCount++;
        requestAnimationFrame(gameLoop);
      } else {
        showGameOver();
      }
    }

    function showGameOver() {
      ctx.fillStyle = 'rgba(0,0,0,0.6)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#fff';
      ctx.font = '40px Comic Sans MS';
      ctx.textAlign = 'center';
      ctx.fillText('Game Over', canvas.width / 2, canvas.height / 2 - 50);
      ctx.font = '28px Comic Sans MS';
      ctx.fillText('Score: ' + score, canvas.width / 2, canvas.height / 2);
      restartButton.style.display = 'block';
    }

    function resetGame() {
      bird.y = 300;
      bird.velocity = 0;
      pipes = [];
      score = 0;
      frameCount = 0;
      gameOver = false;
      restartButton.style.display = 'none';
      gameLoop();
    }

    document.addEventListener('keydown', function (e) {
      if ((e.code === 'Space' || e.code === 'MouseDown') && !gameOver) {
        bird.velocity = bird.lift;
      }
    });

    canvas.addEventListener('click', function() {
      if (!gameOver) {
        bird.velocity = bird.lift;
      }
    });

    restartButton.addEventListener('click', resetGame);
    gameLoop();
  </script>
</body>
</html>`;

const tetrisCode = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Tetris Game</title>
  <style>
    body { 
      margin: 0; 
      background-color: #000; 
      display: flex; 
      justify-content: center; 
      align-items: center; 
      height: 100vh; 
      font-family: Arial, sans-serif; 
    }
    #game-container {
      display: flex;
      align-items: center;
      gap: 20px;
    }
    canvas { 
      border: 2px solid #fff; 
      background-color: #111; 
    }
    #sidebar {
      color: #fff;
      text-align: center;
    }
    #score, #level, #next-piece {
      margin-bottom: 15px;
    }
    #next-piece canvas {
      border: 1px solid #fff;
    }
  </style>
</head>
<body>
  <div id="game-container">
    <canvas id="tetris" width="240" height="400"></canvas>
    <div id="sidebar">
      <div id="score">Score: 0</div>
      <div id="level">Level: 1</div>
      <div id="next-piece">
        <div>Next Piece:</div>
        <canvas width="80" height="80"></canvas>
      </div>
    </div>
  </div>
  <script>
    const canvas = document.getElementById('tetris');
    const context = canvas.getContext('2d');
    const nextPieceCanvas = document.querySelector('#next-piece canvas');
    const nextPieceContext = nextPieceCanvas.getContext('2d');
    context.scale(20, 20);
    nextPieceContext.scale(20, 20);
    const arena = createMatrix(12, 20);
    const colors = [
      null,
      '#FF0D72', // T
      '#0DC2FF', // O
      '#0DFF72', // L
      '#F538FF', // J
      '#FF8E0D', // I
      '#FFE138', // S
      '#3877FF', // Z
    ];
    const player = {
      pos: { x: 0, y: 0 },
      matrix: null,
      score: 0,
      level: 1
    };
    let nextPiece = null;
    let dropCounter = 0;
    let dropInterval = 1000;
    let lastTime = 0;
    function createMatrix(w, h) {
      return Array(h).fill().map(() => Array(w).fill(0));
    }
    function createPiece(type) {
      const pieces = {
        'T': [
          [0, 0, 0],
          [1, 1, 1],
          [0, 1, 0],
        ],
        'O': [
          [2, 2],
          [2, 2],
        ],
        'L': [
          [0, 3, 0],
          [0, 3, 0],
          [0, 3, 3],
        ],
        'J': [
          [0, 4, 0],
          [0, 4, 0],
          [4, 4, 0],
        ],
        'I': [
          [0, 5, 0, 0],
          [0, 5, 0, 0],
          [0, 5, 0, 0],
          [0, 5, 0, 0],
        ],
        'S': [
          [0, 6, 6],
          [6, 6, 0],
          [0, 0, 0],
        ],
        'Z': [
          [7, 7, 0],
          [0, 7, 7],
          [0, 0, 0],
        ]
      };
      return pieces[type];
    }
    function drawMatrix(matrix, offset, ctx) {
      matrix.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== 0) {
            ctx.fillStyle = colors[value];
            ctx.fillRect(x + offset.x, y + offset.y, 1, 1);
          }
        });
      });
    }
    function merge(arena, player) {
      player.matrix.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== 0) {
            arena[y + player.pos.y][x + player.pos.x] = value;
          }
        });
      });
    }
    function collide(arena, player) {
      const [m, o] = [player.matrix, player.pos];
      for (let y = 0; y < m.length; ++y) {
        for (let x = 0; x < m[y].length; ++x) {
          if (m[y][x] !== 0 &&
              (arena[y + o.y] && arena[y + o.y][x + o.x]) !== 0) {
            return true;
          }
        }
      }
      return false;
    }
    function playerDrop() {
      player.pos.y++;
      if (collide(arena, player)) {
        player.pos.y--;
        merge(arena, player);
        playerReset();
        arenaSweep();
        updateScore();
      }
      dropCounter = 0;
    }
    function playerMove(dir) {
      player.pos.x += dir;
      if (collide(arena, player)) {
        player.pos.x -= dir;
      }
    }
    function playerReset() {
      const pieces = 'TJLOSZI';
      player.matrix = nextPiece || createPiece(pieces[Math.floor(Math.random() * pieces.length)]);
      nextPiece = createPiece(pieces[Math.floor(Math.random() * pieces.length)]);
      player.pos.y = 0;
      player.pos.x = (arena[0].length / 2 | 0) - (player.matrix[0].length / 2 | 0);
      // Draw next piece
      nextPieceContext.clearRect(0, 0, nextPieceCanvas.width, nextPieceCanvas.height);
      drawMatrix(nextPiece, { x: 0, y: 0 }, nextPieceContext);
      if (collide(arena, player)) {
        arena.forEach(row => row.fill(0));
        player.score = 0;
        player.level = 1;
        dropInterval = 1000;
        updateScore();
      }
    }
    function playerRotate(dir) {
      const pos = player.pos.x;
      let offset = 1;
      rotate(player.matrix, dir);
      while (collide(arena, player)) {
        player.pos.x += offset;
        offset = -(offset + (offset > 0 ? 1 : -1));
        if (offset > player.matrix[0].length) {
          rotate(player.matrix, -dir);
          player.pos.x = pos;
          return;
        }
      }
    }
    function rotate(matrix, dir) {
      for (let y = 0; y < matrix.length; ++y) {
        for (let x = 0; x < y; ++x) {
          [matrix[x][y], matrix[y][x]] = [matrix[y][x], matrix[x][y]];
        }
      }
      if (dir > 0) {
        matrix.forEach(row => row.reverse());
      } else {
        matrix.reverse();
      }
    }
    function arenaSweep() {
      let rowsCleared = 0;
      outer: for (let y = arena.length - 1; y > 0; --y) {
        for (let x = 0; x < arena[y].length; ++x) {
          if (arena[y][x] === 0) {
            continue outer;
          }
        }
        const row = arena.splice(y, 1)[0].fill(0);
        arena.unshift(row);
        ++y;
        rowsCleared++;
      }
      // Scoring system
      switch(rowsCleared) {
        case 1: player.score += 40 * player.level; break;
        case 2: player.score += 100 * player.level; break;
        case 3: player.score += 300 * player.level; break;
        case 4: player.score += 1200 * player.level; break;
      }
      // Level up mechanism
      if (player.score >= player.level * 1000) {
        player.level++;
        dropInterval = Math.max(100, 1000 - (player.level * 100));
      }
    }
    function update(time = 0) {
      const deltaTime = time - lastTime;
      lastTime = time;
      dropCounter += deltaTime;
      if (dropCounter > dropInterval) {
        playerDrop();
      }
      draw();
      requestAnimationFrame(update);
    }
    function draw() {
      context.fillStyle = '#000';
      context.fillRect(0, 0, canvas.width, canvas.height);
      drawMatrix(arena, { x: 0, y: 0 }, context);
      drawMatrix(player.matrix, player.pos, context);
    }
    function updateScore() {
      document.getElementById('score').innerText = 'Score: ' + player.score;
      document.getElementById('level').innerText = 'Level: ' + player.level;
    }
    document.addEventListener('keydown', event => {
      if (event.keyCode === 37) {
        playerMove(-1);
      } else if (event.keyCode === 39) {
        playerMove(1);
      } else if (event.keyCode === 40) {
        playerDrop();
      } else if (event.keyCode === 81) {
        playerRotate(-1);
      } else if (event.keyCode === 87) {
        playerRotate(1);
      }
    });
    playerReset();
    updateScore();
    update();
  </script>
</body>
</html>
`;

export default function GameDeployment() {
    const [code, setCode] = useState(snakeGameCode);
    const [githubUrl, setGithubUrl] = useState("");
    const [deployedUrl, setDeployedUrl] = useState("");
    const [isDeploying, setIsDeploying] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState("snakeGame");
    const [livePreview, setLivePreview] = useState(code);
    const [showToast, setShowToast] = useState(false);
  
    useEffect(() => {
      setLivePreview(code);
    }, [code]);
  
    const handleDeploy = async () => {
      setIsDeploying(true);
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setDeployedUrl(
        `https://decentralized-web.eth/${Math.random().toString(36).substring(7)}`
      );
      setIsDeploying(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    };
  
    const handleTemplateChange = (value: string) => {
      setSelectedTemplate(value);
      switch (value) {
        case "blank":
          setCode("");
          break;
        case "snakeGame":
          setCode(snakeGameCode);
          break;
        case "tetris":
          setCode(tetrisCode);
          break;
        case "landing":
          setCode(landingPageCode);
          break;
        case "calculator":
          setCode(calculatorCode);
          break;
        case "flappyBird":
          setCode(flappyBirdCode);
          break;
      }
    };
  
    const getInstructions = () => {
      switch (selectedTemplate) {
        case "snakeGame":
          return "Use arrow keys to control the snake. Eat the red apple to grow!";
        case "tetris":
          return "Use arrow keys to move, Q to rotate left, W to rotate right.";
        case "flappyBird":
          return "Press SPACE or click to make the bird flap and avoid obstacles.";
        case "calculator":
          return "Click the buttons to input numbers and operations. Press '=' to calculate.";
        case "landing":
          return "This is a static landing page. Customize the content and styling as needed.";
        default:
          return "Select a template or start coding from scratch!";
      }
    };
  
    const [activeTab, setActiveTab] = React.useState("editor")

    return (
        <section className="mb-12 bg-white dark:bg-black p-8 rounded-lg shadow-2xl transition-colors duration-300">
          <h2 className="text-4xl font-bold mb-8 text-center text-gray-900 dark:text-white transition-colors duration-300">
              Deploy Your Website on Smart Contracts
          </h2>
          <Card className="bg-white dark:bg-black text-gray-900 dark:text-black border border-gray-300 dark:border-black transition-colors duration-300">
            <CardContent className="p-6">
              <Tabs defaultValue="editor" className="space-y-4">
                <TabsList className="grid grid-cols-2 p-1 rounded-lg bg-gray-200 dark:bg-gray-900 shadow-inner">
                  <TabsTrigger
                    value="editor"
                    className="relative"
                    onClick={() => setActiveTab("editor")}
                  >
                    {activeTab === "editor" && (
                      <motion.div
                        className="absolute inset-0 bg-white dark:bg-gray-700 rounded-lg shadow-lg"
                        layoutId="activeTab"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center justify-center space-x-2 font-medium text-gray-900 dark:text-white">
                      <Code className="w-4 h-4 text-gray-900 dark:text-white" />
                      <span>Code Forge</span>
                    </span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="github"
                    className="relative"
                    onClick={() => setActiveTab("github")}
                  >
                    {activeTab === "github" && (
                      <motion.div
                        className="absolute inset-0 bg-white dark:bg-gray-700 rounded-lg shadow-lg"
                        layoutId="activeTab"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center justify-center space-x-2 font-medium text-gray-900 dark:text-white">
                      <Github className="w-4 h-4 text-gray-900 dark:text-white" />
                      <span>GitHub Sync</span>
                    </span>
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="editor" className="space-y-4">
                  <div className="flex flex-col gap-6">
                    <div className="flex-1 space-y-2">
                      <div className="flex justify-between items-center">
                        <Label htmlFor="live-preview" className="text-lg text-gray-900 dark:text-white">
                          Live Preview
                        </Label>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" className="bg-gray-200 dark:bg-black text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-black">
                              <Info className="mr-2 h-4 w-4" />
                              How to Play
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="border border-gray-300 dark:border-black bg-white dark:bg-black text-gray-900 dark:text-white">
                            <DialogHeader>
                              <DialogTitle>Game Instructions</DialogTitle>
                              <DialogDescription>{getInstructions()}</DialogDescription>
                            </DialogHeader>
                          </DialogContent>
                        </Dialog>
                      </div>
                      <div className="border-2 border-gray-300 dark:border-black rounded-lg overflow-hidden h-[700px] bg-gray-50 dark:bg-black">
                        <iframe
                          id="live-preview"
                          srcDoc={livePreview}
                          className="w-full h-full"
                          title="Live Preview"
                          allowFullScreen
                        />
                      </div>
                    </div>
                    <div className="flex-1 space-y-4">
                      <Label htmlFor="template-select" className="text-lg text-gray-900 dark:text-white">
                        Choose Your Foundation
                      </Label>
                      <Select
                        onValueChange={handleTemplateChange}
                        value={selectedTemplate}
                      >
                        <SelectTrigger className="bg-gray-200 dark:border dark:border-white dark:bg-black border border-gray-300  text-gray-900 dark:text-white">
                          <SelectValue placeholder="Select a template" />
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-black border border-gray-300 dark:border-black text-gray-900 dark:text-white">
                          <SelectItem value="blank">Blank Canvas</SelectItem>
                          <SelectItem value="snakeGame">Snake Game</SelectItem>
                          <SelectItem value="tetris">Tetris</SelectItem>
                          <SelectItem value="landing">Landing Page</SelectItem>
                          <SelectItem value="calculator">Calculator</SelectItem>
                          <SelectItem value="flappyBird">Flappy Bird</SelectItem>
                        </SelectContent>
                      </Select>
                      <Textarea
                        id="code-editor"
                        placeholder="Craft your digital masterpiece here..."
                        value={code}
                        onChange={(e) => {
                          setCode(e.target.value);
                          setLivePreview(e.target.value);
                        }}
                        className="min-h-[400px] dark:border dark:border-white font-mono text-sm bg-gray-100 dark:bg-black text-gray-900 dark:text-white border border-gray-300"
                      />
                    </div>         
                  </div>
                </TabsContent>
                <TabsContent value="github" className="space-y-4">
                  <Input
                    placeholder="Enter your GitHub repository URL"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    className="mb-4 bg-gray-200 dark:bg-black text-gray-900 dark:text-white border border-gray-300 dark:border-white"
                  />
                </TabsContent>
              </Tabs>
              <div className="mt-6 flex justify-center">
                <Button
                  onClick={handleDeploy}
                  disabled={isDeploying}
                  size="lg"
                  className="bg-gray-800 dark:border dark:border-white dark:bg-black hover:bg-gray-700 dark:hover:bg-black text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105"
                >
                  {isDeploying ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Immortalizing on the Blockchain...
                    </>
                  ) : (
                    <>
                      <Rocket className="mr-2 h-5 w-5" />
                      Deploy on Blockchain
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
          {deployedUrl && <Deploying deployedUrl={deployedUrl} />}
        </section>
      );
  }
  
  
