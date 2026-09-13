from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.models.class_section import ClassSection
from app.models.admin_features import ExamSchedule, AdmitCard
from app.schemas.admin_schemas import (
    ExamScheduleCreate, ExamScheduleResponse,
    AdmitCardCreate, AdmitCardResponse
)
from app.core.security import require_admin

router = APIRouter(prefix="/api/admin", tags=["Admin Features"])

# Class Teacher Setter
@router.put("/classes/{class_id}/assign-teacher/{teacher_id}")
def assign_class_teacher(class_id: int, teacher_id: int, db: Session = Depends(get_db), current_user = Depends(require_admin)):
    cls = db.query(ClassSection).filter(ClassSection.id == class_id).first()
    if not cls:
        raise HTTPException(status_code=404, detail="Class section not found")
    cls.class_teacher_id = teacher_id
    db.commit()
    db.refresh(cls)
    return {"message": f"Class teacher assigned successfully to {cls.grade}-{cls.section}"}

# Exam Schedule Setter
@router.get("/exam-schedules", response_model=List[ExamScheduleResponse])
def get_exam_schedules(db: Session = Depends(get_db)):
    return db.query(ExamSchedule).all()

@router.post("/exam-schedules", response_model=ExamScheduleResponse)
def create_exam_schedule(sched: ExamScheduleCreate, db: Session = Depends(get_db), current_user = Depends(require_admin)):
    new_sched = ExamSchedule(**sched.dict())
    db.add(new_sched)
    db.commit()
    db.refresh(new_sched)
    return new_sched

# Admit Card Generation
@router.get("/admit-cards", response_model=List[AdmitCardResponse])
def get_admit_cards(db: Session = Depends(get_db)):
    return db.query(AdmitCard).all()

@router.post("/admit-cards", response_model=AdmitCardResponse)
def generate_admit_card(admit: AdmitCardCreate, db: Session = Depends(get_db), current_user = Depends(require_admin)):
    new_admit = AdmitCard(**admit.dict())
    db.add(new_admit)
    db.commit()
    db.refresh(new_admit)
    return new_admit
