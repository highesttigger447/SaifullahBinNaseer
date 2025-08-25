"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"

// Game constants
const GRAVITY = 0.5
const JUMP_FORCE = -10
const BIRD_WIDTH = 40
const BIRD_HEIGHT = 30
const PIPE_WIDTH = 60
const PIPE_GAP = 150
const PIPE_SPEED = 3
const GROUND_HEIGHT = 50

export default function FlappyBird() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [gameStarted, setGameStarted] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)

  // Game state refs (to avoid re-renders)
  const birdPosRef = useRef({ x: 100, y: 250, velocity: 0 })
  const pipesRef = useRef<Array<{ x: number; topHeight: number; scored: boolean }>>([])
  const animationFrameRef = useRef<number>(0)
  const gameStateRef = useRef({
    started: false,
    over: false,
    score: 0,
  })

  // Initialize the game
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = 400
    canvas.height = 600

    // Initial draw
    drawGame(ctx)

    // Event listeners
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.key === " ") {
        handleJump()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    canvas.addEventListener("click", handleJump)
    canvas.addEventListener("touchstart", handleJump)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      canvas.removeEventListener("click", handleJump)
      canvas.removeEventListener("touchstart", handleJump)
      cancelAnimationFrame(animationFrameRef.current)
    }
  }, [])

  // Update game state when gameStarted or gameOver changes
  useEffect(() => {
    gameStateRef.current.started = gameStarted
    gameStateRef.current.over = gameOver
    gameStateRef.current.score = score

    if (gameStarted && !gameOver) {
      startGameLoop()
    }
  }, [gameStarted, gameOver, score])

  // Handle jump action
  const handleJump = () => {
    if (gameStateRef.current.over) {
      resetGame()
      return
    }

    if (!gameStateRef.current.started) {
      setGameStarted(true)
      return
    }

    birdPosRef.current.velocity = JUMP_FORCE
  }

  // Start the game loop
  const startGameLoop = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Game loop
    const gameLoop = () => {
      if (!gameStateRef.current.started || gameStateRef.current.over) return

      updateGame()
      drawGame(ctx)
      animationFrameRef.current = requestAnimationFrame(gameLoop)
    }

    cancelAnimationFrame(animationFrameRef.current)
    animationFrameRef.current = requestAnimationFrame(gameLoop)
  }

  // Update game state
  const updateGame = () => {
    // Update bird position
    const bird = birdPosRef.current
    bird.velocity += GRAVITY
    bird.y += bird.velocity

    // Check for collisions with ground
    if (bird.y + BIRD_HEIGHT > canvasRef.current!.height - GROUND_HEIGHT) {
      endGame()
      return
    }

    // Check for collisions with ceiling
    if (bird.y < 0) {
      bird.y = 0
      bird.velocity = 0
    }

    // Update pipes
    const pipes = pipesRef.current

    // Add new pipe if needed
    if (pipes.length === 0 || pipes[pipes.length - 1].x < canvasRef.current!.width - 200) {
      const topHeight = Math.floor(Math.random() * (canvasRef.current!.height - PIPE_GAP - GROUND_HEIGHT - 100)) + 50
      pipes.push({
        x: canvasRef.current!.width,
        topHeight,
        scored: false,
      })
    }

    // Move pipes and check for collisions
    for (let i = 0; i < pipes.length; i++) {
      const pipe = pipes[i]
      pipe.x -= PIPE_SPEED

      // Check if pipe is off screen
      if (pipe.x + PIPE_WIDTH < 0) {
        pipes.splice(i, 1)
        i--
        continue
      }

      // Check for collision with pipe
      if (
        bird.x + BIRD_WIDTH > pipe.x &&
        bird.x < pipe.x + PIPE_WIDTH &&
        (bird.y < pipe.topHeight || bird.y + BIRD_HEIGHT > pipe.topHeight + PIPE_GAP)
      ) {
        endGame()
        return
      }

      // Check if bird passed the pipe
      if (!pipe.scored && bird.x > pipe.x + PIPE_WIDTH) {
        pipe.scored = true
        setScore((prevScore) => prevScore + 1)
        gameStateRef.current.score += 1
      }
    }
  }

  // Draw the game
  const drawGame = (ctx: CanvasRenderingContext2D) => {
    const canvas = canvasRef.current!
    const bird = birdPosRef.current
    const pipes = pipesRef.current

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw sky background
    ctx.fillStyle = "#87CEEB"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw pipes
    ctx.fillStyle = "#74C365" // Green pipes
    for (const pipe of pipes) {
      // Top pipe
      ctx.fillRect(pipe.x, 0, PIPE_WIDTH, pipe.topHeight)

      // Bottom pipe
      ctx.fillRect(
        pipe.x,
        pipe.topHeight + PIPE_GAP,
        PIPE_WIDTH,
        canvas.height - pipe.topHeight - PIPE_GAP - GROUND_HEIGHT,
      )
    }

    // Draw ground
    ctx.fillStyle = "#DEB887" // Sandy color
    ctx.fillRect(0, canvas.height - GROUND_HEIGHT, canvas.width, GROUND_HEIGHT)

    // Draw bird
    ctx.fillStyle = "#FFD700" // Yellow bird
    ctx.beginPath()
    ctx.ellipse(bird.x + BIRD_WIDTH / 2, bird.y + BIRD_HEIGHT / 2, BIRD_WIDTH / 2, BIRD_HEIGHT / 2, 0, 0, Math.PI * 2)
    ctx.fill()

    // Draw eye
    ctx.fillStyle = "#000"
    ctx.beginPath()
    ctx.arc(bird.x + BIRD_WIDTH - 10, bird.y + BIRD_HEIGHT / 2 - 5, 3, 0, Math.PI * 2)
    ctx.fill()

    // Draw beak
    ctx.fillStyle = "#FF8C00"
    ctx.beginPath()
    ctx.moveTo(bird.x + BIRD_WIDTH, bird.y + BIRD_HEIGHT / 2)
    ctx.lineTo(bird.x + BIRD_WIDTH + 10, bird.y + BIRD_HEIGHT / 2 - 5)
    ctx.lineTo(bird.x + BIRD_WIDTH + 10, bird.y + BIRD_HEIGHT / 2 + 5)
    ctx.fill()

    // Draw score
    ctx.fillStyle = "#FFF"
    ctx.font = "bold 32px Arial"
    ctx.textAlign = "center"
    ctx.fillText(gameStateRef.current.score.toString(), canvas.width / 2, 50)
    ctx.strokeStyle = "#000"
    ctx.lineWidth = 2
    ctx.strokeText(gameStateRef.current.score.toString(), canvas.width / 2, 50)

    // Draw game messages
    if (!gameStateRef.current.started) {
      ctx.fillStyle = "rgba(0, 0, 0, 0.5)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = "#FFF"
      ctx.font = "bold 36px Arial"
      ctx.textAlign = "center"
      ctx.fillText("Flappy Bird", canvas.width / 2, canvas.height / 2 - 50)

      ctx.font = "20px Arial"
      ctx.fillText("Click or Press Space to Start", canvas.width / 2, canvas.height / 2)
    }

    if (gameStateRef.current.over) {
      ctx.fillStyle = "rgba(0, 0, 0, 0.5)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = "#FFF"
      ctx.font = "bold 36px Arial"
      ctx.textAlign = "center"
      ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2 - 50)

      ctx.font = "20px Arial"
      ctx.fillText(`Score: ${gameStateRef.current.score}`, canvas.width / 2, canvas.height / 2)
      ctx.fillText(
        `High Score: ${Math.max(highScore, gameStateRef.current.score)}`,
        canvas.width / 2,
        canvas.height / 2 + 30,
      )

      ctx.font = "16px Arial"
      ctx.fillText("Click or Press Space to Restart", canvas.width / 2, canvas.height / 2 + 70)
    }
  }

  // End the game
  const endGame = () => {
    setGameOver(true)
    setHighScore((prev) => Math.max(prev, gameStateRef.current.score))
    cancelAnimationFrame(animationFrameRef.current)

    // Redraw to show game over screen
    const ctx = canvasRef.current?.getContext("2d")
    if (ctx) drawGame(ctx)
  }

  // Reset the game
  const resetGame = () => {
    birdPosRef.current = { x: 100, y: 250, velocity: 0 }
    pipesRef.current = []
    setScore(0)
    setGameOver(false)
    setGameStarted(true)
  }

  return (
    <div className="flex flex-col items-center">
      <canvas
        ref={canvasRef}
        className="border-4 border-yellow-500 rounded-lg shadow-lg cursor-pointer"
        width={400}
        height={600}
      />

      <div className="mt-4 flex gap-4">
        {!gameStarted && (
          <Button onClick={() => setGameStarted(true)} className="bg-yellow-500 hover:bg-yellow-600 text-white">
            Start Game
          </Button>
        )}

        {gameOver && (
          <Button onClick={resetGame} className="bg-green-500 hover:bg-green-600 text-white">
            Play Again
          </Button>
        )}
      </div>

      <div className="mt-4 text-center">
        <p className="text-sm text-white font-medium">Click, tap, or press spacebar to make the bird jump</p>
        <p className="text-sm text-white font-medium mt-1">Avoid the pipes and try to get the highest score!</p>
      </div>
    </div>
  )
}
