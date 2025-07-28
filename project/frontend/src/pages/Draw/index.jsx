export default function Draw() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">盲盒抽盒机</h1>
      {/* TODO: 抽盒功能 */}
      <div className="w-80 bg-white p-6 rounded shadow text-center">
        <p>点击按钮抽取盲盒！</p>
        <button className="mt-4 bg-purple-500 text-white p-2 rounded">抽盒</button>
      </div>
    </div>
  );
} 