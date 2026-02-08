
export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-r from-pink-500 via-purple-500 to-indigo-500" >
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
          Will you be my Valentine?
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          I'm so excited to spend this special day with you!
        </p>

        <div className="flex gap-4">
          <button className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full transition duration-300">
            Yes
          </button>
          <button className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-full transition duration-300">
            No
          </button>
        </div>
      </div>
    </div>
  );
}
