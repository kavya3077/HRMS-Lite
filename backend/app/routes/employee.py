from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.core.database import SessionLocal
from app.models.employee import Employee
from app.schemas.employee import EmployeeCreate

router = APIRouter(prefix="/api/employees")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("", status_code=201)
def add_employee(employee: EmployeeCreate, db: Session = Depends(get_db)):
    existing = db.query(Employee).filter(Employee.employee_id == employee.employeeId).first()
    if existing:
        raise HTTPException(status_code=409, detail="Employee ID already exists")

    emp = Employee(
        employee_id=employee.employeeId,
        full_name=employee.fullName,
        email=employee.email,
        department=employee.department
    )
    db.add(emp)
    db.commit()
    return {"message": "Employee added successfully"}

@router.get("")
def get_employees(db: Session = Depends(get_db)):
    employees = db.query(Employee).all()
    return [
        {
            "employeeId": e.employee_id,
            "fullName": e.full_name,
            "email": e.email,
            "department": e.department
        }
        for e in employees
    ]

@router.delete("/{employee_id}")
def delete_employee(employee_id: str, db: Session = Depends(get_db)):
    emp = db.query(Employee).filter(Employee.employee_id == employee_id).first()
    if not emp:
        raise HTTPException(status_code=404, detail="Employee not found")

    db.delete(emp)
    db.commit()
    return {"message": "Employee deleted"}
