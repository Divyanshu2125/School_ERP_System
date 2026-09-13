from pydantic import BaseModel, EmailStr
from typing import Optional, List

# Token Schemas
class Token(BaseModel):
    access_token: str
    token_type: str
    user_info: dict

class TokenData(BaseModel):
    username: Optional[str] = None

# User Schemas
class UserBase(BaseModel):
    username: str
    email: Optional[str] = None
    full_name: str
    role: str = "admin"

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: int
    is_active: bool
    class Config:
        from_attributes = True

# Student Schemas
class StudentBase(BaseModel):
    roll_number: str
    first_name: str
    last_name: str
    email: Optional[str] = None
    phone: Optional[str] = None
    date_of_birth: Optional[str] = None
    gender: Optional[str] = None
    address: Optional[str] = None
    guardian_name: Optional[str] = None
    guardian_phone: Optional[str] = None
    class_id: Optional[int] = None

class StudentCreate(StudentBase):
    pass

class StudentResponse(StudentBase):
    id: int
    class Config:
        from_attributes = True

# Teacher Schemas
class TeacherBase(BaseModel):
    employee_id: str
    first_name: str
    last_name: str
    email: str
    phone: Optional[str] = None
    qualification: Optional[str] = None
    subject_specialization: Optional[str] = None

class TeacherCreate(TeacherBase):
    pass

class TeacherResponse(TeacherBase):
    id: int
    class Config:
        from_attributes = True

# ClassSection Schemas
class ClassSectionBase(BaseModel):
    grade: str
    section: str
    room_number: Optional[str] = None
    class_teacher_id: Optional[int] = None

class ClassSectionCreate(ClassSectionBase):
    pass

class ClassSectionResponse(ClassSectionBase):
    id: int
    class Config:
        from_attributes = True

# Attendance Schemas
class AttendanceBase(BaseModel):
    student_id: int
    date: str
    status: str
    remarks: Optional[str] = None

class AttendanceCreate(AttendanceBase):
    pass

class AttendanceResponse(AttendanceBase):
    id: int
    class Config:
        from_attributes = True

# Grade Schemas
class GradeBase(BaseModel):
    student_id: int
    subject: str
    exam_name: str
    marks_obtained: float
    max_marks: float = 100.0
    remarks: Optional[str] = None

class GradeCreate(GradeBase):
    pass

class GradeResponse(GradeBase):
    id: int
    class Config:
        from_attributes = True

# Fee Schemas
class FeeBase(BaseModel):
    student_id: int
    title: str
    amount: float
    due_date: str
    status: str = "Pending"
    paid_date: Optional[str] = None

class FeeCreate(FeeBase):
    pass

class FeeResponse(FeeBase):
    id: int
    class Config:
        from_attributes = True

# Timetable Schemas
class TimetableBase(BaseModel):
    class_id: int
    day_of_week: str
    time_slot: str
    subject: str
    teacher_name: Optional[str] = None

class TimetableCreate(TimetableBase):
    pass

class TimetableResponse(TimetableBase):
    id: int
    class Config:
        from_attributes = True
