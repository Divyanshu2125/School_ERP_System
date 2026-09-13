from pydantic import BaseModel
from typing import Optional

class FullStudentBase(BaseModel):
    first_name: str
    middle_name: Optional[str] = None
    last_name: str
    date_of_birth: str
    gender: str
    blood_group: Optional[str] = None
    nationality: Optional[str] = "Indian"
    religion: Optional[str] = None
    category: Optional[str] = "General"
    id_number: Optional[str] = None

    academic_year: str = "2026-2027"
    class_name: str
    section: Optional[str] = "A"
    roll_number: Optional[str] = None
    previous_school: Optional[str] = None
    previous_class: Optional[str] = None
    date_of_admission: Optional[str] = None
    admission_type: str = "New"

    father_name: str
    father_phone: Optional[str] = None
    father_email: Optional[str] = None
    mother_name: str
    mother_phone: Optional[str] = None
    mother_email: Optional[str] = None
    guardian_name: Optional[str] = None
    guardian_relationship: Optional[str] = None
    guardian_phone: Optional[str] = None
    occupation: Optional[str] = None

    address_line1: str
    address_line2: Optional[str] = None
    city: str
    state: str
    pincode: str
    country: Optional[str] = "India"

    emergency_name: str
    emergency_relationship: str
    emergency_phone: str

    has_birth_certificate: Optional[str] = "No"
    has_previous_school_cert: Optional[str] = "No"
    has_transfer_cert: Optional[str] = "No"
    other_documents: Optional[str] = None

class FullStudentCreate(FullStudentBase):
    pass

class FullStudentResponse(FullStudentBase):
    id: int
    admission_number: str
    student_id_code: str
    class Config:
        from_attributes = True
