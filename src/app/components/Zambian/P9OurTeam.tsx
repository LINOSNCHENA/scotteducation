import { ISpecialists } from "@/app/utils/constants";

export function S8OurTeam() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">5. Meet Our Expert Team</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">Dedicated professionals delivering innovative solutions with technical excellence.</p>
        </div> */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10">
          {ISpecialists.map((specialist, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-200" style={{ overflow: "visible" }}>
              <div className="mb-4">
                <h3
                  className="text-xl font-semibold text-gray-800"
                  style={{
                    whiteSpace: "normal",
                    overflow: "visible",
                    textOverflow: "unset",
                    wordBreak: "break-word",
                  }}
                >
                  {specialist.name}
                </h3>
                <p
                  className="text-sm text-blue-600 font-medium"
                  style={{
                    whiteSpace: "normal",
                    overflow: "visible",
                    textOverflow: "unset",
                    wordBreak: "break-word",
                  }}
                >
                  {specialist.role}
                </p>
              </div>
              <p
                className="text-gray-600 text-sm leading-relaxed"
                style={{
                  whiteSpace: "normal",
                  overflow: "visible",
                  textOverflow: "unset",
                  wordBreak: "break-word",
                }}
              >
                {specialist.description}
              </p>
              <div
                className={`mt-6 h-1 w-16 mx-auto rounded-full ${
                  specialist.role.includes("Senior")
                    ? "bg-blue-500"
                    : specialist.role.includes("Junior")
                      ? "bg-green-500"
                      : specialist.role.includes("Cyber")
                        ? "bg-purple-500"
                        : "bg-gray-300"
                }`}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
