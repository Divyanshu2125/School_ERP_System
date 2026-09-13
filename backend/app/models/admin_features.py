from sqlalchemy import Column, Integer, String, Float, ForeignKey
from app.database import Base

class ExamSchedule(Base):
    __tablename__ = "exam_schedules"

    id = Column(Integer, primary_key=True, index=True)
    class_id = Column(Integer, ForeignKey("class_sections.id"), nullable=False)
    exam_name = Column(String, nullable=False) # e.g. Midterm 2026
    subject = Column(String, nullable=False)
    exam_date = Column(String, nullable=False) # YYYY-MM-DD
    start_time = Column(String, nullable=False) # 09:00 AM
    duration = Column(String, nullable=False) # 2 Hours
    room_number = Column(String, nullable=True)

class AdmitCard(Base):
    __tablename__ = "admit_cards"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.id"), nullable=False)
    exam_name = Column(String, nullable=False)
    roll_number = Column(String, nullable=False)
    issue_date = Column(String, nullable=False)
    status = Column(String, default="Issued")
