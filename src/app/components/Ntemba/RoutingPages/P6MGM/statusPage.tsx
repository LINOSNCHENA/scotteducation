"use client";

import React, { useState, useMemo } from "react";
import { Button, Space, message, Card, Typography, Table } from "antd";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { saveAs } from "file-saver";
import { initialTasks, TaskItem } from "./data";
import { DownloadOutlined, PrinterOutlined } from "@ant-design/icons";
import type { ColumnType } from "antd/es/table";

const { Title } = Typography;

const TaskExportControls = ({ tasks, selectedRowKeys }: { tasks: TaskItem[]; selectedRowKeys: React.Key[] }) => {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);
  const selectedTasks = useMemo(() => tasks.filter((task) => selectedRowKeys.includes(task.key)), [selectedRowKeys, tasks]);

  const handlePrint = () => {
    if (selectedRowKeys.length === 0) {
      message.warning("Please select tasks to print");
      return;
    }
    setIsPrinting(true);
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      message.error("Could not open print window");
      setIsPrinting(false);
      return;
    }

    printWindow.document.write(`
      <html>
        <head>
          <title>Web Development Tasks</title>
          <style>
            @page { size: A4; margin: 20mm; }
            body { font-family: Arial; font-size: 12px; }
            h1 { color: #333; text-align: center; }
            ul { list-style-type: none; padding-left: 0; }
            li { margin-bottom: 8px; padding-bottom: 4px; border-bottom: 1px solid #eee; }
            .completed { text-decoration: line-through; color: #777; }
          </style>
        </head>
        <body>
          <h1>Web Development Tasks Report</h1>
          <p>Generated on ${new Date().toLocaleDateString()}</p>
          <p>Total tasks: ${selectedTasks.length}</p>
          <ul>
            ${selectedTasks
              .map(
                (task) => `
              <li class="${task.status === "Complete" ? "completed" : ""}">
                ${task.task} [${task.category}] - Priority: ${task.priority}
              </li>
            `
              )
              .join("")}
          </ul>
          <script>
            setTimeout(() => {
              window.print();
              window.close();
            }, 100);
          </script>
        </body>
      </html>
    `);

    printWindow.document.close();
    setIsPrinting(false);
  };

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true);
    try {
      const pdfDoc = await PDFDocument.create();
      let page = pdfDoc.addPage([595, 842]);

      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

      let yPosition = 750;
      const leftMargin = 50;

      page.drawText("Web Development Tasks Report", {
        x: leftMargin,
        y: yPosition,
        size: 24,
        font: boldFont,
        color: rgb(0, 0, 0),
      });
      yPosition -= 40;

      page.drawText(`Generated on ${new Date().toLocaleDateString()} | ${selectedTasks.length} tasks`, {
        x: leftMargin,
        y: yPosition,
        size: 10,
        font: font,
        color: rgb(0.4, 0.4, 0.4),
      });
      yPosition -= 30;

      const fontSize = 12;
      const lineHeight = 15;

      selectedTasks.forEach((task) => {
        if (yPosition < 50) {
          page = pdfDoc.addPage([595, 842]);
          yPosition = 750;
        }

        const taskText = `${task.task} [${task.category}] - Priority: ${task.priority}`;
        const color = task.status === "Complete" ? rgb(0.5, 0.5, 0.5) : rgb(0, 0, 0);

        page.drawText(taskText, {
          x: leftMargin,
          y: yPosition,
          size: fontSize,
          font: font,
          color,
        });

        if (task.status === "Complete") {
          const textWidth = font.widthOfTextAtSize(taskText, fontSize);
          page.drawLine({
            start: { x: leftMargin, y: yPosition + 4 },
            end: { x: leftMargin + textWidth, y: yPosition + 4 },
            thickness: 1,
            color: rgb(0.5, 0.5, 0.5),
          });
        }

        yPosition -= lineHeight;
      });

      const pdfBytes = await pdfDoc.save();
      saveAs(new Blob([pdfBytes], { type: "application/pdf" }), "webdev_tasks.pdf");
      message.success("PDF downloaded successfully");
    } catch (error) {
      console.error("PDF generation error:", error);
      message.error("Failed to generate PDF");
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <Space>
      <Button icon={<PrinterOutlined />} loading={isPrinting} disabled={!selectedRowKeys.length} onClick={handlePrint}>
        Print {selectedRowKeys.length ? `(${selectedRowKeys.length})` : ""}
      </Button>
      <Button icon={<DownloadOutlined />} loading={isGeneratingPDF} disabled={!selectedRowKeys.length} onClick={handleDownloadPDF}>
        Download PDF
      </Button>
    </Space>
  );
};

const taskColumns: ColumnType<TaskItem>[] = [
  {
    title: "Task",
    dataIndex: "task",
    key: "task",
    width: "40%",
    sorter: (a, b) => a.task.localeCompare(b.task),
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
    filters: [
      { text: "Planning", value: "Planning" },
      { text: "Design", value: "Design" },
      { text: "Frontend", value: "Frontend" },
      { text: "Backend", value: "Backend" },
    ],
    onFilter: (value, record) => record.category === value.toString(),
  },
  {
    title: "Priority",
    dataIndex: "priority",
    key: "priority",
    sorter: (a, b) => a.priority.localeCompare(b.priority),
    render: (priority: "High" | "Medium" | "Low") => (
      <span
        style={{
          color: priority === "High" ? "red" : priority === "Medium" ? "orange" : "green",
        }}
      >
        {priority}
      </span>
    ),
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status: "Complete" | "Pending") => <span style={{ color: status === "Complete" ? "green" : "orange" }}>{status}</span>,
  },
];

export default function TaskManagementPage() {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const rowSelection = {
    selectedRowKeys,
    onChange: (keys: React.Key[]) => setSelectedRowKeys(keys),
    selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT, Table.SELECTION_NONE],
  };

  return (
    <section className="py-2 px-2 sm:px-6 lg:px-12 bg-white">
      <div className="max-w-8xl mx-auto w-full text-black bg-gray-200 p-4 rounded-lg shadow-md">
        <Card title={<Title level={4}>Task Management</Title>}>
          <div style={{ marginBottom: 16 }}>
            <TaskExportControls tasks={initialTasks} selectedRowKeys={selectedRowKeys} />
          </div>

          <Table rowSelection={rowSelection} columns={taskColumns} dataSource={initialTasks} rowKey="key" pagination={{ pageSize: 10 }} scroll={{ x: true }} bordered />
        </Card>
        {/* <Footer /> */}
      </div>
    </section>
  );
}
