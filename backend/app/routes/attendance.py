from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import SessionLocal
from app.models.attendance import Attendance
from app.schemas.attendance import AttendanceCreate

router = APIRouter(prefix="/api/attendance")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("", status_code=201)
def mark_attendance(att: AttendanceCreate, db: Session = Depends(get_db)):
    record = Attendance(
        employee_id=att.employeeId,
        date=att.date,
        status=att.status
    )
    db.add(record)
    db.commit()
    return {"message": "Attendance marked"}

@router.get("/{employee_id}")
def get_attendance(employee_id: str, db: Session = Depends(get_db)):
    records = db.query(Attendance).filter(
        Attendance.employee_id == employee_id
    ).all()

    return [{"date": r.date, "status": r.status} for r in records]