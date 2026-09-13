from sqlalchemy import Column, Integer, String, Date, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base

class Student(Base):
    __tablename__ = "students"

    id = Column(Integer, primary_key=True, index=True)
    admission_number = Column(String, unique=True, index=True, nullable=False) # Auto-generated
    student_id_code = Column(String, unique=True, index=True, nullable=False) # Auto-generated
    first_name = Column(String, nullable=False)
    middle_name = Column(String, nullable=True)
    last_name = Column(String, nullable=False)
    date_of_birth = Column(String, nullable=False)
    gender = Column(String, nullable=False)
    blood_group = Column(String, nullable=True)
    nationality = Column(String, nullable=True)
    religion = Column(String, nullable=True)
    category = Column(String, nullable=True)
    id_number = Column(String, nullable=True) # Aadhaar / ID
    photo_url = Column(String, nullable=True)

    # 2. Academic Info
    academic_year = Column(String, nullable=False)
    class_name = Column(String, nullable=False)
    section = Column(String, nullable=True)
    roll_number = Column(String, nullable=True)
    previous_school = Column(String, nullable=True)
    previous_class = Column(String, nullable=True)
    date_of_admission = Column(String, nullable=True)
    admission_type = Column(String, default="New") # New / Transfer

    # 3. Parent / Guardian Info
    father_name = Column(String, nullable=False)
    father_phone = Column(String, nullable=True)
    father_email = Column(String, nullable=True)
    mother_name = Column(String, nullable=False)
    mother_phone = Column(String, nullable=True)
    mother_email = Column(String, nullable=True)
    guardian_name = Column(String, nullable=True)
    guardian_relationship = Column(String, nullable=True)
    guardian_phone = Column(String, nullable=True)
    occupation = Column(String, nullable=True)

    # 4. Address
    address_line1 = Column(String, nullable=False)
    address_line2 = Column(String, nullable=True)
    city = Column(String, nullable=False)
    state = Column(String, nullable=False)
    pincode = Column(String, nullable=False)
    country = Column(String, default="India")

    # 5. Emergency Contact
    emergency_name = Column(String, nullable=False)
    emergency_relationship = Column(String, nullable=False)
    emergency_phone = Column(String, nullable=False)

    # 6. Documents Attached
    has_birth_certificate = Column(String, default="No")
    has_previous_school_cert = Column(String, default="No")
    has_transfer_cert = Column(String, default="No")
    other_documents = Column(String, nullable=True)

    # Standard legacy compatibility
    email = Column(String, nullable=True)
    phone = Column(String, nullable=True)
    guardian_name_legacy = Column(String, nullable=True)
    class_id = Column(Integer, ForeignKey("class_sections.id"), nullable=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    class_section = relationship("ClassSection", back_populates="students")
