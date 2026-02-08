from pydantic import BaseModel, EmailStr

class EmployeeCreate(BaseModel):
    employeeId: str
    fullName: str
    email: EmailStr
    department: str

class EmployeeResponse(BaseModel):
    employeeId: str
    fullName: str
    email: str
    department: str

    class Config:
        orm_mode = True
