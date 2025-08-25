import FlappyBird from "@/components/flappy-bird"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-sky-400 to-sky-200">
      <h1 className="text-4xl font-bold mb-6 text-white drop-shadow-md">Flappy Bird</h1>
      <FlappyBird />
    </main>
  )
}
