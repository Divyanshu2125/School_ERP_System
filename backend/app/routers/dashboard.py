from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.student import Student
from app.models.teacher import Teacher
from app.models.class_section import ClassSection
from app.models.others import Fee, Attendance
from app.core.security import get_current_user

router = APIRouter(prefix="/api/dashboard", tags=["Dashboard"])

@router.get("/stats")
def get_dashboard_stats(db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    total_students = db.query(Student).count()
    total_teachers = db.query(Teacher).count()
    total_classes = db.query(ClassSection).count()
    total_fees = db.query(Fee).all()
    
    total_collected = sum(f.amount for f in total_fees if f.status == "Paid")
    total_pending = sum(f.amount for f in total_fees if f.status == "Pending")

    return {
        "total_students": total_students,
        "total_teachers": total_teachers,
        "total_classes": total_classes,
        "fee_stats": {
            "collected": total_collected,
            "pending": total_pending
        }
    }
