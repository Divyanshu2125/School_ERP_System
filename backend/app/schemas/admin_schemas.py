from pydantic import BaseModel
from typing import Optional

class ExamScheduleBase(BaseModel):
    class_id: int
    exam_name: str
    subject: str
    exam_date: str
    start_time: str
    duration: str
    room_number: Optional[str] = None

class ExamScheduleCreate(ExamScheduleBase):
    pass

class ExamScheduleResponse(ExamScheduleBase):
    id: int
    class Config:
        from_attributes = True

class AdmitCardBase(BaseModel):
    student_id: int
    exam_name: str
    roll_number: str
    issue_date: str
    status: str = "Issued"

class AdmitCardCreate(AdmitCardBase):
    pass

class AdmitCardResponse(AdmitCardBase):
    id: int
    class Config:
        from_attributes = True
