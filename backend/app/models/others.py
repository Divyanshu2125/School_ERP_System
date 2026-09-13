from sqlalchemy import Column, Integer, String, Date, ForeignKey, Float
from app.database import Base

class Attendance(Base):
    __tablename__ = "attendance"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.id"), nullable=False)
    date = Column(String, nullable=False) # YYYY-MM-DD
    status = Column(String, nullable=False) # Present, Absent, Late
    remarks = Column(String, nullable=True)

class Grade(Base):
    __tablename__ = "grades"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.id"), nullable=False)
    subject = Column(String, nullable=False)
    exam_name = Column(String, nullable=False) # Midterm, Final, Quiz 1
    marks_obtained = Column(Float, nullable=False)
    max_marks = Column(Float, default=100.0)
    remarks = Column(String, nullable=True)

class Fee(Base):
    __tablename__ = "fees"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.id"), nullable=False)
    title = Column(String, nullable=False) # Tuition Fee - Term 1
    amount = Column(Float, nullable=False)
    due_date = Column(String, nullable=False)
    status = Column(String, default="Pending") # Paid, Pending, Overdue
    paid_date = Column(String, nullable=True)

class Timetable(Base):
    __tablename__ = "timetables"

    id = Column(Integer, primary_key=True, index=True)
    class_id = Column(Integer, ForeignKey("class_sections.id"), nullable=False)
    day_of_week = Column(String, nullable=False) # Monday, Tuesday, etc.
    time_slot = Column(String, nullable=False) # 09:00 AM - 10:00 AM
    subject = Column(String, nullable=False)
    teacher_name = Column(String, nullable=True)
