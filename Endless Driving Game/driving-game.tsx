"use client"

import React, { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Box, Text, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'

// Player car component
const PlayerCar = ({ position, setPosition }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case 'ArrowLeft':
          setPosition((prev) => ({ ...prev, x: Math.max(prev.x - 0.5, -2.5) }))
          break
        case 'ArrowRight':
          setPosition((prev) => ({ ...prev, x: Math.min(prev.x + 0.5, 2.5) }))
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [setPosition])

  return (
    <Box args={[1, 0.5, 2]} position={[position.x, 0.25, position.z]}>
      <meshStandardMaterial color="blue" />
    </Box>
  )
}

// Traffic car component
const TrafficCar = ({ position }) => {
  return (
    <Box args={[1, 0.5, 2]} position={position}>
      <meshStandardMaterial color="red" />
    </Box>
  )
}

// Road component
const Road = () => {
  return (
    <Box args={[6, 0.1, 1000]} position={[0, -0.05, 0]}>
      <meshStandardMaterial color="gray" />
    </Box>
  )
}

// Main game component
const Game = () => {
  const [playerPosition, setPlayerPosition] = useState({ x: 0, z: 0 })
  const [trafficCars, setTrafficCars] = useState([])
  const [score, setScore] = useState(0)
  const cameraRef = useRef()

  // Generate new traffic cars
  useEffect(() => {
    const interval = setInterval(() => {
      const newCar = {
        id: Math.random(),
        x: Math.random() * 5 - 2.5,
        z: -100
      }
      setTrafficCars(prev => [...prev, newCar])
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  // Update traffic cars and check collisions
  useFrame((state, delta) => {
    setTrafficCars(prev => 
      prev.map(car => ({ ...car, z: car.z + delta * 30 }))
        .filter(car => {
          if (car.z > 10) {
            setScore(s => s + 1)
            return false
          }
          return true
        })
    )

    // Check for collisions
    trafficCars.forEach(car => {
      if (Math.abs(car.x - playerPosition.x) < 1 && Math.abs(car.z - playerPosition.z) < 2) {
        console.log("Game Over! Score:", score)
        setTrafficCars([])
        setScore(0)
      }
    })

    // Update camera position
    if (cameraRef.current) {
      cameraRef.current.position.x = playerPosition.x
      cameraRef.current.position.y = 5
      cameraRef.current.position.z = playerPosition.z + 10
    }
  })

  return (
    <>
      <PerspectiveCamera ref={cameraRef} makeDefault />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Road />
      <PlayerCar position={playerPosition} setPosition={setPlayerPosition} />
      {trafficCars.map(car => (
        <TrafficCar key={car.id} position={[car.x, 0.25, car.z]} />
      ))}
      <Text
        position={[0, 3, playerPosition.z + 5]}
        fontSize={0.5}
        color="black"
        anchorX="center"
        anchorY="middle"
      >
        Score: {score}
      </Text>
    </>
  )
}

export default function DrivingGame() {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <Canvas>
        <Game />
      </Canvas>
    </div>
  )
}

