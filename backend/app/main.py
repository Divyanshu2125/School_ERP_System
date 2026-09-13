from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import Base, engine, SessionLocal
from app.models.user import User
from app.models.student import Student
from app.models.teacher import Teacher
from app.models.class_section import ClassSection
from app.models.others import Attendance, Grade, Fee, Timetable
from app.models.admin_features import ExamSchedule, AdmitCard
from app.core.security import get_password_hash

from app.routers import auth, students, teachers, erp, dashboard, admin_features

# Create DB tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="School ERP API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(auth.router)
app.include_router(students.router)
app.include_router(teachers.router)
app.include_router(erp.router)
app.include_router(dashboard.router)
app.include_router(admin_features.router)

@app.on_event("startup")
def startup_event():
    db = SessionLocal()
    
    # 1. Seed demo student & teacher records first if none exist
    student = db.query(Student).first()
    if not student:
        student = Student(
            admission_number="ADM-2026-0001",
            student_id_code="STU-0001",
            first_name="Alexander",
            last_name="Wright",
            date_of_birth="2010-05-15",
            gender="Male",
            academic_year="2026-2027",
            class_name="Grade 10",
            section="A",
            roll_number="STU-1001",
            father_name="Robert Wright",
            father_phone="+1 555-0199",
            mother_name="Eleanor Wright",
            address_line1="123 Academic Way",
            city="Metropolis",
            state="NY",
            pincode="10001",
            emergency_name="Robert Wright",
            emergency_relationship="Father",
            emergency_phone="+1 555-0199",
            email="alexander@school.com",
            phone="+1 555-0192"
        )
        db.add(student)
        db.commit()
        db.refresh(student)

    teacher = db.query(Teacher).first()
    if not teacher:
        teacher = Teacher(
            employee_id="EMP-101",
            first_name="Sarah",
            last_name="Jenkins",
            email="sarah.jenkins@school.com",
            phone="+1 555-0144",
            qualification="Ph.D. Mathematics",
            subject_specialization="Advanced Mathematics"
        )
        db.add(teacher)
        db.commit()
        db.refresh(teacher)

    # Seed class section
    cls = db.query(ClassSection).first()
    if not cls:
        cls = ClassSection(grade="Grade 10", section="A", room_number="Room 101", class_teacher_id=teacher.id)
        db.add(cls)
        db.commit()
        db.refresh(cls)

    # 2. Seed Users for all 6 roles
    roles_config = [
        {"username": "admin", "full_name": "System Administrator", "role": "admin", "pass": "admin123", "email": "admin@school.com"},
        {"username": "principal", "full_name": "Dr. Eleanor Vance", "role": "principal", "pass": "principal123", "email": "principal@school.com"},
        {"username": "teacher", "full_name": "Sarah Jenkins", "role": "teacher", "pass": "teacher123", "email": "teacher@school.com", "teacher_id": teacher.id},
        {"username": "student", "full_name": "Alexander Wright", "role": "student", "pass": "student123", "email": "student@school.com", "student_id": student.id},
        {"username": "parent", "full_name": "Robert Wright", "role": "parent", "pass": "parent123", "email": "parent@school.com", "student_id": student.id},
        {"username": "accountant", "full_name": "Marcus Vance", "role": "accountant", "pass": "accountant123", "email": "accountant@school.com"},
    ]

    for item in roles_config:
        existing = db.query(User).filter(User.username == item["username"]).first()
        if not existing:
            u = User(
                username=item["username"],
                email=item["email"],
                hashed_password=get_password_hash(item["pass"]),
                full_name=item["full_name"],
                role=item["role"],
                student_id=item.get("student_id"),
                teacher_id=item.get("teacher_id"),
                is_active=True
            )
            db.add(u)
    db.commit()
    db.close()

@app.get("/")
def read_root():
    return {"message": "Welcome to Multi-Role School ERP System API", "docs": "/docs"}
