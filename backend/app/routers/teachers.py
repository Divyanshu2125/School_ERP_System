from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models.teacher import Teacher
from app.schemas.all_schemas import TeacherCreate, TeacherResponse
from app.core.security import get_current_user

router = APIRouter(prefix="/api/teachers", tags=["Teachers"])

@router.get("/", response_model=List[TeacherResponse])
def get_teachers(db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    return db.query(Teacher).all()

@router.post("/", response_model=TeacherResponse)
def create_teacher(teacher: TeacherCreate, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    db_teacher = db.query(Teacher).filter(Teacher.employee_id == teacher.employee_id).first()
    if db_teacher:
        raise HTTPException(status_code=400, detail="Employee ID already registered")
    new_teacher = Teacher(**teacher.dict())
    db.add(new_teacher)
    db.commit()
    db.refresh(new_teacher)
    return new_teacher

@router.delete("/{teacher_id}")
def delete_teacher(teacher_id: int, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    teacher = db.query(Teacher).filter(Teacher.id == teacher_id).first()
    if not teacher:
        raise HTTPException(status_code=404, detail="Teacher not found")
    db.delete(teacher)
    db.commit()
    return {"message": "Teacher deleted successfully"}
