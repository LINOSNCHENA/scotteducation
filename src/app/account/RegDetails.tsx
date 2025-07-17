import { RegistrationData } from "@/types/Model.Universities";
// import { IAcademicPeriod, ISemester, ICourse, ILeisureTrip } from "@/types/your-types-file"; // Make sure to import these interfaces

interface RegistrationDetailsProps {
  registration: RegistrationData;
}

const RegistrationDetails: React.FC<RegistrationDetailsProps> = ({ registration }) => {
  const { student_id, academicPeriod, semester, status, payment_status, total_cost, created_at, registration_date } = registration;

  // Format dates for display
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Helper function to get status color
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "orange";
      case "approved":
      case "paid":
        return "green";
      case "rejected":
      case "unpaid":
        return "red";
      default:
        return "black";
    }
  };

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "20px",
        marginBottom: "20px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ marginTop: 0, marginBottom: "20px" }}>Registration Details</h2>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        <div>
          <h3 style={{ margin: "0 0 5px 0", fontSize: "14px" }}>Student ID:</h3>
          <p style={{ margin: 0 }}>{student_id}</p>
        </div>

        <div>
          <h3 style={{ margin: "0 0 5px 0", fontSize: "14px" }}>Registration Status:</h3>
          <p
            style={{
              margin: 0,
              color: getStatusColor(status),
              fontWeight: "bold",
            }}
          >
            {status.toUpperCase()}
          </p>
        </div>

        <div>
          <h3 style={{ margin: "0 0 5px 0", fontSize: "14px" }}>Payment Status:</h3>
          <p
            style={{
              margin: 0,
              color: getStatusColor(payment_status),
              fontWeight: "bold",
            }}
          >
            {payment_status.toUpperCase()}
          </p>
        </div>
      </div>

      {academicPeriod && (
        <>
          <hr style={{ border: "none", borderTop: "1px solid #eee", margin: "20px 0" }} />

          <h3 style={{ marginBottom: "15px" }}>Academic Period</h3>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
              gap: "15px",
            }}
          >
            <li>
              <strong>Name:</strong> {academicPeriod?.name}
            </li>
            <li>
              <strong>Start Date:</strong> {formatDate(academicPeriod?.start_date)}
            </li>
            <li>
              <strong>End Date:</strong> {formatDate(academicPeriod?.end_date)}
            </li>
            <li>
              <strong>Registration Deadline:</strong> {formatDate(academicPeriod?.registration_deadline)}
            </li>
            <li>
              <strong>Current:</strong> {academicPeriod?.is_current ? "Yes" : "No"}
            </li>
          </ul>
        </>
      )}

      {semester && (
        <>
          <hr style={{ border: "none", borderTop: "1px solid #eee", margin: "20px 0" }} />

          <h3 style={{ marginBottom: "15px" }}>Semester Details</h3>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
              gap: "15px",
            }}
          >
            <li>
              <strong>Name:</strong> {semester?.name}
            </li>
            <li>
              <strong>Start Date:</strong> {formatDate(semester?.start_date)}
            </li>
            <li>
              <strong>End Date:</strong> {formatDate(semester?.end_date)}
            </li>
            <li>
              <strong>Exam Period Start:</strong> {formatDate(semester?.exam_period_start)}
            </li>
          </ul>
        </>
      )}

      <hr style={{ border: "none", borderTop: "1px solid #eee", margin: "20px 0" }} />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        <div>
          <h3 style={{ margin: "0 0 5px 0", fontSize: "14px" }}>Total Cost:</h3>
          <p style={{ margin: 0, fontWeight: "bold", fontSize: "18px" }}>${total_cost?.toFixed(2)}</p>
        </div>

        <div>
          <h3 style={{ margin: "0 0 5px 0", fontSize: "14px" }}>Created At:</h3>
          <p style={{ margin: 0 }}>{formatDate(created_at)}</p>
        </div>

        <div>
          <h3 style={{ margin: "0 0 5px 0", fontSize: "14px" }}>Registration Date:</h3>
          <p style={{ margin: 0 }}>{formatDate(registration_date)}</p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationDetails;
