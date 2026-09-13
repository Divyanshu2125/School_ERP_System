from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class ClassSection(Base):
    __tablename__ = "class_sections"

    id = Column(Integer, primary_key=True, index=True)
    grade = Column(String, nullable=False) # e.g. Grade 10
    section = Column(String, nullable=False) # e.g. A
    room_number = Column(String, nullable=True)
    class_teacher_id = Column(Integer, ForeignKey("teachers.id"), nullable=True)

    students = relationship("Student", back_populates="class_section")
    class_teacher = relationship("Teacher")
