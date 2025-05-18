import type { User } from "../../utils/types";

export const useExportCSV = (data: User[]) => {
  const exportCSV = () => {
    const csvRows = [
      ["Name", "Dept", "Job Title", "Start Date", "Category", "Gender"],
      ...data.map((u) => [
        `${u.firstName} ${u.lastName}`,
        u.department,
        u.jobTitle,
        u.startDate,
        u.category,
        u.gender,
      ]),
    ];
    const blob = new Blob([csvRows.map(r => r.join(",")).join("\n")], {
      type: "text/csv;charset=utf-8;",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "employee_data.csv";
    link.click();
  };
  return exportCSV;
};
