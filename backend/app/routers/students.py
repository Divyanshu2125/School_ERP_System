from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.models.student import Student
from app.models.user import User
from app.schemas.student_schemas import FullStudentCreate, FullStudentResponse
from app.core.security import get_current_user, get_password_hash

router = APIRouter(prefix="/api/students", tags=["Students"])

@router.get("/", response_model=List[FullStudentResponse])
def get_students(db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    return db.query(Student).all()

@router.post("/", response_model=FullStudentResponse)
def register_student(student: FullStudentCreate, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    # Auto-generate admission_number and student_id_code
    count = db.query(Student).count() + 1
    adm_no = f"ADM-2026-{count:04d}"
    std_id = f"STU-{count:04d}"

    new_student = Student(
        admission_number=adm_no,
        student_id_code=std_id,
        **student.dict()
    )
    db.add(new_student)
    db.commit()
    db.refresh(new_student)

    # Automatically create user login account for the student
    # Login Username = Admission Number (e.g. ADM-2026-0002)
    # Password = Date of Birth (YYYY-MM-DD or DDMMYYYY stripped)
    dob_raw = student.date_of_birth.replace("-", "").replace("/", "") # e.g. 20100515
    student_user = User(
        username=adm_no,
        email=student.father_email or student.mother_email or f"{std_id.lower()}@school.com",
        hashed_password=get_password_hash(dob_raw),
        full_name=f"{student.first_name} {student.last_name}",
        role="student",
        student_id=new_student.id,
        is_active=True
    )
    db.add(student_user)
    db.commit()

    return new_student

@router.delete("/{student_id}")
def delete_student(student_id: int, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    student = db.query(Student).filter(Student.id == student_id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    
    # Also delete associated user account
    user = db.query(User).filter(User.student_id == student_id, User.role == "student").first()
    if user:
        db.delete(user)

    db.delete(student)
    db.commit()
    return {"message": "Student record and login account deleted successfully"}
