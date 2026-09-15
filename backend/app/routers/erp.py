from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models.class_section import ClassSection
from app.models.others import Attendance, Grade, Fee, Timetable
from app.schemas.all_schemas import (
    ClassSectionCreate, ClassSectionResponse,
    AttendanceCreate, AttendanceResponse,
    GradeCreate, GradeResponse,
    FeeCreate, FeeResponse,
    TimetableCreate, TimetableResponse
)
from app.core.security import get_current_user

router = APIRouter(prefix="/api/erp", tags=["ERP Features"])

# Classes
@router.get("/classes", response_model=List[ClassSectionResponse])
def get_classes(db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    return db.query(ClassSection).all()

@router.post("/classes", response_model=ClassSectionResponse)
def create_class(cls: ClassSectionCreate, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    new_cls = ClassSection(**cls.dict())
    db.add(new_cls)
    db.commit()
    db.refresh(new_cls)
    return new_cls

# Attendance
@router.get("/attendance", response_model=List[AttendanceResponse])
def get_attendance(db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    return db.query(Attendance).all()

@router.post("/attendance", response_model=AttendanceResponse)
def mark_attendance(att: AttendanceCreate, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    new_att = Attendance(**att.dict())
    db.add(new_att)
    db.commit()
    db.refresh(new_att)
    return new_att

# Grades
@router.get("/grades", response_model=List[GradeResponse])
def get_grades(db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    return db.query(Grade).all()

@router.post("/grades", response_model=GradeResponse)
def create_grade(grd: GradeCreate, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    new_grd = Grade(**grd.dict())
    db.add(new_grd)
    db.commit()
    db.refresh(new_grd)
    return new_grd

# Fees
@router.get("/fees", response_model=List[FeeResponse])
def get_fees(db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    return db.query(Fee).all()

@router.post("/fees", response_model=FeeResponse)
def create_fee(fee: FeeCreate, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    new_fee = Fee(**fee.dict())
    db.add(new_fee)
    db.commit()
    db.refresh(new_fee)
    return new_fee

@router.put("/fees/{fee_id}/pay", response_model=FeeResponse)
def pay_fee(fee_id: int, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    fee = db.query(Fee).filter(Fee.id == fee_id).first()
    if not fee:
        raise HTTPException(status_code=404, detail="Fee invoice not found")
    fee.status = "Paid"
    db.commit()
    db.refresh(fee)
    return fee

@router.delete("/fees/{fee_id}")
def delete_fee(fee_id: int, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    fee = db.query(Fee).filter(Fee.id == fee_id).first()
    if not fee:
        raise HTTPException(status_code=404, detail="Fee invoice not found")
    db.delete(fee)
    db.commit()
    return {"message": "Fee invoice deleted successfully"}

# Timetable
@router.get("/timetable", response_model=List[TimetableResponse])
def get_timetable(db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    return db.query(Timetable).all()

@router.post("/timetable", response_model=TimetableResponse)
def create_timetable(tt: TimetableCreate, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    new_tt = Timetable(**tt.dict())
    db.add(new_tt)
    db.commit()
    db.refresh(new_tt)
    return new_tt
