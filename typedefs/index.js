// const { buildSchema } = require("graphql");
const { gql } = require("apollo-server");

const typeDefs = gql(`

scalar Date

    #==========================================
    #======== SIGNUP  ===============

    type signupData {
        fullname: String
        username: String
        password: String
        department: String,
        mobile: String
    }

    input signupInput {
        fullname: String!
        username: String!
        password: String!
        department:String,
        mobile: String
    }

    type signupOutput {
        data:signupData
        message: String
        status: Int
    }

    #==========================================
    #========  SIGNUP ENDS ====================


    #==========================================
    #========  LOGIN  ===============

    input loginInput {
        username: String!
        password: String!
    }

    type loginOutput {
        data: logintoken
        message: String
        status: Int
    }

    type logintoken{
        token: String
    }

    #==========================================
    #========  LOGIN ENDS  ===============


    #==========================================
    #========  MARK ATTENDANCE  ===============

    type markAttendance{
        data: String
        message: String
        status: Int
    }

    input markInput{
        empId: String
    }
    
    input dataInput{
        date: String
    }

    #==========================================
    #========  MARK ATTENDANCE ENDS================

    
    #==========================================
    #========  ATTENDANCE SHEET ===============

    type attendanceSheet{
        employeeName: String
        attendance: String
        signIn: Date
        signOut: Date
    }

    type attendanceOutput{
        data: [attendanceSheet]
        message: String
        status:Int
    }

    #========  ATTENDANCE SHEET ENDS===============
    #==============================================

    #========  EMPLIST SHEET =======================
    #==============================================

    type empListsheet {
        fullname: String
        username: String
        password: String
        department: String,
        mobile: String
    }

    type empListOutput {
        data: [empListsheet]
        message: String
        status: Int
    }

    #========  EMPLIST ENDS =======================
    #==============================================


    type Query {
        empLogin( input: loginInput ): loginOutput 
        adminLogin( input: loginInput ): loginOutput  
        getTodaysAttendance: attendanceOutput   
        getEmpList: empListOutput
        checkLogin: markAttendance
        getAnyAttendance(input: dataInput):attendanceOutput
    }
     
    type Mutation {
        empSignup( input: signupInput): signupOutput
        adminSignup( input: signupInput): signupOutput
        markAttendance: markAttendance
        signout: markAttendance
        
    }
`);

module.exports = { typeDefs };
