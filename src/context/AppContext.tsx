import React, { createContext, useContext, useState } from 'react';

export interface SchoolProfile {
  name: string;
  address: string;
  district: string;
  state: string;
  pinCode: string;
  principalName: string;
  contactNumber: string;
  udiseCode?: string;
  logo: string | null;
  academicYear: string;
}

export interface Student {
  id: string;
  admissionNumber: string;
  name: string;
  dob: string;
  gender: string;
  aadhaarNumber?: string;
  bloodGroup: string;
  religion: string;
  motherTongue: string;
  category: 'General' | 'OBC' | 'SC' | 'ST' | 'EWS';
  fatherName: string;
  motherName: string;
  fatherAadhaar?: string;
  motherAadhaar?: string;
  fatherVoterId?: string;
  motherVoterId?: string;
  parentOccupation: string;
  annualIncome: string;
  parentContact: string;
  emergencyContact: string;
  email: string;
  address: string;
  pinCode: string;
  district: string;
  state: string;
  classId: string;
  section: string;
  medium: 'Hindi' | 'English';
  isRTE: boolean;
  status: 'Active' | 'Left' | 'Promoted';
  attendance: { date: string; status: 'Present' | 'Absent' | 'Late' | 'Half-Day' }[];
  fees: { head: string; amount: number; paid: boolean; receiptNo?: string; paidDate?: string }[];
  marks: { term: string; skills: Record<string, 'Excellent' | 'Good' | 'Satisfactory' | 'Needs Improvement'> }[];
}

export interface Teacher {
  id: string;
  employeeId: string;
  name: string;
  qualification: string;
  dateOfJoining: string;
  assignedClass?: string;
  subjects: string[];
  contact: string;
  email?: string;
  aadhaar?: string;
  salary?: number;
  designation?: string;
}

export interface ClassRoom {
  id: string;
  name: string;
  sections: string[];
  capacity: number;
  classTeacherId?: string;
  medium: 'Hindi' | 'English';
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  classId: string;
  teacherId: string;
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  category: 'Academic' | 'General' | 'Urgent';
  date: string;
  expiryDate: string;
}

export interface RoutineSlot {
  day: string;
  slot: string;
  subjectId: string;
  teacherId: string;
}

export interface LeaveRequest {
  id: string;
  staffId: string;
  staffName: string;
  type: 'Sick Leave' | 'Casual Leave' | 'Earned Leave' | 'Maternity Leave';
  fromDate: string;
  toDate: string;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  appliedDate: string;
}

export interface SalaryRecord {
  id: string;
  staffId: string;
  staffName: string;
  month: string;
  basicSalary: number;
  allowances: number;
  deductions: number;
  netSalary: number;
  status: 'Paid' | 'Pending';
  paidDate?: string;
}

export interface HomeworkAssignment {
  id: string;
  classId: string;
  subjectName: string;
  title: string;
  description: string;
  assignedDate: string;
  dueDate: string;
  teacherName: string;
}

export interface ExamSchedule {
  id: string;
  examName: string;
  classId: string;
  subjectName: string;
  date: string;
  startTime: string;
  endTime: string;
  venue: string;
  totalMarks: number;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  type: 'Holiday' | 'Event' | 'Exam' | 'Meeting' | 'PTM';
  description?: string;
}

export interface FeeReceipt {
  id: string;
  receiptNo: string;
  studentId: string;
  studentName: string;
  admissionNumber: string;
  classId: string;
  feeHead: string;
  amount: number;
  paymentMode: 'Cash' | 'Online' | 'Cheque';
  date: string;
  collectedBy: string;
}

const API_BASE_URL = 'http://localhost:3001/api';

interface AppContextType {
  schoolProfile: SchoolProfile;
  students: Student[];
  teachers: Teacher[];
  classes: ClassRoom[];
  subjects: Subject[];
  notices: Notice[];
  routines: Record<string, RoutineSlot[]>;
  leaveRequests: LeaveRequest[];
  salaryRecords: SalaryRecord[];
  homeworkAssignments: HomeworkAssignment[];
  examSchedules: ExamSchedule[];
  calendarEvents: CalendarEvent[];
  feeReceipts: FeeReceipt[];
  loading: boolean;
  error: string | null;
  attendanceRecords: { studentId: string; date: string; status: string }[];
  updateSchoolProfile: (profile: SchoolProfile) => void;
  addStudent: (student: any) => Promise<void>;
  updateStudent: (id: string, updates: Partial<Student>) => Promise<void>;
  addTeacher: (teacher: any) => Promise<void>;
  updateTeacher: (id: string, updates: Partial<Teacher>) => Promise<void>;
  deleteTeacher: (id: string) => Promise<void>;
  markAttendance: (studentId: string, date: string, status: string) => Promise<void>;
  addClass: (cls: ClassRoom) => void;
  addSubject: (subject: Subject) => void;
  deleteSubject: (id: string) => void;
  addNotice: (notice: Notice) => void;
  deleteNotice: (id: string) => void;
  updateRoutine: (key: string, slots: RoutineSlot[]) => void;
  addLeaveRequest: (req: LeaveRequest) => void;
  updateLeaveStatus: (id: string, status: 'Approved' | 'Rejected') => void;
  addSalaryRecord: (rec: SalaryRecord) => void;
  updateSalaryStatus: (id: string, status: 'Paid', paidDate: string) => void;
  addHomework: (hw: HomeworkAssignment) => void;
  deleteHomework: (id: string) => void;
  addExam: (exam: ExamSchedule) => void;
  deleteExam: (id: string) => void;
  addCalendarEvent: (event: CalendarEvent) => void;
  deleteCalendarEvent: (id: string) => void;
  addFeeReceipt: (receipt: FeeReceipt) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [attendanceRecords, setAttendanceRecords] = React.useState<{ studentId: string; date: string; status: string }[]>([]);
  
  const [schoolProfile, setSchoolProfile] = useState<SchoolProfile>({
    name: 'Little Hearts Nursery School',
    address: '123 Education Lane',
    district: 'Central',
    state: 'Delhi',
    pinCode: '110001',
    principalName: 'Mrs. Sarita Verma',
    contactNumber: '+91 9876543210',
    academicYear: '2025-26 (April-March)',
    logo: null
  });

  const [students, setStudents] = useState<Student[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  // Default classes — seeded from DB or fallback
  const [classes, setClasses] = useState<ClassRoom[]>([
    { id: 'Playgroup', name: 'Playgroup', sections: ['A'], capacity: 20, medium: 'English' },
    { id: 'Nursery',   name: 'Nursery',   sections: ['A', 'B'], capacity: 25, medium: 'English' },
    { id: 'LKG',       name: 'LKG',       sections: ['A'], capacity: 30, medium: 'English' },
    { id: 'UKG',       name: 'UKG',       sections: ['A'], capacity: 30, medium: 'English' },
  ]);
  const [subjects, setSubjects]                     = useState<Subject[]>([]);
  const [notices, setNotices]                       = useState<Notice[]>([]);
  const [routines, setRoutines]                     = useState<Record<string, RoutineSlot[]>>({});
  const [leaveRequests, setLeaveRequests]           = useState<LeaveRequest[]>([]);
  const [salaryRecords, setSalaryRecords]           = useState<SalaryRecord[]>([]);
  const [homeworkAssignments, setHomeworkAssignments] = useState<HomeworkAssignment[]>([]);
  const [examSchedules, setExamSchedules]           = useState<ExamSchedule[]>([]);
  const [calendarEvents, setCalendarEvents]         = useState<CalendarEvent[]>([]);
  const [feeReceipts, setFeeReceipts]               = useState<FeeReceipt[]>([]);


  // Fetch ALL data from API on load
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const endpoints = [
          'students', 'teachers', 'attendance', 'notices',
          'leave', 'salary', 'homework', 'exams',
          'calendar', 'fees', 'subjects'
        ];
        const results = await Promise.allSettled(
          endpoints.map(ep => fetch(`${API_BASE_URL}/${ep}`).then(r => r.ok ? r.json() : []))
        );
        const getValue = (i: number) => results[i].status === 'fulfilled' ? results[i].value : [];
        setStudents(getValue(0));
        setTeachers(getValue(1));
        setAttendanceRecords(getValue(2));
        setNotices(getValue(3));
        setLeaveRequests(getValue(4));
        setSalaryRecords(getValue(5));
        setHomeworkAssignments(getValue(6));
        setExamSchedules(getValue(7));
        setCalendarEvents(getValue(8));
        setFeeReceipts(getValue(9));
        setSubjects(getValue(10));
        setError(null);
      } catch (err: any) {
        console.error('API error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);


  const addStudent = async (student: any) => {
    try {
      const res = await fetch(`${API_BASE_URL}/students`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(student)
      });
      if (!res.ok) throw new Error('Failed to add student');
      const newStudent = await res.json();
      setStudents(prev => [...prev, newStudent]);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const updateStudent = async (id: string, updates: Partial<Student>) => {
    try {
      const res = await fetch(`${API_BASE_URL}/students/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
      if (!res.ok) throw new Error('Failed to update student');
      const updatedStudent = await res.json();
      setStudents(prev => prev.map(s => s.id === id ? updatedStudent : s));
    } catch (err: any) {
      setError(err.message);
    }
  };

  const addTeacher = async (teacher: any) => {
    try {
      const res = await fetch(`${API_BASE_URL}/teachers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(teacher)
      });
      if (!res.ok) throw new Error('Failed to add teacher');
      const newTeacher = await res.json();
      setTeachers(prev => [...prev, newTeacher]);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const updateTeacher = async (id: string, updates: Partial<Teacher>) => {
    try {
      const res = await fetch(`${API_BASE_URL}/teachers/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
      if (!res.ok) throw new Error('Failed to update teacher');
      const updatedTeacher = await res.json();
      setTeachers(prev => prev.map(t => t.id === id ? updatedTeacher : t));
    } catch (err: any) {
      setError(err.message);
    }
  };

  const deleteTeacher = async (id: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/teachers/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete teacher');
      setTeachers(prev => prev.filter(t => t.id !== id));
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Bug fix: Proper attendance marking via API
  const markAttendance = async (studentId: string, date: string, status: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/attendance`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId, date, status })
      });
      if (!res.ok) throw new Error('Failed to mark attendance');
      const record = await res.json();
      setAttendanceRecords(prev => {
        const filtered = prev.filter(r => !(r.studentId === studentId && r.date.startsWith(date)));
        return [...filtered, record];
      });
    } catch (err: any) {
      console.error('Attendance error:', err);
    }
  };

  const addClass = async (cls: ClassRoom) => {
    try {
      const res = await fetch(`${API_BASE_URL}/classes`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(cls)
      });
      const newCls = res.ok ? await res.json() : cls;
      setClasses(prev => [...prev, newCls]);
    } catch { setClasses(prev => [...prev, cls]); }
  };

  const addSubject = async (subject: Subject) => {
    try {
      const res = await fetch(`${API_BASE_URL}/subjects`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(subject)
      });
      const newSub = res.ok ? await res.json() : subject;
      setSubjects(prev => [...prev, newSub]);
    } catch { setSubjects(prev => [...prev, subject]); }
  };

  const deleteSubject = async (id: string) => {
    try {
      await fetch(`${API_BASE_URL}/subjects/${id}`, { method: 'DELETE' });
      setSubjects(prev => prev.filter(s => s.id !== id));
    } catch { setSubjects(prev => prev.filter(s => s.id !== id)); }
  };

  const addNotice = async (notice: Notice) => {
    try {
      const res = await fetch(`${API_BASE_URL}/notices`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(notice)
      });
      const newNotice = res.ok ? await res.json() : notice;
      setNotices(prev => [...prev, newNotice]);
    } catch { setNotices(prev => [...prev, notice]); }
  };

  const deleteNotice = async (id: string) => {
    try {
      await fetch(`${API_BASE_URL}/notices/${id}`, { method: 'DELETE' });
      setNotices(prev => prev.filter(n => n.id !== id));
    } catch { setNotices(prev => prev.filter(n => n.id !== id)); }
  };

  const updateRoutine = (key: string, slots: RoutineSlot[]) => setRoutines(prev => ({ ...prev, [key]: slots }));

  const addLeaveRequest = async (req: LeaveRequest) => {
    try {
      const res = await fetch(`${API_BASE_URL}/leave`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(req)
      });
      const newReq = res.ok ? await res.json() : req;
      setLeaveRequests(prev => [...prev, newReq]);
    } catch { setLeaveRequests(prev => [...prev, req]); }
  };

  const updateLeaveStatus = async (id: string, status: 'Approved' | 'Rejected') => {
    try {
      const res = await fetch(`${API_BASE_URL}/leave/${id}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status })
      });
      const updated = res.ok ? await res.json() : null;
      setLeaveRequests(prev => prev.map(r => r.id === id ? (updated || { ...r, status }) : r));
    } catch { setLeaveRequests(prev => prev.map(r => r.id === id ? { ...r, status } : r)); }
  };

  const addSalaryRecord = async (rec: SalaryRecord) => {
    try {
      const res = await fetch(`${API_BASE_URL}/salary`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(rec)
      });
      const newRec = res.ok ? await res.json() : rec;
      setSalaryRecords(prev => [...prev, newRec]);
    } catch { setSalaryRecords(prev => [...prev, rec]); }
  };

  const updateSalaryStatus = async (id: string, status: 'Paid', paidDate: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/salary/${id}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status, paidDate })
      });
      const updated = res.ok ? await res.json() : null;
      setSalaryRecords(prev => prev.map(r => r.id === id ? (updated || { ...r, status, paidDate }) : r));
    } catch { setSalaryRecords(prev => prev.map(r => r.id === id ? { ...r, status, paidDate } : r)); }
  };

  const addHomework = async (hw: HomeworkAssignment) => {
    try {
      const res = await fetch(`${API_BASE_URL}/homework`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(hw)
      });
      const newHw = res.ok ? await res.json() : hw;
      setHomeworkAssignments(prev => [...prev, newHw]);
    } catch { setHomeworkAssignments(prev => [...prev, hw]); }
  };

  const deleteHomework = async (id: string) => {
    try {
      await fetch(`${API_BASE_URL}/homework/${id}`, { method: 'DELETE' });
      setHomeworkAssignments(prev => prev.filter(h => h.id !== id));
    } catch { setHomeworkAssignments(prev => prev.filter(h => h.id !== id)); }
  };

  const addExam = async (exam: ExamSchedule) => {
    try {
      const res = await fetch(`${API_BASE_URL}/exams`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(exam)
      });
      const newExam = res.ok ? await res.json() : exam;
      setExamSchedules(prev => [...prev, newExam]);
    } catch { setExamSchedules(prev => [...prev, exam]); }
  };

  const deleteExam = async (id: string) => {
    try {
      await fetch(`${API_BASE_URL}/exams/${id}`, { method: 'DELETE' });
      setExamSchedules(prev => prev.filter(e => e.id !== id));
    } catch { setExamSchedules(prev => prev.filter(e => e.id !== id)); }
  };

  const addCalendarEvent = async (event: CalendarEvent) => {
    try {
      const res = await fetch(`${API_BASE_URL}/calendar`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(event)
      });
      const newEvent = res.ok ? await res.json() : event;
      setCalendarEvents(prev => [...prev, newEvent]);
    } catch { setCalendarEvents(prev => [...prev, event]); }
  };

  const deleteCalendarEvent = async (id: string) => {
    try {
      await fetch(`${API_BASE_URL}/calendar/${id}`, { method: 'DELETE' });
      setCalendarEvents(prev => prev.filter(e => e.id !== id));
    } catch { setCalendarEvents(prev => prev.filter(e => e.id !== id)); }
  };

  const addFeeReceipt = async (receipt: FeeReceipt) => {
    try {
      const res = await fetch(`${API_BASE_URL}/fees`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(receipt)
      });
      const newReceipt = res.ok ? await res.json() : receipt;
      setFeeReceipts(prev => [...prev, newReceipt]);
    } catch { setFeeReceipts(prev => [...prev, receipt]); }
  };

  const updateSchoolProfile = (profile: SchoolProfile) => setSchoolProfile(profile);

  return (
    <AppContext.Provider value={{
      schoolProfile, students, teachers, classes, subjects, notices, routines,
      leaveRequests, salaryRecords, homeworkAssignments, examSchedules, calendarEvents, feeReceipts,
      loading, error, attendanceRecords,
      updateSchoolProfile, addStudent, updateStudent, addTeacher, updateTeacher, deleteTeacher,
      markAttendance,
      addClass, addSubject, deleteSubject, addNotice, deleteNotice, updateRoutine,
      addLeaveRequest, updateLeaveStatus, addSalaryRecord, updateSalaryStatus,
      addHomework, deleteHomework, addExam, deleteExam,
      addCalendarEvent, deleteCalendarEvent, addFeeReceipt
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
