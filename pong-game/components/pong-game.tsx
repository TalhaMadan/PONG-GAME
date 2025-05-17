"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"

export default function PongGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [gameStarted, setGameStarted] = useState(false)
  const [gameMode, setGameMode] = useState("singlePlayer")
  const [difficulty, setDifficulty] = useState("medium")
  const [ballSpeed, setBallSpeed] = useState(5)

  // Game state
  const [player1Score, setPlayer1Score] = useState(0)
  const [player2Score, setPlayer2Score] = useState(0)

  useEffect(() => {
    if (!gameStarted || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Game variables
    const paddleHeight = 100
    const paddleWidth = 10
    let player1Y = canvas.height / 2 - paddleHeight / 2
    let player2Y = canvas.height / 2 - paddleHeight / 2
    let ballX = canvas.width / 2
    let ballY = canvas.height / 2
    const ballRadius = 10
    let ballSpeedX = ballSpeed * (Math.random() > 0.5 ? 1 : -1)
    let ballSpeedY = ballSpeed * (Math.random() > 0.5 ? 1 : -1)
    const player1Keys = { up: false, down: false }
    const player2Keys = { up: false, down: false }
    const paddleSpeed = 8

    // Set AI difficulty
    let aiReactionSpeed = 0
    if (difficulty === "easy") aiReactionSpeed = 0.03
    else if (difficulty === "medium") aiReactionSpeed = 0.06
    else if (difficulty === "hard") aiReactionSpeed = 0.1

    // Event listeners for keyboard controls
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "w") player1Keys.up = true
      if (e.key === "s") player1Keys.down = true
      if (gameMode === "twoPlayer") {
        if (e.key === "ArrowUp") player2Keys.up = true
        if (e.key === "ArrowDown") player2Keys.down = true
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "w") player1Keys.up = false
      if (e.key === "s") player1Keys.down = false
      if (gameMode === "twoPlayer") {
        if (e.key === "ArrowUp") player2Keys.up = false
        if (e.key === "ArrowDown") player2Keys.down = false
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)

    // Game loop
    const gameLoop = () => {
      // Clear canvas
      ctx.fillStyle = "#000"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw middle line
      ctx.strokeStyle = "#fff"
      ctx.setLineDash([5, 15])
      ctx.beginPath()
      ctx.moveTo(canvas.width / 2, 0)
      ctx.lineTo(canvas.width / 2, canvas.height)
      ctx.stroke()
      ctx.setLineDash([])

      // Draw scores
      ctx.font = "30px Arial"
      ctx.fillStyle = "#fff"
      ctx.fillText(player1Score.toString(), canvas.width / 4, 50)
      ctx.fillText(player2Score.toString(), (canvas.width / 4) * 3, 50)

      // Move paddles
      if (player1Keys.up && player1Y > 0) player1Y -= paddleSpeed
      if (player1Keys.down && player1Y < canvas.height - paddleHeight) player1Y += paddleSpeed

      if (gameMode === "twoPlayer") {
        if (player2Keys.up && player2Y > 0) player2Y -= paddleSpeed
        if (player2Keys.down && player2Y < canvas.height - paddleHeight) player2Y += paddleSpeed
      } else {
        // AI movement
        const aiTarget = ballY - paddleHeight / 2
        if (Math.abs(player2Y - aiTarget) > paddleHeight / 4) {
          player2Y += (aiTarget - player2Y) * aiReactionSpeed
        }
      }

      // Move ball
      ballX += ballSpeedX
      ballY += ballSpeedY

      // Ball collision with top and bottom
      if (ballY - ballRadius < 0 || ballY + ballRadius > canvas.height) {
        ballSpeedY = -ballSpeedY
      }

      // Ball collision with paddles
      if (ballX - ballRadius < paddleWidth && ballY > player1Y && ballY < player1Y + paddleHeight) {
        ballSpeedX = -ballSpeedX
        // Add some angle based on where the ball hits the paddle
        const hitPosition = (ballY - player1Y) / paddleHeight
        ballSpeedY = 10 * (hitPosition - 0.5)
      }

      if (ballX + ballRadius > canvas.width - paddleWidth && ballY > player2Y && ballY < player2Y + paddleHeight) {
        ballSpeedX = -ballSpeedX
        // Add some angle based on where the ball hits the paddle
        const hitPosition = (ballY - player2Y) / paddleHeight
        ballSpeedY = 10 * (hitPosition - 0.5)
      }

      // Ball out of bounds
      if (ballX < 0) {
        // Player 2 scores
        setPlayer2Score((prev) => prev + 1)
        resetBall()
      } else if (ballX > canvas.width) {
        // Player 1 scores
        setPlayer1Score((prev) => prev + 1)
        resetBall()
      }

      // Draw paddles
      ctx.fillStyle = "#fff"
      ctx.fillRect(0, player1Y, paddleWidth, paddleHeight)
      ctx.fillRect(canvas.width - paddleWidth, player2Y, paddleWidth, paddleHeight)

      // Draw ball
      ctx.beginPath()
      ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2)
      ctx.fillStyle = "#fff"
      ctx.fill()
      ctx.closePath()

      requestAnimationFrame(gameLoop)
    }

    const resetBall = () => {
      ballX = canvas.width / 2
      ballY = canvas.height / 2
      ballSpeedX = ballSpeed * (Math.random() > 0.5 ? 1 : -1)
      ballSpeedY = ballSpeed * (Math.random() > 0.5 ? 1 : -1)
    }

    // Start the game loop
    const animationId = requestAnimationFrame(gameLoop)

    // Cleanup
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
      cancelAnimationFrame(animationId)
    }
  }, [gameStarted, gameMode, difficulty, ballSpeed, player1Score, player2Score])

  const startGame = () => {
    setPlayer1Score(0)
    setPlayer2Score(0)
    setGameStarted(true)
  }

  const stopGame = () => {
    setGameStarted(false)
  }

  return (
    <div className="flex flex-col items-center">
      {!gameStarted ? (
        <div className="w-full max-w-md space-y-4 mb-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Game Mode</label>
            <Select value={gameMode} onValueChange={setGameMode}>
              <SelectTrigger>
                <SelectValue placeholder="Select game mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="singlePlayer">Single Player (vs AI)</SelectItem>
                <SelectItem value="twoPlayer">Two Player (Local)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {gameMode === "singlePlayer" && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Difficulty</label>
              <Select value={difficulty} onValueChange={setDifficulty}>
                <SelectTrigger>
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium">Ball Speed: {ballSpeed}</label>
            <Slider value={[ballSpeed]} min={3} max={10} step={1} onValueChange={(value) => setBallSpeed(value[0])} />
          </div>

          <Button onClick={startGame} className="w-full">
            Start Game
          </Button>
        </div>
      ) : (
        <div className="mb-4 flex justify-between w-full">
          <div>
            <p className="text-lg font-semibold">
              {gameMode === "singlePlayer" ? "You" : "Player 1"}: {player1Score}
            </p>
            <p className="text-lg font-semibold">
              {gameMode === "singlePlayer" ? "AI" : "Player 2"}: {player2Score}
            </p>
          </div>
          <Button variant="outline" onClick={stopGame}>
            End Game
          </Button>
        </div>
      )}

      <div className="relative border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
        <canvas ref={canvasRef} width={800} height={500} className="bg-black" />
        {!gameStarted && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70">
            <div className="text-white text-center">
              <h3 className="text-2xl font-bold mb-2">Pong Game</h3>
              <p className="mb-4">Configure your game settings and press Start Game</p>
              {gameMode === "twoPlayer" ? (
                <p>
                  Player 1: W/S keys
                  <br />
                  Player 2: Arrow Up/Down keys
                </p>
              ) : (
                <p>Controls: W/S keys</p>
              )}
            </div>
          </div>
        )}
      </div>

      {gameStarted && (
        <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          {gameMode === "twoPlayer" ? (
            <p>Player 1: W/S keys | Player 2: Arrow Up/Down keys</p>
          ) : (
            <p>Controls: W/S keys</p>
          )}
        </div>
      )}
    </div>
  )
}

