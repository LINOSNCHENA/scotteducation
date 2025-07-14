// //
// // Motto
// //

"use client";

const handleDownload = (index: number) => {
  const link = document.createElement("a");
  link.href = `/pdfs?index=${index}`;
  link.download = `pdf-${index + 1}.pdf`;
  link.click();
};

export default function S11Downloads() {
  return (
    <section className="w-full min-w-9xl py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-gray-300">
      <div className="min-w-8xl mx-auto bg-white p-4 rounded-xl shadow-lg border border-gray-100 w-[85%]">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-full min-w-9xl mx-auto px-4">
          {Array.from({ length: 25 }).map((_, index) => (
            <button
              key={index}
              onClick={() => handleDownload(index)}
              className="w-full py-4 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 whitespace-nowrap overflow-hidden text-ellipsis"
            >
              Download PDF {index + 1}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
