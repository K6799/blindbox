export default function Search() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">盲盒搜索</h1>
      {/* TODO: 搜索功能 */}
      <div className="bg-white p-4 rounded shadow">
        <input className="w-full p-2 border rounded mb-2" placeholder="输入关键词搜索盲盒" />
        <p>暂无搜索结果</p>
      </div>
    </div>
  );
} 