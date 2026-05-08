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
  updateSchoolProfile: (profile: SchoolProfile) => void;
  addStudent: (student: Student) => void;
  updateStudent: (id: string, updates: Partial<Student>) => void;
  addTeacher: (teacher: Teacher) => void;
  updateTeacher: (id: string, updates: Partial<Teacher>) => void;
  deleteTeacher: (id: string) => void;
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

  const [students, setStudents] = useState<Student[]>([
    {
      id: '1', admissionNumber: 'ADM2025001', name: 'Aarav Kumar', dob: '2021-04-15',
      gender: 'Male', bloodGroup: 'O+', religion: 'Hindu', motherTongue: 'Hindi',
      category: 'General', fatherName: 'Rajesh Kumar', motherName: 'Sunita Devi',
      parentOccupation: 'Business', annualIncome: '5,00,000', parentContact: '9876543210',
      emergencyContact: '9876543211', email: 'rajesh@example.com', address: 'House No 45, Gali 2',
      pinCode: '110001', district: 'Central', state: 'Delhi', classId: 'Nursery', section: 'A',
      medium: 'English', isRTE: false, status: 'Active', attendance: [], fees: [], marks: []
    },
    {
      id: '2', admissionNumber: 'ADM2025002', name: 'Priya Sharma', dob: '2021-06-20',
      gender: 'Female', bloodGroup: 'A+', religion: 'Hindu', motherTongue: 'Hindi',
      category: 'OBC', fatherName: 'Vikas Sharma', motherName: 'Rani Sharma',
      parentOccupation: 'Service', annualIncome: '3,50,000', parentContact: '9812345678',
      emergencyContact: '9812345679', email: 'vikas@example.com', address: '12-B, Sector 5',
      pinCode: '110002', district: 'West', state: 'Delhi', classId: 'LKG', section: 'A',
      medium: 'English', isRTE: true, status: 'Active', attendance: [], fees: [], marks: []
    }
  ]);

  const [teachers, setTeachers] = useState<Teacher[]>([
    { id: 'T1', employeeId: 'EMP001', name: 'Ms. Anjali Singh', qualification: 'B.Ed, NTT', 
      dateOfJoining: '2023-06-01', subjects: ['English Rhymes', 'Drawing'], contact: '9812345678',
      email: 'anjali@school.edu', designation: 'Senior Teacher', salary: 28000 }
  ]);

  const [classes, setClasses] = useState<ClassRoom[]>([
    { id: 'Playgroup', name: 'Playgroup', sections: ['A'], capacity: 20, medium: 'English' },
    { id: 'Nursery', name: 'Nursery', sections: ['A', 'B'], capacity: 25, medium: 'English' },
    { id: 'LKG', name: 'LKG', sections: ['A'], capacity: 30, medium: 'English' },
    { id: 'UKG', name: 'UKG', sections: ['A'], capacity: 30, medium: 'English' },
  ]);

  const [subjects, setSubjects] = useState<Subject[]>([
    { id: 'S1', name: 'English Rhymes', code: 'ENG-R', classId: 'Nursery', teacherId: 'T1' },
    { id: 'S2', name: 'Drawing & Craft', code: 'DRW', classId: 'Nursery', teacherId: 'T1' },
    { id: 'S3', name: 'Story Time', code: 'STR', classId: 'LKG', teacherId: 'T1' },
  ]);

  const [notices, setNotices] = useState<Notice[]>([
    { id: 'N1', title: 'PTM Meeting — Term 1', content: 'Parent-Teacher Meeting for all classes on Saturday 10am.', category: 'Academic', date: '2025-05-10', expiryDate: '2025-05-11' },
    { id: 'N2', title: 'Summer Holidays', content: 'School will remain closed from May 20 to June 15.', category: 'General', date: '2025-05-08', expiryDate: '2025-05-20' }
  ]);

  const [routines, setRoutines] = useState<Record<string, RoutineSlot[]>>({});

  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([
    { id: 'L1', staffId: 'T1', staffName: 'Ms. Anjali Singh', type: 'Sick Leave', fromDate: '2025-05-12', toDate: '2025-05-13', reason: 'Fever and cold', status: 'Pending', appliedDate: '2025-05-10' }
  ]);

  const [salaryRecords, setSalaryRecords] = useState<SalaryRecord[]>([
    { id: 'SAL1', staffId: 'T1', staffName: 'Ms. Anjali Singh', month: 'April 2025', basicSalary: 25000, allowances: 3000, deductions: 500, netSalary: 27500, status: 'Paid', paidDate: '2025-05-01' }
  ]);

  const [homeworkAssignments, setHomeworkAssignments] = useState<HomeworkAssignment[]>([
    { id: 'HW1', classId: 'Nursery', subjectName: 'English Rhymes', title: 'Learn Twinkle Twinkle', description: 'Practice the rhyme at home and recite it tomorrow.', assignedDate: '2025-05-08', dueDate: '2025-05-09', teacherName: 'Ms. Anjali Singh' }
  ]);

  const [examSchedules, setExamSchedules] = useState<ExamSchedule[]>([
    { id: 'EX1', examName: 'Term 1 Assessment', classId: 'Nursery', subjectName: 'English Rhymes', date: '2025-06-15', startTime: '09:00', endTime: '10:00', venue: 'Classroom A', totalMarks: 50 },
    { id: 'EX2', examName: 'Term 1 Assessment', classId: 'LKG', subjectName: 'Story Time', date: '2025-06-16', startTime: '09:00', endTime: '10:00', venue: 'Classroom B', totalMarks: 50 }
  ]);

  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>([
    { id: 'EV1', title: 'Independence Day', date: '2025-08-15', type: 'Holiday', description: 'National Holiday' },
    { id: 'EV2', title: 'Annual Sports Day', date: '2025-09-05', type: 'Event', description: 'Annual sports and games event for all students' },
    { id: 'EV3', title: 'Term 1 Exams Begin', date: '2025-06-15', type: 'Exam', description: 'First term examinations start' },
    { id: 'EV4', title: 'Parent-Teacher Meeting', date: '2025-05-10', type: 'PTM', description: 'PTM for all classes' },
    { id: 'EV5', title: 'Summer Holidays Begin', date: '2025-05-20', type: 'Holiday', description: 'School closed for summer' },
  ]);

  const [feeReceipts, setFeeReceipts] = useState<FeeReceipt[]>([]);

  // Actions
  const updateSchoolProfile = (profile: SchoolProfile) => setSchoolProfile(profile);
  const addStudent = (student: Student) => setStudents(prev => [...prev, student]);
  const updateStudent = (id: string, updates: Partial<Student>) => setStudents(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
  const addTeacher = (teacher: Teacher) => setTeachers(prev => [...prev, teacher]);
  const updateTeacher = (id: string, updates: Partial<Teacher>) => setTeachers(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
  const deleteTeacher = (id: string) => setTeachers(prev => prev.filter(t => t.id !== id));
  const addClass = (cls: ClassRoom) => setClasses(prev => [...prev, cls]);
  const addSubject = (subject: Subject) => setSubjects(prev => [...prev, subject]);
  const deleteSubject = (id: string) => setSubjects(prev => prev.filter(s => s.id !== id));
  const addNotice = (notice: Notice) => setNotices(prev => [...prev, notice]);
  const deleteNotice = (id: string) => setNotices(prev => prev.filter(n => n.id !== id));
  const updateRoutine = (key: string, slots: RoutineSlot[]) => setRoutines(prev => ({ ...prev, [key]: slots }));
  const addLeaveRequest = (req: LeaveRequest) => setLeaveRequests(prev => [...prev, req]);
  const updateLeaveStatus = (id: string, status: 'Approved' | 'Rejected') => setLeaveRequests(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  const addSalaryRecord = (rec: SalaryRecord) => setSalaryRecords(prev => [...prev, rec]);
  const updateSalaryStatus = (id: string, status: 'Paid', paidDate: string) => setSalaryRecords(prev => prev.map(r => r.id === id ? { ...r, status, paidDate } : r));
  const addHomework = (hw: HomeworkAssignment) => setHomeworkAssignments(prev => [...prev, hw]);
  const deleteHomework = (id: string) => setHomeworkAssignments(prev => prev.filter(h => h.id !== id));
  const addExam = (exam: ExamSchedule) => setExamSchedules(prev => [...prev, exam]);
  const deleteExam = (id: string) => setExamSchedules(prev => prev.filter(e => e.id !== id));
  const addCalendarEvent = (event: CalendarEvent) => setCalendarEvents(prev => [...prev, event]);
  const deleteCalendarEvent = (id: string) => setCalendarEvents(prev => prev.filter(e => e.id !== id));
  const addFeeReceipt = (receipt: FeeReceipt) => setFeeReceipts(prev => [...prev, receipt]);

  return (
    <AppContext.Provider value={{
      schoolProfile, students, teachers, classes, subjects, notices, routines,
      leaveRequests, salaryRecords, homeworkAssignments, examSchedules, calendarEvents, feeReceipts,
      updateSchoolProfile, addStudent, updateStudent, addTeacher, updateTeacher, deleteTeacher,
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
