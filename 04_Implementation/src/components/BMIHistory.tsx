import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import { BmiRecord, getBmiCategory } from "../lib/bmi-utils";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface BMIHistoryProps {
  records: BmiRecord[];
  onDelete: (id: string) => void;
}

export const BMIHistory: React.FC<BMIHistoryProps> = ({ records, onDelete }) => {
  if (records.length === 0) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle>ประวัติการบันทึก (History)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-10 text-muted-foreground">
            ยังไม่มีข้อมูลประวัติ
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>ประวัติการบันทึก (History)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>วันที่</TableHead>
                <TableHead>น้ำหนัก (kg)</TableHead>
                <TableHead>ส่วนสูง (m)</TableHead>
                <TableHead>BMI</TableHead>
                <TableHead>ผลการประเมิน</TableHead>
                <TableHead className="text-right">จัดการ</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {records.slice().reverse().map((record) => {
                const category = getBmiCategory(record.bmi);
                return (
                  <TableRow key={record.id}>
                    <TableCell>{new Date(record.date).toLocaleDateString('th-TH')}</TableCell>
                    <TableCell>{record.weight}</TableCell>
                    <TableCell>{record.height}</TableCell>
                    <TableCell className="font-medium">{record.bmi}</TableCell>
                    <TableCell className={category.color}>{category.label}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDelete(record.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
